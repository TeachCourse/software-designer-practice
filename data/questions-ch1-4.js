window.QUESTIONS = window.QUESTIONS || [];
window.QUESTIONS.push(
{
  id: "ch1-o-19", chapter: "ch1", kind: "original", exam: "2026上半年", qnum: 19,
  point: "运算器组成", related: null,
  stem: "计算机系统中，CPU的运算器承担执行各种算术运算和逻辑运算的工作，运算器主要由算术逻辑单元、（）、状态寄存器和通用寄存器等组成。",
  options: ["累加器", "指令寄存器", "程序计数器", "时序电路"],
  answer: 0,
  explain: "运算器数据通路核心是 ALU、累加器、状态寄存器和通用寄存器。指令寄存器、程序计数器属于控制器；时序电路也属于控制器。"
},
{
  id: "ch1-s-19", chapter: "ch1", kind: "similar", exam: "", qnum: null,
  point: "控制器组成", related: "ch1-o-19",
  stem: "CPU控制器用于指挥指令的取出与执行，下列部件中属于控制器的是（）。",
  options: ["累加器与ALU", "程序计数器与指令寄存器", "通用寄存器组", "状态寄存器"],
  answer: 1,
  explain: "控制器典型组成包括PC、IR、时序电路等。累加器、ALU、通用寄存器、状态寄存器属于运算器。对照2026上半年第19题，只是把提问从运算器换成控制器。"
},
{
  id: "ch1-o-22", chapter: "ch1", kind: "original", exam: "2026上半年", qnum: 22,
  point: "DRAM与SRAM", related: null,
  stem: "以下关于DRAM、SRAM存储器的叙述中，正确的是（）。\n① DRAM芯片比SRAM芯片的集成度高\n② DRAM芯片比SRAM芯片的制造成本高\n③ DRAM芯片比SRAM芯片的工作速度快\n④ DRAM芯片工作时需要刷新，SRAM芯片工作时不需要刷新",
  options: ["②③", "①②", "①④", "③④"],
  answer: 2,
  explain: "DRAM单管结构，集成度高、成本低、速度慢、需刷新，用作主存。SRAM六管结构，速度快、贵、不刷新，用作Cache。①④正确。"
},
{
  id: "ch1-s-22", chapter: "ch1", kind: "similar", exam: "", qnum: null,
  point: "Cache器件", related: "ch1-o-22",
  stem: "Cache通常采用（）实现，主要原因是（）。",
  options: ["DRAM；需要刷新以保持数据", "SRAM；速度快且不必刷新", "DRAM；集成度高、容量大", "SRAM；成本低、适合做大容量主存"],
  answer: 1,
  explain: "Cache追求速度，用SRAM。主存追求容量和成本，用DRAM。对照第22题①④。"
},
{
  id: "ch1-o-34", chapter: "ch1", kind: "original", exam: "2026上半年", qnum: 34,
  point: "分级存储", related: null,
  stem: "计算机系统中采用分级存储体系主要是为了解决（）的问题。",
  options: ["主存容量需要扩充", "存储成本、容量和速度之间需要平衡", "存储器读写的可靠性不足", "外设访问效率低"],
  answer: 1,
  explain: "Cache–主存–外存分级，利用局部性，在速度、容量、成本之间折中。不是单纯扩容或提高可靠性。"
},
{
  id: "ch1-s-34", chapter: "ch1", kind: "similar", exam: "", qnum: null,
  point: "局部性原理", related: "ch1-o-34",
  stem: "分级存储体系能够生效，主要依赖程序访问的（）。",
  options: ["奇偶校验", "时间局部性与空间局部性", "CRC校验", "中断优先级"],
  answer: 1,
  explain: "刚访问过的数据不久还会访问（时间局部性），相邻地址往往接着访问（空间局部性），所以小而快的Cache才有高命中率。"
},
{
  id: "ch1-o-37", chapter: "ch1", kind: "original", exam: "2026上半年", qnum: 37,
  point: "MTBF", related: null,
  stem: "MTBF（平均无故障时间）越长，通常说明系统的（）。",
  options: ["可靠性越高", "可靠性越低", "测试越不充分", "可维护性越差"],
  answer: 0,
  explain: "MTBF长表示平均两次故障间隔长，可靠性高。可维护性看MTTR（平均修复时间）。"
},
{
  id: "ch1-s-37", chapter: "ch1", kind: "similar", exam: "", qnum: null,
  point: "可用度", related: "ch1-o-37",
  stem: "系统可用度可近似表示为（）。",
  options: ["MTBF / (MTBF + MTTR)", "MTTR / MTBF", "MTBF × MTTR", "1 / MTBF"],
  answer: 0,
  explain: "可用度A = MTBF/(MTBF+MTTR)。MTBF长、MTTR短，可用度高。对照第37题把可靠性指标延到可用度。"
},
{
  id: "ch1-o-52", chapter: "ch1", kind: "original", exam: "2026上半年", qnum: 52,
  point: "带符号整数最大值", related: null,
  stem: "用n个二进制位表示的带符号整数（补码）的最大值是（）。",
  options: ["2^n - 1", "2^n", "2^(n-1)", "2^(n-1) - 1"],
  answer: 3,
  explain: "n位补码：最高位符号位，最大正数为2^(n-1)-1，例如8位是127。无符号最大值才是2^n-1。"
},
{
  id: "ch1-s-52", chapter: "ch1", kind: "similar", exam: "", qnum: null,
  point: "补码最小值", related: "ch1-o-52",
  stem: "用8位补码表示的整数，其取值范围是（）。",
  options: ["-127 ~ 127", "-128 ~ 127", "-128 ~ 128", "0 ~ 255"],
  answer: 1,
  explain: "n位补码范围是 -2^(n-1) ~ 2^(n-1)-1，8位即 -128~127。0~255是无符号。"
},
{
  id: "ch1-o-56", chapter: "ch1", kind: "original", exam: "2026上半年", qnum: 56,
  point: "存储芯片片数", related: null,
  stem: "某系统的内存按照字节编址，对于地址空间90000H–CFFFFH，若用16K×8位的存储芯片构造，至少需要（）片。",
  options: ["16", "32", "8", "4"],
  answer: 0,
  explain: "容量 = CFFFFH-90000H+1 = 40000H = 256KB。芯片16K×8=16KB。256/16=16片。"
},
{
  id: "ch1-s-56", chapter: "ch1", kind: "similar", exam: "", qnum: null,
  point: "芯片位数拼接", related: "ch1-o-56",
  stem: "按字节编址的内存容量为64KB，若用16K×4位的芯片构成，至少需要（）片。",
  options: ["4", "8", "16", "32"],
  answer: 1,
  explain: "64KB=64K×8位。每片16K×4位，字长方向要2片拼成8位，地址方向64K/16K=4组，共2×4=8片。对照第56题，多了“位数拼接”。"
},
{
  id: "ch1-o-64", chapter: "ch1", kind: "original", exam: "2026上半年", qnum: 64,
  point: "指令周期", related: null,
  stem: "以下关于指令周期的叙述中，错误的是（）。",
  options: ["不同指令的指令周期不一定相同", "CPU从主存取出并执行一条指令的时间称为指令周期", "一个指令周期通常包含多个机器周期", "每个指令周期都包含一个中断响应机器周期"],
  answer: 3,
  explain: "中断周期只在允许中断且有中断请求时插入，不是每条指令都有。"
},
{
  id: "ch1-s-64", chapter: "ch1", kind: "similar", exam: "", qnum: null,
  point: "机器周期", related: "ch1-o-64",
  stem: "下列关于指令执行过程的叙述中，正确的是（）。",
  options: ["所有指令的指令周期长度必须相同", "一个机器周期等于一个时钟周期", "指令周期由一个或多个机器周期组成", "中断响应一定发生在取指周期之前"],
  answer: 2,
  explain: "指令周期≥取指+执行，可由多个机器周期组成。机器周期通常含多个时钟周期。中断一般在指令执行完后检测。"
},

{
  id: "ch2-o-17", chapter: "ch2", kind: "original", exam: "2026上半年", qnum: 17,
  point: "静态语义错误", related: null,
  stem: "若某C/C++程序中有表达式 \"start\"+2.71828，则（）。",
  options: ["编译通过，运行时报错", "编译时报错，属于静态语义错误", "编译时报错，属于语法错误", "编译或运行时都不报告错误或警告"],
  answer: 1,
  explain: "字符串字面量与浮点数相加是类型不合法，属静态语义（类型检查）错误。缺分号才是语法错误。注意：\"start\"+2（整数）在C中是合法指针偏移。"
},
{
  id: "ch2-s-17", chapter: "ch2", kind: "similar", exam: "", qnum: null,
  point: "语法与语义", related: "ch2-o-17",
  stem: "下列错误中，属于语法错误的是（）。",
  options: ["int a = \"12\";", "使用未声明的变量", "表达式缺少分号", "运行时除数为0"],
  answer: 2,
  explain: "语法错误违反文法结构（如缺分号）。类型不匹配、未声明是静态语义。除零是动态语义/运行时错误。"
},
{
  id: "ch2-o-30", chapter: "ch2", kind: "original", exam: "2026上半年", qnum: 30,
  point: "语法制导翻译", related: null,
  stem: "编译器的语义分析常采用语法制导翻译的方法，处理包含变量的表达式的主要目标是（）。",
  options: ["计算表达式的值", "构造表达式的分析树", "生成中间代码", "填写符号表"],
  answer: 2,
  explain: "含变量时编译期一般不能算出最终值。语法制导翻译处理表达式的典型产物是中间代码。分析树偏语法分析；符号表主要在处理声明时填写。"
},
{
  id: "ch2-s-30", chapter: "ch2", kind: "similar", exam: "", qnum: null,
  point: "编译阶段", related: "ch2-o-30",
  stem: "编译过程中，识别单词（记号）的阶段是（），常用工具是（）。",
  options: ["语法分析；CFG", "词法分析；有限自动机", "语义分析；符号表", "目标代码生成；寄存器分配"],
  answer: 1,
  explain: "词法分析把字符流变成记号，用FA（NFA/DFA）。语法分析用文法。对照第65题NFA。"
},
{
  id: "ch2-o-65", chapter: "ch2", kind: "original", exam: "2026上半年", qnum: 65,
  point: "NFA不确定性", related: null,
  stem: "识别高级程序语言源程序中单词的有限自动机有NFA和DFA两种形式。NFA的不确定性表现为（）。\n① 可以存在标记为ε的状态转移\n② 同一状态下对同一字符可以有多个下一状态转移\n③ 存在多个终态",
  options: ["仅①", "①②③", "仅②", "仅①和②"],
  answer: 3,
  explain: "DFA也可以有多个终态。NFA特有的是ε转移，以及同一字符多个后继。"
},
{
  id: "ch2-s-65", chapter: "ch2", kind: "similar", exam: "", qnum: null,
  point: "DFA性质", related: "ch2-o-65",
  stem: "下列关于DFA的叙述中，错误的是（）。",
  options: ["对每个状态和每个输入符号，转移是唯一确定的", "不允许ε转移", "只能有一个终态", "每个NFA都存在等价的DFA"],
  answer: 2,
  explain: "DFA可以有多个终态。其余三项正确。子集构造可把NFA确定化。"
},
{
  id: "ch2-o-53", chapter: "ch2", kind: "original", exam: "2026上半年", qnum: 53,
  point: "is与==", related: null,
  stem: "以下关于is和==的叙述中，正确的是（）。",
  options: ["==判断内存地址是否相同，is判断值是否相等", "数字类型不能用is比较，能用==比较", "is判断内存地址是否相同，==判断值是否相等", "is和==完全等价"],
  answer: 2,
  explain: "Python中 is 比身份（是否同一对象），== 比值是否相等。小整数缓存会让 is 看起来像 ==，不能当成等价。"
},
{
  id: "ch2-o-62", chapter: "ch2", kind: "original", exam: "2026上半年", qnum: 62,
  point: "列表推导", related: null,
  stem: "运行以下代码，输出结果是（）。\nnums = [1, 2, 3]\nresult = [i*2 for i in nums if i > 1]\nprint(result)",
  options: ["[]", "[4, 6]", "[2, 4, 6]", "[6]"],
  answer: 1,
  explain: "过滤 i>1 得到 2、3，再乘2得到 [4,6]。"
},
{
  id: "ch2-o-69", chapter: "ch2", kind: "original", exam: "2026上半年", qnum: 69,
  point: "切片赋值", related: null,
  stem: "以下代码执行后，lst的值为（）。\nlst = [1, 2, 3, 4, 5]\nlst[1:4] = []",
  options: ["[4, 5]", "[2, 3, 4]", "[1]", "[1, 5]"],
  answer: 3,
  explain: "切片[1:4]是下标1、2、3（左闭右开），赋空列表等于删除这三项，剩下[1,5]。"
},
{
  id: "ch2-s-69", chapter: "ch2", kind: "similar", exam: "", qnum: null,
  point: "切片左闭右开", related: "ch2-o-69",
  stem: "设 a = [10, 20, 30, 40, 50]，则 a[1:3] 的值是（）。",
  options: ["[10, 20, 30]", "[20, 30]", "[20, 30, 40]", "[30]"],
  answer: 1,
  explain: "左闭右开，取下标1和2，即20、30。"
},

{
  id: "ch3-o-27", chapter: "ch3", kind: "original", exam: "2026上半年", qnum: 27,
  point: "BST插入次序", related: null,
  stem: "根据以下序列构造的二叉排序树中，（）与其他3个序列所构造的结果不同。",
  options: ["(95,65,85,90,115,100,125)", "(95,85,65,90,115,125,100)", "(95,115,100,125,85,65,90)", "(95,85,90,65,115,100,125)"],
  answer: 0,
  explain: "A先插入65，85成为65的右孩子。B/C/D都是先插入85作为95的左孩子，65在85左侧。BST形状由插入次序决定，中序都有序，不能用来区分。"
},
{
  id: "ch3-s-27", chapter: "ch3", kind: "similar", exam: "", qnum: null,
  point: "BST中序", related: "ch3-o-27",
  stem: "一棵二叉排序树的中序遍历结果一定是（）。",
  options: ["按层递增", "按插入次序", "关键字有序序列", "先根后左右"],
  answer: 2,
  explain: "BST中序遍历得到有序序列。先序/层序才反映插入或结构层次。"
},
{
  id: "ch3-o-40", chapter: "ch3", kind: "original", exam: "2026上半年", qnum: 40,
  point: "层序+中序构树", related: null,
  stem: "设某二叉树的层序遍历序列为ABCDEF、中序遍历序列为BDAFEC，则以下关于该二叉树的叙述中，正确的是（）。",
  options: ["该二叉树中D为B的左孩子、E为B的右孩子", "该二叉树中E为C的右孩子、F为E的右孩子", "该二叉树中D为C的右孩子、E为B的左孩子", "该二叉树中E为C的左孩子、F为E的左孩子"],
  answer: 3,
  explain: "层序定根A。中序BDA|A|FEC，左子树BD、右子树FEC。结合层序：B左C右；D为B右孩子；C只有左子树，E为C左、F为E左。"
},
{
  id: "ch3-s-40", chapter: "ch3", kind: "similar", exam: "", qnum: null,
  point: "由遍历定根", related: "ch3-o-40",
  stem: "已知二叉树先序为ABDCE，中序为DBAEC，则后序遍历为（）。",
  options: ["DBCEA", "DABEC", "DBECA", "BDECA"],
  answer: 2,
  explain: "先序确定根A，中序分为左子树DB和右子树EC。左子树根B、左孩子D，后序为DB；右子树根C、左孩子E，后序为EC。按左、右、根拼接得到DBECA。"
},
{
  id: "ch3-o-47", chapter: "ch3", kind: "original", exam: "2026上半年", qnum: 47,
  point: "排序第一趟", related: null,
  stem: "下列排序算法中，（）在第一趟排序结束后，不保证能将最小（或最大）元素放在其最终位置上。",
  options: ["简单选择排序", "归并排序", "冒泡排序", "堆排序"],
  answer: 1,
  explain: "选择、冒泡、堆第一趟都会把一个极值归位。归并第一趟只合并相邻长度为1的子序列。快排第一趟是枢轴归位，不是全局最小。"
},
{
  id: "ch3-s-47", chapter: "ch3", kind: "similar", exam: "", qnum: null,
  point: "排序稳定性", related: "ch3-o-47",
  stem: "下列排序算法中，不稳定的是（）。",
  options: ["冒泡排序", "归并排序", "简单选择排序", "直接插入排序"],
  answer: 2,
  explain: "选择、快排、堆排、希尔不稳定。冒泡、插入、归并、基数稳定。"
},
{
  id: "ch3-o-57", chapter: "ch3", kind: "original", exam: "2026上半年", qnum: 57,
  point: "顺序存储", related: null,
  stem: "线性表采用顺序存储结构的优点之一是（）。",
  options: ["按需动态分配存储空间", "可随机访问表中的元素", "可有效利用地址不连续的碎片化存储空间", "插入和删除元素的运算效率高"],
  answer: 1,
  explain: "顺序表可按下标O(1)随机访问。A/C/D是链表特点。顺序表插入删除要搬迁。"
},
{
  id: "ch3-s-57", chapter: "ch3", kind: "similar", exam: "", qnum: null,
  point: "链表特点", related: "ch3-o-57",
  stem: "与顺序表相比，单链表的主要优点是（）。",
  options: ["可随机访问任一元素", "逻辑相邻则物理相邻", "插入删除不必大量移动元素", "存储密度一定更高"],
  answer: 2,
  explain: "链表插入删除改指针即可。不能随机访问；要额外存指针，密度通常更低。"
},
{
  id: "ch3-o-63", chapter: "ch3", kind: "original", exam: "2026上半年", qnum: 63,
  point: "双向循环链表插入", related: null,
  stem: "某线性表采用双向循环链表存储，若需在p所指结点之后插入s所指结点，则正确的操作序列为（）。",
  options: [
    "p->next=s; s->prior=p; p->next->prior=s; s->next=p->next;",
    "p->next->prior=s; p->next=s; s->prior=p; s->next=p->next;",
    "s->prior=p; s->next=p->next; p->next=s; p->next->prior=s;",
    "s->next=p->next; s->prior=p; p->next->prior=s; p->next=s;"
  ],
  answer: 3,
  explain: "先接好s的两个指针，再改原后继的prior，最后改p->next。C过早修改p->next，最后一句变成s->prior=s。"
},
{
  id: "ch3-s-63", chapter: "ch3", kind: "similar", exam: "", qnum: null,
  point: "单链表插入", related: "ch3-o-63",
  stem: "在单链表中，已知p指向某结点，要在p之后插入s，正确操作是（）。",
  options: ["p->next=s; s->next=p->next;", "s->next=p->next; p->next=s;", "s->next=p; p->next=s;", "p->next=s->next; s->next=p;"],
  answer: 1,
  explain: "必须先让s指向原后继，再让p指向s，否则丢失后继。和双向链表第63题同一原则：先保后继。"
},

{
  id: "ch4-o-18", chapter: "ch4", kind: "original", exam: "2026上半年", qnum: 18,
  point: "缓冲技术", related: null,
  stem: "设备管理中，引入缓冲技术的主要目的是（）。",
  options: ["减少内存占用", "简化设备驱动程序", "提高设备利用率", "缓和CPU与I/O设备速度不匹配的矛盾"],
  answer: 3,
  explain: "缓冲主要解决CPU与I/O速度不匹配。提高设备利用率是可能副作用，不是标准“主要目的”表述。"
},
{
  id: "ch4-s-18", chapter: "ch4", kind: "similar", exam: "", qnum: null,
  point: "SPOOLing", related: "ch4-o-18",
  stem: "SPOOLing技术的实质是（）。",
  options: ["用一台物理设备同时对应多台虚拟设备", "提高CPU主频", "把独占设备改造成共享设备", "取消中断"],
  answer: 2,
  explain: "假脱机用磁盘模拟独占设备，使之可共享。常和缓冲、中断一起考I/O管理。"
},
{
  id: "ch4-o-20", chapter: "ch4", kind: "original", exam: "2026上半年", qnum: 20,
  point: "系统调用", related: null,
  stem: "用户程序在用户态下执行系统调用时，CPU会从用户态切换到（）。",
  options: ["阻塞态", "内核态", "等待态", "就绪态"],
  answer: 1,
  explain: "阻塞/就绪/等待是进程状态。系统调用切换的是CPU特权级：用户态→内核态。"
},
{
  id: "ch4-s-20", chapter: "ch4", kind: "similar", exam: "", qnum: null,
  point: "进程状态", related: "ch4-o-20",
  stem: "进程因等待打印机而暂停执行，此时进程处于（）。",
  options: ["运行态", "就绪态", "阻塞态", "内核态"],
  answer: 2,
  explain: "等待资源或事件是阻塞态。就绪是万事俱备只等CPU。内核态不是进程三态。对照第20题，别把特权级和进程状态混为一谈。"
},
{
  id: "ch4-o-41", chapter: "ch4", kind: "original", exam: "2026上半年", qnum: 41,
  point: "时间片轮转", related: null,
  stem: "时间片轮转调度算法中，时间片设置过大将退化为（）。",
  options: ["多级反馈队列", "短作业优先", "优先级调度", "先来先服务"],
  answer: 3,
  explain: "时间片过大，一个作业长时间占CPU，近似FCFS。过小则上下文切换开销大。"
},
{
  id: "ch4-s-41", chapter: "ch4", kind: "similar", exam: "", qnum: null,
  point: "时间片过小", related: "ch4-o-41",
  stem: "时间片设置过小，主要问题是（）。",
  options: ["退化为短作业优先", "进程响应变慢", "处理器在进程切换上开销过大", "必然产生死锁"],
  answer: 2,
  explain: "过小导致频繁切换。对照第41题把“过大/过小”成对记住。"
},
{
  id: "ch4-o-59", chapter: "ch4", kind: "original", exam: "2026上半年", qnum: 59,
  point: "虚拟内存", related: null,
  stem: "虚拟内存技术的主要目的是（）。",
  options: ["提高CPU利用率", "简化程序设计", "加快内存访问速度", "扩大逻辑内存容量"],
  answer: 3,
  explain: "虚拟内存用外存换“看起来更大的内存”。缺页时访问更慢。提高CPU利用率更常对应多道程序。"
},
{
  id: "ch4-s-59", chapter: "ch4", kind: "similar", exam: "", qnum: null,
  point: "缺页", related: "ch4-o-59",
  stem: "下列页面置换算法中，理论上缺页率最低的是（）。",
  options: ["FIFO", "LRU", "OPT（最佳置换）", "Clock"],
  answer: 2,
  explain: "OPT淘汰最久以后才用的页，是理想下限，实际无法预知未来。常与虚拟内存一起考。"
},
{
  id: "ch4-s-deadlock", chapter: "ch4", kind: "similar", exam: "", qnum: null,
  point: "死锁条件", related: "ch4-o-20",
  stem: "产生死锁的四个必要条件中，破坏（）即可预防死锁，且通常最易实现。",
  options: ["互斥", "请求与保持", "不可抢占", "环路等待（资源有序分配）"],
  answer: 3,
  explain: "互斥往往不能破。工程上常用资源有序分配破坏环路等待。此题补操作系统高频缺口。"
},

// ========== ch1 补充题（ch1-s-100 ~ ch1-s-111）==========
{
  id: "ch1-s-100", chapter: "ch1", kind: "similar", exam: "", qnum: null,
  point: "页式地址变换", related: null,
  stem: "某页式存储系统，页面大小为4KB，逻辑地址为十六进制5A29H，则页号和页内偏移分别是（）。",
  options: ["页号5，偏移A29H", "页号5A，偏移29H", "页号B，偏移229H", "页号16，偏移A29H"],
  answer: 0,
  explain: "页面4KB=2^12B，低12位为偏移。5A29H中低12位=A29H，高位=5H。页号5，偏移A29H。"
},
{
  id: "ch1-s-101", chapter: "ch1", kind: "similar", exam: "", qnum: null,
  point: "段式地址变换", related: null,
  stem: "段式存储中，逻辑地址由段号和段内偏移组成。若段号2对应的段表项中基址为4000H、段长为1000H，则逻辑地址(2, 0800H)对应的物理地址是（）。",
  options: ["4800H", "2800H", "越界中断", "0800H"],
  answer: 0,
  explain: "偏移0800H < 段长1000H，不越界。物理地址=基址+偏移=4000H+0800H=4800H。"
},
{
  id: "ch1-s-102", chapter: "ch1", kind: "similar", exam: "", qnum: null,
  point: "中断处理过程", related: null,
  stem: "以下关于中断处理的叙述中，正确的是（）。\n① 中断向量是中断服务程序的入口地址\n② CPU在执行指令的任意时刻都能响应中断\n③ 中断响应由硬件完成，中断处理由软件完成\n④ 多重中断通过屏蔽字实现优先级控制",
  options: ["①③④", "①②③", "②③④", "①②④"],
  answer: 0,
  explain: "②错：CPU在当前指令执行完才检查并响应中断（指令周期末尾），不是任意时刻。"
},
{
  id: "ch1-s-103", chapter: "ch1", kind: "similar", exam: "", qnum: null,
  point: "DMA工作原理", related: null,
  stem: "DMA方式与中断方式的主要区别是（）。",
  options: ["DMA不需要CPU参与任何工作", "DMA以数据块为单位传输，中断以字节为单位", "DMA传输前后需要CPU介入，传输过程中不需要", "中断方式不能用于磁盘"],
  answer: 2,
  explain: "DMA初始化和结束需CPU设置参数、处理中断；传输过程由DMA控制器直接访存，CPU不干预。中断方式每传一字节都要CPU执行。"
},
{
  id: "ch1-s-104", chapter: "ch1", kind: "similar", exam: "", qnum: null,
  point: "原码/反码/补码转换", related: "ch1-o-52",
  stem: "真值-53用8位补码表示为（）。",
  options: ["11001011", "11001010", "10110101", "11001101"],
  answer: 0,
  explain: "+53=00110101，取反=11001010，+1=11001011。注意移码=补码符号位取反=01001011。"
},
{
  id: "ch1-s-105", chapter: "ch1", kind: "similar", exam: "", qnum: null,
  point: "浮点数溢出", related: null,
  stem: "浮点数运算中，若阶码上溢则结果为（）；若尾数下溢（规格化后尾数为0）则结果处理为（）。",
  options: ["溢出异常；机器零", "机器零；溢出异常", "正无穷；负无穷", "规格化后继续运算；中断"],
  answer: 0,
  explain: "阶码上溢表示数太大，报溢出。尾数下溢表示精度丢失到0，按机器零处理。"
},
{
  id: "ch1-s-106", chapter: "ch1", kind: "similar", exam: "", qnum: null,
  point: "Cache命中率", related: "ch1-o-34",
  stem: "CPU执行某程序共访存8000次，其中6400次命中Cache。命中时总耗时10ns，未命中时总耗时80ns（已包括Cache查询时间），则平均存取时间为（）。",
  options: ["24ns", "10ns", "80ns", "38ns"],
  answer: 0,
  explain: "命中率H=6400/8000=0.8。平均时间=0.8×10+0.2×80=8+16=24ns。"
},
{
  id: "ch1-s-107", chapter: "ch1", kind: "similar", exam: "", qnum: null,
  point: "流水线吞吐率", related: null,
  stem: "某指令流水线分5段，每段时间均为Δt。连续执行100条指令的吞吐率最接近（）。",
  options: ["1/(5Δt)", "100/(104Δt)", "1/Δt", "100/(500Δt)"],
  answer: 1,
  explain: "流水线完成n条指令耗时=(k+n-1)Δt=(5+99)Δt=104Δt。吞吐率=100/104Δt≈1/Δt。B最精确。"
},
{
  id: "ch1-s-108", chapter: "ch1", kind: "similar", exam: "", qnum: null,
  point: "流水线加速比", related: null,
  stem: "某指令流水线分5段，每段时间均为Δt，无停顿地连续执行100条指令。与按相同5段串行执行这100条指令相比，流水线加速比约为（）。",
  options: ["5.0", "4.81", "100", "1.0"],
  answer: 1,
  explain: "无流水线耗时=100×5Δt=500Δt。流水线=104Δt。加速比=500/104≈4.81。理想极限为段数k=5。"
},
{
  id: "ch1-s-109", chapter: "ch1", kind: "similar", exam: "", qnum: null,
  point: "总线仲裁", related: null,
  stem: "以下总线仲裁方式中，（）的优先级固定且离总线仲裁器越近优先级越高。",
  options: ["计数器定时查询", "独立请求", "链式查询（菊花链）", "分布式仲裁"],
  answer: 2,
  explain: "链式查询（菊花链）：仲裁信号沿链路依次传递，近的先获得，优先级固定。计数器方式可变优先级。独立请求每设备单独请求线。"
},
{
  id: "ch1-s-110", chapter: "ch1", kind: "similar", exam: "", qnum: null,
  point: "CISC与RISC", related: null,
  stem: "以下关于CISC与RISC的叙述中，错误的是（）。",
  options: ["RISC指令长度固定，CISC指令长度可变", "RISC大量使用寄存器，CISC大量使用存储器", "RISC主要靠硬布线控制，CISC多用微程序", "RISC指令种类比CISC更多更复杂"],
  answer: 3,
  explain: "RISC精简指令集，种类少、格式规整。D说RISC更复杂，恰好说反了。"
},
{
  id: "ch1-s-111", chapter: "ch1", kind: "similar", exam: "", qnum: null,
  point: "海明校验码", related: null,
  stem: "对8位数据进行海明编码，最少需要（）位校验位。",
  options: ["3", "4", "5", "8"],
  answer: 1,
  explain: "海明码要求2^r ≥ m+r+1。m=8时：r=3→8<12不够，r=4→16≥13满足。需4位校验位。"
},

// ========== ch2 补充题（ch2-s-100 ~ ch2-s-114）==========
{
  id: "ch2-s-100", chapter: "ch2", kind: "similar", exam: "", qnum: null,
  point: "正规式", related: "ch2-o-65",
  stem: "正规式 (a|b)*abb 所描述的语言是（）。",
  options: ["以abb开头的a、b串", "以abb结尾的a、b串", "仅包含abb的串", "不含连续bb的串"],
  answer: 1,
  explain: "(a|b)*匹配任意a、b串，后接abb，故整体是以abb结尾的所有a、b串。"
},
{
  id: "ch2-s-101", chapter: "ch2", kind: "similar", exam: "", qnum: null,
  point: "文法类型判定", related: null,
  stem: "文法G：S→aSb | ab，该文法属于（）。",
  options: ["0型（短语结构文法）", "1型（上下文有关）", "2型（上下文无关）", "3型（正规文法）"],
  answer: 2,
  explain: "每个产生式左部都是单个非终结符，属2型（CFG）。3型要求右部最多一个非终结符且在最右（或最左），aSb不满足。"
},
{
  id: "ch2-s-102", chapter: "ch2", kind: "similar", exam: "", qnum: null,
  point: "LL(1)分析", related: null,
  stem: "以下关于LL(1)文法的叙述中，错误的是（）。",
  options: ["LL(1)文法不含左递归", "LL(1)文法不含回溯", "所有二义性文法都是LL(1)文法", "LL(1)文法同一非终结符各产生式的FIRST集两两不交"],
  answer: 2,
  explain: "二义性文法不可能是任何确定性分析文法。LL(1)要求无左递归、无回溯、FIRST集不交（含FOLLOW条件）。"
},
{
  id: "ch2-s-103", chapter: "ch2", kind: "similar", exam: "", qnum: null,
  point: "LR分析", related: null,
  stem: "LR分析法的\"L\"和\"R\"分别表示（）。",
  options: ["从左到右扫描、最左推导", "从左到右扫描、最右推导的逆", "从右到左扫描、最左推导", "从左到右扫描、最右推导"],
  answer: 1,
  explain: "L=Left-to-right scan，R=Rightmost derivation in reverse（规范归约=最右推导的逆过程）。"
},
{
  id: "ch2-s-104", chapter: "ch2", kind: "similar", exam: "", qnum: null,
  point: "后缀表达式", related: null,
  stem: "中缀表达式 a+b*c-d 转换为后缀表达式是（）。",
  options: ["abc*+d-", "ab+c*d-", "abc+*d-", "abcd*+-"],
  answer: 0,
  explain: "优先级：先b*c→bc*，再a+bc*→abc*+，最后-d→abc*+d-。"
},
{
  id: "ch2-s-105", chapter: "ch2", kind: "similar", exam: "", qnum: null,
  point: "传值与传引用", related: null,
  stem: "以下代码（C语言风格）执行后，x的值是（）。\nvoid f(int a) { a = a + 10; }\nint x = 5; f(x);",
  options: ["5", "15", "10", "编译错误"],
  answer: 0,
  explain: "传值调用，形参a是实参x的副本，修改a不影响x。传引用（如指针或引用）才能改原值。"
},
{
  id: "ch2-s-106", chapter: "ch2", kind: "similar", exam: "", qnum: null,
  point: "编译优化", related: null,
  stem: "以下编译优化技术中，（）的作用是消除程序中不会被执行到的代码。",
  options: ["公共子表达式消除", "死代码消除", "循环展开", "强度削弱"],
  answer: 1,
  explain: "死代码消除删除不可达或结果不被使用的代码。公共子表达式消除合并重复计算。强度削弱把乘法变加法。"
},
{
  id: "ch2-s-107", chapter: "ch2", kind: "similar", exam: "", qnum: null,
  point: "Python字典操作", related: null,
  stem: "执行以下Python代码后，d的值是（）。\nd = {'a': 1, 'b': 2}\nd['c'] = 3\ndel d['a']\nprint(d)",
  options: ["{'a': 1, 'b': 2, 'c': 3}", "{'b': 2, 'c': 3}", "{'c': 3}", "KeyError"],
  answer: 1,
  explain: "添加'c':3后删除'a'，剩{'b':2, 'c':3}。del删除已存在的键不会报错。"
},
{
  id: "ch2-s-108", chapter: "ch2", kind: "similar", exam: "", qnum: null,
  point: "Python集合操作", related: null,
  stem: "设 A={1,2,3,4}, B={3,4,5,6}，则 A & B 和 A - B 分别是（）。",
  options: ["{3,4} 和 {1,2}", "{1,2,3,4,5,6} 和 {5,6}", "{3,4} 和 {1,2,5,6}", "{5,6} 和 {1,2}"],
  answer: 0,
  explain: "& 是交集={3,4}；- 是差集=A中去掉B的={1,2}。| 才是并集。^ 是对称差。"
},
{
  id: "ch2-s-109", chapter: "ch2", kind: "similar", exam: "", qnum: null,
  point: "Python lambda/map", related: null,
  stem: "执行以下代码，输出结果是（）。\nprint(list(map(lambda x: x**2, [1,2,3,4])))",
  options: ["[1, 2, 3, 4]", "[1, 4, 9, 16]", "[2, 4, 6, 8]", "报错"],
  answer: 1,
  explain: "lambda x: x**2 对每个元素求平方。map返回迭代器，list转为列表[1,4,9,16]。"
},
{
  id: "ch2-s-110", chapter: "ch2", kind: "similar", exam: "", qnum: null,
  point: "Python filter", related: null,
  stem: "执行以下代码，输出结果是（）。\nprint(list(filter(lambda x: x%2==0, range(1,8))))",
  options: ["[2, 4, 6]", "[1, 3, 5, 7]", "[2, 4, 6, 8]", "[1, 2, 3, 4, 5, 6, 7]"],
  answer: 0,
  explain: "range(1,8)=[1..7]，filter保留偶数，得[2,4,6]。注意range右端开区间不含8。"
},
{
  id: "ch2-s-111", chapter: "ch2", kind: "similar", exam: "", qnum: null,
  point: "Python异常处理", related: null,
  stem: "以下代码的输出是（）。\ntry:\n    print(10/0)\nexcept ZeroDivisionError:\n    print('E')\nfinally:\n    print('F')",
  options: ["E", "F", "E\\nF", "程序崩溃"],
  answer: 2,
  explain: "10/0触发ZeroDivisionError，except捕获打印E，finally无论如何执行打印F。输出E和F两行。"
},
{
  id: "ch2-s-112", chapter: "ch2", kind: "similar", exam: "", qnum: null,
  point: "作用域与生命周期", related: null,
  stem: "以下关于变量作用域和生命周期的叙述中，正确的是（）。",
  options: ["局部变量的作用域是整个程序", "全局变量的生命周期从声明开始到程序结束", "静态局部变量的作用域是全局的", "局部变量的生命周期一定等于其作用域"],
  answer: 1,
  explain: "全局变量生命周期=程序全程。静态局部变量生命周期也是全程，但作用域仍限于函数内。局部变量作用域限于块内。"
},
{
  id: "ch2-s-113", chapter: "ch2", kind: "similar", exam: "", qnum: null,
  point: "前缀表达式", related: null,
  stem: "后缀表达式 6 3 2 - 1 + * 对应的中缀表达式是（）。",
  options: ["6*(3-2+1)", "6*3-2+1", "(6-3)*(2+1)", "6*(3-2)+1"],
  answer: 0,
  explain: "栈模拟：3-2=1，1+1=2，6*2=12。还原中缀：6*((3-2)+1)=6*(3-2+1)。"
},
{
  id: "ch2-s-114", chapter: "ch2", kind: "similar", exam: "", qnum: null,
  point: "Python元组", related: null,
  stem: "以下Python操作中，会报错的是（）。",
  options: ["t = (1, 2, 3); print(t[0])", "t = (1, 2, 3); t[0] = 10", "t = (1,); print(len(t))", "t = (1, [2, 3]); t[1].append(4)"],
  answer: 1,
  explain: "元组不可变，不能赋值t[0]=10。但元组中的可变元素（如列表）本身可修改（D合法）。"
},

// ========== ch3 补充题（ch3-s-100 ~ ch3-s-114）==========
{
  id: "ch3-s-100", chapter: "ch3", kind: "similar", exam: "", qnum: null,
  point: "哈希表线性探测", related: null,
  stem: "哈希表长度为11，哈希函数H(key)=key%11。依次插入关键字{23, 34, 14, 38, 46, 16, 68}，采用线性探测法，则关键字68的存放地址是（）。",
  options: ["5", "6", "7", "8"],
  answer: 2,
  explain: "23%11=1→[1]; 34%11=1冲突→[2]; 14%11=3→[3]; 38%11=5→[5]; 46%11=2冲突→[3]冲突→[4]; 16%11=5冲突→[6]; 68%11=2→[2]占→[3]占→[4]占→[5]占→[6]占→[7]。地址7。"
},
{
  id: "ch3-s-101", chapter: "ch3", kind: "similar", exam: "", qnum: null,
  point: "Prim最小生成树", related: null,
  stem: "用Prim算法从顶点A开始构造最小生成树，图的边为：AB=4, AC=2, BC=3, BD=5, CD=1, DE=6。前3条被选入的边依次是（）。",
  options: ["AC, CD, BC", "AC, CD, DE", "AB, BC, CD", "AC, BC, BD"],
  answer: 0,
  explain: "Prim从A出发：选最小AC=2→集合{A,C}，再选CD=1→{A,C,D}，再选BC=3→{A,C,D,B}。"
},
{
  id: "ch3-s-102", chapter: "ch3", kind: "similar", exam: "", qnum: null,
  point: "Dijkstra最短路径", related: null,
  stem: "用Dijkstra算法求从S到各顶点的最短路径。边权：SA=2, SB=5, AB=1, AC=7, BC=3。从S出发第一步确定的最短路径终点及距离是（）。",
  options: ["A, 距离2", "B, 距离5", "C, 距离7", "B, 距离3"],
  answer: 0,
  explain: "初始dist[A]=2, dist[B]=5, dist[C]=∞。最小为A=2，先确定A。之后更新：dist[B]=min(5,2+1)=3, dist[C]=min(∞,2+7)=9。"
},
{
  id: "ch3-s-103", chapter: "ch3", kind: "similar", exam: "", qnum: null,
  point: "拓扑排序", related: null,
  stem: "有向图中顶点{A,B,C,D,E}，边为A→B, A→C, B→D, C→D, D→E。以下是该图合法拓扑序列的是（）。",
  options: ["A,C,B,D,E", "A,B,D,C,E", "B,A,C,D,E", "A,C,D,B,E"],
  answer: 0,
  explain: "A无前驱先出。B和C均只依赖A可任意序。D依赖B和C须在两者之后。B中D在C之前不行(D依赖C)。D中同理。"
},
{
  id: "ch3-s-104", chapter: "ch3", kind: "similar", exam: "", qnum: null,
  point: "关键路径", related: null,
  stem: "某AOE网有活动：a(1→2)=3, b(1→3)=2, c(2→4)=4, d(3→4)=5, e(4→5)=2。关键路径长度为（）。",
  options: ["9", "11", "7", "10"],
  answer: 0,
  explain: "路径1→2→4→5=3+4+2=9，路径1→3→4→5=2+5+2=9，两条都是关键路径，长度9。"
},
{
  id: "ch3-s-105", chapter: "ch3", kind: "similar", exam: "", qnum: null,
  point: "AVL树旋转", related: null,
  stem: "向空AVL树依次插入3, 2, 1，插入1后需要进行的旋转操作是（）。",
  options: ["左旋", "右旋", "先左后右双旋", "先右后左双旋"],
  answer: 1,
  explain: "3→2→1构成左链，根3的平衡因子=2（左高）。属LL型，对3做右旋，2成为根。"
},
{
  id: "ch3-s-106", chapter: "ch3", kind: "similar", exam: "", qnum: null,
  point: "B树/B+树", related: null,
  stem: "以下关于B树和B+树的叙述中，错误的是（）。",
  options: ["B树所有结点都存放关键字和数据", "B+树所有数据都在叶子结点中", "B+树叶子结点通过指针顺序相连", "B树的叶子结点通过指针顺序相连"],
  answer: 3,
  explain: "B+树叶子用指针串联便于范围查询，B树叶子无此链接。A/B/C均正确。"
},
{
  id: "ch3-s-107", chapter: "ch3", kind: "similar", exam: "", qnum: null,
  point: "堆的插入", related: null,
  stem: "最大堆为{90, 80, 70, 60, 50}（层序），插入85后的层序为（）。",
  options: ["90, 85, 80, 60, 50, 70", "90, 80, 85, 60, 50, 70", "90, 85, 70, 60, 50, 80", "90, 80, 70, 60, 50, 85"],
  answer: 1,
  explain: "下标从1开始，85插入位置6，其父位置3的值为70。交换后85位于位置3，新父位置1的值为90，85<90，停止上浮。层序为90,80,85,60,50,70。"
},
{
  id: "ch3-s-108", chapter: "ch3", kind: "similar", exam: "", qnum: null,
  point: "KMP next数组", related: null,
  stem: "模式串\"abaabcac\"的普通next数组（不是nextval）为（）。下标从1开始，next[1]=0；当j>1时，next[j]等于前j-1个字符的最长相等真前后缀长度加1。",
  options: ["0,1,1,1,2,2,1,2", "0,1,1,1,2,3,1,2", "0,1,0,1,1,2,0,1", "0,1,1,2,2,3,1,2"],
  answer: 3,
  explain: "对j=2至8，前缀a、ab、aba、abaa、abaab、abaabc、abaabca的最长相等真前后缀长度依次为0、0、1、1、2、0、1。各加1，再在开头加next[1]=0，得到0,1,1,2,2,3,1,2。"
},
{
  id: "ch3-s-109", chapter: "ch3", kind: "similar", exam: "", qnum: null,
  point: "时间复杂度", related: null,
  stem: "以下代码段的时间复杂度是（）。\nfor(i=1; i<=n; i*=2)\n  for(j=1; j<=n; j++)\n    x++;",
  options: ["O(n)", "O(n²)", "O(n·log₂n)", "O(log₂n)"],
  answer: 2,
  explain: "外层i每次乘2，执行log₂n次。内层j执行n次。总计O(n·log₂n)。"
},
{
  id: "ch3-s-110", chapter: "ch3", kind: "similar", exam: "", qnum: null,
  point: "快速排序划分", related: null,
  stem: "对序列{49, 38, 65, 97, 76, 13, 27}进行一趟快速排序划分：暂存首元素49作为枢轴，采用挖坑法，先从右向左找小于49的元素填左坑，再从左向右找大于49的元素填右坑，指针相遇后填入枢轴。结果是（）。",
  options: ["27, 38, 13, 49, 76, 97, 65", "13, 27, 38, 49, 97, 76, 65", "27, 38, 13, 49, 65, 97, 76", "38, 13, 27, 49, 76, 97, 65"],
  answer: 0,
  explain: "暂存49后，27填入首位的坑，65填入末位的坑；随后13填入原65的位置，97填入原13的位置。两个指针在第4个位置相遇，填入49，得到27,38,13,49,76,97,65。划分后的具体排列依赖所采用的划分算法。"
},
{
  id: "ch3-s-111", chapter: "ch3", kind: "similar", exam: "", qnum: null,
  point: "完全二叉树性质", related: null,
  stem: "一棵完全二叉树有700个结点，则它有（）个叶子结点。",
  options: ["349", "350", "351", "348"],
  answer: 1,
  explain: "n=700为偶数，说明有1个度为1的结点。n₀=n₂+1，n₂=n-n₁-n₀。由n₀+n₁+n₂=700且n₁=1得n₀+n₂=699，n₀=n₂+1→2n₀=700→n₀=350。"
},
{
  id: "ch3-s-112", chapter: "ch3", kind: "similar", exam: "", qnum: null,
  point: "栈应用-括号匹配", related: null,
  stem: "用栈检查括号匹配，对字符串\"([{}])\"，栈中元素最多时栈内从底到顶依次是（）。",
  options: ["( [ {", "{ [ (", "( {", "( [ { }"],
  answer: 0,
  explain: "依次入栈(、[、{，此时栈最深为3。遇}与{匹配出栈，后续]、)依次匹配。"
},
{
  id: "ch3-s-113", chapter: "ch3", kind: "similar", exam: "", qnum: null,
  point: "哈希表链地址法", related: null,
  stem: "哈希函数H(key)=key%7，用链地址法处理冲突。依次插入{15, 22, 29, 36, 10}后，地址1处链表的结点数为（）。",
  options: ["2", "3", "4", "5"],
  answer: 2,
  explain: "15%7=1, 22%7=1, 29%7=1, 36%7=1, 10%7=3。地址1处有15,22,29,36共4个结点。"
},
{
  id: "ch3-s-114", chapter: "ch3", kind: "similar", exam: "", qnum: null,
  point: "队列应用", related: null,
  stem: "以下应用场景中，最适合使用队列结构的是（）。",
  options: ["撤销操作（Undo）", "函数递归调用", "操作系统作业调度（FCFS）", "表达式求值"],
  answer: 2,
  explain: "FCFS先来先服务是典型队列（FIFO）。撤销用栈；递归用系统栈；表达式求值用栈+运算符栈。"
},

// ========== ch4 补充题（ch4-s-100 ~ ch4-s-115）==========
{
  id: "ch4-s-100", chapter: "ch4", kind: "similar", exam: "", qnum: null,
  point: "PV操作", related: null,
  stem: "有一个缓冲区（大小为5），初始为空。信号量mutex=1, empty=5, full=0。生产者放入3个产品后，消费者取走1个。此时empty和full的值分别是（）。",
  options: ["3, 2", "2, 3", "4, 1", "3, 3"],
  answer: 0,
  explain: "初始empty=5,full=0。生产3个：empty=5-3=2,full=0+3=3。消费1个：empty=2+1=3,full=3-1=2。结果empty=3,full=2。"
},
{
  id: "ch4-s-101", chapter: "ch4", kind: "similar", exam: "", qnum: null,
  point: "银行家算法", related: null,
  stem: "系统有A、B两类资源，数量分别为6和4。当前分配如下：\nP1: 已分配(2,1)，最大需求(3,2)\nP2: 已分配(1,2)，最大需求(4,3)\nP3: 已分配(1,1)，最大需求(2,2)\n当前剩余(2,0)，该状态是否安全？若安全，一个安全序列是（）。",
  options: ["不安全", "P1→P3→P2", "P3→P1→P2", "P2→P1→P3"],
  answer: 0,
  explain: "Need: P1(1,1), P2(3,1), P3(1,1)。Available=(2,0)，三个进程都需B≥1但剩余B=0，没有任何进程能满足，不安全。"
},
{
  id: "ch4-s-102", chapter: "ch4", kind: "similar", exam: "", qnum: null,
  point: "磁盘调度SCAN", related: null,
  stem: "磁盘当前磁头在53号磁道，向磁道号增大方向移动（最大磁道199）。请求队列为{98, 183, 37, 122, 14, 124, 65, 67}。采用SCAN算法，磁头移动的总磁道数为（）。",
  options: ["236", "299", "331", "353"],
  answer: 2,
  explain: "SCAN向外到尽头再折返。53→199(146)，折返199→14(185)。总=146+185=331。依次经过65,67,98,122,124,183,199折返→37→14。"
},
{
  id: "ch4-s-103", chapter: "ch4", kind: "similar", exam: "", qnum: null,
  point: "页面置换FIFO", related: null,
  stem: "某系统分配3个物理块，页面引用串为1,2,3,4,1,2,5,1,2,3,4,5。采用FIFO算法，缺页次数为（）。",
  options: ["9", "10", "6", "4"],
  answer: 0,
  explain: "FIFO 3块：1✗[1] 2✗[1,2] 3✗[1,2,3] 4✗[2,3,4] 1✗[3,4,1] 2✗[4,1,2] 5✗[1,2,5] 1✓ 2✓ 3✗[2,5,3] 4✗[5,3,4] 5✓。缺页=9次。"
},
{
  id: "ch4-s-104", chapter: "ch4", kind: "similar", exam: "", qnum: null,
  point: "Belady异常", related: null,
  stem: "以下关于Belady异常的叙述中，正确的是（）。",
  options: ["所有页面置换算法都可能出现Belady异常", "LRU算法可能出现Belady异常", "FIFO算法可能出现Belady异常", "OPT算法可能出现Belady异常"],
  answer: 2,
  explain: "Belady异常：物理块增多但缺页反而增多。只有FIFO等非栈式算法会出现。LRU和OPT属栈式算法，不会。"
},
{
  id: "ch4-s-105", chapter: "ch4", kind: "similar", exam: "", qnum: null,
  point: "页面置换LRU", related: null,
  stem: "分配3个物理块，页面引用串为7,0,1,2,0,3,0,4。采用LRU算法，缺页次数为（）。",
  options: ["6", "5", "7", "8"],
  answer: 0,
  explain: "7✗[7] 0✗[7,0] 1✗[7,0,1] 2✗[0,1,2](淘汰7) 0✓ 3✗[0,2,3](淘汰1,LRU为1) 0✓ 4✗[0,3,4](淘汰2)。缺页=6。"
},
{
  id: "ch4-s-106", chapter: "ch4", kind: "similar", exam: "", qnum: null,
  point: "段页式地址变换", related: null,
  stem: "段页式存储中，段表和一级页表均驻主存，段表基址已在寄存器中，无TLB或其他缓存命中、无缺页。完成一次地址转换并读取一个不跨页的操作数，共需要访问（）次主存。",
  options: ["1", "2", "3", "4"],
  answer: 2,
  explain: "第1次查段表获取页表起址→第2次查页表获取物理块号→第3次访问目标单元。共3次。页式2次，段式2次，段页式3次。"
},
{
  id: "ch4-s-107", chapter: "ch4", kind: "similar", exam: "", qnum: null,
  point: "位示图", related: null,
  stem: "某磁盘有4096个盘块，用位示图管理空闲空间。若字长为32位，则位示图需要（）个字。",
  options: ["128", "256", "512", "4096"],
  answer: 0,
  explain: "每位对应一个盘块，4096/32=128个字。"
},
{
  id: "ch4-s-108", chapter: "ch4", kind: "similar", exam: "", qnum: null,
  point: "索引节点", related: null,
  stem: "某文件系统的索引节点含10个直接块号、1个一次间接块号。磁盘块大小4KB，块号占4B。则单个文件最大大小为（）。",
  options: ["10×4KB + 1024×4KB", "10×4KB + 4KB", "10×4KB + 256×4KB", "10×4KB"],
  answer: 0,
  explain: "直接：10×4KB。一次间接：一个块可存4KB/4B=1024个块号→1024×4KB。总计(10+1024)×4KB。"
},
{
  id: "ch4-s-109", chapter: "ch4", kind: "similar", exam: "", qnum: null,
  point: "进程同步-管程", related: null,
  stem: "以下关于管程的叙述中，错误的是（）。",
  options: ["管程把共享数据和操作封装在一起", "同一时刻可以有多个进程在管程内执行", "管程内可以使用条件变量实现进程同步", "管程是一种高级同步机制"],
  answer: 1,
  explain: "管程的核心特性是互斥：同一时刻只允许一个进程进入管程执行。B错误。"
},
{
  id: "ch4-s-110", chapter: "ch4", kind: "similar", exam: "", qnum: null,
  point: "I/O控制方式", related: "ch4-o-18",
  stem: "以下I/O控制方式中，CPU利用率从低到高排序正确的是（）。",
  options: ["程序查询 < 中断 < DMA < 通道", "中断 < 程序查询 < DMA < 通道", "DMA < 中断 < 程序查询 < 通道", "程序查询 < DMA < 中断 < 通道"],
  answer: 0,
  explain: "程序查询CPU忙等最浪费；中断每字节中断一次；DMA块传输期间CPU可做别的；通道有独立处理器。"
},
{
  id: "ch4-s-111", chapter: "ch4", kind: "similar", exam: "", qnum: null,
  point: "作业调度SJF", related: null,
  stem: "有4个作业同时到达：J1(服务时间8), J2(4), J3(2), J4(6)。采用SJF调度，平均周转时间是（）。",
  options: ["10", "11", "12.5", "8"],
  answer: 0,
  explain: "SJF顺序：J3(2)→J2(4)→J4(6)→J1(8)。周转时间：J3=2, J2=6, J4=12, J1=20。平均=(2+6+12+20)/4=40/4=10。"
},
{
  id: "ch4-s-112", chapter: "ch4", kind: "similar", exam: "", qnum: null,
  point: "HRRN调度", related: null,
  stem: "作业调度采用HRRN（高响应比优先），响应比相同时按先来先服务选择。当前时刻=5，有两个尚未运行的就绪作业：\nJ1: 到达时刻1，服务时间4\nJ2: 到达时刻3，服务时间2\n下一个被调度的是（）。",
  options: ["J1，响应比2.0", "J2，响应比2.0", "J1，响应比1.5", "J2，响应比1.5"],
  answer: 0,
  explain: "响应比=(等待+服务)/服务。J1=(4+4)/4=2.0，J2=(2+2)/2=2.0。相同时选先到达的J1。"
},
{
  id: "ch4-s-113", chapter: "ch4", kind: "similar", exam: "", qnum: null,
  point: "磁盘调度SSTF", related: null,
  stem: "磁头当前在100号磁道，请求队列为{55, 90, 120, 160, 38, 184}。采用SSTF算法，依次访问顺序为（）。",
  options: ["90,120,55,38,160,184", "90,55,38,120,160,184", "120,90,55,38,160,184", "90,120,160,184,55,38"],
  answer: 3,
  explain: "SSTF每次选最近的。100→90(距10)，从90：55距35 vs 120距30→选120。从120：160距40 vs 55距65→选160。从160：184距24 vs 55距105→选184。从184：55距129 vs 38距146→选55。55→38。顺序：90,120,160,184,55,38。"
},
{
  id: "ch4-s-114", chapter: "ch4", kind: "similar", exam: "", qnum: null,
  point: "死锁资源计算", related: null,
  stem: "n个进程竞争同一种可重用资源（n≥2，k≥2），每个进程最多需要k个，每次申请1个；进程获得所需资源后能够完成并释放全部资源，且不存在其他资源依赖。无论申请顺序如何，要保证不会发生资源死锁，资源总数最少应为（）。",
  options: ["n×k", "n×(k-1)+1", "n×(k-1)", "k-1"],
  answer: 1,
  explain: "最坏情况：每个进程持有k-1个资源仍不够（共n(k-1)个），只要再多1个资源就能让某进程完成。故m≥n(k-1)+1不死锁。"
},
{
  id: "ch4-s-115", chapter: "ch4", kind: "similar", exam: "", qnum: null,
  point: "进程互斥", related: null,
  stem: "针对同一共享资源，采用互斥锁保护的临界区（未禁止CPU抢占）。以下关于正确的临界区管理要求及执行特性的叙述中，正确的是（）。\n① 同一时刻最多一个进程进入该资源的临界区\n② 不申请进入临界区、正在剩余区执行的进程不应阻止其他进程进入\n③ 申请进入临界区的进程不应无限等待\n④ 持锁执行临界区代码的进程可以被抢占CPU",
  options: ["①②③", "①②③④", "仅①②", "仅①③"],
  answer: 1,
  explain: "①是互斥，②是进展要求，③是有限等待要求；这些是正确临界区管理应满足的要求，并非任意互斥锁都自动保证公平。④也正确：互斥锁不等于禁止CPU抢占，持锁进程被抢占时仍持有锁，其他进程不能因此进入同一资源的临界区。"
}
);
