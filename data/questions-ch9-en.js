window.QUESTIONS = window.QUESTIONS || [];
window.QUESTIONS.push(
{
  id: "ch9-o-21", chapter: "ch9", kind: "original", exam: "2026上半年", qnum: 21,
  point: "隔离级别", related: null,
  stem: "在数据库管理系统中，隔离级别安全性最高的是（）。",
  options: ["SERIALIZABLE", "REPEATABLE READ", "READ COMMITTED", "READ UNCOMMITTED"],
  answer: 0,
  explain: "从低到高：读未提交（脏读）→读已提交（不可重复读）→可重复读（幻读）→串行化。安全性升、并发度降。"
},
{
  id: "ch9-s-21", chapter: "ch9", kind: "similar", exam: "", qnum: null,
  point: "脏读", related: "ch9-o-21",
  stem: "事务A读取了事务B尚未提交的修改，该现象称为（）。在（）隔离级别下仍可能发生。",
  options: ["脏读；READ UNCOMMITTED", "不可重复读；SERIALIZABLE", "幻读；READ COMMITTED", "丢失修改；REPEATABLE READ"],
  answer: 0,
  explain: "脏读只在读未提交时出现。读已提交可消除脏读。"
},
{
  id: "ch9-o-23", chapter: "ch9", kind: "original", exam: "2026上半年", qnum: 23,
  point: "2NF", related: null,
  stem: "【回忆题严谨化】若关系模式R已满足1NF，且每个非主属性完全函数依赖于每一个候选键，仅依据这些条件，在下列范式中能够保证达到的最高级别是（）。",
  options: ["3NF", "2NF", "1NF", "BCNF"],
  answer: 1,
  explain: "2NF要求满足1NF，且非主属性不部分依赖于任何候选键，不能只检查选定的主键。题设保证2NF，也保证1NF，但不能保证3NF或BCNF；并非断言该关系实际最高只能到2NF。回忆版原措辞缺少这些条件，此处已为练习补齐。"
},
{
  id: "ch9-s-23", chapter: "ch9", kind: "similar", exam: "", qnum: null,
  point: "3NF", related: "ch9-o-23",
  stem: "关系模式R已满足1NF。对R中每个非平凡函数依赖X→A（A为单个属性），都有X是超键或A是主属性。仅由此条件，在下列范式中能够保证达到的最高级别是（）。",
  options: ["1NF", "2NF", "3NF", "只能是BCNF"],
  answer: 2,
  explain: "这是3NF的正式判定条件：每个非平凡依赖X→A中，X为超键或A为主属性。BCNF不允许后一种例外，要求决定因素X必须为超键。满足3NF也满足2NF和1NF，但题设不能保证BCNF。"
},
{
  id: "ch9-o-24", chapter: "ch9", kind: "original", exam: "2026上半年", qnum: 24,
  point: "索引", related: null,
  stem: "创建索引的主要目的是（）。",
  options: ["保证数据完整性", "提高查询速度", "简化表结构", "节省存储空间"],
  answer: 1,
  explain: "索引加速查找，额外占空间，更新变慢。完整性靠主键/外键/CHECK等约束。"
},
{
  id: "ch9-s-24", chapter: "ch9", kind: "similar", exam: "", qnum: null,
  point: "完整性约束", related: "ch9-o-24",
  stem: "下列机制中，主要用于保证数据完整性而不是加速查询的是（）。",
  options: ["B+树索引", "主键约束与外键约束", "聚簇索引", "倒排索引"],
  answer: 1,
  explain: "对照第24题：别把索引当成完整性手段。"
},
{
  id: "ch9-o-55", chapter: "ch9", kind: "original", exam: "2026上半年", qnum: 55,
  point: "实体完整性", related: null,
  stem: "实体完整性规则要求关系的主键（）。",
  options: ["不能重复且不能为空", "可以为空不能重复", "既可以为空也可以重复", "可以重复但不能为空"],
  answer: 0,
  explain: "主键唯一且非空。参照完整性：外键空或等于某主键值。"
},
{
  id: "ch9-s-55", chapter: "ch9", kind: "similar", exam: "", qnum: null,
  point: "参照完整性", related: "ch9-o-55",
  stem: "参照完整性规则要求（）。",
  options: ["外键必须与主键同名", "外键值只能为空", "外键为空或等于被参照关系中某一主键值", "外键可以取任意值"],
  answer: 2,
  explain: "外键允许空（除非另有非空约束），非空时必须能找到对应主键。"
},
{
  id: "ch9-s-er", chapter: "ch9", kind: "similar", exam: "", qnum: null,
  point: "m:n转换", related: "ch9-o-55",
  stem: "E-R图中学生与课程为多对多选课关系，转换为关系模式时通常（）。",
  options: ["把课程号放入学生表即可", "把学号放入课程表即可", "新增选课表，包含学号和课程号（常作联合主键）", "只能保留一个实体"],
  answer: 2,
  explain: "m:n必须单独成表。1:n则在n端加1端主键做外键。这是下午试题二的核心。"
},
{
  id: "ch9-s-acid", chapter: "ch9", kind: "similar", exam: "", qnum: null,
  point: "ACID", related: "ch9-o-21",
  stem: "事务的原子性是指（）。",
  options: ["事务一旦提交，对数据库的改变是永久的", "事务要么全做完，要么全不做", "并发事务互不干扰", "数据必须满足完整性约束"],
  answer: 1,
  explain: "A原子、C一致、I隔离、D持久。隔离级别考的是I。"
},

{
  id: "ch10-o-16", chapter: "ch10", kind: "original", exam: "2026上半年", qnum: 16,
  point: "子网掩码", related: null,
  stem: "若C类地址每个子网主机数是30台，则子网掩码是（）。",
  options: ["255.255.255.192", "255.255.255.0", "255.255.255.224", "255.255.255.248"],
  answer: 2,
  explain: "30台主机需要5位主机号（2^5-2=30），C类借3位，/27=255.255.255.224。248是/29仅6台；192是/26为62台。"
},
{
  id: "ch10-s-16", chapter: "ch10", kind: "similar", exam: "", qnum: null,
  point: "主机位数", related: "ch10-o-16",
  stem: "某子网掩码为255.255.255.240，该子网最多可容纳的可用主机数是（）。",
  options: ["14", "16", "30", "32"],
  answer: 0,
  explain: "240=/28，主机位4位，2^4-2=14。对照第16题30台→5位主机。"
},
{
  id: "ch10-o-26", chapter: "ch10", kind: "original", exam: "2026上半年", qnum: 26,
  point: "协议三要素", related: null,
  stem: "网络协议的三要素通常指（）。",
  options: ["语法、语义、时延", "语法、语义、时序", "语义、时序、时延", "语法、时序、时延"],
  answer: 1,
  explain: "语法=格式，语义=含义，时序=顺序与同步。时延是性能指标。"
},
{
  id: "ch10-o-36", chapter: "ch10", kind: "original", exam: "2026上半年", qnum: 36,
  point: "吞吐率", related: null,
  stem: "（）表示在单位时间内通过某个网络（或信道、接口）的数据量。",
  options: ["吞吐率", "利用率", "速率", "带宽"],
  answer: 0,
  explain: "带宽是额定容量；吞吐率是实际单位时间通过量；利用率是占用比例。"
},
{
  id: "ch10-o-46", chapter: "ch10", kind: "original", exam: "2026上半年", qnum: 46,
  point: "IPv6地址类型", related: null,
  stem: "IPv6数据包的目的地址的三种基本类型中不包括（）。",
  options: ["多播", "广播", "单播", "任播"],
  answer: 1,
  explain: "IPv6取消广播，用多播替代。三种：单播、多播、任播。"
},
{
  id: "ch10-s-46", chapter: "ch10", kind: "similar", exam: "", qnum: null,
  point: "IPv6长度", related: "ch10-o-46",
  stem: "IPv6地址长度为（）位。",
  options: ["32", "64", "128", "256"],
  answer: 2,
  explain: "IPv4=32位，IPv6=128位。"
},
{
  id: "ch10-o-70", chapter: "ch10", kind: "original", exam: "2026上半年", qnum: 70,
  point: "码分复用", related: null,
  stem: "在无线多址接入时，每一个用户可以在同样的时间使用同样的频带进行通信的技术称为（）。",
  options: ["频分复用", "时分复用", "码分复用", "波分复用"],
  answer: 2,
  explain: "CDMA同时同频，靠码字区分。FDM分频率，TDM分时隙，WDM是光纤波长。"
},
{
  id: "ch10-o-25", chapter: "ch10", kind: "original", exam: "2026上半年", qnum: 25,
  point: "报文摘要", related: null,
  stem: "以下关于报文摘要的说法错误的是（）。",
  options: ["报文摘要采用MD5算法比SHA-256算法更安全", "报文摘要无法逆向推导出原始报文", "报文摘要的长度由散列函数决定", "报文摘要随信息原文的变化而变化"],
  answer: 0,
  explain: "MD5已被认为不够安全，SHA-256更强。散列单向、定长、雪崩效应。"
},
{
  id: "ch10-o-51", chapter: "ch10", kind: "original", exam: "2026上半年", qnum: 51,
  point: "数字签名用途", related: null,
  stem: "数字签名的应用通常不包括（）。",
  options: ["SSL/TLS证书", "电子合同", "密码存储", "APK签名"],
  answer: 2,
  explain: "存密码用散列（加盐），不是数字签名。签名用于防抵赖和鉴权。"
},
{
  id: "ch10-o-54", chapter: "ch10", kind: "original", exam: "2026上半年", qnum: 54,
  point: "RSA", related: null,
  stem: "基于大数分解的困难性而开发的非对称加密算法是（）。",
  options: ["RSA", "RC4", "MD5", "DES"],
  answer: 0,
  explain: "RSA非对称。DES/RC4对称。MD5散列。ECC靠椭圆曲线离散对数。"
},
{
  id: "ch10-s-54", chapter: "ch10", kind: "similar", exam: "", qnum: null,
  point: "对称加密", related: "ch10-o-54",
  stem: "下列属于对称加密算法的是（）。",
  options: ["RSA", "ECC", "AES", "SHA-256"],
  answer: 2,
  explain: "AES/DES对称。RSA/ECC非对称。SHA是散列。"
},
{
  id: "ch10-o-60", chapter: "ch10", kind: "original", exam: "2026上半年", qnum: 60,
  point: "防火墙", related: null,
  stem: "在企业内部网与外部网之间，（）技术用来检查网络请求分组是否合法，保护网络资源不被非法使用。",
  options: ["入侵检测", "地址转换", "防病毒", "防火墙"],
  answer: 3,
  explain: "防火墙位于内外网边界做访问控制。IDS偏检测告警。NAT是地址转换。"
},
{
  id: "ch10-o-71", chapter: "ch10", kind: "original", exam: "2026上半年", qnum: 71,
  point: "WannaCry", related: null,
  stem: "WannaCry（永恒之蓝）是利用（）协议漏洞进行攻击的恶意代码，用于获取系统最高权限。",
  options: ["SSH", "SMB", "HTTP", "TCP"],
  answer: 1,
  explain: "EternalBlue利用Windows SMB（445端口）。TCP是传输层，不是该漏洞的协议名。"
},
{
  id: "ch10-s-71", chapter: "ch10", kind: "similar", exam: "", qnum: null,
  point: "HTTPS端口", related: "ch10-o-71",
  stem: "HTTPS默认使用的端口是（）。",
  options: ["21", "80", "443", "445"],
  answer: 2,
  explain: "80是HTTP，443是HTTPS，445是SMB（第71题永恒之蓝），21是FTP。"
},

{
  id: "ch11-o-61", chapter: "ch11", kind: "original", exam: "2026上半年", qnum: 61,
  point: "署名权", related: null,
  stem: "软件设计师小李是某IT公司X系统项目核心开发人员，因故在系统初步完成后辞职，职责由张工承担。项目负责人将开发人员中的小李名字替换为张工。该项目负责人的行为（）。",
  options: ["不构成侵权，因为小李不是软件著作权人", "不构成侵权，是正常行使管理者的权利", "构成侵权，侵犯了小李的署名权", "构成侵权，侵犯了小李的专利权"],
  answer: 2,
  explain: "开发者享有署名权。职务作品也不等于可以抹掉个人署名。这与专利权无关。"
},
{
  id: "ch11-s-61", chapter: "ch11", kind: "similar", exam: "", qnum: null,
  point: "职务作品", related: "ch11-o-61",
  stem: "程序员在任职期间、针对本职工作开发的软件，无特别约定时，著作权通常属于（），但开发者仍享有（）。",
  options: ["程序员；发表权", "单位；署名权", "单位；专利权", "客户；复制权"],
  answer: 1,
  explain: "职务软件著作权归单位，开发者保留署名权。对照第61题不能改名换姓。"
},
{
  id: "ch11-o-73", chapter: "ch11", kind: "original", exam: "2026上半年", qnum: 73,
  point: "软件保护条例", related: null,
  stem: "根据《计算机软件保护条例》，以下说法错误的是（）。",
  options: [
    "受保护的软件必须固定在有形物体上，如硬盘、光盘等",
    "委托开发无书面约定时，著作权由受托人享有",
    "符合条件的职务软件，著作权归单位或组织",
    "用户为研究软件思想和原理，以安装、存储、显示等方式使用复制品，可不付酬但必须经著作权人许可"
  ],
  answer: 3,
  explain: "条例允许为学习研究安装/显示/存储，可不经许可、不付报酬。D说\u201c必须经许可\u201d是错的。"
},
{
  id: "ch11-s-73", chapter: "ch11", kind: "similar", exam: "", qnum: null,
  point: "委托开发", related: "ch11-o-73",
  stem: "甲委托乙开发软件，合同未约定著作权归属。该软件著作权属于（）。",
  options: ["甲", "乙", "甲乙共有", "国家"],
  answer: 1,
  explain: "委托无约定归受托人。对照第73题B项。"
},
{
  id: "ch11-s-patent", chapter: "ch11", kind: "similar", exam: "", qnum: null,
  point: "著作权与专利", related: "ch11-o-61",
  stem: "源程序代码主要受（）保护；单纯的智力活动规则一般（）取得专利权。",
  options: ["专利权；可以", "软件著作权；不能", "商标权；必须", "商业秘密；自动"],
  answer: 1,
  explain: "源程序/文档走著作权。可专利的是解决技术问题的技术方案（常需与工业过程/硬件结合），不是纯算法或规范。2026第43题选项含糊，记这张对照表更稳。"
},
{
  id: "ch11-s-term", chapter: "ch11", kind: "similar", exam: "", qnum: null,
  point: "保护期", related: "ch11-o-73",
  stem: "自然人的软件著作权，保护期为（）。",
  options: ["发表后10年", "终生及其死亡后50年", "登记后20年", "永久"],
  answer: 1,
  explain: "自然人：终生+死后50年。法人或其他组织：发表后50年。发明专利20年。"
},

{
  id: "ch12-s-dfd1", chapter: "ch12", kind: "similar", exam: "", qnum: null,
  point: "下午DFD实体", related: "ch6-o-67",
  stem: "下午数据流图题中，下列最适合作为外部实体的是（）。",
  options: ["\u201c校验订单\u201d加工", "\u201c订单文件\u201d数据存储", "\u201c客户\u201d和\u201c支付网关\u201d", "系统内部的\u201c推荐模块\u201d"],
  answer: 2,
  explain: "实体在系统之外：人、外部机构、外部系统。加工和存储不是实体。2026下午试题一仍考E1–E4命名。"
},
{
  id: "ch12-s-dfd2", chapter: "ch12", kind: "similar", exam: "", qnum: null,
  point: "缺数据流", related: "ch6-o-67",
  stem: "0层图中加工\u201c缺陷识别\u201d需要\u201c系统参数\u201d，而参数由质量管理员通过\u201c后台管理\u201d写入数据存储。若图中缺少该输入，补流时正确描述是（）。",
  options: ["数据流：系统参数；起点：质量管理员；终点：缺陷识别", "数据流：系统参数；起点：系统参数存储；终点：缺陷识别", "数据流：系统参数；起点：缺陷识别；终点：后台管理", "不必补充，加工可凭空产生参数"],
  answer: 1,
  explain: "参数已入库则从存储读到加工。只有尚未入库、直接来自外部时才从实体出发。答题格式必须含名称+起点+终点。"
},
{
  id: "ch12-s-er1", chapter: "ch12", kind: "similar", exam: "", qnum: null,
  point: "1:n外键", related: "ch9-s-er",
  stem: "一栋公寓楼由一名经理管理，一名经理可管理多栋楼。关系模式\u201c公寓楼\u201d中应包含（）。",
  options: ["经理的全部属性并作为联合主键", "经理编号作为外键", "不能出现经理信息", "把楼地址放到经理表即可，不必建楼表"],
  answer: 1,
  explain: "1:n在n端（楼）放入1端主键（经理编号）做外键。"
},
{
  id: "ch12-s-uml1", chapter: "ch12", kind: "similar", exam: "", qnum: null,
  point: "用例include", related: "ch7-o-68",
  stem: "用例\u201c结账\u201d每次都必须调用\u201c验证登录\u201d，二者关系是（）。",
  options: ["extend（扩展）", "include（包含）", "泛化", "组合"],
  answer: 1,
  explain: "include是必做；extend是可选、有条件。下午用例图高频。"
},
{
  id: "ch12-s-uml2", chapter: "ch12", kind: "similar", exam: "", qnum: null,
  point: "状态机", related: "ch7-o-68",
  stem: "UML状态机图中，迁移标签\u201ce1[x>0]/x=x+1\u201d的含义是（）。",
  options: ["事件e1发生后无条件把x加1", "仅当x>0时，事件e1才能触发迁移并执行x=x+1", "x>0是终态名称", "e1是状态名"],
  answer: 1,
  explain: "格式：事件[卫士]/动作。2026第74–75题考事件序列后的x与状态，原图未公开，先掌握标签读法。"
},
{
  id: "ch12-s-code", chapter: "ch12", kind: "similar", exam: "", qnum: null,
  point: "下午选做模式", related: "ch7-o-11",
  stem: "下午C++/Java选做题中，需要把第三方SDK的方法名适配到系统统一接口且不改SDK源码。代码骨架最可能是（）。",
  options: ["单例 getInstance", "适配器类实现统一接口并持有SDK对象", "观察者 notify 循环", "策略上下文替换算法"],
  answer: 1,
  explain: "与2026上午第11题灯具适配同一模式，下午常要求填类名和委托调用。"
},
{
  id: "ch12-s-greedy", chapter: "ch12", kind: "similar", exam: "", qnum: null,
  point: "活动选择边界", related: "ch8-s-39",
  stem: "活动选择中活动区间为半开区间[s,f)。已选活动结束于时刻10，下一活动开始于10。若代码写成 if (s[i] > f[last]) 则（）。",
  options: ["仍正确，因为端点重叠不算兼容", "会漏选本可兼容的活动", "时间复杂度变差", "变成动态规划"],
  answer: 1,
  explain: "半开区间在端点相接时不重叠，应使用 >=。2026下午贪心填空最容易错循环边界。"
},

{
  id: "en-o-3", chapter: "en", kind: "original", exam: "2026上半年", qnum: 3,
  point: "LLM英语", related: null,
  stem: "The emergence of Large Language Models (LLMs) has fundamentally shifted modern software design toward a highly（） and interactive process.",
  options: ["competitive", "collaborative", "manual", "destructive"],
  answer: 1,
  explain: "文意：LLM使设计变成高度协作、交互的过程。collaborative。"
},
{
  id: "en-o-4", chapter: "en", kind: "original", exam: "2026上半年", qnum: 4,
  point: "LLM英语", related: "en-o-3",
  stem: "By interpreting complex business requirements, these models can instantly generate（） code for various UML diagrams, such as Mermaid or PlantUML.",
  options: ["invisible", "encrypted", "physical", "executable"],
  answer: 3,
  explain: "生成可用于UML的代码。选项中executable最贴切。"
},
{
  id: "en-o-5", chapter: "en", kind: "original", exam: "2026上半年", qnum: 5,
  point: "LLM英语", related: "en-o-3",
  stem: "LLMs help technical leaders select the most suitable（） patterns, such as Microservices or Event-Driven systems.",
  options: ["service", "architectural", "idiom", "design"],
  answer: 1,
  explain: "Microservices、Event-Driven是架构模式 → architectural patterns。design patterns通常指GoF那类。"
},
{
  id: "en-o-6", chapter: "en", kind: "original", exam: "2026上半年", qnum: 6,
  point: "LLM英语", related: "en-o-3",
  stem: "These AI tools significantly enhance the（） between high-level design documents and actual code implementation.",
  options: ["distance", "resistance", "consistency", "conflict"],
  answer: 2,
  explain: "增强设计文档与代码之间的一致性 → consistency。"
},
{
  id: "en-o-7", chapter: "en", kind: "original", exam: "2026上半年", qnum: 7,
  point: "LLM英语", related: "en-o-3",
  stem: "Professional architects must verify AI-generated outputs to prevent technical（） — plausible but incorrect suggestions.",
  options: ["calculation", "meditation", "acceleration", "hallucination"],
  answer: 3,
  explain: "plausible but incorrect = 幻觉 hallucination，近年AI英语高频词。"
},
{
  id: "en-s-1", chapter: "en", kind: "similar", exam: "", qnum: null,
  point: "术语inheritance", related: "en-o-3",
  stem: "In object-oriented programming,（） allows a new class to reuse the attributes and methods of an existing class.",
  options: ["encapsulation", "inheritance", "polymorphism", "aggregation"],
  answer: 1,
  explain: "继承inheritance。封装encapsulation，多态polymorphism，聚合aggregation。对照第31题继承。"
},
{
  id: "en-s-2", chapter: "en", kind: "similar", exam: "", qnum: null,
  point: "术语throughput", related: "en-o-3",
  stem: "Network（） refers to the actual amount of data successfully transmitted over a link in a given time.",
  options: ["bandwidth", "latency", "throughput", "jitter"],
  answer: 2,
  explain: "throughput吞吐率。bandwidth带宽，latency时延。对照第36题。"
},
{
  id: "en-s-3", chapter: "en", kind: "similar", exam: "", qnum: null,
  point: "术语deadlock", related: "en-o-3",
  stem: "A（） occurs when processes wait indefinitely for resources held by each other.",
  options: ["pipeline", "deadlock", "interrupt", "semaphore"],
  answer: 1,
  explain: "deadlock死锁。semaphore信号量是同步工具。"
},
{
  id: "en-s-4", chapter: "en", kind: "similar", exam: "", qnum: null,
  point: "术语normalization", related: "en-o-3",
  stem: "Database（） is the process of organizing relations to reduce redundancy and improve integrity.",
  options: ["normalization", "fragmentation", "replication", "serialization"],
  answer: 0,
  explain: "normalization范式化。serialization也可指隔离级别串行化，但这里明确是组织关系、降冗余。"
},
{
  id: "en-s-5", chapter: "en", kind: "similar", exam: "", qnum: null,
  point: "术语abstraction", related: "en-o-3",
  stem: "（） is the practice of exposing only essential features while hiding implementation details.",
  options: ["Overloading", "Abstraction", "Compilation", "Paging"],
  answer: 1,
  explain: "abstraction抽象。与第49题封装相近但层次不同：封装偏实现隐藏，抽象偏建模取舍。"
},

// ========== ch9 补充题 (ch9-s-100 ~ ch9-s-111) ==========
{
  id: "ch9-s-100", chapter: "ch9", kind: "similar", exam: "", qnum: null,
  point: "GROUP BY/HAVING", related: null,
  stem: "有表 Orders(oid, cid, amount)，执行：SELECT cid, SUM(amount) FROM Orders GROUP BY cid HAVING SUM(amount)>1000; 该语句的作用是（）。",
  options: ["查询每个客户的订单总额，只显示总额超过1000的", "查询单笔超过1000的订单", "查询所有客户的订单总额", "删除总额不超过1000的客户记录"],
  answer: 0,
  explain: "GROUP BY按cid分组，SUM求总额，HAVING过滤分组（不是WHERE过滤行）。"
},
{
  id: "ch9-s-101", chapter: "ch9", kind: "similar", exam: "", qnum: null,
  point: "子查询", related: null,
  stem: "表Emp(eno, ename, sal, dno)，查询工资高于所在部门平均工资的员工，正确的SQL是（）。",
  options: [
    "SELECT * FROM Emp e WHERE sal > (SELECT AVG(sal) FROM Emp WHERE dno = e.dno)",
    "SELECT * FROM Emp WHERE sal > AVG(sal)",
    "SELECT * FROM Emp GROUP BY dno HAVING sal > AVG(sal)",
    "SELECT * FROM Emp e WHERE sal > (SELECT MAX(sal) FROM Emp)"
  ],
  answer: 0,
  explain: "需要相关子查询，将外层e.dno传入内层做条件。B中WHERE不能直接用聚集函数。"
},
{
  id: "ch9-s-102", chapter: "ch9", kind: "similar", exam: "", qnum: null,
  point: "多表连接", related: null,
  stem: "Student(sno,sname)、SC(sno,cno,grade)，查询选修了课程号为'C01'且成绩≥90的学生姓名，正确的是（）。",
  options: [
    "SELECT sname FROM Student WHERE sno IN (SELECT sno FROM SC WHERE cno='C01' AND grade>=90)",
    "SELECT sname FROM Student, SC WHERE cno='C01' OR grade>=90",
    "SELECT sname FROM Student NATURAL JOIN SC WHERE grade>=90",
    "SELECT sname FROM SC WHERE cno='C01' AND grade>=90"
  ],
  answer: 0,
  explain: "A用子查询正确。B用OR条件错误。C缺少cno条件。D未连Student无法获取sname。"
},
{
  id: "ch9-s-103", chapter: "ch9", kind: "similar", exam: "", qnum: null,
  point: "关系代数-选择投影", related: null,
  stem: "关系R(A,B,C)有元组{(1,2,3),(4,5,6),(1,5,7)}，π_A(σ_{B>3}(R))的结果是（）。",
  options: ["{(4),(1)}", "{(1,2,3)}", "{(4,5,6),(1,5,7)}", "{(1)}"],
  answer: 0,
  explain: "σ_{B>3}选出B>3的行→{(4,5,6),(1,5,7)}，再π_A投影A列→{4,1}。注意集合去重。"
},
{
  id: "ch9-s-104", chapter: "ch9", kind: "similar", exam: "", qnum: null,
  point: "关系代数-自然连接", related: null,
  stem: "R(A,B)={(1,2),(3,4)}，S(B,C)={(2,5),(4,6),(7,8)}，R⋈S（自然连接）的结果元组数为（）。",
  options: ["2", "3", "6", "1"],
  answer: 0,
  explain: "自然连接按同名属性B等值连接：B=2和B=4各匹配一条，共2条。B=7在R中无匹配。"
},
{
  id: "ch9-s-105", chapter: "ch9", kind: "similar", exam: "", qnum: null,
  point: "候选键求解", related: null,
  stem: "R(A,B,C,D)，函数依赖集F={A→B, B→C, A→D}，R的候选键是（）。",
  options: ["A", "AB", "AC", "ABCD"],
  answer: 0,
  explain: "A的闭包：A→B→C，A→D，即A⁺={A,B,C,D}=U，所以A是候选键。"
},
{
  id: "ch9-s-106", chapter: "ch9", kind: "similar", exam: "", qnum: null,
  point: "范式判定", related: null,
  stem: "R(A,B,C)，F={AB→C, C→A}，候选键为AB和BC。该关系最高满足（）。",
  options: ["1NF", "2NF", "3NF", "BCNF"],
  answer: 2,
  explain: "C→A中C不是超键，但A是主属性，所以不违反3NF（3NF允许决定因素推出主属性），但违反BCNF。"
},
{
  id: "ch9-s-107", chapter: "ch9", kind: "similar", exam: "", qnum: null,
  point: "无损分解", related: null,
  stem: "R(A,B,C)分解为R1(A,B)和R2(B,C)，F={B→C}。判断是否无损连接分解，用表格法或公式：R1∩R2=B，B→C即B→R2-R1，因此该分解（）。",
  options: ["是无损连接分解", "是有损分解", "无法判定", "需要知道数据才能判定"],
  answer: 0,
  explain: "二分解无损充要条件：交集能函数决定某个差集。B→C=R2-R1成立，故无损。"
},
{
  id: "ch9-s-108", chapter: "ch9", kind: "similar", exam: "", qnum: null,
  point: "两阶段锁", related: null,
  stem: "两阶段锁协议（2PL）要求事务分为（）两个阶段。",
  options: ["加锁阶段和解锁阶段，加锁阶段不能解锁", "读阶段和写阶段", "提交阶段和回滚阶段", "加锁和解锁可以任意交叉"],
  answer: 0,
  explain: "2PL：先是增长阶段（只加锁），再是缩减阶段（只解锁）。可保证可串行化但不能防止死锁。"
},
{
  id: "ch9-s-109", chapter: "ch9", kind: "similar", exam: "", qnum: null,
  point: "数据库恢复", related: null,
  stem: "系统故障恢复时，对已提交但未写入磁盘的事务执行（），对未提交的事务执行（）。",
  options: ["REDO；UNDO", "UNDO；REDO", "都REDO", "都UNDO"],
  answer: 0,
  explain: "已提交需重做(REDO)保证持久性，未提交需撤销(UNDO)保证原子性。检查点之前已提交的不需要REDO。"
},
{
  id: "ch9-s-110", chapter: "ch9", kind: "similar", exam: "", qnum: null,
  point: "视图", related: null,
  stem: "关于视图，以下说法正确的是（）。",
  options: [
    "视图在磁盘上独立存储数据",
    "对视图的查询最终转换为对基本表的查询",
    "所有视图都可以执行INSERT操作",
    "删除视图会导致基本表数据被删除"
  ],
  answer: 1,
  explain: "视图是虚表，不存储数据。含聚集函数/DISTINCT/GROUP BY等的视图不可更新。删除视图不影响基表。"
},
{
  id: "ch9-s-111", chapter: "ch9", kind: "similar", exam: "", qnum: null,
  point: "E-R转换1:1", related: null,
  stem: "E-R图中部门与经理是1:1管理关系。转换为关系模式时，最佳做法是（）。",
  options: [
    "单独建一张管理关系表",
    "在任一方加入另一方主键作为外键",
    "必须在两个表中都加对方的主键",
    "1:1关系不需要做任何处理"
  ],
  answer: 1,
  explain: "1:1联系可合并到任一实体表中，加对方主键做外键即可，不必单独建表。"
},

// ========== ch10 补充题 (ch10-s-100 ~ ch10-s-107) ==========
{
  id: "ch10-s-100", chapter: "ch10", kind: "similar", exam: "", qnum: null,
  point: "OSI七层", related: null,
  stem: "OSI参考模型中，负责数据加密与压缩的是（）。",
  options: ["会话层", "表示层", "应用层", "传输层"],
  answer: 1,
  explain: "表示层负责数据格式转换、加密解密、压缩解压。会话层管理会话建立/拆除。"
},
{
  id: "ch10-s-101", chapter: "ch10", kind: "similar", exam: "", qnum: null,
  point: "TCP三次握手", related: null,
  stem: "TCP建立连接的三次握手中，第二次握手报文的标志位是（）。",
  options: ["SYN", "SYN+ACK", "ACK", "FIN+ACK"],
  answer: 1,
  explain: "第一次SYN，第二次SYN+ACK，第三次ACK。四次挥手用FIN。"
},
{
  id: "ch10-s-102", chapter: "ch10", kind: "similar", exam: "", qnum: null,
  point: "协议端口号", related: null,
  stem: "以下协议与默认端口号对应正确的是（）。",
  options: ["FTP数据传输-20, FTP控制-21", "HTTP-8080, HTTPS-8443", "SMTP-110, POP3-25", "DNS-80, HTTP-53"],
  answer: 0,
  explain: "FTP数据20/控制21，HTTP-80，HTTPS-443，SMTP-25，POP3-110，DNS-53。"
},
{
  id: "ch10-s-103", chapter: "ch10", kind: "similar", exam: "", qnum: null,
  point: "VLAN", related: null,
  stem: "VLAN的主要作用是（）。",
  options: ["增加物理端口数量", "隔离广播域，提高安全性和性能", "替代路由器实现三层转发", "加密局域网数据"],
  answer: 1,
  explain: "VLAN在交换机上逻辑划分广播域，不同VLAN间通信仍需路由。"
},
{
  id: "ch10-s-104", chapter: "ch10", kind: "similar", exam: "", qnum: null,
  point: "路由协议RIP/OSPF", related: null,
  stem: "RIP使用（）算法，最大跳数为（）；OSPF使用（）算法。",
  options: ["距离向量；15；链路状态", "链路状态；15；距离向量", "距离向量；255；链路状态", "链路状态；无限制；距离向量"],
  answer: 0,
  explain: "RIP距离向量，最大15跳（16不可达）。OSPF链路状态，用Dijkstra算法，无跳数限制。"
},
{
  id: "ch10-s-105", chapter: "ch10", kind: "similar", exam: "", qnum: null,
  point: "数字证书/CA/PKI", related: null,
  stem: "数字证书中包含的核心信息不包括（）。",
  options: ["证书持有者的公钥", "CA的数字签名", "证书持有者的私钥", "证书有效期"],
  answer: 2,
  explain: "数字证书包含公钥、持有者信息、CA签名、有效期等。私钥由持有者秘密保管，绝不会放在证书中。"
},
{
  id: "ch10-s-106", chapter: "ch10", kind: "similar", exam: "", qnum: null,
  point: "网络攻击类型", related: null,
  stem: "攻击者在Web表单中输入恶意SQL语句，使后端数据库执行非预期操作，这种攻击称为（）。",
  options: ["XSS跨站脚本攻击", "SQL注入攻击", "DDoS分布式拒绝服务攻击", "中间人攻击"],
  answer: 1,
  explain: "SQL注入利用输入拼接SQL。XSS注入恶意脚本到页面。DDoS用大量流量瘫痪服务。中间人窃听/篡改通信。"
},
{
  id: "ch10-s-107", chapter: "ch10", kind: "similar", exam: "", qnum: null,
  point: "VPN", related: null,
  stem: "VPN（虚拟专用网络）的核心原理是（）。",
  options: ["在公共网络上建立专用物理线路", "通过隧道协议和加密技术在公网上模拟专用网络", "使用专用频段进行无线通信", "将所有流量转发到代理服务器"],
  answer: 1,
  explain: "VPN通过隧道协议（如IPSec、SSL）在公共网络上建立加密通道，实现安全的私有通信。"
},

// ========== ch11 补充题 (ch11-s-100 ~ ch11-s-113) ==========
{
  id: "ch11-s-100", chapter: "ch11", kind: "similar", exam: "", qnum: null,
  point: "发明专利年限", related: null,
  stem: "我国发明专利的保护期限为自申请日起（），实用新型和外观设计专利分别为（）。",
  options: ["20年；10年和15年", "15年；10年和10年", "20年；15年和20年", "10年；5年和10年"],
  answer: 0,
  explain: "2021年6月起：发明20年、实用新型10年、外观设计15年（原10年延长至15年），均从申请日算。"
},
{
  id: "ch11-s-101", chapter: "ch11", kind: "similar", exam: "", qnum: null,
  point: "专利申请流程", related: null,
  stem: "发明专利申请需经过的审查程序是（）。",
  options: ["初步审查→实质审查→授权", "仅初步审查即可授权", "实质审查→初步审查→授权", "无需审查，申请即授权"],
  answer: 0,
  explain: "发明专利需初审+实审（约3年）。实用新型和外观设计只需初审。"
},
{
  id: "ch11-s-102", chapter: "ch11", kind: "similar", exam: "", qnum: null,
  point: "商标权", related: null,
  stem: "注册商标的有效期为（），期满可以续展，每次续展注册的有效期为（）。",
  options: ["10年；10年", "20年；10年", "10年；5年", "永久；无需续展"],
  answer: 0,
  explain: "注册商标有效期10年，自核准注册日起算。期满前12个月可申请续展，每次10年，次数不限。"
},
{
  id: "ch11-s-103", chapter: "ch11", kind: "similar", exam: "", qnum: null,
  point: "驰名商标", related: null,
  stem: "关于驰名商标，以下说法正确的是（）。",
  options: [
    "驰名商标可以用于商品包装上作为宣传",
    "驰名商标的认定采用\u201c个案认定、被动保护\u201d原则",
    "驰名商标一经认定即永久有效",
    "驰名商标只保护相同类别的商品"
  ],
  answer: 1,
  explain: "驰名商标按需认定、个案保护，不得用于广告宣传。已注册的驰名商标可跨类保护。"
},
{
  id: "ch11-s-104", chapter: "ch11", kind: "similar", exam: "", qnum: null,
  point: "软件著作权登记", related: null,
  stem: "关于软件著作权，以下说法正确的是（）。",
  options: [
    "软件必须登记才能获得著作权保护",
    "软件著作权自开发完成之日起自动产生，登记不是保护的前提条件",
    "软件著作权登记后保护期才开始计算",
    "未登记的软件不能作为诉讼证据"
  ],
  answer: 1,
  explain: "著作权自动产生（自愿登记原则）。登记有利于举证和交易，但不是获得保护的前提。"
},
{
  id: "ch11-s-105", chapter: "ch11", kind: "similar", exam: "", qnum: null,
  point: "GPL协议", related: null,
  stem: "使用GPL开源协议的代码，如果被修改并分发，则修改后的代码（）。",
  options: [
    "可以使用任何协议发布",
    "必须同样以GPL协议开源（传染性）",
    "只需保留原作者署名，无需开源",
    "自动进入公共领域"
  ],
  answer: 1,
  explain: "GPL具有\"传染性\"（Copyleft），衍生作品必须以GPL发布并开源。MIT/BSD/Apache则宽松得多。"
},
{
  id: "ch11-s-106", chapter: "ch11", kind: "similar", exam: "", qnum: null,
  point: "开源协议辨析", related: null,
  stem: "以下开源协议中，最宽松（允许闭源使用）且只要求保留版权声明的是（）。",
  options: ["GPL v3", "LGPL", "MIT", "AGPL"],
  answer: 2,
  explain: "MIT仅要求保留版权声明，可闭源商用。BSD类似。Apache还要求声明变更。GPL/LGPL/AGPL均有Copyleft约束。"
},
{
  id: "ch11-s-107", chapter: "ch11", kind: "similar", exam: "", qnum: null,
  point: "强制性标准", related: null,
  stem: "某产品适用的强制性国家标准规定了安全底线，而企业自定标准低于该强制性要求。对此，正确的是（）。",
  options: ["只需执行企业标准", "企业可用任意推荐性标准替代该底线", "必须满足适用的强制性国家标准，企业标准不得降低该要求", "只要客户同意即可不执行强制性标准"],
  answer: 2,
  explain: "适用的强制性标准必须执行，企业标准不能降低其要求。我国标准还包括团体标准；不能把国家、行业、地方、团体、企业标准不加区分地按名称排出适用于所有情形的优先顺序。推荐性标准的适用还需结合采用情况、合同约定及相关法规。"
},
{
  id: "ch11-s-108", chapter: "ch11", kind: "similar", exam: "", qnum: null,
  point: "标准代号", related: null,
  stem: "以下标准代号与含义对应正确的是（）。",
  options: ["GB-推荐性国标, GB/T-强制性国标", "GB-强制性国标, GB/T-推荐性国标", "GB-国际标准, ISO-国家标准", "GB/T-行业标准, YD-地方标准"],
  answer: 1,
  explain: "GB为强制性国标，GB/T为推荐性国标（T=推荐）。ISO为国际标准，YD为通信行业标准。"
},
{
  id: "ch11-s-109", chapter: "ch11", kind: "similar", exam: "", qnum: null,
  point: "合同验收", related: null,
  stem: "甲公司委托乙公司开发管理系统。双方有效合同明确约定：乙按约完整交付阶段成果及验收材料后，甲应在30天内验收并书面提出异议，逾期未提出则视为该阶段验收通过。乙已履行交付义务，甲在收到全部材料后超过30天仍未提出异议，且不存在影响该条款效力或适用的其他情形。依据该约定，该阶段（）。",
  options: [
    "视为验收不通过，乙公司需重新开发",
    "视为验收通过",
    "合同自动解除",
    "甲公司可以在任意时间提出异议"
  ],
  answer: 1,
  explain: "本题的默示验收结论来自明确有效的合同条款及已满足的触发条件。不能仅凭任何开发合同中逾期30天未异议，就一概认定验收通过；本结论也不等于自动排除其他依法或依约保留的质量责任。"
},
{
  id: "ch11-s-110", chapter: "ch11", kind: "similar", exam: "", qnum: null,
  point: "知识产权归属", related: null,
  stem: "甲公司与乙公司合作开发软件，合同未约定著作权归属。该软件著作权属于（）。",
  options: ["甲公司", "乙公司", "甲乙共同享有", "国家"],
  answer: 2,
  explain: "合作开发无约定则共同享有。注意区分：委托开发无约定归受托方，合作开发无约定归双方共有。"
},
{
  id: "ch11-s-111", chapter: "ch11", kind: "similar", exam: "", qnum: null,
  point: "商业秘密", related: null,
  stem: "商业秘密的构成要件包括秘密性、价值性和（）。",
  options: ["新颖性", "创造性", "保密性（采取了合理保密措施）", "公开性"],
  answer: 2,
  explain: "商业秘密三要件：不为公众所知（秘密性）、具有商业价值（价值性）、权利人采取了保密措施（保密性）。"
},
{
  id: "ch11-s-112", chapter: "ch11", kind: "similar", exam: "", qnum: null,
  point: "不正当竞争", related: null,
  stem: "某公司的客户名单和报价策略不为公众所知悉、具有商业价值，公司已采取合理保密措施。员工负有保密义务，却在离职后未经许可将这些信息披露给新公司并使用。该行为属于（）。",
  options: ["正常的市场竞争", "侵犯商业秘密的不正当竞争行为", "侵犯著作权", "侵犯专利权"],
  answer: 1,
  explain: "题设信息满足非公开性、商业价值和合理保密措施等商业秘密要件，员工违反保密义务披露、使用，构成侵犯商业秘密。客户名单、报价策略并非仅凭名称就天然属于商业秘密。"
},
{
  id: "ch11-s-113", chapter: "ch11", kind: "similar", exam: "", qnum: null,
  point: "商标使用许可", related: null,
  stem: "商标使用许可中，被许可人可以排除商标注册人自己使用该商标的许可类型是（）。",
  options: ["普通许可", "排他许可", "独占许可", "交叉许可"],
  answer: 2,
  explain: "独占许可：仅被许可人可用，连商标权人自己也不能用。排他许可：商标权人和被许可人可用，不能再许可他人。普通许可：均可用。"
},

// ========== ch12 补充题 (ch12-s-100 ~ ch12-s-112) ==========
{
  id: "ch12-s-100", chapter: "ch12", kind: "similar", exam: "", qnum: null,
  point: "DFD父子平衡", related: null,
  stem: "将0层DFD的加工P1细化为子图时，子图的外部输入/输出数据流必须与（）保持一致。",
  options: ["其他加工的数据流", "P1在0层图中的输入/输出数据流", "所有外部实体", "数据字典的全部条目"],
  answer: 1,
  explain: "父子图平衡原则：子图的输入输出必须与父图中该加工的输入输出一致。"
},
{
  id: "ch12-s-101", chapter: "ch12", kind: "similar", exam: "", qnum: null,
  point: "DFD+ER混合", related: null,
  stem: "某系统中DFD的数据存储\"商品信息\"对应E-R图中的（）。",
  options: ["外部实体", "加工/处理", "实体（Entity）", "联系（Relationship）"],
  answer: 2,
  explain: "数据存储通常映射为E-R图中的实体。外部实体是DFD概念，不同于E-R实体。"
},
{
  id: "ch12-s-102", chapter: "ch12", kind: "similar", exam: "", qnum: null,
  point: "类图→代码", related: null,
  stem: "类图中A到B的关系标注为\"◇——1..*\"（空心菱形在A端），对应到Java代码中，类A应包含（）。",
  options: [
    "B类型的成员变量（可为List）",
    "继承B类（extends B）",
    "实现B接口（implements B）",
    "不需要任何与B相关的代码"
  ],
  answer: 0,
  explain: "空心菱形为聚合，菱形端(A)是整体，拥有B的引用。1..*表示A持有一个或多个B，用List<B>。"
},
{
  id: "ch12-s-103", chapter: "ch12", kind: "similar", exam: "", qnum: null,
  point: "序列图消息类型", related: null,
  stem: "UML序列图中，被调用对象完成一次同步调用后，用虚线开放箭头向已存在的调用者生命线传回调用结果。该消息类型是（）。",
  options: ["同步消息", "异步消息", "返回消息", "创建消息"],
  answer: 2,
  explain: "题设明确是完成调用后向调用者传回结果，因此是返回消息。同步调用通常用实线实心箭头，异步消息用实线开放箭头；创建消息也可能采用虚线开放箭头指向新对象生命线头部，不能仅凭虚线就判定返回消息。"
},
{
  id: "ch12-s-104", chapter: "ch12", kind: "similar", exam: "", qnum: null,
  point: "活动图泳道", related: null,
  stem: "UML活动图中，泳道（Swimlane）的主要作用是（）。",
  options: ["表示活动的执行顺序", "标识活动的负责角色或组织单元", "定义活动的输入输出", "表示并发活动的同步"],
  answer: 1,
  explain: "泳道将活动按执行者分区，清晰展示职责分工。同步用同步条（粗线）。"
},
{
  id: "ch12-s-105", chapter: "ch12", kind: "similar", exam: "", qnum: null,
  point: "活动图分支合并", related: null,
  stem: "活动图中，菱形符号表示（），粗横线（同步条）表示（）。",
  options: ["分支/合并（判断条件）；分叉/汇合（并发）", "并发活动；条件判断", "开始节点；结束节点", "数据存储；信号发送"],
  answer: 0,
  explain: "菱形=决策/合并节点（二选一），粗横线=Fork/Join（并发分叉与汇合）。"
},
{
  id: "ch12-s-106", chapter: "ch12", kind: "similar", exam: "", qnum: null,
  point: "状态图事件/卫士/动作", related: null,
  stem: "状态图中转移\"click[count<3]/count++\"，如果当前count=3，点击click事件时（）。",
  options: ["转移发生，count变为4", "转移不发生，因为卫士条件count<3不满足", "直接进入终态", "抛出异常"],
  answer: 1,
  explain: "卫士条件[count<3]不满足时，即使事件发生也不触发转移。"
},
{
  id: "ch12-s-107", chapter: "ch12", kind: "similar", exam: "", qnum: null,
  point: "观察者模式", related: null,
  stem: "某系统要求：当商品价格变动时，自动通知所有关注该商品的用户。最适合的设计模式是（）。",
  options: ["策略模式", "观察者模式", "单例模式", "装饰器模式"],
  answer: 1,
  explain: "一对多依赖，主题状态变化自动通知所有观察者。下午代码常考attach/detach/notify。"
},
{
  id: "ch12-s-108", chapter: "ch12", kind: "similar", exam: "", qnum: null,
  point: "工厂方法模式", related: null,
  stem: "以下Java代码骨架体现的设计模式是（）。\ninterface Product { void use(); }\ninterface Factory { Product create(); }\nclass ConcreteFactory implements Factory {\n  public Product create() { return new ConcreteProduct(); }\n}",
  options: ["抽象工厂", "工厂方法", "建造者", "原型"],
  answer: 1,
  explain: "工厂方法：定义创建对象的接口，让子类决定实例化哪个类。抽象工厂创建一族产品。"
},
{
  id: "ch12-s-109", chapter: "ch12", kind: "similar", exam: "", qnum: null,
  point: "策略模式代码", related: null,
  stem: "下列代码中空白处应填入（）。\ninterface SortStrategy { void sort(int[] arr); }\nclass Context {\n  private SortStrategy strategy;\n  public Context(SortStrategy s) { this.strategy = s; }\n  public void doSort(int[] arr) { ____; }\n}",
  options: ["arr.sort()", "strategy.sort(arr)", "this.sort(arr)", "new SortStrategy().sort(arr)"],
  answer: 1,
  explain: "策略模式：Context持有策略对象引用，委托给策略执行。这是下午代码填空的经典形式。"
},
{
  id: "ch12-s-110", chapter: "ch12", kind: "similar", exam: "", qnum: null,
  point: "等价类划分", related: null,
  stem: "某输入要求年龄在18-60之间的整数，用等价类划分法设计测试用例，有效等价类为（），无效等价类为（）。",
  options: ["[18,60]；<18和>60", "18和60；其他所有", "[0,100]；负数", "[1,99]；0和100"],
  answer: 0,
  explain: "有效等价类[18,60]取如25。无效等价类<18如10和>60如70。边界值取17,18,60,61。"
},
{
  id: "ch12-s-111", chapter: "ch12", kind: "similar", exam: "", qnum: null,
  point: "白盒测试覆盖", related: null,
  stem: "在白盒测试中，要求每个判断的真假分支至少执行一次的覆盖标准是（）。",
  options: ["语句覆盖", "判定覆盖（分支覆盖）", "条件覆盖", "路径覆盖"],
  answer: 1,
  explain: "语句覆盖：每条语句至少执行一次。判定覆盖：每个判断的真假各走一次。条件覆盖：每个条件取真取假。路径覆盖最强。"
},
{
  id: "ch12-s-112", chapter: "ch12", kind: "similar", exam: "", qnum: null,
  point: "用例图actor", related: null,
  stem: "UML用例图中，以下关于参与者（Actor）的说法正确的是（）。",
  options: [
    "参与者只能是人",
    "参与者可以是人、外部系统或硬件设备",
    "参与者就是系统内部的模块",
    "每个用例只能有一个参与者"
  ],
  answer: 1,
  explain: "Actor是与系统交互的外部角色，可以是用户、外部系统、定时器等。一个用例可以关联多个Actor。"
},

// ========== en 补充题 (en-s-100 ~ en-s-109) ==========
{
  id: "en-s-100", chapter: "en", kind: "similar", exam: "", qnum: null,
  point: "术语requirement", related: null,
  stem: "In software engineering, a（） defines what the system should do, while a（） defines how well it should do it.",
  options: ["functional requirement; non-functional requirement", "test case; use case", "module; component", "algorithm; data structure"],
  answer: 0,
  explain: "功能需求定义系统做什么，非功能需求定义质量属性（性能、安全性等）。"
},
{
  id: "en-s-101", chapter: "en", kind: "similar", exam: "", qnum: null,
  point: "术语validation/verification", related: null,
  stem: "（） answers 'Are we building the right product?' while（） answers 'Are we building the product right?'",
  options: ["Validation; Verification", "Verification; Validation", "Testing; Debugging", "Design; Implementation"],
  answer: 0,
  explain: "Validation确认需求正确（做对的产品），Verification确认实现正确（正确地做产品）。"
},
{
  id: "en-s-102", chapter: "en", kind: "similar", exam: "", qnum: null,
  point: "术语transaction", related: null,
  stem: "A database（） is a logical unit of work that must be either fully completed or fully undone to maintain data consistency.",
  options: ["schema", "transaction", "trigger", "index"],
  answer: 1,
  explain: "transaction事务，满足ACID特性。schema是数据库结构定义。"
},
{
  id: "en-s-103", chapter: "en", kind: "similar", exam: "", qnum: null,
  point: "术语commit/rollback", related: null,
  stem: "If a transaction encounters an error, the database uses（） to restore data to its previous consistent state.",
  options: ["COMMIT", "ROLLBACK", "GRANT", "REVOKE"],
  answer: 1,
  explain: "ROLLBACK撤销事务，COMMIT提交事务。GRANT/REVOKE是权限控制。"
},
{
  id: "en-s-104", chapter: "en", kind: "similar", exam: "", qnum: null,
  point: "术语DNS/DHCP", related: null,
  stem: "（） translates human-readable domain names into IP addresses, while（） automatically assigns IP addresses to devices on a network.",
  options: ["DNS; DHCP", "DHCP; DNS", "NAT; ARP", "FTP; SMTP"],
  answer: 0,
  explain: "DNS域名解析，DHCP动态主机配置（自动分配IP）。NAT地址转换，ARP地址解析（IP→MAC）。"
},
{
  id: "en-s-105", chapter: "en", kind: "similar", exam: "", qnum: null,
  point: "术语complexity", related: null,
  stem: "The time（） of an algorithm describes how its running time grows as the input size increases.",
  options: ["complexity", "capacity", "compatibility", "confidentiality"],
  answer: 0,
  explain: "time complexity时间复杂度。用大O表示法如O(n log n)。"
},
{
  id: "en-s-106", chapter: "en", kind: "similar", exam: "", qnum: null,
  point: "术语recursion/iteration", related: null,
  stem: "A function that calls itself to solve smaller sub-problems uses a technique called（）.",
  options: ["iteration", "recursion", "encapsulation", "serialization"],
  answer: 1,
  explain: "recursion递归（函数调用自身）。iteration迭代（循环）。"
},
{
  id: "en-s-107", chapter: "en", kind: "similar", exam: "", qnum: null,
  point: "cloud/containerization", related: null,
  stem: "（） packages an application and its dependencies into a lightweight, portable unit that can run consistently across different environments.",
  options: ["Virtualization", "Containerization", "Compilation", "Fragmentation"],
  answer: 1,
  explain: "Containerization（容器化），如Docker。Virtualization虚拟化是更重量级的方案。"
},
{
  id: "en-s-108", chapter: "en", kind: "similar", exam: "", qnum: null,
  point: "DevOps/CI-CD", related: null,
  stem: "In a CI/CD pipeline,（） automatically builds and tests code changes, while（） automatically deploys validated changes to production.",
  options: ["Continuous Integration; Continuous Deployment", "Continuous Deployment; Continuous Integration", "Code Review; Unit Testing", "Version Control; Bug Tracking"],
  answer: 0,
  explain: "CI持续集成（自动构建测试），CD持续部署/交付（自动发布到生产环境）。"
},
{
  id: "en-s-109", chapter: "en", kind: "similar", exam: "", qnum: null,
  point: "安全术语vulnerability", related: null,
  stem: "A software（） is a weakness that can be exploited by attackers, while a（） is the actual code or technique used to take advantage of it.",
  options: ["vulnerability; exploit", "exploit; vulnerability", "patch; firewall", "firewall; patch"],
  answer: 0,
  explain: "vulnerability漏洞，exploit利用程序/攻击代码，patch补丁（修复漏洞），firewall防火墙。"
}
);
