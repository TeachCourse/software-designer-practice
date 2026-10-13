// 原创练习，非官方真题；自动判分仅匹配列出的答案别名。
window.AFTERNOON_CASES = window.AFTERNOON_CASES || [];
(() => {
  const knapsackCode = `int solveKnapsack(int count, int capacity, const int weights[],
                  const int values[], int best[])
{
    for (int budget = 0; budget <= capacity; ++budget)
        best[budget] = 【(1)】;
    for (int item = 0; item < count; ++item) {
        for (int budget = capacity; 【(2)】; --budget) {
            int candidate = 【(3)】;
            if (candidate > best[budget]) best[budget] = candidate;
        }
    }
    return best[capacity];
}`;
  const lcsCode = `int solveLcs(int lengthA, int lengthB, const char sequenceA[],
             const char sequenceB[], int lengths[lengthA + 1][lengthB + 1])
{
    for (int row = 0; row <= lengthA; ++row) lengths[row][0] = 【(1)】;
    for (int column = 0; column <= lengthB; ++column) lengths[0][column] = 0;
    for (int row = 1; row <= lengthA; ++row) {
        for (int column = 1; column <= lengthB; ++column) {
            if (sequenceA[row - 1] == sequenceB[column - 1])
                lengths[row][column] = 【(2)】;
            else
                lengths[row][column] = 【(3)】;
        }
    }
    return 【(4)】;
}`;
  window.AFTERNOON_CASES.push(
    {
      id: "original-alg-dp-knapsack-01",
      type: "alg", no: "原创-DP-01", title: "应急物资装载：0-1背包与滚动数组",
      points: 15, minutes: 30, kind: "ai", seal: "原创题",
      difficulty: 3,
      difficultyReason: "除状态转移外，还需跟踪滚动数组并用反例解释容量倒序和边界，适合中级综合练习。",
      source: "本地 AI 原创软件设计师中级下午算法练习；非官方真题，未经官方审定。",
      intro: "阅读说明和C代码，回答问题1至问题4（共15分，建议30分钟）。",
      story: [
        "有count件互不相同且不可拆分的物资，第item件重量为weights[item]、价值为values[item]。每件至多装一次，总重量不超过capacity，允许不装满，也允许不选任何物资，求最大总价值。",
        "count和capacity为非负整数，重量为正整数、价值为非负整数。数组长度合法，best由调用者提供capacity+1个int单元；假定内存充足且下标、所有价值之和均不溢出int。C99代码不负责输入校验和内存分配。",
        "处理完前item件物资后，best[budget]表示仅用这item件、重量不超过budget时的最大价值。外层进入item轮时，该物资尚未使用。复杂度按count=n、capacity=W分析，n和W均为正且可增长；统计best占用的辅助空间，忽略输入数组。",
        "自动判分为精确别名匹配（忽略空白及部分中文标点），不作任意语义判断。代码空只填表达式、不填分号；数组结果填英文逗号分隔数字；自然语言请使用题中指定的短语。"
      ],
      code: knapsackCode, blocks: [{ code: knapsackCode }], figures: [],
      problems: [
        {
          id: "p1", title: "【问题1】（6分）",
          prompt: "补全初始化、倒序循环的包含等号的下界条件，以及装入当前物资后的候选价值。",
          fields: [
            { id: "blank1", label: "(1) 初始值", type: "text", match: "code", score: 2, answers: ["0"] },
            { id: "blank2", label: "(2) 下界条件", type: "text", match: "code", score: 2, answers: ["budget >= weights[item]", "weights[item] <= budget"] },
            { id: "blank3", label: "(3) 候选价值", type: "text", match: "code", score: 2, answers: ["best[budget - weights[item]] + values[item]", "values[item] + best[budget - weights[item]]"] }
          ]
        },
        {
          id: "p2", title: "【问题2】（3分）",
          prompt: "独立跟踪实例：weights={2,3,4}，values={3,4,5}，capacity=5。填写仅处理第一件物资后的best[0..5]，再填写全部处理后的返回值。",
          fields: [
            { id: "firstRow", label: "第一轮数组（不加括号）", type: "text", match: "text", score: 2, answers: ["0,0,3,3,3,3"] },
            { id: "result", label: "最终最大价值", type: "text", match: "text", score: 1, answers: ["7"] }
          ]
        },
        {
          id: "p3", title: "【问题3】（4分）",
          prompt: "反例：只有一件重量2、价值3的物资，capacity=4。如果内层改成从weights[item]递增到capacity，其返回值是多少？用一句短语说明这种递增违反了物资使用次数的什么约束。原倒序代码中若下界误用budget>weights[item]，容量恰为2时又返回多少？",
          fields: [
            { id: "ascendingResult", label: "错误递增版本的返回值", type: "text", match: "text", score: 1, answers: ["6"] },
            { id: "reason", label: "递增导致的行为", type: "text", match: "text", score: 2, answers: ["重复使用当前物资", "重复选取当前物资", "同一件物资被重复使用"] },
            { id: "boundaryResult", label: "遗漏等号且容量为2的返回值", type: "text", match: "text", score: 1, answers: ["0"] }
          ]
        },
        {
          id: "p4", title: "【问题4】（2分）",
          prompt: "给出原正确实现的最坏时间复杂度和辅助空间复杂度，使用n与W。",
          fields: [
            { id: "time", label: "最坏时间复杂度", type: "text", match: "text", score: 1, answers: ["O(nW)", "O(n*W)", "O(W*n)", "Θ(nW)", "Θ(n*W)"] },
            { id: "space", label: "辅助空间复杂度", type: "text", match: "text", score: 1, answers: ["O(W)", "O(W+1)", "Θ(W)"] }
          ]
        }
      ],
      explain: "(1)为0，因为是重量不超过容量而非必须恰好装满，空集合始终可行。(2)为budget >= weights[item]，等于重量时也能恰好装入。(3)为best[budget-weights[item]]+values[item]。倒序保证较小容量尚未被本轮更新，读取的是上一轮状态，所以每件至多使用一次。实例各轮为[0,0,3,3,3,3]、[0,0,3,4,4,7]、[0,0,3,4,5,7]，选前两件价值7。单件反例中递增先令best[2]=3，再用本轮best[2]令best[4]=6，等价于允许当前物资无限重复的完全背包转移；正确答案为3。误用严格大于号在capacity=2时根本不更新，错误返回0。最坏时间O(nW)、辅助空间O(W)，是关于数值容量W的伪多项式时间，并非关于W的二进制位数的多项式时间。count=0或capacity=0均返回0。"
    },
    {
      id: "original-alg-dp-lcs-01",
      type: "alg", no: "原创-DP-02", title: "操作日志比较：最长公共子序列长度",
      points: 15, minutes: 30, kind: "ai", seal: "原创题",
      difficulty: 2,
      difficultyReason: "考查二维状态含义、空前缀初始化、两类转移及示例跟踪，不要求重建序列或空间优化。",
      source: "本地 AI 原创软件设计师中级下午算法练习；非官方真题，未经官方审定。",
      intro: "阅读说明和C代码，回答问题1至问题4（共15分，建议30分钟）。",
      story: [
        "两份操作日志分别用字符序列sequenceA、sequenceB表示。子序列允许删除任意字符但必须保持相对顺序，不要求连续；目标仅返回最长公共子序列（LCS）的长度，不输出具体序列。字符按单字节且区分大小写比较，不含中文多字节编码。",
        "令lengths[row][column]表示sequenceA的前row个字符与sequenceB的前column个字符的LCS长度。lengthA、lengthB为非负长度，输入数组至少含相应长度的有效字符，不要求以空字符结尾。lengths是调用者提供的(lengthA+1)×(lengthB+1)个int的二维数组，初始内容未定义。",
        "使用支持可变长度数组参数的C99实现；假定长度加1和数组尺寸均不溢出且内存充足。复杂度按lengthA=m、lengthB=n均为正且可增长分析，统计完整lengths表的辅助空间，不考虑滚动数组优化。",
        "自动判分只匹配列出的精确别名，不作任意语义判断。代码空填表达式、不加分号；状态短语按问题提示填写；数组结果填英文逗号分隔数字。"
      ],
      code: lcsCode, blocks: [{ code: lcsCode }], figures: [],
      problems: [
        {
          id: "p1", title: "【问题1】（2分）",
          prompt: "现有测试sequenceA=\"AXBYC\"、sequenceB=\"ABC\"，有人把代码误写成求最长公共子串长度。分别给出正确LCS实现和误写的最长公共子串实现应返回的长度。",
          fields: [
            { id: "state", label: "正确LCS长度", type: "text", match: "text", score: 1, answers: ["3"] },
            { id: "substring", label: "最长公共子串长度", type: "text", match: "text", score: 1, answers: ["1"] }
          ]
        },
        {
          id: "p2", title: "【问题2】（8分）",
          prompt: "补全C代码。两字符不等时，用条件运算符取上方和左方状态的较大值，不调用未定义的max函数。",
          fields: [
            { id: "blank1", label: "(1) 空前缀边界", type: "text", match: "code", score: 2, answers: ["0"] },
            { id: "blank2", label: "(2) 字符相等", type: "text", match: "code", score: 2, answers: ["lengths[row - 1][column - 1] + 1", "1 + lengths[row - 1][column - 1]"] },
            { id: "blank3", label: "(3) 字符不等", type: "text", match: "code", score: 2, answers: ["lengths[row - 1][column] >= lengths[row][column - 1] ? lengths[row - 1][column] : lengths[row][column - 1]", "lengths[row - 1][column] > lengths[row][column - 1] ? lengths[row - 1][column] : lengths[row][column - 1]", "lengths[row][column - 1] > lengths[row - 1][column] ? lengths[row][column - 1] : lengths[row - 1][column]"] },
            { id: "blank4", label: "(4) 返回长度", type: "text", match: "code", score: 2, answers: ["lengths[lengthA][lengthB]"] }
          ]
        },
        {
          id: "p3", title: "【问题3】（3分）",
          prompt: "独立实例：sequenceA=\"ABC\"，sequenceB=\"ACB\"。填写row=2（前缀AB）时lengths[2][0..3]及最终返回值。注意公共子序列不要求连续。",
          fields: [
            { id: "trace", label: "row=2一行（不加括号）", type: "text", match: "text", score: 2, answers: ["0,1,1,2"] },
            { id: "result", label: "最终LCS长度", type: "text", match: "text", score: 1, answers: ["2"] }
          ]
        },
        {
          id: "p4", title: "【问题4】（2分）",
          prompt: "给出上述完整二维表实现的时间和辅助空间复杂度，使用m、n。",
          fields: [
            { id: "time", label: "时间复杂度", type: "text", match: "text", score: 1, answers: ["O(mn)", "O(m*n)", "O(n*m)", "Θ(mn)", "Θ(m*n)"] },
            { id: "space", label: "辅助空间复杂度", type: "text", match: "text", score: 1, answers: ["O(mn)", "O(m*n)", "O(n*m)", "Θ(mn)", "Θ(m*n)", "O((m+1)*(n+1))"] }
          ]
        }
      ],
      explain: "状态是两个指定前缀的最长公共子序列长度，不是公共子串。任意序列与空序列的LCS长度为0，首行首列必须显式初始化。末尾字符相同时，取左上角长度加1；不同时，分别舍弃A或B的末尾字符，取上方与左方状态的最大值。不能在不等时置0，那是最长公共子串的另一种状态转移。返回lengths[lengthA][lengthB]。示例四行（含空前缀）依次为[0,0,0,0]、[0,1,1,1]、[0,1,1,2]、[0,1,2,2]，最终长度2，可取AB或AC。完整表时间和空间均为O(mn)（m,n为正）；若考虑空序列，统一写为O((m+1)(n+1))，代码仍正确返回0。题目只输出长度，因此无需回溯构造具体LCS。"
    }
  );
})();
