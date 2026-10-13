(function () {
  const LETTERS = ["A", "B", "C", "D", "E"];
  const STORE_KEY = "rk-sd-bank-v1";

  const state = {
    view: "home",
    mode: "practice",
    chapterId: null,
    filter: "all",
    list: [],
    index: 0,
    answers: {},
    flags: {},
    reveal: false,
    showOrigin: false,
    examEndsAt: null,
    paperTitle: "",
    paperGeneration: 0,
    afternoonReview: false,
    timerId: null,
    result: null,
    caseList: [],
    caseIndex: 0,
    fills: {},
    caseReveal: false,
    caseDetails: {},
    caseScore: null,
    caseAiGrade: {},
    examSubmitted: false,
    examReview: false,
    caseRecordedAnswers: {},
    questionStartTime: 0,
    attemptCache: {},
    history: {},
    fromHistory: {},
    statsData: null,
    aiExplain: {},
    aiCacheHit: {},
    aiLoading: false,
    aiVariantsLoading: false
  };

  function loadStore() {
    const cache = QuizDB.getProgressCache ? QuizDB.getProgressCache() : null;
    if (cache && (cache.attempts || cache.cases)) {
      return { attempts: cache.attempts || {}, cases: cache.cases || {} };
    }
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    } catch {
      return {};
    }
  }
  function recordAttempt(q, correct, choice) {
    const ms = state.questionStartTime ? Date.now() - state.questionStartTime : 0;
    QuizDB.recordAttempt(q, correct, ms, choice).then((rec) => {
      state.attemptCache[q.id] = rec;
      state.history[q.id] = rec;
      if (state.view === "home") render();
    });
  }
  function chapterProgress(id) {
    const qs = QUESTIONS.filter((q) => q.chapter === id);
    const s = loadStore().attempts || {};
    const tried = qs.filter((q) => s[q.id] && s[q.id].tried > 0).length;
    return { total: qs.length, tried, orig: qs.filter((q) => q.kind === "original").length };
  }
  function byId(id) {
    return QUESTIONS.find((q) => q.id === id);
  }
  function shuffled(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  // 轻量markdown渲染：标题/列表/粗体/表格行/段落
  function md(str) {
    const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    let html = "", inList = false;
    const closeList = () => { if (inList) { html += "</ul>"; inList = false; } };
    for (const raw of String(str).split(/\r?\n/)) {
      const line = raw.trimEnd();
      let m;
      if (!line.trim()) { closeList(); html += "<div style='height:8px'></div>"; continue; }
      if ((m = line.match(/^#{1,6}\s*(.+)$/))) {
        closeList();
        html += `<div style="font-weight:700;margin:12px 0 4px;font-size:14.5px;color:#1d4ed8;border-left:3px solid #93c5fd;padding-left:8px">${inline(m[1])}</div>`;
        continue;
      }
      if ((m = line.match(/^\s*[-*•]\s+(.+)$/))) {
        if (!inList) { html += "<ul style='margin:4px 0 6px 18px;padding:0'>"; inList = true; }
        html += `<li style="margin:3px 0">${inline(m[1])}</li>`;
        continue;
      }
      if ((m = line.match(/^\s*(\d+)[.、)]\s*(.+)$/))) {
        if (!inList) { html += "<ul style='margin:4px 0 6px 18px;padding:0;list-style:decimal'>"; inList = true; }
        html += `<li style="margin:3px 0">${inline(m[2])}</li>`;
        continue;
      }
      if (/^\s*\|.*\|\s*$/.test(line)) {
        closeList();
        const cells = line.split("|").slice(1, -1).map((c) => c.trim());
        if (/^[-:\s]+$/.test(cells.join(""))) continue; // 分隔行
        html += `<div style="display:flex;gap:2px;margin:2px 0">${cells.map((c) => `<span style="flex:1;padding:4px 8px;background:#eef2f7;border-radius:4px;font-size:12.5px">${inline(c)}</span>`).join("")}</div>`;
        continue;
      }
      if ((m = line.match(/^>\s*(.+)$/))) {
        closeList();
        html += `<div style="margin:6px 0;padding:8px 12px;background:#fffbeb;border-left:3px solid #f59e0b;border-radius:4px">${inline(m[1])}</div>`;
        continue;
      }
      closeList();
      html += `<p style="margin:5px 0">${inline(line)}</p>`;
    }
    closeList();
    return html;
  }

  function formatAiInline(value) {
    let html = esc(value);
    // 模型有时会返回未渲染的 LaTeX。这里先转换常见符号，避免用户看到 \times、\text{} 等源码。
    html = html
      .replace(/\\text\{([^{}]*)\}/g, "$1")
      .replace(/\\times/g, "×")
      .replace(/\\cdot/g, "·")
      .replace(/\\rightarrow/g, "→")
      .replace(/\\leq?/g, "≤")
      .replace(/\\geq?/g, "≥")
      .replace(/\\neq/g, "≠")
      .replace(/\\pm/g, "±")
      .replace(/\\in/g, "∈")
      .replace(/\\left|\\right/g, "")
      .replace(/\\\(|\\\)|\\\[|\\\]|\$\$/g, "")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/`([^`]+)`/g, "<code>$1</code>");
    return html;
  }

  function aiText(value) {
    return formatAiInline(String(value || "")).replace(/\r?\n/g, "<br>");
  }

  function aiResultLabel(status) {
    if (status === "correct") return { text: "回答正确", className: "correct" };
    if (status === "wrong") return { text: "需要订正", className: "wrong" };
    return { text: "尚未作答", className: "unanswered" };
  }

  function renderAiAnalysis(q) {
    const analysis = state.aiExplain[q.id];
    if (!analysis) return "";

    // 兼容旧缓存或旧服务端返回的 Markdown，避免升级期间页面出现空白。
    if (typeof analysis === "string") {
      return `<div class="ai-analysis ai-analysis-legacy">
        <div class="ai-analysis-notice">旧版解析格式：内容未经过结构化校验。</div>
        ${md(analysis)}
      </div>`;
    }

    const correctIndex = Number.isInteger(analysis.correctAnswer && analysis.correctAnswer.index)
      ? analysis.correctAnswer.index : q.answer;
    const selectedIndex = analysis.selectedAnswer && Number.isInteger(analysis.selectedAnswer.index)
      ? analysis.selectedAnswer.index : state.answers[q.id];
    const status = analysis.status || (selectedIndex === undefined ? "unanswered" : selectedIndex === q.answer ? "correct" : "wrong");
    const resultLabel = aiResultLabel(status);
    const optionMap = new Map((analysis.optionAnalysis || []).map((item) => [item.index, item]));
    const confidenceText = analysis.confidence === "high" ? "模型自评：高" : analysis.confidence === "low" ? "模型自评：低，需核对" : "模型自评：中";

    return `<div class="ai-analysis">
      <div class="ai-result-card ${resultLabel.className}">
        <div class="ai-result-main">
          <span class="ai-result-label">${resultLabel.text}</span>
          <strong>正确答案：${LETTERS[correctIndex] || "?"}</strong>
        </div>
        <div class="ai-result-sub">
          ${selectedIndex === undefined ? "你的答案：未作答" : `你的答案：${LETTERS[selectedIndex] || "?"}`}
          <span> · ${esc(confidenceText)}</span>
        </div>
      </div>

      ${analysis.notice ? `<div class="ai-analysis-notice">⚠ ${aiText(analysis.notice)}</div>` : ""}
      ${analysis.source === "question_bank" ? `<div class="ai-analysis-notice">AI 暂不可用，以下内容来自题库参考解析；请以题干和教材为准。</div>` : ""}

      <section class="ai-section">
        <h4>核心结论</h4>
        <div class="ai-section-content">${aiText(analysis.conclusion || `正确答案为 ${LETTERS[correctIndex] || "?"}。`)}</div>
      </section>

      <section class="ai-section ai-mistake-section ${status === "wrong" ? "is-wrong" : ""}">
        <h4>${status === "wrong" ? "你为什么错" : "作答反馈"}</h4>
        <div class="ai-section-content">${aiText(analysis.mistake || "请结合下面的步骤核对自己的判断依据。")}</div>
      </section>

      ${(analysis.steps || []).length ? `<section class="ai-section">
        <h4>逐步解析</h4>
        <div class="ai-steps">${analysis.steps.map((step, index) => `
          <div class="ai-step">
            <span class="ai-step-number">${index + 1}</span>
            <div><strong>${aiText(step.title || `步骤 ${index + 1}`)}</strong><div class="ai-step-content">${aiText(step.content)}</div></div>
          </div>`).join("")}</div>
      </section>` : ""}

      <section class="ai-section">
        <h4>选项核对</h4>
        <div class="ai-option-list">${q.options.map((option, index) => {
          const item = optionMap.get(index);
          const optionStatus = index === correctIndex ? "correct" : item && item.verdict === "unclear" ? "unclear" : "wrong";
          const optionReason = item && item.reason
            ? item.reason
            : index === correctIndex
              ? "这是题库标记的正确选项。"
              : "请结合上面的核心步骤核对该选项与题干的关键条件。";
          return `<div class="ai-option-item ${optionStatus}">
            <span class="ai-option-letter">${LETTERS[index]}</span>
            <div><div class="ai-option-title"><strong>${esc(optionStatus === "correct" ? "正确" : optionStatus === "unclear" ? "需核对" : "不选")}</strong> ${esc(option)}</div><div>${aiText(optionReason)}</div></div>
          </div>`;
        }).join("")}</div>
      </section>

      ${(analysis.knowledgePoints || []).length ? `<section class="ai-section">
        <h4>本题真正要记住的点</h4>
        <ul class="ai-chip-list">${analysis.knowledgePoints.map((item) => `<li>${aiText(item)}</li>`).join("")}</ul>
      </section>` : ""}

      ${(analysis.assumptions || []).length ? `<section class="ai-section ai-assumption-section">
        <h4>解题前提</h4>
        <ul>${analysis.assumptions.map((item) => `<li>${aiText(item)}</li>`).join("")}</ul>
      </section>` : ""}

      ${(analysis.selfCheck || []).length ? `<details class="ai-self-check">
        <summary>举一反三 · ${analysis.selfCheck.length} 道即时自测</summary>
        <div>${analysis.selfCheck.map((item, index) => `<div class="ai-check-item"><strong>${index + 1}. ${aiText(item.question)}</strong><div>答案要点：${aiText(item.answer || "请根据本题规则作答")}</div></div>`).join("")}</div>
      </details>` : ""}
    </div>`;
  }

  function postJSON(url, body) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).then(async (response) => {
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || `API ${response.status}`);
      return payload;
    });
  }

  function applyFilter(list, filter) {
    if (filter === "original") return list.filter((q) => q.kind === "original");
    if (filter === "similar") return list.filter((q) => q.kind === "similar");
    if (filter === "wrong") {
      const s = loadStore().attempts || {};
      return list.filter((q) => s[q.id] && s[q.id].tried > 0 && s[q.id].correct === 0);
    }
    return list;
  }

  function historyRec(qid) {
    return state.history[qid] || state.attemptCache[qid] || null;
  }

  function historyMark(qid) {
    const a = historyRec(qid);
    if (!a || !(a.tried > 0)) return "";
    if (a.streak > 0) return "ok";
    if ((a.wrong || 0) > 0 || (a.correct || 0) === 0) return "no";
    return "done";
  }

  function firstOpenIndex(list) {
    const i = list.findIndex((q) => {
      const a = historyRec(q.id);
      return !(a && a.tried > 0);
    });
    return i >= 0 ? i : 0;
  }

  async function loadHistoryMap() {
    try {
      const all = await QuizDB.getAllAttempts();
      const map = {};
      (all || []).forEach((a) => { if (a && a.qid) map[a.qid] = a; });
      state.history = map;
    } catch (_) {
      const s = loadStore().attempts || {};
      const map = {};
      Object.keys(s).forEach((qid) => {
        const v = s[qid] || {};
        map[qid] = {
          qid,
          tried: v.tried || 0,
          correct: v.correct || 0,
          wrong: Math.max(0, (v.tried || 0) - (v.correct || 0)),
          streak: (v.correct || 0) > 0 ? 1 : 0
        };
      });
      state.history = map;
    }
  }

  function restoreAnswersFromHistory(list) {
    state.fromHistory = {};
    (list || []).forEach((q) => {
      const h = historyRec(q.id);
      if (!h || !(h.tried > 0)) return;
      let choice = h.lastChoice;
      if (choice === undefined || choice === null) {
        // 旧数据没有选项：若最近连续正确，回填正确答案以便显示
        if ((h.streak || 0) > 0) choice = q.answer;
        else return;
      }
      choice = Number(choice);
      if (!Number.isFinite(choice) || choice < 0) return;
      state.answers[q.id] = choice;
      state.fromHistory[q.id] = true;
    });
  }

  function beginPractice(opts) {
    state.mode = "practice";
    state.examReview = false;
    state.chapterId = opts.chapterId;
    state.filter = opts.filter || "all";
    state.list = opts.list || [];
    state.answers = {};
    state.fromHistory = {};
    state.flags = {};
    state.reveal = false;
    state.showOrigin = false;
    state.examEndsAt = null;
    state.paperTitle = "";
    if (state.timerId) clearInterval(state.timerId);
    state.view = state.list.length ? "quiz" : "home";
    if (!state.list.length) {
      render();
      return;
    }
    state.index = 0;
    state.questionStartTime = Date.now();
    render();
    loadHistoryMap().then(() => {
      restoreAnswersFromHistory(state.list);
      if (opts.preferQid) {
        const i = state.list.findIndex((q) => q.id === opts.preferQid);
        state.index = i >= 0 ? i : firstOpenIndex(state.list);
      } else if (opts.jumpUntried !== false) {
        state.index = firstOpenIndex(state.list);
      }
      state.questionStartTime = Date.now();
      const q = current();
      state.reveal = !!(q && state.answers[q.id] !== undefined);
      state.showOrigin = false;
      render();
    });
  }

  function startChapter(id, filter) {
    const base = QUESTIONS.filter((q) => q.chapter === id);
    beginPractice({
      chapterId: id,
      filter: filter || "all",
      list: applyFilter(base, filter || "all")
    });
  }

  const PAPER_STORE = "rk-sd-paper-state";

  function paperStorageKey(list) {
    return (list || []).map((question) => question.id).join("\n");
  }

  function readPaperStore() {
    try {
      const parsed = JSON.parse(localStorage.getItem(PAPER_STORE) || "{}");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  function writePaperRecord(list, record) {
    try {
      const all = readPaperStore();
      all[paperStorageKey(list)] = { ...record, savedAt: Date.now() };
      const entries = Object.entries(all).sort((a, b) => (b[1].savedAt || 0) - (a[1].savedAt || 0)).slice(0, 8);
      localStorage.setItem(PAPER_STORE, JSON.stringify(Object.fromEntries(entries)));
    } catch (_) {}
  }

  function readPaperRecord(list) {
    return readPaperStore()[paperStorageKey(list)] || null;
  }

  function deletePaperRecord(list) {
    try {
      const all = readPaperStore();
      delete all[paperStorageKey(list)];
      localStorage.setItem(PAPER_STORE, JSON.stringify(all));
    } catch (_) {}
  }

  const CASE_FILL_STORE = "rk-sd-case-fills";

  function readCaseFillStore() {
    try {
      const parsed = JSON.parse(localStorage.getItem(CASE_FILL_STORE) || "{}");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  function writeCaseFill(caseId, fills, phase) {
    try {
      const all = readCaseFillStore();
      all[caseId] = { fills: fills || {}, phase, savedAt: Date.now() };
      const entries = Object.entries(all).sort((a, b) => (b[1].savedAt || 0) - (a[1].savedAt || 0)).slice(0, 40);
      localStorage.setItem(CASE_FILL_STORE, JSON.stringify(Object.fromEntries(entries)));
    } catch (_) {}
  }

  function readCaseFill(caseId) {
    return readCaseFillStore()[caseId] || null;
  }

  function deleteCaseFill(caseId) {
    try {
      const all = readCaseFillStore();
      delete all[caseId];
      localStorage.setItem(CASE_FILL_STORE, JSON.stringify(all));
    } catch (_) {}
  }

  function fillsHaveText(fills) {
    return Object.values(fills || {}).some((fields) =>
      fields && Object.values(fields).some((value) => String(value || "").trim())
    );
  }

  function saveActiveAfternoon() {
    if (state.afternoonReview || state.view !== "case" || state.mode !== "exam" || state.examSubmitted) return;
    if (!state.caseList.length) return;
    writePaperRecord(state.caseList, {
      phase: "active",
      fills: state.fills,
      index: state.caseIndex,
      examEndsAt: state.examEndsAt
    });
  }

  function saveActivePaper() {
    if (state.mode !== "exam" || state.examSubmitted || state.examReview || state.view !== "quiz") return;
    writePaperRecord(state.list, {
      phase: "active",
      answers: state.answers,
      flags: state.flags,
      index: state.index,
      examEndsAt: state.examEndsAt
    });
  }

  function answersMatchingExamSession(paper, attempts, sessionDate, windowMs = 120000) {
    const byId = {};
    (attempts || []).forEach((item) => { if (item && item.qid) byId[item.qid] = item; });
    const answers = {};
    (paper || []).forEach((question) => {
      const record = byId[question.id];
      if (!record || record.lastChoice === undefined || record.lastChoice === null) return;
      if (Math.abs(Number(record.lastTime) - Number(sessionDate)) > windowMs) return;
      const choice = Number(record.lastChoice);
      if (!Number.isFinite(choice) || choice < 0) return;
      answers[question.id] = choice;
    });
    return answers;
  }

  async function recoverMorningAnswers(paper) {
    await loadHistoryMap();
    if (typeof QuizDB.getAllSessions !== "function") return null;
    let sessions = [];
    try {
      sessions = await QuizDB.getAllSessions();
    } catch (_) {
      return null;
    }
    const morning = (sessions || [])
      .filter((item) => item && item.type === "morning-exam")
      .sort((a, b) => Number(b.date) - Number(a.date))[0];
    if (!morning) return null;
    const clustered = answersMatchingExamSession(paper, Object.values(state.history), morning.date);
    if (Object.keys(clustered).length) return clustered;
    if (!isFixedMorningPaper(paper)) return null;
    const answers = {};
    paper.forEach((question) => {
      const record = state.history[question.id];
      if (!record || !(record.tried > 0) || record.lastChoice === undefined || record.lastChoice === null) return;
      const choice = Number(record.lastChoice);
      if (!Number.isFinite(choice) || choice < 0) return;
      answers[question.id] = choice;
    });
    return Object.keys(answers).length ? answers : null;
  }

  function isFixedMorningPaper(paper) {
    if (typeof SYLLABUS_PAPER === "undefined" || !SYLLABUS_PAPER.morningIds) return false;
    const ids = SYLLABUS_PAPER.morningIds;
    return paper.length === ids.length && paper.every((question, index) => question.id === ids[index]);
  }

  function showSavedMorningReview(answers) {
    state.answers = answers;
    state.fromHistory = {};
    Object.keys(answers).forEach((id) => { state.fromHistory[id] = true; });
    state.mode = "practice";
    state.examReview = true;
    state.examSubmitted = true;
    state.reveal = true;
    state.examEndsAt = null;
    if (state.timerId) clearInterval(state.timerId);
    if (!/上次作答/.test(state.paperTitle || "")) state.paperTitle += " · 上次作答";
    state.index = 0;
    state.view = "quiz";
    render();
  }

  function openMorningExam(paper, title, options) {
    const fresh = !!(options && options.fresh);
    state.paperGeneration += 1;
    const generation = state.paperGeneration;
    state.paperTitle = title;
    state.mode = "exam";
    state.examSubmitted = false;
    state.examReview = false;
    state.result = null;
    state.fromHistory = {};
    state.chapterId = null;
    state.filter = "all";
    state.list = paper;
    state.index = 0;
    state.answers = {};
    state.flags = {};
    state.reveal = false;
    state.showOrigin = false;
    state.view = "quiz";
    const stored = fresh ? null : readPaperRecord(paper);
    if (stored && stored.phase === "active" && stored.answers && Object.keys(stored.answers).length) {
      state.answers = stored.answers;
      state.flags = stored.flags || {};
      state.index = Math.min(stored.index || 0, Math.max(0, paper.length - 1));
      state.examEndsAt = stored.examEndsAt > Date.now() ? stored.examEndsAt : Date.now() + 120 * 60 * 1000;
      if (state.timerId) clearInterval(state.timerId);
      state.timerId = setInterval(renderTimerOnly, 1000);
      render();
      return;
    }
    if (stored && stored.phase === "submitted" && stored.answers && Object.keys(stored.answers).length) {
      if (state.timerId) clearInterval(state.timerId);
      showSavedMorningReview(stored.answers);
      return;
    }
    state.examEndsAt = Date.now() + 120 * 60 * 1000;
    if (state.timerId) clearInterval(state.timerId);
    state.timerId = setInterval(renderTimerOnly, 1000);
    render();
    if (fresh) return;
    recoverMorningAnswers(paper).then((answers) => {
      if (state.paperGeneration !== generation || state.view !== "quiz") return;
      if (state.examSubmitted || state.examReview || Object.keys(state.answers).length) return;
      if (!answers || !Object.keys(answers).length) return;
      writePaperRecord(paper, { phase: "submitted", answers, index: 0, flags: {} });
      showSavedMorningReview(answers);
    });
  }

  function startExam() {
    // Syllabus-shaped quotas live in exam-blueprint.js. They follow the 2026
    // recall-paper chapter counts and are not an official weighting.
    openMorningExam(assembleMorningPaper(QUESTIONS), "随机上午卷");
  }

  function fixedPaper() {
    return typeof SYLLABUS_PAPER === "undefined" ? null : SYLLABUS_PAPER;
  }

  function startFixedMorning() {
    const spec = fixedPaper();
    if (!spec) return;
    const byId = Object.fromEntries(QUESTIONS.map((question) => [question.id, question]));
    const paper = spec.morningIds.map((id) => byId[id]);
    if (paper.some((question) => !question)) {
      alert("这套模拟卷有题目未能载入，请强制刷新页面后再试。");
      return;
    }
    openMorningExam(paper, `${spec.title} · 上午`);
  }

  function currentCase() {
    return state.caseList[state.caseIndex];
  }

  function norm(s) {
    return String(s || "")
      .replace(/\s+/g, "")
      .replace(/（/g, "(").replace(/）/g, ")")
      .replace(/，/g, ",").replace(/：/g, ":")
      .replace(/[。！!]+$/, "");
  }

  function normalizeCode(value) {
    // Preserve token boundaries, literal whitespace, case, and operators.
    const tokens = String(value || "").match(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|[A-Za-z_$][\w$]*|\d+(?:\.\d+)?|===|!==|>>>|>>|<<|==|!=|<=|>=|&&|\|\||\+\+|--|->|::|\+=|-=|\*=|\/=|[^\s]/g) || [];
    return tokens.length ? JSON.stringify(tokens) : "";
  }

  function aliasHit(input, aliases, matching = "text") {
    const normalize = matching === "code" || matching === "identifier" ? normalizeCode : norm;
    const n = normalize(input);
    if (!n) return false;
    return (aliases || []).some((alias) => n === normalize(alias));
  }

  function setTokens(input) {
    let value = String(input || "").trim().replace(/（/g, "(").replace(/）/g, ")");
    const wrapped = value.match(/^(?:[^(){}=]+)?[({]([^(){}]+)[)}]$/);
    if (wrapped) value = wrapped[1];
    return value.split(/[+＋、,，/]/).map(norm).filter(Boolean);
  }

  function matchSet(input, aliases) {
    const actual = setTokens(input);
    if (!actual.length || new Set(actual).size !== actual.length) return false;
    return (aliases || []).some((alias) => {
      const expected = setTokens(alias);
      return actual.length === expected.length && expected.every((token) => actual.includes(token));
    });
  }

  function matchCompose(input, parts) {
    let s = String(input || "");
    const eq = s.search(/[＝=]/);
    if (eq >= 0) s = s.slice(eq + 1);
    const tokens = setTokens(s);
    if (tokens.length !== parts.length || new Set(tokens).size !== tokens.length) return false;
    const used = new Set();
    return parts.every((aliases) => {
      const index = tokens.findIndex((token, position) => !used.has(position) && aliasHit(token, aliases));
      if (index < 0) return false;
      used.add(index);
      return true;
    });
  }

  function matchTriplet(val, answers) {
    return aliasHit(val.name, answers.name) && aliasHit(val.from, answers.from) && aliasHit(val.to, answers.to);
  }

  function getFill(caseId, fieldId) {
    return (state.fills[caseId] || {})[fieldId] || "";
  }

  function setFill(caseId, fieldId, value) {
    if (submitExpiredExam()) return;
    if (state.afternoonReview) return;
    if (state.mode === "exam" && state.examSubmitted) return;
    state.fills[caseId] = state.fills[caseId] || {};
    if (state.fills[caseId][fieldId] === value) return;
    state.fills[caseId][fieldId] = value;
    delete state.caseAiGrade[caseId];
    state.caseReveal = false;
    state.caseDetails = {};
    state.caseScore = null;
    writeCaseFill(caseId, state.fills[caseId], "active");
    saveActiveAfternoon();
  }

  function fieldMatches(cs, field, input) {
    const hospitalSet = cs.id === "ai-er-1787305198128-0" && ["r9", "r10"].includes(field.id);
    if (field.type === "compose") return matchCompose(input, field.parts);
    if (field.match === "set" || hospitalSet) return matchSet(input, field.answers);
    const matching = field.match || (["alg", "pattern"].includes(cs.type) ? "code" : "text");
    return aliasHit(input, field.answers, matching);
  }

  function unorderedGroup(cs, field) {
    if (field.unorderedGroup) return field.unorderedGroup;
    if (cs.id === "ai-er-1787305198128-0" && ["r4", "r5", "r6"].includes(field.id)) return "hospital-foreign-keys";
    return null;
  }

  function scoreCase(cs) {
    const fills = state.fills[cs.id] || {};
    let got = 0;
    const total = cs.points;
    const details = {};
    const breakdown = {};
    cs.problems.forEach((p) => {
      const triplets = p.fields.filter((f) => f.type === "triplet");
      const others = p.fields.filter((f) => f.type !== "triplet");
      const usedSlot = new Set();
      if (triplets.some((field) => field.componentScores !== undefined)) {
        const partial = scorePartialTriplets(triplets, fills);
        got += partial.got;
        Object.assign(breakdown, partial.breakdown);
        triplets.forEach((field) => { details[field.id] = partial.breakdown[field.id].got === field.score; });
      } else {
        triplets.forEach((expect) => {
          const hit = triplets.find((slot) => {
            if (usedSlot.has(slot.id)) return false;
            const values = {
              name: fills[slot.id + "-name"],
              from: fills[slot.id + "-from"],
              to: fills[slot.id + "-to"]
            };
            return matchTriplet(values, expect.answers);
          });
          if (hit) {
            usedSlot.add(hit.id);
            details[hit.id] = true;
            got += expect.score;
          }
        });
        triplets.forEach((slot) => {
          if (details[slot.id] === undefined) details[slot.id] = false;
        });
      }
      others.forEach((f) => {
        const group = unorderedGroup(cs, f);
        const slots = group ? others.filter((slot) => unorderedGroup(cs, slot) === group) : [f];
        const hit = slots.find((slot) => !usedSlot.has(slot.id) && fieldMatches(cs, f, fills[slot.id]));
        if (hit) {
          usedSlot.add(hit.id);
          details[hit.id] = true;
          got += f.score;
        }
      });
      others.forEach((field) => { if (details[field.id] === undefined) details[field.id] = false; });
    });
    return { got, total, details, breakdown };
  }

  function scorePartialTriplets(fields, fills) {
    const components = ["name", "from", "to"];
    // Bound the bitmask DP to O(rows * references * 2^references).
    if (fields.length > 12) throw new RangeError("Partial triplet groups support at most 12 rows");
    fields.forEach((field) => {
      const weights = field.componentScores;
      if (!weights || Object.keys(weights).length !== 3 ||
          !Number.isFinite(field.score) || field.score <= 0 ||
          components.some((component) => !Object.prototype.hasOwnProperty.call(weights, component) ||
            !Number.isFinite(weights[component]) || weights[component] < 0) ||
          components.reduce((sum, component) => sum + weights[component], 0) !== field.score ||
          field.score !== fields[0].score) {
        throw new TypeError("Invalid componentScores: all triplet rows need finite nonnegative weights totaling the same positive row score");
      }
    });
    const seenInputs = new Set();
    const candidates = fields.map((slot) => {
      const values = Object.fromEntries(components.map((component) => [component, fills[slot.id + "-" + component]]));
      const signature = JSON.stringify(components.map((component) => norm(values[component])));
      const duplicate = seenInputs.has(signature);
      seenInputs.add(signature);
      return fields.map((reference) => {
        const componentPoints = Object.fromEntries(components.map((component) => [component,
          !duplicate && aliasHit(values[component], reference.answers[component]) ? reference.componentScores[component] : 0
        ]));
        return {
          got: components.reduce((sum, component) => sum + componentPoints[component], 0),
          total: slot.score, components: componentPoints, componentScores: reference.componentScores,
          matchedReferenceId: reference.id, duplicate
        };
      });
    });
    const memo = new Map();
    function assignReferences(slotIndex, usedReferences) {
      if (slotIndex === fields.length) return { got: 0, rows: [] };
      const key = slotIndex + ":" + usedReferences;
      if (memo.has(key)) return memo.get(key);
      let best = null;
      fields.forEach((reference, referenceIndex) => {
        const referenceBit = 1 << referenceIndex;
        if (usedReferences & referenceBit) return;
        const row = candidates[slotIndex][referenceIndex];
        const remaining = assignReferences(slotIndex + 1, usedReferences | referenceBit);
        const candidate = { got: row.got + remaining.got, rows: [row, ...remaining.rows] };
        if (!best || candidate.got > best.got) best = candidate;
      });
      memo.set(key, best);
      return best;
    }
    const assignment = assignReferences(0, 0);
    return { got: assignment.got, breakdown: Object.fromEntries(fields.map((field, index) => [field.id, assignment.rows[index]])) };
  }

  function startAfternoon(id) {
    const cs = AFTERNOON_CASES.find((c) => c.id === id);
    if (!cs) return;
    state.view = "case";
    state.mode = "practice";
    // 单题入口仍定位到所选题，但保留完整题目列表以支持前后切换。
    state.caseList = AFTERNOON_CASES.slice();
    state.caseIndex = Math.max(0, state.caseList.findIndex((item) => item.id === id));
    state.caseReveal = false;
    state.caseDetails = {};
    state.caseScore = null;
    state.caseAiGrade = {};
    state.caseRecordedAnswers = {};
    state.examSubmitted = false;
    state.paperTitle = "";
    state.afternoonReview = false;
    const savedCase = readCaseFill(cs.id);
    state.fills[cs.id] = savedCase && savedCase.fills ? { ...savedCase.fills } : {};
    if (savedCase && savedCase.phase === "submitted" && fillsHaveText({ [cs.id]: state.fills[cs.id] })) {
      const savedScore = scoreCase(cs);
      state.caseReveal = true;
      state.caseScore = savedScore;
      state.caseDetails = savedScore.details;
    }
    state.examEndsAt = null;
    if (state.timerId) clearInterval(state.timerId);
    render();
  }

  const TYPE_LABEL = { dfd: "数据流图", er: "数据库设计与 SQL", uml: "UML 建模", alg: "算法填空（C）", pattern: "设计模式填空（Java）", quality: "测试与软件评审专项" };

  function showAfternoonReview() {
    state.mode = "practice";
    state.afternoonReview = true;
    state.examSubmitted = true;
    state.caseReveal = true;
    state.examEndsAt = null;
    if (state.timerId) clearInterval(state.timerId);
    if (!/上次作答/.test(state.paperTitle || "")) state.paperTitle += " · 上次作答";
    let got = 0;
    let total = 0;
    const all = {};
    const breakdown = {};
    state.caseList.forEach((cs) => {
      const scored = scoreCase(cs);
      got += scored.got;
      total += scored.total;
      Object.keys(scored.details).forEach((fieldId) => { all[cs.id + ":" + fieldId] = scored.details[fieldId]; });
      Object.keys(scored.breakdown).forEach((fieldId) => { breakdown[cs.id + ":" + fieldId] = scored.breakdown[fieldId]; });
    });
    state.caseScore = { got, total, breakdown };
    state.caseDetails = all;
    state.caseIndex = 0;
    state.view = "case";
    render();
  }

  function openAfternoonExam(caseList, title, options) {
    const fresh = !!(options && options.fresh);
    if (fresh) {
      deletePaperRecord(caseList);
      caseList.forEach((cs) => deleteCaseFill(cs.id));
    }
    state.paperTitle = title;
    state.view = "case";
    state.mode = "exam";
    state.afternoonReview = false;
    state.caseList = caseList;
    state.caseIndex = 0;
    state.caseReveal = false;
    state.caseDetails = {};
    state.caseScore = null;
    state.caseAiGrade = {};
    state.caseRecordedAnswers = {};
    state.examSubmitted = false;
    state.result = null;
    state.fills = {};
    const stored = fresh ? null : readPaperRecord(caseList);
    if (stored && stored.fills && fillsHaveText(stored.fills)) {
      state.fills = stored.fills;
      if (stored.phase === "submitted") {
        showAfternoonReview();
        return;
      }
      state.caseIndex = Math.min(stored.index || 0, Math.max(0, caseList.length - 1));
      state.examEndsAt = stored.examEndsAt > Date.now() ? stored.examEndsAt : Date.now() + 150 * 60 * 1000;
      if (state.timerId) clearInterval(state.timerId);
      state.timerId = setInterval(renderTimerOnly, 1000);
      render();
      return;
    }
    state.examEndsAt = Date.now() + 150 * 60 * 1000;
    if (state.timerId) clearInterval(state.timerId);
    state.timerId = setInterval(renderTimerOnly, 1000);
    render();
  }

  function startAfternoonExam() {
    // Each available type contributes one randomly selected case.
    const caseList = ["dfd", "er", "uml", "alg", "pattern"].map((type) => shuffled(AFTERNOON_CASES.filter((cs) => cs.type === type))[0]).filter(Boolean);
    openAfternoonExam(caseList, "随机下午卷");
  }

  function startFixedAfternoon() {
    const spec = fixedPaper();
    if (!spec) return;
    const byId = Object.fromEntries(AFTERNOON_CASES.map((item) => [item.id, item]));
    const caseList = spec.afternoonIds.map((id) => byId[id]);
    if (caseList.some((item) => !item)) {
      alert("这套模拟卷有题目未能载入，请强制刷新页面后再试。");
      return;
    }
    openAfternoonExam(caseList, `${spec.title} · 下午`);
  }

  function gotoCase(i) {
    if (i < 0 || i >= state.caseList.length || i === state.caseIndex) return;
    state.caseIndex = i;
    saveActiveAfternoon();
    if (state.mode === "practice") {
      // Practice feedback belongs to the previous case; exam review spans all cases.
      state.caseReveal = false;
      state.caseDetails = {};
      state.caseScore = null;
    }
    render();
  }

  function gradeAfternoon(submitAll) {
    if (state.mode === "exam" && state.examSubmitted) return;
    if (submitAll && state.mode === "exam") {
      state.examSubmitted = true;
      state.examEndsAt = null;
      let got = 0;
      let total = 0;
      const all = {};
      const breakdown = {};
      state.caseList.forEach((cs) => {
        const r = scoreCase(cs);
        got += r.got;
        total += r.total;
        Object.keys(r.details).forEach((k) => {
          all[cs.id + ":" + k] = r.details[k];
        });
        Object.keys(r.breakdown).forEach((fieldId) => { breakdown[cs.id + ":" + fieldId] = r.breakdown[fieldId]; });
        QuizDB.recordCase(cs.id, r.got, r.total);
        writeCaseFill(cs.id, state.fills[cs.id] || {}, "submitted");
      });
      writePaperRecord(state.caseList, { phase: "submitted", fills: state.fills, index: 0 });
      if (state.timerId) clearInterval(state.timerId);
      state.caseReveal = true;
      state.caseScore = { got, total, breakdown };
      state.caseDetails = all;
      state.result = { right: got, total, kind: "afternoon" };
      state.view = "result";
      render();
      return;
    }
    const cs = currentCase();
    const r = scoreCase(cs);
    state.caseReveal = true;
    state.caseScore = r;
    state.caseDetails = r.details;
    const answerSnapshot = JSON.stringify(state.fills[cs.id] || {});
    if (state.caseRecordedAnswers[cs.id] !== answerSnapshot) {
      state.caseRecordedAnswers[cs.id] = answerSnapshot;
      QuizDB.recordCase(cs.id, r.got, r.total).then(() => render());
      writeCaseFill(cs.id, state.fills[cs.id] || {}, "submitted");
    }
    render();
  }

  function fieldStatus(fieldId) {
    if (!state.caseReveal) return "";
    const row = getTripletBreakdown(fieldId);
    if (row) return row.got === row.total ? "ok" : row.got > 0 ? "partial" : "bad";
    const cs = currentCase();
    const prefixed = cs ? state.caseDetails[cs.id + ":" + fieldId] : undefined;
    const ok = prefixed !== undefined ? prefixed : state.caseDetails[fieldId];
    if (ok === true) return "ok";
    if (ok === false) return "bad";
    return "";
  }

  function getTripletBreakdown(fieldId) {
    const breakdown = state.caseScore && state.caseScore.breakdown;
    const caseItem = currentCase();
    return breakdown && caseItem ? breakdown[caseItem.id + ":" + fieldId] || breakdown[fieldId] : null;
  }

  function renderTripletReference(caseItem, field) {
    const row = getTripletBreakdown(field.id);
    if (!row) return `参考：${esc(refText(field))}（三条缺失流顺序不限）`;
    const reference = caseItem.problems.flatMap((problem) => problem.fields).find((candidate) => candidate.id === row.matchedReferenceId);
    const labels = { name: "名称", from: "起点", to: "终点" };
    const components = Object.keys(labels).map((component) => `${labels[component]} ${row.components[component]}/${row.componentScores[component]}`).join("；");
    return `本地练习得分：${row.got}/${row.total}；${components}。${row.duplicate ? "重复三元组不重复计分。" : ""}匹配参考：${esc(refText(reference))}（一对一最优分配，顺序不限；非官方尺度）`;
  }

  function refText(f) {
    if (f.type === "triplet") {
      return "名称：" + f.answers.name[0] + "；起点：" + f.answers.from[0] + "；终点：" + f.answers.to[0];
    }
    if (f.type === "compose") {
      return f.parts.map((p) => p[0]).join(" + ");
    }
    return f.answers[0];
  }

  function buildCaseGradeRequest(cs) {
    const fills = state.fills[cs.id] || {};
    const context = {
      title: cs.title, intro: cs.intro, story: cs.story, blocks: cs.blocks,
      table: cs.table, figures: cs.figures, schema: cs.schema, problems: cs.problems,
      gradingNote: "代码区分大小写，保留运算符。unorderedGroup 同组空顺序不限且不能重复计分；match=set 表示无序属性集合。componentScores 是本地练习分项尺度：三元组整体一对一最大权重分配，重复输入不重复得分，不拼接不同参考的分项。AI 不执行本地分项尺度，分数仅作独立语义参考，不覆盖规则得分。"
    };
    const fields = cs.problems.flatMap((problem) => problem.fields.map((field) => ({
      id: field.id,
      label: `${problem.title} ${problem.prompt}\n${field.label}`,
      ref: JSON.stringify({
        reference: refText(field), aliases: field.answers, parts: field.parts,
        componentScores: field.componentScores,
        match: field.match || (cs.id === "ai-er-1787305198128-0" && ["r9", "r10"].includes(field.id) ? "set" : ["alg", "pattern"].includes(cs.type) ? "code" : field.type),
        unorderedGroup: unorderedGroup(cs, field) || (field.type === "triplet" ? problem.id : null)
      }),
      score: field.score,
      student: field.type === "triplet"
        ? `名称:${fills[field.id + "-name"] || "未填"}；起点:${fills[field.id + "-from"] || "未填"}；终点:${fills[field.id + "-to"] || "未填"}`
        : fills[field.id] || ""
    })));
    // The existing server consumes only title and fields; keep context in a consumed field.
    return { title: `${cs.title}\n完整题目上下文（JSON）：\n${JSON.stringify(context)}`, fields };
  }

  function renderDataTable(t) {
    return `
      <figure class="data-table">
        <table>
          <thead><tr>${t.headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
          <tbody>${t.rows.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
        <figcaption>${esc(t.caption)}</figcaption>
      </figure>`;
  }

  function renderCaseBody(cs) {
    const seenParagraphs = new Set();
    const paragraphs = (cs.story || []).filter((paragraph) => {
      const key = String(paragraph).trim();
      if (seenParagraphs.has(key)) return false;
      seenParagraphs.add(key);
      return true;
    }).map((paragraph) => `<p>${esc(paragraph)}</p>`);
    const blocks = (cs.blocks || []).map((b) => {
        if (b.table) return renderDataTable(b.table);
        if (b.code) return `<pre style="background:#0f172a;color:#e2e8f0;padding:12px 14px;border-radius:8px;overflow-x:auto;font-family:'IBM Plex Mono',monospace;font-size:13px;line-height:1.7;margin:10px 0;white-space:pre">${esc(b.code)}</pre>`;
        if (!b.p || seenParagraphs.has(String(b.p).trim())) return "";
        seenParagraphs.add(String(b.p).trim());
        return `<p>${esc(b.p)}</p>`;
    });
    if (cs.table && !(cs.blocks || []).some((block) => JSON.stringify(block.table) === JSON.stringify(cs.table))) blocks.push(renderDataTable(cs.table));
    return paragraphs.concat(blocks).join("");
  }

  // AI判分徽标：揭示后若有AI结果，在每个空的参考答案行后展示 verdict+理由
  function aiGradeChip(cs, fieldId) {
    const g = state.caseAiGrade[cs.id];
    if (!g || !g.results || !g.results[fieldId]) return "";
    const r = g.results[fieldId];
    const map = {
      hit: ["🟢 AI判：得分", "#16a34a"],
      partial: ["🟡 AI判：半对", "#d97706"],
      miss: ["🔴 AI判：不得分", "#dc2626"]
    };
    const [txt, color] = map[r.verdict] || ["AI判：？", "#64748b"];
    return `<div style="margin-top:2px;font-size:12.5px"><b style="color:${color}">${txt}</b>${r.reason ? " —— " + esc(r.reason) : ""}</div>`;
  }

  function renderCaseExplanation(cs) {
    const explanationByType = {
      dfd: {
        points: ["外部实体与系统边界", "数据存储和数据流方向", "父图与 0 层图的数据流平衡", "数据流的组成分解"],
        steps: [
          "先圈出系统外部、与系统交换数据的对象；加工和数据存储属于系统内部，不能当作外部实体。",
          "根据题干中的“存储”“写入”“读取”等词，确定各数据存储保存的实际数据内容。",
          "沿着加工的输入和输出逐条补充缺失数据流，并核对起点、终点和方向。",
          "最后检查上下文图与 0 层图是否保持边界流平衡，再按题干原词写组成关系。"
        ],
        mistakes: ["把加工编号或数据存储误写成外部实体", "只写数据流名称，漏写起点或终点", "忽略加工读取数据存储的输入流", "把“有无缺陷”和“缺陷类型”等组成项混写"]
      },
      er: {
        points: ["实体、属性与联系的区分", "联系基数判断", "E-R 图向关系模式转换", "主键和外键设计"],
        steps: [
          "先从业务名词中识别实体，再区分描述实体的属性和实体之间的业务联系。",
          "根据“一个”“多个”“每个”等约束判断联系的 1:1、1:N 或 M:N 基数。",
          "将实体转换为关系模式，实体标识属性作为主键；1:N 联系通常把 1 端主键作为 N 端外键。",
          "检查每个关系模式的主键、外键和联系属性是否完整，避免重复存储同一事实。"
        ],
        mistakes: ["把属性当成实体", "忽略题干中的基数约束", "M:N 联系没有建立中间关系", "外键方向或主键选择错误"]
      },
      uml: {
        points: ["UML 图的语义识别", "参与者、用例和类的职责划分", "关系方向与多重性", "行为消息或状态转换"],
        steps: [
          "先判断题目要求识别的是用例图、类图、顺序图还是状态图，不同图的符号语义不能混用。",
          "根据角色职责确定参与者或类的边界，再根据题干动作确定用例、操作或消息。",
          "逐条核对关系的方向、箭头、包含/扩展语义以及类之间的多重性。",
          "最后用题干场景回放一次交互或状态变化，检查模型是否覆盖主要业务流程。"
        ],
        mistakes: ["混淆包含和扩展关系", "把继承关系当成关联关系", "消息发送方向写反", "遗漏多重性或状态转换条件"]
      },
      alg: {
        points: ["算法思想与适用条件", "循环变量和边界条件", "状态转移或贪心选择", "时间复杂度分析"],
        steps: [
          "先判断算法采用的核心思想，例如贪心、动态规划、回溯或分治。",
          "结合初始化、循环条件和更新语句，逐步跟踪关键变量的含义。",
          "检查每个空所在语句需要的是当前值、最优值、下标还是边界值。",
          "最后根据主要循环层数和每次操作成本判断时间复杂度，并验证极端输入。"
        ],
        mistakes: ["只看变量名称，不看初始化和更新顺序", "忽略数组下标边界", "把局部最优误认为全局最优", "复杂度分析漏算内层循环"]
      },
      pattern: {
        points: ["设计模式的意图", "参与者职责", "对象创建或行为变化", "模式结构与应用场景匹配"],
        steps: [
          "先看题干要解决的是对象创建、对象结构还是对象行为变化问题。",
          "再根据职责变化的位置识别模式中的核心对象及其协作关系。",
          "将代码中的接口、具体实现、上下文或管理者与模式角色对应起来。",
          "用模式意图反查题目场景，确认不是只因为类名相似就误判模式。"
        ],
        mistakes: ["只凭类名判断设计模式", "混淆策略、状态和命令模式", "忽略上下文对象的职责", "没有说明模式解决的实际问题"]
      }
    };
    const explanation = explanationByType[cs.type] || explanationByType.dfd;
    return `
      <div class="panel case-explanation">
        <h3>知识点解析 · ${esc(TYPE_LABEL[cs.type] || cs.type)}</h3>
        <div class="explain"><b>本题考查：</b>${explanation.points.map((point) => esc(point)).join("、")}</div>
        <h4>建议解题步骤</h4>
        ${md(explanation.steps.map((step, index) => `${index + 1}. ${step}`).join("\n"))}
        <h4>常见失分点</h4>
        ${md(explanation.mistakes.map((mistake) => `- ${mistake}`).join("\n"))}
        <h4>本题参考答案依据</h4>
        <div class="explain">${md(cs.explain || "请结合题干说明、图形和填空参考答案逐项核对。")}</div>
      </div>`;
  }

  function renderField(cs, f) {
    const st = fieldStatus(f.id);
    if (f.type === "triplet") {
      return `
        <tr>
          <td>${esc(f.label)}</td>
          <td><input data-fill="${f.id}-name" class="${fieldStatus(f.id)}" value="${esc(getFill(cs.id, f.id + "-name"))}" placeholder="数据流名称" ${state.caseReveal && (state.mode === "exam" || state.afternoonReview) ? "readonly" : ""}/></td>
          <td><input data-fill="${f.id}-from" class="${fieldStatus(f.id)}" value="${esc(getFill(cs.id, f.id + "-from"))}" placeholder="起点" ${state.caseReveal && (state.mode === "exam" || state.afternoonReview) ? "readonly" : ""}/></td>
          <td><input data-fill="${f.id}-to" class="${fieldStatus(f.id)}" value="${esc(getFill(cs.id, f.id + "-to"))}" placeholder="终点" ${state.caseReveal && (state.mode === "exam" || state.afternoonReview) ? "readonly" : ""}/></td>
        </tr>
        ${state.caseReveal ? `<tr><td colspan="4" class="ref-ans">${renderTripletReference(cs, f)}${aiGradeChip(cs, f.id)}</td></tr>` : ""}`;
    }
    return `
      <tr>
        <td style="width:28%">${esc(f.label)}</td>
        <td colspan="3"><input data-fill="${f.id}" class="${st}" value="${esc(getFill(cs.id, f.id))}" ${state.caseReveal && (state.mode === "exam" || state.afternoonReview) ? "readonly" : ""}/></td>
      </tr>
      ${state.caseReveal ? `<tr><td colspan="4" class="ref-ans">参考：${esc(refText(f))}${aiGradeChip(cs, f.id)}</td></tr>` : ""}`;
  }

  function renderCase() {
    const cs = currentCase();
    if (!cs) return home();
    const answered = Object.keys(state.fills[cs.id] || {}).filter((k) => getFill(cs.id, k)).length;
    return `
      <div class="desk">
        <div class="topbar">
          <strong>软件设计师考试机考练习系统</strong>
          <span>${state.paperTitle ? `${esc(state.paperTitle)} · ` : "应用技术 · "}${esc(cs.no)} ${esc(cs.title)}</span>
          <span class="grow"></span>
          <span>${answered} 空已填</span>
          ${state.mode === "exam" ? `<span class="timer" id="timer">${remainText()}</span>` : ""}
          ${state.caseScore && state.caseReveal ? `<span class="score-chip">${state.caseScore.got}/${state.caseScore.total}</span>` : ""}
          <button class="btn ghost" style="color:#fff;border-color:#5b6b7c" data-act="home">返回</button>
          ${state.mode === "exam"
            ? `<button class="btn warn" data-act="pm-submit">交卷</button>`
            : `<button class="btn" data-act="pm-grade">阅卷</button>`}
        </div>
        <div class="stage pm">
          <div class="paper-wrap">
            <div class="paper">
              <div class="head-row">
                <div class="q-kicker">${esc(cs.no)}（共 ${cs.points} 分）· ${TYPE_LABEL[cs.type] || cs.type}</div>
                <div class="seals"><span class="seal blue">${esc(cs.seal)}</span></div>
              </div>
              <p class="src-note">${esc(cs.source)}</p>
              <p class="story" style="font-weight:600">${esc(cs.intro)}</p>
              <div class="story">${renderCaseBody(cs)}</div>
              ${(cs.figures || []).map((fig) => `
                <figure class="figure">
                  ${fig.svg}
                  <figcaption>${esc(fig.caption)}</figcaption>
                </figure>`).join("")}
              ${cs.schema ? `<div class="schema-box"><div class="schema-title">【关系模式设计】</div>${cs.schema.map((line) => `<div>${esc(line)}</div>`).join("")}</div>` : ""}
              ${cs.problems.map((p) => `
                <section class="prob">
                  <h4>${esc(p.title)}</h4>
                  <p class="prompt">${esc(p.prompt)}</p>
                  <table class="blank-table">
                    ${p.fields[0] && p.fields[0].type === "triplet" ? `
                      <tr><th>编号</th><th>数据流名称</th><th>起点</th><th>终点</th></tr>
                      ${p.fields.map((f) => renderField(cs, f)).join("")}` : `
                      <tr><th>条目</th><th colspan="3">解答</th></tr>
                      ${p.fields.map((f) => renderField(cs, f)).join("")}`}
                  </table>
                </section>`).join("")}
              <div class="toolbar">
                <button class="btn ghost" data-act="pm-prev">上一题</button>
                <button class="btn" data-act="pm-next">下一题</button>
                ${state.afternoonReview ? `<button class="btn" data-act="retake-afternoon">重新作答</button>` : ""}
                ${state.mode === "practice" ? `<button class="btn ghost" data-act="pm-explain">查看解析</button>` : ""}
                ${state.afternoonReview ? `<p class="hint">这是上次交卷保留的填空和参考答案。</p>` : ""}
                ${state.mode === "practice" ? (() => {
                  const g = state.caseAiGrade[cs.id];
                  if (g && g.loading) return `<button class="btn ghost" disabled style="opacity:.5;cursor:not-allowed">⏳ AI 判分中…</button>`;
                  return `<button class="btn ghost" data-act="ai-grade">🤖 AI 智能判分（宽松语义）</button>`;
                })() : ""}
              </div>
              ${state.caseReveal && state.mode === "practice" ? renderCaseExplanation(cs) : ""}
              ${(() => {
                const g = state.caseAiGrade[cs.id];
                if (!g || !g.results) return "";
                const fields = [];
                cs.problems.forEach((p) => p.fields.forEach((f) => fields.push(f)));
                let aiGot = 0;
                fields.forEach((f) => {
                  const r = g.results[f.id];
                  if (!r) return;
                  aiGot += r.verdict === "hit" ? (f.score || 0) : r.verdict === "partial" ? (f.score || 0) / 2 : 0;
                });
                const rule = scoreCase(cs);
                return `
                <div class="panel">
                  <h3>AI 智能判分 vs 规则判分</h3>
                  <div class="explain">
                    规则判分（严格别名匹配，按题目分项尺度）：<b>${rule.got}/${rule.total}</b>　｜　AI 独立参考分（语义等价，半对计一半）：<b style="color:#1d4ed8">${aiGot.toFixed(1)}/${cs.points}</b><br>
                    AI 不执行本地分项尺度，不覆盖规则得分或学习记录。<br>
                    两套分数仅供练习参考，AI 可能误判，均不代表官方阅卷尺度；请逐空核对题干与参考答案。
                  </div>
                </div>`;
              })()}
            </div>
          </div>
          <aside class="sheet">
            <h3>答题卡</h3>
            <div class="filter">
              ${state.caseList.map((c, i) => `
                <button data-case-goto="${i}" class="${i === state.caseIndex ? "on" : ""}">${esc(c.no)} · ${c.type.toUpperCase()}</button>
              `).join("")}
            </div>
            <div class="legend">
              填空按完整别名匹配，代码区分大小写与运算符。缺失数据流顺序不限。五类专项练习 150 分钟 / 75 分（题型齐全时）；面向对象程序设计目前仅 Java，不含 C++。本页不是两科 240 分钟连考模拟；已核实的 2026 上半年机考规则为基础知识 90–120 分钟、应用技术使用剩余时间，下半年以正式通知为准。
            </div>
          </aside>
        </div>
      </div>`;
  }


  function current() {
    return state.list[state.index];
  }

  function choose(i) {
    if (submitExpiredExam()) return;
    const q = current();
    if (!q) return;
    if (state.examReview || (state.mode === "exam" && state.examSubmitted)) return;
    if (state.mode === "exam" && state.reveal) return;
    const prev = state.answers[q.id];
    const fromHist = !!(state.fromHistory && state.fromHistory[q.id]);
    state.answers[q.id] = i;
    // 解析绑定“题目 + 考生选项”。改选后必须清掉旧结果，避免错因和答案卡显示上一份解析。
    if (prev !== undefined && prev !== i) {
      delete state.aiExplain[q.id];
      delete state.aiCacheHit[q.id];
    }
    if (fromHist) delete state.fromHistory[q.id];
    if (state.mode === "exam") saveActivePaper();
    if (state.mode === "practice") {
      state.reveal = true;
      // 首次作答，或改选历史回填的选项时，写入数据库（含所选选项）
      if (prev === undefined || (fromHist && prev !== i)) {
        recordAttempt(q, i === q.answer, i);
      }
    }
    render();
  }

  function goto(i) {
    if (i < 0 || i >= state.list.length) return;
    state.index = i;
    state.questionStartTime = Date.now();
    const q = current();
    state.reveal = state.examReview || (state.mode === "practice" && state.answers[q.id] !== undefined);
    state.showOrigin = false;
    saveActivePaper();
    render();
  }

  function submitExam() {
    if (state.mode !== "exam" || state.examSubmitted) return;
    state.examSubmitted = true;
    state.examEndsAt = null;
    let right = 0;
    state.list.forEach((q) => {
      const a = state.answers[q.id];
      const ok = a === q.answer;
      if (ok) right += 1;
      if (a !== undefined) recordAttempt(q, ok, a);
    });
    writePaperRecord(state.list, { phase: "submitted", answers: { ...state.answers }, flags: state.flags, index: state.index });
    if (state.timerId) clearInterval(state.timerId);
    state.result = { right, total: state.list.length };
    state.reveal = true;
    state.view = "result";
    QuizDB.saveSession({
      type: "morning-exam",
      date: Date.now(),
      right, total: state.list.length,
      score: Math.round((right / state.list.length) * 75)
    });
    render();
  }

  function remainText() {
    if (!state.examEndsAt) return "";
    const ms = Math.max(0, state.examEndsAt - Date.now());
    const s = Math.floor(ms / 1000);
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return h + ":" + m + ":" + sec;
  }

  function renderTimerOnly() {
    if (submitExpiredExam()) return;
    const el = document.getElementById("timer");
    if (el) el.textContent = remainText();
  }

  function submitExpiredExam() {
    if (state.mode !== "exam" || state.examSubmitted || !state.examEndsAt || Date.now() < state.examEndsAt) return false;
    if (state.view === "case") gradeAfternoon(true);
    else if (state.view === "quiz") submitExam();
    else return false;
    return true;
  }

  function home() {
    const s = loadStore().attempts || {};
    // 异步刷新「今日复习」到期数（渲染后填充徽标）
    setTimeout(() => {
      const el = document.getElementById("reviewCount");
      if (!el) return;
      QuizDB.reviewDue().then((due) => {
        el.textContent = due.length ? `· ${due.length} 题到期` : "· 无到期";
        el.style.color = due.length ? "#f59e0b" : "#64748b";
      }).catch(() => { el.textContent = ""; });
    }, 0);
    const triedAll = QUESTIONS.filter((q) => s[q.id] && s[q.id].tried).length;
    const origAll = QUESTIONS.filter((q) => q.kind === "original").length;
    return `
      <div class="cover">
        <div class="ticket">
          <div class="ticket-spine">计算机技术与软件专业技术资格考试</div>
          <div class="ticket-body">
            <div class="kicker">Software Designer · Intermediate</div>
            <h1>软件设计师 机考练习</h1>
            <p class="lede">按教程第 5 版章节组卷。每章同时收录 2026 上半年考生回忆版真题，以及对照大纲改写的同类题。练习时可看解析、对照原题；模拟卷隐藏答案，交卷后出分，手感贴近机考答题卡。</p>
            <div class="actions">
              ${fixedPaper() ? `
                <button class="btn" data-act="fixed-morning">${esc(fixedPaper().title)} · 上午 75 题</button>
                <button class="btn" data-act="fixed-afternoon">${esc(fixedPaper().title)} · 下午 5 题</button>
              ` : ""}
              <button class="btn ghost" data-act="exam">另抽一套上午卷 / 120 分钟</button>
              <button class="btn ghost" data-act="pm-exam">另抽一套下午卷 / 150 分钟</button>
              <button class="btn ghost" data-act="review">📅 今日复习 <b id="reviewCount" style="color:#f59e0b">…</b></button>
              <button class="btn ghost" data-act="wrong">打开错题本</button>
              <button class="btn ghost" data-act="stats">学习统计</button>
            </div>
            <div class="stats-row">
              <p>「10月6日模拟卷」是固定的一套题。「另抽一套」会按同样的章节配额重新抽题，每次题目不同。配额对齐 2026 上半年回忆版，并保证数学、多媒体、体系结构、系统转换、面向对象测试、云计算和信息化出现。这不是官方配额。下午设计模式目前仅 Java，不含 C++。</p>
              <span>题库 <b>${QUESTIONS.length}</b></span>
              <span>回忆版真题 <b>${origAll}</b></span>
              <span>已练过 <b>${triedAll}</b></span>
              <span>${QuizDB.usingSharedDb && QuizDB.usingSharedDb() ? "本机共享库" : "仅本浏览器"}</span>
            </div>
          </div>
        </div>
        <h2 class="section-label">专项递进练习 · 一题一答</h2>
        <p class="lede" style="margin-top:6px">适合还不会下手时先拆技能点。每题独立作答，点「查看本题答案」只揭示当前题，不必翻到文末。</p>
        <div class="pm-grid">
          <a class="pm-card" href="drill-structured-design.html" style="text-decoration:none;color:inherit">
            <span class="tag dfd">结构化设计 · 递进</span>
            <h3>变换型 DFD→模块结构</h3>
            <p>关卡 A→F · 一题一答 · 可核对本题</p>
          </a>
        </div>
        <h2 class="section-label">下午应用技术 · 填空机考</h2>
        <p class="lede" style="margin-top:6px">数据流图、数据库设计与 SQL、UML、C 算法、面向对象设计模式（本库仅 Java，通常对应试题六，C++ 为试题五）。以下为本地练习分类，不是官方组卷模板。测试与代码评审专项在下方单列，不加入五类随机卷。</p>
        <div class="pm-grid">
          ${AFTERNOON_CASES.filter((c) => c.type !== "quality").map((c) => `
            <button class="pm-card" data-pm="${c.id}">
              <span class="tag ${c.type}">${c.no} · ${(TYPE_LABEL[c.type] || c.type)}${c.kind === "original" ? " · 真题" : ""}</span>
              <h3>${esc(c.title)}</h3>
              <p>${c.points} 分 · 约 ${c.minutes} 分钟</p>
            </button>`).join("")}
        </div>
        ${AFTERNOON_CASES.some((caseItem) => caseItem.type === "quality") ? `
        <h2 class="section-label">考纲专项 · 测试与软件评审</h2>
        <p class="lede">独立能力练习，不代表正式考试新增固定大题，不纳入上方五类随机卷。</p>
        <div class="pm-grid">
          ${AFTERNOON_CASES.filter((caseItem) => caseItem.type === "quality").map((caseItem) => `
            <button class="pm-card" data-pm="${esc(caseItem.id)}">
              <span class="tag">${esc(TYPE_LABEL[caseItem.type])} · 原创专项</span>
              <h3>${esc(caseItem.title)}</h3>
              <p>${caseItem.points} 分 · 约 ${caseItem.minutes} 分钟</p>
            </button>`).join("")}
        </div>` : ""}
        <h2 class="section-label">上午基础知识 · 章节练习</h2>
        <div class="chapter-grid">
          ${CHAPTERS.map((c) => {
            const p = chapterProgress(c.id);
            const pct = p.total ? Math.round((p.tried / p.total) * 100) : 0;
            return `
              <button class="chap" data-chap="${c.id}">
                <div class="no">${c.no} · ${esc(c.syllabus)}</div>
                <h2>${esc(c.name)}</h2>
                <p>${esc(c.hint)}</p>
                <div class="bar"><i style="width:${pct}%"></i></div>
                <div class="meta"><span>真题 ${p.orig} · 共 ${p.total}</span><span>${p.tried}/${p.total}</span></div>
              </button>`;
          }).join("")}
        </div>
        <p class="note">真题为 2026 年 5 月 23 日考生回忆版，不是软考办官方原卷。带图计算题未收录死答案。解析按大纲常考结论整理，供举一反三。</p>
      </div>`;
  }

  function optionClass(q, i) {
    const chosen = state.answers[q.id];
    const showAns = state.reveal && state.mode === "practice";
    let cls = "opt";
    if (chosen === i) cls += " chosen";
    if (showAns) {
      if (i === q.answer) cls += " ok";
      else if (chosen === i && i !== q.answer) cls += " bad";
    }
    return cls;
  }

  function originBlock(q) {
    if (!q.related) return `<p class="hint">本题本身就是回忆版真题（${esc(q.exam)} 第 ${q.qnum} 题）。</p>`;
    const o = byId(q.related);
    if (!o) return "";
    return `
      <div class="origin">
        <strong>${esc(o.exam)} 第 ${o.qnum} 题 · ${esc(o.point)}</strong>
        <div style="margin:8px 0">${esc(o.stem)}</div>
        ${o.options.map((t, i) => `${LETTERS[i]}. ${esc(t)}`).join("<br>")}
        <div style="margin-top:8px">参考答案：${LETTERS[o.answer]}　${esc(o.explain)}</div>
      </div>`;
  }

  function quiz() {
    const q = current();
    if (!q) return home();
    const answered = state.list.filter((item) => {
      if (state.answers[item.id] !== undefined) return true;
      const h = historyRec(item.id);
      return !!(h && h.tried > 0);
    }).length;
    const chap = CHAPTERS.find((c) => c.id === q.chapter);
    const title = state.paperTitle || (state.mode === "exam" ? "基础知识 · 模拟试卷" : (chap ? chap.name : "练习"));
    const hist = state.mode === "practice" ? historyRec(q.id) : null;
    const histMark = state.mode === "practice" ? historyMark(q.id) : "";
    return `
      <div class="desk">
        <div class="topbar">
          <strong>软件设计师考试机考练习系统</strong>
          <span>${esc(title)}</span>
          <span class="grow"></span>
          <span>${state.mode === "practice" ? "已做过" : "已答"} ${answered}/${state.list.length}</span>
          ${state.mode === "exam" ? `<span class="timer" id="timer">${remainText()}</span>` : ""}
          <button class="btn ghost" style="color:#fff;border-color:#5b6b7c" data-act="home">返回</button>
          ${state.mode === "exam" ? `<button class="btn warn" data-act="submit">交卷</button>` : ""}
        </div>
        <div class="stage">
          <div class="paper-wrap">
            <div class="paper">
              <div class="head-row">
                <div class="q-kicker">
                  第 ${state.index + 1} 题 / 共 ${state.list.length} 题
                  · ${esc(q.point)}
                  · ${esc(chap ? chap.syllabus : "")}
                </div>
                <div class="seals">
                  ${q.kind === "original"
                    ? `<span class="seal red">真题</span>`
                    : `<span class="seal blue">类题</span>`}
                  ${hist && hist.tried > 0
                    ? `<span class="seal ${histMark === "ok" ? "green" : histMark === "no" ? "orange" : "blue"}">已做过 · ${hist.correct || 0}对/${hist.wrong || Math.max(0, (hist.tried || 0) - (hist.correct || 0))}错</span>`
                    : ""}
                </div>
              </div>
              <div class="stem">${esc(q.stem)}</div>
              <div class="opts">
                ${q.options.map((t, i) => `
                  <button class="${optionClass(q, i)}" data-opt="${i}">
                    <span class="tag">${LETTERS[i]}</span>
                    <span class="txt">${esc(t)}</span>
                  </button>`).join("")}
              </div>
              <div class="toolbar">
                <button class="btn ghost" data-act="prev">上一题</button>
                <button class="btn" data-act="next">下一题</button>
                <button class="btn ghost" data-act="flag">${state.flags[q.id] ? "取消标记" : "标记此题"}</button>
                ${state.examReview ? `<button class="btn" data-act="retake-morning">重新作答</button>` : ""}
                ${state.mode === "practice" ? `<button class="btn ghost" data-act="explain">查看解析</button>` : ""}
                ${state.mode === "practice" ? `<button class="btn ghost" data-act="origin">${q.kind === "original" ? "本题即考题" : "对照考题"}</button>` : ""}
              </div>
              <div class="hint">快捷键 1–4 选答案，N 下一题，P 上一题，M 标记${state.mode === "practice" ? "，E 解析，O 对照考题" : ""}。${state.examReview ? "这是上次交卷保留的选项和解析。" : (state.mode === "practice" ? "答题卡浅绿/浅红表示历史做过。" : "")}</div>
              ${state.mode === "practice" && state.reveal ? `
                <div class="panel">
                  <h3>解析</h3>
                  <div class="explain">参考答案 ${LETTERS[q.answer]}。${esc(q.explain)}</div>
                  ${state.answers[q.id] !== undefined && state.answers[q.id] !== q.answer ? (() => {
                    const related = QUESTIONS.filter((x) => x.point === q.point && x.id !== q.id);
                    return related.length ? `
                      <div style="margin-top:12px;padding:10px 14px;background:#fef6e6;border-left:3px solid var(--flag)">
                        <strong style="font-size:13px">举一反三 · 同考点「${esc(q.point)}」还有 ${related.length} 题</strong>
                        <div style="margin-top:6px;font-size:13px">${related.slice(0, 3).map((r) => `<button class="btn ghost" style="padding:2px 8px;font-size:12px;margin:2px" data-practice-qid="${r.id}">${r.id} · ${esc(r.point)}</button>`).join("")}</div>
                      </div>` : "";
                  })() : ""}
                  <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                    <button class="btn ghost" data-act="ai-explain" ${state.aiLoading || state.aiVariantsLoading ? "disabled style='opacity:.5;cursor:not-allowed'" : ""}>${state.aiLoading ? "⏳ AI 解析中…" : "🤖 AI 深度解析"}</button>
                    <button class="btn ghost" data-act="ai-variants" ${state.aiLoading || state.aiVariantsLoading ? "disabled style='opacity:.5;cursor:not-allowed'" : ""}>${state.aiVariantsLoading ? "⏳ 强化题生成中（约10秒）…" : "💪 同考点 AI 强化出题"}</button>
                    ${q.pendingSave ? `<button class="btn" data-act="ai-save">💾 入库保存本题</button>` : ""}
                    ${state.aiVariantsLoading ? `<span style="font-size:12px;color:#64748b">AI 正在围绕「${esc(q.point)}」命题，请稍候…</span>` : ""}
                  </div>
                  ${state.aiExplain[q.id] ? `
                    <div style="margin-top:10px">
                      ${state.aiCacheHit[q.id] ? `<div class="ai-cache-note">⚡ 本地缓存 · 秒开</div>` : ""}
                      ${renderAiAnalysis(q)}
                    </div>` : ""}
                </div>` : ""}
              ${state.mode === "practice" && state.showOrigin ? `
                <div class="panel">
                  <h3>对照考题</h3>
                  ${originBlock(q)}
                </div>` : ""}
            </div>
          </div>
          <aside class="sheet">
            <h3>答题卡</h3>
            ${state.mode === "practice" && state.chapterId && state.chapterId !== "wrong" && state.chapterId !== "review" && !String(state.chapterId).startsWith("point-") && state.chapterId !== "wrong-redo" ? `
              <div class="filter">
                <button data-filter="all" class="${state.filter === "all" ? "on" : ""}">全部</button>
                <button data-filter="original" class="${state.filter === "original" ? "on" : ""}">只做考题</button>
                <button data-filter="similar" class="${state.filter === "similar" ? "on" : ""}">只做类题</button>
              </div>` : ""}
            <div class="grid">
              ${state.list.map((item, i) => {
                const a = state.answers[item.id];
                let cls = "cell";
                if (i === state.index) cls += " cur";
                if (a !== undefined) {
                  if (state.mode === "practice") cls += a === item.answer ? " ok" : " no";
                  else cls += " done";
                } else if (state.mode === "practice") {
                  const hm = historyMark(item.id);
                  if (hm === "ok") cls += " hist ok";
                  else if (hm === "no") cls += " hist no";
                  else if (hm === "done") cls += " hist done";
                }
                if (state.flags[item.id]) cls += " flag";
                return `<button class="${cls}" data-goto="${i}">${i + 1}</button>`;
              }).join("")}
            </div>
            <div class="legend">
              ${state.mode === "practice"
                ? "本次作答：绿对红错。浅绿/浅红=历史做过（对/错）。"
                : "蓝格为已答。"}黄边为标记。红章=2026 回忆版真题，蓝章=按大纲改写的同类题。
            </div>
          </aside>
        </div>
      </div>`;
  }

  function result() {
    const r = state.result || { right: 0, total: 0 };
    if (r.kind === "afternoon") {
      const pass = r.total ? r.right >= Math.ceil(r.total * 0.6) : false;
      return `
        <div class="result">
          <div class="kicker">下午填空交卷</div>
          <h1>${pass ? "本套练习达到 60% 参考线" : "未到 60% 参考线，对照答案再改"}</h1>
          <div class="score">${r.right}<span style="font-size:18px"> / ${r.total}</span></div>
          <p>本套 ${state.caseList.length} 道案例合计 ${r.total} 分，专项限时 150 分钟，不是两科 240 分钟连考模拟。覆盖已收录的 DFD、ER、UML、算法（C）与设计模式（Java），不含 C++ 分支，也不代表考纲已全覆盖。规则分数为练习参考，不代表官方评分。</p>
          <div class="actions">
            <button class="btn" data-act="pm-review">对照参考答案回顾</button>
            <button class="btn ghost" data-act="home">回封面</button>
          </div>
        </div>`;
    }
    const score = r.total ? Math.round((r.right / r.total) * 75) : 0;
    const pass = score >= 45;
    return `
      <div class="result">
        <div class="kicker">模拟交卷</div>
        <h1>${pass ? "达到常见合格线" : "未到 45 分线"}</h1>
        <div class="score">${score}<span style="font-size:18px"> / 75</span></div>
        <p>答对 ${r.right} / ${r.total}。按 75 分折算，仅供练习参考；大纲结构抽题不是官方配额。可逐题回顾解析。</p>
        <div class="actions">
          <button class="btn" data-act="exam-review">逐题回顾（含解析）</button>
          <button class="btn ghost" data-act="home">回封面</button>
        </div>
      </div>`;
  }

  function statsPanel() {
    const sd = state.statsData;
    if (!sd) return `<div class="cover"><p>加载中…</p></div>`;
    const { chStats, weak, wrong, sessions } = sd;
    return `
      <div class="cover">
        <div class="ticket">
          <div class="ticket-spine">学习统计</div>
          <div class="ticket-body">
            <div class="kicker">Study Analytics</div>
            <h1>学习统计面板</h1>
            <p class="lede">基于做题数据分析各章正确率、薄弱考点和错题分布，帮助精准查漏补缺。</p>
            <div class="actions">
              <button class="btn ghost" data-act="home">返回首页</button>
            </div>
          </div>
        </div>

        <h2 class="section-label">各章节正确率</h2>
        <div class="chapter-grid" style="margin-top:14px">
          ${CHAPTERS.map((c) => {
            const cs = chStats[c.id];
            const rate = cs && cs.tried ? Math.round((cs.correct / cs.tried) * 100) : 0;
            const qsDone = cs ? cs.total : 0;
            const total = QUESTIONS.filter((q) => q.chapter === c.id).length;
            return `
              <div class="chap" style="cursor:default">
                <div class="no">${c.no} · ${esc(c.name)}</div>
                <h2 style="font-size:28px;color:${rate >= 80 ? 'var(--ok)' : rate >= 60 ? 'var(--steel)' : rate > 0 ? 'var(--bad)' : 'var(--muted)'}">${cs && cs.tried ? rate + '%' : '—'}</h2>
                <p>做过 ${qsDone}/${total} 题 · 答对 ${cs ? cs.correct : 0} 次 · 答错 ${cs ? cs.wrong : 0} 次</p>
                <div class="bar"><i style="width:${rate}%;background:${rate >= 80 ? 'var(--ok)' : rate >= 60 ? 'var(--steel)' : 'var(--bad)'}"></i></div>
              </div>`;
          }).join("")}
        </div>

        <h2 class="section-label">薄弱知识点 TOP 10</h2>
        ${weak.length ? `
          <table class="blank-table" style="margin-top:12px;max-width:720px">
            <tr><th>知识点</th><th>章节</th><th>正确率</th><th>做题次数</th><th>操作</th></tr>
            ${weak.map((w) => {
              const ch = CHAPTERS.find((c) => c.id === w.chapter);
              return `<tr>
                <td>${esc(w.point)}</td>
                <td>${ch ? ch.no : w.chapter}</td>
                <td style="color:${w.rate < 0.5 ? 'var(--bad)' : 'var(--muted)'}">${Math.round(w.rate * 100)}%</td>
                <td>${w.tried}</td>
                <td><button class="btn ghost" style="padding:3px 8px;font-size:12px" data-practice-point="${esc(w.point)}">专项练习</button></td>
              </tr>`;
            }).join("")}
          </table>` : `<p class="note">暂无数据，先做几道题再来看。</p>`}

        <h2 class="section-label">错题本 · ${wrong.length} 题待巩固</h2>
        <p class="lede" style="margin-top:6px">连续答对 2 次自动移出错题本。点击知识点可专项练习同考点其他题。</p>
        ${wrong.length ? `
          <table class="blank-table" style="margin-top:12px;max-width:820px">
            <tr><th>#</th><th>题目ID</th><th>知识点</th><th>错误次数</th><th>连续正确</th><th>操作</th></tr>
            ${wrong.slice(0, 30).map((w, i) => {
              const q = byId(w.qid);
              return `<tr>
                <td>${i + 1}</td>
                <td>${esc(w.qid)}</td>
                <td><button class="btn ghost" style="padding:2px 6px;font-size:11px;border:0;text-decoration:underline" data-practice-point="${esc(w.point)}">${esc(w.point)}</button></td>
                <td style="color:var(--bad)">${w.wrong}</td>
                <td>${w.streak >= 2 ? '<span style="color:var(--ok)">✓ 已掌握</span>' : w.streak + '/2'}</td>
                <td><button class="btn ghost" style="padding:3px 8px;font-size:12px" data-practice-qid="${esc(w.qid)}">重做</button></td>
              </tr>`;
            }).join("")}
          </table>` : `<p class="note">没有错题，继续保持！</p>`}

        ${sessions.length ? `
          <h2 class="section-label">考试记录</h2>
          <table class="blank-table" style="margin-top:12px;max-width:600px">
            <tr><th>时间</th><th>类型</th><th>得分</th><th>答对</th></tr>
            ${sessions.slice(-10).reverse().map((s) => `<tr>
              <td>${new Date(s.date).toLocaleDateString()}</td>
              <td>${s.type === 'morning-exam' ? '上午模拟' : '下午填空'}</td>
              <td>${s.score !== undefined ? s.score : s.right}</td>
              <td>${s.right}/${s.total}</td>
            </tr>`).join("")}
          </table>` : ""}
      </div>`;
  }

  async function loadStats() {
    const [chStats, weak, wrong, sessions] = await Promise.all([
      QuizDB.chapterStats(),
      QuizDB.weakPoints(10),
      QuizDB.wrongQuestions(),
      QuizDB.getAllSessions()
    ]);
    state.statsData = { chStats, weak, wrong, sessions };
    render();
  }

  function practiceByPoint(point) {
    const list = QUESTIONS.filter((q) => q.point === point);
    if (!list.length) { alert("没找到该考点的题目"); return; }
    beginPractice({ chapterId: "point-" + point, list, jumpUntried: true });
  }

  function practiceByQid(qid) {
    const q = byId(qid);
    if (!q) return;
    const samePoint = QUESTIONS.filter((x) => x.point === q.point);
    beginPractice({
      chapterId: "wrong-redo",
      list: samePoint.length > 1 ? samePoint : [q],
      preferQid: qid,
      jumpUntried: false
    });
  }

  function render() {
    if (submitExpiredExam()) return;
    const root = document.getElementById("app");
    if (state.view === "home") root.innerHTML = home();
    else if (state.view === "result") root.innerHTML = result();
    else if (state.view === "case") root.innerHTML = renderCase();
    else if (state.view === "stats") root.innerHTML = statsPanel();
    else root.innerHTML = quiz();
  }

  document.addEventListener("click", (e) => {
    const chap = e.target.closest("[data-chap]");
    if (chap) {
      startChapter(chap.getAttribute("data-chap"), "all");
      return;
    }
    const pp = e.target.closest("[data-practice-point]");
    if (pp) {
      practiceByPoint(pp.getAttribute("data-practice-point"));
      return;
    }
    const pq = e.target.closest("[data-practice-qid]");
    if (pq) {
      practiceByQid(pq.getAttribute("data-practice-qid"));
      return;
    }
    const pm = e.target.closest("[data-pm]");
    if (pm) {
      startAfternoon(pm.getAttribute("data-pm"));
      return;
    }
    const cg = e.target.closest("[data-case-goto]");
    if (cg) {
      gotoCase(Number(cg.getAttribute("data-case-goto")));
      return;
    }
    const act = e.target.closest("[data-act]");
    if (act) {
      const a = act.getAttribute("data-act");
      if (a === "exam") startExam();
      if (a === "fixed-morning") startFixedMorning();
      if (a === "fixed-afternoon") startFixedAfternoon();
      if (a === "pm-exam") startAfternoonExam();
      if (a === "pm-grade") gradeAfternoon(false);
      if (a === "ai-grade") {
        const cs = currentCase();
        if (!cs || (state.caseAiGrade[cs.id] && state.caseAiGrade[cs.id].loading)) return;
        // 练习模式下允许未先点击“查看解析”就进行 AI 判分，先补做规则判分。
        if (state.mode === "practice" && !state.caseReveal) {
          const ruleScore = scoreCase(cs);
          state.caseReveal = true;
          state.caseScore = ruleScore;
          state.caseDetails = ruleScore.details;
          QuizDB.recordCase(cs.id, ruleScore.got, ruleScore.total);
        }
        const fills = state.fills[cs.id] || {};
        const fields = [];
        cs.problems.forEach((p) => p.fields.forEach((f) => {
          if (f.type === "triplet") {
            fields.push({
              id: f.id, label: f.label, ref: refText(f), score: f.score,
              student: `名称:${fills[f.id + "-name"] || "未填"}；起点:${fills[f.id + "-from"] || "未填"}；终点:${fills[f.id + "-to"] || "未填"}`
            });
          } else {
            fields.push({ id: f.id, label: f.label, ref: refText(f), student: fills[f.id] || "", score: f.score });
          }
        }));
        const pendingGrade = { loading: true };
        state.caseAiGrade[cs.id] = pendingGrade;
        render();
        postJSON("/api/ai/grade", buildCaseGradeRequest(cs)).then((d) => {
          if (state.caseAiGrade[cs.id] !== pendingGrade) return;
          if (d.error) { alert("AI判分失败：" + d.error); state.caseAiGrade[cs.id] = null; render(); return; }
          state.caseAiGrade[cs.id] = { loading: false, results: d.results };
          render();
        }).catch((e) => {
          if (state.caseAiGrade[cs.id] !== pendingGrade) return;
          alert("请求失败：" + e.message); state.caseAiGrade[cs.id] = null; render();
        });
        return;
      }
      if (a === "pm-submit") {
        if (confirm("确认交卷？未填空按 0 分计。")) gradeAfternoon(true);
      }
      if (a === "pm-prev") gotoCase(state.caseIndex - 1);
      if (a === "pm-next") gotoCase(state.caseIndex + 1);
      if (a === "pm-explain") {
        if (!state.caseReveal) gradeAfternoon(false);
        else render();
      }
      if (a === "pm-review") {
        state.view = "case";
        state.caseReveal = true;
        state.caseIndex = 0;
        render();
      }
      if (a === "stats") {
        state.view = "stats";
        state.statsData = null;
        render();
        loadStats();
        return;
      }
      if (a === "home") {
        if (state.timerId) clearInterval(state.timerId);
        state.view = "home";
        render();
      }
      if (a === "review") {
        QuizDB.reviewDue().then((due) => {
          const ids = new Set(due.map((d) => d.qid));
          const list = QUESTIONS.filter((q) => ids.has(q.id));
          if (!list.length) { alert("今天没有到期的复习题。\n做错的题会按 1/3/7/15 天周期自动推送回来。"); return; }
          beginPractice({ chapterId: "review", filter: "all", list, jumpUntried: false });
        }).catch(() => alert("复习队列需要本地服务器（python server.py）支持，在线静态版暂不可用。"));
        return;
      }
      if (a === "wrong") {
        QuizDB.wrongQuestions().then((wrongList) => {
          const wrongIds = new Set(wrongList.map((w) => w.qid));
          let list = QUESTIONS.filter((q) => wrongIds.has(q.id));
          if (!list.length) {
            list = applyFilter(QUESTIONS, "wrong");
            if (!list.length) { alert("还没有错题。先做几章练习，答错的会进入错题本。"); return; }
          }
          beginPractice({ chapterId: "wrong", filter: "wrong", list, jumpUntried: false });
        });
        return;
      }
      if (a === "prev") goto(state.index - 1);
      if (a === "next") goto(state.index + 1);
      if (a === "flag") {
        const q = current();
        if (q) {
          state.flags[q.id] = !state.flags[q.id];
          saveActivePaper();
          render();
        }
      }
      if (a === "explain") {
        state.reveal = true;
        render();
      }
      if (a === "origin") {
        state.showOrigin = !state.showOrigin;
        render();
      }
      if (a === "ai-explain") {
        const q = current();
        if (!q || state.aiLoading) return;
        let force = false;
        if (state.aiExplain[q.id]) { // 已有解析时再点 = 强制重新生成（跳过缓存）
          if (!confirm("已有AI解析，花费token重新生成一份？（一般无需，缓存的内容相同）")) return;
          force = true;
        }
        state.aiLoading = true;
        render();
        postJSON("/api/ai/explain", {
          qid: q.id,
          force,
          q: {
            id: q.id,
            stem: q.stem,
            options: q.options,
            answer: q.answer,
            explain: q.explain,
            point: q.point,
            kind: q.kind,
            exam: q.exam,
            qnum: q.qnum
          },
          choice: state.answers[q.id]
        }).then((d) => {
          state.aiExplain[q.id] = d.analysis || {
            status: state.answers[q.id] === undefined ? "unanswered" : state.answers[q.id] === q.answer ? "correct" : "wrong",
            correctAnswer: { index: q.answer },
            selectedAnswer: state.answers[q.id] === undefined ? null : { index: state.answers[q.id] },
            conclusion: "AI 未返回结构化内容，请查看题库参考解析。",
            mistake: "请结合题库参考解析核对自己的判断。",
            steps: q.explain ? [{ title: "题库参考解析", content: q.explain }] : [],
            optionAnalysis: [],
            knowledgePoints: q.point ? [q.point] : [],
            selfCheck: [],
            assumptions: [],
            confidence: "low",
            source: "question_bank",
            notice: "AI 返回内容不完整。"
          };
          state.aiCacheHit[q.id] = !!d.cached && !force;
          state.aiLoading = false;
          render();
        }).catch((e) => {
          state.aiExplain[q.id] = {
            status: state.answers[q.id] === undefined ? "unanswered" : state.answers[q.id] === q.answer ? "correct" : "wrong",
            correctAnswer: { index: q.answer },
            selectedAnswer: state.answers[q.id] === undefined ? null : { index: state.answers[q.id] },
            conclusion: `正确答案为 ${LETTERS[q.answer] || "?"}。`,
            mistake: state.answers[q.id] === undefined ? "你还没有选择答案；先独立判断，再对照题库解析。" : "AI 暂时不可用，请先对照题库参考解析定位错误。",
            steps: q.explain ? [{ title: "题库参考解析", content: q.explain }] : [],
            optionAnalysis: [],
            knowledgePoints: q.point ? [q.point] : [],
            selfCheck: [],
            assumptions: [],
            confidence: "reference",
            source: "question_bank",
            notice: "AI 请求失败，已自动切换为题库参考解析。"
          };
          state.aiCacheHit[q.id] = false;
          state.aiLoading = false;
          render();
        });
        return;
      }
      if (a === "ai-variants") {
        const q = current();
        if (!q || state.aiVariantsLoading || state.aiLoading) return; // 防重复点击
        if (!confirm(`AI 将围绕考点「${q.point}」生成 3 道强化题（角度不同），现在开始？`)) return;
        state.aiVariantsLoading = true;
        render();
        postJSON("/api/ai/variants", { point: q.point, chapter: q.chapter }).then((d) => {
          state.aiVariantsLoading = false;
          const list = d.questions || [];
          if (!list.length) { alert("生成失败：" + (d.error || "AI未返回有效题目")); render(); return; }
          QUESTIONS.push(...list);
          beginPractice({ chapterId: "wrong", filter: "all", list, jumpUntried: false });
        }).catch((e) => {
          state.aiVariantsLoading = false;
          alert("请求失败：" + e.message);
          render();
        });
        return;
      }
      if (a === "ai-save") {
        const q = current();
        if (!q) return;
        postJSON("/api/ai/variants/save", { questions: [q] }).then((d) => {
          if (d.saved) {
            q.pendingSave = false;
            q.exam = "AI强化(已入库)";
            render();
          } else alert("保存失败：" + (d.error || ""));
        }).catch((e) => alert("请求失败：" + e.message));
        return;
      }
      if (a === "submit") {
        if (confirm("确认交卷？未答题目按 0 分计。")) submitExam();
      }
      if (a === "retake-afternoon") {
        openAfternoonExam(state.caseList.slice(), String(state.paperTitle || "下午卷").replace(/ · 上次作答$/, ""), { fresh: true });
        return;
      }
      if (a === "retake-morning") {
        openMorningExam(state.list.slice(), String(state.paperTitle || "上午卷").replace(/ · 上次作答$/, ""), { fresh: true });
        return;
      }
      if (a === "exam-review") {
        state.mode = "practice";
        state.examReview = true;
        state.reveal = true;
        state.view = "quiz";
        state.index = 0;
        render();
      }
      return;
    }
    const opt = e.target.closest("[data-opt]");
    if (opt) choose(Number(opt.getAttribute("data-opt")));
    const go = e.target.closest("[data-goto]");
    if (go) goto(Number(go.getAttribute("data-goto")));
    const f = e.target.closest("[data-filter]");
    if (f && state.chapterId && state.chapterId !== "wrong" && state.chapterId !== "review") {
      state.filter = f.getAttribute("data-filter");
      const base = QUESTIONS.filter((q) => q.chapter === state.chapterId);
      state.list = applyFilter(base, state.filter);
      state.index = 0;
      state.reveal = state.list[0] && state.answers[state.list[0].id] !== undefined;
      state.showOrigin = false;
      render();
    }
  });

  document.addEventListener("input", (e) => {
    const inp = e.target.closest("[data-fill]");
    if (!inp || state.view !== "case") return;
    const cs = currentCase();
    if (!cs) return;
    const fieldId = inp.getAttribute("data-fill");
    const hadFeedback = state.caseReveal || !!state.caseAiGrade[cs.id];
    const selectionStart = inp.selectionStart;
    const selectionEnd = inp.selectionEnd;
    setFill(cs.id, fieldId, inp.value);
    if (hadFeedback) {
      render();
      const replacement = Array.from(document.querySelectorAll("[data-fill]")).find((field) => field.getAttribute("data-fill") === fieldId);
      if (replacement) {
        replacement.focus();
        replacement.setSelectionRange(selectionStart, selectionEnd);
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    if (state.view === "case") return;
    if (state.view !== "quiz") return;
    if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
    const map = { "1": 0, "2": 1, "3": 2, "4": 3, a: 0, b: 1, c: 2, d: 3 };
    if (map[e.key] !== undefined) choose(map[e.key]);
    if (e.key === "n" || e.key === "N") goto(state.index + 1);
    if (e.key === "p" || e.key === "P") goto(state.index - 1);
    if (e.key === "m" || e.key === "M") {
      const q = current();
      if (q) {
        state.flags[q.id] = !state.flags[q.id];
        render();
      }
    }
    if ((e.key === "e" || e.key === "E") && state.mode === "practice") {
      state.reveal = true;
      render();
    }
    if ((e.key === "o" || e.key === "O") && state.mode === "practice") {
      state.showOrigin = !state.showOrigin;
      render();
    }
  });

  QuizDB.ready().then(() => render()).catch(() => render());
})();
