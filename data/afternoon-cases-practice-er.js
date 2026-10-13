// 中文原创练习，非官方真题；仅追加，不覆盖其他题库。
window.AFTERNOON_CASES = window.AFTERNOON_CASES || [];
(() => {
  const source = "本地 AI 原创软件设计师中级下午练习；非官方真题，未经官方审定。知识范围参考2018版考试大纲科目2数据库设计与《软件设计师教程》第5版。";
  const scoring = "各填空按标注分值独立计分，答对得该空全分，错误或空白得0分；属性集合不计顺序，但不得缺项、多项或重复。只支持题目约定形式及答案中的有限别名，不作开放语义判分。";
  const inputRules = "属性集合填写给定小写英文属性名，以逗号分隔，顺序不限。SQL表达式只填指定部分，不加CHECK外壳或分号；SQL关键字可全部大写或全部小写，标识符保持小写。判分采用有限别名而非任意等价表达式识别。";

  window.AFTERNOON_CASES.push({
    id: "practice-202609-er-staff", type: "er", no: "新练习-ER-01",
    title: "新练习一：员工项目派驻与导师管理", points: 15, minutes: 30,
    kind: "ai", seal: "原创题", difficulty: 3,
    source,
    syllabus: "2018版考试大纲科目2 / 数据库设计：概念结构、逻辑结构、关系完整性；《软件设计师教程》第5版数据库技术相关内容：自联系、联系属性、复合主键与外键。",
    difficultyReason: "中等偏难：须区分员工自联系的两种角色，将派驻属性放在正确位置，并区分分量存在与完整派驻组合存在；不要求触发器或递归环检测。",
    intro: "阅读业务说明与待补ER图，回答4个问题（15分，建议30分钟）。本题不使用代理键。",
    story: [
      "员工以employee_id全局唯一标识，employee_name可重复；项目以project_id全局唯一标识。一个员工可派驻零到多个项目，一个项目可接收零到多个员工。同一员工在同一项目最多有一条派驻，不保留离开后再派驻的历史。",
      "系统记录start_date（开始日期）与allocation_pct（投入百分比）：同一员工在不同项目可以取不同值，同一项目内不同员工也可以取不同值。百分比是各派驻独立数据，本题不限制跨项目百分比之和；这些值不参与任何唯一性约束。",
      "导师与学员均为员工，属于同一实体集的两种角色。一个员工可以暂时没有导师，否则恰有一位导师；同一员工可以指导多名学员，也可以暂不指导任何人。员工不得指导自己，但允许双方互为导师，也不要求排除更长的环。导师关系不依赖项目，变更时仅保存当前导师。逻辑设计采用employee中的可空列mentor_id存储该关系。",
      "新增worklog记录某条派驻下的工时条目，包含log_no和hours。log_no仅在所属完整派驻内唯一；不同派驻可复用相同log_no。每条工时必须对应真实存在的派驻，即使员工和项目分别存在也不能绕过派驻登记。hours不参与唯一性约束。",
      "将派驻转换为assignment关系，将工时转换为worklog关系。工时表中外键沿用employee_id、project_id命名。主键各列必须非空；所有外键启用，删除被引用记录默认拒绝，不级联删除。除上述约束外没有额外函数依赖。",
      inputRules
    ],
    blocks: [{ p: "图中上下两个员工矩形是同一实体集的角色副本，不是两张员工表。指导边的标注按角色说明填写；待填标记仅是编号，不暗示答案。工时扩展由文字说明给出，不在基础ER图中画出。" }],
    figures: [{
      caption: "图1 员工自联系及项目派驻（待补图）",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 470" class="fig-svg" role="img" aria-labelledby="practice-er-staff-title">
  <title id="practice-er-staff-title">员工的导师与学员角色，以及员工与项目的派驻联系；联系属性和指导数量留空</title>
  <g fill="white" stroke="#334155" stroke-width="2">
    <rect x="50" y="50" width="235" height="85" rx="3"/>
    <rect x="50" y="325" width="235" height="90" rx="3"/>
    <path d="M85 230 L167 177 L250 230 L167 283 Z"/>
    <path d="M167 135 V177 M167 283 V325" fill="none"/>
    <path d="M405 92 L505 39 L605 92 L505 145 Z"/>
    <rect x="745" y="50" width="205" height="85" rx="3"/>
    <path d="M285 92 H405 M605 92 H745 M505 145 V205" fill="none"/>
    <ellipse cx="505" cy="238" rx="145" ry="33"/>
  </g>
  <g fill="#172b40" font-family="sans-serif" font-size="17" text-anchor="middle">
    <text x="167" y="79">员工 employee</text><text x="167" y="110">角色：导师</text>
    <text x="167" y="236">指导</text>
    <text x="167" y="356">员工 employee</text><text x="167" y="389">角色：学员</text>
    <text x="505" y="99">派驻</text><text x="847" y="99">项目 project</text>
    <text x="342" y="76">M</text><text x="672" y="76">N</text>
    <text x="505" y="244">联系属性：【S-C】</text>
    <text x="485" y="322">【S-A】每名学员最多对应几位导师？</text>
    <text x="485" y="358">【S-B】每名导师最多对应几名学员？</text>
    <text x="620" y="410">M:N表示多对多；参与下限见业务说明。</text>
    <text x="500" y="452">两个员工框仅为角色副本；不是导师实体与学员实体的分别建表。</text>
  </g>
</svg>`
    }],
    problems: [
      { id: "staff-problem-1", title: "【问题1】（4分）", prompt: "补全ER图。S-A、S-B各填1或N，N表示可有多名；S-C填写应挂在派驻联系上而非单独员工或项目上的两个非标识属性。", fields: [
        { id: "staff-mentor-max", label: "S-A 每名学员的导师上限", type: "text", match: "code", score: 1, answers: ["1"] },
        { id: "staff-mentee-max", label: "S-B 每名导师的学员上限", type: "text", match: "code", score: 1, answers: ["N", "n"] },
        { id: "staff-relationship-attributes", label: "S-C 派驻联系属性集合", type: "text", match: "set", score: 2, answers: ["start_date,allocation_pct"] }
      ] },
      { id: "staff-problem-2", title: "【问题2】（4分）", prompt: "转换为关系模式。给出assignment与worklog的主键属性集合；不得增加代理编号，不把时间或工时作为键。", fields: [
        { id: "staff-assignment-key", label: "S-D assignment主键", type: "text", match: "set", score: 2, answers: ["employee_id,project_id"] },
        { id: "staff-worklog-key", label: "S-E worklog主键", type: "text", match: "set", score: 2, answers: ["employee_id,project_id,log_no"] }
      ] },
      { id: "staff-problem-3", title: "【问题3】（4分）", prompt: "给出employee中表示导师关系、引用employee(employee_id)的外键列，以及worklog中引用assignment的一个完整复合外键属性集合。不要把复合外键拆成分别指向员工与项目的两个外键。", fields: [
        { id: "staff-mentor-fk", label: "S-F employee自引用外键列", type: "text", match: "set", score: 2, answers: ["mentor_id"] },
        { id: "staff-worklog-fk", label: "S-G worklog指向assignment的复合外键", type: "text", match: "set", score: 2, answers: ["employee_id,project_id"] }
      ] },
      { id: "staff-problem-4", title: "【问题4】（3分）", prompt: "补充employee的行级CHECK内部表达式：允许员工暂时没有导师，但禁止员工指导自己；不等号用<>或!=。另有E1、P2分别存在，但assignment中没有(E1,P2)，插入该组合的工时被外键拒绝：属于实体完整性、参照完整性还是用户定义完整性？", fields: [
        { id: "staff-self-check", label: "S-H CHECK内部表达式", type: "text", match: "code", score: 2, answers: ["mentor_id IS NULL OR mentor_id <> employee_id", "mentor_id IS NULL OR mentor_id != employee_id", "mentor_id is null or mentor_id <> employee_id", "mentor_id is null or mentor_id != employee_id", "mentor_id <> employee_id", "mentor_id != employee_id", "employee_id <> mentor_id", "employee_id != mentor_id", "mentor_id <> employee_id OR mentor_id IS NULL", "mentor_id != employee_id OR mentor_id IS NULL", "mentor_id <> employee_id or mentor_id is null", "mentor_id != employee_id or mentor_id is null"] },
        { id: "staff-integrity", label: "S-I 工时外键拒绝所属完整性类别", type: "text", match: "text", score: 1, answers: ["参照完整性", "参照完整性约束", "引用完整性"] }
      ] }
    ],
    scoring,
    commonErrors: "反转导师与学员的上限；把导师与学员当两种实体；把开始日期和投入比例放入employee；只用log_no作主键；把复合外键拆开；认为外键会自动禁止自指导或任意环。",
    explain: "问题1（1+1+2分）：每名学员导师上限1，每名导师学员上限N。start_date、allocation_pct由员工与项目的组合决定，属于派驻联系。问题2（2+2分）：assignment(employee_id,project_id,start_date,allocation_pct)的主键为(employee_id,project_id)；worklog(employee_id,project_id,log_no,hours)的主键为(employee_id,project_id,log_no)。同一派驻可有多条工时，不同派驻可复用局部编号。问题3（2+2分）：employee(employee_id,employee_name,mentor_id)的mentor_id外键引用同表employee_id，允许NULL，不应加UNIQUE，否则每位导师最多只能有一名学员。assignment还分别引用employee和project；worklog必须以(employee_id,project_id)整体引用assignment，分量分别存在不能证明组合存在。可执行外键列顺序必须与被引用列一一对应，集合判分无序不表示SQL配对顺序可随意交换。问题4（2+1分）：CHECK(mentor_id IS NULL OR mentor_id <> employee_id)允许没有导师，拒绝自指导；非空导师是否存在由自引用外键保证。缺少派驻组合的工时违反参照完整性；自指导限制本身是用户定义完整性。该CHECK不检测长度大于1的环，本题明确允许这些环，不能声称它保证导师关系无环。删除被引用导师或派驻时默认拒绝。易错辨析与评分：关系属性集合空必须两项齐全才得2分，各主键及复合外键集合必须完整才得该空分，其他空各按标注分值独立判定。"
  });

  window.AFTERNOON_CASES.push({
    id: "practice-202609-er-tournament", type: "er", no: "新练习-ER-02",
    title: "新练习二：赛事报名与比赛成绩", points: 15, minutes: 30,
    kind: "ai", seal: "原创题", difficulty: 3,
    source,
    syllabus: "2018版考试大纲科目2 / 数据库设计：关系模式设计、规范化与完整性；《软件设计师教程》第5版数据库技术相关内容：函数依赖、候选键、范式、无损连接和保持依赖。",
    difficultyReason: "中等偏难：存在编号与邮箱两套候选键，需准确区分主属性和非主属性，并分别证明无损连接、依赖保持及BCNF，最后处理SQL的NULL与唯一性差异。",
    intro: "阅读报名关系及业务规则，回答4个问题（15分，建议30分钟）。范式与分解采用经典关系模型，问题4的约束填空讨论标准SQL完整性约束。",
    story: [
      "已完成比赛的报名汇总关系为R(athlete_id,email,event_id,event_name,score)，所有属性均为原子值且无NULL。athlete_id标识运动员；每人恰有一个email，不同运动员的email不同。邮箱按精确字符串比较，本题不讨论大小写或格式校验。",
      "event_id标识比赛项目并确定event_name，但不同项目可以同名。运动员可报名多个项目，同一项目可有多名运动员。同一运动员同一项目最多报名一次，恰有一个最终score；不同运动员或项目的成绩可以重复。没有队伍、轮次或重赛维度。",
      "问题1至3仅依据函数依赖集F={athlete_id→email, email→athlete_id, event_id→event_name, (athlete_id,event_id)→score}及其逻辑蕴含进行推理，不额外假设唯一性、函数依赖或多值依赖。问题2仅在1NF、2NF、3NF、BCNF中判断原模式最高满足级别。",
      "问题3按既定职责分成athlete（运动员编号与联系方式）、event（项目编号与名称）、result（谁参加哪个项目及其最终成绩）。为统一结果表的引用方式，规定result使用athlete_id而非email标识运动员。使用原属性名、不增加代理键，分别填写最小属性集合。讨论把任一满足F的R投影到这三张表再自然连接，是否保证还原R；不以是否能容纳尚未报名的独立运动员作为无损判断依据。",
      "问题4扩展为可记录未完赛报名的SQL实现：athlete以athlete_id为主键；email仍必填且全局唯一。result中的score列已保证非空值只能存储整数，允许NULL表示未录分；需另设约束保证已录入成绩在0至100之间（含边界）。本题不考查数据类型转换或数据库厂商的存储规则。其余主键、外键正确设置且启用。问题1至3的无NULL理论前提不因本扩展而改变。",
      inputRules
    ],
    blocks: [{ p: "候选键分别填入“采用编号”和“采用邮箱”两个槽位，每槽只填一个属性集合。函数依赖箭头在题干中给出；需自行计算闭包、判断范式和设计分解，不能把有限样本中的偶然唯一当作依赖。" }],
    figures: [],
    problems: [
      { id: "tournament-problem-1", title: "【问题1】（4分）", prompt: "求R的全部候选键。本题恰有两组，按指定槽位填写，并在思考中验证每组的充分性与最小性。", fields: [
        { id: "tournament-key-id", label: "T-A 采用运动员编号的候选键", type: "text", match: "set", score: 2, answers: ["athlete_id,event_id"] },
        { id: "tournament-key-email", label: "T-B 采用邮箱的候选键", type: "text", match: "set", score: 2, answers: ["email,event_id"] }
      ] },
      { id: "tournament-problem-2", title: "【问题2】（3分）", prompt: "R最高满足哪一级范式？给出F中直接决定event_name的最小属性集合，并据此在思考中分析它与候选键的关系。判断时应区分主属性与非主属性，不把所有非平凡依赖都当作违反2NF的依据。", fields: [
        { id: "tournament-normal-form", label: "T-C 原模式最高范式", type: "text", match: "text", score: 1, answers: ["1NF", "1nf", "第一范式"] },
        { id: "tournament-partial", label: "T-D event_name的直接决定因素", type: "text", match: "set", score: 2, answers: ["event_id"] }
      ] },
      { id: "tournament-problem-3", title: "【问题3】（5分）", prompt: "按题干限定职责完成三表的最小属性集合。再分别判断该分解是否保证无损连接、是否保持F中的全部函数依赖，均填“是”或“否”。两种性质必须分别判断，不能混为一谈。", fields: [
        { id: "tournament-athlete", label: "T-E athlete属性集合", type: "text", match: "set", score: 1, answers: ["athlete_id,email"] },
        { id: "tournament-event", label: "T-F event属性集合", type: "text", match: "set", score: 1, answers: ["event_id,event_name"] },
        { id: "tournament-result", label: "T-G result属性集合", type: "text", match: "set", score: 1, answers: ["athlete_id,event_id,score"] },
        { id: "tournament-lossless", label: "T-H 是否保证无损连接", type: "text", match: "text", score: 1, answers: ["是", "无损", "无损连接"] },
        { id: "tournament-preserving", label: "T-I 是否保持函数依赖", type: "text", match: "text", score: 1, answers: ["是", "保持", "保持函数依赖"] }
      ] },
      { id: "tournament-problem-4", title: "【问题4】（3分）", prompt: "先沿用问题1至3的无NULL与F前提：在1NF、2NF、3NF、BCNF中，分解后三表共同达到的最高级别是什么？再考虑SQL扩展：在email的列定义中补两个约束，使邮箱必填且唯一（不含主键）；为score填写CHECK内部表达式，使未录分报名可以保存，而已录入的整数成绩只能在0至100之间。范围判断使用BETWEEN。", fields: [
        { id: "tournament-bcnf", label: "T-J 三表最高共同范式", type: "text", match: "text", score: 1, answers: ["BCNF", "bcnf", "巴克斯范式", "BC范式"] },
        { id: "tournament-email-constraint", label: "T-K email的两个列级约束", type: "text", match: "code", score: 1, answers: ["NOT NULL UNIQUE", "UNIQUE NOT NULL", "not null unique", "unique not null"] },
        { id: "tournament-score-check", label: "T-L score的CHECK内部表达式", type: "text", match: "code", score: 1, answers: ["score IS NULL OR score BETWEEN 0 AND 100", "score is null or score between 0 and 100", "score BETWEEN 0 AND 100", "score between 0 and 100", "score BETWEEN 0 AND 100 OR score IS NULL", "score between 0 and 100 or score is null", "score IS NULL OR (score BETWEEN 0 AND 100)", "score is null or (score between 0 and 100)"] }
      ] }
    ],
    scoring,
    commonErrors: "遗漏邮箱候选键；因编号决定邮箱而误判非主属性部分依赖；把无损与保持依赖当同一结论；认为BCNF分解必保持依赖；仅用UNIQUE允许空邮箱；误以为CHECK与WHERE一样只接受TRUE，因而认为NULL必被范围检查拒绝。",
    explain: "问题1（2+2分）：候选键恰为(athlete_id,event_id)和(email,event_id)。前者先取得email与event_name，再取得score；后者经email→athlete_id再得到全部属性。event_id不在给定F的任何依赖右部，任何键都必须含它；编号与邮箱若都没有，就不能推出其中任何一个，因此最小键必须且只需在它们中选一个。删去任一键的任一属性均不能覆盖R。主属性为athlete_id、email、event_id，非主属性为event_name、score。问题2（1+2分）：原模式仅为1NF。event_id→event_name使非主属性event_name依赖每个候选键的真子集，违反2NF；athlete_id→email的右部为主属性，不能单凭这一条认定违反2NF。问题3（每空1分）：athlete(athlete_id,email)、event(event_id,event_name)、result(athlete_id,event_id,score)。无损性可分两步证明：先以athlete_id拆出athlete，其与余下关系的交集athlete_id决定整个athlete；再以event_id从余下关系拆出event，交集event_id决定整个event，因此两步均无损。不要把任意三表的两两连接直觉当通用判据。依赖保持也成立：编号与邮箱的双向依赖都在athlete内，项目到名称在event内，编号与项目到成绩在result内；F每一条都能局部检查，故这些投影依赖的并集蕴含F。问题4（每空1分）：三表均为BCNF。athlete中athlete_id和email各自为键，event的决定因素event_id为键，result的非平凡决定因素包含完整键(athlete_id,event_id)。这是本分解同时保持依赖，不代表任意BCNF分解都保持依赖。email需NOT NULL UNIQUE，UNIQUE不能替代必填约束。成绩检查可写score IS NULL OR score BETWEEN 0 AND 100，允许未录分以及0、100，拒绝越界整数。也接受score BETWEEN 0 AND 100：score为NULL时表达式为UNKNOWN，标准SQL的CHECK仅在条件为FALSE时拒绝，故UNKNOWN仍可通过；这与WHERE只保留TRUE的行不同。题干已保证非空成绩存储为整数，本空不负责类型校验。外键保证运动员与项目存在，复合主键保证一人一项目一条报名。经典FD与无损证明只适用于问题1至3明确的无NULL关系；未完赛扩展不套用NULL参与的经典等值连接证明。评分按各空标注独立给分，不为未要求提交的推导另设分值；完整推导供复盘。"
  });
})();
