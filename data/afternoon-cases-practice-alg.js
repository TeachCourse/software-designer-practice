// 原创迁移练习，非官方真题；判分仅支持列出的答案别名。
window.AFTERNOON_CASES = window.AFTERNOON_CASES || [];
(() => {
  const dijkstraCode = `void shortestPaths(int count, const int graph[20][20],
                   int source, int distance[20])
{
    int visited[20] = {0};
    for (int vertex = 0; vertex < count; ++vertex)
        distance[vertex] = 1000000000;
    distance[source] = __blank1__;
    for (int round = 0; round < count; ++round) {
        int selected = -1;
        int minimum = 1000000000;
        for (int vertex = 0; vertex < count; ++vertex) {
            if (__blank2__) {
                selected = vertex;
                minimum = distance[vertex];
            }
        }
        if (selected == -1) break;
        visited[selected] = 1;
        for (int target = 0; target < count; ++target) {
            if (!visited[target] && graph[selected][target] < 1000000000) {
                int candidate = __blank3__;
                if (candidate < distance[target]) distance[target] = candidate;
            }
        }
    }
}`;
  const matrixCode = `long long matrixChain(int count, const int dimensions[],
                      long long cost[21][21])
{
    for (int begin = 1; begin <= count; ++begin)
        cost[begin][begin] = 0;
    for (int length = 2; length <= count; ++length) {
        for (int begin = 1; __blank1__; ++begin) {
            int end = begin + length - 1;
            cost[begin][end] = 1000000000;
            for (int split = begin; __blank2__; ++split) {
                long long candidate = __blank3__;
                if (candidate < cost[begin][end]) cost[begin][end] = candidate;
            }
        }
    }
    return __blank4__;
}`;
  const source = '本地 AI 原创软件设计师中级下午迁移练习；非官方真题，未经官方审定，不声称押题。';
  const scoringNotice = '自动判分只匹配列出的别名（忽略空白及部分标点），不判断任意等价程序或自由论述。代码空只填表达式，不加分号；数列用英文逗号、不加括号，不可达写INF。各字段按标注分值独立计分，无隐藏得分点。';
  window.AFTERNOON_CASES.push(
    {
      id: 'practice-202609-alg-dijkstra', type: 'alg', no: '新练习一',
      title: '新练习一：配送站点最短路径', points: 15, minutes: 30,
      kind: 'ai', seal: '原创题', difficulty: 2,
      difficultyReason: '把教材中的邻接矩阵Dijkstra迁移到配送场景，考查初始化、贪心选择、松弛及手工跟踪；不要求堆优化、负权算法或竞赛技巧。',
      source,
      syllabus: {
        edition: '软件设计师考试大纲（2018年版）', subject: '考试科目2：软件设计与开发能力',
        topics: ['算法设计与分析：贪心法、图的最短路径、复杂度分析', 'C语言程序设计：数组、循环与条件表达式'],
        textbook: '《软件设计师教程》第5版：数据结构、算法设计与分析相关内容',
        note: '知识点映射，不表示官方原题、官方题型承诺或官方审定。'
      },
      intro: '阅读说明和C代码，回答问题1至问题4（共15分，建议30分钟）。',
      story: [
        '配送网络是有向图，站点编号0至count-1。graph[origin][target]为直达路段长度，所有真实边权均非负，允许零权边；无边用INF=1000000000表示，对角线为0。不自动补反向边。求source到每个站点的最短距离，不要求输出路径。',
        '约定1<=count<=20，0<=source<count，真实边权为0至1000000的整数。使用C99及至少32位int；调用者提供完整20×20邻接矩阵和20单元distance数组，二者不重叠。有效输入区已赋值，输出初始值任意；函数不负责校验输入或分配内存。最短简单路径至多19条边，松弛候选至多20000000，均小于INF且不溢出int。',
        'distance保存当前距离上界，visited标识已确定最短距离的站点。每轮扫描编号从小到大，用严格小于minimum选取未确定且距离有限的最小者；同距离时保留较小编号。selected为-1时立即退出，避免访问graph[-1]，也避免从不可达站点做加法。',
        '手算实例：count=6，source=0，仅有0→1(4)、0→2(1)、2→1(2)、1→3(1)、2→3(5)、3→4(3)这六条有向边；站点5孤立。复杂度按同样邻接矩阵算法推广至n个站点分析，数组容量随n增长；辅助空间包含distance和visited、不含输入graph。',
        scoringNotice
      ],
      code: dijkstraCode, blocks: [{ code: dijkstraCode }], figures: [],
      problems: [
        { id: 'p1', title: '【问题1】（6分）', prompt: '补全源点初值、选择条件和候选距离。选择条件使用visited、distance和minimum，严格比较以保持题设平局规则。', fields: [
          { id: 'blank1', label: '(1) 源点距离（2分）', type: 'text', match: 'code', score: 2, answers: ['0'] },
          { id: 'blank2', label: '(2) 未访问且距离更小（2分）', type: 'text', match: 'code', score: 2, answers: ['!visited[vertex] && distance[vertex] < minimum', 'visited[vertex] == 0 && distance[vertex] < minimum'] },
          { id: 'blank3', label: '(3) 松弛候选值（2分）', type: 'text', match: 'code', score: 2, answers: ['distance[selected] + graph[selected][target]', 'graph[selected][target] + distance[selected]'] }
        ] },
        { id: 'p2', title: '【问题2】（5分）', prompt: '对说明中的六站点实例，填写第一轮选定源点并完成松弛后的distance[0..5]、依次被标记visited的站点编号以及最终距离。退出时的-1不计入编号序列。', fields: [
          { id: 'firstTrace', label: '第一轮距离数组（2分）', type: 'text', match: 'text', score: 2, answers: ['0,4,1,INF,INF,INF'] },
          { id: 'order', label: '站点确定顺序（1分）', type: 'text', match: 'text', score: 1, answers: ['0,2,1,3,4'] },
          { id: 'result', label: '最终距离数组（2分）', type: 'text', match: 'text', score: 2, answers: ['0,3,1,4,7,INF'] }
        ] },
        { id: 'p3', title: '【问题3】（2分）', prompt: '若配送路段长度模型改成可为负数的代价，本算法是否保证正确（填“是”或“否”）？当所有剩余站点均不可达时，selected的值是多少？', fields: [
          { id: 'negative', label: '允许负权后是否保证正确（1分）', type: 'text', match: 'text', score: 1, answers: ['否', '不保证'] },
          { id: 'unreachable', label: '退出前selected值（1分）', type: 'text', match: 'text', score: 1, answers: ['-1'] }
        ] },
        { id: 'p4', title: '【问题4】（2分）', prompt: '用n给出该邻接矩阵版本的最坏时间复杂度和辅助空间复杂度（不计输入矩阵，也不采用堆优化）。', fields: [
          { id: 'time', label: '最坏时间（1分）', type: 'text', match: 'text', score: 1, answers: ['O(n^2)', 'O(n*n)', 'Θ(n^2)'] },
          { id: 'space', label: '辅助空间（1分）', type: 'text', match: 'text', score: 1, answers: ['O(n)', 'Θ(n)'] }
        ] }
      ],
      explain: '评分：问题1每空2分，问题2依次2、1、2分，问题3和4每项1分，共15分。源点到自身为0，其余先为INF；不能把所有距离初始化为0。选择条件为!visited[vertex] && distance[vertex]<minimum；松弛值为distance[selected]+graph[selected][target]，不是仅用边权，也不能遗漏累积距离。非负边权保证当前最小暂定距离不可能经未确定站点再缩短，因此可永久确定该点。第一轮为[0,4,1,INF,INF,INF]；选2后为[0,3,1,6,INF,INF]；选1后为[0,3,1,4,INF,INF]；选3后为[0,3,1,4,7,INF]；选4不再更新。顺序0,2,1,3,4，最后仅站点5未确定，因INF不严格小于minimum，selected保持-1并退出。INF表示不可达而非实际路径长度，零权边仍是合法边。负权反例：0→1为2、0→2为5、2→1为-4，本程序过早确定站点1得到2，而真实距离为1。邻接矩阵每轮选择与松弛各扫描n项，至多n轮，最坏时间O(n^2)；distance与visited为O(n)辅助空间，若包含输入矩阵则总存储O(n^2)。不能把固定教学上限20理解成复杂度分析中n不增长。'
    },
    {
      id: 'practice-202609-alg-matrix-chain', type: 'alg', no: '新练习二',
      title: '新练习二：矩阵链乘法的最优计算次序', points: 15, minutes: 30,
      kind: 'ai', seal: '原创题', difficulty: 2,
      difficultyReason: '以矩阵维数为背景考查标准区间动态规划、循环边界和简单手算；仅求最少标量乘法次数，不要求构造括号方案或优化到竞赛算法。',
      source,
      syllabus: {
        edition: '软件设计师考试大纲（2018年版）', subject: '考试科目2：软件设计与开发能力',
        topics: ['算法设计与分析：动态规划、最优子结构、复杂度分析', 'C语言程序设计：二维数组、嵌套循环与表达式'],
        textbook: '《软件设计师教程》第5版：算法设计与分析、程序设计语言相关内容',
        note: '教学知识点映射，非官方命题说明。'
      },
      intro: '阅读说明和C代码，回答问题1至问题4（共15分，建议30分钟）。',
      story: [
        '数据处理系统需计算矩阵乘积A1A2…An，其中Aposition的行列数为dimensions[position-1]×dimensions[position]。只可改变括号顺序，不可交换矩阵。普通矩阵乘法将a×b矩阵与b×c矩阵相乘，需要a*b*c次标量乘法；忽略加法次数。程序只返回最少乘法次数，不执行实际矩阵乘法。',
        '约定count=n且1<=n<=20，dimensions有n+1个已初始化的int元素，每个为1至100。使用C99及至少32位int。调用者提供不与输入重叠的完整long long cost[21][21]工作表，初始内容任意且内存有效；下标0行和0列不用。不处理空矩阵链或非法尺寸。任一完整方案代价不超过19*100^3=19000000，小于初始化上界1000000000；乘法以1LL提升为long long，不依赖溢出行为。',
        'cost[begin][end]表示连续子链Abegin…Aend的最少标量乘法次数。单矩阵无需相乘，故对角线为0。按子链长度从2递增，枚举最后一次乘法的分割点split，左子链为begin..split，右子链为split+1..end；两个子链均不得为空。',
        '手算实例dimensions={10,30,5,60}，即三个矩阵A1(10×30)、A2(30×5)、A3(5×60)。复杂度按同一算法推广至n个矩阵分析，表容量随n增长，辅助空间包含整个cost表，不含输入维数数组。',
        scoringNotice
      ],
      code: matrixCode, blocks: [{ code: matrixCode }], figures: [],
      problems: [
        { id: 'p1', title: '【问题1】（8分）', prompt: '补全区间起点循环条件、分割点循环条件、候选总代价以及最终返回值。候选表达式使用1LL提升维数乘积，不调用未定义的函数。', fields: [
          { id: 'blank1', label: '(1) 保证end不越界（2分）', type: 'text', match: 'code', score: 2, answers: ['begin + length - 1 <= count', 'begin <= count - length + 1'] },
          { id: 'blank2', label: '(2) 两侧子链均非空（2分）', type: 'text', match: 'code', score: 2, answers: ['split < end', 'split <= end - 1'] },
          { id: 'blank3', label: '(3) 分割后的总代价（2分）', type: 'text', match: 'code', score: 2, answers: ['cost[begin][split] + cost[split + 1][end] + 1LL * dimensions[begin - 1] * dimensions[split] * dimensions[end]'] },
          { id: 'blank4', label: '(4) 完整矩阵链的结果（2分）', type: 'text', match: 'code', score: 2, answers: ['cost[1][count]'] }
        ] },
        { id: 'p2', title: '【问题2】（3分）', prompt: '对说明中的实例，依次填写长度为2时cost[1][2]与cost[2][3]（逗号分隔），以及最终最少乘法次数。', fields: [
          { id: 'pairCosts', label: '两个长度2状态（2分）', type: 'text', match: 'text', score: 2, answers: ['1500,9000'] },
          { id: 'result', label: '最终最少次数（1分）', type: 'text', match: 'text', score: 1, answers: ['4500'] }
        ] },
        { id: 'p3', title: '【问题3】（2分）', prompt: '计算cost[begin][end]之前，必须先求出哪些子问题的最优值？结合状态转移，用一句话说明按区间长度递增计算的理由。当count=1时函数应返回多少？', fields: [
          { id: 'dependency', label: '递推依赖顺序（1分）', type: 'text', match: 'text', score: 1, answers: ['先求较短子链', '先计算较短子链', '先计算短区间再计算长区间', '先求左右子链的最优值', '先计算所有分割点对应的左右子链最优值', '左右子链都比当前区间短，按长度递增可保证它们已计算', '先求cost[begin][split]和cost[split+1][end]'] },
          { id: 'single', label: '单矩阵代价（1分）', type: 'text', match: 'text', score: 1, answers: ['0'] }
        ] },
        { id: 'p4', title: '【问题4】（2分）', prompt: '用n填写上述完整二维表实现的时间与辅助空间复杂度，不考虑其他优化。', fields: [
          { id: 'time', label: '时间复杂度（1分）', type: 'text', match: 'text', score: 1, answers: ['O(n^3)', 'O(n*n*n)', 'Θ(n^3)'] },
          { id: 'space', label: '辅助空间复杂度（1分）', type: 'text', match: 'text', score: 1, answers: ['O(n^2)', 'O(n*n)', 'Θ(n^2)'] }
        ] }
      ],
      explain: '评分：四个代码空各2分；两个长度2状态作为一组共2分；最终值1分；问题3和4各字段1分，共15分。递推为cost[begin][end]=min(cost[begin][split]+cost[split+1][end]+dimensions[begin-1]*dimensions[split]*dimensions[end])，分割点从begin至end-1。因为左右结果维数分别为dimensions[begin-1]×dimensions[split]和dimensions[split]×dimensions[end]，最后一次乘法的三个因子必须使用这三个边界；不能用子链长度相乘。begin+length-1<=count保证右端合法，split<end避免空右链与读取尚未求出的本区间。单矩阵代价0，count=1直接返回cost[1][1]=0。按长度递增使两侧更短区间均已计算；不可直接按起点递增、终点递增代替而不检查依赖。实例长度2状态为1500和9000；split=1得到0+9000+10*30*60=27000，对应A1(A2A3)；split=2得到1500+0+10*5*60=4500，对应(A1A2)A3，因此返回4500。矩阵乘法结合律不等于交换律，不能改变矩阵次序。代价上界必须大于所有合法方案，不能初始化为0，否则正候选不会更新。共有O(n^2)个区间，每个枚举O(n)分割点，时间O(n^3)；cost表辅助空间O(n^2)。本题不要求保存分割点或输出最优括号。'
    }
  );
})();
