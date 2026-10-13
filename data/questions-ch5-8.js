window.QUESTIONS = window.QUESTIONS || [];
window.QUESTIONS.push(
{
  id: "ch5-o-29", chapter: "ch5", kind: "original", exam: "2026上半年", qnum: 29,
  point: "可维护性", related: null,
  stem: "软件可维护性的主要影响因素不包括（）。",
  options: ["文档完整性", "代码行数", "可理解性", "可测试性"],
  answer: 1,
  explain: "可维护性主要看可理解性、可测试性、可修改性，文档完整性支撑可理解性。LOC不是规范表述中的主要因素。"
},
{
  id: "ch5-s-29", chapter: "ch5", kind: "similar", exam: "", qnum: null,
  point: "维护类型", related: "ch5-o-29",
  stem: "为适应新的操作系统而修改软件，属于（）维护。",
  options: ["改正性维护", "适应性维护", "完善性维护", "预防性维护"],
  answer: 1,
  explain: "改正性=修bug；适应性=环境变化；完善性=增功能；预防性=为将来修改做准备。"
},
{
  id: "ch5-o-33", chapter: "ch5", kind: "original", exam: "2026上半年", qnum: 33,
  point: "风险转移", related: null,
  stem: "针对已识别的风险，采取“购买商业保险”或“签订固定价格合同”的措施属于风险控制中的（）。",
  options: ["风险缓解", "风险转移", "风险接受", "风险规避"],
  answer: 1,
  explain: "保险、外包、固定总价是转移。规避=不做；缓解=降概率或影响；接受=留应急储备。"
},
{
  id: "ch5-s-33", chapter: "ch5", kind: "similar", exam: "", qnum: null,
  point: "风险规避", related: "ch5-o-33",
  stem: "项目组决定不再采用尚未成熟的新技术，改用公司已验证的方案。这属于（）。",
  options: ["风险转移", "风险规避", "风险缓解", "风险接受"],
  answer: 1,
  explain: "换方案、取消高风险工作是规避。对照第33题保险/合同才是转移。"
},
{
  id: "ch5-o-38", chapter: "ch5", kind: "original", exam: "2026上半年", qnum: 38,
  point: "顺序内聚", related: null,
  stem: "某系统设计了一个模块，包含读取用户登录信息、验证密码、记录登录日志和跳转主页等操作。若这些操作必须按固定顺序执行，且后续操作依赖前序结果，则该模块的内聚类型是（）。",
  options: ["时间内聚", "顺序内聚", "功能内聚", "偶然内聚"],
  answer: 1,
  explain: "后续用到前序输出，是顺序内聚。功能内聚更“只完成一个功能”。时间内聚只是同时发生（如初始化一堆无关动作）。"
},
{
  id: "ch5-s-38", chapter: "ch5", kind: "similar", exam: "", qnum: null,
  point: "功能内聚", related: "ch5-o-38",
  stem: "一个模块只完成“计算个人所得税”这一完整功能，其内聚类型是（）。",
  options: ["偶然内聚", "逻辑内聚", "时间内聚", "功能内聚"],
  answer: 3,
  explain: "功能内聚是最强内聚。对照第38题顺序内聚：有数据依赖链条但还不是单一功能。"
},
{
  id: "ch5-o-42", chapter: "ch5", kind: "original", exam: "2026上半年", qnum: 42,
  point: "等价类划分", related: null,
  stem: "等价类划分的主要目的是（）。",
  options: ["简化编码", "减少冗余测试用例，提高测试效率", "保证100%缺陷发现率", "替代系统测试"],
  answer: 1,
  explain: "黑盒方法：同类输入只测代表值。不能保证发现全部缺陷，也不能替代系统测试。"
},
{
  id: "ch5-s-42", chapter: "ch5", kind: "similar", exam: "", qnum: null,
  point: "白盒覆盖", related: "ch5-o-42",
  stem: "白盒测试中，只要求每条可执行语句至少执行一次，而不要求每个判定的真假分支都执行的覆盖标准是（）。",
  options: ["路径覆盖", "条件覆盖", "判定覆盖", "语句覆盖"],
  answer: 3,
  explain: "语句覆盖只检查语句是否执行；判定覆盖要求每个判定的真假分支都执行。条件覆盖关注每个基本条件的真假取值，与判定覆盖不能简单排序。路径覆盖也不能与基本条件覆盖无条件排成强弱全序。"
},
{
  id: "ch5-o-44", chapter: "ch5", kind: "original", exam: "2026上半年", qnum: 44,
  point: "软件容错", related: null,
  stem: "软件容错技术的主要目的是（）。",
  options: ["减少开发成本", "完全消除缺陷", "简化测试流程", "出现故障时软件仍能正常运行"],
  answer: 3,
  explain: "容错是故障发生后仍提供服务。消除缺陷是排错/测试的目标。"
},
{
  id: "ch5-o-50", chapter: "ch5", kind: "original", exam: "2026上半年", qnum: 50,
  point: "SPI", related: null,
  stem: "软件过程改进（SPI）的基本目标是（）。",
  options: ["系统性提升过程能力与产品质量", "降低成本", "缩短开发周期", "减少人员数量"],
  answer: 0,
  explain: "SPI/CMMI的目标是提升过程成熟度与质量。降成本、缩短周期可能是结果，不是“基本目标”的标准表述。"
},
{
  id: "ch5-o-72", chapter: "ch5", kind: "original", exam: "2026上半年", qnum: 72,
  point: "软件文档", related: null,
  stem: "以下关于软件文档的叙述中，正确的是（）。",
  options: ["项目结束后再补写文档即可", "文档应与软件产品保持一致", "文档内容越详细质量越高", "敏捷开发不需要任何文档"],
  answer: 1,
  explain: "文档要与产品同步。不是越细越好，也不是敏捷就零文档。"
},
{
  id: "ch5-s-mccabe", chapter: "ch5", kind: "similar", exam: "", qnum: null,
  point: "McCabe", related: "ch5-o-42",
  stem: "控制流图有7条边、6个结点且连通，其McCabe环路复杂度V(G)为（）。",
  options: ["1", "2", "3", "5"],
  answer: 2,
  explain: "V(G)=e-n+2=7-6+2=3。也可理解为独立路径数。2026第1–2题原图未公开，用公式练同类计算。"
},

{
  id: "ch6-o-67", chapter: "ch6", kind: "original", exam: "2026上半年", qnum: 67,
  point: "父图子图平衡", related: null,
  stem: "某分层数据流图中，父图加工P有3条输入数据流和2条输出数据流，对其分解得到子图，没有发生数据流的分解和合并。下列（）违反了父图子图平衡原则。",
  options: ["子图有3条输入数据流和2条输出数据流", "子图内部加工数量多于1个", "子图有2条输入数据流和3条输出数据流", "子图包含数据存储"],
  answer: 2,
  explain: "无分解合并时，进出子图边界的数据流条数、名称应与父图该加工一致。内部多加工、内部数据存储都可以。"
},
{
  id: "ch6-s-67a", chapter: "ch6", kind: "similar", exam: "", qnum: null,
  point: "数据流分解", related: "ch6-o-67",
  stem: "父图加工P有一条输入数据流“订单信息”。子图把它分解为“客户信息”和“商品明细”，且内容合计等于“订单信息”。这（）。",
  options: ["违反平衡，因为条数变了", "不违反平衡，属于允许的数据流分解", "必须删除其中一条", "说明父图画错了"],
  answer: 1,
  explain: "平衡看的是数据内容守恒，允许分解/合并。第67题强调“没有分解合并”时条数必须一致。"
},
{
  id: "ch6-s-67b", chapter: "ch6", kind: "similar", exam: "", qnum: null,
  point: "DFD要素", related: "ch6-o-67",
  stem: "数据流图的基本成分不包括（）。",
  options: ["外部实体", "加工", "数据存储", "控制流"],
  answer: 3,
  explain: "DFD四要素：实体、加工、数据存储、数据流。控制流是控制流图/程序流程图的概念。"
},
{
  id: "ch6-s-67c", chapter: "ch6", kind: "similar", exam: "", qnum: null,
  point: "实体连线", related: "ch6-o-67",
  stem: "在数据流图中，下列画法错误的是（）。",
  options: ["外部实体向加工发送数据流", "加工读写数据存储", "两个外部实体之间直接连数据流", "加工的输出流向另一个加工"],
  answer: 2,
  explain: "实体之间、存储之间一般不直接连数据流，必须经过加工。"
},
{
  id: "ch6-s-67d", chapter: "ch6", kind: "similar", exam: "", qnum: null,
  point: "加工逻辑", related: "ch6-o-67",
  stem: "描述加工逻辑时，适合表示复杂组合条件的工具是（）。",
  options: ["数据字典", "判定表或判定树", "E-R图", "甘特图"],
  answer: 1,
  explain: "加工逻辑：结构化语言、判定表、判定树。数据字典定义数据组成。下午DFD常问组成=字段1+字段2。"
},
{
  id: "ch6-s-67e", chapter: "ch6", kind: "similar", exam: "", qnum: null,
  point: "上下文图", related: "ch6-o-67",
  stem: "顶层（上下文）数据流图中，通常（）。",
  options: ["画出全部数据存储", "只画一个加工表示整个系统及外部实体", "必须分解出3层以上", "不允许出现数据流名称"],
  answer: 1,
  explain: "上下文图：系统看成一个加工，只画外部实体与系统之间的数据流。0层图才展开主要加工和存储。"
},
{
  id: "ch6-s-67f", chapter: "ch6", kind: "similar", exam: "", qnum: null,
  point: "数据字典组成", related: "ch6-o-67",
  stem: "数据字典中，数据流“识别结果”由“有无缺陷”和“缺陷类型”组成，正确写法是（）。",
  options: ["识别结果 = 有无缺陷 + 缺陷类型", "识别结果 > 有无缺陷", "识别结果 ⊂ 缺陷类型", "识别结果 || 缺陷类型"],
  answer: 0,
  explain: "下午题常用“=”和“+”表示组成。这是DFD第4小问的标准答法。"
},

{
  id: "ch7-o-10", chapter: "ch7", kind: "original", exam: "2026上半年", qnum: 10,
  point: "单例模式", related: null,
  stem: "欲设计一套智能家居系统。系统中只需要一个“中央控制器”实例。该需求适合采用（）进行设计。",
  options: ["工厂方法模式（Factory Method）", "单例模式（Singleton）", "抽象工厂模式（Abstract Factory）", "生成器模式（Builder）"],
  answer: 1,
  explain: "全局唯一实例→单例。工厂方法/抽象工厂解决“创建哪一类对象”，生成器解决“复杂对象分步建造”。"
},
{
  id: "ch7-o-11", chapter: "ch7", kind: "original", exam: "2026上半年", qnum: 11,
  point: "适配器模式", related: null,
  stem: "智能家居控制器需要支持接入不同品牌的灯具，控制接口要统一；要能接入新的接口不兼容灯具，且不修改原有系统代码。该需求适合采用（）。",
  options: ["适配器模式（Adapter）", "代理模式（Proxy）", "外观模式（Facade）", "装饰器模式（Decorator）"],
  answer: 0,
  explain: "接口不兼容、要统一→适配器。装饰器是在不改变接口的前提下加职责。代理控制访问。外观简化子系统接口。"
},
{
  id: "ch7-o-12", chapter: "ch7", kind: "original", exam: "2026上半年", qnum: 12,
  point: "观察者模式", related: null,
  stem: "当传感器检测到温度变化时，空调、加湿器和窗帘等多个设备需要自动做出响应。该需求适合采用（）。",
  options: ["观察者模式（Observer）", "迭代器模式（Iterator）", "备忘录模式（Memento）", "策略模式（Strategy）"],
  answer: 0,
  explain: "一对多通知→观察者。策略是算法可互换。备忘录是保存/恢复状态。"
},
{
  id: "ch7-o-13", chapter: "ch7", kind: "original", exam: "2026上半年", qnum: 13,
  point: "命令模式", related: null,
  stem: "系统需要实现“一键场景”：将“调光”“开机”等动作封装为实现了统一接口的类，按钮无需了解设备细节，只需持有这些动作对象并在点击时触发。适合采用（）。",
  options: ["备忘录模式（Memento）", "命令模式（Command）", "状态模式（State）", "策略模式（Strategy）"],
  answer: 1,
  explain: "把请求封装成对象→命令。策略强调“怎么计算可替换”，命令强调“做什么可排队/撤销/宏”。"
},
{
  id: "ch7-s-13", chapter: "ch7", kind: "similar", exam: "", qnum: null,
  point: "策略vs命令", related: "ch7-o-13",
  stem: "电商系统结账时，用户可在“满减、折扣券、积分抵扣”中选择一种计价方式，且可随时替换。最适合的模式是（）。",
  options: ["命令模式", "策略模式", "观察者模式", "单例模式"],
  answer: 1,
  explain: "一组算法可互换→策略。命令更像“把一次操作对象化”。对照第13题一键场景。"
},
{
  id: "ch7-o-14", chapter: "ch7", kind: "original", exam: "2026上半年", qnum: 14,
  point: "类与对象", related: null,
  stem: "以下关于面向对象技术中类和对象的关系描述，正确的是（）。",
  options: ["类是对象的具体实例", "一个类只能创建一个对象", "类是模板，对象是根据模板创建的实例", "对象是抽象的，类是具体的"],
  answer: 2,
  explain: "类抽象，对象具体。一个类可创建多个对象。"
},
{
  id: "ch7-o-15", chapter: "ch7", kind: "original", exam: "2026上半年", qnum: 15,
  point: "类对象实例", related: null,
  stem: "（）体现了类和对象的关系。",
  options: ["汽车颜色和那一辆白色比亚迪", "汽车和刹车功能", "汽车和汽车颜色", "汽车和那一辆白色比亚迪"],
  answer: 3,
  explain: "汽车是类，某一辆车是对象。颜色是属性，刹车是操作。"
},
{
  id: "ch7-o-31", chapter: "ch7", kind: "original", exam: "2026上半年", qnum: 31,
  point: "继承", related: null,
  stem: "以动物分类为例，猫是一种动物，猫不需要重新定义“呼吸”和“睡觉”的方法，直接使用动物类的方法，这一面向对象技术是（）。",
  options: ["实例化", "继承", "封装", "依赖"],
  answer: 1,
  explain: "is-a → 继承/泛化。封装是隐藏细节。依赖是使用关系。"
},
{
  id: "ch7-o-45", chapter: "ch7", kind: "original", exam: "2026上半年", qnum: 45,
  point: "开闭原则", related: null,
  stem: "对某支付系统的支付方式进行扩展，系统原本只支持支付宝，现需增加微信支付。不需要修改原有业务逻辑代码，只需要新增一个支付实现类并配置即可。这体现了（）原则。",
  options: ["开放-封闭", "单一职责", "依赖倒置", "里氏替换"],
  answer: 0,
  explain: "对扩展开放、对修改封闭。新增类而不改旧逻辑是OCP教科书场景。"
},
{
  id: "ch7-s-45", chapter: "ch7", kind: "similar", exam: "", qnum: null,
  point: "里氏替换", related: "ch7-o-45",
  stem: "凡是使用父类的地方都可以用子类替换，程序行为仍正确。这是（）。",
  options: ["开闭原则", "里氏替换原则", "接口隔离原则", "迪米特法则"],
  answer: 1,
  explain: "LSP。正方形继承矩形导致面积计算出错，是违反LSP的经典反例。对照第45题OCP。"
},
{
  id: "ch7-o-49", chapter: "ch7", kind: "original", exam: "2026上半年", qnum: 49,
  point: "封装", related: null,
  stem: "面向对象技术中，封装的主要目的是（）。",
  options: ["实现代码的跨平台运行", "提高程序的执行速度", "隐藏对象的内部细节，只对外暴露必要的接口", "让代码可以被随意修改"],
  answer: 2,
  explain: "封装=信息隐藏+接口访问。与跨平台、执行速度无必然关系。"
},
{
  id: "ch7-o-66", chapter: "ch7", kind: "original", exam: "2026上半年", qnum: 66,
  point: "运行时多态", related: null,
  stem: "以下场景中，（）体现了运行时多态。",
  options: ["封装了私有属性", "子类覆盖父类的方法，父类引用指向子类对象时执行子类的方法", "同一个类中有多个同名但参数类型列表不同的方法", "一个类继承了多个父类"],
  answer: 1,
  explain: "覆盖+父类引用指向子类=运行时多态。同名不同参是重载（编译期）。多继承不是多态定义。"
},
{
  id: "ch7-s-66", chapter: "ch7", kind: "similar", exam: "", qnum: null,
  point: "重载", related: "ch7-o-66",
  stem: "同一类中 print(int) 与 print(String) 共存，这属于（）。",
  options: ["运行时多态", "重写（覆盖）", "重载", "组合"],
  answer: 2,
  explain: "重载看参数列表，编译期绑定。重写看继承关系，运行时绑定。对照第66题。"
},
{
  id: "ch7-o-68", chapter: "ch7", kind: "original", exam: "2026上半年", qnum: 68,
  point: "组合", related: null,
  stem: "以下关于房屋（House）和房间（Room）的UML类图中，House与Room之间的实心菱形连线表示（）。",
  options: ["实现：House实现了Room的接口", "聚合：房屋拆除后，房间可以独立存在", "组合：房屋和房间具有相同的生命周期（屋毁房亡）", "泛化：House是Room的子类"],
  answer: 2,
  explain: "实心菱形=组合（强整体-部分）。空心菱形=聚合。空心三角=泛化。虚线三角=实现。"
},
{
  id: "ch7-s-68", chapter: "ch7", kind: "similar", exam: "", qnum: null,
  point: "聚合", related: "ch7-o-68",
  stem: "大学与学生之间常用空心菱形表示，含义是（）。",
  options: ["组合，学生不能离开大学独立存在", "聚合，大学解散后学生仍可存在", "泛化，学生是大学的子类", "实现，大学实现学生接口"],
  answer: 1,
  explain: "空心菱形=聚合，部分可独立。对照第68题实心=组合。"
},

{
  id: "ch8-o-32", chapter: "ch8", kind: "original", exam: "2026上半年", qnum: 32,
  point: "递推复杂度", related: null,
  stem: "某算法的时间复杂度由递归式 T(n)=2T(n/2)+n log n 定义，其渐近紧致界为（）。",
  options: ["Θ(n²)", "Θ(n log n)", "Θ(n log² n)", "Θ(n² log n)"],
  answer: 2,
  explain: "主定理第三种要求 f(n)=Ω(n^{1+ε})，n log n 相对 n 只多对数，不满足。递归树每层代价 n(log n−i)，共 log n 层，求和得 Θ(n log² n)。"
},
{
  id: "ch8-s-32", chapter: "ch8", kind: "similar", exam: "", qnum: null,
  point: "主定理归并", related: "ch8-o-32",
  stem: "归并排序的递推式可写成 T(n)=2T(n/2)+Θ(n)，其解为（）。",
  options: ["Θ(n)", "Θ(n log n)", "Θ(n²)", "Θ(n log² n)"],
  answer: 1,
  explain: "这是主定理第二种：f(n)=Θ(n^{log_b a})。对照第32题多一个 log 就变成 n log² n。"
},
{
  id: "ch8-o-39", chapter: "ch8", kind: "original", exam: "2026上半年", qnum: 39,
  point: "回溯", related: null,
  stem: "以下关于回溯算法的叙述中，正确的是（）。",
  options: ["对同一问题，回溯的计算效率往往比动态规划更高", "回溯算法通过深度优先搜索，通过剪枝操作减少无效搜索", "0-1背包问题不能用回溯算法求解，只能用动态规划求解", "回溯算法不需要存储中间结果，空间复杂度较低"],
  answer: 1,
  explain: "回溯=DFS+剪枝。0-1背包两种都能做；有重叠子问题时DP通常更快；回溯递归栈并不一定省空间。"
},
{
  id: "ch8-s-39", chapter: "ch8", kind: "similar", exam: "", qnum: null,
  point: "算法策略识别", related: "ch8-o-39",
  stem: "求解“活动选择”（若干活动互斥使用同一场地，选最多兼容活动）时，按结束时间排序后每次选结束最早且不冲突的活动。该策略属于（）。",
  options: ["动态规划", "贪心", "回溯", "分治"],
  answer: 1,
  explain: "2026下午算法复盘指向活动选择/贪心。排序键是结束时间；半开区间端点相等通常兼容（s>=f_last）。"
},
{
  id: "ch8-s-39b", chapter: "ch8", kind: "similar", exam: "", qnum: null,
  point: "贪心排序键", related: "ch8-o-39",
  stem: "活动选择贪心若改为按开始时间从早到晚选取，通常（）。",
  options: ["仍然总是得到最优解", "可能得不到最大兼容子集", "时间复杂度从O(n log n)变为O(1)", "等价于动态规划"],
  answer: 1,
  explain: "一个开始很早但结束很晚的活动会占满整天，挤掉多个短活动。必须按结束时间。"
},
{
  id: "ch8-s-dp", chapter: "ch8", kind: "similar", exam: "", qnum: null,
  point: "0-1背包", related: "ch8-o-39",
  stem: "0-1背包适合用动态规划的关键原因是（）。",
  options: ["子问题重叠且具有最优子结构", "必须回溯所有排列", "贪心选单位价值最高一定最优", "只能递归不能填表"],
  answer: 0,
  explain: "DP两大前提：最优子结构+重叠子问题。分数背包才适合贪心单位价值。"
},
{
  id: "ch8-s-bs", chapter: "ch8", kind: "similar", exam: "", qnum: null,
  point: "二分查找", related: "ch8-o-32",
  stem: "在有序数组上二分查找的时间复杂度是（）。",
  options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
  answer: 1,
  explain: "每次把规模减半。和主定理 T(n)=T(n/2)+Θ(1) 同类。"
},

// ========== ch5 补充 15 题 (ch5-s-100 ~ ch5-s-114) ==========
{
  id: "ch5-s-100", chapter: "ch5", kind: "similar", exam: "", qnum: null,
  point: "生命周期模型", related: null,
  stem: "某项目需求不明确，用户希望先看到核心功能原型再逐步完善。最适合的生命周期模型是（）。",
  options: ["瀑布模型", "增量模型", "螺旋模型", "原型模型"],
  answer: 3,
  explain: "需求不明确、先做原型→原型模型。增量是需求基本清楚分批交付；螺旋强调风险分析。"
},
{
  id: "ch5-s-101", chapter: "ch5", kind: "similar", exam: "", qnum: null,
  point: "V模型", related: null,
  stem: "V模型中，与\"详细设计\"阶段对应的测试级别是（）。",
  options: ["单元测试", "集成测试", "系统测试", "验收测试"],
  answer: 0,
  explain: "V模型左右对称：需求↔验收，概要设计↔集成，详细设计↔单元，系统设计↔系统测试。"
},
{
  id: "ch5-s-102", chapter: "ch5", kind: "similar", exam: "", qnum: null,
  point: "螺旋模型", related: null,
  stem: "以下关于螺旋模型的叙述，正确的是（）。\n①每个螺旋周期都包含风险分析\n②适合需求稳定的小型项目\n③结合了瀑布模型和原型模型的特点\n④不需要客户参与评审",
  options: ["①③", "②④", "①②③", "①③④"],
  answer: 0,
  explain: "螺旋=瀑布+原型+风险分析，每轮都做风险评估和客户评审，适合大型高风险项目。"
},
{
  id: "ch5-s-103", chapter: "ch5", kind: "similar", exam: "", qnum: null,
  point: "敏捷开发", related: null,
  stem: "敏捷开发中，Scrum的迭代周期称为Sprint，通常持续（）。",
  options: ["1～2天", "1～4周", "3～6个月", "半年以上"],
  answer: 1,
  explain: "Sprint一般2～4周（最长不超过4周）。每个Sprint结束交付可工作的增量。"
},
{
  id: "ch5-s-104", chapter: "ch5", kind: "similar", exam: "", qnum: null,
  point: "功能/非功能需求", related: null,
  stem: "\"系统响应时间不超过2秒\"属于（）。",
  options: ["功能需求", "非功能需求", "设计约束", "接口需求"],
  answer: 1,
  explain: "响应时间属于性能需求，是非功能需求的一种。功能需求描述系统\"做什么\"。"
},
{
  id: "ch5-s-105", chapter: "ch5", kind: "similar", exam: "", qnum: null,
  point: "关键路径", related: null,
  stem: "某项目活动如下：A(3天)→B(5天)→D(2天)；A(3天)→C(4天)→D(2天)。项目最短工期为（）天。",
  options: ["9", "10", "12", "14"],
  answer: 1,
  explain: "路径ABD=3+5+2=10天，ACD=3+4+2=9天。关键路径取最长=10天。"
},
{
  id: "ch5-s-106", chapter: "ch5", kind: "similar", exam: "", qnum: null,
  point: "COCOMO", related: null,
  stem: "COCOMO模型将项目分为三种类型，其中开发过的类似项目、规模较小的属于（）。",
  options: ["有机型（Organic）", "半分离型（Semi-detached）", "嵌入型（Embedded）", "复杂型"],
  answer: 0,
  explain: "有机型=小团队、熟悉的应用；半分离=中等规模；嵌入型=受硬件等强约束的复杂项目。"
},
{
  id: "ch5-s-107", chapter: "ch5", kind: "similar", exam: "", qnum: null,
  point: "功能点估算", related: null,
  stem: "功能点分析中，下列不属于信息域特征的是（）。",
  options: ["外部输入", "外部输出", "代码行数", "外部查询"],
  answer: 2,
  explain: "功能点5个信息域：外部输入EI、外部输出EO、外部查询EQ、内部逻辑文件ILF、外部接口文件EIF。代码行数是LOC度量。"
},
{
  id: "ch5-s-108", chapter: "ch5", kind: "similar", exam: "", qnum: null,
  point: "配置管理", related: null,
  stem: "软件配置管理中，\"基线\"的含义是（）。",
  options: ["项目启动日期", "已通过正式评审的软件配置项，后续修改须走变更控制", "代码编译的最低版本号", "测试用例的通过率"],
  answer: 1,
  explain: "基线是经过评审并正式纳入配置管理的配置项快照，之后的修改必须经过变更控制流程。"
},
{
  id: "ch5-s-109", chapter: "ch5", kind: "similar", exam: "", qnum: null,
  point: "CMMI", related: null,
  stem: "CMMI能力成熟度模型中，\"已管理级\"（第2级）的核心特征是（）。",
  options: ["过程不可预测，靠个人英雄", "项目级别建立了基本的管理过程", "组织级标准过程已定义", "过程可量化控制", "持续优化过程"],
  answer: 1,
  explain: "CMMI五级：1初始/混乱→2已管理（项目级过程）→3已定义（组织级标准）→4量化管理→5优化。"
},
{
  id: "ch5-s-110", chapter: "ch5", kind: "similar", exam: "", qnum: null,
  point: "缺陷密度", related: null,
  stem: "某模块有2000行代码，测试发现10个缺陷。其缺陷密度为（）。",
  options: ["0.5个/KLOC", "5个/KLOC", "10个/KLOC", "20个/KLOC"],
  answer: 1,
  explain: "缺陷密度=缺陷数/代码规模(KLOC)=10/2=5个/KLOC。"
},
{
  id: "ch5-s-111", chapter: "ch5", kind: "similar", exam: "", qnum: null,
  point: "α/β测试", related: null,
  stem: "β测试与α测试的主要区别在于（）。",
  options: ["β测试在开发方场地进行", "β测试由最终用户在实际环境中进行", "α测试不需要开发人员参与", "β测试是白盒测试"],
  answer: 1,
  explain: "α测试=用户在开发方场地、开发者在旁；β测试=用户在自己的实际环境中独立使用。"
},
{
  id: "ch5-s-112", chapter: "ch5", kind: "similar", exam: "", qnum: null,
  point: "边界值分析", related: null,
  stem: "整数输入项X的有效范围是[1, 100]。采用单变量健壮边界值分析，选择最小值及其两侧、最大值及其两侧，以及一个正常值50，完整的测试值集合是（）。",
  options: ["0, 1, 2, 50, 99, 100, 101", "1, 2, 50, 99, 100", "0, 1, 50, 100, 101", "1, 50, 100"],
  answer: 0,
  explain: "单变量健壮边界值取min-1、min、min+1、nom、max-1、max、max+1，即0、1、2、50、99、100、101。普通边界值分析不取范围外的0和101，不能混淆这两种方法。"
},
{
  id: "ch5-s-113", chapter: "ch5", kind: "similar", exam: "", qnum: null,
  point: "逻辑覆盖", related: "ch5-s-42",
  stem: "C语言代码段：if(a>0 && b>0) x=1; else x=2; 按&&的短路求值语义，以每个基本条件实际被求值为真、为假各至少一次作为条件覆盖标准，最少需要（）个测试用例。",
  options: ["1", "2", "3", "4"],
  answer: 2,
  explain: "可取(a,b)=(1,1)、(1,0)、(0,1)。前两例分别令b>0实际求值为真和假；第三例令a>0为假，此时b>0被短路，不计作已求值。要覆盖b的真假至少需要两例a为真，再加一例a为假，所以最少3例。"
},
{
  id: "ch5-s-114", chapter: "ch5", kind: "similar", exam: "", qnum: null,
  point: "McCabe计算", related: "ch5-s-mccabe",
  stem: "某程序流程图有10条边、8个结点、1个连通分量，McCabe环路复杂度V(G)=（）。",
  options: ["2", "3", "4", "5"],
  answer: 2,
  explain: "V(G)=e-n+2p=10-8+2×1=4。p为连通分量数，通常=1。"
},

// ========== ch6 补充 18 题 (ch6-s-100 ~ ch6-s-117) ==========
{
  id: "ch6-s-100", chapter: "ch6", kind: "similar", exam: "", qnum: null,
  point: "0层图规则", related: null,
  stem: "将上下文图细化为0层图时，以下做法正确的是（）。",
  options: ["可以增加新的外部实体", "只分解加工，外部实体和系统边界数据流不变", "必须在0层图中画出所有底层加工", "0层图不允许出现数据存储"],
  answer: 1,
  explain: "细化时外部实体和系统边界数据流保持不变（父图子图平衡），0层图可以有数据存储。"
},
{
  id: "ch6-s-101", chapter: "ch6", kind: "similar", exam: "", qnum: null,
  point: "数据字典符号", related: "ch6-s-67f",
  stem: "数据字典中，符号\"{}\"表示（）。",
  options: ["顺序连接", "选择（或）", "重复", "可选"],
  answer: 2,
  explain: "+顺序，|或[|]选择，{}重复，()可选。"
},
{
  id: "ch6-s-102", chapter: "ch6", kind: "similar", exam: "", qnum: null,
  point: "数据字典符号全", related: "ch6-s-67f",
  stem: "数据字典条目：订单={订单项} 表示一个订单包含（）。",
  options: ["恰好一个订单项", "零个或多个订单项", "订单项或为空", "订单项的别名"],
  answer: 1,
  explain: "{}表示重复（0次或多次）。"
},
{
  id: "ch6-s-103", chapter: "ch6", kind: "similar", exam: "", qnum: null,
  point: "变换分析", related: null,
  stem: "结构化设计中，变换分析的第一步是（）。",
  options: ["画结构图", "区分DFD中的传入流、变换中心和传出流", "编写伪代码", "进行模块优化"],
  answer: 1,
  explain: "变换分析：先在DFD中识别逻辑输入/变换中心/逻辑输出边界，再映射为结构图。"
},
{
  id: "ch6-s-104", chapter: "ch6", kind: "similar", exam: "", qnum: null,
  point: "事务分析", related: null,
  stem: "DFD中某加工根据输入数据类型分派到多条不同处理路径，对此应采用（）。",
  options: ["变换分析", "事务分析", "对象分析", "关键路径分析"],
  answer: 1,
  explain: "事务分析用于\"事务中心\"根据输入类型选择不同处理路径的场景。变换分析用于顺序的输入-处理-输出流。"
},
{
  id: "ch6-s-105", chapter: "ch6", kind: "similar", exam: "", qnum: null,
  point: "数据耦合", related: null,
  stem: "模块A调用模块B时，只传递了若干简单数据项（如整数、字符串）。它们之间的耦合类型是（）。",
  options: ["内容耦合", "公共耦合", "控制耦合", "数据耦合"],
  answer: 3,
  explain: "只传简单数据项→数据耦合（最松的耦合之一）。传结构体→标记耦合；传控制标志→控制耦合。"
},
{
  id: "ch6-s-106", chapter: "ch6", kind: "similar", exam: "", qnum: null,
  point: "控制耦合", related: null,
  stem: "模块A传给模块B一个标志位flag，B根据flag决定执行不同逻辑。这是（）耦合。",
  options: ["数据耦合", "标记耦合", "控制耦合", "外部耦合"],
  answer: 2,
  explain: "传递控制信息（开关/标志）→控制耦合。数据耦合只传数据值。"
},
{
  id: "ch6-s-107", chapter: "ch6", kind: "similar", exam: "", qnum: null,
  point: "耦合排序", related: null,
  stem: "以下耦合类型，由弱到强排列正确的是（）。",
  options: ["数据→标记→控制→外部→公共→内容", "控制→数据→标记→公共→外部→内容", "数据→控制→标记→内容→公共→外部", "标记→数据→控制→公共→内容→外部"],
  answer: 0,
  explain: "弱到强：非直接→数据→标记→控制→外部→公共→内容。"
},
{
  id: "ch6-s-108", chapter: "ch6", kind: "similar", exam: "", qnum: null,
  point: "内聚排序", related: "ch5-o-38",
  stem: "以下内聚类型从低到高排列正确的是（）。",
  options: ["偶然→逻辑→时间→过程→通信→顺序→功能", "功能→顺序→通信→过程→时间→逻辑→偶然", "偶然→时间→逻辑→过程→通信→顺序→功能", "偶然→逻辑→过程→时间→通信→顺序→功能"],
  answer: 0,
  explain: "口诀\"偶逻时过通顺功\"（巧记：偶然最低，功能最高）。"
},
{
  id: "ch6-s-109", chapter: "ch6", kind: "similar", exam: "", qnum: null,
  point: "SC图", related: null,
  stem: "结构图（SC图）中，模块之间传递的空心箭头表示（），实心箭头表示（）。",
  options: ["数据信息；控制信息", "控制信息；数据信息", "输入流；输出流", "调用；返回"],
  answer: 0,
  explain: "SC图：空心圆箭头=数据，实心圆箭头=控制。"
},
{
  id: "ch6-s-110", chapter: "ch6", kind: "similar", exam: "", qnum: null,
  point: "Jackson方法", related: null,
  stem: "Jackson方法的基本思想是（）。",
  options: ["从数据流图导出程序结构", "从数据结构导出程序结构", "从用例图导出程序结构", "从E-R图导出程序结构"],
  answer: 1,
  explain: "Jackson方法=面向数据结构的设计方法，由输入/输出数据结构映射程序结构。"
},
{
  id: "ch6-s-111", chapter: "ch6", kind: "similar", exam: "", qnum: null,
  point: "黑洞/奇迹/灰洞", related: null,
  stem: "DFD中某加工只有输入数据流而没有输出数据流，这种错误称为（）。",
  options: ["奇迹", "黑洞", "灰洞", "数据流缺失"],
  answer: 1,
  explain: "黑洞=只入不出；奇迹=只出不入；灰洞=输出多于输入能产生的。"
},
{
  id: "ch6-s-112", chapter: "ch6", kind: "similar", exam: "", qnum: null,
  point: "奇迹", related: null,
  stem: "DFD检查中发现某加工没有任何输入数据流却产生了输出，这属于（）。",
  options: ["黑洞", "奇迹", "数据流守恒", "灰洞"],
  answer: 1,
  explain: "只出不入→奇迹，说明加工的数据来源缺失。"
},
{
  id: "ch6-s-113", chapter: "ch6", kind: "similar", exam: "", qnum: null,
  point: "判定表", related: "ch6-s-67d",
  stem: "某业务规则有3个条件，每个条件取值为真或假，完整的判定表应有（）列规则。",
  options: ["3", "6", "8", "9"],
  answer: 2,
  explain: "n个二值条件→2^n种组合。3个条件→2³=8列。"
},
{
  id: "ch6-s-114", chapter: "ch6", kind: "similar", exam: "", qnum: null,
  point: "结构化语言", related: "ch6-s-67d",
  stem: "加工规格说明的三种描述工具中，最接近自然语言但又有严格结构的是（）。",
  options: ["判定表", "判定树", "结构化语言（伪代码）", "数据流图"],
  answer: 2,
  explain: "结构化语言=受限的自然语言+顺序/选择/循环结构。判定表/判定树更适合复杂多条件。"
},
{
  id: "ch6-s-115", chapter: "ch6", kind: "similar", exam: "", qnum: null,
  point: "实体识别", related: null,
  stem: "某图书管理系统的业务描述中，\"读者\"和\"图书馆管理员\"属于DFD中的（）。",
  options: ["加工", "数据存储", "外部实体", "数据流"],
  answer: 2,
  explain: "系统外部与系统交互的人或组织→外部实体。"
},
{
  id: "ch6-s-116", chapter: "ch6", kind: "similar", exam: "", qnum: null,
  point: "数据存储识别", related: null,
  stem: "业务描述中提到\"借阅记录保存在借阅表中\"，\"借阅表\"在DFD中应画为（）。",
  options: ["外部实体", "加工", "数据存储", "数据流"],
  answer: 2,
  explain: "保存数据的地方→数据存储。"
},
{
  id: "ch6-s-117", chapter: "ch6", kind: "similar", exam: "", qnum: null,
  point: "综合场景", related: null,
  stem: "某在线购物系统中，\"顾客提交订单，系统验证库存后生成发货单\"。其中\"验证库存\"在DFD中属于（）。",
  options: ["外部实体", "数据流", "加工", "数据存储"],
  answer: 2,
  explain: "动作/处理过程→加工。顾客→外部实体，订单/发货单→数据流。"
},

// ========== ch7 补充 12 题 (ch7-s-100 ~ ch7-s-111) ==========
{
  id: "ch7-s-100", chapter: "ch7", kind: "similar", exam: "", qnum: null,
  point: "UML图辨析", related: null,
  stem: "描述对象之间的消息传递顺序，强调时间先后关系的UML图是（）。",
  options: ["类图", "活动图", "序列图（顺序图）", "部署图"],
  answer: 2,
  explain: "序列图=对象间交互的时间顺序。活动图=流程/并行。类图=静态结构。部署图=物理节点。"
},
{
  id: "ch7-s-101", chapter: "ch7", kind: "similar", exam: "", qnum: null,
  point: "状态图", related: null,
  stem: "描述一个订单从\"已创建→已支付→已发货→已完成\"状态转换的UML图是（）。",
  options: ["用例图", "状态机图", "组件图", "通信图"],
  answer: 1,
  explain: "状态机图=单个对象在其生命周期中的状态变迁。"
},
{
  id: "ch7-s-102", chapter: "ch7", kind: "similar", exam: "", qnum: null,
  point: "类图组合关系", related: "ch7-o-68",
  stem: "在某文档模型中，每个段落同时只能属于一个文档；删除文档时，其拥有的段落也随之删除。文档与段落之间的整体—部分关系最适合用哪种UML符号表示？",
  options: ["实心菱形在文档端的组合关系", "空心三角指向文档的泛化关系", "虚线空心三角指向段落的实现关系", "空心菱形在段落端的聚合关系"],
  answer: 0,
  explain: "独占所有权及整体删除时删除所拥有部分，符合组合语义；实心菱形画在整体文档端。泛化表示is-a，实现表示实现接口契约，两者不是整体—部分关系。UML没有将依赖、关联、聚合、组合、泛化、实现全部排成强度全序的规范规则。"
},
{
  id: "ch7-s-103", chapter: "ch7", kind: "similar", exam: "", qnum: null,
  point: "桥接模式", related: null,
  stem: "一个绘图系统需要支持多种形状（圆形、矩形）和多种渲染方式（OpenGL、DirectX），将形状抽象与渲染实现分离使它们可独立变化。最适合的模式是（）。",
  options: ["适配器模式", "桥接模式", "装饰器模式", "组合模式"],
  answer: 1,
  explain: "两个独立变化维度→桥接模式。将抽象部分与实现部分分离。"
},
{
  id: "ch7-s-104", chapter: "ch7", kind: "similar", exam: "", qnum: null,
  point: "享元模式", related: null,
  stem: "文档编辑器中有大量相同字符对象，为节省内存将字符的内在状态（字体、大小）共享，外部状态（位置）由客户端提供。这使用了（）。",
  options: ["原型模式", "单例模式", "享元模式", "代理模式"],
  answer: 2,
  explain: "享元=共享细粒度对象减少内存。区分内在状态（可共享）和外在状态（不可共享）。"
},
{
  id: "ch7-s-105", chapter: "ch7", kind: "similar", exam: "", qnum: null,
  point: "中介者模式", related: null,
  stem: "聊天室中多个用户互相发消息，若每个用户都直接持有其他用户引用则耦合过高。引入一个\"聊天室\"对象来转发消息，这使用了（）。",
  options: ["观察者模式", "中介者模式", "职责链模式", "访问者模式"],
  answer: 1,
  explain: "中介者=用一个中介对象封装一组对象的交互，避免对象间直接相互引用。"
},
{
  id: "ch7-s-106", chapter: "ch7", kind: "similar", exam: "", qnum: null,
  point: "职责链模式", related: null,
  stem: "请假审批系统中，3天以内主管批，3～7天经理批，7天以上总监批。请假请求沿审批链传递直到有人处理。这是（）。",
  options: ["策略模式", "职责链模式", "命令模式", "状态模式"],
  answer: 1,
  explain: "请求沿链传递，每个处理者决定处理或转发→职责链。"
},
{
  id: "ch7-s-107", chapter: "ch7", kind: "similar", exam: "", qnum: null,
  point: "模板方法模式", related: null,
  stem: "框架定义了算法骨架（如初始化→加载数据→处理→输出），子类只需覆盖\"加载数据\"和\"处理\"步骤。这是（）。",
  options: ["策略模式", "模板方法模式", "工厂方法模式", "建造者模式"],
  answer: 1,
  explain: "模板方法=父类定义算法骨架，将某些步骤延迟到子类实现。"
},
{
  id: "ch7-s-108", chapter: "ch7", kind: "similar", exam: "", qnum: null,
  point: "状态模式", related: null,
  stem: "自动售货机有\"待投币、已投币、出货中\"三种状态，每种状态下对\"投币\"\"退币\"\"转动手柄\"操作的响应不同。最适合的模式是（）。",
  options: ["状态模式", "策略模式", "命令模式", "备忘录模式"],
  answer: 0,
  explain: "状态模式=对象行为随内部状态改变而改变。策略是算法互换，无状态转换。"
},
{
  id: "ch7-s-109", chapter: "ch7", kind: "similar", exam: "", qnum: null,
  point: "SOLID综合", related: "ch7-o-45",
  stem: "以下关于SOLID原则的叙述，错误的是（）。",
  options: ["S-单一职责：一个类应该只有一个引起变化的原因", "O-开闭原则：对扩展开放，对修改封闭", "L-里氏替换：子类可以改变父类已实现方法的行为契约", "I-接口隔离：不应强迫客户依赖不需要的接口"],
  answer: 2,
  explain: "LSP要求子类替换父类后程序行为不变，不能改变父类方法的行为契约。"
},
{
  id: "ch7-s-110", chapter: "ch7", kind: "similar", exam: "", qnum: null,
  point: "设计模式分类", related: null,
  stem: "以下设计模式中，属于结构型模式的是（）。\n①适配器 ②观察者 ③装饰器 ④策略 ⑤桥接",
  options: ["①②③", "①③⑤", "②④⑤", "③④⑤"],
  answer: 1,
  explain: "结构型：适配器、桥接、组合、装饰器、外观、享元、代理。观察者和策略是行为型。"
},
{
  id: "ch7-s-111", chapter: "ch7", kind: "similar", exam: "", qnum: null,
  point: "抽象类vs接口", related: null,
  stem: "以下关于抽象类和接口的比较，正确的是（）。",
  options: ["接口可以包含已实现的方法，抽象类不能", "一个类可以实现多个接口，但只能继承一个抽象类", "抽象类不能有构造方法", "接口中可以定义实例变量"],
  answer: 1,
  explain: "Java中类单继承、多实现接口。抽象类可有构造方法和实例变量；传统接口只有常量和抽象方法。"
},

// ========== ch8 补充 18 题 (ch8-s-100 ~ ch8-s-117) ==========
{
  id: "ch8-s-100", chapter: "ch8", kind: "similar", exam: "", qnum: null,
  point: "归并排序复杂度", related: "ch8-s-32",
  difficulty: 1, difficultyReason: "识别标准数组归并排序的复杂度，无需跟踪或构造递推。",
  estimatedSeconds: { min: 30, max: 60, basis: "人工估计，未实测" },
  stem: "标准数组归并排序在最坏情况下时间复杂度的紧确阶是（）。",
  options: ["Θ(n)", "Θ(n log n)", "Θ(n²)", "Θ(log n)"],
  answer: 1,
  explain: "归并排序无论最好最坏都是O(n log n)，但需要O(n)额外空间。"
},
{
  id: "ch8-s-101", chapter: "ch8", kind: "similar", exam: "", qnum: null,
  point: "快排最坏复杂度", related: null,
  difficulty: 1, difficultyReason: "识别普通快速排序最坏划分及其已知复杂度，不要求独立推导。",
  estimatedSeconds: { min: 30, max: 60, basis: "人工估计，未实测" },
  stem: "普通快速排序（无堆排序等兜底）在最坏情况下时间复杂度的紧确阶是（）。",
  options: ["Θ(n log n)", "Θ(n²)", "Θ(n)", "Θ(log n)"],
  answer: 1,
  explain: "快排最坏=每次划分极不均匀（已排序且取首元素做枢纽），T(n)=T(n-1)+O(n)→O(n²)。平均O(n log n)。"
},
{
  id: "ch8-s-102", chapter: "ch8", kind: "similar", exam: "", qnum: null,
  point: "大整数乘法", related: null,
  stem: "Karatsuba大整数乘法将两个n位数的乘法递归式为T(n)=3T(n/2)+O(n)，其时间复杂度为（）。",
  options: ["O(n)", "O(n log n)", "O(n^1.585)", "O(n²)"],
  answer: 2,
  explain: "主定理：log_2(3)≈1.585 > 1，属于第一种情况，T(n)=O(n^{log_2 3})≈O(n^{1.585})。"
},
{
  id: "ch8-s-103", chapter: "ch8", kind: "similar", exam: "", qnum: null,
  point: "哈夫曼WPL", related: null,
  stem: "字符集{A,B,C,D}的频率分别为{7,5,2,4}，构建哈夫曼树后其WPL为（）。",
  options: ["18", "32", "35", "36"],
  answer: 2,
  explain: "合并：2+4=6, 5+6=11, 7+11=18。编码长度：A=2位,B=2位,C=3位,D=3位。WPL=7×2+5×2+2×3+4×3=14+10+6+12=42...重算：排序2,4,5,7→合并2+4=6→5,6,7→合并5+6=11→7,11→合并7+11=18。树结构：18→7(1层),11→5(2层),6→2(3层),4(3层)。WPL=7×1+5×2+2×3+4×3=7+10+6+12=35。"
},
{
  id: "ch8-s-104", chapter: "ch8", kind: "similar", exam: "", qnum: null,
  point: "贪心正确性", related: null,
  stem: "Prim算法和Kruskal算法求最小生成树均使用了贪心策略，其正确性保证来自（）。",
  options: ["动态规划最优子结构", "MST的切割性质（安全边定理）", "回溯法的剪枝策略", "分治法的合并步骤"],
  answer: 1,
  explain: "MST贪心正确性基于切割性质：跨越任意切割的最小权边一定属于某棵MST。"
},
{
  id: "ch8-s-105", chapter: "ch8", kind: "similar", exam: "", qnum: null,
  point: "LCS计算", related: null,
  stem: "字符串X=\"ABCB\"和Y=\"BDCB\"的最长公共子序列（LCS）长度为（）。",
  options: ["1", "2", "3", "4"],
  answer: 2,
  explain: "填表可得LCS=\"BCB\"，长度为3。动态规划状态转移：若X[i]=Y[j]则dp[i][j]=dp[i-1][j-1]+1，否则取max(dp[i-1][j], dp[i][j-1])。"
},
{
  id: "ch8-s-106", chapter: "ch8", kind: "similar", exam: "", qnum: null,
  point: "矩阵连乘", related: null,
  stem: "三个矩阵A(10×30)、B(30×5)、C(5×60)连乘，最少需要（）次标量乘法。",
  options: ["4500", "9000", "18000", "27000"],
  answer: 0,
  explain: "(AB)C: AB=10×30×5=1500, (AB)C=10×5×60=3000, 共4500。A(BC): BC=30×5×60=9000, A(BC)=10×30×60=18000, 共27000。最优=4500。"
},
{
  id: "ch8-s-107", chapter: "ch8", kind: "similar", exam: "", qnum: null,
  point: "N皇后回溯", related: "ch8-o-39",
  stem: "用回溯法解4皇后问题，在搜索树中当发现第3行无合法位置时应（）。",
  options: ["终止算法", "回溯到第2行尝试下一个位置", "重新从第1行开始", "随机放置第3行皇后"],
  answer: 1,
  explain: "回溯法=DFS+回退。当前层无解时回到上一层（第2行）尝试下一个选择。"
},
{
  id: "ch8-s-108", chapter: "ch8", kind: "similar", exam: "", qnum: null,
  point: "分支限界vs回溯", related: "ch8-o-39",
  stem: "以下关于分支限界法与回溯法的区别，正确的是（）。",
  options: ["回溯法用BFS，分支限界用DFS", "分支限界法通常用队列（BFS/优先队列），回溯法用栈（DFS）", "两者完全等价", "分支限界法不能求最优解"],
  answer: 1,
  explain: "回溯=DFS（栈），分支限界=BFS或优先队列BFS，用界限函数剪枝，常用于求最优解。"
},
{
  id: "ch8-s-109", chapter: "ch8", kind: "similar", exam: "", qnum: null,
  point: "复杂度比较", related: null,
  stem: "以下时间复杂度从小到大排列正确的是（）。",
  options: ["O(n!) < O(2ⁿ) < O(n²) < O(n log n)", "O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)", "O(n) < O(log n) < O(n²) < O(2ⁿ)", "O(n²) < O(n log n) < O(2ⁿ) < O(n!)"],
  answer: 1,
  explain: "标准增长率排序：O(1)<O(log n)<O(n)<O(n log n)<O(n²)<O(n³)<O(2ⁿ)<O(n!)。"
},
{
  id: "ch8-s-110", chapter: "ch8", kind: "similar", exam: "", qnum: null,
  point: "主定理", related: "ch8-o-32",
  difficulty: 2, difficultyReason: "需计算临界指数并比较非递归项，应用主定理第一种情况。",
  estimatedSeconds: { min: 60, max: 120, basis: "人工估计，未实测" },
  stem: "设n为2的幂，T(1)=1，T(n)=4T(n/2)+n。由主定理可得T(n)的紧确阶为（）。",
  options: ["Θ(n)", "Θ(n log n)", "Θ(n²)", "Θ(n² log n)"],
  answer: 2,
  explain: "a=4,b=2,log_b(a)=2, f(n)=O(n)=O(n^{2-1})→第一种情况，T(n)=Θ(n²)。"
},
{
  id: "ch8-s-111", chapter: "ch8", kind: "similar", exam: "", qnum: null,
  point: "主定理第三种", related: "ch8-o-32",
  difficulty: 2, difficultyReason: "需比较指数并核对正则条件，应用主定理第三种情况。",
  estimatedSeconds: { min: 60, max: 120, basis: "人工估计，未实测" },
  stem: "设n为2的幂，T(1)=1，T(n)=2T(n/2)+n²。由主定理可得T(n)的紧确阶为（）。",
  options: ["Θ(n)", "Θ(n log n)", "Θ(n²)", "Θ(n² log n)"],
  answer: 2,
  explain: "a=2,b=2，临界指数为1，f(n)=n²比n多一个多项式因子；2f(n/2)=n²/2，满足正则条件，故T(n)=Θ(n²)。不能仅从f(n)=O(n²)断言这一紧确阶，因为上界也可能包含更小的实际工作量。"
},
{
  id: "ch8-s-112", chapter: "ch8", kind: "similar", exam: "", qnum: null,
  point: "空间复杂度", related: null,
  stem: "以下排序算法中，空间复杂度为O(1)的是（）。",
  options: ["归并排序", "快速排序", "堆排序", "计数排序"],
  answer: 2,
  explain: "堆排序原地排序O(1)。归并O(n)辅助数组。快排O(log n)栈空间（平均）。计数排序O(k)。"
},
{
  id: "ch8-s-113", chapter: "ch8", kind: "similar", exam: "", qnum: null,
  point: "NP完全", related: null,
  stem: "以下关于NP完全问题的叙述，正确的是（）。",
  options: ["NP完全问题已被证明不存在多项式时间算法", "如果任何一个NP完全问题能在多项式时间内解决，则所有NP问题都能", "NP完全问题一定无法求解", "P类问题不属于NP类"],
  answer: 1,
  explain: "NP完全=NP中最难的一类，所有NP问题可多项式归约到它。若一个NPC有多项式解→P=NP。P⊆NP。"
},
{
  id: "ch8-s-114", chapter: "ch8", kind: "similar", exam: "", qnum: null,
  point: "算法策略映射", related: null,
  stem: "以下问题与最适合的算法策略对应正确的是（）。",
  options: ["0-1背包→贪心", "活动选择→动态规划", "最短路径（Dijkstra）→贪心", "归并排序→回溯"],
  answer: 2,
  explain: "Dijkstra=贪心。0-1背包→DP（分数背包才用贪心）。活动选择→贪心。归并排序→分治。"
},
{
  id: "ch8-s-115", chapter: "ch8", kind: "similar", exam: "", qnum: null,
  point: "分治法特征", related: null,
  stem: "分治法要求问题满足的关键条件不包括（）。",
  options: ["问题可分解为规模更小的同类子问题", "子问题的解可以合并为原问题的解", "子问题之间存在大量重叠", "子问题之间相互独立"],
  answer: 2,
  explain: "子问题重叠是DP的特征。分治要求子问题独立，否则重复计算太多应改用DP。"
},
{
  id: "ch8-s-116", chapter: "ch8", kind: "similar", exam: "", qnum: null,
  point: "复杂度化简", related: null,
  stem: "T(n) = 3n³ + 2n² + 5n + 100，其大O表示为（）。",
  options: ["O(n)", "O(n²)", "O(n³)", "O(n⁴)"],
  answer: 2,
  explain: "大O取最高阶项，忽略系数和低阶项。最高阶为3n³→O(n³)。"
},
{
  id: "ch8-s-117", chapter: "ch8", kind: "similar", exam: "", qnum: null,
  point: "递归空间", related: null,
  stem: "一个递归深度为d的算法，每层使用O(1)额外空间，其空间复杂度为（）。",
  options: ["O(1)", "O(d)", "O(d²)", "O(2^d)"],
  answer: 1,
  explain: "递归调用栈深度为d，每层O(1)→总空间O(d)。如二分查找递归版空间O(log n)。"
}
);
