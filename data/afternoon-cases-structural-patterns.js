// 原创非官方练习；追加到现有题库，不覆盖先前加载的数据。
window.AFTERNOON_CASES = window.AFTERNOON_CASES || [];
window.AFTERNOON_CASES.push(
  {
    id: "pattern-print-adapter-original",
    type: "pattern", no: "试题六（Java）", title: "印务站的新旧报价接入",
    points: 15, minutes: 30, difficulty: 2,
    difficultyReason: "难度 2：根据接口差异识别对象角色，完成张数向箱数的向上取整及元到分的转换，并验证整箱边界与新服务接入。",
    kind: "similar", seal: "原创题",
    source: "原创非官方 Java 练习，情境、代码与答案独立编写，非官方真题或评分标准。",
    intro: "阅读说明及完整 Java 程序模板，完成四个问题。仅替换三个占位符，其他代码不变；填空不含分号。",
    story: [
      "印务站的新结算端只依赖 SheetQuote 接口，传入纸张张数，要求返回以分为单位的整数报价。不能修改旧服务 LegacyTariff：它接收箱数，返回以元为单位的整数报价，每单收取固定 4 元，再按每箱 3 元计费。",
      "每箱最多装 10 张，尾箱即使未满也按一整箱计费。输入 sheets 是 1 至 10000 的整数，不接收零或负数。每次调用代表独立询价，不累加历史金额，不缓存结果。1 元等于 100 分；所有计算使用 int，范围内不会溢出，禁止浮点计算。",
      "LegacySheetQuote 实现新接口，内部持有旧服务对象，以组合和调用完成参数及返回值转换，不继承旧服务。Counter 只保存 SheetQuote 引用，不能根据具体服务类型分支。所有引用非 null，不考虑异常和并发。保存为 PrintQuoteDemo.java。"
    ],
    blocks: [{ code: `interface SheetQuote {
    int centsForSheets(int sheets);
}

final class LegacyTariff {
    int yuanForBoxes(int boxes) {
        return 4 + 3 * boxes;
    }
}

class LegacySheetQuote implements __blank1__ {
    private final LegacyTariff legacy;

    LegacySheetQuote(LegacyTariff legacy) {
        this.legacy = legacy;
    }

    public int centsForSheets(int sheets) {
        int boxes = __blank2__;
        return __blank3__;
    }
}

class Counter {
    private final SheetQuote quote;

    Counter(SheetQuote quote) {
        this.quote = quote;
    }

    int total(int sheets) {
        return quote.centsForSheets(sheets);
    }
}

public class PrintQuoteDemo {
    public static void main(String[] arguments) {
        Counter counter = new Counter(new LegacySheetQuote(new LegacyTariff()));
        System.out.println(counter.total(1));
        System.out.println(counter.total(11));
        System.out.println(counter.total(20));
    }
}` }],
    problems: [
      { id: "p1", title: "【问题 1】（3 分）", prompt: "识别主要设计模式（1 分）；分别填写 SheetQuote 与 LegacyTariff 在该模式中的角色名称，而不是类名（各 1 分）。", fields: [
        { id: "patternName", label: "模式名称", type: "text", match: "text", score: 1, answers: ["适配器模式", "适配器", "Adapter", "Adapter Pattern", "对象适配器模式"] },
        { id: "targetRole", label: "SheetQuote 的角色", type: "text", match: "text", score: 1, answers: ["目标接口", "目标", "目标角色", "Target"] },
        { id: "legacyRole", label: "LegacyTariff 的角色", type: "text", match: "text", score: 1, answers: ["被适配者", "被适配者角色", "适配者", "Adaptee"] }
      ] },
      { id: "p2", title: "【问题 2】（6 分）", prompt: "补全接口类型（2 分）、整箱数量表达式（2 分）和以分计价的委托表达式（2 分）。必须调用旧服务报价，不得在新类中复制旧服务的计价公式。", fields: [
        { id: "blank1", label: "__blank1__", type: "text", match: "code", score: 2, answers: ["SheetQuote"] },
        { id: "blank2", label: "__blank2__", type: "text", match: "code", score: 2, answers: ["(sheets + 9) / 10", "(sheets - 1) / 10 + 1"] },
        { id: "blank3", label: "__blank3__", type: "text", match: "code", score: 2, answers: ["legacy.yuanForBoxes(boxes) * 100", "this.legacy.yuanForBoxes(boxes) * 100"] }
      ] },
      { id: "p3", title: "【问题 3】（2 分）", prompt: "写出 main 的三行输出，依次用英文分号连接。注意 20 张恰好装满两箱，不应多收一箱。", fields: [
        { id: "output", label: "输出（以 ; 连接）", type: "text", match: "text", score: 2, answers: ["700;1000;1000"] }
      ] },
      { id: "p4", title: "【问题 4】（4 分）", prompt: "新增一个直接按张、以分报价的服务类，由调用方直接传给 Counter。新类应实现哪个接口（1 分）？是否必须修改 Counter.total 方法体（填需要或不需要，1 分）？另在原旧服务方案中依次询价 20 张和 21 张，写出第二次返回值（2 分，仅整数，不是两次之和）。", fields: [
        { id: "extensionInterface", label: "新服务接口", type: "text", match: "code", score: 1, answers: ["SheetQuote"] },
        { id: "changeCounter", label: "是否必须修改 total", type: "text", match: "text", score: 1, answers: ["不需要", "无需修改", "不需要修改"] },
        { id: "boundaryOutput", label: "21 张的报价（分）", type: "text", match: "text", score: 2, answers: ["1300"] }
      ] }
    ],
    explain: "采用对象适配器模式。SheetQuote 是目标接口，LegacyTariff 是被适配者，LegacySheetQuote 是适配器，Counter 是客户。三空依次为 SheetQuote、(sheets + 9) / 10、legacy.yuanForBoxes(boxes) * 100。完整模板替换这三处即可编译运行。正整数张数向上取整为箱数，再调用旧服务，最后把元乘 100 转为分。1、11、20 张对应 1、2、2 箱，输出 700;1000;1000。21 张要 3 箱，单次金额为 (4 + 3 * 3) * 100 = 1300 分，不累加前次报价。新服务直接实现 SheetQuote，由装配方传入，Counter.total 不变；旧接口不兼容才需要转换，不应强迫所有新服务经过旧服务。角色采用文字匹配，标识符与表达式采用区分大小写的代码匹配。其他合理等价表述可人工复核。"
  },
  {
    id: "pattern-parcel-layers-original",
    type: "pattern", no: "试题六（Java）", title: "礼盒订单的逐层费用计算",
    points: 15, minutes: 30, difficulty: 3,
    difficultyReason: "难度 3：需区分统一组件与附加职责，完成递归委托，追踪非交换的加价和折半顺序，并验证嵌套扩展不改变共享基础对象。",
    kind: "similar", seal: "原创题",
    source: "原创非官方 Java 练习，情境、代码与答案独立编写，非官方真题或评分标准。",
    intro: "阅读说明及完整 Java 程序模板，完成四个问题。仅替换三个占位符，空位不含分号，保存为 ParcelQuoteDemo.java。",
    story: [
      "礼盒站用 Quote 接口统一表示订单报价，cents() 返回以分为单位的非负整数。PlainQuote 提供基础价格；QuoteLayer 也实现相同接口，持有另一个 Quote 对象。调用方可在已有对象外逐层添加费用处理，客户端始终只调用最外层的 cents()。",
      "WrapFee 每次先取得内层报价，再加 200 分；HalfPrice 每次先取得内层报价，再除以 2，使用 Java 非负整数除法向下取整。折半针对内层已经计算出的全部金额，不是只针对原始基础价。加价和折半的顺序不能任意交换。",
      "基础价格在 0 至 100000 分之间，最多嵌套 10 层；全部使用 int，无溢出，不使用浮点数。对象引用非 null，结构无环。cents() 无副作用，不修改内层对象，不累计上次结果，同一基础对象可以被多条独立链共享。",
      "main 中第一条链把加价放在内层、折半放在外层；第二条链次序相反。new 表达式的书写嵌套决定计算顺序，不按类的声明顺序执行。"
    ],
    blocks: [{ code: `interface Quote {
    int cents();
}

class PlainQuote implements Quote {
    private final int baseCents;

    PlainQuote(int baseCents) {
        this.baseCents = baseCents;
    }

    public int cents() {
        return baseCents;
    }
}

abstract class QuoteLayer implements Quote {
    protected final __blank1__ wrapped;

    QuoteLayer(Quote wrapped) {
        this.wrapped = wrapped;
    }
}

class WrapFee extends QuoteLayer {
    WrapFee(Quote wrapped) {
        super(wrapped);
    }

    public int cents() {
        return __blank2__;
    }
}

class HalfPrice extends QuoteLayer {
    HalfPrice(Quote wrapped) {
        super(wrapped);
    }

    public int cents() {
        return __blank3__;
    }
}

public class ParcelQuoteDemo {
    public static void main(String[] arguments) {
        Quote base = new PlainQuote(1000);
        Quote first = new HalfPrice(new WrapFee(base));
        Quote second = new WrapFee(new HalfPrice(base));
        System.out.println(first.cents());
        System.out.println(second.cents());
        System.out.println(base.cents());
    }
}` }],
    problems: [
      { id: "p1", title: "【问题 1】（3 分）", prompt: "识别主要设计模式（1 分），填写 Quote 与 WrapFee 的模式角色名称（各 1 分，不填类名）。", fields: [
        { id: "patternName", label: "模式名称", type: "text", match: "text", score: 1, answers: ["装饰器模式", "装饰模式", "装饰器", "装饰", "Decorator", "Decorator Pattern"] },
        { id: "componentRole", label: "Quote 的角色", type: "text", match: "text", score: 1, answers: ["抽象组件", "抽象构件", "组件接口", "构件接口", "Component"] },
        { id: "feeRole", label: "WrapFee 的角色", type: "text", match: "text", score: 1, answers: ["具体装饰器", "具体装饰", "具体装饰者", "具体装饰角色", "Concrete Decorator"] }
      ] },
      { id: "p2", title: "【问题 2】（6 分）", prompt: "补全可以保存任意基础对象或处理层的接口类型（2 分），以及加价、折半的委托表达式（各 2 分）。不得强制转换成具体类，不得绕过内层调用。", fields: [
        { id: "blank1", label: "__blank1__", type: "text", match: "code", score: 2, answers: ["Quote"] },
        { id: "blank2", label: "__blank2__", type: "text", match: "code", score: 2, answers: ["wrapped.cents() + 200", "this.wrapped.cents() + 200"] },
        { id: "blank3", label: "__blank3__", type: "text", match: "code", score: 2, answers: ["wrapped.cents() / 2", "this.wrapped.cents() / 2"] }
      ] },
      { id: "p3", title: "【问题 3】（2 分）", prompt: "写出 main 的全部三行输出，按行用英文分号连接。第三行用来检查共享基础对象是否被改变。", fields: [
        { id: "output", label: "输出（以 ; 连接）", type: "text", match: "text", score: 2, answers: ["600;700;1000"] }
      ] },
      { id: "p4", title: "【问题 4】（4 分）", prompt: "新增每单加 50 分的处理类，沿用当前公共父类，应继承哪个类（1 分）？是否必须修改 HalfPrice.cents 方法体才能让它包含新费用（填需要或不需要，1 分，由调用方正确嵌套）？另独立计算 new WrapFee(new HalfPrice(new WrapFee(new PlainQuote(1001)))) 的 cents() 返回值（2 分，仅整数）。", fields: [
        { id: "extensionBase", label: "新类的父类", type: "text", match: "code", score: 1, answers: ["QuoteLayer"] },
        { id: "changeHalf", label: "是否必须修改 HalfPrice.cents", type: "text", match: "text", score: 1, answers: ["不需要", "无需修改", "不需要修改"] },
        { id: "nestedOutput", label: "三层计算结果（分）", type: "text", match: "text", score: 2, answers: ["800"] }
      ] }
    ],
    explain: "采用装饰器模式：Quote 是抽象组件，PlainQuote 是具体组件，QuoteLayer 是抽象装饰器，WrapFee 与 HalfPrice 是具体装饰器。三空为 Quote、wrapped.cents() + 200、wrapped.cents() / 2，填入完整模板即可编译。第一条链从内到外算 (1000 + 200) / 2 = 600，第二条链算 1000 / 2 + 200 = 700，基础对象仍为 1000，重复查询也不累加。新增类继承 QuoteLayer，覆盖 cents() 并委托内层后加 50；无需修改 HalfPrice.cents，但必须把新费用层放在折半层内部才能一并折半，放在外部就不会折半。最后的三层表达式先得 1201，再整数除以 2 得 600，最后加 200 得 800，不能推迟取整或交换层次。所有金额都以分表示，不涉及浮点误差。自动评分仅覆盖列出的答案，其他合理表述可人工复核。"
  }
);
