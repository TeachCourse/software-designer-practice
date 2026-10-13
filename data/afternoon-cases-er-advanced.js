// 原创练习，非官方真题；属性集合无序匹配，标识符采用有限别名精确匹配。
window.AFTERNOON_CASES = window.AFTERNOON_CASES || [];
(() => {
  const schemaCode = `PRAGMA foreign_keys = ON;
CREATE TABLE warehouse (
    warehouse_id TEXT PRIMARY KEY NOT NULL
);
CREATE TABLE bin (
    warehouse_id TEXT NOT NULL,
    bin_no TEXT NOT NULL,
    PRIMARY KEY (【weak-key】),
    FOREIGN KEY (warehouse_id) REFERENCES warehouse(warehouse_id)
);
CREATE TABLE supplier (supplier_id TEXT PRIMARY KEY NOT NULL);
CREATE TABLE part (part_id TEXT PRIMARY KEY NOT NULL);
CREATE TABLE allocation (
    supplier_id TEXT NOT NULL REFERENCES supplier(supplier_id),
    part_id TEXT NOT NULL REFERENCES part(part_id),
    warehouse_id TEXT NOT NULL,
    bin_no TEXT NOT NULL,
    PRIMARY KEY (【allocation-key】),
    FOREIGN KEY (【bin-fk】) REFERENCES bin(warehouse_id, bin_no)
);`;
  const fixtureCode = `INSERT INTO warehouse VALUES ('W1'), ('W2');
INSERT INTO bin VALUES ('W1', 'B1'), ('W1', 'B2'), ('W2', 'B1');
INSERT INTO supplier VALUES ('S1'), ('S2');
INSERT INTO part VALUES ('P1'), ('P2');
INSERT INTO allocation VALUES
    ('S1', 'P1', 'W1', 'B2'),
    ('S1', 'P2', 'W1', 'B1'),
    ('S2', 'P1', 'W1', 'B1');`;
  const deliveryCode = `-- 仅问题4启用；保留allocation作为授权关系。
CREATE TABLE delivery (
    supplier_id TEXT NOT NULL,
    part_id TEXT NOT NULL,
    warehouse_id TEXT NOT NULL,
    bin_no TEXT NOT NULL,
    delivery_no INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    PRIMARY KEY (【delivery-key】),
    FOREIGN KEY (【delivery-fk】)
        REFERENCES allocation(supplier_id, part_id, warehouse_id, bin_no)
);`;
  window.AFTERNOON_CASES.push({
    id: "original-er-weak-ternary-01", type: "er", no: "原创-ER-进阶-01",
    title: "仓储供货授权：弱实体与三元联系", points: 15, minutes: 30,
    kind: "ai", seal: "原创题", difficulty: 3,
    difficultyReason: "结合弱实体的局部标识、复合外键及三元联系分解反例，并在一次需求变更中保留授权约束。",
    source: "本地 AI 原创软件设计师中级下午数据库设计练习；非官方真题，未经官方审定。",
    intro: "阅读业务说明、ER图与SQLite建表模板，回答4个问题（共15分，建议30分钟）。",
    story: [
      "仓库warehouse以warehouse_id全局唯一标识。库位bin必须且只能属于一个仓库，bin_no只在所属仓库内唯一，不具有独立的全局编号；不同仓库可有同号库位。仓库可以暂时没有库位，库位不能脱离所属仓库存在。",
      "供应商supplier与零件part分别以supplier_id、part_id全局唯一标识。三元联系allocation表示某供应商获准向某一完整库位供应某种零件，并非实际送货。同一三方组合最多一条授权，不记录数量。固定任意两方均可能对应多个第三方，无额外函数依赖、唯一性或连接依赖保证；各方均可暂不参与授权。库位这一方始终包含warehouse_id和bin_no两个属性。",
      "图中二元联系端点的(min,max)表示一个实体实例参与该联系的次数。三元联系端点的0..N同样表示单个实例的参与次数；旁注另行声明固定另两方时仍可有多个该方，不能套用二元联系的对端读法。双矩形是弱实体，双菱形是标识联系，库位侧双线表示全参与；虚线下划线标示局部键。",
      "初始授权恰为下方3行。拟议分解仅保留三种投影：SP(supplier_id,part_id)、SB(supplier_id,warehouse_id,bin_no)、PB(part_id,warehouse_id,bin_no)，再将三者全部自然连接。采用关系集合语义，投影去重；W2/B1虽是合法库位但暂无授权。",
      "属性集合填写给定英文列名，以逗号分隔，顺序不限；标识符须保持小写。判分仅接受列出的精确答案或有限别名，不支持开放式语义评分。DDL中的占位符对应答案字段；外键列在可执行SQL中须按REFERENCES所列顺序排列，不能因集合判分无序而调换对应关系。"
    ],
    blocks: [
      { p: "问题1、2的关系映射模板（只补属性列表）：" }, { code: schemaCode },
      { p: "初始数据（问题3独立使用）：" }, { code: fixtureCode },
      { p: "问题4新增表模板：" }, { code: deliveryCode }
    ],
    figures: [{
      caption: "图1 仓储授权ER图（端点含义及三元约束见图下注记）",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 530" class="fig-svg" role="img" aria-labelledby="er-advanced-title">
  <title id="er-advanced-title">仓库通过标识联系拥有弱实体库位；库位、供应商、零件共同参与三元供货授权</title>
  <g fill="white" stroke="#26384a" stroke-width="2">
    <rect x="35" y="45" width="190" height="90"/>
    <path d="M345 90 L420 40 L495 90 L420 140 Z"/>
    <path d="M355 90 L420 48 L485 90 L420 132 Z"/>
    <rect x="655" y="40" width="250" height="110"/>
    <rect x="661" y="46" width="238" height="98"/>
    <path d="M225 90 H345 M495 86 H655 M495 94 H655" fill="none"/>
    <rect x="40" y="305" width="190" height="85"/>
    <rect x="710" y="305" width="190" height="85"/>
    <path d="M365 345 L470 285 L575 345 L470 405 Z"/>
    <path d="M230 345 H365 M575 345 H710 M780 150 V220 H470 V285" fill="none"/>
    <path d="M741 126 H820" stroke-dasharray="5 3"/>
  </g>
  <g fill="#152536" font-family="sans-serif" font-size="16" text-anchor="middle">
    <text x="130" y="76">仓库 warehouse</text>
    <text x="130" y="111" text-decoration="underline">warehouse_id</text>
    <text x="420" y="96">拥有</text>
    <text x="780" y="74">库位 bin（弱实体）</text>
    <text x="780" y="99">局部键：</text><text x="780" y="123">bin_no</text>
    <text x="279" y="78">(0,N)</text><text x="588" y="77">(1,1)</text>
    <text x="135" y="337">供应商 supplier</text>
    <text x="135" y="368" text-decoration="underline">supplier_id</text>
    <text x="805" y="337">零件 part</text>
    <text x="805" y="368" text-decoration="underline">part_id</text>
    <text x="470" y="341">供货授权</text><text x="470" y="365">allocation</text>
    <text x="275" y="331">0..N</text><text x="667" y="331">0..N</text>
    <text x="820" y="185">0..N</text>
    <text x="480" y="445">三元约束：固定任意两方，第三方均可有多个；无额外唯一性保证。</text>
    <text x="480" y="477">各0..N为该端单个实例的参与次数；一次授权连接三个实体各一个实例。</text>
    <text x="480" y="509">库位为完整的“仓库编号 + 库位号”，不得把bin_no当成全局键。</text>
  </g>
</svg>`
    }],
    problems: [
      { id: "er-adv-p1", title: "【问题1】（4分）", prompt: "识别弱实体，给出其局部键和转换为关系后的主键。不要把所属仓库编号误当成库位的局部键。", fields: [
        { id: "weak-entity", label: "弱实体英文名", type: "text", match: "code", score: 1, answers: ["bin"] },
        { id: "partial-key", label: "局部键属性集合", type: "text", match: "set", score: 1, answers: ["bin_no"] },
        { id: "weak-key", label: "bin主键属性集合", type: "text", match: "set", score: 2, answers: ["warehouse_id,bin_no"] }
      ] },
      { id: "er-adv-p2", title: "【问题2】（4分）", prompt: "完成allocation的关系映射：给出主键属性集合，以及指向bin的那一个复合外键的本表属性集合。不能拆为两个独立外键，也不增设代理键。", fields: [
        { id: "allocation-key", label: "allocation主键属性集合", type: "text", match: "set", score: 2, answers: ["supplier_id,part_id,warehouse_id,bin_no"] },
        { id: "bin-fk", label: "指向bin的复合外键属性集合", type: "text", match: "set", score: 2, answers: ["warehouse_id,bin_no"] }
      ] },
      { id: "er-adv-p3", title: "【问题3】（3分）", prompt: "把初始allocation投影成SP、SB、PB，再全部自然连接。判断候选元组(S1,P1,W1,B1)是原有、伪元组还是不出现；给出重建结果总行数；判断该分解能否保证无损（填“能”或“不能”）。注意只连两张投影不足以证明本题结论。", fields: [
        { id: "tuple-status", label: "候选元组类别", type: "text", match: "text", score: 1, answers: ["伪元组", "伪造元组"] },
        { id: "join-count", label: "三表连接结果行数", type: "text", match: "code", score: 1, answers: ["4"] },
        { id: "lossless", label: "能否保证无损", type: "text", match: "text", score: 1, answers: ["不能"] }
      ] },
      { id: "er-adv-p4", title: "【问题4】（4分）", prompt: "需求变更：保留allocation表示授权，新增delivery记录每次实际送货。同一授权可有零到多次送货，delivery_no仅在该完整授权组合内唯一，quantity不是键；不使用全局送货编号。每次送货必须对应一条真实授权。给出delivery的主键属性集合和指向allocation的复合外键属性集合。", fields: [
        { id: "delivery-key", label: "delivery主键属性集合", type: "text", match: "set", score: 2, answers: ["supplier_id,part_id,warehouse_id,bin_no,delivery_no"] },
        { id: "delivery-fk", label: "指向allocation的复合外键属性集合", type: "text", match: "set", score: 2, answers: ["supplier_id,part_id,warehouse_id,bin_no"] }
      ] }
    ],
    explain: "问题1：bin依赖warehouse标识，局部键是bin_no，完整主键为(warehouse_id,bin_no)。W1/B1与W2/B1是不同库位。问题2：固定任意两方都不能唯一确定第三方，所以一般映射必须包含三方的完整标识，即四列主键；指向bin必须用(warehouse_id,bin_no)这个整体，不能只检查两个分量各自存在。问题3：SP含(S1,P1)，SB含(S1,W1,B1)，PB含(P1,W1,B1)，三者来自不同原记录，却共同拼出不存在的授权(S1,P1,W1,B1)。全部连接恰为原3行加这一行，共4行；投影丢失三方共同出现的约束，因此不能保证无损。这里以一个合法实例反驳普遍无损，并非声称每个实例都会产生伪元组。问题4：delivery主键为(supplier_id,part_id,warehouse_id,bin_no,delivery_no)，其中前四列一起外键引用allocation；只分别引用供应商、零件、库位不能确保该三方组合获准。不同授权可复用同一delivery_no，同一授权下不可重号。建表时复合外键的顺序须与被引用列一一对应；主键列顺序不影响这里的唯一性语义。"
  });
})();
