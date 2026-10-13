// 原创练习，非官方真题；答案别名供提交后判分使用。
window.AFTERNOON_CASES = window.AFTERNOON_CASES || [];
(() => {
  const mergeCode = `typedef struct { int key; int original; } Record;
void mergeSort(Record records[], Record temporary[], int begin, int end)
{
    if (end - begin <= 1) return;
    int middle = begin + (end - begin) / 2;
    mergeSort(records, temporary, begin, middle);
    mergeSort(records, temporary, middle, end);
    int left = begin, right = middle, output = begin;
    while (left < middle && right < end) {
        if (【(1)】) temporary[output++] = records[left++];
        else temporary[output++] = records[right++];
    }
    while (【(2)】) temporary[output++] = records[left++];
    while (right < end) temporary[output++] = records[right++];
    for (int position = begin; 【(3)】; ++position)
        records[position] = temporary[position];
}`;
  const subsetCode = `void recordSolution(const int chosen[], int count);
void searchSubset(const int weights[], const int suffix[], int chosen[],
                  int count, int target, int position, int total)
{
    if (total == target) {
        recordSolution(chosen, count);
        return;
    }
    if (position == count || total > target || 【(1)】) return;
    chosen[position] = 1;
    searchSubset(weights, suffix, chosen, count, target,
                 position + 1, 【(2)】);
    chosen[position] = 【(3)】;
    searchSubset(weights, suffix, chosen, count, target,
                 position + 1, total);
}
void enumerateSubsets(const int weights[], int count, int target,
                      int suffix[], int chosen[])
{
    suffix[count] = 0;
    for (int position = count - 1; position >= 0; --position)
        suffix[position] = 【(4)】;
    for (int position = 0; position < count; ++position) chosen[position] = 0;
    searchSubset(weights, suffix, chosen, count, target, 0, 0);
}`;
  window.AFTERNOON_CASES.push(
    {
      id: "original-alg-search-merge-01", type: "alg", no: "原创-搜索-01",
      title: "工单排序：稳定归并与半开区间", points: 15, minutes: 30,
      kind: "ai", seal: "原创题", difficulty: 2,
      difficultyReason: "综合考查分治、稳定合并、区间边界和递归复杂度，需跟踪带原始标记的重复键。",
      source: "本地 AI 原创软件设计师中级下午算法练习；非官方真题，未经官方审定。",
      intro: "阅读说明和C代码，回答问题1至问题4（共15分，建议30分钟）。",
      story: [
        "工单记录含排序键key与原始序号original。按key升序排序，相同键要求保留输入先后次序；original只是观察标记，不能作为比较条件。",
        "C99代码使用半开区间[begin,end)，初次调用begin=0、end=n。n非负，records与temporary是互不重叠的数组，各至少有n个单元；空输入可提供一个不被访问的占位单元。所有下标和运算不溢出int，空间由调用者分配。",
        "复杂度按n>=2分析，计入整个temporary数组和递归栈，不计输入。自动判分仅匹配列出的答案别名：代码空填表达式，不加分号；序号列表用英文逗号分隔，不加括号。"
      ],
      code: mergeCode, blocks: [{ code: mergeCode }], figures: [],
      problems: [
        { id: "p1", title: "【问题1】（6分）", prompt: "补全稳定合并的比较条件、左段剩余记录的循环条件，以及回写区间的循环条件。", fields: [
          { id: "blank1", label: "(1) 比较条件", type: "text", match: "code", score: 2, answers: ["records[left].key <= records[right].key", "records[right].key >= records[left].key"] },
          { id: "blank2", label: "(2) 左段边界", type: "text", match: "code", score: 2, answers: ["left < middle", "middle > left"] },
          { id: "blank3", label: "(3) 回写边界", type: "text", match: "code", score: 2, answers: ["position < end", "end > position"] }
        ] },
        { id: "p2", title: "【问题2】（4分）", prompt: "输入(key,original)依次为(3,0),(1,1),(3,2),(1,3),(2,4)。给出顶层middle；顶层两次递归完成但尚未合并时，右段的original序列；最终完整的original序列。", fields: [
          { id: "middle", label: "顶层分界下标", type: "text", match: "text", score: 1, answers: ["2"] },
          { id: "rightTrace", label: "右段序号", type: "text", match: "text", score: 1, answers: ["3,4,2"] },
          { id: "sortedTrace", label: "最终序号", type: "text", match: "text", score: 2, answers: ["1,3,4,0,2"] }
        ] },
        { id: "p3", title: "【问题3】（3分）", prompt: "空区间调用会执行多少次记录写入？只有(5,0),(5,1)两条记录时，若(1)误用严格小于，其最终original序列是什么？它破坏了哪种排序性质？", fields: [
          { id: "emptyWrites", label: "空区间写入次数", type: "text", match: "text", score: 1, answers: ["0"] },
          { id: "unstableTrace", label: "错误版本序号", type: "text", match: "text", score: 1, answers: ["1,0"] },
          { id: "stability", label: "性质名称", type: "text", match: "text", score: 1, answers: ["稳定性", "排序稳定性"] }
        ] },
        { id: "p4", title: "【问题4】（2分）", prompt: "给出正确代码最坏时间复杂度和总辅助空间复杂度（含临时数组和递归栈），用n表示。", fields: [
          { id: "time", label: "最坏时间", type: "text", match: "text", score: 1, answers: ["O(nlogn)", "O(n*logn)", "Θ(nlogn)"] },
          { id: "space", label: "总辅助空间", type: "text", match: "text", score: 1, answers: ["O(n)", "Θ(n)"] }
        ] }
      ],
      explain: "(1) records[left].key <= records[right].key，相等时优先取左段，结合递归子段的稳定性保证整体稳定。(2) left < middle；(3) position < end，半开区间不访问end。顶层middle=2，右段序号3,4,2，最终1,3,4,0,2。空区间与单条记录直接返回，不写数组；严格小于会在两个相等键时先取右段，产生1,0，破坏稳定性。递推为T(n)=T(floor(n/2))+T(ceil(n/2))+Θ(n)，最坏时间Θ(nlogn)。临时数组Θ(n)、递归栈Θ(logn)，合计Θ(n)，不能仅计算栈。"
    },
    {
      id: "original-alg-search-subset-01", type: "alg", no: "原创-搜索-02",
      title: "配重方案：子集和回溯与安全剪枝", points: 15, minutes: 30,
      kind: "ai", seal: "原创题", difficulty: 3,
      difficultyReason: "需要理解全部方案枚举、状态恢复、正权重剪枝和按下标区分重复重量，并区分判定与枚举。",
      source: "本地 AI 原创软件设计师中级下午算法练习；非官方真题，未经官方审定。",
      intro: "阅读说明和C代码，回答问题1至问题4（共15分，建议30分钟）。",
      story: [
        "count件配重按下标0至count-1区分，每件最多选一次。weights为正整数，不要求排序，允许重量相同；目标枚举总重量恰为非负整数target的所有下标子集，而不是只判断是否有解。空集也是子集。",
        "C99代码中0<=count<=20；重量总和与target均不超过1000000。输入和工作数组不重叠，weights、chosen至少有count个单元，suffix至少有count+1个单元；长度为0时提供占位数组。工作数组调用前可有任意内容，调用者负责分配空间。",
        "suffix[position]表示从position到末尾的重量总和。chosen用0/1标记选择；recordSolution同步复制整个chosen向量，不修改数组、不保留指针。搜索按先选后不选的深度优先顺序报告方案，回调每次耗时Θ(count+1)。",
        "自动判分仅支持列出的精确别名。代码空填表达式，不加分号；方案向量按下标从小到大直接写连续0/1，各方案间用英文逗号分隔。"
      ],
      code: subsetCode, blocks: [{ code: subsetCode }], figures: [],
      problems: [
        { id: "p1", title: "【问题1】（8分）", prompt: "补全剩余总量不足的剪枝条件、选择当前配重后的累计值、撤销选择的值，以及后缀和递推。", fields: [
          { id: "blank1", label: "(1) 剩余不足", type: "text", match: "code", score: 2, answers: ["total + suffix[position] < target", "target > total + suffix[position]"] },
          { id: "blank2", label: "(2) 选择分支累计值", type: "text", match: "code", score: 2, answers: ["total + weights[position]", "weights[position] + total"] },
          { id: "blank3", label: "(3) 恢复状态", type: "text", match: "code", score: 2, answers: ["0"] },
          { id: "blank4", label: "(4) 后缀递推", type: "text", match: "code", score: 2, answers: ["weights[position] + suffix[position + 1]", "suffix[position + 1] + weights[position]"] }
        ] },
        { id: "p2", title: "【问题2】（3分）", prompt: "weights={2,2,3}，target=5。按回调顺序写出全部chosen向量。另一次独立调用target=0时报告多少个方案？", fields: [
          { id: "solutions", label: "全部方案向量", type: "text", match: "text", score: 2, answers: ["101,011"] },
          { id: "zeroTarget", label: "零目标方案数", type: "text", match: "text", score: 1, answers: ["1"] }
        ] },
        { id: "p3", title: "【问题3】（2分）", prompt: "当total+suffix[position]恰好等于target时，是否能仅凭此等式剪枝（填能或不能）？若需求改成只判定有解，首次找到方案后是否可终止整棵搜索（填可以或不可以）？", fields: [
          { id: "equalPrune", label: "等式能否剪枝", type: "text", match: "text", score: 1, answers: ["不能", "不可以"] },
          { id: "decision", label: "判定版可否全局终止", type: "text", match: "text", score: 1, answers: ["可以", "能"] }
        ] },
        { id: "p4", title: "【问题4】（2分）", prompt: "记count=n，n>=1。忽略回调复制的开销，给出搜索时间的通用指数级大O上界；若忽略回调保存的输出，给出工作数组加递归栈的辅助空间复杂度。", fields: [
          { id: "time", label: "搜索时间上界", type: "text", match: "text", score: 1, answers: ["O(2^n)", "O(2**n)"] },
          { id: "space", label: "辅助空间", type: "text", match: "text", score: 1, answers: ["O(n)", "Θ(n)"] }
        ] }
      ],
      explain: "四空依次为total+suffix[position]<target、total+weights[position]、0、weights[position]+suffix[position+1]。超过目标后因重量全正不可能回落；即使选完剩余仍不足也可剪枝，但等于目标不能剪，否则漏掉恰好选完剩余的方案。选择分支返回后必须撤销当前位，且入口初始化全零，避免兄弟分支或上次调用留下状态。所有更深位在返回时已恢复零，因此达到目标可以直接报告；正重量保证再加入任何物品都会超标。若允许零重量，这个提前返回会漏掉包含零重量的方案；负重量还会破坏上述剪枝。示例按顺序报告101、011：同重配重下标不同，属于不同方案。每个下标的选或不选决策路径唯一，不会重复枚举同一下标子集。target=0仅报告空集，count=0且target>0无解。判定版找到一个解即可全局停止，枚举版不能。忽略输出复制，搜索树至多2^(n+1)-1个节点，时间O(2^n)；若输出K个方案，含复制的通用上界为O(2^n+nK)，工作空间O(n)，不计保存全部输出所需O(nK)。"
    }
  );
})();
