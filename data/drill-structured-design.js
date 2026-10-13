// 变换型 DFD→模块结构递进练习（网页一题一答）。原创练习，非官方真题。
window.STRUCTURED_DESIGN_DRILL = {
  title: "变换型 DFD→模块结构 · 递进练习",
  subtitle: "一题一答：先作答，再点「查看本题答案」。建议按关卡 A→F 顺序。P=加工（集合填这个）；F=数据流（可作边界，不进加工集合）；E=外部实体；M=模块。",
  docs: [
    { label: "从零讲解", href: "../docs/变换型DFD到模块结构从零讲解.md" },
    { label: "练习册原文", href: "../docs/变换型DFD到模块结构递进练习册.md" },
    { label: "设备用电报告解析", href: "../docs/设备用电报告变换型DFD到模块结构解析.md" }
  ],
  levels: [
    { id: "A", title: "分清两张图", minutes: 10 },
    { id: "B", title: "变换型 / 事务型", minutes: 10 },
    { id: "C", title: "按边界切三段", minutes: 15 },
    { id: "D", title: "调用顺序 / 环 / 桩", minutes: 15 },
    { id: "E", title: "耦合判别", minutes: 15 },
    { id: "F", title: "迷你综合", minutes: 20 }
  ],
  questions: [
    {
      id: "A1", level: "A", kind: "judge",
      stem: "判断对错：DFD 上 P2→P3 的箭头，表示 P2 调用了 P3。",
      answers: ["错", "错误", "不对", "否", "false"],
      answerShow: "错",
      explain: "DFD 箭头是数据流（寄信），不是模块调用（打电话）。"
    },
    {
      id: "A2", level: "A", kind: "judge",
      stem: "判断对错：模块结构图上 M0→M1 的箭头，表示 M0 可以调用 M1。",
      answers: ["对", "正确", "是", "true"],
      answerShow: "对",
      explain: "结构图箭头只表示直接调用关系。"
    },
    {
      id: "A3", level: "A", kind: "judge",
      stem: "判断对错：模块图里 M1 画在 M3 左边，所以一定先执行 M1 再执行 M3。",
      answers: ["错", "错误", "不对", "否", "false"],
      answerShow: "错",
      explain: "左右摆放不等于调用先后；先后看数据依赖。"
    },
    {
      id: "A4", level: "A", kind: "judge",
      stem: "判断对错：DFD 箭头方向表示数据移动方向，不表示程序语句的执行顺序。",
      answers: ["对", "正确", "是", "true"],
      answerShow: "对",
      explain: "DFD 不是流程图/时序图。"
    },
    {
      id: "A5", level: "A", kind: "judge",
      stem: "判断对错：结构图一般不另画「返回值箭头」，结果沿调用返回即可。",
      answers: ["对", "正确", "是", "true"],
      answerShow: "对",
      explain: "返回值沿调用返回，通常不另画边。"
    },
    {
      id: "A6", level: "A", kind: "judge",
      stem: "判断对错：在结构图里新增「叶子模块 → 主控」的边，可能形成调用环。",
      answers: ["对", "正确", "是", "true"],
      answerShow: "对",
      explain: "下级再指向祖先会形成环，破坏树形层次。"
    },
    {
      id: "A7", level: "A", kind: "text",
      stem: "下列设问属于「分析」还是「设计」？\n补充图中缺失的数据流名称、起点、终点。",
      answers: ["分析", "结构化分析", "A"],
      answerShow: "分析",
      explain: "补流是结构化分析（DFD）典型问法。"
    },
    {
      id: "A8", level: "A", kind: "text",
      stem: "下列设问属于「分析」还是「设计」？\n按指定边界列出输入支路、变换中心、输出支路的加工集合。",
      answers: ["设计", "结构化设计", "B"],
      answerShow: "设计",
      explain: "变换分段属于结构化设计。"
    },
    {
      id: "A9", level: "A", kind: "text",
      stem: "下列设问属于「分析」还是「设计」？\n判断接口是数据耦合还是控制耦合。",
      answers: ["设计", "结构化设计", "B"],
      answerShow: "设计",
      explain: "耦合属于模块接口设计范畴。"
    },
    {
      id: "A10", level: "A", kind: "text",
      stem: "下列设问属于「分析」还是「设计」？\n写出父图与子图是否平衡，并说明理由。",
      answers: ["分析", "结构化分析", "A"],
      answerShow: "分析",
      explain: "父子平衡是分层 DFD 分析考点。"
    },
    {
      id: "B1", level: "B", kind: "text",
      stem: "加工链：收原始报文 → 校验拆字段 → 计算费用 → 套打票据 → 发送票据。中间没有「按类型分叉」。\n这是变换型还是事务型？",
      answers: ["变换型", "变换流", "变换"],
      answerShow: "变换型",
      explain: "一条主链：输入→变换→输出，无事务分派点。"
    },
    {
      id: "B2", level: "B", kind: "text",
      stem: "加工：接收请求后进入「请求分派」；若类型=查询走路径甲，类型=注销走路径乙，类型=变更走路径丙。三条路径并行可选其一。\n这是变换型还是事务型？",
      answers: ["事务型", "事务流", "事务"],
      answerShow: "事务型",
      explain: "有分派中心，按类型选择路径。"
    },
    {
      id: "B3", level: "B", kind: "text",
      stem: "银行柜面：先识别交易码，再分别进入存款处理 / 取款处理 / 转账处理。\n这是变换型还是事务型？",
      answers: ["事务型", "事务流", "事务"],
      answerShow: "事务型",
      explain: "交易码分派多条互斥路径。"
    },
    {
      id: "B4", level: "B", kind: "text",
      stem: "传感器读数 → 去噪 → 单位换算 → 超限判定 → 生成告警短信 → 发出。\n这是变换型还是事务型？",
      answers: ["变换型", "变换流", "变换"],
      answerShow: "变换型",
      explain: "顺序加工链，属变换流。"
    },
    {
      id: "B5", level: "B", kind: "choice",
      stem: "结构化设计中，变换分析的第一步通常是（ ）。",
      options: [
        "立即画模块结构图",
        "区分 DFD 中的传入流、变换中心和传出流",
        "先写每个模块的伪代码",
        "先做事务分派表"
      ],
      answerIndex: 1,
      answerShow: "B. 区分 DFD 中的传入流、变换中心和传出流",
      explain: "先切边界，再映到结构图。"
    },
    {
      id: "C1", level: "C", kind: "multi",
      stem: "链：P1→P2→P3→P4→P5\n流：F1(入P1), F2(P1→P2), F3(P2→P3), F4(P3→P4), F5(P4→P5), F6(出P5)\n指定：输入边界=F3，输出边界=F5。\n分别填写输入支路、变换中心、输出支路的加工集合（填 P 编号，逗号分隔，顺序不限；不要把边界流 F 写进集合）。\n提示：P=加工（要填），F=数据流/刀口（指定边界用，不进集合）。",
      fields: [
        { id: "in", label: "输入支路加工（填P）", answers: ["P1,P2"], match: "set" },
        { id: "mid", label: "变换中心加工（填P）", answers: ["P3,P4"], match: "set" },
        { id: "out", label: "输出支路加工（填P）", answers: ["P5"], match: "set" }
      ],
      answerShow: "输入 P1,P2；中心 P3,P4；输出 P5",
      explain: "P=加工，F=数据流。F3/F5 只是刀口；F3 之前的加工是输入，F3 到 F5 之间是中心，F5 之后是输出。集合里只写 P，不写 F。"
    },
    {
      id: "C2", level: "C", kind: "multi",
      stem: "链：P1→P2→P3→P4\n指定：输入边界=F2（P1→P2），输出边界=F3（P2→P3）。\n填写三段加工集合。",
      fields: [
        { id: "in", label: "输入支路", answers: ["P1"], match: "set" },
        { id: "mid", label: "变换中心", answers: ["P2"], match: "set" },
        { id: "out", label: "输出支路", answers: ["P3,P4"], match: "set" }
      ],
      answerShow: "输入 P1；中心 P2；输出 P3,P4",
      explain: "切口之间只有 P2 时，中心可以只有一个加工。"
    },
    {
      id: "C3", level: "C", kind: "text",
      stem: "有人把 C1 的「输入支路」写成 P1,P2,F3。对不对？用一句话说明为什么。\n（第一行先写：对/不对）",
      answers: ["不对", "错", "错误", "否"],
      answerShow: "不对。边界流不是加工，不能写入加工集合。",
      explain: "F3 是切口上的数据流，不是加工节点。",
      loose: true
    },
    {
      id: "C4", level: "C", kind: "multi",
      stem: "链：P1→P2→P3→P4→P5→P6\n指定：输入边界=F3（P2→P3），输出边界=F5（P4→P5）。\n填写三段加工集合（填P，勿填F）。（与设备用电报告问题1同构）\n提示：F5 是 P4→P5；交出 F5 的 P4 属中心，接住 F5 的 P5 属输出。",
      fields: [
        { id: "in", label: "输入支路加工（填P）", answers: ["P1,P2"], match: "set" },
        { id: "mid", label: "变换中心加工（填P）", answers: ["P3,P4"], match: "set" },
        { id: "out", label: "输出支路加工（填P）", answers: ["P5,P6"], match: "set" }
      ],
      answerShow: "输入 P1,P2；中心 P3,P4；输出 P5,P6",
      explain: "与设备用电报告问题1同构。中心要吃 F3 并吐出 F5：P3 吃 F3 交 F4，P4 吃 F4 交 F5，故中心含 P3 与 P4。勿把交出 F5 的 P4 划到输出。"
    },
    {
      id: "C5", level: "C", kind: "text",
      stem: "题干说「实际也可选其他边界」。若私下把 C4 的输入边界改成 F2，中心集合会变吗？\n先答：会 / 不会",
      answers: ["会", "会变", "是"],
      answerShow: "会。边界一变，三段隶属的加工集合就变；必须先服从题干指定边界。",
      explain: "指定边界约束答案，不能自行另切还宣称唯一解。",
      loose: true
    },
    {
      id: "D0", level: "D", kind: "info",
      stem: "以下 D 关共用结构约定：\n\n        M0 主控\n       /   |   \\\n     M1   M2   M3\n   （采集）（处理）（发布）\n\n· 箭头只表示可调用；组间不互调，由 M0 传结果。\n· 数据依赖：采集成功后才能处理，处理成功后才能发布。\n\n桩 vs 驱动：\n· 自顶向下、缺下层被调 → 桩（同接口 + 预设返回，不做真业务）\n· 自底向上、缺上层调用者 → 驱动\n· 问三个组顺序时只写 M1,M2,M3，不含主控 M0\n\n本题无需作答，点「下一题」开始 D1。",
      answerShow: "（说明题，无标准填空）",
      explain: "先记住约定与桩/驱动口诀，再做 D1～D6。"
    },
    {
      id: "D1", level: "D", kind: "text",
      stem: "M0 处理一条记录时，三个组模块的调用顺序应写成？（如 M1,M2,M3）\n注意：只写被调的三个组，不要把主控 M0 写进序列。",
      answers: ["M1,M2,M3", "M1->M2->M3", "M1→M2→M3", "M1，M2，M3"],
      answerShow: "M1,M2,M3",
      explain: "由数据依赖决定：先采集，再处理，再发布。M0 是调用者，不是三个组之一，故不含 M0。"
    },
    {
      id: "D2", level: "D", kind: "text",
      stem: "有人说「图上 M3 在最右边，所以最后调用；这是看图得来的」。这句话错在哪？（一句话）",
      answers: ["左右不等于先后", "不能由左右位置推断", "顺序看数据依赖"],
      answerShow: "顺序应由数据依赖决定，不能由左右位置推断。",
      explain: "结构图声明允许谁调谁，不规定兄弟模块的时间顺序。",
      loose: true
    },
    {
      id: "D3", level: "D", kind: "text",
      stem: "现有调用：M0→M3→M32。拟新增 M32→M0。会不会形成调用环？",
      answers: ["会", "是", "会形成", "会形成调用环"],
      answerShow: "会",
      explain: "形成 M0→M3→M32→M0 环。"
    },
    {
      id: "D4", level: "D", kind: "text",
      stem: "自顶向下集成：只实现了 M0，M1/M2/M3 未实现，用临时模块返回预设结果。该构件叫什么？",
      answers: ["桩模块", "桩", "桩程序", "测试桩", "stub"],
      answerShow: "桩模块",
      explain: "缺下层被调 → 桩。桩通常含：与真模块相同的接口、预设返回值，不做真实业务；已实现的 M0 不是桩。口诀：缺下面用桩，缺上面用驱动。"
    },
    {
      id: "D5", level: "D", kind: "text",
      stem: "自底向上：M11 已实现，但还没有真正的 M1 来调用它，临时写个上层调用者驱动 M11。该构件叫什么？",
      answers: ["驱动模块", "驱动", "driver"],
      answerShow: "驱动模块",
      explain: "缺上层调用者 → 驱动。与桩相反：自底向上测下层时，用驱动冒充还没写好的上层。"
    },
    {
      id: "D6", level: "D", kind: "choice",
      stem: "下列哪项会破坏「树形、无环」的层次调用？",
      options: [
        "M0 依次调用 M1、M2、M3",
        "M1 调用自己的叶子 M11",
        "M32 直接调用 M0",
        "M2 把返回值交给 M0，再由 M0 传给 M3"
      ],
      answerIndex: 2,
      answerShow: "3. M32 直接调用 M0",
      explain: "叶子回调主控形成环。"
    },
    {
      id: "E1", level: "E", kind: "text",
      stem: "接口：fee = calc(price, qty)，只做乘法返回金额。\n属于哪种耦合？",
      answers: ["数据耦合", "数据耦合型"],
      answerShow: "数据耦合",
      explain: "只传计算所需简单数据，不指挥执行方式。"
    },
    {
      id: "E2", level: "E", kind: "multi",
      stem: "接口：print(doc, mode)，mode=0 打印，mode=1 仅预览。\n填写耦合类型与控制参数名。",
      fields: [
        { id: "coup", label: "耦合类型", answers: ["控制耦合", "控制耦合型"] },
        { id: "param", label: "控制参数", answers: ["mode"] }
      ],
      answerShow: "控制耦合；mode",
      explain: "mode 是遥控器，决定走哪个分支。"
    },
    {
      id: "E3", level: "E", kind: "text",
      stem: "报告流水线中模块返回字符串等级 \"HIGH\"，供下游拼进正文，不决定下游「走打印还是预览」。\n这是控制耦合吗？（是/不是）",
      answers: ["不是", "否", "不对", "错"],
      answerShow: "不是。HIGH 是业务结果数据，不是遥控执行方式的标志。",
      explain: "看用途：结果数据 ≠ 控制标志。",
      loose: true
    },
    {
      id: "E4", level: "E", kind: "choice",
      stem: "要消除 E2 的控制参数又保留两种能力，更好的是（ ）。",
      options: [
        "把 mode 改名为 level",
        "拆成 printDoc(doc) 与 previewDoc(doc)，由调用者选择",
        "把 mode 放进全局变量"
      ],
      answerIndex: 1,
      answerShow: "B. 拆成两个接口由调用者选择",
      explain: "改名无效；全局变量会引入公共耦合。"
    },
    {
      id: "E5", level: "E", kind: "text",
      stem: "update(customerRecord) 传入整个客户记录，被调模块只用其中的 id 字段。\n更接近哪种耦合？（数据 / 标记 / 控制）",
      answers: ["标记耦合", "标记"],
      answerShow: "标记耦合",
      explain: "传复合结构、只用部分字段 → 标记耦合。"
    },
    {
      id: "E6", level: "E", kind: "choice",
      stem: "模块间仅传递完成计算所需的简单数据项，且不传控制标志，属于（ ）。",
      options: ["内容耦合", "公共耦合", "控制耦合", "数据耦合"],
      answerIndex: 3,
      answerShow: "D. 数据耦合",
      explain: "最常见的弱耦合形态之一。"
    },
    {
      id: "F0", level: "F", kind: "info",
      stem: "迷你综合情景（后续 F1～F5 共用）：\n\nE1 --F1--> P1 --F2--> P2 --F3--> P3 --F4--> P4 --F5--> P5 --F6--> E2\n指定：输入边界 = F3，输出边界 = F4\n\n业务：\n· P1：按逗号拆成 name,cents 两个字符串\n· P2：去空白，cents 转整数，得 {name, cents}\n· P3：total = cents，得 {name, total}\n· P4：生成文本 name=total（无空格）\n· P5：发送该文本\n\n模块：M0 下有 M1(输入) / M2(变换) / M3(输出)\n\n本题无需作答，点「下一题」开始。",
      answerShow: "（说明题，无标准填空）",
      explain: "先吃透情景，再逐空作答。"
    },
    {
      id: "F1", level: "F", kind: "multi",
      stem: "按指定边界 F3 / F4，填写输入、中心、输出加工集合。",
      fields: [
        { id: "in", label: "输入支路", answers: ["P1,P2"], match: "set" },
        { id: "mid", label: "变换中心", answers: ["P3"], match: "set" },
        { id: "out", label: "输出支路", answers: ["P4,P5"], match: "set" }
      ],
      answerShow: "输入 P1,P2；中心 P3；输出 P4,P5",
      explain: "吃 F3、吐 F4 的只有 P3。"
    },
    {
      id: "F2", level: "F", kind: "text",
      stem: "M0 调用三个组模块的顺序？",
      answers: ["M1,M2,M3", "M1->M2->M3", "M1→M2→M3"],
      answerShow: "M1,M2,M3",
      explain: "输入 → 变换 → 输出。"
    },
    {
      id: "F3", level: "F", kind: "multi",
      stem: "接口 send(text, op) 中 op=1 发送、op=2 丢弃。填写耦合类型与控制参数。",
      fields: [
        { id: "coup", label: "耦合类型", answers: ["控制耦合", "控制耦合型"] },
        { id: "param", label: "控制参数", answers: ["op"] }
      ],
      answerShow: "控制耦合；op",
      explain: "op 决定执行方式。"
    },
    {
      id: "F4", level: "F", kind: "text",
      stem: "原始行：\"  bob , 0042 \"\n接收端得到的完整文本？",
      answers: ["bob=42"],
      answerShow: "bob=42",
      explain: "规范化 name=bob、cents=42，格式化为 bob=42。"
    },
    {
      id: "F5", level: "F", kind: "text",
      stem: "自顶向下仅有 M0，替代 M1/M2/M3 的测试构件名称？",
      answers: ["桩模块", "桩", "桩程序", "测试桩", "stub"],
      answerShow: "桩模块",
      explain: "缺下层 → 桩。做完本关可回站内练「设备用电报告」大题。"
    }
  ]
};
