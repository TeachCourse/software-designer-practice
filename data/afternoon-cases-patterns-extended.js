// 原创非官方练习；只追加题目，不替换已加载的数据。
window.AFTERNOON_CASES = window.AFTERNOON_CASES || [];
window.AFTERNOON_CASES.push(
  {
    id: "pattern-editor-history-original",
    type: "pattern", no: "试题六（Java）", title: "数值编辑台的操作回退",
    points: 15, minutes: 30, difficulty: 3,
    difficultyReason: "难度 3：需识别请求对象与执行者的职责，补全执行后入栈和逆序回退，区分恢复快照与再次执行，并明确空历史边界。",
    kind: "similar", seal: "原创题",
    source: "原创非官方 Java 练习，情境、程序及答案独立编写，非官方真题或评分标准。",
    intro: "阅读说明及 Java 程序，回答四个问题，共 15 分，建议 30 分钟。保存为 EditHistoryDemo.java，仅替换三个占位符，不含分号。",
    story: [
      "编辑台 ValueCell 保存一个整数。每个 AddAction 对象封装一次增加或减少操作及目标对象，执行前保存旧值，回退时恢复该旧值。HistoryPanel 只依赖 EditAction 接口，不判断操作的具体类型。",
      "本题单线程，无异常、无外部修改、无嵌套提交，所有引用非 null，数值运算无溢出。同一编辑台上的操作只经一个 HistoryPanel 提交，每次提交必须使用一个从未执行过的新操作对象；已回退的对象也不得再次提交。",
      "submit 先执行操作，再把成功执行的对象压入历史栈。undoLast 取出并移除最近一次尚未回退的操作，然后调用其回退方法。历史为空时什么也不做；本题不支持重做，也不保留已回退对象。"
    ],
    blocks: [{ code: `import java.util.ArrayDeque;
import java.util.Deque;

interface EditAction {
    void execute();
    void undo();
}

class ValueCell {
    private int value;
    ValueCell(int value) { this.value = value; }
    int read() { return value; }
    void write(int value) { this.value = value; }
}

class AddAction implements EditAction {
    private final ValueCell cell;
    private final int delta;
    private int previousValue;
    AddAction(ValueCell cell, int delta) {
        this.cell = cell;
        this.delta = delta;
    }
    public void execute() {
        previousValue = cell.read();
        cell.write(previousValue + delta);
    }
    public void undo() {
        __blank1__;
    }
}

class HistoryPanel {
    private final Deque<EditAction> history = new ArrayDeque<>();
    void submit(EditAction action) {
        action.execute();
        __blank2__;
    }
    void undoLast() {
        if (!history.isEmpty()) {
            EditAction latest = __blank3__;
            latest.undo();
        }
    }
    int historySize() { return history.size(); }
}

public class EditHistoryDemo {
    public static void main(String[] arguments) {
        ValueCell cell = new ValueCell(10);
        HistoryPanel panel = new HistoryPanel();
        panel.submit(new AddAction(cell, 5));
        panel.submit(new AddAction(cell, -3));
        System.out.println(cell.read());
        panel.undoLast();
        System.out.println(cell.read());
        panel.undoLast();
        System.out.println(cell.read());
        panel.undoLast();
        System.out.println(cell.read());
    }
}` }],
    problems: [
      { id: "p1", title: "【问题 1】（3 分）", prompt: "识别主要设计模式（1 分）；填写 HistoryPanel 和 ValueCell 的模式角色名称（各 1 分，不填类名）。", fields: [
        { id: "patternName", label: "模式名称", type: "text", match: "text", score: 1, answers: ["命令模式", "命令", "Command", "Command Pattern"] },
        { id: "panelRole", label: "HistoryPanel 的角色", type: "text", match: "text", score: 1, answers: ["调用者", "请求调用者", "调用者角色", "Invoker"] },
        { id: "cellRole", label: "ValueCell 的角色", type: "text", match: "text", score: 1, answers: ["接收者", "请求接收者", "接收者角色", "Receiver"] }
      ] },
      { id: "p2", title: "【问题 2】（6 分）", prompt: "补全恢复旧值、从栈顶入栈、从栈顶取出且移除操作的代码，每空 2 分。必须使用 history 保存真实操作对象，不得通过重新执行操作来回退。", fields: [
        { id: "blank1", label: "__blank1__", type: "text", match: "code", score: 2, answers: ["cell.write(previousValue)", "this.cell.write(this.previousValue)"] },
        { id: "blank2", label: "__blank2__", type: "text", match: "code", score: 2, answers: ["history.push(action)", "history.addFirst(action)"] },
        { id: "blank3", label: "__blank3__", type: "text", match: "code", score: 2, answers: ["history.pop()", "history.removeFirst()"] }
      ] },
      { id: "p3", title: "【问题 3】（2 分）", prompt: "写出 main 的全部四行输出，按行用英文分号连接。", fields: [
        { id: "output", label: "输出（以 ; 连接）", type: "text", match: "text", score: 2, answers: ["12;15;10;10"] }
      ] },
      { id: "p4", title: "【问题 4】（4 分）", prompt: "新增把数值设置为指定值且可回退的操作，应实现哪个接口（1 分）？是否必须修改 HistoryPanel.submit 方法体（填需要或不需要，1 分）？main 结束时 historySize() 返回多少（1 分）？该新操作执行前必须保存什么，才能准确回退（填写数据名称，1 分）？", fields: [
        { id: "extensionInterface", label: "新操作实现的接口", type: "text", match: "code", score: 1, answers: ["EditAction"] },
        { id: "changeSubmit", label: "是否必须修改 submit", type: "text", match: "text", score: 1, answers: ["不需要", "无需修改", "不需要修改"] },
        { id: "emptyHistory", label: "最终历史长度", type: "text", match: "text", score: 1, answers: ["0"] },
        { id: "savedData", label: "执行前保存的数据", type: "text", match: "text", score: 1, answers: ["旧值", "执行前的值", "执行前的数值", "原值"] }
      ] }
    ],
    explain: "采用命令模式：EditAction 是抽象命令，AddAction 是具体命令，HistoryPanel 是调用者，ValueCell 是接收者，main 负责装配。三空可填 cell.write(previousValue)、history.push(action)、history.pop()。第一次执行保存 10，第二次保存 15，最终先恢复 15 再恢复 10，第三次回退为空操作，因此输出 12;15;10;10，历史长度为 0。peek 只查看不删除，不符合历史语义；按队列顺序回退也不能正确恢复连续状态。新增设置操作实现 EditAction，执行前保存旧值，undo 恢复该值，调用方提交新对象即可，不修改 submit。该实现不承诺并发、失败事务、重做、外部修改后的恢复或重复使用同一操作对象；重复使用会覆盖对象内唯一的旧值快照。其他合理等价表述需人工复核。"
  },
  {
    id: "pattern-resource-tree-original",
    type: "pattern", no: "试题六（Java）", title: "资源目录的逐级容量统计",
    points: 15, minutes: 30, difficulty: 2,
    difficultyReason: "难度 2：需识别叶节点和容器角色，以统一接口递归累计容量，跟踪子目录更新对根查询的影响，并检查空目录边界。",
    kind: "similar", seal: "原创题",
    source: "原创非官方 Java 练习，情境、程序及答案独立编写，非官方真题或评分标准。",
    intro: "阅读说明及 Java 程序，回答四个问题，共 15 分，建议 30 分钟。保存为 ResourceTreeDemo.java，仅替换三个占位符，不含分号。",
    story: [
      "资源管理端统一通过 ResourceNode.units() 查询整数容量。DataFile 返回自身容量，Directory 保存任意数量的 ResourceNode 子节点，其容量是所有直接子节点查询结果的和；子节点可以继续包含下级节点。",
      "结构严格为有限树：无环、无共享子节点、同一子节点不重复加入，最大深度 20。调用方保证这些约束，add 不负责检测非法结构。引用非 null，容量非负且总和不超过 int 上限；单线程，查询期间不修改结构。",
      "目录本身不占容量，空目录为 0。每次查询从 0 重新累计，不缓存、不修改节点、不使用具体类型判断。目录结构允许在两次查询之间通过 add 增加新节点，随后查询必须反映最新结构。"
    ],
    blocks: [{ code: `import java.util.ArrayList;
import java.util.List;

interface ResourceNode {
    int units();
}

class DataFile implements ResourceNode {
    private final int size;
    DataFile(int size) { this.size = size; }
    public int units() { return size; }
}

class Directory implements ResourceNode {
    private final List<__blank1__> children = new ArrayList<>();
    void add(ResourceNode child) { children.add(child); }
    public int units() {
        int total = 0;
        for (ResourceNode child : children) {
            total += __blank2__;
        }
        return total;
    }
}

class UsageView {
    static int measure(ResourceNode node) { return __blank3__; }
}

public class ResourceTreeDemo {
    public static void main(String[] arguments) {
        Directory root = new Directory();
        Directory branch = new Directory();
        Directory empty = new Directory();
        branch.add(new DataFile(3));
        branch.add(new DataFile(2));
        root.add(new DataFile(7));
        root.add(branch);
        root.add(empty);
        System.out.println(UsageView.measure(root));
        System.out.println(UsageView.measure(branch));
        System.out.println(UsageView.measure(empty));
    }
}` }],
    problems: [
      { id: "p1", title: "【问题 1】（3 分）", prompt: "识别主要设计模式（1 分）；填写 DataFile 和 Directory 的模式角色名称（各 1 分）。", fields: [
        { id: "patternName", label: "模式名称", type: "text", match: "text", score: 1, answers: ["组合模式", "组合", "Composite", "Composite Pattern"] },
        { id: "fileRole", label: "DataFile 的角色", type: "text", match: "text", score: 1, answers: ["叶子", "叶节点", "叶子节点", "叶子构件", "Leaf"] },
        { id: "directoryRole", label: "Directory 的角色", type: "text", match: "text", score: 1, answers: ["容器构件", "组合构件", "组合节点", "复合构件", "Composite"] }
      ] },
      { id: "p2", title: "【问题 2】（6 分）", prompt: "补全子节点的统一类型、对子节点的递归委托表达式以及客户端的统一调用，每空 2 分。不得强转到具体类，不得只统计直接文件而忽略下级目录。", fields: [
        { id: "blank1", label: "__blank1__", type: "text", match: "code", score: 2, answers: ["ResourceNode"] },
        { id: "blank2", label: "__blank2__", type: "text", match: "code", score: 2, answers: ["child.units()", "(child).units()"] },
        { id: "blank3", label: "__blank3__", type: "text", match: "code", score: 2, answers: ["node.units()", "(node).units()"] }
      ] },
      { id: "p3", title: "【问题 3】（2 分）", prompt: "写出 main 的三行输出，依次用英文分号连接。", fields: [
        { id: "output", label: "输出（以 ; 连接）", type: "text", match: "text", score: 2, answers: ["12;5;0"] }
      ] },
      { id: "p4", title: "【问题 4】（4 分）", prompt: "新增一种自行计算容量的叶节点，应实现哪个接口（1 分）？是否必须修改 Directory.units 方法体才能包含它（填需要或不需要，1 分）？另在 main 最后追加 branch.add(new DataFile(4))，再次查询 root 得到多少（2 分，仅整数）？仍需遵守树结构约束。", fields: [
        { id: "extensionInterface", label: "新叶节点接口", type: "text", match: "code", score: 1, answers: ["ResourceNode"] },
        { id: "changeUnits", label: "是否必须修改 Directory.units", type: "text", match: "text", score: 1, answers: ["不需要", "无需修改", "不需要修改"] },
        { id: "updatedTotal", label: "增加节点后的根容量", type: "text", match: "text", score: 2, answers: ["16"] }
      ] }
    ],
    explain: "采用组合模式：ResourceNode 是抽象构件，DataFile 是叶子，Directory 是容器构件，UsageView 是客户端。三空为 ResourceNode、child.units()、node.units()。递归汇总依靠动态分派，根得到 7 + (3 + 2) + 0 = 12，分支为 5，空目录为 0。新增叶节点实现 ResourceNode，Directory.units 不变；分支新增容量 4 后，根的新查询为 7 + (3 + 2 + 4) = 16，不累加前次查询结果。统一的是查询接口，不要求叶节点提供无意义的 add；只有容器支持管理子节点。无环和无共享是调用方前提而非代码自动验证的性质；若形成环会递归不终止，不能声称本实现能自动处理一般图。其他合理等价表述需人工复核。"
  },
  {
    id: "pattern-export-workflow-original",
    type: "pattern", no: "试题六（Java）", title: "导出任务的产物选择",
    points: 15, minutes: 30, difficulty: 3,
    difficultyReason: "难度 3：需识别父类流程中的可覆盖创建点，区分子类决定产品与集中条件分支，补全创建和继承关系，并判断每次调用的实例化边界。",
    kind: "similar", seal: "原创题",
    source: "原创非官方 Java 练习，情境、程序及答案独立编写，非官方真题或评分标准。",
    intro: "阅读说明及 Java 程序，回答四个问题，共 15 分，建议 30 分钟。保存为 ExportWorkflowDemo.java，仅替换三个占位符，不含分号。",
    story: [
      "ExportJob 的 run 固定执行创建产物、调用 render、添加方括号三个步骤，run 不允许子类覆盖。父类只依赖 Artifact 接口，并声明 protected 抽象方法 createArtifact，由不同任务子类提供其实现。",
      "TextJob 与 ImageJob 每次调用 createArtifact 都创建一个全新的对应产物。选择任务子类由调用方负责；父类不接收类型字符串，不包含 if 或 switch 选择具体产物，不缓存产物。TextArtifact.render 返回 TEXT，ImageArtifact.render 返回 IMAGE。",
      "所有调用单线程、无异常，创建方法不返回 null，render 不改变任何状态。一次 run 恰好调用一次 createArtifact；连续调用同一任务对象的 run 也应分别创建产物。本题只扩展产物种类，不改变固定输出步骤。"
    ],
    blocks: [{ code: `interface Artifact {
    String render();
}

class TextArtifact implements Artifact {
    public String render() { return "TEXT"; }
}

class ImageArtifact implements Artifact {
    public String render() { return "IMAGE"; }
}

abstract class ExportJob {
    protected abstract Artifact createArtifact();
    final String run() {
        Artifact artifact = __blank1__;
        return "[" + artifact.render() + "]";
    }
}

class TextJob extends ExportJob {
    @Override
    protected Artifact createArtifact() {
        return __blank2__;
    }
}

class ImageJob extends __blank3__ {
    @Override
    protected Artifact createArtifact() {
        return new ImageArtifact();
    }
}

public class ExportWorkflowDemo {
    public static void main(String[] arguments) {
        ExportJob textJob = new TextJob();
        ExportJob imageJob = new ImageJob();
        System.out.println(textJob.run());
        System.out.println(imageJob.run());
        System.out.println(textJob.run());
    }
}` }],
    problems: [
      { id: "p1", title: "【问题 1】（3 分）", prompt: "针对产物创建机制识别主要设计模式（1 分，不填写固定流程对应的行为型模式）；填写 ExportJob 与 TextArtifact 在该创建机制中的角色名称（各 1 分）。", fields: [
        { id: "patternName", label: "创建机制的模式名称", type: "text", match: "text", score: 1, answers: ["工厂方法模式", "工厂方法", "Factory Method", "Factory Method Pattern"] },
        { id: "jobRole", label: "ExportJob 的角色", type: "text", match: "text", score: 1, answers: ["抽象创建者", "创建者", "抽象工厂", "Creator"] },
        { id: "artifactRole", label: "TextArtifact 的角色", type: "text", match: "text", score: 1, answers: ["具体产品", "具体产品角色", "Concrete Product"] }
      ] },
      { id: "p2", title: "【问题 2】（6 分）", prompt: "补全父类调用可覆盖创建方法的表达式、文本任务创建新产物的表达式、图片任务的父类名，每空 2 分。父类 run 中不得直接 new 具体产物，不能绕过动态分派。", fields: [
        { id: "blank1", label: "__blank1__", type: "text", match: "code", score: 2, answers: ["createArtifact()", "this.createArtifact()"] },
        { id: "blank2", label: "__blank2__", type: "text", match: "code", score: 2, answers: ["new TextArtifact()", "(new TextArtifact())"] },
        { id: "blank3", label: "__blank3__", type: "text", match: "code", score: 2, answers: ["ExportJob"] }
      ] },
      { id: "p3", title: "【问题 3】（2 分）", prompt: "写出 main 的三行输出，依次用英文分号连接，保留方括号。", fields: [
        { id: "output", label: "输出（以 ; 连接）", type: "text", match: "text", score: 2, answers: ["[TEXT];[IMAGE];[TEXT]"] }
      ] },
      { id: "p4", title: "【问题 4】（4 分）", prompt: "新增 CsvArtifact implements Artifact 以及 CsvJob extends ExportJob。CsvJob 必须覆盖哪个创建方法（填无参数的方法名，1 分）？是否必须修改 ExportJob.run 方法体（填需要或不需要，1 分）？独立对同一个 TextJob 连续调用两次 run，会创建几个 TextArtifact 对象（1 分）？当前创建机制由子类覆盖方法决定产品，还是由集中条件分支决定产品（填写前者或后者，1 分）？", fields: [
        { id: "extensionMethod", label: "需要覆盖的方法名（不带括号）", type: "text", match: "code", score: 1, answers: ["createArtifact"] },
        { id: "changeRun", label: "是否必须修改 run", type: "text", match: "text", score: 1, answers: ["不需要", "无需修改", "不需要修改"] },
        { id: "creationCount", label: "两次调用的产物数", type: "text", match: "text", score: 1, answers: ["2"] },
        { id: "creationBoundary", label: "产品选择机制", type: "text", match: "text", score: 1, answers: ["前者", "子类覆盖方法决定产品"] }
      ] }
    ],
    explain: "创建机制采用工厂方法模式：Artifact 是抽象产品，TextArtifact 和 ImageArtifact 是具体产品；ExportJob 是抽象创建者，TextJob 与 ImageJob 是具体创建者。三空为 createArtifact()、new TextArtifact()、ExportJob。父类固定流程 run 动态调用子类提供的创建方法，随后统一使用 Artifact，输出 [TEXT];[IMAGE];[TEXT]。run 的固定骨架也具有模板方法特征，但问题 1 明确询问创建机制。这里不是集中接收类型参数再用 switch/new 分支的简单工厂；决定具体产品的是子类对创建方法的覆盖。新增 CsvJob 覆盖 createArtifact 并返回新的 CsvArtifact，无需修改 run，装配方仍需选择新任务。连续两次 run 创建两个不同对象；相同输出不等于复用同一产物。若需求改为改变固定输出步骤，则超出本题扩展边界，不能宣称现有 final run 支持任意流程变化。其他合理等价表述需人工复核。"
  }
);
