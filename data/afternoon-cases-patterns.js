// 原创非官方练习。由页面在 afternoon-cases.js 之后加载。
window.AFTERNOON_CASES = window.AFTERNOON_CASES || [];
window.AFTERNOON_CASES.push(
  {
    id: "pattern-checkout-original",
    type: "pattern",
    no: "试题六（Java）",
    title: "订单结算规则切换",
    points: 15,
    minutes: 30,
    kind: "similar",
    seal: "原创题",
    difficulty: "中等",
    source: "原创非官方 Java 练习，非历年真题或官方答案。难度：中等；开放问答参考答案不穷尽等价表述。",
    intro: "阅读说明与 Java 程序，回答问题 1 至问题 4。共 15 分，建议 30 分钟。",
    story: [
      "某商城将不同订单的计价规则封装为可替换对象。结算器只保存统一接口的引用，不判断具体规则类型；调用方可以在运行期间更换该引用。当前支持原价和九折计价，未来可能增加满额减免。",
      "金额单位为元，输入非负且最多两位小数，使用字符串构造 BigDecimal，禁止改用 double。每次计算独立地从原始金额开始，最终保留两位小数，按 HALF_UP 四舍五入，不将上次结果作为下次输入。引用均非 null。",
      "将程序保存为 CheckoutDemo.java。仅替换 __blank1__ 至 __blank3__，不增删其他代码；空位均为表达式或类型，不含分号。"
    ],
    blocks: [{ code: `import java.math.BigDecimal;
import java.math.RoundingMode;

interface PriceRule {
    BigDecimal calculate(BigDecimal originalAmount);
}

class RegularPrice implements PriceRule {
    public BigDecimal calculate(BigDecimal originalAmount) {
        return originalAmount.setScale(2, RoundingMode.HALF_UP);
    }
}

class MemberPrice implements PriceRule {
    public BigDecimal calculate(BigDecimal originalAmount) {
        return originalAmount.multiply(new BigDecimal("0.90"))
                .setScale(2, RoundingMode.HALF_UP);
    }
}

class Checkout {
    private __blank1__ priceRule;

    Checkout(PriceRule initialRule) {
        this.priceRule = initialRule;
    }

    void changeRule(PriceRule replacementRule) {
        this.priceRule = __blank2__;
    }

    BigDecimal total(BigDecimal originalAmount) {
        return __blank3__;
    }
}

public class CheckoutDemo {
    public static void main(String[] arguments) {
        BigDecimal originalAmount = new BigDecimal("19.95");
        Checkout checkout = new Checkout(new RegularPrice());
        System.out.println(checkout.total(originalAmount).toPlainString());
        checkout.changeRule(new MemberPrice());
        System.out.println(checkout.total(originalAmount).toPlainString());
        checkout.changeRule(new RegularPrice());
        System.out.println(checkout.total(originalAmount).toPlainString());
    }
}` }],
    problems: [
      {
        id: "p1", title: "【问题 1】（3 分）",
        prompt: "识别主要设计模式，并填写 Checkout 在该模式中的角色名称（不是类名）。",
        fields: [
          { id: "patternName", label: "模式名称", type: "text", match: "text", score: 2, answers: ["策略模式", "策略", "Strategy", "Strategy Pattern"] },
          { id: "contextRole", label: "Checkout 的角色", type: "text", match: "text", score: 1, answers: ["上下文", "上下文角色", "环境角色", "环境类", "Context"] }
        ]
      },
      {
        id: "p2", title: "【问题 2】（6 分）",
        prompt: "补全统一接口类型、替换引用和委托调用，使所有现有规则及未来实现同一接口的规则都能工作。",
        fields: [
          { id: "blank1", label: "__blank1__", type: "text", match: "code", score: 2, answers: ["PriceRule"] },
          { id: "blank2", label: "__blank2__", type: "text", match: "code", score: 2, answers: ["replacementRule", "(replacementRule)"] },
          { id: "blank3", label: "__blank3__", type: "text", match: "code", score: 2, answers: ["priceRule.calculate(originalAmount)", "this.priceRule.calculate(originalAmount)"] }
        ]
      },
      {
        id: "p3", title: "【问题 3】（2 分）",
        prompt: "写出 main 的三行输出，依次用英文分号连接。注意 19.95 × 0.90 的舍入位置。",
        fields: [{ id: "output", label: "三行输出（以 ; 连接）", type: "text", match: "text", score: 2, answers: ["19.95;17.96;19.95"] }]
      },
      {
        id: "p4", title: "【问题 4】（4 分）",
        prompt: "新增满额减免规则时，填写新类须实现的接口，并判断是否必须修改 Checkout.total 的方法体（填需要或不需要）；最后指出这种扩展方式主要体现的设计原则。调用方负责选择并传入新规则，不要求本题实现满减公式。",
        fields: [
          { id: "extensionInterface", label: "新类实现的接口", type: "text", match: "identifier", score: 1, answers: ["PriceRule"] },
          { id: "changeTotal", label: "是否必须修改 total 方法体", type: "text", match: "text", score: 1, answers: ["不需要", "无需修改", "不需要修改"] },
          { id: "extensionPrinciple", label: "设计原则", type: "text", match: "text", score: 2, answers: ["开闭原则", "对扩展开放，对修改关闭", "对扩展开放,对修改关闭", "Open Closed Principle", "OCP"] }
        ]
      }
    ],
    explain: "本题是策略模式：PriceRule 是抽象策略，RegularPrice 和 MemberPrice 是具体策略，Checkout 是上下文。它通过组合与委托使用算法，而不是根据类型写条件分支。\n三处依次填 PriceRule、replacementRule、priceRule.calculate(originalAmount)。这些答案替换占位符后构成完整可编译程序。\n19.95 × 0.90 = 17.955，最后按 HALF_UP 保留两位得到 17.96；切回原价后仍从 19.95 开始，因此输出为 19.95、17.96、19.95。\n新增实现 PriceRule 的类，在 calculate 内封装满减逻辑，由调用方实例化并传入即可；Checkout.total 不变，体现开闭原则。开闭原则不意味着整个系统一行都不能修改，装配或配置仍可能变化。自动判分仅匹配列出的等价答案，其他合理表述需人工复核。"
  },
  {
    id: "pattern-alert-original",
    type: "pattern",
    no: "试题六（Java）",
    title: "库存变更通知中心",
    points: 15,
    minutes: 30,
    kind: "similar",
    seal: "原创题",
    difficulty: "中等偏上",
    source: "原创非官方 Java 练习，非历年真题或官方答案。难度：中等偏上；开放问答参考答案不穷尽等价表述。",
    intro: "阅读说明与 Java 程序，回答问题 1 至问题 4。共 15 分，建议 30 分钟。",
    story: [
      "库存中心维护一组接收者。每次库存发生变更，都把最新数量传给已登记的接收者；中心仅依赖统一回调接口，不依赖控制台、邮件等具体接收端。新接收端可以登记，已有接收端可以注销。",
      "本题为单线程同步通知，无并发、无回调异常、无嵌套发布，参数均非 null。登记按对象身份去重，通知顺序严格按登记先后。每次发布开始时复制接收者列表作为本轮快照；回调内登记或注销只影响下一轮，已进入快照的接收者仍执行本轮回调。",
      "程序先登记 A，再登记 B。A 每次收到通知先打印，再注销 B；重复注销已不存在的对象无副作用。保存为 InventoryDemo.java，只替换三个占位符，不含分号。"
    ],
    blocks: [{ code: `import java.util.ArrayList;
import java.util.List;

interface StockListener {
    void onStock(int quantity);
}

class StockCenter {
    private final List<StockListener> listeners = new ArrayList<>();

    void register(StockListener listener) {
        for (StockListener registeredListener : listeners) {
            if (registeredListener == listener) {
                return;
            }
        }
        listeners.add(listener);
    }

    void unregister(StockListener listener) {
        listeners.removeIf(registeredListener -> registeredListener == listener);
    }

    void publish(int quantity) {
        List<StockListener> notificationSnapshot = __blank1__;
        for (StockListener listener : notificationSnapshot) {
            __blank2__;
        }
    }
}

class ConsoleReceiver implements StockListener {
    private final String receiverName;

    ConsoleReceiver(String receiverName) {
        this.receiverName = receiverName;
    }

    public void onStock(int quantity) {
        System.out.println(receiverName + ":" + quantity);
    }
}

class RemovingReceiver implements StockListener {
    private final StockCenter stockCenter;
    private final StockListener removedListener;

    RemovingReceiver(StockCenter stockCenter, StockListener removedListener) {
        this.stockCenter = stockCenter;
        this.removedListener = removedListener;
    }

    public void onStock(int quantity) {
        System.out.println("A:" + quantity);
        __blank3__;
    }
}

public class InventoryDemo {
    public static void main(String[] arguments) {
        StockCenter stockCenter = new StockCenter();
        StockListener consoleReceiver = new ConsoleReceiver("B");
        StockListener removingReceiver = new RemovingReceiver(stockCenter, consoleReceiver);
        stockCenter.register(removingReceiver);
        stockCenter.register(consoleReceiver);
        stockCenter.publish(8);
        stockCenter.publish(5);
    }
}` }],
    problems: [
      {
        id: "p1", title: "【问题 1】（3 分）",
        prompt: "识别主要设计模式，并说明 StockCenter 在该模式中承担的角色名称。",
        fields: [
          { id: "patternName", label: "模式名称", type: "text", match: "text", score: 2, answers: ["观察者模式", "观察者", "Observer", "Observer Pattern"] },
          { id: "subjectRole", label: "StockCenter 的角色", type: "text", match: "text", score: 1, answers: ["主题", "具体主题", "被观察者", "被观察者角色", "Subject", "Concrete Subject"] }
        ]
      },
      {
        id: "p2", title: "【问题 2】（6 分）",
        prompt: "补全本轮快照、统一回调以及注销操作。必须满足回调中修改登记列表不改变本轮通知成员的语义。",
        fields: [
          { id: "blank1", label: "__blank1__", type: "text", match: "code", score: 2, answers: ["new ArrayList<>(listeners)", "new ArrayList<StockListener>(listeners)"] },
          { id: "blank2", label: "__blank2__", type: "text", match: "code", score: 2, answers: ["listener.onStock(quantity)", "(listener).onStock(quantity)"] },
          { id: "blank3", label: "__blank3__", type: "text", match: "code", score: 2, answers: ["stockCenter.unregister(removedListener)", "this.stockCenter.unregister(this.removedListener)"] }
        ]
      },
      {
        id: "p3", title: "【问题 3】（2 分）",
        prompt: "写出 main 的全部输出，按行用英文分号连接；同时考虑通知先后顺序与注销生效的轮次。",
        fields: [{ id: "output", label: "全部输出（以 ; 连接）", type: "text", match: "text", score: 2, answers: ["A:8;B:8;A:5"] }]
      },
      {
        id: "p4", title: "【问题 4】（4 分）",
        prompt: "若 A 在首轮回调中额外登记 C，C 最早在哪轮收到通知（填本轮或下一轮）？这是由于采用了什么机制（填写机制名称）？若增加邮件接收端，填写其实现的接口，并判断是否必须修改 StockCenter.publish 方法体（填需要或不需要）。",
        fields: [
          { id: "newReceiverRound", label: "C 最早收到通知的轮次", type: "text", match: "text", score: 1, answers: ["下一轮", "第二轮"] },
          { id: "mutationReason", label: "保证该语义的机制", type: "text", match: "text", score: 1, answers: ["快照", "快照机制", "列表快照", "通知快照", "发布开始时复制接收者列表"] },
          { id: "extensionInterface", label: "邮件接收端实现的接口", type: "text", match: "identifier", score: 1, answers: ["StockListener"] },
          { id: "changePublish", label: "是否必须修改 publish 方法体", type: "text", match: "text", score: 1, answers: ["不需要", "无需修改", "不需要修改"] }
        ]
      }
    ],
    explain: "本题是观察者模式：StockCenter 是具体主题（被观察者），StockListener 是抽象观察者接口，两个 Receiver 是具体观察者。库存以参数主动传给接收端，属于推送式通知。\n三处依次填 new ArrayList<>(listeners)、listener.onStock(quantity)、stockCenter.unregister(removedListener)。这些答案替换后构成完整可编译程序。\n首轮快照顺序为 A、B。A 打印 A:8 后从原列表注销 B，但快照仍含 B，随后打印 B:8。第二轮快照只有 A，输出 A:5。不要把快照写成 listeners 的别名，也不要依赖直接迭代原列表时是否恰好抛出异常：即使没有抛出 ConcurrentModificationException，也可能跳过本应通知的成员而违背本题语义。\n快照复制的是列表结构，不是接收者对象。新登记 C 不在首轮快照中，因此最早第二轮收到通知。邮件端只需实现 StockListener 并登记，publish 不需要增加具体端类型判断。快照本身不使此实现线程安全；本题结论建立在单线程、无嵌套发布及无异常的约束上。开放问答的其他等价表述需人工复核。"
  }
);
