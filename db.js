/*
 * Progress storage: prefer shared SQLite API (server.py),
 * fall back to IndexedDB + localStorage when API is unavailable.
 */
(function () {
  const DB_NAME = "rk-sd-quiz";
  const DB_VER = 1;
  const LS_KEY = "rk-sd-bank-v1";
  let db = null;
  let useApi = null; // null=unknown, true/false after probe
  let progressCache = { attempts: {}, cases: {} };
  let readyPromise = null;

  function open() {
    return new Promise((resolve, reject) => {
      if (db) return resolve(db);
      const req = indexedDB.open(DB_NAME, DB_VER);
      req.onupgradeneeded = (e) => {
        const d = e.target.result;
        if (!d.objectStoreNames.contains("attempts")) {
          const s = d.createObjectStore("attempts", { keyPath: "qid" });
          s.createIndex("chapter", "chapter", { unique: false });
          s.createIndex("point", "point", { unique: false });
          s.createIndex("lastWrong", "lastWrong", { unique: false });
        }
        if (!d.objectStoreNames.contains("sessions")) {
          d.createObjectStore("sessions", { keyPath: "id", autoIncrement: true });
        }
      };
      req.onsuccess = (e) => { db = e.target.result; resolve(db); };
      req.onerror = () => reject(req.error);
    });
  }

  function tx(store, mode) {
    return db.transaction(store, mode).objectStore(store);
  }

  function promisify(req) {
    return new Promise((r, j) => { req.onsuccess = () => r(req.result); req.onerror = () => j(req.error); });
  }

  async function api(path, opts) {
    const res = await fetch(path, Object.assign({
      headers: { "Content-Type": "application/json" }
    }, opts || {}));
    if (!res.ok) throw new Error("API " + res.status);
    return res.json();
  }

  async function probeApi() {
    try {
      const h = await api("/api/health");
      useApi = !!(h && h.ok);
    } catch {
      useApi = false;
    }
    return useApi;
  }

  function mirrorLegacyFromAttempts(attempts) {
    const s = { attempts: {}, cases: progressCache.cases || {} };
    (attempts || []).forEach((a) => {
      s.attempts[a.qid] = { tried: a.tried || 0, correct: a.correct || 0 };
    });
    try { localStorage.setItem(LS_KEY, JSON.stringify(s)); } catch (_) {}
    progressCache.attempts = s.attempts;
  }

  function legacyAttemptsObject() {
    try {
      const data = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
      return data.attempts || {};
    } catch {
      return {};
    }
  }

  async function collectBrowserDump() {
    const questions = window.QUESTIONS || [];
    const qMap = {};
    questions.forEach((q) => { qMap[q.id] = q; });

    const fromLs = [];
    const ls = legacyAttemptsObject();
    Object.keys(ls).forEach((qid) => {
      const val = ls[qid] || {};
      const q = qMap[qid];
      const tried = val.tried || 0;
      const correct = val.correct || 0;
      fromLs.push({
        qid,
        chapter: q ? q.chapter : (qid.startsWith("en") ? "en" : (qid.split("-")[0] || "")),
        point: q ? (q.point || "") : "",
        tried,
        correct,
        wrong: Math.max(0, tried - correct),
        streak: correct > 0 ? 1 : 0,
        lastTime: Date.now(),
        lastWrong: correct === 0 && tried > 0 ? Date.now() : 0,
        avgMs: 0,
        lastChoice: (val.lastChoice !== undefined ? val.lastChoice : null)
      });
    });

    let fromIdb = [];
    try {
      await open();
      fromIdb = await promisify(tx("attempts", "readonly").getAll());
    } catch (_) {}

    const merged = {};
    fromLs.concat(fromIdb || []).forEach((rec) => {
      if (!rec || !rec.qid) return;
      const prev = merged[rec.qid];
      if (!prev || (rec.tried || 0) >= (prev.tried || 0)) merged[rec.qid] = rec;
    });

    let sessions = [];
    try {
      sessions = await promisify(tx("sessions", "readonly").getAll());
    } catch (_) {}

    let cases = {};
    try {
      const data = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
      cases = data.cases || {};
    } catch (_) {}

    return { attempts: Object.values(merged), sessions, cases };
  }

  async function syncBrowserIntoApi() {
    if (!useApi) return;
    const dump = await collectBrowserDump();
    if (!dump.attempts.length && !dump.sessions.length && !Object.keys(dump.cases || {}).length) return;
    await api("/api/import", { method: "POST", body: JSON.stringify(dump) });
  }

  async function refreshProgressCache() {
    if (useApi) {
      const p = await api("/api/progress");
      progressCache = { attempts: p.attempts || {}, cases: p.cases || {} };
      try {
        localStorage.setItem(LS_KEY, JSON.stringify({
          attempts: progressCache.attempts,
          cases: progressCache.cases,
          _syncedToSqlite: true
        }));
      } catch (_) {}
      return progressCache;
    }
    const attempts = await getAllAttemptsLocal();
    mirrorLegacyFromAttempts(attempts);
    return progressCache;
  }

  async function ready() {
    if (readyPromise) return readyPromise;
    readyPromise = (async () => {
      await probeApi();
      if (useApi) {
        await syncBrowserIntoApi();
        await refreshProgressCache();
      } else {
        await migrateFromLocalStorage();
        await refreshProgressCache();
      }
      return useApi;
    })();
    return readyPromise;
  }

  /* ---- local IndexedDB impl ---- */
  async function recordAttemptLocal(q, correct, ms, choice) {
    await open();
    const s = tx("attempts", "readwrite");
    const old = await promisify(s.get(q.id));
    const now = Date.now();
    const rec = old || {
      qid: q.id, chapter: q.chapter, point: q.point || "",
      tried: 0, correct: 0, wrong: 0, streak: 0,
      lastTime: 0, lastWrong: 0, avgMs: 0, lastChoice: null
    };
    rec.tried += 1;
    if (correct) {
      rec.correct += 1;
      rec.streak += 1;
    } else {
      rec.wrong += 1;
      rec.streak = 0;
      rec.lastWrong = now;
    }
    rec.lastTime = now;
    if (choice !== undefined && choice !== null) rec.lastChoice = choice;
    if (ms > 0) {
      rec.avgMs = rec.avgMs ? Math.round((rec.avgMs * (rec.tried - 1) + ms) / rec.tried) : ms;
    }
    await promisify(tx("attempts", "readwrite").put(rec));
    return rec;
  }

  async function getAllAttemptsLocal() {
    await open();
    return promisify(tx("attempts", "readonly").getAll());
  }

  /* ---- public API ---- */
  async function recordAttempt(q, correct, ms, choice) {
    await ready();
    let rec;
    if (useApi) {
      rec = await api("/api/attempts", {
        method: "POST",
        body: JSON.stringify({
          q: { id: q.id, chapter: q.chapter, point: q.point || "", now: Date.now() },
          correct: !!correct,
          ms: ms || 0,
          choice: choice
        })
      });
    } else {
      rec = await recordAttemptLocal(q, correct, ms, choice);
    }
    progressCache.attempts[q.id] = {
      tried: rec.tried,
      correct: rec.correct,
      lastChoice: rec.lastChoice
    };
    try {
      const s = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
      s.attempts = s.attempts || {};
      s.attempts[q.id] = {
        tried: rec.tried,
        correct: rec.correct,
        lastChoice: rec.lastChoice
      };
      localStorage.setItem(LS_KEY, JSON.stringify(s));
    } catch (_) {}
    return rec;
  }

  async function getAttempt(qid) {
    await ready();
    if (useApi) return api("/api/attempts/" + encodeURIComponent(qid));
    await open();
    return promisify(tx("attempts", "readonly").get(qid));
  }

  async function getAllAttempts() {
    await ready();
    if (useApi) return api("/api/attempts");
    return getAllAttemptsLocal();
  }

  async function getAttemptsByChapter(chapter) {
    const all = await getAllAttempts();
    return all.filter((a) => a.chapter === chapter);
  }

  async function saveSession(session) {
    await ready();
    if (useApi) return api("/api/sessions", { method: "POST", body: JSON.stringify(session) });
    await open();
    return promisify(tx("sessions", "readwrite").add(session));
  }

  async function getAllSessions() {
    await ready();
    if (useApi) return api("/api/sessions");
    await open();
    return promisify(tx("sessions", "readonly").getAll());
  }

  async function recordCase(caseId, got, total) {
    await ready();
    if (useApi) {
      const rec = await api("/api/cases", {
        method: "POST",
        body: JSON.stringify({ id: caseId, got, total })
      });
      progressCache.cases[caseId] = rec;
      return rec;
    }
    try {
      const s = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
      s.cases = s.cases || {};
      const prev = s.cases[caseId] || { tried: 0 };
      const rec = { tried: (prev.tried || 0) + 1, got, total };
      s.cases[caseId] = rec;
      localStorage.setItem(LS_KEY, JSON.stringify(s));
      progressCache.cases[caseId] = rec;
      return rec;
    } catch (_) {
      return { tried: 1, got, total };
    }
  }

  async function chapterStats() {
    await ready();
    if (useApi) return api("/api/stats/chapters");
    const all = await getAllAttemptsLocal();
    const map = {};
    all.forEach((a) => {
      if (!map[a.chapter]) map[a.chapter] = { tried: 0, correct: 0, wrong: 0, total: 0, points: {} };
      const c = map[a.chapter];
      c.tried += a.tried;
      c.correct += a.correct;
      c.wrong += a.wrong;
      c.total += 1;
      if (!c.points[a.point]) c.points[a.point] = { tried: 0, correct: 0, wrong: 0 };
      c.points[a.point].tried += a.tried;
      c.points[a.point].correct += a.correct;
      c.points[a.point].wrong += a.wrong;
    });
    return map;
  }

  async function wrongQuestions() {
    await ready();
    if (useApi) return api("/api/stats/wrong");
    const all = await getAllAttemptsLocal();
    return all.filter((a) => a.wrong > 0 && a.streak < 2)
      .sort((a, b) => b.lastWrong - a.lastWrong);
  }

  // 间隔重复：今天到期的复习题（错后1/3/7/15天周期，连对4次移出）
  async function reviewDue() {
    await ready();
    if (useApi) return api("/api/stats/review");
    const all = await getAllAttemptsLocal();
    const now = Date.now();
    return all.filter((a) => a.wrong > 0 && (a.nextReview || 0) > 0 && a.nextReview <= now)
      .sort((a, b) => (a.nextReview || 0) - (b.nextReview || 0));
  }

  async function weakPoints(limit) {
    await ready();
    if (useApi) return api("/api/stats/weak?limit=" + (limit || 10));
    const all = await getAllAttemptsLocal();
    const pts = {};
    all.forEach((a) => {
      if (!a.point) return;
      if (!pts[a.point]) pts[a.point] = { point: a.point, chapter: a.chapter, tried: 0, correct: 0, wrong: 0, qids: [] };
      pts[a.point].tried += a.tried;
      pts[a.point].correct += a.correct;
      pts[a.point].wrong += a.wrong;
      pts[a.point].qids.push(a.qid);
    });
    return Object.values(pts)
      .filter((p) => p.tried >= 1)
      .map((p) => ({ ...p, rate: p.tried ? p.correct / p.tried : 0 }))
      .sort((a, b) => a.rate - b.rate)
      .slice(0, limit || 10);
  }

  async function migrateFromLocalStorage() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (!data.attempts || data._migrated) return;
      await open();
      const questions = window.QUESTIONS || [];
      const qMap = {};
      questions.forEach((q) => { qMap[q.id] = q; });
      for (const [qid, val] of Object.entries(data.attempts)) {
        const q = qMap[qid];
        const rec = {
          qid,
          chapter: q ? q.chapter : "",
          point: q ? (q.point || "") : "",
          tried: val.tried || 0,
          correct: val.correct || 0,
          wrong: (val.tried || 0) - (val.correct || 0),
          streak: val.correct > 0 ? 1 : 0,
          lastTime: Date.now(),
          lastWrong: val.correct === 0 ? Date.now() : 0,
          avgMs: 0
        };
        await promisify(tx("attempts", "readwrite").put(rec));
      }
      data._migrated = true;
      localStorage.setItem(LS_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("Migration failed:", e);
    }
  }

  function getProgressCache() {
    return progressCache;
  }

  function usingSharedDb() {
    return !!useApi;
  }

  window.QuizDB = {
    ready, open, recordAttempt, getAttempt, getAllAttempts, getAttemptsByChapter,
    saveSession, getAllSessions, recordCase,
    chapterStats, wrongQuestions, reviewDue, weakPoints, migrateFromLocalStorage,
    refreshProgressCache, getProgressCache, usingSharedDb
  };
})();
