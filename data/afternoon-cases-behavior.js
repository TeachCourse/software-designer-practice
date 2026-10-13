// 原创非官方练习；追加加载，不覆盖主库。图中仅保留待填编号。
window.AFTERNOON_CASES = window.AFTERNOON_CASES || [];
window.AFTERNOON_CASES.push(
  {
    id: "uml-scanner-state-original",
    type: "uml", no: "试题三", title: "档案扫描任务的暂停与恢复状态机",
    points: 15, minutes: 30, difficulty: 3,
    difficultyReason: "难度 3：需结合事件、守卫和外部迁移执行次序追踪有界计数器，并区分无效事件与实际迁移；两个轨迹独立评分。",
    kind: "similar", seal: "原创题",
    source: "本地原创非官方软件设计师下午练习；情境、SVG、答案均独立编写，非官方原题或评分标准。",
    intro: "阅读说明及图 3-1，完成三个问题。标识符区分大小写；序列用英文逗号分隔，事件编号从 1 开始。",
    story: [
      "档案站用平面 UML 状态机管理单个扫描任务。初始伪状态进入 Idle，retryCount 初值为 0。Running 表示正在扫描，Paused 表示暂停，Finished 表示本轮已完成的普通状态（不是终止伪状态）。",
      "图中迁移是本模型的全部迁移，均为外部迁移；没有层次状态、自动完成迁移、延迟事件或并发区域。事件按给定顺序逐个处理完毕，不会在一次迁移中插入新事件。没有匹配迁移或守卫为假时，直接丢弃事件，不改状态、计数器和日志，也不执行退出或进入动作。",
      "Idle 收到 start 进入 Running；Running 收到 pause 进入 Paused，收到 finish 进入 Finished。Paused 只有收到 resume 且已成功恢复的次数严格少于 2 时才能回到 Running，此迁移守卫为 G，效果为 A。Finished 只有收到 reset 才回 Idle。",
      "动作 incrementRetry 将 retryCount 加 1，并向日志追加名称 incrementRetry；resetRetry 将 retryCount 置 0，不记日志。除这两个动作外，任何操作都不改变计数器。不得因 start、pause、finish 或进入某状态而自行清零。",
      "Running 的 entry 动作向日志追加 enterRunning，exit 动作追加 leaveRunning；Paused 的 exit 动作追加 leavePaused。Idle、Finished 无 entry/exit 动作，Paused 无 entry 动作。日志动作均不改变计数器或触发事件。",
      "守卫以事件到达时的计数器值求值。迁移被选中后按 UML 外部迁移规则完成源状态退出、迁移效果、目标状态进入。图中没有 / 的边无迁移效果。G 只用 retryCount 与整数 2 比较，A 只填一个已定义动作名。每个问题中的轨迹均独立从初始条件开始。"
    ],
    figures: [{
      caption: "图 3-1 扫描任务状态图（G 为守卫空位，A 为效果空位）",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 560" class="fig-svg" role="img" aria-label="扫描任务四状态图，恢复迁移的守卫和效果待填">
        <defs><marker id="behavior-scanner-arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M0 0 L9 5 L0 10" fill="none" stroke="#152536"/></marker></defs>
        <g fill="#fff" stroke="#152536" stroke-width="1.5">
          <rect data-node="Idle" x="100" y="100" width="200" height="110" rx="16"/>
          <rect data-node="Running" x="570" y="100" width="330" height="110" rx="16"/>
          <rect data-node="Paused" x="570" y="370" width="330" height="110" rx="16"/>
          <rect data-node="Finished" x="100" y="370" width="200" height="110" rx="16"/>
          <path d="M100 136 H300 M570 136 H900 M570 406 H900 M100 406 H300"/>
          <circle data-node="Initial" cx="40" cy="155" r="10" fill="#152536"/>
        </g>
        <g fill="none" stroke="#152536" stroke-width="1.5" marker-end="url(#behavior-scanner-arrow)">
          <path data-edge="initial" data-from="Initial" data-to="Idle" d="M50 155 H100"/>
          <path data-edge="start" data-from="Idle" data-to="Running" d="M300 155 H570"/>
          <path data-edge="pause" data-from="Running" data-to="Paused" d="M800 210 V370"/>
          <path data-edge="resume" data-from="Paused" data-to="Running" d="M630 370 V210"/>
          <path data-edge="finish" data-from="Running" data-to="Finished" d="M570 190 H430 V425 H300"/>
          <path data-edge="reset" data-from="Finished" data-to="Idle" d="M200 370 V210"/>
        </g>
        <g fill="#152536" font-family="Arial, sans-serif" font-size="17" text-anchor="middle">
          <text x="200" y="125">Idle</text><text x="735" y="125">Running</text>
          <text x="735" y="166">entry / enterRunning</text><text x="735" y="195">exit / leaveRunning</text>
          <text x="735" y="395">Paused</text><text x="735" y="443">exit / leavePaused</text>
          <text x="200" y="395">Finished</text><text x="430" y="140">start</text>
          <text x="850" y="286">pause</text><text x="502" y="273">resume [G] / A</text>
          <text x="470" y="345">finish</text>
          <text x="100" y="277">reset /</text><text x="100" y="302">resetRetry</text>
        </g>
      </svg>`
    }],
    problems: [
      { id: "transition-semantics", title: "【问题 1】（5 分）", prompt: "补全 G（2 分）、A（1 分）。另设当前为 Paused、retryCount=1、日志为空，处理一次 resume，填写这一次迁移追加的完整日志序列（2 分），不含此前日志。", fields: [
        { id: "resume-guard", label: "G（不含外层方括号）", type: "text", match: "code", score: 2, answers: ["retryCount < 2", "2 > retryCount"] },
        { id: "resume-effect", label: "A（动作名）", type: "text", match: "identifier", score: 1, answers: ["incrementRetry", "incrementRetry()"] },
        { id: "resume-action-order", label: "一次成功 resume 的日志序列", type: "text", match: "text", score: 2, answers: ["leavePaused,incrementRetry,enterRunning"] }
      ] },
      { id: "bounded-retries", title: "【问题 2】（5 分）", prompt: "从初始条件依次处理：start, pause, resume, pause, resume, pause, resume, finish。填写最终状态（2 分）、最终 retryCount（1 分）和所有被丢弃事件的编号集合（2 分，逗号分隔，顺序不限）。", fields: [
        { id: "retry-trace-state", label: "最终状态", type: "text", match: "identifier", score: 2, answers: ["Paused"] },
        { id: "retry-trace-count", label: "最终 retryCount", type: "text", match: "text", score: 1, answers: ["2"] },
        { id: "retry-trace-invalid", label: "被丢弃事件编号集合", type: "text", match: "set", score: 2, answers: ["7,8"] }
      ] },
      { id: "reset-and-invalid", title: "【问题 3】（5 分）", prompt: "独立从初始条件处理 start, pause, resume, finish, reset, resume。填写最终状态、计数器、被丢弃事件编号（各 1 分）。另问 finish 事件仅能在哪个源状态触发迁移（2 分）？", fields: [
        { id: "reset-trace-state", label: "最终状态", type: "text", match: "identifier", score: 1, answers: ["Idle"] },
        { id: "reset-trace-count", label: "最终 retryCount", type: "text", match: "text", score: 1, answers: ["0"] },
        { id: "reset-trace-invalid", label: "被丢弃事件编号", type: "text", match: "text", score: 1, answers: ["6"] },
        { id: "finish-source", label: "finish 的唯一合法源状态", type: "text", match: "identifier", score: 2, answers: ["Running"] }
      ] }
    ],
    explain: "G 为 retryCount < 2，A 为 incrementRetry。守卫先求值，成功恢复时依次记录 leavePaused、incrementRetry、enterRunning；计数器由 1 变 2，不能在加一后重新判断本次守卫。问题 2：第 3、5 个事件成功恢复，使计数器到 2；第 6 个 pause 进入 Paused，第 7 个 resume 守卫为假，第 8 个 finish 在 Paused 无可用迁移，均丢弃，所以最终 Paused、2。问题 3：第 3 个 resume 使计数器到 1，第 4 个 finish 进入 Finished，第 5 个 reset 清零并进入 Idle，第 6 个 resume 丢弃。最终 Idle、0。finish 仅适用于 Running；Finished 是可 reset 的普通状态。各空独立计分，序列按顺序精确匹配，编号集合不计顺序。"
  },
  {
    id: "uml-parcel-activity-original",
    type: "uml", no: "试题三", title: "包裹出库的并行校验与互斥面单",
    points: 15, minutes: 30, difficulty: 2,
    difficultyReason: "难度 2：根据明确的控制令牌规则识别分叉、汇合、决策和合并，再检验两条具体完成顺序，不涉及对象流或多实例活动。",
    kind: "similar", seal: "原创题",
    source: "本地原创非官方软件设计师下午练习；情境、SVG、答案均独立编写，非官方原题或评分标准。",
    intro: "阅读说明及图 3-2。F、J、D、M 是待识别控制节点的编号，不是动作名；G1、G2 是守卫空位。",
    story: [
      "仓库对一个订单执行一次活动。开始仅有一个控制令牌。ReceiveOrder 完成后，地址校验 ValidateAddress 与库存锁定 ReserveStock 各执行一次，二者之间没有先后约束；所有动作都成功，不考虑异常、重试、循环、数据令牌和其他订单。",
      "只有上述两个动作都已完成才能继续选择面单路径，J 使用默认 AND 同步语义。不能因某一支先完成而提前流出 J，也不能用另一支的两个令牌代替尚未完成的一支。",
      "expedited 是本次订单不变的布尔输入。D 恰好选择一个输出：true 时执行 ExpressLabel，false 时执行 StandardLabel。G1、G2 分别标在这两条边上，只使用 expedited 或其布尔比较、取反；每次只执行其中一个面单动作。",
      "M 不等待未被选择的路径，不复制令牌。选中的面单动作完成后即可经 M 执行 SealParcel，再执行 NotifyCustomer，最后到达活动终止节点。SealParcel 每订单执行一次。图中边均为控制流，不存在额外依赖。",
      "按 UML 控制节点语义解释 F、J、D、M；动作获得所需令牌才能开始，完成后才向输出边提供令牌。完成顺序题只比较动作完成的先后，控制节点不列入序列；并行动作可采用任意一个合法先后顺序。"
    ],
    figures: [{
      caption: "图 3-2 出库活动图（控制节点类型及 G1、G2 待填）",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1020" class="fig-svg" role="img" aria-label="两支并行校验同步后选择互斥面单，再合并封包通知的活动图">
        <defs><marker id="behavior-parcel-arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M0 0 L9 5 L0 10" fill="none" stroke="#152536"/></marker></defs>
        <g fill="#fff" stroke="#152536" stroke-width="1.5">
          <circle data-node="Initial" cx="500" cy="30" r="10" fill="#152536"/>
          <rect data-node="ReceiveOrder" x="380" y="75" width="240" height="50" rx="14"/>
          <rect data-node="F" x="220" y="175" width="560" height="8" fill="#152536"/>
          <rect data-node="ValidateAddress" x="100" y="245" width="280" height="60" rx="14"/>
          <rect data-node="ReserveStock" x="620" y="245" width="280" height="60" rx="14"/>
          <rect data-node="J" x="220" y="370" width="560" height="8" fill="#152536"/>
          <polygon data-node="D" points="500,430 540,470 500,510 460,470"/>
          <rect data-node="ExpressLabel" x="100" y="565" width="280" height="60" rx="14"/>
          <rect data-node="StandardLabel" x="620" y="565" width="280" height="60" rx="14"/>
          <polygon data-node="M" points="500,680 540,720 500,760 460,720"/>
          <rect data-node="SealParcel" x="380" y="800" width="240" height="50" rx="14"/>
          <rect data-node="NotifyCustomer" x="380" y="890" width="240" height="50" rx="14"/>
          <circle data-node="Final" cx="500" cy="985" r="14"/><circle cx="500" cy="985" r="9" fill="#152536"/>
        </g>
        <g fill="none" stroke="#152536" stroke-width="1.5" marker-end="url(#behavior-parcel-arrow)">
          <path data-edge="begin" data-from="Initial" data-to="ReceiveOrder" d="M500 40 V75"/>
          <path data-edge="received" data-from="ReceiveOrder" data-to="F" d="M500 125 V175"/>
          <path data-edge="address-start" data-from="F" data-to="ValidateAddress" d="M240 183 V245"/>
          <path data-edge="stock-start" data-from="F" data-to="ReserveStock" d="M760 183 V245"/>
          <path data-edge="address-done" data-from="ValidateAddress" data-to="J" d="M240 305 V370"/>
          <path data-edge="stock-done" data-from="ReserveStock" data-to="J" d="M760 305 V370"/>
          <path data-edge="synchronized" data-from="J" data-to="D" d="M500 378 V430"/>
          <path data-edge="express-choice" data-from="D" data-to="ExpressLabel" d="M460 470 H240 V565"/>
          <path data-edge="standard-choice" data-from="D" data-to="StandardLabel" d="M540 470 H760 V565"/>
          <path data-edge="express-done" data-from="ExpressLabel" data-to="M" d="M240 625 V720 H460"/>
          <path data-edge="standard-done" data-from="StandardLabel" data-to="M" d="M760 625 V720 H540"/>
          <path data-edge="merged" data-from="M" data-to="SealParcel" d="M500 760 V800"/>
          <path data-edge="sealed" data-from="SealParcel" data-to="NotifyCustomer" d="M500 850 V890"/>
          <path data-edge="notified" data-from="NotifyCustomer" data-to="Final" d="M500 940 V971"/>
        </g>
        <g fill="#152536" font-family="Arial, sans-serif" font-size="18" text-anchor="middle">
          <text x="500" y="107">ReceiveOrder</text><text x="815" y="185">F</text>
          <text x="240" y="282">ValidateAddress</text><text x="760" y="282">ReserveStock</text>
          <text x="815" y="380">J</text><text x="500" y="477">D</text>
          <text x="345" y="454">[G1]</text><text x="655" y="454">[G2]</text>
          <text x="240" y="602">ExpressLabel</text><text x="760" y="602">StandardLabel</text>
          <text x="500" y="727">M</text><text x="500" y="832">SealParcel</text>
          <text x="500" y="922">NotifyCustomer</text>
        </g>
      </svg>`
    }],
    problems: [
      { id: "control-node-types", title: "【问题 1】（4 分）", prompt: "填写 F、J、D、M 的 UML 控制节点类型，各 1 分。使用分叉、汇合、决策、合并或对应英文术语，不写泛称“分支”。", fields: [
        { id: "fork-type", label: "F 类型", type: "text", match: "text", score: 1, answers: ["分叉", "分叉节点", "分岔", "fork", "Fork", "fork node"] },
        { id: "join-type", label: "J 类型", type: "text", match: "text", score: 1, answers: ["汇合", "汇合节点", "同步汇合", "join", "Join", "join node"] },
        { id: "decision-type", label: "D 类型", type: "text", match: "text", score: 1, answers: ["决策", "决策节点", "判定", "判断节点", "decision", "Decision", "decision node"] },
        { id: "merge-type", label: "M 类型", type: "text", match: "text", score: 1, answers: ["合并", "合并节点", "归并", "merge", "Merge", "merge node"] }
      ] },
      { id: "guards-and-tokens", title: "【问题 2】（5 分）", prompt: "填写 G1、G2（不含外层方括号，各 1 分）。当 J 的两个输入各有一个令牌时，它本次同步总共消耗几个令牌、产生几个输出令牌（各 1 分）？本模型中 M 转发一次总共消耗几个输入令牌（1 分）？均填十进制整数。", fields: [
        { id: "express-guard", label: "G1", type: "text", match: "code", score: 1, answers: ["expedited", "expedited == true", "true == expedited", "expedited != false", "false != expedited"] },
        { id: "standard-guard", label: "G2", type: "text", match: "code", score: 1, answers: ["!expedited", "expedited == false", "false == expedited", "not expedited", "expedited != true", "true != expedited"] },
        { id: "join-consumed", label: "J 消耗总数", type: "text", match: "text", score: 1, answers: ["2"] },
        { id: "join-produced", label: "J 输出数", type: "text", match: "text", score: 1, answers: ["1"] },
        { id: "merge-consumed", label: "M 消耗总数", type: "text", match: "text", score: 1, answers: ["1"] }
      ] },
      { id: "activity-dependencies", title: "【问题 3】（6 分）", prompt: "沿控制流逆向跳过控制节点，填写 ExpressLabel 的全部最近前驱动作名集合（2 分，逗号分隔，顺序不限）。然后判断以下动作完成顺序是否合法（各 2 分，填“合法”或“不合法”）：甲 expedited=true：ReceiveOrder, ReserveStock, ValidateAddress, ExpressLabel, SealParcel, NotifyCustomer；乙 expedited=false：ReceiveOrder, ValidateAddress, StandardLabel, ReserveStock, SealParcel, NotifyCustomer。", fields: [
        { id: "label-predecessors", label: "ExpressLabel 最近前驱动作集合", type: "text", match: "set", score: 2, answers: ["ValidateAddress,ReserveStock"] },
        { id: "express-order-validity", label: "甲完成顺序", type: "text", match: "text", score: 2, answers: ["合法", "有效", "valid"] },
        { id: "standard-order-validity", label: "乙完成顺序", type: "text", match: "text", score: 2, answers: ["不合法", "非法", "无效", "invalid"] }
      ] }
    ],
    explain: "F 是分叉（fork），把一个控制令牌复制到两条输出；J 是汇合（join），等待两个输入各有一个令牌，消耗 2 个、输出 1 个。D 是决策（decision），按 expedited 与 !expedited 互斥选择；M 是合并（merge），转发所选路径的 1 个令牌，不同步等待另一条路径。若误将 M 当作 AND 汇合，将因未选路径永不产生令牌而无法继续。ExpressLabel 的最近前驱动作集合为 ValidateAddress、ReserveStock，二者无先后约束但必须全部完成。甲合法；乙在 ReserveStock 完成前就完成 StandardLabel，违反 J 的同步约束，虽在封包前补做库存锁定仍不合法。每条正常执行恰有六个动作完成，两个校验动作可交换，其余顺序固定。各空独立计分；自动判分使用列出的明确别名，不做任意语义猜测。"
  }
);
