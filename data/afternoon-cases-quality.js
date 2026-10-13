// 原创考纲专项，独立练习；不属于套卷固定五类大题。
window.AFTERNOON_CASES = window.AFTERNOON_CASES || [];
window.AFTERNOON_CASES.push({
  id: "quality-parcel-boundary-original",
  type: "quality",
  no: "考纲专项（非固定大题）",
  title: "包裹计费的测试与代码审查",
  points: 15,
  minutes: 30,
  kind: "similar",
  seal: "原创题",
  difficulty: "中等偏上",
  source: "原创考纲专项非固定大题：软件测试与代码审查。非官方试题，非历年真题，不纳入固定五类模拟套卷。",
  intro: "阅读需求和待审查 Java 程序，回答四个问题。共 15 分，建议 30 分钟。",
  story: [
    "包裹重量 weight 为整数，调用域限定为 -1 至 11；会员标志 member 只能为 0 或 1。需求：合法重量为 0 至 10（含端点），非法重量返回 -1；合法包裹中，会员且重量不超过 5 时免费，其余按 weight × 2 计费。每次调用独立，无状态和外部资源，返回 int，不涉及浮点舍入或溢出。",
    "以下为待审查实现，不能把程序返回值当作需求的预期结果。D1 的原子条件依次记为 A=(weight < 0)、B=(weight > 10)；D2 的原子条件依次记为 C=(member == 1)、D=(weight < 5)。Java 的 ||、&& 从左到右短路求值。轨迹用 T/F 表示实际求值结果，用 - 表示未求值，不得把未求值条件计入真或假覆盖。",
    "候选测试编号与输入 (weight,member)：T1=(-1,0)，T2=(11,0)，T3=(0,1)，T4=(5,1)，T5=(6,1)，T6=(5,0)。问题 1、3 均针对未修复版本。问题 3 的目标仅为两个 if 判定各自的真/假分支均被执行，A、B、C、D 各自实际求值为真和假至少一次，并至少有一个测试暴露返回值与需求不符。不要求路径覆盖、MC/DC，也不声称这些目标能证明程序无缺陷。"
  ],
  blocks: [{ code: `class ParcelFee {
    static int fee(int weight, int member) {
        if (weight < 0 || weight > 10) { // D1
            return -1;
        }
        if (member == 1 && weight < 5) { // D2
            return 0;
        }
        return weight * 2;
    }
}` }],
  problems: [
    {
      id: "quality-p1", title: "【问题 1】（4 分）",
      prompt: "分别给出 T4 和 T5 的需求预期值与未修复程序实际值。每个空使用“预期值,实际值”的顺序，两个整数用逗号分隔。每对全部正确得 2 分。",
      fields: [
        { id: "quality-boundary-pair", label: "T4：预期,实际", type: "text", match: "text", score: 2, answers: ["0,10", "(0,10)"] },
        { id: "quality-neighbor-pair", label: "T5：预期,实际", type: "text", match: "text", score: 2, answers: ["12,12", "(12,12)"] }
      ]
    },
    {
      id: "quality-p2", title: "【问题 2】（3 分）",
      prompt: "缺陷位置是 D1 还是 D2？仅用一个二元比较表达式替换该位置的 weight 比较子表达式，保持其余代码不变，使实现满足需求（不填 if、括号或分号）。",
      fields: [
        { id: "quality-defect-location", label: "缺陷判定编号", type: "text", match: "text", score: 1, answers: ["D2", "d2"] },
        { id: "quality-fixed-comparison", label: "替换后的比较表达式", type: "text", match: "code", score: 2, answers: ["weight <= 5", "5 >= weight", "weight < 6", "6 > weight"] }
      ]
    },
    {
      id: "quality-p3", title: "【问题 3】（5 分）",
      prompt: "填写 T1 在 D1 内的 A,B 轨迹，以及 T6 在 D2 内的 C,D 轨迹（用逗号分隔）。从给定六个候选中选出满足说明中全部三个目标的最少测试集合，填写编号集合及数量；本候选池的最优集合唯一，不能新增输入。",
      fields: [
        { id: "quality-or-trace", label: "T1 的 A,B 轨迹", type: "text", match: "text", score: 1, answers: ["T,-", "t,-"] },
        { id: "quality-and-trace", label: "T6 的 C,D 轨迹", type: "text", match: "text", score: 1, answers: ["F,-", "f,-"] },
        { id: "quality-minimum-set", label: "最少测试编号集合（逗号分隔）", type: "text", match: "set", score: 2, answers: ["T1,T2,T3,T4,T6", "t1,t2,t3,t4,t6"] },
        { id: "quality-minimum-count", label: "集合大小", type: "text", match: "text", score: 1, answers: ["5", "五"] }
      ]
    },
    {
      id: "quality-p4", title: "【问题 4】（3 分）",
      prompt: "在问题 2 已修复版本上审查一项需求变更：新增参数 int maxWeight，由调用方保证取值 1 至 10；合法重量上限改为 maxWeight，下限仍为 0，会员免费门槛仍为 5，非法输入必须优先返回 -1。只替换 D1 中的 weight > 10 子表达式，填写参数化比较式（不填 if、括号或分号）。再给出 (weight,member,maxWeight)=(3,1,3)、(4,1,3) 两次调用的需求预期返回值，按此顺序用逗号连接。",
      fields: [
        { id: "quality-configured-limit", label: "参数化上界检查", type: "text", match: "code", score: 2, answers: ["weight > maxWeight", "maxWeight < weight"] },
        { id: "quality-configured-output", label: "两次调用的预期值", type: "text", match: "text", score: 1, answers: ["0,-1", "(0,-1)"] }
      ]
    }
  ],
  explain: "T4 的需求预期为 0，实际为 10；T5 两者均为 12。D2 把免费上界 5 排除，应改为 weight <= 5；整数域内 weight < 6 等价。\n未修复版的 A,B / C,D / D1,D2 轨迹依次为：T1：T,- / -,- / T,-；T2：F,T / -,- / T,-；T3：F,F / T,T / F,T；T4：F,F / T,F / F,F；T5：F,F / T,F / F,F；T6：F,F / F,- / F,F。短路跳过不等于假。\n注意 T4 在未修复版的 D 为假，因此覆盖 D 真必须选择 T3；暴露边界错误必须选择 T4，D 假已由 T4 覆盖，不必选择 T5。最小集合为 T1,T2,T3,T4,T6，共 5 个。T1、T2 分别是 A 真、B 真的唯一来源，T3 是 D 真的唯一来源，T6 是 C 假的唯一来源，T4 是候选池中唯一暴露缺陷的测试，因此最优集合唯一。\n变更后使用 weight > maxWeight，必须保留先校验合法性、再计算免费资格的顺序；(3,1,3) 返回 0，(4,1,3) 返回 -1。若先判断会员免费，会错误地放行超出配置上限的包裹。应将这两个边界测试纳入变更回归。这里没有文件句柄、数据库或共享状态，不额外引入无关安全建议。自动判分只接受列出的等价表述，其他合理表达需人工复核；上述有限覆盖目标不是无缺陷保证。"
});
