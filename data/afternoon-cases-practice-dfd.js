// 中文原创练习，非官方真题；仅追加注册，页面入口由集成方加载。
window.AFTERNOON_CASES = window.AFTERNOON_CASES || [];
(() => {
  function node(identifier, label, horizontal, vertical, kind = "process") {
    return `<g data-node="${identifier}" data-kind="${kind}"><rect x="${horizontal}" y="${vertical}" width="180" height="70" rx="${kind === "process" ? 14 : 0}"/>${kind === "store" ? `<path d="M${horizontal + 12} ${vertical} V${vertical + 70}"/>` : ""}<text x="${horizontal + 90}" y="${vertical + 41}" text-anchor="middle">${identifier} ${label}</text></g>`;
  }
  function flow(prefix, identifier, from, to, name, route, horizontal, vertical) {
    return `<g data-flow="${identifier}" data-from="${from}" data-to="${to}" data-name="${name}"><path d="${route}" fill="none" marker-end="url(#${prefix}-arrow)"/><text x="${horizontal}" y="${vertical}" text-anchor="middle">${name}</text></g>`;
  }
  function figure(prefix, title, contents) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1220 580" class="fig-svg" role="img" aria-labelledby="${prefix}-title"><title id="${prefix}-title">${title}</title><defs><marker id="${prefix}-arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#26384a"/></marker></defs><g fill="white" stroke="#26384a" stroke-width="1.5">${contents.join("")}</g><style>svg[aria-labelledby="${prefix}-title"] text{fill:#152536;stroke:none;font-family:sans-serif;font-size:16px}</style></svg>`;
  }
  function textField(identifier, label, score, answers, match = "text") {
    return { id: identifier, label, type: "text", score, answers, match };
  }
  function triple(identifier, label, name, from, to) {
    return { id: identifier, label, type: "triplet", score: 2, componentScores: { name: 1, from: 0.5, to: 0.5 }, answers: { name: [name], from: [from], to: [to] } };
  }
  const syllabus = "《软件设计师考试大纲（2018年）》科目2：软件设计；结构化分析中的数据流图、数据字典、加工分解及父子图平衡。此处为练习考点映射，不是官方题目或难度认定。";
  const scoring = "本地自动评分采用有限精确答案，非官方阅卷尺度：缺失流每行2分，流名1分、起点0.5分、终点0.5分；同一问题内行序不限，一对一最优匹配，重复三元组只计一次，不跨参考拼接分项。其他空按标注分值整体计分；集合以逗号分隔，不重复、不多填。节点使用编号，字典使用给定中文名称。";
  const returnsParent = figure("practice-returns-parent", "售后系统零层图，省略一条数据流", [
    node("E1", "？", 30, 250, "external"), node("P1", "整理申请", 350, 250), node("P2", "判定并登记", 680, 250), node("D2", "？", 1000, 250, "store"),
    node("D1", "订单档案", 350, 50, "store"), node("E2", "？", 680, 50, "external"),
    flow("practice-returns-parent", "request", "E1", "P1", "售后申请", "M210 280 H350", 280, 263),
    flow("practice-returns-parent", "pending", "P1", "P2", "待办申请", "M530 280 H680", 605, 263),
    flow("practice-returns-parent", "inspection", "E2", "P2", "验收数据", "M770 120 V250", 815, 190),
    flow("practice-returns-parent", "archive", "P2", "D2", "售后记录", "M860 280 H1000", 930, 263),
    flow("practice-returns-parent", "result", "P2", "E1", "处理结果", "M770 320 V440 H120 V320", 450, 423)
  ]);
  const returnsChild = figure("practice-returns-child", "P2分解图，省略两条数据流", [
    node("P1", "整理申请", 30, 250), node("P2.1", "核对并判定", 350, 250), node("P2.2", "编制并归档", 680, 250), node("E1", "？", 1000, 250, "external"),
    node("E2", "？", 350, 50, "external"), node("D2", "？", 680, 480, "store"),
    flow("practice-returns-child", "pending", "P1", "P2.1", "待办申请", "M210 280 H350", 280, 263),
    flow("practice-returns-child", "inspection", "E2", "P2.1", "验收数据", "M440 120 V250", 485, 190),
    flow("practice-returns-child", "result", "P2.2", "E1", "处理结果", "M860 280 H1000", 930, 263)
  ]);
  const procurementParent = figure("practice-procurement-parent", "采购收货父图，所示边界完整", [
    node("E1", "供应商", 30, 250, "external"), node("P1", "核对收货", 500, 250), node("D1", "采购订单档案", 500, 50, "store"), node("D2", "收货档案", 1000, 250, "store"),
    flow("practice-procurement-parent", "delivery", "E1", "P1", "送货批次", "M210 280 H500", 355, 263),
    flow("practice-procurement-parent", "orders", "D1", "P1", "采购订单快照", "M590 120 V250", 655, 190),
    flow("practice-procurement-parent", "archive", "P1", "D2", "收货记录", "M680 280 H1000", 840, 263),
    flow("practice-procurement-parent", "feedback", "P1", "E1", "收货反馈", "M590 320 V440 H120 V320", 355, 423)
  ]);
  const procurementChild = figure("practice-procurement-child", "P1分解图，省略两条数据流", [
    node("E1", "供应商", 30, 250, "external"), node("P1.1", "核对批次", 380, 250), node("P1.2", "生成反馈", 740, 250),
    node("D1", "采购订单档案", 380, 50, "store"), node("D2", "收货档案", 1030, 80, "store"),
    flow("practice-procurement-child", "header", "E1", "P1.1", "送货主单", "M210 270 H380", 295, 250),
    flow("practice-procurement-child", "items", "E1", "P1.1", "送货明细集", "M210 305 H380", 295, 340),
    flow("practice-procurement-child", "checked", "P1.1", "P1.2", "核对结果", "M560 280 H740", 650, 263),
    flow("practice-procurement-child", "receipt", "P1.2", "E1", "收货回执", "M920 270 H960 V400 H100 V320", 500, 385),
    flow("practice-procurement-child", "difference", "P1.2", "E1", "差异报告", "M920 305 H990 V450 H160 V320", 500, 435)
  ]);
  window.AFTERNOON_CASES.push({
    id: "practice-202609-dfd-returns", type: "dfd", no: "新练习一", title: "新练习一：售后退换货处理系统", points: 15, minutes: 30,
    kind: "ai", seal: "原创题", difficulty: 3, syllabus,
    difficultyReason: "需区分客户与验收人员的系统边界角色、持久档案与加工中间流，并跨父子图核对缺失流的方向及内容；难点是不能把内部判定依据误当作父图新增接口。",
    source: "AI辅助原创软件设计师中级下午练习，非官方真题，未经官方审定。",
    intro: "阅读业务说明及两幅DFD，完成4问，共15分，建议30分钟。只讨论信息处理，不讨论实物运输、退款支付或换货发运。",
    story: [
      "某电商售后部门使用本系统登记退换货处理意见。客户提交售后申请，包含申请号、订单号、商品编号、申请数量、申请类型（退货或换货）及申请原因，并接收处理结果。退货与换货只是申请数据中的类型，不是数据流图上的控制箭头。",
      "仓库验收员是系统之外的业务人员，依据实际验货结果提交验收数据：申请号、实收数量、完好标志。客户与仓库验收员是不同外部实体；本系统不直接操作仓储设备。题设保证每份申请恰有一份按申请号关联的验收数据，不建模催交、补交和回执。",
      "订单档案已由其他系统预置，本题不画其维护过程。P1整理申请从该档案取得订单快照（订单号、客户编号、商品编号、已购数量、是否在售后期限内），将完整售后申请与订单快照合并为待办申请送给P2。按本题抽象，档案主动提供所需快照，不另画查询请求；数据格式均已规范，不增设P1退回通知。",
      "P2判定并登记分解为P2.1核对并判定、P2.2编制并归档。P2.1使用待办申请和验收数据，核对商品、申请数量与已购数量及实收数量，检查售后期限和完好标志。申请数量为1至已购数量之间的整数、实收与申请一致、商品一致、在期限内且完好时通过，否则拒绝；不允许部分通过。处理依据携带完整待办申请、完整验收数据、判定标志和原因，交给P2.2。通过的原因固定为“符合规则”，拒绝原因列明不满足的条件。",
      "P2.2生成处理结果，包含申请号、申请类型、判定标志、原因和本加工生成的处理编号，发送给客户。随后将处理依据与处理结果组成售后记录写入售后档案。售后档案保存每次办理的完整信息，不是库存库，也不承担判定加工；本题没有退款指令、发货指令或档案写入确认。",
      "图1恰好省略一条档案读取流，图2恰好省略一条子加工内部流和一条档案写入流。图中的问号只表示待命名节点；同编号跨图指同一对象。图2的P1、E1、E2、D2均为P2边界之外的引用节点。除指定缺失及名称空缺外，图示数据流完整。"
    ],
    blocks: [{ p: syllabus }, { p: scoring }],
    figures: [{ caption: "图1 系统零层DFD（省略1条流，3个名称待填）", svg: returnsParent }, { caption: "图2 P2分解DFD（省略2条流）", svg: returnsChild }],
    problems: [
      { id: "returns-p1", title: "【问题1】（3分）", prompt: "填写E1、E2、D2的名称。按业务职责区分外部实体和数据存储，每空1分。", fields: [
        textField("returns-customer", "E1名称", 1, ["客户", "售后申请客户"]),
        textField("returns-inspector", "E2名称", 1, ["仓库验收员", "验收员"]),
        textField("returns-store", "D2名称", 1, ["售后档案", "售后记录档案"])
      ] },
      { id: "returns-p2", title: "【问题2】（6分）", prompt: "补齐图1与图2合计三条缺失数据流，填写流名、起点编号、终点编号。每行2分，分项及无序匹配规则见评分说明。", fields: [
        triple("returns-flow1", "缺失流1", "订单快照", "D1", "P1"),
        triple("returns-flow2", "缺失流2", "处理依据", "P2.1", "P2.2"),
        triple("returns-flow3", "缺失流3", "售后记录", "P2.2", "D2")
      ] },
      { id: "returns-p3", title: "【问题3】（4分）", prompt: "补流后，填写跨越P2边界的全部输入流名集合及全部输出流名集合。子加工之间的流不计入边界，每个集合2分。", fields: [
        textField("returns-inputs", "P2边界输入流名集合", 2, ["待办申请,验收数据"], "set"),
        textField("returns-outputs", "P2边界输出流名集合", 2, ["处理结果,售后记录"], "set")
      ] },
      { id: "returns-p4", title: "【问题4】（2分）", prompt: "有人在图2新增P2.2→E2的入库指令，父图及业务说明不变。这样是否保持父子图平衡（是/否，1分）？理由选一项（1分）：A=子图可任意新增对外输出；B=输出对端与信息均无父图对应；C=只需输入流数量相等。", fields: [
        textField("returns-balanced", "是否平衡", 1, ["否", "不平衡"]),
        textField("returns-reason", "理由编号", 1, ["B"], "code")
      ] }
    ],
    explain: "问题1：E1客户、E2仓库验收员、D2售后档案，各1分。角色由系统边界与业务职责确定，不能把部门内的人工角色自动画为系统内加工。问题2：图1D1→P1的订单快照；图2P2.1→P2.2的处理依据、P2.2→D2的售后记录。每行流名1分、起点和终点各0.5分，合计6分；行序不限、重复只计一次。P1必须读取订单才能构成待办申请；P2.2必须获得含完整申请和验收数据的处理依据，才能生成结果与完整档案。问题3：输入为待办申请、验收数据（2分），输出为处理结果、售后记录（2分）。父图P1→P2对应子图P1→P2.1，E2→P2对应E2→P2.1；P2→E1和P2→D2分别对应P2.2的两个输出。处理依据仅在P2内部传递；D1读取属于P1而非P2边界。问题4：否（1分）、B（1分）。父图没有向E2输出入库指令，子图不能凭空扩展接口。常见错误：把订单档案写成外部客户；补成P1→D1的查询请求而忽略题设快照约定；把P2与P2.2编号混用；把处理依据加入P2边界输出；把实物退货、控制条件或执行先后当成数据流。"
  }, {
    id: "practice-202609-dfd-procurement", type: "dfd", no: "新练习二", title: "新练习二：采购收货与差异处理", points: 15, minutes: 30,
    kind: "ai", seal: "原创题", difficulty: 3, syllabus,
    difficultyReason: "考查标准结构化分析中的读图补流、数据字典组成关系、父子图平衡和非法直连。需结合主单与明细拆流及两份必出单据核对信息等价，但业务边界和字典均已明确，且部分问题为选择判断，整体为中等难度。",
    source: "AI辅助原创软件设计师中级下午练习，非官方真题，未经官方审定。",
    intro: "阅读业务说明与父子DFD，完成4问，共15分，建议30分钟。注意区分不同层次的数据表示，并依据业务说明解释数据字典。",
    story: [
      "采购部门接收供应商送货信息，系统只核对已登记的实际收货数量并产生反馈，不负责卸货、付款或修改采购订单。供应商提交送货批次，由一份送货主单和一个送货明细集共同组成；两部分必有，按批次号关联。主单含批次号、供应商编号、采购单号，明细集含批次号以及至少一条送货明细；每条明细含行号、商品编号、实收数量。题设数据均已通过格式校验，行号唯一且能在采购订单中找到对应项。",
      "D1采购订单档案已预置有效采购订单，向P1提供采购订单快照，不另建查询请求或维护加工。快照含采购单号、供应商编号和采购行集；每个采购行含行号、商品编号、应收数量。P1核对收货只读取该档案，绝不写回；D2收货档案保存本系统办理记录，两档案之间不直接传输数据。",
      "P1分解为P1.1核对批次和P1.2生成反馈。P1.1分别收到送货主单、送货明细集以及采购订单快照，按批次号、采购单号、供应商编号和行号关联；题设保证标识相符，仅比较数量差异。它为每条明细形成核对明细（行号、商品编号、应收数量、实收数量、差异数量），差异数量=实收数量-应收数量。核对结果由完整送货批次和核对明细集组成，送给P1.2。",
      "P1.2每次都生成并向同一供应商发送收货回执和差异报告，两份单据均含批次号。回执还含本加工生成的收货编号及登记标记；差异报告还含差异行集。只有差异数量不为0的核对明细进入差异行集，无差异时该集合为空，但差异报告仍然生成并发送。收货反馈必须包含这两份完整单据，不是通过与拒绝二选一，也不共享省略其中任一单据的批次号。",
      "P1.2将送货批次、核对明细集及收货反馈合成收货记录，写入D2。D2不向供应商直接发送报告，不另返回写入回执。父图所示P1边界完整；子图只省略D1提供快照的一条流和写入D2的一条流。子图的D1、D2、E1是引用节点，核对结果是P1内部数据流。箭头相交而无节点处不代表数据合并。"
    ],
    blocks: [
      { p: syllabus },
      { p: "数据字典：+表示所有组成部分均存在；[X|Y]表示恰选其一；(X)表示0或1份；{X}表示1至多次，{X}0表示0至多次。本题的送货批次按批次号成对提交，图上拆流不引入新的数据来源。" },
      { code: "送货批次 = 送货主单 + 送货明细集\n送货主单 = 批次号 + 供应商编号 + 采购单号\n送货明细集 = 批次号 + {送货明细}\n送货明细 = 行号 + 商品编号 + 实收数量\n采购订单快照 = 采购单号 + 供应商编号 + {采购行}\n采购行 = 行号 + 商品编号 + 应收数量\n核对明细 = 行号 + 商品编号 + 应收数量 + 实收数量 + 差异数量\n核对明细集 = {核对明细}\n核对结果 = 送货批次 + 核对明细集\n收货回执 = 批次号 + 收货编号 + 登记标记\n差异报告 = 批次号 + 差异行集\n差异行集 = {核对明细}0\n收货反馈 = 【待填表达式】\n收货记录 = 送货批次 + 核对明细集 + 收货反馈" },
      { p: scoring }
    ],
    figures: [{ caption: "图1 P1父图（完整，其他加工不在本题范围）", svg: procurementParent }, { caption: "图2 P1分解图（省略2条流）", svg: procurementChild }],
    problems: [
      { id: "proc-p1", title: "【问题1】（4分）", prompt: "补齐子图中两条缺失流的名称、起点及终点编号。每行2分，流名1分，起点和终点各0.5分。", fields: [
        triple("proc-flow1", "缺失流1", "采购订单快照", "D1", "P1.1"),
        triple("proc-flow2", "缺失流2", "收货记录", "P1.2", "D2")
      ] },
      { id: "proc-p2", title: "【问题2】（4分）", prompt: "填写收货反馈的字典表达式（2分）。再填写子图中共同对应父图送货批次的输入流名集合（2分，逗号分隔）。", fields: [
        textField("proc-dictionary", "收货反馈 =", 2, ["收货回执+差异报告", "差异报告+收货回执"]),
        textField("proc-inputs", "对应送货批次的流名集合", 2, ["送货主单,送货明细集"], "set")
      ] },
      { id: "proc-p3", title: "【问题3】（4分）", prompt: "补流后父子图是否平衡（是/否，2分）？选择最准确的理由（2分）：A=子图箭头更多，所以一定不平衡；B=流名不同就一定不平衡；C=组成展开后方向、外部对端及信息内容一致，核对结果留在内部；D=只要输入集合一致就不用核对输出。", fields: [
        textField("proc-balanced", "是否平衡", 2, ["是", "平衡"]),
        textField("proc-reason", "理由编号", 2, ["C"], "code")
      ] },
      { id: "proc-p4", title: "【问题4】（3分）", prompt: "下面仅判断DFD连接规则是否合法，不判断是否增加业务功能。选出全部非法直连编号，逗号分隔（3分，完整集合才得分）：A=E1→D1传送采购订单；B=P1.2→E1传送差异报告；C=D1→D2传送采购订单快照；D=D2→E1传送收货记录。", fields: [
        textField("proc-illegal", "非法直连编号集合", 3, ["A,C,D"], "set")
      ] }
    ],
    explain: "问题1：D1→P1.1的采购订单快照，P1.2→D2的收货记录，每行名称1分、两端各0.5分，共4分。父图写P1，分解图须写具体子加工，不能原样照抄编号。问题2：收货反馈=收货回执+差异报告（2分，顺序可交换）；送货主单、送货明细集（2分）。两份输出每次都产生，无差异时仅差异行集为空，报告本身不缺席，所以不能写选择式或可选报告。主单和明细集的批次号用于关联，展开后两处出现必须保留，不能仅按去重后的数据项集合比较。问题3：是（2分）、C（2分）。父图输入E1→P1的送货批次展开后，对应E1→P1.1的主单和明细集；D1快照完整对应。父图输出P1→E1的收货反馈展开为P1.2→E1的两份必出单据；P1→D2的收货记录完整对应P1.2→D2。方向、对端、组成及重复次数均保持，子图内部核对结果不计入边界。问题4：A,C,D（3分）。外部实体到存储、存储到存储、存储到外部实体均不能直接连接，必须经加工；B是加工向外部实体输出，连接合法。常见错误：按四条与七条箭头数量判不平衡；把两份必出单据写成[收货回执|差异报告]；把空差异行集误解为不发报告；把核对结果加进父图输出；认为只要流名合理就允许档案直连。"
  });
})();
