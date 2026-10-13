// 原创非官方练习扩展；仅追加数据，须在主库之后加载。
window.AFTERNOON_CASES = window.AFTERNOON_CASES || [];
window.AFTERNOON_CASES.push(
  {
    id: "practice-202609-uml-enrollment",
    type: "uml", no: "试题三", title: "新练习一：场馆课程报名与候补递补",
    points: 15, minutes: 30, difficulty: 3,
    difficultyReason: "难度 3：需在同一业务中协调用例关系方向、实体关联端计数、互斥交互分支及候补递补职责；难点是模型一致性而非记忆图形符号。",
    kind: "similar", seal: "原创题",
    source: "本地原创非官方软件设计师中级下午练习；题干、图形及解析独立编写，非官方原题、非官方答案或评分标准。",
    outlineMapping: "2018 版考试大纲科目2：面向对象分析与设计（用例模型、类模型、交互模型）；对应《软件设计师教程》第5版的面向对象技术、UML 建模内容，不声称为官方指定题型或逐页映射。",
    intro: "阅读说明及图 1-1～1-3，回答四个问题。考查 2018 版大纲科目2面向对象分析与设计，知识对应教程第5版。英文标识符区分大小写；只填指定术语、类名或操作名。",
    story: [
      "社区场馆按具体开课场次管理报名。Member 为会员，CourseSession 为某一次开课场次，Registration 为持久化报名记录。以下规则均为本题业务假设，不推断支付、退费、短信或并发规则。",
      "EnrollCourse（报名课程）每次都执行复用子用例 CheckEligibility（校验资格），不论是否有余位。资格失败即结束；资格通过后，有余位则登记 Confirmed，无余位则返回满员结果，此时基础用例自身已完整。会员本次选择 wantWaitlist=true 且满员时，在 EnrollCourse 的 fullResult 扩展点追加 JoinWaitlist（加入候补）行为；未选择候补时不生成记录。R1、R2 仅为定位骨架，实线不代表 UML 关系，类型、线型和箭头均待补。",
      "每条 Registration 必须且只能属于一个 Member 和一个 CourseSession。会员可以没有记录，也可以有任意多条记录；场次也可以暂时没有记录或有任意多条记录。每个会员在同一场次至多有一条记录，取消后的记录保留且本题不允许再次报名。status 取 Confirmed、Waiting 或 Cancelled；候补记录也属于 Registration，不能把类图多重度当成已确认人数。类图只画两条普通关联，唯一性是附加约束而不是多重度。",
      "图 1-3 只展开资格已通过且 wantWaitlist=true 的一次处理，资格校验已在片段之前完成。member 同步调用 controller.enroll(sessionId)，controller 再同步调用 capacity.hasVacancy(sessionId)，返回布尔值 hasSeat。容量检查到登记结束为一个串行原子业务操作，期间无其他报名或取消，不存在检查后被抢占。",
      "hasSeat=true 时，controller 同步调用 registry.createConfirmed(sessionId)，返回 recordId；否则同步调用 registry.createWaitlist(sessionId)，同样返回 recordId。两种创建互斥，controller 最后向 member 返回该编号。registry:RegistrationRegistry 保存并管理 Registration；图中 M 为消息名空位，G1/G2 只使用 hasSeat 的布尔表达式。上、下操作数分别代表有位、无位。",
      "取消 Confirmed 记录时先改为 Cancelled，随后在同一原子操作中处理本场次候补：有候补则选择 queueNo 最小的 Waiting 记录，将其原记录改为 Confirmed；没有候补则不递补。queueNo 为该场次候补入队时分配的严格递增且唯一的整数，取消 Waiting 只将其改为 Cancelled，不释放已确认名额也不触发递补。",
      "对象职责约定：controller 仅编排，不遍历记录；capacity 仅提供容量信息；registry 拥有查询和变更记录的职责，提供 promoteNext(sessionId) 完成一次选择与原地递补。图 1-3 不展开取消及递补消息，这一职责根据文字独立作答。"
    ],
    figures: [
      {
        caption: "图 1-1 用例局部图（R1、R2 的类型及方向待填）",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 370" class="fig-svg" role="img" aria-label="会员与报名用例关联，两个子行为的关系为待补骨架">
          <rect x="200" y="15" width="735" height="330" fill="#fff" stroke="#24364b"/>
          <g fill="none" stroke="#24364b" stroke-width="1.5">
            <circle cx="85" cy="65" r="14"/><path d="M85 79 V126 M55 98 H115 M85 126 L60 159 M85 126 L110 159"/>
            <path d="M115 98 H420 M500 137 L365 245 M610 137 L755 245"/>
          </g>
          <g fill="#f4f7fb" stroke="#24364b" stroke-width="1.5">
            <ellipse cx="560" cy="98" rx="140" ry="42"/><ellipse cx="365" cy="277" rx="137" ry="38"/><ellipse cx="755" cy="277" rx="137" ry="38"/>
          </g>
          <g fill="#24364b" font-family="Arial, sans-serif" font-size="18" text-anchor="middle">
            <text x="85" y="190">Member</text><text x="560" y="105">EnrollCourse</text>
            <text x="365" y="284">CheckEligibility</text><text x="755" y="284">JoinWaitlist</text>
            <text x="396" y="196">R1</text><text x="723" y="196">R2</text><text x="820" y="43">场馆报名系统</text>
          </g>
        </svg>`
      },
      {
        caption: "图 1-2 类图局部（m1～m4 按所在端计数；仅表示普通关联）",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 270" class="fig-svg" role="img" aria-label="会员、报名记录、开课场次的两条关联及四个多重度空位">
          <g fill="#fff" stroke="#24364b" stroke-width="1.5">
            <rect x="35" y="80" width="190" height="110"/><rect x="390" y="65" width="230" height="140"/><rect x="785" y="80" width="190" height="110"/>
            <path d="M35 122 H225 M390 108 H620 M785 122 H975 M225 140 H390 M620 140 H785"/>
          </g>
          <g fill="#24364b" font-family="Arial, sans-serif" font-size="18" text-anchor="middle">
            <text x="130" y="108">Member</text><text x="505" y="94">Registration</text><text x="880" y="108">CourseSession</text>
            <text x="130" y="159">memberId</text><text x="505" y="137">recordId</text><text x="505" y="165">status</text><text x="505" y="192">queueNo [0..1]</text><text x="880" y="159">sessionId</text>
            <text x="250" y="128">[m1]</text><text x="363" y="128">[m2]</text><text x="758" y="128">[m3]</text><text x="647" y="128">[m4]</text>
            <text x="500" y="246">约束：同一会员与同一场次至多一条记录；仅候补入队记录具有 queueNo。</text>
          </g>
        </svg>`
      },
      {
        caption: "图 1-3 报名顺序图（已通过资格校验且选择候补；虚线箭头为返回）",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1040 700" class="fig-svg" role="img" aria-label="四条生命线，容量返回后进入两操作数 alt 片段，守卫与候补消息待填">
          <defs>
            <marker id="practice-202609-enrollment-call" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M0 0 L9 5 L0 10 Z" fill="#24364b"/></marker>
            <marker id="practice-202609-enrollment-return" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M0 0 L9 5 L0 10" fill="none" stroke="#24364b"/></marker>
          </defs>
          <g fill="#fff" stroke="#24364b">
            <rect x="25" y="20" width="150" height="62"/><rect x="245" y="20" width="240" height="62"/>
            <rect x="555" y="20" width="165" height="62"/><rect x="780" y="20" width="235" height="62"/>
          </g>
          <g fill="#24364b" font-family="Arial, sans-serif" font-size="16" text-anchor="middle">
            <text x="100" y="44">member:</text><text x="100" y="69">Member</text><text x="365" y="44">controller:</text><text x="365" y="69">EnrollmentController</text>
            <text x="637" y="44">capacity:</text><text x="637" y="69">CapacityService</text><text x="897" y="44">registry:</text><text x="897" y="69">RegistrationRegistry</text>
          </g>
          <g stroke="#8291a3" stroke-dasharray="6 5"><path d="M100 82 V670 M365 82 V670 M637 82 V670 M897 82 V670"/></g>
          <g fill="none" stroke="#24364b" stroke-width="1.5" marker-end="url(#practice-202609-enrollment-call)">
            <path d="M100 130 H365"/><path d="M365 190 H637"/><path d="M365 340 H897"/><path d="M365 510 H897"/>
          </g>
          <g fill="none" stroke="#24364b" stroke-width="1.5" stroke-dasharray="6 4" marker-end="url(#practice-202609-enrollment-return)">
            <path d="M637 235 H365"/><path d="M897 385 H365"/><path d="M365 425 H100"/><path d="M897 555 H365"/><path d="M365 595 H100"/>
          </g>
          <g fill="none" stroke="#24364b"><rect x="45" y="265" width="945" height="370"/><path d="M45 294 H87 L102 279 V265"/><path d="M45 450 H990" stroke-dasharray="7 5"/></g>
          <g fill="#24364b" font-family="Arial, sans-serif" font-size="17" text-anchor="middle">
            <text x="231" y="119">enroll(sessionId)</text><text x="501" y="179">hasVacancy(sessionId)</text><text x="501" y="225">容量检查的布尔返回值</text>
            <text x="67" y="285">alt</text><text x="165" y="305">[G1]</text><text x="631" y="329">createConfirmed(sessionId)</text><text x="631" y="375">recordId</text><text x="231" y="415">recordId</text>
            <text x="165" y="481">[G2]</text><text x="631" y="499">M(sessionId)</text><text x="631" y="545">recordId</text><text x="231" y="585">recordId</text>
          </g>
        </svg>`
      }
    ],
    problems: [
      { id: "p1", title: "【问题 1】（4 分）", prompt: "填写 R1、R2 的 UML 用例关系类型和箭头指向的用例名，每空 1 分。类型用 include/extend 或中文术语；两种关系均采用虚线开口箭头。", fields: [
        { id: "r1_type", label: "R1 类型", type: "text", score: 1, answers: ["include", "包含", "包含关系", "<<include>>"] },
        { id: "r1_target", label: "R1 箭头目标", type: "text", match: "identifier", score: 1, answers: ["CheckEligibility", "校验资格"] },
        { id: "r2_type", label: "R2 类型", type: "text", score: 1, answers: ["extend", "扩展", "扩展关系", "<<extend>>"] },
        { id: "r2_target", label: "R2 箭头目标", type: "text", match: "identifier", score: 1, answers: ["EnrollCourse", "报名课程"] }
      ] },
      { id: "p2", title: "【问题 2】（4 分）", prompt: "补全类图 m1～m4，每空 1 分。填写 UML 多重度；注意 m3 位于 CourseSession 端，m4 位于 Registration 端。", fields: [
        { id: "m1", label: "m1（Member 端）", type: "text", score: 1, answers: ["1", "1..1"] },
        { id: "m2", label: "m2（Registration 靠 Member 端）", type: "text", score: 1, answers: ["0..*", "*"] },
        { id: "m3", label: "m3（CourseSession 端）", type: "text", score: 1, answers: ["1", "1..1"] },
        { id: "m4", label: "m4（Registration 靠 CourseSession 端）", type: "text", score: 1, answers: ["0..*", "*"] }
      ] },
      { id: "p3", title: "【问题 3】（4 分）", prompt: "填写 G1、G2（各 1 分，不含外层方括号，只用 hasSeat）及 M 的操作名（2 分，不含实参，可带空括号）。", fields: [
        { id: "seat_guard", label: "G1", type: "text", match: "code", score: 1, answers: ["hasSeat", "hasSeat == true", "hasSeat === true", "true == hasSeat"] },
        { id: "wait_guard", label: "G2", type: "text", match: "code", score: 1, answers: ["!hasSeat", "hasSeat == false", "hasSeat === false", "false == hasSeat"] },
        { id: "wait_message", label: "M", type: "text", match: "identifier", score: 2, answers: ["createWaitlist", "createWaitlist()"] }
      ] },
      { id: "p4", title: "【问题 4】（3 分）", prompt: "为取消已确认报名后的递补确定消息接收对象（填对象名，各对象名见图 1-3）、被选候补记录的目标 status、选择记录时升序排序的属性名，各 1 分。不新增报名记录。", fields: [
        { id: "promotion_receiver", label: "promoteNext 的接收对象", type: "text", match: "identifier", score: 1, answers: ["registry", "registry:RegistrationRegistry"] },
        { id: "promotion_status", label: "递补后的 status", type: "text", match: "identifier", score: 1, answers: ["Confirmed"] },
        { id: "promotion_order", label: "升序排序属性", type: "text", match: "identifier", score: 1, answers: ["queueNo"] }
      ] }
    ],
    explain: "问题1（4分）：R1=include，箭头 EnrollCourse→CheckEligibility，每项1分；复用必经行为从包含者指向被包含者。R2=extend，箭头 JoinWaitlist→EnrollCourse，每项1分；满员且主动选择候补时才在 fullResult 扩展点追加行为。基础用例在不候补时仍可返回满员结果而完整结束。易错：按发生先后画箭头，或者把可选行为误画 include。\n问题2（4分）：m1=1、m2=0..*、m3=1、m4=0..*，各1分。一个记录只关联一名会员、一个场次；固定一名会员或一个场次可观察到零到多条记录。会员与场次二元组唯一不意味着一名会员只能有一条记录；候补和取消记录仍计入关联。易错：倒置端点，将容量限制误写为类图多重度，或用0..1表达每条记录的必需归属。\n问题3（4分）：G1=hasSeat，G2=!hasSeat，各1分；M=createWaitlist，2分。返回值先到达 controller，随后 alt 恰选一个操作数。满员分支没有 createConfirmed；wantWaitlist 在本图前提中已为 true，不应代替容量守卫。同步调用实心箭头、返回虚线开口箭头，题图省略执行规约不改变先后关系。\n问题4（3分）：接收对象 registry，目标 Confirmed，排序属性 queueNo，各1分。限定同场次且 status=Waiting 后取最小 queueNo，原地修改而非新增，既保持一会员一场次唯一性也保留排队顺序。取消候补不递补，因为未释放已确认名额。易错：按 recordId 排序、由 capacity 改记录或在候补间复制报名。\n评分：各字段独立得分，无连带扣分；M是一个2分评分点，自动判分不做内部拆分。明确列出的中英文及符号别名可用，其他同义自然语言需人工复核，不承诺语义识别。"
  },
  {
    id: "practice-202609-uml-repair",
    type: "uml", no: "试题三", title: "新练习二：维修工单流转",
    points: 15, minutes: 30, difficulty: 3,
    difficultyReason: "难度 3：同时推导状态迁移的事件、守卫与效果，追踪返工次数边界和无效事件，并在需求变更中区分状态复用与重新建立工单。",
    kind: "similar", seal: "原创题",
    source: "本地原创非官方软件设计师中级下午练习；业务、SVG 和答案独立创作，非官方原题或评分标准。",
    outlineMapping: "2018 版考试大纲科目2：面向对象分析与设计（动态建模、状态图、需求变化下的模型调整）；对应《软件设计师教程》第5版面向对象技术及 UML 状态建模内容，不对应官方真题。",
    intro: "阅读说明及图 2-1，回答三个问题。考查 2018 版大纲科目2面向对象分析与设计，对应教程第5版。问题1、2按原规则；问题3是独立的新需求，不反向影响前两问。",
    story: [
      "维修中心对单张工单建模。初始伪状态进入 New（新建），reworkCount=0；Assigned（已派单）、Working（维修中）、Review（待验收）、Closed（已关闭）均为普通状态。Closed 既不是终态（FinalState，靶心符号），也不是终止伪状态（terminate，叉号）；原规则只是没有出边。工单对象和历史记录一直保留。",
      "原规则全部迁移如图：New 接收 assign 后到 Assigned；Assigned 接收 start 后到 Working；Working 接收 finish 后到 Review；Review 接收 approve 后到 Closed，或接收 reject 且成功返工次数严格少于2时回到 Working。T 是待填事件名，G 是守卫，A 是效果。approve 与 reject 是两个不同事件，不以一个布尔事件混用。",
      "incrementRework 将 reworkCount 加1并记录日志 incrementRework；resetRework 将该计数清零但不记日志。除这两个操作外没有操作改变计数。原规则只有返工迁移调用 incrementRework，原图不调用 resetRework。Working 的 entry 记录 enterWorking，Review 的 exit 记录 leaveReview；其他进入/退出动作均为空。日志动作不改变状态或计数，也不产生新事件。",
      "全部迁移为外部迁移，没有层次状态、内部迁移、并发区域、完成迁移和延迟事件。单次事件运行至完成后才处理下一个事件；守卫以事件到达时的旧计数求值。没有匹配迁移或守卫为假时，事件直接丢弃，不执行退出、效果或进入动作，不记日志。未画出的边不存在。",
      "新需求仅用于问题3：每轮最多允许3次成功返工；同时增加事件 reopen，由售后在已关闭工单的保修期有效时发送。同一工单重新进入已派单状态，由原维修人员随后接收 start，不能直接开始维修，也不新建工单。新一轮计数必须清零；保修无效时丢弃 reopen。保修输入 warrantyValid 是事件处理期间不变的布尔值，与旧 reworkCount 无关。只增加 Closed 的 reopen 外部迁移并调整返工守卫，其余边保持不变。"
    ],
    figures: [{
      caption: "图 2-1 原规则状态图（T、G、A 待填；Closed 为普通状态）",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 540" class="fig-svg" role="img" aria-label="工单五状态，验收返回维修的事件守卫效果待填，新需求迁移未绘制">
        <defs><marker id="practice-202609-repair-arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M0 0 L9 5 L0 10" fill="none" stroke="#24364b"/></marker></defs>
        <g fill="#fff" stroke="#24364b" stroke-width="1.5">
          <circle data-node="Initial" cx="35" cy="125" r="10" fill="#24364b"/>
          <rect data-node="New" x="90" y="80" width="180" height="90" rx="15"/>
          <rect data-node="Assigned" x="400" y="80" width="200" height="90" rx="15"/>
          <rect data-node="Working" x="770" y="70" width="280" height="110" rx="15"/>
          <rect data-node="Review" x="770" y="365" width="280" height="110" rx="15"/>
          <rect data-node="Closed" x="400" y="375" width="200" height="90" rx="15"/>
          <path d="M770 112 H1050 M770 407 H1050"/>
        </g>
        <g fill="none" stroke="#24364b" stroke-width="1.5">
          <path data-edge="initial" data-from="Initial" data-to="New" d="M45 125 H90" marker-end="url(#practice-202609-repair-arrow)"/>
          <path data-edge="assign" data-from="New" data-to="Assigned" d="M270 125 H400" marker-end="url(#practice-202609-repair-arrow)"/>
          <path data-edge="start" data-from="Assigned" data-to="Working" d="M600 125 H770" marker-end="url(#practice-202609-repair-arrow)"/>
          <path data-edge="finish" data-from="Working" data-to="Review" d="M990 180 V365" marker-end="url(#practice-202609-repair-arrow)"/>
          <path data-edge="T" data-from="Review" data-to="Working" d="M820 365 V180" marker-end="url(#practice-202609-repair-arrow)"/>
          <path data-edge="approve" data-from="Review" data-to="Closed" d="M770 420 H600" marker-end="url(#practice-202609-repair-arrow)"/>
        </g>
        <g fill="#24364b" font-family="Arial, sans-serif" font-size="18" text-anchor="middle">
          <text x="180" y="132">New</text><text x="500" y="132">Assigned</text><text x="910" y="99">Working</text>
          <text x="910" y="151">entry / enterWorking</text><text x="910" y="394">Review</text><text x="910" y="446">exit / leaveReview</text>
          <text x="500" y="427">Closed</text><text x="335" y="112">assign</text><text x="685" y="112">start</text>
          <text x="1030" y="279">finish</text><text x="721" y="279">T [G] / A</text><text x="685" y="407">approve</text>
          <text x="330" y="510">仅绘制原规则；问题3要求的新迁移不在图中。</text>
        </g>
      </svg>`
    }],
    problems: [
      { id: "p1", title: "【问题 1】（5 分）", prompt: "填 T（1分）、G（1分，仅用 reworkCount 与整数2比较）、A（1分，操作名可带空括号）。另设当前 Review、reworkCount=1、日志为空，成功处理一次 T 时追加的完整日志序列是什么（2分，英文逗号按顺序分隔）？", fields: [
        { id: "reject_event", label: "T 事件名", type: "text", match: "identifier", score: 1, answers: ["reject"] },
        { id: "reject_guard", label: "G（不含外层方括号）", type: "text", match: "code", score: 1, answers: ["reworkCount < 2", "2 > reworkCount"] },
        { id: "reject_effect", label: "A", type: "text", match: "identifier", score: 1, answers: ["incrementRework", "incrementRework()"] },
        { id: "action_order", label: "本次迁移的日志序列", type: "text", score: 2, answers: ["leaveReview,incrementRework,enterWorking"] }
      ] },
      { id: "p2", title: "【问题 2】（5 分）", prompt: "从初始条件依次处理 assign, start, finish, reject, finish, reject, finish, reject, approve。填最终状态（2分）、最终 reworkCount（1分）、所有被丢弃的事件编号（2分，编号从1开始，多个时逗号分隔，顺序不限）。", fields: [
        { id: "trace_state", label: "最终状态", type: "text", match: "identifier", score: 2, answers: ["Closed"] },
        { id: "trace_count", label: "最终 reworkCount", type: "text", score: 1, answers: ["2"] },
        { id: "trace_dropped", label: "被丢弃事件编号集合", type: "text", match: "set", score: 2, answers: ["8"] }
      ] },
      { id: "p3", title: "【问题 3】（5 分）", prompt: "按新需求填写返工迁移的新守卫（2分，仅用 reworkCount 与整数3比较）。新增外部迁移的源状态已确定为 Closed，守卫已确定为 warrantyValid；填写其事件名、目标状态、计数重置效果名（各1分）。", fields: [
        { id: "changed_guard", label: "新的返工守卫（不含方括号）", type: "text", match: "code", score: 2, answers: ["reworkCount < 3", "3 > reworkCount"] },
        { id: "reopen_event", label: "新迁移事件名", type: "text", match: "identifier", score: 1, answers: ["reopen"] },
        { id: "reopen_target", label: "新迁移目标状态", type: "text", match: "identifier", score: 1, answers: ["Assigned"] },
        { id: "reopen_effect", label: "新迁移效果操作名", type: "text", match: "identifier", score: 1, answers: ["resetRework", "resetRework()"] }
      ] }
    ],
    explain: "问题1（5分）：T=reject、G=reworkCount < 2、A=incrementRework，各1分。一次成功迁移按源状态exit→迁移效果→目标状态entry执行，日志为 leaveReview,incrementRework,enterWorking，序列整体2分。守卫在退出之前用旧值1求值，效果将计数变为2，不会因新值达到上限而撤销本次迁移。易错：先加一再判断、交换效果与entry、守卫假时仍执行exit。\n问题2（5分）：初始 New/0；事件1后 Assigned/0，2后 Working/0，3后 Review/0，4后 Working/1，5后 Review/1，6后 Working/2，7后 Review/2。事件8的reject守卫为假，丢弃且仍为Review/2；事件9的approve无该返工守卫限制，转入Closed/2。最终状态Closed得2分、计数2得1分、丢弃集合8得2分。易错：把达到返工上限误解为禁止验收通过，或者在finish、approve时擅自清零。\n问题3（5分）：返工守卫改为 reworkCount < 3（2分）；新增 Closed -- reopen [warrantyValid] / resetRework --> Assigned，事件、目标、效果各1分。Assigned保留派单语义，仍需start才进入Working；不是回New重建对象，也不是直接进入Working。Closed必须保持普通状态，不能画成终止伪状态后再加出边。保修为假时完全不迁移，不清零；保修为真时清零开始新轮，再允许最多三次成功返工。易错：写成<=3导致允许第四次返工，给所有状态加reopen，或每次finish都重置使次数限制失效。\n评分：各字段独立计分；日志及编号集合各自为整体评分点，不按字符拆分。状态及操作标识符区分大小写，接受明确列出的符号/操作别名；自然语言同义答案需人工复核。本评分方案为原创练习参考，非官方标准。"
  }
);
