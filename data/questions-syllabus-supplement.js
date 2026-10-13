// 原创非官方补充题。syllabus 使用科目一级编码和知识主题，不冒充细目编号。
window.QUESTIONS = window.QUESTIONS || [];
window.QUESTIONS.push(
  {
    id: "supplement-multimedia-pcm", chapter: "ch1", kind: "similar", exam: "", qnum: null,
    source: "原创非官方", related: null, syllabus: "科目1-1 计算机系统知识 / 多媒体",
    point: "PCM 音频容量", difficulty: 2, difficultyReason: "需综合采样率、量化位数、声道数与字节换算。",
    stem: "一段未压缩 PCM 音频长 30 s，每声道采样率 48 kHz，量化精度 16 bit，双声道。只计样本数据，不计文件头；1 kHz=1000 Hz，1 MB=1000000 B，1 B=8 bit。数据量为多少？",
    options: ["5.76 MB", "2.88 MB", "46.08 MB", "11.52 MB"], answer: 0,
    explain: "48000×16×2×30/8=5760000 B，即 5.76 MB。2.88 MB 漏掉双声道，46.08 MB 未将 bit 换成 B，11.52 MB 多乘一次声道数。"
  },
  {
    id: "supplement-multimedia-nyquist", chapter: "ch1", kind: "similar", exam: "", qnum: null,
    source: "原创非官方", related: null, syllabus: "科目1-1 计算机系统知识 / 多媒体",
    point: "采样与混叠", difficulty: 2, difficultyReason: "需区分信号最高频率、采样率及严格大于两倍的题设条件。",
    stem: "模拟信号经理想低通滤波后最高频率为 7 kHz。为避开临界采样情形，本题要求采样率严格大于最高频率的两倍。以下可选采样率中，满足条件的最小值是？",
    options: ["14 kHz", "16 kHz", "8 kHz", "48 kHz"], answer: 1,
    explain: "要求采样率大于 2×7=14 kHz。16 和 48 均满足，但最小可选值为 16 kHz；14 等于边界，不满足本题的严格不等式。提高量化位数不能代替提高采样率来避免混叠。"
  },
  {
    id: "supplement-multimedia-bitmap", chapter: "ch1", kind: "similar", exam: "", qnum: null,
    source: "原创非官方", related: null, syllabus: "科目1-1 计算机系统知识 / 多媒体",
    point: "位图像素容量", difficulty: 2, difficultyReason: "需区分每像素与每通道位数，并使用二进制容量单位。",
    stem: "一幅 1024×768 像素的未压缩 RGB 位图，每个像素共 24 bit，无透明通道。忽略文件头、调色板和行填充，仅像素数据占多少空间？1 MiB=1048576 B，1 B=8 bit。",
    options: ["0.75 MiB", "18 MiB", "2.25 MiB", "3 MiB"], answer: 2,
    explain: "每像素 24/8=3 B，1024×768×3=2359296 B，除以 1048576 得 2.25 MiB。0.75 只算一个 8 bit 通道，18 未作 bit/B 换算，3 相当于按 32 bit/像素计算。"
  },
  {
    id: "supplement-multimedia-video", chapter: "ch1", kind: "similar", exam: "", qnum: null,
    source: "原创非官方", related: null, syllabus: "科目1-1 计算机系统知识 / 多媒体",
    point: "视频帧负载与压缩", difficulty: 2, difficultyReason: "需连乘像素、帧率和时长，再按明确定义的压缩比换算。",
    stem: "视频分辨率 640×480，每像素共 24 bit，25 帧/s，时长 10 s。压缩比定义为未压缩数据量:压缩后数据量=12:1。忽略音频、容器头与传输开销；1 MB=1000000 B，1 B=8 bit。压缩后视频负载为多少？",
    options: ["230.4 MB", "153.6 MB", "0.768 MB", "19.2 MB"], answer: 3,
    explain: "一帧为 640×480×3=921600 B，共 250 帧，原始数据 230400000 B。除以 12 后为 19200000 B，即 19.2 MB。230.4 未压缩，153.6 混淆 bit 与 B，0.768 漏乘帧率。"
  },
  {
    id: "supplement-math-conditional", chapter: "ch1", kind: "similar", exam: "", qnum: null,
    source: "原创非官方", related: null, syllabus: "科目1-1 计算机系统知识 / 数学基础",
    point: "条件概率", difficulty: 2, difficultyReason: "需用全概率构造条件事件的分母，不能直接倒置条件。",
    stem: "一次请求以 60% 概率分配给服务器甲、40% 分配给乙。甲处理请求的失败率为 2%，乙为 5%。现随机观察到一次失败请求，它由乙处理的条件概率为多少？",
    options: ["62.5%", "40%", "5%", "2%"], answer: 0,
    explain: "乙且失败的概率为 0.4×0.05=0.02，总失败概率为 0.6×0.02+0.4×0.05=0.032。因此 P(乙|失败)=0.02/0.032=62.5%。40% 是先验分配比例，5% 是反向条件，2% 是联合概率。"
  },
  {
    id: "supplement-math-independent", chapter: "ch1", kind: "similar", exam: "", qnum: null,
    source: "原创非官方", related: null, syllabus: "科目1-1 计算机系统知识 / 数学基础",
    point: "独立事件与至少一次", difficulty: 2, difficultyReason: "需根据独立性计算交集，再以补事件求至少一个成功。",
    stem: "一次观测期间，组件甲成功工作的概率为 0.9，乙为 0.8，二者成功事件相互独立。系统只需至少一个组件成功即可工作，忽略切换及其他故障。系统成功工作的概率为多少？",
    options: ["72%", "98%", "90%", "85%"], answer: 1,
    explain: "两个组件同时失败的概率为 (1-0.9)×(1-0.8)=0.02，至少一个成功的概率为 1-0.02=0.98。72% 对应两者都成功；90% 只看甲；85% 是简单平均，不是并联系统成功率。独立性是本题给定条件，不能无条件用于实际共因故障。"
  },
  {
    id: "supplement-math-expectation", chapter: "ch1", kind: "similar", exam: "", qnum: null,
    source: "原创非官方", related: null, syllabus: "科目1-1 计算机系统知识 / 数学基础",
    point: "离散随机变量期望", difficulty: 2, difficultyReason: "需识别互斥完备结果，以概率加权而非对耗时求平均。",
    stem: "请求总耗时只有三种互斥情况：命中一级缓存的概率为 0.5，总耗时 2 ms；仅命中二级缓存的概率为 0.3，总耗时 8 ms；未命中两级缓存的概率为 0.2，总耗时 30 ms。所给耗时已包含全部访问开销。一次请求总耗时的期望为多少？",
    options: ["13.333 ms（约）", "10 ms", "9.4 ms", "8 ms"], answer: 2,
    explain: "E(T)=0.5×2+0.3×8+0.2×30=1+2.4+6=9.4 ms。各耗时均为完整请求耗时，不再累加前级开销；对三个耗时作算术平均或仅选中间耗时都不符合给定概率。"
  },
  {
    id: "supplement-math-inclusion", chapter: "ch1", kind: "similar", exam: "", qnum: null,
    source: "原创非官方", related: null, syllabus: "科目1-1 计算机系统知识 / 数学基础",
    point: "容斥与补集", difficulty: 2, difficultyReason: "需去掉重复计数后再求补集，不可假设两个特征独立。",
    stem: "在 200 条测试记录中，出现超时的有 70 条，出现重试的有 90 条，同时出现两者的有 30 条。一条记录可同时具有两种特征。既未超时也未重试的记录有多少条？",
    options: ["40 条", "130 条", "100 条", "70 条"], answer: 3,
    explain: "至少具有一种特征的记录数为 70+90-30=130；两种特征均无的记录数为 200-130=70。40 未扣除交集的重复计数，130 是并集，100 是恰好具有一种特征的记录数。"
  },
  {
    id: "supplement-architecture-pipeline", chapter: "ch5", kind: "similar", exam: "", qnum: null,
    source: "原创非官方", related: null, syllabus: "科目1-2 系统开发和运行知识 / 软件体系结构",
    point: "管道过滤器风格", difficulty: 2, difficultyReason: "需从数据流和替换需求选型，同时保留格式转换的代价。",
    stem: "日志离线处理按解析、脱敏、聚合的顺序执行；各阶段尽量独立，可替换，阶段间传递约定格式的数据。团队接受中间数据编码开销。以下方案最符合这些约束的是？",
    options: ["采用管道过滤器，约定阶段输入输出格式，并评估序列化开销", "采用共享仓库，让各阶段依赖同一批内部可变表结构来获得替换独立性", "采用黑板风格，由多个知识源反复竞争推理来替代已确定的顺序", "采用单个紧耦合过程，将阶段实现内联以优先满足阶段独立替换"], answer: 0,
    explain: "线性数据转换、阶段接口明确和独立替换适合管道过滤器；它并非没有中间编码和缓冲成本。共享可变内部结构会增加耦合；黑板更适合解法不确定的协同求解；内联优化与本题的独立替换目标不符。"
  },
  {
    id: "supplement-architecture-layered", chapter: "ch5", kind: "similar", exam: "", qnum: null,
    source: "原创非官方", related: null, syllabus: "科目1-2 系统开发和运行知识 / 软件体系结构",
    point: "分层架构质量权衡", difficulty: 2, difficultyReason: "需区分可修改性与性能目标，避免把分层当作零成本优化。",
    stem: "业务规则和存储技术都可能变化，系统采用表现层、业务层、数据访问层的严格分层架构。团队发现热点调用多了一些层间开销。以下判断最合理的是？",
    options: ["由表现层直接操作数据库即可同时保持严格分层与隐藏存储细节", "层间接口有助于隔离变化，但调用和数据转换可能增加延迟，应实测权衡", "只要分层就能减少每个请求经过的调用次数，无需性能验证", "将存储类型暴露给所有层能增强存储实现的可替换性"], answer: 1,
    explain: "分层和抽象接口通常有利于职责分离、可测试性及局部修改，但额外调用和转换可能损耗性能，需要结合负载测量。跨层直访会破坏严格分层；暴露具体存储类型增加依赖，而非自然改善替换能力。"
  },
  {
    id: "supplement-architecture-events", chapter: "ch5", kind: "similar", exam: "", qnum: null,
    source: "原创非官方", related: null, syllabus: "科目1-2 系统开发和运行知识 / 软件体系结构",
    point: "事件驱动与一致性", difficulty: 3, difficultyReason: "综合异步解耦、至少一次投递、重复消费和最终一致性的代价。",
    stem: "订单提交后通过消息代理异步通知积分和通知服务；代理提供至少一次投递，业务允许积分延迟几秒到账。针对这一事件驱动方案，以下评价最合理的是？",
    options: ["至少一次投递意味着每条事件仅被处理一次，可省略去重", "异步通知意味着订单提交时各订阅服务已完成更新", "可减少时间耦合，但需处理重复事件，并监测积压与最终一致性", "为了让发布者解耦，发布者应直接依赖每个订阅者的数据库表结构"], answer: 2,
    explain: "异步订阅降低发布者等待订阅者完成的时间耦合，但至少一次投递可能重复，消费者应使用幂等或去重策略，且需监测积压、失败和一致性延迟。它不自动保证端到端恰好一次，也不代表立即强一致；共享内部表结构反会增强耦合。"
  },
  {
    id: "supplement-architecture-microservices", chapter: "ch5", kind: "similar", exam: "", qnum: null,
    source: "原创非官方", related: null, syllabus: "科目1-2 系统开发和运行知识 / 软件体系结构",
    point: "微服务选型与运维成本", difficulty: 3, difficultyReason: "需联合团队规模、发布频率、事务和运维约束作选型，而非背风格名称。",
    stem: "一个三人团队维护访问量较小的库存系统，各模块总是同时发布，跨模块强一致事务较多，尚无成熟分布式监控与部署平台。当前希望降低交付和排障成本，以下建议最合适的是？",
    options: ["立即把每张数据表拆成独立服务，以减少跨服务事务", "以跨服务同步调用替换进程内调用，可直接降低网络故障风险", "仅依据微服务流行程度进行拆分，无需测量现有交付瓶颈", "优先保持边界清晰的模块化单体，出现独立扩展或发布需求后再评估拆分"], answer: 3,
    explain: "在给定规模和约束下，模块化单体可减少分布式调用、部署和事务协调负担，同时保留清晰边界。微服务可带来独立发布与扩展优势，但需付出运维和一致性代价，不能断言对所有系统都更好或更差。按表拆分还可能扩大跨服务事务。"
  },
  {
    id: "supplement-systems-cloud-responsibility", chapter: "ch10", kind: "similar", exam: "", qnum: null,
    source: "原创非官方", related: null, syllabus: "科目1-6 软件开发新进展 / 云计算",
    point: "云安全共享责任", difficulty: 2, difficultyReason: "需按已明确的 IaaS 管理边界划分宿主机和客户机责任。",
    stem: "某 IaaS 合同约定：提供商维护机房、物理服务器和虚拟化层；客户自行管理虚拟机中的操作系统和应用。客户自建 Web 应用所在的客户机操作系统发现漏洞。按此边界，最合理的处置是？",
    options: ["客户负责评估并修补客户机系统，同时检查应用配置；提供商继续维护底层设施", "提供商负责修补客户机系统，因为它运行在提供商的物理设备上", "客户应先修改提供商的虚拟化层，再由提供商修改客户的应用", "应用部署在云上后，只需修补物理宿主机，无需关注客户机漏洞"], answer: 0,
    explain: "题设明确客户管理客户机操作系统与应用，故相应补丁、配置和验证由客户承担；提供商负责约定的基础设施层。上云不是安全责任全部转移，具体边界仍取决于服务模式和合同，本题不作法律归责。"
  },
  {
    id: "supplement-systems-cloud-model", chapter: "ch10", kind: "similar", exam: "", qnum: null,
    source: "原创非官方", related: null, syllabus: "科目1-6 软件开发新进展 / 云计算",
    point: "云服务模式选择", difficulty: 1, difficultyReason: "依据是否管理运行时以及是否部署自有代码，直接识别服务模式。",
    stem: "团队希望部署自己编写的业务代码并控制应用配置，但不希望维护操作系统、运行时和中间件；也不是直接使用一个现成的完整业务软件。以下典型服务最符合需求的是？",
    options: ["IaaS 虚拟机，由团队安装并维护操作系统和运行时", "PaaS 应用平台，提供商管理底层及运行时，团队部署应用代码", "SaaS 成品业务软件，团队仅使用现成业务功能", "机房托管，团队维护自有服务器及其全部软件"], answer: 1,
    explain: "典型 PaaS 提供应用运行平台，客户部署自有应用而不直接维护操作系统和运行时。IaaS 通常还需客户管理客户机系统，SaaS 主要交付成品软件，托管并未免除团队的软件栈维护。本题按描述的典型边界分类。"
  },
  {
    id: "supplement-systems-migration", chapter: "ch5", kind: "similar", exam: "", qnum: null,
    source: "原创非官方", related: null, syllabus: "科目1-2 系统开发和运行知识 / 系统转换",
    point: "并行转换与直接转换", difficulty: 2, difficultyReason: "需结合回退、比对和重复运行成本区分转换方式。",
    stem: "工资系统迁移时，旧系统仍为正式发薪依据；新系统使用同一期间的数据计算结果供逐项比对，不执行实际支付，验证后再切换。单位可以承担两套系统短期运行的成本，希望保留旧系统作为退路。这属于哪种转换及权衡？",
    options: ["直接转换；先关闭旧系统，再以旧系统运行结果持续比对", "分段转换；因为所有工资模块已同时在两套系统计算", "并行转换；便于比对和保留退路，但增加重复运行及差异核对成本", "试点转换；因为全部员工的工资都在两套系统中计算"], answer: 2,
    explain: "同一期间新旧系统对同一业务并行计算、比对，属于并行转换。直接转换通常在切换时停用旧系统，不具有同样的持续双轨验证；分段按功能逐步转换，试点按局部组织先上线。新系统仅影子计算可避免重复发薪，但仍需核对差异和准备切换方案。"
  },
  {
    id: "supplement-systems-oo-testing", chapter: "ch7", kind: "similar", exam: "", qnum: null,
    source: "原创非官方", related: null, syllabus: "科目1-3 面向对象基础知识 / 面向对象测试",
    point: "继承、多态与对象状态测试", difficulty: 3, difficultyReason: "综合继承后的上下文变化、动态绑定、状态前置条件和对象协作。",
    stem: "账户基类的取款方法已通过测试，子类新增最低余额约束并重写取款方法。业务服务经基类引用调用取款，账户还有冻结和正常两种状态。以下追加测试方案最合理的是？",
    options: ["基类测试已通过，只检查子类能否编译即可", "只创建基类实例运行旧测试，即可覆盖子类的动态绑定行为", "只直接调用正常状态子类的成功路径，无需考虑经基类引用调用", "经基类引用调用子类实例，覆盖余额边界、冻结状态及协作回归，验证约定行为"], answer: 3,
    explain: "继承并不免除在子类上下文中重新验证的必要性。应以基类引用持有子类实例检验动态绑定，结合最低余额边界、对象状态与业务协作测试，并检查公开契约是否仍满足；不能仅凭基类通过或子类编译通过推断正确。本题未给出基类完整契约，因此不直接判定新增约束必然合法或违法。"
  }
);
