// 原创专项，非官方题型复刻；在基础案例数组之后追加加载。
window.AFTERNOON_CASES = window.AFTERNOON_CASES || [];
(() => {
  function box(identifier, label, horizontal, vertical, kind) {
    return `<g data-node="${identifier}" data-kind="${kind}"><rect x="${horizontal}" y="${vertical}" width="180" height="60" rx="${kind === "process" ? 12 : 0}"/><text x="${horizontal + 90}" y="${vertical + 36}" text-anchor="middle">${identifier} ${label}</text></g>`;
  }
  function edge(prefix, identifier, origin, destination, label, route, horizontal, vertical, kind) {
    return `<g data-edge="${identifier}" data-from="${origin}" data-to="${destination}" data-kind="${kind}"><path d="${route}" fill="none" marker-end="url(#${prefix}-arrow)"/><text x="${horizontal}" y="${vertical}" text-anchor="middle">${kind === "data" ? identifier + " " : ""}${label}</text></g>`;
  }
  function svg(prefix, title, body) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 660" class="fig-svg" role="img" aria-labelledby="${prefix}-title"><title id="${prefix}-title">${title}</title><defs><marker id="${prefix}-arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#243c50"/></marker></defs><g fill="white" stroke="#243c50" stroke-width="1.5">${body}</g><style>svg[aria-labelledby="${prefix}-title"] text{font:16px sans-serif;fill:#142b40;stroke:none}</style></svg>`;
  }
  const dataflow = svg("sd-energy-dfd", "设备用电报告数据流图：箭头表示数据传递", [
    box("E1", "采集端", 30, 90, "external"),
    box("P1", "拆分字段", 350, 90, "process"),
    box("P2", "规范记录", 670, 90, "process"),
    box("P3", "计算电量", 670, 290, "process"),
    box("P4", "判定等级", 350, 290, "process"),
    box("P5", "格式化", 30, 290, "process"),
    box("P6", "发送报告", 30, 500, "process"),
    box("E2", "接收端", 350, 500, "external"),
    edge("sd-energy-dfd", "F1", "E1", "P1", "原始行", "M210 120 H350", 280, 103, "data"),
    edge("sd-energy-dfd", "F2", "P1", "P2", "字段组", "M530 120 H670", 600, 103, "data"),
    edge("sd-energy-dfd", "F3", "P2", "P3", "规范记录", "M760 150 V290", 825, 227, "data"),
    edge("sd-energy-dfd", "F4", "P3", "P4", "电量记录", "M670 320 H530", 600, 303, "data"),
    edge("sd-energy-dfd", "F5", "P4", "P5", "等级记录", "M350 320 H210", 280, 303, "data"),
    edge("sd-energy-dfd", "F6", "P5", "P6", "报告文本", "M120 350 V500", 185, 432, "data"),
    edge("sd-energy-dfd", "F7", "P6", "E2", "报告文本", "M210 530 H350", 280, 513, "data")
  ].join(""));
  const hierarchy = svg("sd-energy-modules", "候选模块结构图：箭头仅表示直接调用，不表示数据流或调用时序", [
    box("M0", "主控", 510, 30, "module"),
    box("M1", "采集组", 110, 230, "module"),
    box("M2", "处理组", 510, 230, "module"),
    box("M3", "发布组", 910, 230, "module"),
    box("M11", "拆分", 10, 480, "module"),
    box("M12", "规范化", 210, 480, "module"),
    box("M21", "电量", 410, 480, "module"),
    box("M22", "等级", 610, 480, "module"),
    box("M31", "文本", 810, 480, "module"),
    box("M32", "发送", 1010, 480, "module"),
    edge("sd-energy-modules", "C1", "M0", "M1", "调用", "M540 90 V150 H200 V230", 360, 135, "call"),
    edge("sd-energy-modules", "C2", "M0", "M2", "调用", "M600 90 V230", 635, 170, "call"),
    edge("sd-energy-modules", "C3", "M0", "M3", "调用", "M660 90 V150 H1000 V230", 840, 135, "call"),
    edge("sd-energy-modules", "C11", "M1", "M11", "调用", "M160 290 V390 H100 V480", 120, 373, "call"),
    edge("sd-energy-modules", "C12", "M1", "M12", "调用", "M240 290 V390 H300 V480", 285, 373, "call"),
    edge("sd-energy-modules", "C21", "M2", "M21", "调用", "M560 290 V390 H500 V480", 520, 373, "call"),
    edge("sd-energy-modules", "C22", "M2", "M22", "调用", "M640 290 V390 H700 V480", 685, 373, "call"),
    edge("sd-energy-modules", "C31", "M3", "M31", "调用", "M960 290 V390 H900 V480", 920, 373, "call"),
    edge("sd-energy-modules", "C32", "M3", "M32", "调用", "M1040 290 V390 H1100 V480", 1085, 373, "call")
  ].join(""));
  window.AFTERNOON_CASES.push({
    id: "original-dfd-structured-energy-01", type: "dfd", no: "原创-结构化设计-01",
    title: "设备用电报告：从变换型DFD到模块结构", points: 15, minutes: 30,
    kind: "ai", seal: "原创专项", difficulty: 3,
    difficultyReason: "需按指定边界划分变换结构，区分调用关系与执行时序、数据参数与控制参数，并通过边界样本验证模块集成。",
    source: "本地 AI 原创结构化设计专项，非官方真题；归入现有DFD练习分类，不表示官方下午试题的固定题型或题面格式。",
    intro: "阅读两幅图与接口约定，完成4问，共15分，建议30分钟。本题只讨论变换型设计，不讨论事务型分派。",
    story: [
      "采集端每次提供一行设备记录，格式为设备号,功率瓦数,运行分钟。输入保证合法：设备号去掉首尾空白后为非空英文字母数字串；功率为非负偶整数且不超过10000；分钟为正整数、是30的倍数且不超过1440。数字字段允许首尾空格及前导零。本题不建模输入错误、网络失败、回执、数据库和重试。",
      "P1只按英文逗号拆成三个字符串。P2去掉各字段首尾空白，将功率与分钟转成十进制数，生成{deviceId, watts, minutes}。P3生成{deviceId, wattHours}，其中电量单位为瓦时，按功率乘分钟再除以60计算。P4保留设备号与电量，增加level：电量达到1000瓦时为HIGH，否则为NORMAL。P5生成无空格文本设备号:电量:等级，电量按十进制整数输出、不带前导零；P6将文本原样发送且恰好发送一次。",
      "本次设计评审明确选定输入边界为F3，输出边界为F5。输入支路包含形成F3之前的加工；变换中心接收F3并产生F5；输出支路包含接收F5之后的加工。边界数据本身不是加工节点。不把P4产生的等级误当执行控制流：它在DFD中仍是业务数据。实际设计可选择其他合理边界，本题不主张这种划分是唯一解。",
      "图2给出一种候选调用层次。方框为模块，父到子的箭头只表示可直接调用；返回值沿调用返回，不另画箭头。图2不是DFD，连线不能解释为业务数据。兄弟模块的左右位置不规定调用先后。各组仅调用自己的两个叶模块；叶模块不调用其他模块、无共享全局状态。M0负责组间结果传递，不允许组模块相互直接调用。",
      "正常集成中，采集组返回规范记录，处理组接收规范记录并返回等级记录，发布组接收等级记录并发送报告。各组内部依赖按业务说明执行。前一级正常返回后下一级才能开始；所有参数按值传递，处理不修改输入对象。",
      "耦合判别约定：仅通过必需的简单数据值交互、且不传递决定被调模块执行方式的标志，称数据耦合；传递用于指定被调模块执行哪个分支或操作的标志，称控制耦合。此处不考记录结构导致的标记耦合，以下两组待评接口均只传简单值。不能仅凭参数是数字或字符串就判别耦合。"
    ],
    blocks: [
      { p: "问题4的局部伪代码使用JavaScript运算符，仅填比较运算符。问题中的集合用加工编号逗号分隔；顺序题用模块编号英文逗号连接。精确判分采用列出的有限别名，不进行开放语义判分。" },
      { code: 'function classifyEnergy(wattHours) {\n  return wattHours 【比较符】 1000 ? "HIGH" : "NORMAL";\n}' }
    ],
    figures: [
      { caption: "图1 完整DFD：所有箭头均为数据流；F3、F5是本次指定边界。", svg: dataflow },
      { caption: "图2 候选模块结构图：所有箭头均为调用关系，不表示时序。", svg: hierarchy }
    ],
    problems: [
      { id: "sde-partition", title: "【问题1】（3分）", prompt: "按本次指定边界，分别列出输入支路、变换中心、输出支路的全部加工编号。每空1分，集合全对得分。", fields: [
        { id: "sde-input", label: "输入支路加工集合", type: "text", match: "set", score: 1, answers: ["P1,P2"] },
        { id: "sde-center", label: "变换中心加工集合", type: "text", match: "set", score: 1, answers: ["P3,P4"] },
        { id: "sde-output", label: "输出支路加工集合", type: "text", match: "set", score: 1, answers: ["P5,P6"] }
      ] },
      { id: "sde-integration", title: "【问题2】（4分）", prompt: "①M0处理一行记录时，三个组模块应按什么顺序调用（写编号序列，2分）？②拟新增M32→M0的直接调用以便发送后再次进入主控，这会不会形成调用环（填会/不会，1分）？③集成测试采用自顶向下法，目前只实现M0，其三个直接子模块尚未实现，临时替代这三个子模块以返回预设结果的测试构件叫什么（1分）？", fields: [
        { id: "sde-order", label: "①组模块调用顺序", type: "text", match: "code", score: 2, answers: ["M1,M2,M3", "M1->M2->M3", "M1→M2→M3"] },
        { id: "sde-cycle", label: "②是否形成调用环", type: "text", match: "text", score: 1, answers: ["会", "是"] },
        { id: "sde-stub", label: "③测试构件名称", type: "text", match: "text", score: 1, answers: ["桩模块", "桩程序", "测试桩", "stub"] }
      ] },
      { id: "sde-coupling", title: "【问题3】（4分）", prompt: "独立评审两组备选接口，不改变图2。接口甲：compute(watts, minutes)只计算并返回电量。接口乙：publish(text, operation)中operation为0时发送、为1时仅预览。①②分别写甲、乙的耦合类别（各1分）；③乙中哪个参数构成控制信息（1分）？④若要消除乙的控制参数而保持两种能力，选择方案编号（1分）：A=将operation改名level；B=拆成send(text)与preview(text)由调用者选择；C=把operation放入全局变量。", fields: [
        { id: "sde-data-coupling", label: "①接口甲", type: "text", match: "text", score: 1, answers: ["数据耦合", "数据耦合型"] },
        { id: "sde-control-coupling", label: "②接口乙", type: "text", match: "text", score: 1, answers: ["控制耦合", "控制耦合型"] },
        { id: "sde-control-parameter", label: "③控制参数", type: "text", match: "code", score: 1, answers: ["operation"] },
        { id: "sde-interface-fix", label: "④改进方案", type: "text", match: "code", score: 1, answers: ["B"] }
      ] },
      { id: "sde-behavior", title: "【问题4】（4分）", prompt: "①补全局部代码中的比较运算符（2分）。②输入原始行为“ A7 , 00800 , 0090 ”，按业务说明写出接收端得到的完整报告文本（2分）。此样本需同时检查规范化、单位换算和输出格式，不接受只写等级。", fields: [
        { id: "sde-comparator", label: "①比较符", type: "text", match: "code", score: 2, answers: [">="] },
        { id: "sde-report", label: "②完整报告", type: "text", match: "code", score: 2, answers: ["A7:1200:HIGH"] }
      ] }
    ],
    explain: "问题1：输入P1、P2；中心P3、P4；输出P5、P6，各1分。F3为输入切口，F5为输出切口；F4是中心内部流。该结论受指定边界约束，不是所有设计的唯一划分。问题2：M1,M2,M3（2分），正常返回的数据依赖决定顺序，而不是结构图的左右位置。新增边产生M0→M3→M32→M0调用环（1分）。自顶向下用桩模块模拟下层，驱动模块则模拟上层调用者（1分）。问题3：甲数据耦合、乙控制耦合、operation、B，各1分。业务等级HIGH虽然也是字符串，但在原流水线中只是需要输出的数据；operation则指示被调模块选择操作。改名不会改变语义，全局变量会引入公共耦合；拆分接口可消除该控制参数，但不能据此声称系统完全无耦合。问题4：>=（2分），恰好1000也须为HIGH；样本电量为800×90÷60=1200，文本A7:1200:HIGH（2分）。M1内部先拆分后规范化；M2内部先计算后判定；M3内部先格式化后发送。M0以局部返回值连接三个组，不让组间直接调用，不共享全局记录；在合法输入、无失败的题设范围内，这一模块实现应与DFD处理链产生完全相同的单条报告。"
  });
})();
