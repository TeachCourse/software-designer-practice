// 大纲专项原创练习，非官方真题；判分仅支持列出的答案别名。
window.AFTERNOON_CASES = window.AFTERNOON_CASES || [];
(() => {
  const activityCode = `int selectActivities(int count, const int start[], const int finish[],
                     int selected[])
{
    int taken = 0;
    int lastFinish = __blank1__;
    for (int index = 0; index < count; ++index) {
        if (__blank2__) {
            selected[taken++] = index;
            lastFinish = __blank3__;
        }
    }
    return taken;
}`;
  const maxSubCode = `int maxOfThree(int first, int second, int third)
{
    int best = first > second ? first : second;
    return best > third ? best : third;
}

int crossingSum(const int values[], int begin, int mid, int end)
{
    int leftBest = -1000000000;
    int total = 0;
    for (int position = mid - 1; position >= begin; --position) {
        total += values[position];
        if (total > leftBest) leftBest = total;
    }
    int rightBest = -1000000000;
    total = 0;
    for (int position = mid; position < end; ++position) {
        total += values[position];
        if (total > rightBest) rightBest = total;
    }
    return __blank1__;
}

int maxSubarray(const int values[], int begin, int end)
{
    if (end - begin == 1)
        return __blank2__;
    int mid = begin + (end - begin) / 2;
    int leftBest = maxSubarray(values, begin, mid);
    int rightBest = maxSubarray(values, mid, end);
    int crossBest = crossingSum(values, begin, mid, end);
    return __blank3__;
}`;
  const primCode = `void buildMst(int count, const int weight[20][20],
              int parent[20], int key[20])
{
    int used[20] = {0};
    for (int vertex = 0; vertex < count; ++vertex) {
        key[vertex] = 1000000000;
        parent[vertex] = -1;
    }
    key[0] = __blank1__;
    for (int round = 0; round < count; ++round) {
        int selected = -1;
        int minimum = 1000000000;
        for (int vertex = 0; vertex < count; ++vertex) {
            if (__blank2__) {
                selected = vertex;
                minimum = key[vertex];
            }
        }
        if (selected == -1) break;
        used[selected] = 1;
        for (int target = 0; target < count; ++target) {
            if (!used[target] && weight[selected][target] < key[target]) {
                key[target] = __blank3__;
                parent[target] = selected;
            }
        }
    }
}`;
  const source = '本地 AI 原创软件设计师中级下午算法大纲专项练习；非官方真题，未经官方审定，不声称押题。';
  const scoringNotice = '自动判分只匹配列出的别名（忽略空白及部分标点），不判断任意等价程序或自由论述。代码空只填表达式，不加分号；数列用英文逗号、不加括号。各字段按标注分值独立计分，无隐藏得分点。';
  window.AFTERNOON_CASES.push(
    {
      id: 'practice-202610-alg-activity', type: 'alg', no: '大纲专项一',
      title: '大纲专项一：会议室时段安排（活动选择）', points: 15, minutes: 30,
      kind: 'ai', seal: '原创题', difficulty: 2,
      difficultyReason: '把教程贪心章的活动选择迁移到会议室场景，考查排序键、半开区间兼容条件、反例与复杂度；不要求证明交换论证的完整形式化。',
      source,
      syllabus: {
        edition: '软件设计师考试大纲（2018年版）', subject: '考试科目2：软件设计与开发能力',
        topics: ['算法设计与分析：贪心法、最优子结构与贪心选择性质', 'C语言程序设计：数组扫描与条件判断'],
        textbook: '《软件设计师教程》第5版第8章：贪心法（活动选择）',
        note: '知识点映射，不表示官方原题或命题承诺。'
      },
      intro: '阅读说明和C代码，回答问题1至问题4（共15分，建议30分钟）。',
      story: [
        '共享会议室一次只能安排一场活动。共有count场活动，编号0至count-1，活动index占用半开时间区间[start[index], finish[index])。端点相等时不冲突：上一场在时刻t结束，下一场可在时刻t开始。目标是选出场次尽可能多的互不冲突子集；不要求输出具体时间表布局。',
        '约定1<=count<=20，start与finish为非负整数且满足start[index]<finish[index]<=1000000。调用前活动已按结束时间非降序排好；结束时间相同时保持原相对次序，本函数不再排序。使用C99及至少32位int；selected由调用者提供至少count个单元，初始内容任意。函数不校验输入、不分配内存。',
        '算法维护已选活动的最晚结束时刻lastFinish。因开始时刻非负，初始lastFinish取0即可兼容第一场。每轮若当前活动开始不早于lastFinish则选入，并更新lastFinish。selected按选择顺序写入活动下标，返回值为入选个数。',
        '手算实例（已按结束时间排好）：start={1,4,0,5,8,5}，finish={4,5,6,7,9,9}。其中第二场恰在第一场结束时刻开始，用来区分>=与>。复杂度按同样线性扫描推广至n场活动分析；辅助空间只计taken、lastFinish等标量及selected写入，不计输入数组。',
        scoringNotice
      ],
      code: activityCode, blocks: [{ code: activityCode }], figures: [],
      problems: [
        { id: 'p1', title: '【问题1】（6分）', prompt: '补全lastFinish初值、兼容判定条件以及选中后的更新表达式。判定须体现半开区间端点相等可兼容。', fields: [
          { id: 'blank1', label: '(1) lastFinish初值（2分）', type: 'text', match: 'code', score: 2, answers: ['0'] },
          { id: 'blank2', label: '(2) 可安排条件（2分）', type: 'text', match: 'code', score: 2, answers: ['start[index] >= lastFinish', 'lastFinish <= start[index]'] },
          { id: 'blank3', label: '(3) 更新结束时刻（2分）', type: 'text', match: 'code', score: 2, answers: ['finish[index]'] }
        ] },
        { id: 'p2', title: '【问题2】（5分）', prompt: '对说明中的六场活动实例，填写入选下标序列（按选择顺序）、入选个数，以及若误用严格大于（start[index]>lastFinish）时的入选个数。', fields: [
          { id: 'order', label: '入选下标序列（2分）', type: 'text', match: 'text', score: 2, answers: ['0,1,3,4'] },
          { id: 'count', label: '正确入选个数（2分）', type: 'text', match: 'text', score: 2, answers: ['4'] },
          { id: 'strictCount', label: '误用严格大于后的个数（1分）', type: 'text', match: 'text', score: 1, answers: ['3'] }
        ] },
        { id: 'p3', title: '【问题3】（2分）', prompt: '调用前应按什么关键字对活动排序（填“结束时间”或“开始时间”）？若改为按开始时间非降序再套用同一扫描（条件仍用>=），能选几场？', fields: [
          { id: 'sortKey', label: '正确排序关键字（1分）', type: 'text', match: 'text', score: 1, answers: ['结束时间', 'finish', '结束时刻'] },
          { id: 'wrongByStart', label: '按开始时间贪心可得场次（1分）', type: 'text', match: 'text', score: 1, answers: ['2'] }
        ] },
        { id: 'p4', title: '【问题4】（2分）', prompt: '设活动数为n。在已排序前提下给出本函数时间复杂度；若排序计入总成本，再给出总体时间复杂度。', fields: [
          { id: 'scanTime', label: '已排序后扫描（1分）', type: 'text', match: 'text', score: 1, answers: ['O(n)', 'Θ(n)'] },
          { id: 'totalTime', label: '含排序总成本（1分）', type: 'text', match: 'text', score: 1, answers: ['O(nlogn)', 'O(n*logn)', 'Θ(nlogn)', 'O(n log n)'] }
        ] }
      ],
      explain: '评分：问题1每空2分；问题2依次2、2、1分；问题3和4每项1分，共15分。半开区间下兼容条件为start[index]>=lastFinish，初值0与非负开始时刻配合；选中后更新为finish[index]，不能写成start[index]。实例依次选0、1、3、4，共4场：第二场start=4恰等于第一场finish，必须用>=才能选入。误用>会丢掉下标1，只剩0、3、4共3场。正确排序键是结束时间。若按开始时间非降序扫描同一实例，顺序为下标2、0、1、3、5、4，只能得到2场（例如2与4），劣于最优4场。已排序后单趟扫描O(n)；一般还需O(nlogn)排序，总体O(nlogn)。活动选择具有贪心选择性质与最优子结构，故可用贪心；0-1背包一般不能把“单位价值最大”当通用贪心策略。'
    },
    {
      id: 'practice-202610-alg-maxsub', type: 'alg', no: '大纲专项二',
      title: '大纲专项二：传感器读数最大连续和（分治）', points: 15, minutes: 30,
      kind: 'ai', seal: '原创题', difficulty: 2,
      difficultyReason: '考查分治三段式（左段、右段、跨越中点）与递归边界；手算规模小，不要求在线Kadane推导或线段树。',
      source,
      syllabus: {
        edition: '软件设计师考试大纲（2018年版）', subject: '考试科目2：软件设计与开发能力',
        topics: ['算法设计与分析：分治法、递归式与复杂度', 'C语言程序设计：递归与数组区间'],
        textbook: '《软件设计师教程》第5版第8章：分治法（最大子段和）',
        note: '教学知识点映射，非官方命题说明。'
      },
      intro: '阅读说明和C代码，回答问题1至问题4（共15分，建议30分钟）。',
      story: [
        '监测序列values[0..n-1]含整数读数（可正可负）。求一个非空连续子段，使其元素之和最大，返回该最大和；不要求输出起止下标。',
        '约定1<=n<=20，|values[i]|<=1000000；任意子段和的绝对值不超过20000000，且严格大于初始化哨兵-1000000000。使用C99及至少32位int。函数maxSubarray处理半开区间[begin,end)，初次调用begin=0、end=n；调用者不重叠地提供输入数组。不处理空数组。',
        '分治：将区间对半划分。最优子段或全在左半、或全在右半、或跨越中点（必须同时覆盖mid-1与mid两侧至少各一个元素）。crossingSum分别向左、向右做连续扩展，再相加。递归边界为单元素区间，答案即该元素本身（即使为负）。',
        '手算实例values={-2,11,-4,13,-5,-2}。复杂度按同一算法推广至长度n分析；辅助空间按递归栈深度估计，不计输入数组。',
        scoringNotice
      ],
      code: maxSubCode, blocks: [{ code: maxSubCode }], figures: [],
      problems: [
        { id: 'p1', title: '【问题1】（6分）', prompt: '补全跨越中点的合并结果、单元素边界返回值，以及三个候选中的最终选择表达式。', fields: [
          { id: 'blank1', label: '(1) 跨越中点之和（2分）', type: 'text', match: 'code', score: 2, answers: ['leftBest + rightBest', 'rightBest + leftBest'] },
          { id: 'blank2', label: '(2) 单元素返回值（2分）', type: 'text', match: 'code', score: 2, answers: ['values[begin]'] },
          { id: 'blank3', label: '(3) 三者取最大（2分）', type: 'text', match: 'code', score: 2, answers: ['maxOfThree(leftBest, rightBest, crossBest)', 'maxOfThree(leftBest, crossBest, rightBest)', 'maxOfThree(rightBest, leftBest, crossBest)', 'maxOfThree(rightBest, crossBest, leftBest)', 'maxOfThree(crossBest, leftBest, rightBest)', 'maxOfThree(crossBest, rightBest, leftBest)'] }
        ] },
        { id: 'p2', title: '【问题2】（5分）', prompt: '对说明中的实例，填写整段调用的返回值；顶层mid；以及仅右半区间[mid,n)上再调用maxSubarray的返回值。', fields: [
          { id: 'result', label: '整段最大子段和（2分）', type: 'text', match: 'text', score: 2, answers: ['20'] },
          { id: 'mid', label: '顶层mid（1分）', type: 'text', match: 'text', score: 1, answers: ['3'] },
          { id: 'rightResult', label: '右半最大子段和（2分）', type: 'text', match: 'text', score: 2, answers: ['13'] }
        ] },
        { id: 'p3', title: '【问题3】（2分）', prompt: '若序列全为负数，算法是否仍返回其中最大的那个元素（填“是”或“否”）？跨越中点的候选是否允许只取单侧而不跨越mid（填“允许”或“不允许”）？', fields: [
          { id: 'allNegative', label: '全负是否返回最大元素（1分）', type: 'text', match: 'text', score: 1, answers: ['是', '是的'] },
          { id: 'mustCross', label: '跨越候选可否不跨mid（1分）', type: 'text', match: 'text', score: 1, answers: ['不允许', '不可以', '否'] }
        ] },
        { id: 'p4', title: '【问题4】（2分）', prompt: '写出本分治算法时间复杂度满足的递归式（可用Θ(n)表示合并代价），以及渐近时间复杂度。', fields: [
          { id: 'recurrence', label: '递归式（1分）', type: 'text', match: 'text', score: 1, answers: ['T(n)=2T(n/2)+Θ(n)', 'T(n)=2T(n/2)+O(n)', 'T(n)=2T(n/2)+Θ(n) (n>1)'] },
          { id: 'time', label: '渐近时间（1分）', type: 'text', match: 'text', score: 1, answers: ['O(nlogn)', 'O(n*logn)', 'Θ(nlogn)', 'O(n log n)'] }
        ] }
      ],
      explain: '评分：问题1每空2分；问题2依次2、1、2分；问题3和4每项1分，共15分。跨越中点必须左右各取一段连续和再相加，故返回leftBest+rightBest；不能只返回二者较大者。单元素边界返回values[begin]，即使为负也不能改成0（题目要求非空子段）。最终在左、右、跨越三者中取最大。实例最优子段为11,-4,13，和为20；n=6时mid=3，右半为{-5,-2}与单独的13等候选，最大为13。全负时最优即最大元素，由边界与比较自然得到。crossingSum的循环从mid-1向左、从mid向右，强制跨越中点；不跨中点的情况已由左右递归覆盖。每层合并扫描Θ(n)，两半递归，主定理或展开得Θ(nlogn)。线性Kadane也是正确算法，但本题考查分治模板，填空须按给定框架。'
    },
    {
      id: 'practice-202610-alg-prim', type: 'alg', no: '大纲专项三',
      title: '大纲专项三：园区光纤最小生成树（Prim）', points: 15, minutes: 30,
      kind: 'ai', seal: '原创题', difficulty: 2,
      difficultyReason: '把Prim算法映射到无向带权连通图布线，考查起点键值、选点条件与松弛更新；要求手工跟踪，不要求堆优化或Kruskal并查集。',
      source,
      syllabus: {
        edition: '软件设计师考试大纲（2018年版）', subject: '考试科目2：软件设计与开发能力',
        topics: ['算法设计与分析：贪心法、最小生成树', '数据结构：图的邻接矩阵存储'],
        textbook: '《软件设计师教程》第5版：图、贪心法（Prim）',
        note: '知识点映射，不表示官方原题或命题承诺。'
      },
      intro: '阅读说明和C代码，回答问题1至问题4（共15分，建议30分钟）。',
      story: [
        '园区有count个站点，编号0至count-1。任意两站之间至多一条无向光纤候选边，代价为非负整数；无边用INF=1000000000表示。图连通。要用Prim算法从站点0生长一棵最小生成树，使所选边权总和最小。parent[v]保存v在树中的父结点，parent[0]=-1；key[v]为把v连入当前树的候选边权上界。',
        '约定2<=count<=20，真实边权为0至1000000。使用C99及至少32位int；调用者提供对称邻接矩阵（weight[u][v]==weight[v][u]，对角线为0）以及parent、key数组，均不重叠。有效输入区已赋值；函数不分配内存。同权时按编号从小到大扫描，用严格小于minimum选取，从而保留较小编号。',
        '每轮在未入树顶点中选key最小者入树，再尝试用该点去更新邻居的key与parent。零权边合法。复杂度按邻接矩阵实现推广至n个顶点分析；辅助空间含used、key、parent，不含输入矩阵。',
        '手算实例：5个顶点，边权AB=2,AC=3,AD=8,BC=1,BD=4,BE=7,CD=5,CE=6,DE=2（字母A..E对应编号0..4）；缺失边为INF。',
        scoringNotice
      ],
      code: primCode, blocks: [{ code: primCode }], figures: [],
      problems: [
        { id: 'p1', title: '【问题1】（6分）', prompt: '补全起点键值、选点条件以及松弛时的新键值。选点条件须同时使用used、key与minimum，并保持题设平局规则。', fields: [
          { id: 'blank1', label: '(1) 起点key（2分）', type: 'text', match: 'code', score: 2, answers: ['0'] },
          { id: 'blank2', label: '(2) 选点条件（2分）', type: 'text', match: 'code', score: 2, answers: ['!used[vertex] && key[vertex] < minimum', 'used[vertex] == 0 && key[vertex] < minimum'] },
          { id: 'blank3', label: '(3) 更新key（2分）', type: 'text', match: 'code', score: 2, answers: ['weight[selected][target]', 'weight[target][selected]'] }
        ] },
        { id: 'p2', title: '【问题2】（5分）', prompt: '对说明中的实例，填写顶点入树顺序、生成树边权总和，以及parent[0..4]（用-1表示根）。', fields: [
          { id: 'order', label: '入树顺序（2分）', type: 'text', match: 'text', score: 2, answers: ['0,1,2,3,4'] },
          { id: 'total', label: '边权总和（2分）', type: 'text', match: 'text', score: 2, answers: ['9'] },
          { id: 'parent', label: 'parent数组（1分）', type: 'text', match: 'text', score: 1, answers: ['-1,0,1,1,3'] }
        ] },
        { id: 'p3', title: '【问题3】（2分）', prompt: 'Prim与Kruskal都是最小生成树贪心算法。本实现每轮扩展的是什么集合（填“顶点集合”或“边集合”）？若图不连通，selected最终会变成什么值以触发退出？', fields: [
          { id: 'grow', label: 'Prim生长对象（1分）', type: 'text', match: 'text', score: 1, answers: ['顶点集合', '顶点集', '点集'] },
          { id: 'disconnected', label: '不连通时selected（1分）', type: 'text', match: 'text', score: 1, answers: ['-1'] }
        ] },
        { id: 'p4', title: '【问题4】（2分）', prompt: '用n给出该邻接矩阵Prim的最坏时间复杂度与辅助空间复杂度（不计输入矩阵，不用堆）。', fields: [
          { id: 'time', label: '最坏时间（1分）', type: 'text', match: 'text', score: 1, answers: ['O(n^2)', 'O(n*n)', 'Θ(n^2)'] },
          { id: 'space', label: '辅助空间（1分）', type: 'text', match: 'text', score: 1, answers: ['O(n)', 'Θ(n)'] }
        ] }
      ],
      explain: '评分：问题1每空2分；问题2依次2、2、1分；问题3和4每项1分，共15分。起点key[0]=0才能首先入树；其余先为INF。选点条件!used[vertex]&&key[vertex]<minimum，严格小于保留较小编号。松弛时key[target]=weight[selected][target]，不是累加路径长——最小生成树更新的是“连入树的边权”，与Dijkstra的距离累加不同。实例入树顺序0,1,2,3,4，边为0-1(2)、1-2(1)、1-3(4)、3-4(2)，总和9；parent为-1,0,1,1,3。Prim维护已入树顶点集合并扩张，Kruskal按边权排序并避开环。若剩余顶点key均为INF，则selected保持-1并退出。邻接矩阵每轮选点与更新各O(n)、共O(n)轮，时间O(n^2)；used/key/parent为O(n)辅助空间。'
    }
  );
})();
