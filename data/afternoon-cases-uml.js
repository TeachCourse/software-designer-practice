// 原创练习扩展；由入口在 afternoon-cases.js 之后加载，不覆盖已有题库。
window.AFTERNOON_CASES = window.AFTERNOON_CASES || [];
window.AFTERNOON_CASES.push(
  {
    id: "uml-makerspace-ownership",
    type: "uml",
    no: "试题三",
    title: "创客中心的展包与工作坊建模",
    points: 15,
    minutes: 30,
    difficulty: 2,
    difficultyReason: "难度 2：从明确的生命周期和临时使用约束区分四种类关系，并按关联端解释多重度；无需推断未给出的业务规则。",
    kind: "similar",
    seal: "原创题",
    source: "本地原创软件设计师中级下午练习，题干、SVG 与参考答案为本题专门编写；非官方原题，非官方答案或评分标准。",
    intro: "阅读说明及图 3-1，回答三个问题。关系类型、装饰端及多重度均为独立评分项；请按指定格式填写，不需要绘图。",
    story: [
      "某创客中心建设展览与教学管理系统。本图为若干类关系的局部视图，各行独立，省略属性、操作和未涉及的其他关联。英文类名是答题时可直接使用的标识符。",
      "（1）展包 ExhibitPackage 由至少一个展项 ExhibitItem 构成，可以有任意多个展项。每个展项在本系统中只能属于一个展包，不能同时被其他展包拥有，也不允许脱离展包存在；删除展包时其展项全部销毁。本题不考虑转移展项。",
      "（2）实验组 LabGroup 将设备 Device 组织为一个设备集合，是业务上的整体与部分关系，要求在图中显式表达这种弱拥有语义，而非只画普通关联。一个实验组可以暂时没有设备，也可以有任意多个设备；每台设备至多分配给一个实验组，也可未分配。设备独立登记、独立存续，实验组解散时设备仍存在且可重新分配。",
      "（3）IExporter 是接口，声明 export(package) 操作；PdfExporter 是具体类，承诺提供该接口的全部操作。ExportJob 是另一个具体类，其 run(clock) 操作通过参数临时接收 Clock 对象并调用 now()；它不保存 Clock 引用，没有继承 Clock，也没有实现 Clock 的契约。",
      "（4）Member 表示会员，Workshop 表示工作坊。每个会员可以不报名，也可以报名任意多个工作坊；每个工作坊可以尚无人报名，也可以有任意多个会员报名。此处只建模报名关联，不引入报名记录类。",
      "（5）图中 R1～R4 的细实线只是待补全连接的定位骨架，不表示已有的 UML 关系类型；线型、箭头、菱形均有意省略。R5 是已知的无向普通关联。方括号 m1～m5 是关联端多重度空位，填写时必须以靠近该端的类为计数对象。"
    ],
    figures: [
      {
        caption: "图 3-1 类关系局部图（R1～R4 装饰待补，m1～m5 待填）",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 630" class="fig-svg" role="img" aria-label="五行类关系骨架，包含关系与多重度空位">
          <g fill="#fff" stroke="#152536" stroke-width="1.5">
            <rect x="55" y="45" width="235" height="64"/><rect x="610" y="45" width="235" height="64"/>
            <rect x="55" y="165" width="235" height="64"/><rect x="610" y="165" width="235" height="64"/>
            <rect x="55" y="285" width="235" height="64"/><rect x="610" y="285" width="235" height="64"/>
            <rect x="55" y="405" width="235" height="64"/><rect x="610" y="405" width="235" height="64"/>
            <rect x="55" y="525" width="235" height="64"/><rect x="610" y="525" width="235" height="64"/>
            <line data-relation="R1" data-from="ExhibitPackage" data-to="ExhibitItem" x1="290" y1="77" x2="610" y2="77"/>
            <line data-relation="R2" data-from="LabGroup" data-to="Device" x1="290" y1="197" x2="610" y2="197"/>
            <line data-relation="R3" data-from="PdfExporter" data-to="IExporter" x1="290" y1="317" x2="610" y2="317"/>
            <line data-relation="R4" data-from="ExportJob" data-to="Clock" x1="290" y1="437" x2="610" y2="437"/>
            <line data-relation="R5" data-from="Member" data-to="Workshop" x1="290" y1="557" x2="610" y2="557"/>
          </g>
          <g fill="#152536" font-family="Arial, sans-serif" font-size="17" text-anchor="middle">
            <text x="172" y="83">ExhibitPackage</text><text x="727" y="83">ExhibitItem</text>
            <text x="172" y="203">LabGroup</text><text x="727" y="203">Device</text>
            <text x="172" y="323">PdfExporter</text><text x="727" y="310">&lt;&lt;interface&gt;&gt;</text><text x="727" y="336">IExporter</text>
            <text x="172" y="443">ExportJob</text><text x="727" y="443">Clock</text>
            <text x="172" y="563">Member</text><text x="727" y="563">Workshop</text>
            <text x="450" y="64">R1</text><text x="450" y="184">R2</text><text x="450" y="304">R3</text>
            <text x="450" y="424">R4</text><text x="450" y="544">R5: enrolls</text>
            <text x="323" y="99">[m1]</text><text x="577" y="99">[m2]</text>
            <text x="325" y="219">0..1</text><text x="577" y="219">[m5]</text>
            <text x="323" y="579">[m3]</text><text x="577" y="579">[m4]</text>
          </g>
        </svg>`
      }
    ],
    problems: [
      {
        id: "p1",
        title: "【问题 1】（6 分）",
        prompt: "补全整体与部分关系。关系类型填写 UML 术语（组合或聚合等），菱形端填写类名。关系类型各 2 分，菱形端各 1 分。",
        fields: [
          { id: "r1_type", label: "R1 关系类型", type: "text", score: 2, answers: ["组合", "组合关系", "组合聚合", "composition", "Composition"] },
          { id: "r1_whole", label: "R1 菱形所在类", type: "text", match: "identifier", score: 1, answers: ["ExhibitPackage", "展包"] },
          { id: "r2_type", label: "R2 关系类型", type: "text", score: 2, answers: ["聚合", "聚合关系", "共享聚合", "aggregation", "Aggregation", "shared aggregation"] },
          { id: "r2_whole", label: "R2 菱形所在类", type: "text", match: "identifier", score: 1, answers: ["LabGroup", "实验组"] }
        ]
      },
      {
        id: "p2",
        title: "【问题 2】（4 分）",
        prompt: "分别填写 R3、R4 的关系类型以及箭头指向的类或接口名，每空 1 分。方向按 UML 语义确定，不按图的左右位置猜测。",
        fields: [
          { id: "r3_type", label: "R3 关系类型", type: "text", score: 1, answers: ["实现", "实现关系", "接口实现", "realization", "Realization"] },
          { id: "r3_target", label: "R3 箭头指向", type: "text", match: "identifier", score: 1, answers: ["IExporter"] },
          { id: "r4_type", label: "R4 关系类型", type: "text", score: 1, answers: ["依赖", "依赖关系", "dependency", "Dependency"] },
          { id: "r4_target", label: "R4 箭头指向", type: "text", match: "identifier", score: 1, answers: ["Clock"] }
        ]
      },
      {
        id: "p3",
        title: "【问题 3】（5 分）",
        prompt: "填写 m1～m5，每空 1 分。使用 UML 多重度，如 1、0..1、0..*、1..*；不要填写笼统的“多”或 m:n。",
        fields: [
          { id: "m1", label: "m1（ExhibitPackage 端）", type: "text", score: 1, answers: ["1", "1..1"] },
          { id: "m2", label: "m2（ExhibitItem 端）", type: "text", score: 1, answers: ["1..*"] },
          { id: "m3", label: "m3（Member 端）", type: "text", score: 1, answers: ["0..*", "*"] },
          { id: "m4", label: "m4（Workshop 端）", type: "text", score: 1, answers: ["0..*", "*"] },
          { id: "m5", label: "m5（Device 端）", type: "text", score: 1, answers: ["0..*", "*"] }
        ]
      }
    ],
    explain: "R1 是组合，实心菱形位于整体 ExhibitPackage 端：展项独占归属且随整体销毁。R2 是聚合，空心菱形位于 LabGroup 端：题干明确要求弱拥有语义，设备能够独立存续；一般建模中仅凭独立存续并不足以强制使用共享聚合，本题另给出了选用约束。\nR3 为 PdfExporter 到 IExporter 的实现，虚线加空心三角箭头；R4 为 ExportJob 到 Clock 的依赖，虚线加普通开口箭头，不能因调用 now() 就画继承或实现。\nm1=1，m2=1..*。多重度标在被计数的类端，所以 Member 端 m3=0..* 表示一个工作坊可有零到多个会员，Workshop 端 m4=0..* 表示一个会员可报零到多个工作坊，构成多对多。m5=0..*；图上 LabGroup 端的 0..1 表示一台设备至多属于一个实验组。\n自动判分采用明确别名的规范化精确匹配，不进行任意自然语言语义判分。"
  },
  {
    id: "uml-tool-reservation-interactions",
    type: "uml",
    no: "试题三",
    title: "工具预约的用例关系与分支交互",
    points: 15,
    minutes: 30,
    difficulty: 3,
    difficultyReason: "难度 3：需将必经与可选行为映射为相反语义方向的用例关系，再按同步调用返回值补全跨对象消息和互斥守卫，综合两类图而非仅识别符号。",
    kind: "similar",
    seal: "原创题",
    source: "本地原创软件设计师中级下午练习，业务与图形均为独立编写；非官方原题，参考答案非官方评分标准。",
    intro: "阅读说明、图 3-2 和图 3-3，回答三个问题。所有英文名称区分大小写；消息只填操作名（可带空括号），不填编号或实参。",
    story: [
      "某社区工具站开发预约系统。Member 为预约会员；SubmitReservation 表示提交预约，CheckEligibility 表示校验借用资格，EmailReceipt 表示发送邮件回执。每次执行提交预约都必须执行资格校验，资格校验是被复用的必经子行为。",
      "预约成功后，只有会员勾选 needEmail 时才在提交预约用例的 receipt 扩展点追加发送邮件回执；未勾选时，提交预约仍能独立完成。EmailReceipt 是该可选行为，不是提交预约的前置条件。R1 连接 SubmitReservation 与 CheckEligibility，R2 连接 SubmitReservation 与 EmailReceipt；关系构造型和箭头均未绘出。",
      "图 3-3 只展开 SubmitReservation 内部的库存处理片段；开始时资格校验已经通过，不绘制资格校验及邮件分支。对象 member:Member 调用 controller:ReservationController 的 submit(toolId) 开始本片段。",
      "controller 随后同步调用 inventory:Inventory 的 isAvailable(toolId)，库存对象返回布尔量 available。本题假设返回到分支结束期间库存状态不变，不涉及并发抢占。必须先收到该返回值，再选择 alt 的一个操作数。",
      "若 available 为 true，controller 同步调用 ledger:ReservationLedger 的 createReservation(toolId)，由 ledger 创建预约并返回 reservationId，controller 再向 member 返回该编号。若 available 为 false，controller 只向 member 发送 showUnavailable() 提示，不调用 createReservation。",
      "图 3-3 从上到下表示时间推进，M1、M2、M3 的消息名及 G1、G2 的守卫条件留空，其余消息已经给出。G1 是上方操作数，G2 是下方操作数。守卫仅使用 available（可用取反或布尔比较），不要引入 needEmail 等其他变量。"
    ],
    figures: [
      {
        caption: "图 3-2 用例关系局部图（R1、R2 仅为无方向连接骨架）",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 390" class="fig-svg" role="img" aria-label="会员参与提交预约，两个用例关系缺少类型和方向">
          <rect x="195" y="20" width="675" height="345" rx="4" fill="#fff" stroke="#152536" stroke-width="1.5"/>
          <g fill="none" stroke="#152536" stroke-width="1.5">
            <circle cx="95" cy="66" r="15"/>
            <path d="M95 81 V127 M65 100 H125 M95 127 L72 156 M95 127 L118 156"/>
            <line x1="125" y1="100" x2="385" y2="100"/>
            <line data-relation="R1" data-from="SubmitReservation" data-to="CheckEligibility" x1="437" y1="132" x2="345" y2="240"/>
            <line data-relation="R2" data-from="SubmitReservation" data-to="EmailReceipt" x1="593" y1="132" x2="695" y2="240"/>
          </g>
          <g fill="#f3f6fa" stroke="#152536" stroke-width="1.5">
            <ellipse cx="515" cy="100" rx="130" ry="40"/>
            <ellipse cx="345" cy="280" rx="125" ry="40"/>
            <ellipse cx="695" cy="280" rx="125" ry="40"/>
          </g>
          <g fill="#152536" font-family="Arial, sans-serif" font-size="17" text-anchor="middle">
            <text x="95" y="182">Member</text><text x="515" y="106">SubmitReservation</text>
            <text x="345" y="286">CheckEligibility</text><text x="695" y="286">EmailReceipt</text>
            <text x="350" y="192">R1</text><text x="695" y="192">R2</text>
            <text x="740" y="46">Tool Station</text>
          </g>
        </svg>`
      },
      {
        caption: "图 3-3 库存处理顺序图（M1～M3、G1～G2 待填，虚线箭头为返回）",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 670" class="fig-svg" role="img" aria-label="四条生命线与一个含两个操作数的 alt 片段，消息和守卫留空">
          <defs>
            <marker id="uml-reservation-call" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M0 0 L9 5 L0 10 Z" fill="#152536"/></marker>
            <marker id="uml-reservation-return" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M0 0 L9 5 L0 10" fill="none" stroke="#152536"/></marker>
          </defs>
          <g fill="#fff" stroke="#152536" stroke-width="1.5">
            <rect x="25" y="20" width="150" height="60"/><rect x="245" y="20" width="230" height="60"/>
            <rect x="540" y="20" width="180" height="60"/><rect x="750" y="20" width="205" height="60"/>
          </g>
          <g fill="#152536" font-family="Arial, sans-serif" font-size="16" text-anchor="middle">
            <text x="100" y="44">member:</text><text x="100" y="66">Member</text>
            <text x="360" y="44">controller:</text><text x="360" y="66">ReservationController</text>
            <text x="630" y="44">inventory:</text><text x="630" y="66">Inventory</text>
            <text x="852" y="44">ledger:</text><text x="852" y="66">ReservationLedger</text>
          </g>
          <g stroke="#718096" stroke-dasharray="6 5">
            <line x1="100" y1="80" x2="100" y2="640"/><line x1="360" y1="80" x2="360" y2="640"/>
            <line x1="630" y1="80" x2="630" y2="640"/><line x1="852" y1="80" x2="852" y2="640"/>
          </g>
          <g fill="none" stroke="#152536" stroke-width="1.5">
            <line data-message="M1" data-from="member" data-to="controller" x1="100" y1="130" x2="360" y2="130" marker-end="url(#uml-reservation-call)"/>
            <line data-message="M2" data-from="controller" data-to="inventory" x1="360" y1="195" x2="630" y2="195" marker-end="url(#uml-reservation-call)"/>
            <line x1="630" y1="245" x2="360" y2="245" stroke-dasharray="6 4" marker-end="url(#uml-reservation-return)"/>
            <rect x="45" y="280" width="885" height="325"/>
            <path d="M45 311 H94 L110 295 V280"/>
            <line x1="45" y1="465" x2="930" y2="465" stroke-dasharray="7 5"/>
            <line data-message="M3" data-from="controller" data-to="ledger" x1="360" y1="355" x2="852" y2="355" marker-end="url(#uml-reservation-call)"/>
            <line x1="852" y1="400" x2="360" y2="400" stroke-dasharray="6 4" marker-end="url(#uml-reservation-return)"/>
            <line x1="360" y1="443" x2="100" y2="443" stroke-dasharray="6 4" marker-end="url(#uml-reservation-return)"/>
            <line x1="360" y1="555" x2="100" y2="555" marker-end="url(#uml-reservation-call)"/>
          </g>
          <g fill="#152536" font-family="Arial, sans-serif" font-size="16">
            <text x="180" y="118">M1(toolId)</text><text x="440" y="183">M2(toolId)</text>
            <text x="455" y="232">available</text><text x="57" y="301">alt</text>
            <text x="125" y="320">[G1]</text><text x="125" y="500">[G2]</text>
            <text x="495" y="343">M3(toolId)</text><text x="495" y="388">reservationId</text>
            <text x="175" y="431">reservationId</text><text x="145" y="543">showUnavailable()</text>
          </g>
        </svg>`
      }
    ],
    problems: [
      {
        id: "p1",
        title: "【问题 1】（6 分）",
        prompt: "补全 R1、R2 的关系构造型和箭头方向，每空 1 分。构造型填 include 或 extend；起点、终点分别填用例名，不合并成一句话。",
        fields: [
          { id: "r1_stereotype", label: "R1 构造型", type: "text", score: 1, answers: ["include", "<<include>>", "包含", "包含关系"] },
          { id: "r1_from", label: "R1 箭头起点", type: "text", match: "identifier", score: 1, answers: ["SubmitReservation", "提交预约"] },
          { id: "r1_to", label: "R1 箭头终点", type: "text", match: "identifier", score: 1, answers: ["CheckEligibility", "校验借用资格"] },
          { id: "r2_stereotype", label: "R2 构造型", type: "text", score: 1, answers: ["extend", "<<extend>>", "扩展", "扩展关系"] },
          { id: "r2_from", label: "R2 箭头起点", type: "text", match: "identifier", score: 1, answers: ["EmailReceipt", "发送邮件回执"] },
          { id: "r2_to", label: "R2 箭头终点", type: "text", match: "identifier", score: 1, answers: ["SubmitReservation", "提交预约"] }
        ]
      },
      {
        id: "p2",
        title: "【问题 2】（6 分）",
        prompt: "按图上消息的位置填写 M1、M2、M3 的操作名，每空 2 分。仅填说明中的英文操作名，可带空括号，不含实参。",
        fields: [
          { id: "m1_operation", label: "M1", type: "text", match: "identifier", score: 2, answers: ["submit", "submit()"] },
          { id: "m2_operation", label: "M2", type: "text", match: "identifier", score: 2, answers: ["isAvailable", "isAvailable()"] },
          { id: "m3_operation", label: "M3", type: "text", match: "identifier", score: 2, answers: ["createReservation", "createReservation()"] }
        ]
      },
      {
        id: "p3",
        title: "【问题 3】（3 分）",
        prompt: "填写 G1、G2 的守卫（每空 1 分，可带方括号）。最后填写负责实现 M3 所调用操作的类名（1 分），不是发起调用的类名。",
        fields: [
          { id: "g1", label: "G1", type: "text", match: "code", score: 1, answers: ["available", "[available]", "available == true", "[available == true]", "available = true", "[available = true]"] },
          { id: "g2", label: "G2", type: "text", match: "code", score: 1, answers: ["!available", "[!available]", "not available", "[not available]", "available == false", "[available == false]", "available = false", "[available = false]", "else", "[else]"] },
          { id: "m3_owner", label: "M3 操作的实现类", type: "text", match: "identifier", score: 1, answers: ["ReservationLedger"] }
        ]
      }
    ],
    explain: "R1 是 include：SubmitReservation → CheckEligibility，箭头从包含用例指向被包含的必经子用例。R2 是 extend：EmailReceipt → SubmitReservation，箭头从可选扩展用例指向被扩展的基本用例，条件为成功后 needEmail=true，扩展点为 receipt；不能按业务执行先后决定 extend 的箭头方向。两者都用虚线和普通开口箭头。\nM1=submit，接收者为 controller；M2=isAvailable，接收者为 inventory；M3=createReservation，接收者为 ledger。先 M1，再 M2，收到 available 返回值后才选择分支；成功路径才有 M3，失败路径没有 M3。\nG1=available，G2=!available；UML 守卫可写布尔比较。由于 available 是布尔值且只有两个操作数，下方也接受 else，含义是上方守卫不成立，而非无条件执行。成功路径中创建操作返回编号后，controller 才把编号返回给 member。M3 的调用者是 ReservationController，实际实现操作的接收者类是 ReservationLedger。\n题干的资格校验、邮件分支不在库存顺序图片段内，不能凭顺序图省略就认为不用执行。自动判分仅接受列出的明确别名及空白规范化，不提供任意语义相近文本评分。"
  }
);
