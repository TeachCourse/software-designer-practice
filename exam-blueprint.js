// 上午组卷配额。章节题量对齐 2026 上半年回忆版题号映射（见 00-大纲章节对照.md），
// 并在父章节配额内为 2018 大纲中的数学、多媒体、体系结构、系统转换、面向对象测试、
// 云计算和信息化保留最少题量。这不是软考办公布的官方配额。
(function (root) {
  const MORNING_SLOTS = [
    { key: "hardware", count: 4, chapter: "ch1", test: (q) => !/多媒体|数学基础/.test(q.syllabus || "") },
    { key: "multimedia", count: 2, chapter: "ch1", test: (q) => /多媒体/.test(q.syllabus || "") },
    { key: "math", count: 2, chapter: "ch1", test: (q) => /数学基础/.test(q.syllabus || "") },
    { key: "language", count: 6, chapter: "ch2" },
    { key: "datastruct", count: 6, chapter: "ch3" },
    { key: "os", count: 5, chapter: "ch4" },
    { key: "se", count: 8, chapter: "ch5", test: (q) => !/软件体系结构|系统转换/.test(q.syllabus || "") },
    { key: "architecture", count: 2, chapter: "ch5", test: (q) => /软件体系结构/.test(q.syllabus || "") },
    { key: "migration", count: 1, chapter: "ch5", test: (q) => /系统转换/.test(q.syllabus || "") },
    { key: "structured", count: 1, chapter: "ch6" },
    { key: "oo", count: 13, chapter: "ch7", test: (q) => !/面向对象测试/.test(q.syllabus || "") },
    { key: "oo-test", count: 1, chapter: "ch7", test: (q) => /面向对象测试/.test(q.syllabus || "") },
    { key: "algo", count: 2, chapter: "ch8" },
    { key: "db", count: 4, chapter: "ch9" },
    { key: "net", count: 9, chapter: "ch10", test: (q) => !/云计算/.test(q.syllabus || "") },
    { key: "cloud", count: 1, chapter: "ch10", test: (q) => /云计算/.test(q.syllabus || "") },
    { key: "law", count: 2, chapter: "ch11", test: (q) => !/信息化|个人信息/.test(q.syllabus || "") },
    { key: "info", count: 1, chapter: "ch11", test: (q) => /信息化|个人信息/.test(q.syllabus || "") },
    { key: "english", count: 5, chapter: "en" }
  ];

  function shuffle(list, random) {
    const copy = list.slice();
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(random() * (index + 1));
      [copy[index], copy[swap]] = [copy[swap], copy[index]];
    }
    return copy;
  }

  function assembleMorningPaper(questions, random) {
    const rng = random || Math.random;
    const eligible = questions.filter((question) => question.chapter !== "ch12");
    const used = new Set();
    const picked = [];

    function take(pool, count) {
      const chosen = shuffle(pool.filter((question) => !used.has(question.id)), rng).slice(0, count);
      chosen.forEach((question) => used.add(question.id));
      picked.push(...chosen);
      return chosen.length;
    }

    MORNING_SLOTS.forEach((slot) => {
      const matched = eligible.filter((question) => question.chapter === slot.chapter && (!slot.test || slot.test(question)));
      const shortage = slot.count - take(matched, slot.count);
      if (shortage > 0) {
        take(eligible.filter((question) => question.chapter === slot.chapter), shortage);
      }
    });

    if (picked.length < 75) {
      shuffle(eligible.filter((question) => !used.has(question.id)), rng).some((question) => {
        used.add(question.id);
        picked.push(question);
        return picked.length >= 75;
      });
    }

    return shuffle(picked, rng).slice(0, 75);
  }

  root.MORNING_SLOTS = MORNING_SLOTS;
  root.assembleMorningPaper = assembleMorningPaper;
})(globalThis);
