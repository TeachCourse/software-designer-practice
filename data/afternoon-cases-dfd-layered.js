// 原创练习，非官方真题。独立追加注册，不修改页面入口。
window.AFTERNOON_CASES = window.AFTERNOON_CASES || [];
(() => {
  function node(identifier, label, horizontal, vertical, kind = "process") {
    return `<g data-node="${identifier}" data-kind="${kind}"><rect x="${horizontal}" y="${vertical}" width="180" height="70" rx="${kind === "process" ? 14 : 0}"/><text x="${horizontal + 90}" y="${vertical + 41}" text-anchor="middle">${identifier} ${label}</text>${kind === "store" ? `<path d="M${horizontal + 10} ${vertical} V${vertical + 70}"/>` : ""}</g>`;
  }
  function flow(prefix, identifier, from, to, name, route, labelX, labelY) {
    return `<g data-flow="${identifier}" data-from="${from}" data-to="${to}" data-name="${name}"><path d="${route}" fill="none" marker-end="url(#${prefix}-arrow)"/><text x="${labelX}" y="${labelY}" text-anchor="middle">${name}</text></g>`;
  }
  function figure(prefix, title, contents) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 540" class="fig-svg" role="img" aria-labelledby="${prefix}-title"><title id="${prefix}-title">${title}</title><defs><marker id="${prefix}-arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#26384a"/></marker></defs><g stroke="#26384a" stroke-width="1.5" fill="white">${contents}</g><style>svg[aria-labelledby="${prefix}-title"] text{fill:#152536;stroke:none;font-family:sans-serif;font-size:16px}</style></svg>`;
  }
  const contextSvg = figure("dfdl-context", "文献复制申请系统上下文图", [
    node("E1", "申请人", 30, 230, "external"), node("S", "复制申请系统", 490, 230), node("E2", "馆员", 950, 230, "external"),
    flow("dfdl-context", "c-request", "E1", "S", "复制申请", "M210 250 H490", 350, 235),
    flow("dfdl-context", "c-result", "S", "E1", "办理结果", "M490 280 H210", 350, 315),
    flow("dfdl-context", "c-rules", "E2", "S", "规则维护数据", "M950 265 H670", 810, 248)
  ].join(""));
  const levelSvg = figure("dfdl-level", "零层图，仅省略规则读取流", [
    node("E2", "馆员", 30, 60, "external"), node("P3", "维护规则", 320, 60), node("D1", "复制规则库", 640, 60, "store"),
    node("E1", "申请人", 30, 270, "external"), node("P1", "接收申请", 320, 270), node("P2", "审核办理", 640, 270), node("D2", "办理档案", 990, 270, "store"),
    flow("dfdl-level", "l-maintain", "E2", "P3", "规则维护数据", "M210 95 H320", 265, 78),
    flow("dfdl-level", "l-write", "P3", "D1", "复制规则", "M500 95 H640", 570, 78),
    flow("dfdl-level", "l-request", "E1", "P1", "复制申请", "M210 300 H320", 265, 282),
    flow("dfdl-level", "l-forward", "P1", "P2", "待审申请", "M500 300 H640", 570, 282),
    flow("dfdl-level", "l-archive", "P2", "D2", "办理记录", "M820 300 H990", 905, 282),
    flow("dfdl-level", "l-result", "P2", "E1", "办理结果", "M730 340 V460 H120 V340", 420, 445)
  ].join(""));
  const childSvg = figure("dfdl-child", "P2分解图，仅省略审核结论及办理记录", [
    node("P1", "接收申请", 30, 90), node("P2.1", "核对规则", 350, 90), node("P2.2", "编制结果", 670, 90), node("E1", "申请人", 990, 90, "external"),
    node("D1", "复制规则库", 350, 350, "store"), node("D2", "办理档案", 670, 350, "store"),
    flow("dfdl-child", "d-request", "P1", "P2.1", "待审申请", "M210 125 H350", 280, 108),
    flow("dfdl-child", "d-rules", "D1", "P2.1", "复制规则", "M440 350 V160", 485, 265),
    flow("dfdl-child", "d-accept", "P2.2", "E1", "受理通知", "M850 110 H990", 920, 94),
    flow("dfdl-child", "d-reject", "P2.2", "E1", "退回通知", "M850 145 H990", 920, 177)
  ].join(""));
  window.AFTERNOON_CASES.push({
    id: "original-dfd-layered-copy-01", type: "dfd", no: "原创-DFD-分层-01",
    title: "文献复制申请：分层平衡与数据字典", points: 15, minutes: 30,
    kind: "ai", seal: "原创题", difficulty: 3,
    difficultyReason: "须跨上下文、零层和加工分解图追踪数据边界，区分互斥结果拆流与新增信息，并解释字典的可选、重复和选择约束。",
    source: "本地 AI 原创软件设计师中级下午练习；非官方真题，未经官方审定。",
    intro: "阅读说明及3幅DFD，完成4问，共15分，建议30分钟。仅3条指定流被省略，其他业务数据流均已画出。",
    story: [
      "本系统只受理文献复制申请，不处理支付、实际复制或通知送达回执。E1申请人提交复制申请，系统返回办理结果；E2馆员提供规则维护数据。上下文图不显示内部档案及规则库。",
      "复制申请包含申请号、申请人编号、联系电话、至少一项复制明细，并可附一份用途说明。每项明细包含文献号、起始页、结束页。同一次申请的所有明细作为整体审核，不允许部分受理。P1接收申请只将原申请原样命名为待审申请转交P2；格式校验与退回均属于P2，不另设接收回执。",
      "规则维护数据包含规则版本和至少一条文献规则；每条规则包含文献号、可复制标志、单次页数上限。P3将其原样形成复制规则写入D1。D1已有有效初始规则，向P2提供同结构的复制规则；本题建模为规则快照输入，不另设查询请求、更新确认或历史读取。",
      "P2审核办理分解为P2.1核对规则和P2.2编制结果。P2.1读取待审申请及复制规则，检查格式、文献是否允许复制和每项页数上限。全部符合生成通过项，否则生成拒绝项。审核结论携带完整待审申请、规则版本及二选一的判定项；拒绝项带非空退回原因，通过项带固定值“通过”。P2.1将审核结论交给P2.2。",
      "P2.2依据审核结论生成办理结果。通过时生成受理通知，含申请号和新生成的受理编号；否则生成退回通知，含申请号及退回原因。每次申请恰好产生其中一种，不是同时两种。P2.2向E1发送对应通知，并将待审申请、规则版本、办理结果一起作为办理记录写入D2；无其他输入输出。受理编号由P2.2生成，不来自外部编号服务。",
      "图3仅分解P2，P1、D1、D2和E1都是P2边界之外的引用节点，不是P2的子加工。图2恰好省略D1提供规则的一条流；图3恰好省略两个子加工之间的一条流及档案写入的一条流。被省略的流没有虚线提示；图上箭头均表示数据，不表示执行顺序或控制条件。"
    ],
    blocks: [
      { p: "数据字典约定：=表示定义；+表示组成；(X)表示X出现0或1次；{X}表示X重复1至多次（本题特别规定下界为1）；[X|Y]表示X、Y恰选其一。括号、花括号、方括号是字典元符号，不属于实际数据。" },
      { code: "复制申请 = 申请号 + 申请人编号 + 联系电话 + 【明细表达式】 + 【用途表达式】\n复制明细 = 文献号 + 起始页 + 结束页\n待审申请 = 复制申请\n规则维护数据 = 规则版本 + {文献规则}\n文献规则 = 文献号 + 可复制标志 + 单次页数上限\n复制规则 = 规则维护数据\n审核结论 = 待审申请 + 规则版本 + [通过项|拒绝项]\n通过项 = 通过标记\n拒绝项 = 退回原因\n办理结果 = 【结果表达式】\n受理通知 = 申请号 + 受理编号\n退回通知 = 申请号 + 退回原因\n办理记录 = 待审申请 + 规则版本 + 办理结果" },
      { p: "自动判分采用有限精确答案，不做开放式语义判断。问题1采用本地练习尺度（非官方）：名称1分、起点0.5分、终点0.5分，三行按整体一对一最优匹配计分，重复三元组只计一次，不拼接不同参考的分项。问题3填写字典表达式。问题4先判断再选理由编号，每个理由独立计分。" }
    ],
    figures: [
      { caption: "图1 上下文图（完整）", svg: contextSvg },
      { caption: "图2 零层DFD（省略1条流）", svg: levelSvg },
      { caption: "图3 P2的分解DFD（省略2条流；其余边界节点为引用）", svg: childSvg }
    ],
    problems: [
      { id: "dfdl-p1", title: "【问题1】（6分）", prompt: "按说明补齐三条指定的缺失数据流。必须使用流名及图上编号，注意P2与P2.1、P2.2不可互换。本地练习尺度（非官方）：每行名称1分、起点0.5分、终点0.5分；行顺序不限，按整体一对一最优匹配计分，不拼接不同参考的分项，重复三元组只计一次。", fields: [
        { id: "dfdl-flow1", label: "缺失流1", type: "triplet", score: 2, componentScores: { name: 1, from: 0.5, to: 0.5 }, answers: { name: ["复制规则"], from: ["D1"], to: ["P2"] } },
        { id: "dfdl-flow2", label: "缺失流2", type: "triplet", score: 2, componentScores: { name: 1, from: 0.5, to: 0.5 }, answers: { name: ["审核结论"], from: ["P2.1"], to: ["P2.2"] } },
        { id: "dfdl-flow3", label: "缺失流3", type: "triplet", score: 2, componentScores: { name: 1, from: 0.5, to: 0.5 }, answers: { name: ["办理记录"], from: ["P2.2"], to: ["D2"] } }
      ] },
      { id: "dfdl-p2", title: "【问题2】（3分）", prompt: "补流后检查P2父子图平衡：图3的哪两条出界流共同对应父图的办理结果？填写流名集合，用逗号分隔。另外，若在图3新增E1→P2.2的付款凭证而不修改父图，是否仍平衡（是/否）？", fields: [
        { id: "dfdl-boundary", label: "对应办理结果的流名集合", type: "text", match: "set", score: 2, answers: ["受理通知,退回通知"] },
        { id: "dfdl-payment", label: "新增付款凭证后是否平衡", type: "text", score: 1, answers: ["否"] }
      ] },
      { id: "dfdl-p3", title: "【问题3】（3分）", prompt: "填写数据字典的三个表达式，使用题目约定的符号及中文数据项名。不要把重复误写为可选，也不要把互斥结果写成相加。", fields: [
        { id: "dfdl-repeat", label: "明细表达式", type: "text", score: 1, answers: ["{复制明细}"] },
        { id: "dfdl-optional", label: "用途表达式", type: "text", score: 1, answers: ["(用途说明)"] },
        { id: "dfdl-exclusive", label: "结果表达式", type: "text", score: 1, answers: ["[受理通知|退回通知]", "[退回通知|受理通知]"] }
      ] },
      { id: "dfdl-p4", title: "【问题4】（3分）", prompt: "为三项结论各选一个理由编号（每空1分）：A=可选只允许0或1份，不能表示多份；B=只要改名就能增加父图未有的数据；C=两种通知是互斥数据变体，展开后与父流信息一致；D=花括号允许0条，空申请也合法；E=付款凭证是新的边界输入，父图及业务说明均无对应。①为何用途说明不能填{用途说明}？②为何两条通知流不必判为不平衡？③为何不能直接新增付款凭证？", fields: [
        { id: "dfdl-reason-optional", label: "①理由编号", type: "text", match: "code", score: 1, answers: ["A"] },
        { id: "dfdl-reason-balance", label: "②理由编号", type: "text", match: "code", score: 1, answers: ["C"] },
        { id: "dfdl-reason-payment", label: "③理由编号", type: "text", match: "code", score: 1, answers: ["E"] }
      ] }
    ],
    explain: "问题1（6分）：D1→P2为复制规则；P2.1→P2.2为审核结论；P2.2→D2为办理记录。本地练习尺度（非官方）：每行名称1分、起点0.5分、终点0.5分，共2分；行顺序不限，按整体一对一最优匹配计分，不拼接不同参考的分项，重复三元组只计一次。问题2（3分）：受理通知、退回通知共同覆盖办理结果的两个互斥变体（2分）；增加付款凭证不平衡（1分）。上下文的复制申请、规则维护数据和办理结果在零层分别由P1、P3、P2承接；内部存储不计入系统外部边界。P2的输入为待审申请及复制规则，输出为办理结果及办理记录；子图的审核结论是内部流，不能算作父图新增输出。办理记录完整保留申请、版本及结果，不能用只有编号的简化记录替代。问题3（3分）：{复制明细}、(用途说明)、[受理通知|退回通知]各1分。重复在本题明确至少一次；可选不等于任意多次；互斥不能写为受理通知+退回通知。问题4（3分）：A、C、E各1分；平衡应按方向、外部对端和字典展开的信息变体核对，而非数箭头或只看名字。图3两条通知描述可能的数据路径，不表示一次运行会同时发出，也不表示先后控制。"
  });
})();
