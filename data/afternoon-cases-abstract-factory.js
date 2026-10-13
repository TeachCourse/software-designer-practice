// 原创非官方练习；仅追加数据，由入口页面负责加载。
window.AFTERNOON_CASES = window.AFTERNOON_CASES || [];
window.AFTERNOON_CASES.push({
  id: "pattern-paired-display-original",
  type: "pattern", no: "试题六（Java）", title: "终端界面的成套组件装配",
  points: 15, minutes: 30, difficulty: 3,
  difficultyReason: "难度 3：需识别两个产品等级结构与两个产品族，补全注入后的成套创建，区分扩展产品族与扩展产品种类，并判断族一致性的保证边界。",
  kind: "similar", seal: "原创题",
  source: "原创非官方 Java 练习，情境、代码及答案独立编写，非官方真题或评分标准。",
  intro: "阅读说明及 Java 程序，回答四个问题，共 15 分，建议 30 分钟。保存为 DisplayDemo.java，仅替换三个占位符，不含分号。",
  story: [
    "终端界面每次需要成套使用一个按钮 Button 和一个边框 Border。Day 系列返回 DAY 标记，Night 系列返回 NIGHT 标记。两种组件属于不同产品种类，同一系列的按钮和边框组成一个产品族。",
    "Display 接收一个 ComponentFactory 对象，只通过它的两个创建方法各取得一个组件并保存，不按字符串选择具体类，不在客户端直接实例化具体组件。组件无状态，每次创建返回新对象；所有引用非 null，单线程，无异常。summary 的三段依次是按钮标记、边框标记、两者标记是否相同。",
    "约定每个合规的具体 ComponentFactory 都返回自己系列的两种组件。由同一个注入对象创建并遵守此约定，才能保证配套；接口没有泛型族标签或其他静态类型约束，不会阻止错误实现返回混搭组件。程序仅比较标记并显示结果，不拒绝混搭。"
  ],
  blocks: [{ code: `interface Button {
    String family();
}
interface Border {
    String family();
}
interface ComponentFactory {
    Button createButton();
    Border createBorder();
}
class DayButton implements Button {
    public String family() { return "DAY"; }
}
class DayBorder implements Border {
    public String family() { return "DAY"; }
}
class NightButton implements Button {
    public String family() { return "NIGHT"; }
}
class NightBorder implements Border {
    public String family() { return "NIGHT"; }
}
class DayFactory implements ComponentFactory {
    public Button createButton() { return new DayButton(); }
    public Border createBorder() { return new DayBorder(); }
}
class NightFactory implements ComponentFactory {
    public Button createButton() { return new NightButton(); }
    public Border createBorder() { return __blank1__; }
}
class Display {
    private final Button button;
    private final Border border;
    Display(ComponentFactory factory) {
        button = __blank2__;
        border = __blank3__;
    }
    String summary() {
        return button.family() + "/" + border.family() + "/"
            + button.family().equals(border.family());
    }
}
public class DisplayDemo {
    public static void main(String[] arguments) {
        ComponentFactory selected = new DayFactory();
        Display first = new Display(selected);
        selected = new NightFactory();
        Display second = new Display(selected);
        System.out.println(first.summary());
        System.out.println(second.summary());
        System.out.println(first.summary());
    }
}` }],
  problems: [
    { id: "p1", title: "【问题 1】（3 分）", prompt: "从成套创建两种产品的角度识别主要设计模式（1 分）；填写 ComponentFactory 与 Button 的模式角色名称（各 1 分，不填类名）。", fields: [
      { id: "patternName", label: "模式名称", type: "text", match: "text", score: 1, answers: ["抽象工厂模式", "抽象工厂", "Abstract Factory", "Abstract Factory Pattern"] },
      { id: "factoryRole", label: "ComponentFactory 的角色", type: "text", match: "text", score: 1, answers: ["抽象工厂", "抽象工厂角色", "Abstract Factory"] },
      { id: "buttonRole", label: "Button 的角色", type: "text", match: "text", score: 1, answers: ["抽象产品", "抽象产品角色", "Abstract Product"] }
    ] },
    { id: "p2", title: "【问题 2】（6 分）", prompt: "补全三个表达式，每空 2 分。第一空创建本系列的新边框，后两空必须通过传入的 factory 创建组件，不得硬编码系列、强转或自行判断具体类型。", fields: [
      { id: "blank1", label: "__blank1__", type: "text", match: "code", score: 2, answers: ["new NightBorder()", "(new NightBorder())"] },
      { id: "blank2", label: "__blank2__", type: "text", match: "code", score: 2, answers: ["factory.createButton()", "(factory).createButton()"] },
      { id: "blank3", label: "__blank3__", type: "text", match: "code", score: 2, answers: ["factory.createBorder()", "(factory).createBorder()"] }
    ] },
    { id: "p3", title: "【问题 3】（2 分）", prompt: "写出 main 的全部三行输出，依次用英文分号连接。", fields: [
      { id: "output", label: "输出（以 ; 连接）", type: "text", match: "text", score: 2, answers: ["DAY/DAY/true;NIGHT/NIGHT/true;DAY/DAY/true"] }
    ] },
    { id: "p4", title: "【问题 4】（4 分）", prompt: "新增 Paper 产品族并提供 PaperButton、PaperBorder、PaperFactory 后，是否必须修改 Display 类（1 分）？PaperFactory 应实现哪个接口（1 分）？若新增第三种产品种类 Menu，要求两个已有具体创建类都支持创建它，且不提供默认实现，除新增 Menu 及其具体类外，必须修改哪个已有接口（1 分）？仅凭现有 Java 接口，编译器能否阻止某实现同时返回 DayButton 和 NightBorder（填能或不能，1 分）？", fields: [
      { id: "changeDisplay", label: "新增产品族是否必须修改 Display", type: "text", match: "text", score: 1, answers: ["不需要", "无需修改", "不需要修改"] },
      { id: "extensionInterface", label: "PaperFactory 实现的接口", type: "text", match: "code", score: 1, answers: ["ComponentFactory"] },
      { id: "productTypeInterface", label: "新增 Menu 必须修改的已有接口", type: "text", match: "code", score: 1, answers: ["ComponentFactory"] },
      { id: "typeGuarantee", label: "编译器能否阻止混搭", type: "text", match: "text", score: 1, answers: ["不能", "不能阻止"] }
    ] }
  ],
  explain: "这是抽象工厂模式，而非只创建单一产品等级结构的工厂方法或集中分支的简单工厂：ComponentFactory 声明两个产品种类的创建方法，DayFactory、NightFactory 为具体工厂，Button、Border 为抽象产品，四个组件类为具体产品，Display 为客户端。三空为 new NightBorder()、factory.createButton()、factory.createBorder()。selected 重新赋值不会改变 first 已保存的组件，输出 DAY/DAY/true;NIGHT/NIGHT/true;DAY/DAY/true。新增 Paper 族只需实现两类产品和 ComponentFactory，由装配代码注入 PaperFactory，Display 不变。新增 Menu 种类需要在 ComponentFactory 中增加 Menu createMenu()，并修改 DayFactory、NightFactory 等所有已有具体工厂实现该方法；若客户端要使用 Menu，还需扩展客户端。新增族方便不等于新增产品种类也无需修改。族一致性依赖同一个注入工厂及其合规实现，不是接口的静态类型证明；混搭实现仍能编译，返回 DAY/NIGHT/false，不会自动抛错或被拒绝。两种产品接口本身不能阻止手工混用不同工厂的产品。其他合理等价表述需人工复核。"
});
