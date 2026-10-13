// 原创非官方练习；追加加载，不覆盖已有题库。
window.AFTERNOON_CASES = window.AFTERNOON_CASES || [];
window.AFTERNOON_CASES.push(
  {
    id: "practice-202609-java-template",
    type: "pattern", no: "试题六（Java）", title: "新练习一：文档转换流程",
    points: 15, minutes: 30, difficulty: 2, kind: "similar", seal: "原创题",
    difficultyReason: "难度 2（中等）：从固定流程和可变步骤识别模式，补全抽象方法声明与多态调用，跟踪父类引用的动态绑定，并区别算法步骤扩展与对象创建。",
    source: "原创非官方练习，非历年真题、非官方答案或评分标准。知识范围参照《软件设计师考试大纲（2018年）》科目2（软件设计与开发能力）面向对象设计与程序设计，以及《软件设计师教程》第5版相关面向对象、设计模式和 Java 内容；情境、程序、设问及解析独立编写，不声称对应某年原题。",
    syllabusMapping: "2018年大纲科目2：面向对象设计、设计模式的应用、Java程序设计；教程第5版：抽象类、继承、多态、模板方法与工厂方法的意图区别。",
    intro: "阅读说明和 Java 程序，回答问题 1 至问题 4。共 15 分，建议用时 30 分钟。",
    story: [
      "某文档平台将转换操作分为读取、渲染、保存三个步骤。读取和保存的顺序统一，不允许具体格式改写整个转换流程；各格式只提供渲染结果。为便于观察，本题不访问文件，读取打印 load: 加文档名，保存打印 save，渲染返回带格式前缀的字符串，由统一流程打印。",
      "DocumentFlow.convert 固定流程并调用 render，PdfDocumentFlow 和 HtmlDocumentFlow 分别提供 PDF 与 HTML 渲染行为。main 始终通过 DocumentFlow 类型的引用调用 convert；引用可重新指向另一种格式的对象。文档名均非 null，不考虑异常、并发、缓存和字符转义。",
      "保存为 DocumentConversionDemo.java，只替换 __blank1__ 至 __blank3__。第一空填写完整抽象方法声明但不含末尾分号，第二空为方法调用表达式，第三空填写统一父类类型；不增删其他代码。输出区分大小写，每条 println 对应一行。"
    ],
    blocks: [{ code: `abstract class DocumentFlow {
    public final void convert(String document) {
        System.out.println("load:" + document);
        System.out.println(__blank2__);
        System.out.println("save");
    }

    __blank1__;
}

class PdfDocumentFlow extends DocumentFlow {
    protected String render(String document) {
        return "PDF:" + document;
    }
}

class HtmlDocumentFlow extends DocumentFlow {
    protected String render(String document) {
        return "HTML:" + document;
    }
}

public class DocumentConversionDemo {
    public static void main(String[] arguments) {
        __blank3__ documentFlow = new PdfDocumentFlow();
        documentFlow.convert("report");
        documentFlow = new HtmlDocumentFlow();
        documentFlow.convert("notice");
    }
}` }],
    problems: [
      {
        id: "p1", title: "【问题 1】（3 分）", prompt: "识别固定整体流程、由子类实现可变步骤所采用的主要设计模式，并填写 convert 在该模式中的方法角色名称（不是 Java 修饰符）。",
        fields: [
          { id: "patternName", label: "模式名称", type: "text", match: "text", score: 2, answers: ["模板方法模式", "模板方法", "Template Method", "Template Method Pattern"] },
          { id: "methodRole", label: "convert 的方法角色", type: "text", match: "text", score: 1, answers: ["模板方法", "模板方法角色", "Template Method"] }
        ]
      },
      {
        id: "p2", title: "【问题 2】（6 分）", prompt: "补全代码，每空 2 分。render 必须是 protected 可见的抽象实例方法，返回 String，参数声明为 String document；调用应允许子类覆盖实现生效。",
        fields: [
          { id: "blank1", label: "__blank1__（不含分号）", type: "text", match: "code", score: 2, answers: ["protected abstract String render(String document)", "abstract protected String render(String document)"] },
          { id: "blank2", label: "__blank2__", type: "text", match: "code", score: 2, answers: ["render(document)", "this.render(document)"] },
          { id: "blank3", label: "__blank3__", type: "text", match: "code", score: 2, answers: ["DocumentFlow"] }
        ]
      },
      {
        id: "p3", title: "【问题 3】（2 分）", prompt: "填写 main 的全部六行输出，按顺序用英文分号连接。注意引用的声明类型不决定 render 的实际执行版本。",
        fields: [{ id: "output", label: "六行输出（用 ; 连接）", type: "text", match: "text", score: 2, answers: ["load:report;PDF:report;save;load:notice;HTML:notice;save"] }]
      },
      {
        id: "p4", title: "【问题 4】（4 分）", prompt: "新增纯文本格式时，新类应继承哪个类？是否需要修改 convert 方法体？哪个 Java 修饰符禁止子类覆盖 convert？作为对比，工厂方法模式主要将什么职责的决定延迟到子类（填创建对象或固定算法步骤）？每项 1 分。",
        fields: [
          { id: "extensionBase", label: "新类的父类", type: "text", match: "identifier", score: 1, answers: ["DocumentFlow"] },
          { id: "changeFlow", label: "是否需要修改 convert", type: "text", match: "text", score: 1, answers: ["不需要", "不需要修改", "无需修改"] },
          { id: "fixedModifier", label: "禁止覆盖的修饰符", type: "text", match: "code", score: 1, answers: ["final"] },
          { id: "factoryIntent", label: "工厂方法的主要职责", type: "text", match: "text", score: 1, answers: ["创建对象", "对象创建", "决定创建哪种产品对象"] }
        ]
      }
    ],
    explain: "【问题1，3分】采用模板方法模式（2分）。DocumentFlow 为抽象类角色，convert 是模板方法（1分），在父类中定义 load、render、save 的算法骨架。render 是抽象基本操作，由具体子类实现；并非每个抽象方法都是工厂方法。\n【问题2，6分】依次填 protected abstract String render(String document)、render(document)、DocumentFlow，每空2分。abstract protected 的修饰符顺序及 this.render(document) 均等价。抽象方法没有方法体，末尾分号由题面提供；不能重复填分号，不能加 static、private 或方法体。父类将 render 声明为 protected，与子类实现的可见性一致。第三空使用具体 PDF 类型将导致之后赋值 HTML 对象不兼容。\n【问题3，2分】完整输出为 load:report、PDF:report、save、load:notice、HTML:notice、save（六行顺序全部正确得2分）。第一次实际对象为 PdfDocumentFlow，第二次为 HtmlDocumentFlow，因此即使调用语句和引用声明类型不变，父类 convert 内的 render 仍动态绑定到对应子类。final 只禁止覆盖 convert，不会把其内部虚方法调用改成静态绑定，也不禁止引用重新赋值。\n【问题4，4分】新类继承 DocumentFlow，实现 protected String render(String document)，例如返回 \"TEXT:\" + document；原 convert 不需要修改，固定流程的修饰符是 final，工厂方法主要关注创建对象，每项1分。调用端仍须实例化新类，开闭原则不意味着装配代码永不改变。本题的 render 返回转换结果字符串，并没有将具体产品对象的创建职责交给子类；仅看到继承和抽象方法就判为工厂方法是常见误区。两种模式可以在更大设计中协作，但意图不同。\n【判分边界】代码按区分大小写的词法匹配，空白格式可变化；输出按题面用分号连接。每字段独立计分，不对同一代码空拆分语法分。开放表述列出常见别名但不穷尽，语义合理而未匹配的答案需人工复核；此为练习评分约定，不是官方标准。"
  },
  {
    id: "practice-202609-java-bridge",
    type: "pattern", no: "试题六（Java）", title: "新练习二：消息发送渠道与消息类型扩展",
    points: 15, minutes: 30, difficulty: 3, kind: "similar", seal: "原创题",
    difficultyReason: "难度 3（中等偏上）：同时跟踪消息类型与发送渠道两个独立变化维度，补全组合委托及构造链，预测跨维度组合输出，并分析双向扩展和接口兼容问题的区别。",
    source: "原创非官方练习，非历年真题、非官方答案或评分标准。知识范围参照《软件设计师考试大纲（2018年）》科目2（软件设计与开发能力）面向对象设计与程序设计，以及《软件设计师教程》第5版相关面向对象、设计模式和 Java 内容；情境、程序、设问及解析独立编写，不声称对应某年原题。",
    syllabusMapping: "2018年大纲科目2：面向对象设计、设计模式的应用、Java程序设计；教程第5版：组合、委托、抽象与实现分离、桥接与适配器的意图区别。",
    intro: "阅读说明和 Java 程序，回答问题 1 至问题 4。共 15 分，建议用时 30 分钟。",
    story: [
      "通知平台有普通消息与紧急消息两种业务类型，也有邮件与短信两种发送渠道。普通消息原样发送，紧急消息先添加 URGENT: 前缀；渠道再添加 MAIL: 或 SMS: 并打印。任意消息类型都可与任意渠道配合，未来类型和渠道均会独立增加，不希望为每个类型与渠道的组合建立一个专用类。",
      "Message 层保存 DeliveryChannel 接口引用，消息子类决定内容加工，具体渠道实现负责发送。渠道接口从系统设计之初即统一约定，不存在待兼容的旧接口。每个消息对象在构造时接收渠道且不再更换，每次 send 只向该渠道委托一次；所有引用和内容非 null，不考虑失败重试、并发或网络通信。",
      "保存为 MessageSendingDemo.java，只替换 __blank1__ 至 __blank3__，第一空是接口类型，第二空是调用表达式，第三空是构造器首条调用，均不含末尾分号。main 演示三个组合；各次发送互相独立，不累积前缀。"
    ],
    blocks: [{ code: `interface DeliveryChannel {
    void deliver(String content);
}

class MailChannel implements DeliveryChannel {
    public void deliver(String content) {
        System.out.println("MAIL:" + content);
    }
}

class SmsChannel implements DeliveryChannel {
    public void deliver(String content) {
        System.out.println("SMS:" + content);
    }
}

abstract class Message {
    private final __blank1__ channel;

    Message(DeliveryChannel channel) {
        this.channel = channel;
    }

    protected final void deliver(String content) {
        __blank2__;
    }

    abstract void send(String content);
}

class PlainMessage extends Message {
    PlainMessage(DeliveryChannel channel) {
        super(channel);
    }

    void send(String content) {
        deliver(content);
    }
}

class UrgentMessage extends Message {
    UrgentMessage(DeliveryChannel channel) {
        __blank3__;
    }

    void send(String content) {
        deliver("URGENT:" + content);
    }
}

public class MessageSendingDemo {
    public static void main(String[] arguments) {
        Message plainMessage = new PlainMessage(new MailChannel());
        Message urgentSms = new UrgentMessage(new SmsChannel());
        Message urgentMail = new UrgentMessage(new MailChannel());
        plainMessage.send("hello");
        urgentSms.send("alarm");
        urgentMail.send("alarm");
    }
}` }],
    problems: [
      {
        id: "p1", title: "【问题 1】（3 分）", prompt: "识别主要设计模式，并分别填写 Message 子类层次与 DeliveryChannel 实现层次各自表示的变化维度（业务含义，不是类名），每项 1 分。",
        fields: [
          { id: "patternName", label: "模式名称", type: "text", match: "text", score: 1, answers: ["桥接模式", "桥接", "Bridge", "Bridge Pattern"] },
          { id: "messageDimension", label: "Message 子类的变化维度", type: "text", match: "text", score: 1, answers: ["消息类型", "消息业务类型", "业务消息类型"] },
          { id: "channelDimension", label: "DeliveryChannel 实现的变化维度", type: "text", match: "text", score: 1, answers: ["发送渠道", "消息发送渠道", "发送通道", "消息发送方式"] }
        ]
      },
      {
        id: "p2", title: "【问题 2】（6 分）", prompt: "补全字段类型、向传入渠道的委托调用和父类构造调用，每空 2 分。不得硬编码具体渠道或直接打印代替委托。",
        fields: [
          { id: "blank1", label: "__blank1__", type: "text", match: "code", score: 2, answers: ["DeliveryChannel"] },
          { id: "blank2", label: "__blank2__", type: "text", match: "code", score: 2, answers: ["channel.deliver(content)", "this.channel.deliver(content)"] },
          { id: "blank3", label: "__blank3__", type: "text", match: "code", score: 2, answers: ["super(channel)", "super((channel))"] }
        ]
      },
      {
        id: "p3", title: "【问题 3】（2 分）", prompt: "填写 main 的全部三行输出，按顺序用英文分号连接。前缀的组合顺序由实际方法调用决定。",
        fields: [{ id: "output", label: "三行输出（用 ; 连接）", type: "text", match: "text", score: 2, answers: ["MAIL:hello;SMS:URGENT:alarm;MAIL:URGENT:alarm"] }]
      },
      {
        id: "p4", title: "【问题 4】（4 分）", prompt: "新增推送渠道 PushChannel 和摘要消息 DigestMessage：前者应实现什么接口，后者应继承什么类？是否必须修改原有 Message、MailChannel、SmsChannel 的方法体？作为对比，适配器模式主要解决什么问题（填接口不兼容或两个维度独立扩展）？每项 1 分。",
        fields: [
          { id: "extensionInterface", label: "PushChannel 实现的接口", type: "text", match: "identifier", score: 1, answers: ["DeliveryChannel"] },
          { id: "extensionBase", label: "DigestMessage 继承的类", type: "text", match: "identifier", score: 1, answers: ["Message"] },
          { id: "changeExisting", label: "是否必须修改原有方法体", type: "text", match: "text", score: 1, answers: ["不需要", "不需要修改", "无需修改"] },
          { id: "adapterIntent", label: "适配器主要解决的问题", type: "text", match: "text", score: 1, answers: ["接口不兼容", "接口兼容问题", "已有接口不兼容", "转换不兼容接口"] }
        ]
      }
    ],
    explain: "【问题1，3分】主要采用桥接模式（1分），两个独立维度分别为消息类型、发送渠道（各1分）。Message 是抽象化角色，PlainMessage、UrgentMessage 是扩充抽象化，DeliveryChannel 是实现化接口，MailChannel、SmsChannel 是具体实现化。这里的抽象化与实现化是模式角色，不是简单地按 Java 中 abstract 与 implements 关键字区分。两个层次以组合关系连接，不建立普通邮件、紧急邮件、普通短信、紧急短信四个交叉组合专用类。\n【问题2，6分】依次填 DeliveryChannel、channel.deliver(content)、super(channel)，每空2分；this.channel.deliver(content) 与 super((channel)) 是列出的等价写法。Message 持有接口而不是某个具体渠道，deliver 将内容委托给实际渠道对象。子类构造器调用父类构造器，将传入引用正确初始化；父类没有无参构造器，不能省略。第二空若写 deliver(content) 会递归调用自己，而不是发送；直接 new MailChannel 将破坏短信与后续新增渠道的组合能力。\n【问题3，2分】输出为 MAIL:hello、SMS:URGENT:alarm、MAIL:URGENT:alarm（三行顺序全部正确得2分）。紧急消息先将内容加工为 URGENT:alarm，再由渠道在最前面加 SMS: 或 MAIL:。两个紧急消息是不同对象，各自从原始 alarm 开始，不会叠加 URGENT:。\n【问题4，4分】PushChannel 实现 DeliveryChannel，在 deliver 中打印 PUSH: 加 content；DigestMessage 继承 Message，构造器执行 super(channel)，在 send 中调用 deliver(\"DIGEST:\" + content)。它可立即与邮件、短信、推送组合；原有 Message 与渠道方法体不需要修改。接口、父类、无需修改、接口不兼容各1分。新增两类及装配代码仍需编写，不能把无需修改已有方法体理解成整个工程完全不变化。\n本题预先分离两个变化维度；适配器的主要意图则是让不兼容的已有接口协作，常包含接口或参数转换。不能只因代码里都有接口、对象引用和转发调用就把两种模式混同，也不能仅凭渠道可替换就忽略消息类型层次而判为策略模式。\n【判分边界】代码与类型名区分大小写，字段独立计分；开放表述只自动接受列出的常见别名，其他合理表述需人工复核。此评分约定用于原创练习，不冒充官方标准。"
  }
);
