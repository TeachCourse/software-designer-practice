// 原创练习，非官方真题；SQL/Python 填空采用有限别名精确判分。
window.AFTERNOON_CASES = window.AFTERNOON_CASES || [];
(() => {
  const schemaCode = `PRAGMA foreign_keys = ON;
CREATE TABLE student (
    student_id INTEGER PRIMARY KEY,
    student_name TEXT NOT NULL
);
CREATE TABLE course (
    course_id INTEGER PRIMARY KEY,
    course_name TEXT NOT NULL
);
CREATE TABLE attempt (
    attempt_id INTEGER PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES student(student_id),
    course_id INTEGER NOT NULL REFERENCES course(course_id),
    score INTEGER CHECK (score IS NULL OR
        (typeof(score) = 'integer' AND score BETWEEN 0 AND 100))
);
CREATE TABLE grade_audit (
    audit_id INTEGER PRIMARY KEY,
    attempt_id INTEGER NOT NULL REFERENCES attempt(attempt_id),
    actor TEXT NOT NULL
);`;
  const fixtureCode = `INSERT INTO student VALUES
    (1, '小林'), (2, '小林'), (3, '小周'), (4, '小吴');
INSERT INTO course VALUES (10, '数据库'), (20, '操作系统');
INSERT INTO attempt VALUES
    (101, 1, 10, 80), (102, 1, 10, 90), (103, 1, 20, 60),
    (201, 2, 10, 80), (202, 2, 10, 80), (203, 2, 20, NULL),
    (401, 4, 10, 59), (402, 4, 20, 75);`;
  const countCode = `-- A：列出所有学生及其已通过的不同课程数，含零门者。
SELECT student.student_id, 【(2)】 AS passed_courses
FROM student
【(1)】 attempt
  ON attempt.student_id = student.student_id AND attempt.score >= 60
GROUP BY student.student_id
ORDER BY student.student_id;

-- B：列出已参加考试但尚未录入成绩的考试记录编号。
SELECT attempt_id FROM attempt
WHERE score 【(3)】
ORDER BY attempt_id;`;
  const coverageCode = `-- C：列出通过course表中每一门课程的学生编号。
SELECT student.student_id
FROM student
WHERE 【(4)】 (
    SELECT 1 FROM course
    WHERE NOT EXISTS (
        SELECT 1 FROM attempt
        WHERE 【(5)】
          AND attempt.course_id = course.course_id
          AND attempt.score >= 60
    )
)
ORDER BY student.student_id;`;
  const accessCode = `# Python 3 / sqlite3；connection由调用者打开，isolation_level=None。
# 调用前无活动事务；本函数独占该连接并负责本次事务。
def record_grade(connection, attempt_id, score, actor):
    connection.execute("BEGIN")
    try:
        cursor = connection.execute(
            "UPDATE attempt SET score = ? WHERE attempt_id = ?",
            【(6)】
        )
        if cursor.rowcount != 1:
            raise ValueError("attempt not found")
        connection.execute(
            "INSERT INTO grade_audit(attempt_id, actor) VALUES (?, ?)",
            (attempt_id, actor)
        )
        connection.commit()
    except Exception:
        connection.【(7)】()
        raise`;
  window.AFTERNOON_CASES.push({
    id: "original-er-sql-coverage-01",
    type: "er", no: "原创-SQL-01", title: "培训考核：课程覆盖查询与成绩原子写入",
    points: 15, minutes: 30, kind: "ai", seal: "原创题", difficulty: 3,
    difficultyReason: "综合外连接、NULL、去重聚合、双层相关子查询与参数绑定及失败回滚，需要辨别重复考试和空课程集合的边界。",
    source: "本地 AI 原创软件设计师中级下午数据库应用练习；非官方真题，未经官方审定。",
    intro: "阅读说明、SQLite建表语句、初始数据及代码，回答问题1至问题4（共15分，建议30分钟）。",
    story: [
      "培训系统允许学生重考同一门课程，每次考试用独立attempt_id标识；同一学生同一课程可以出现多条相同成绩记录。学生可以同名，必须按编号区分。course表内的每门课都是必修课。",
      "score为NULL表示尚未录分，非NULL时必须为0至100的整数。一次考试成绩达到60即通过该课程，多次通过仍只算一门；NULL及不及格均不算通过。所有外键均启用，主键不可重复；初始grade_audit为空。",
      "覆盖查询采用逻辑上的全称语义：course为空时，每位学生均满足通过所有课程；没有学生时返回零行。各问题独立使用给定初始数据，除非明确说明删除数据，不继承其他问题的改动。",
      "自动判分只匹配列出的有限别名，不支持任意等价SQL。SQL空只填指定关键字或表达式，关键字统一大写（也接受全部小写），表名、列名保持代码中的小写，不增加别名或分号。Python区分大小写；结果编号按升序用英文逗号连接，不加括号。"
    ],
    code: countCode + "\n\n" + coverageCode + "\n\n" + accessCode,
    blocks: [
      { p: "表结构及约束（SQLite）：" }, { code: schemaCode },
      { p: "初始数据：" }, { code: fixtureCode },
      { p: "查询A、B：" }, { code: countCode },
      { p: "查询C：" }, { code: coverageCode },
      { p: "成绩及审计写入：" }, { code: accessCode }
    ],
    figures: [],
    problems: [
      {
        id: "sql-p1", title: "【问题1】（4分）",
        prompt: "补全A、B。空(1)填保留左表全部学生的连接关键字；空(2)只填对attempt.course_id去重计数的聚合表达式，不使用子查询或CASE；空(3)填标准NULL判断关键字。",
        fields: [
          { id: "blank1", label: "(1) 连接", type: "text", match: "code", score: 1, answers: ["LEFT JOIN", "left join", "LEFT OUTER JOIN", "left outer join"] },
          { id: "blank2", label: "(2) 已通过的课程数", type: "text", match: "code", score: 2, answers: ["COUNT(DISTINCT attempt.course_id)", "count(distinct attempt.course_id)"] },
          { id: "blank3", label: "(3) 未录分判断", type: "text", match: "code", score: 1, answers: ["IS NULL", "is null"] }
        ]
      },
      {
        id: "sql-p2", title: "【问题2】（4分）",
        prompt: "补全C：不能存在一门该学生未通过的课程。空(4)填否定存在性判断关键字；空(5)只填attempt.student_id与外层student.student_id的等值关联条件。不可用通过记录总数代替逐课程覆盖判断。",
        fields: [
          { id: "blank4", label: "(4) 外层存在性判断", type: "text", match: "code", score: 2, answers: ["NOT EXISTS", "not exists"] },
          { id: "blank5", label: "(5) 学生关联", type: "text", match: "code", score: 2, answers: ["attempt.student_id = student.student_id", "student.student_id = attempt.student_id"] }
        ]
      },
      {
        id: "sql-p3", title: "【问题3】（3分）",
        prompt: "不依赖填空是否正确，按业务定义推导初始数据：哪些学生通过全部必修课？哪些学生的已通过课程数为零？两个结果均填学生编号，而非姓名或考试记录编号。",
        fields: [
          { id: "coverageIds", label: "初始数据的学生编号", type: "text", match: "text", score: 2, answers: ["1"] },
          { id: "zeroPassedIds", label: "已通过零门课程的学生编号", type: "text", match: "text", score: 1, answers: ["3"] }
        ]
      },
      {
        id: "sql-p4", title: "【问题4】（4分）",
        prompt: "补全record_grade。空(6)只填与两个?顺序对应的Python二元组，不得拼接SQL。空(7)只填连接方法名：若审计插入因actor为None触发NOT NULL约束异常，必须撤销本次已完成的成绩更新，不得留下部分成功的数据。",
        fields: [
          { id: "blank6", label: "(6) 绑定参数二元组", type: "text", match: "code", score: 2, answers: ["(score, attempt_id)", "(score, attempt_id,)"] },
          { id: "blank7", label: "(7) 异常时的事务处理", type: "text", match: "code", score: 2, answers: ["rollback"] }
        ]
      }
    ],
    explain: "A使用LEFT JOIN，及格过滤放在ON中以保留无及格记录的学生；COUNT(DISTINCT attempt.course_id)既忽略外连接补出的NULL，又消除重考重复，结果为(1,2)、(2,1)、(3,0)、(4,1)。COUNT(*)会把无匹配者也计为1，COUNT(attempt.course_id)则会重复计算重考。B使用IS NULL，返回203；不能用= NULL。C外层用NOT EXISTS，内层关联attempt.student_id = student.student_id，同时关联课程并要求及格，表示不存在未覆盖课程。初始只有1满足；2虽有两条及格记录却仅覆盖课程10。空课程集合时不存在反例，所有学生1,2,3,4均满足。绑定参数为(score, attempt_id)，SQL结构不随输入内容改变。异常分支调用rollback，并重新抛出异常；显式BEGIN保证成绩与审计同成同败，成功才commit。若连接处于自动提交模式却不显式开启事务，更新可能已落库，后续审计失败时无法靠回滚撤销。函数要求无既有事务，避免误回滚调用者工作。"
  });
})();
