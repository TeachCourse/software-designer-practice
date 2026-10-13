window.AFTERNOON_CASES = [
  {
    id: "dfd-inspect",
    type: "dfd",
    no: "试题一",
    title: "机器视觉缺陷检测系统",
    points: 15,
    minutes: 30,
    kind: "similar",
    seal: "类题",
    source: "本地改编练习（实体 / 数据存储 / 缺流 / 组成），图与答案按本题需求绘制，非官方原题或官方答案。",
    intro: "阅读下列说明和图，回答问题 1 至问题 4。将解答填入答题栏。",
    story: [
      "随着智能制造的发展，某企业欲开发基于机器视觉的产品缺陷检测系统。主要功能如下：",
      "（1）图像采集。连接高分辨率工业相机拍摄产品表面，接收产品原始图像并存储。",
      "（2）图像预处理。对原始图像做灰度化、去噪、对比度增强，将预处理后图像存储。",
      "（3）缺陷识别。从预处理后图像中提取颜色、形状、纹理等特征并存储；基于特征和系统参数进行识别，得到识别结果。识别结果包括：无缺陷，或有缺陷以及至少一种缺陷类型。",
      "（4）结果输出。根据识别结果向控制分拣系统发送控制指令；同时将识别结果通过前端监控页展示给质量管理员。",
      "（5）后台管理。质量管理员对视觉检测系统参数进行管理或设置，供缺陷识别使用。",
      "（6）数据导出。视觉模型训练平台发送数据请求，系统将积累的产品图像及识别数据（图像特征与识别结果）导出，用于继续训练。"
    ],
    figures: [
      {
        caption: "图 1-1 上下文数据流图（不完整）",
        svg: `<svg viewBox="0 0 860 280" xmlns="http://www.w3.org/2000/svg" class="fig-svg">
          <rect x="20" y="30" width="120" height="48" fill="#fff" stroke="#152536"/>
          <text x="80" y="50" text-anchor="middle" font-size="12">E1</text>
          <text x="80" y="68" text-anchor="middle" font-size="11" fill="#5b6b7c">（待填）</text>
          <rect x="20" y="200" width="120" height="48" fill="#fff" stroke="#152536"/>
          <text x="80" y="220" text-anchor="middle" font-size="12">E3</text>
          <text x="80" y="238" text-anchor="middle" font-size="11" fill="#5b6b7c">（待填）</text>
          <rect x="720" y="30" width="120" height="48" fill="#fff" stroke="#152536"/>
          <text x="780" y="50" text-anchor="middle" font-size="12">E2</text>
          <text x="780" y="68" text-anchor="middle" font-size="11" fill="#5b6b7c">（待填）</text>
          <rect x="720" y="200" width="120" height="48" fill="#fff" stroke="#152536"/>
          <text x="780" y="220" text-anchor="middle" font-size="12">E4</text>
          <text x="780" y="238" text-anchor="middle" font-size="11" fill="#5b6b7c">（待填）</text>
          <rect x="310" y="100" width="240" height="70" rx="36" fill="#f3f6fa" stroke="#152536" stroke-width="1.6"/>
          <text x="430" y="132" text-anchor="middle" font-size="14">缺陷检测系统</text>
          <text x="430" y="152" text-anchor="middle" font-size="11" fill="#5b6b7c">0</text>
          <line x1="140" y1="54" x2="310" y2="120" stroke="#152536" marker-end="url(#arr)"/>
          <text x="210" y="74" font-size="11">产品原始图像</text>
          <line x1="550" y1="120" x2="720" y2="54" stroke="#152536" marker-end="url(#arr)"/>
          <text x="600" y="74" font-size="11">控制指令</text>
          <line x1="140" y1="224" x2="330" y2="160" stroke="#152536" marker-end="url(#arr)"/>
          <text x="160" y="186" font-size="11">系统参数</text>
          <line x1="350" y1="155" x2="140" y2="210" stroke="#152536" marker-end="url(#arr)"/>
          <text x="200" y="168" font-size="11">识别结果</text>
          <line x1="720" y1="224" x2="530" y2="160" stroke="#152536" marker-end="url(#arr)"/>
          <text x="600" y="204" font-size="11">数据请求</text>
          <line x1="530" y1="155" x2="720" y2="210" stroke="#152536" marker-end="url(#arr)"/>
          <text x="600" y="168" font-size="11">导出数据</text>
          <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#152536"/></marker></defs>
        </svg>`
      },
      {
        caption: "图 1-2 0 层数据流图（不完整，虚线为缺失数据流）",
        svg: `<svg viewBox="0 0 920 430" xmlns="http://www.w3.org/2000/svg" class="fig-svg">
          <defs><marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#152536"/></marker>
          <marker id="arrd" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#c44536"/></marker></defs>
          <rect x="10" y="20" width="100" height="40" fill="#fff" stroke="#152536"/><text x="60" y="44" text-anchor="middle" font-size="11">E1</text>
          <rect x="10" y="190" width="100" height="40" fill="#fff" stroke="#152536"/><text x="60" y="214" text-anchor="middle" font-size="11">E3</text>
          <rect x="810" y="20" width="100" height="40" fill="#fff" stroke="#152536"/><text x="860" y="44" text-anchor="middle" font-size="11">E2</text>
          <rect x="810" y="360" width="100" height="40" fill="#fff" stroke="#152536"/><text x="860" y="384" text-anchor="middle" font-size="11">E4</text>
          <rect x="160" y="70" width="120" height="44" rx="14" fill="#f3f6fa" stroke="#152536"/><text x="220" y="88" text-anchor="middle" font-size="11">P1</text><text x="220" y="104" text-anchor="middle" font-size="11">图像采集</text>
          <rect x="340" y="70" width="120" height="44" rx="14" fill="#f3f6fa" stroke="#152536"/><text x="400" y="88" text-anchor="middle" font-size="11">P2</text><text x="400" y="104" text-anchor="middle" font-size="11">图像预处理</text>
          <rect x="520" y="70" width="120" height="44" rx="14" fill="#f3f6fa" stroke="#152536"/><text x="580" y="88" text-anchor="middle" font-size="11">P3</text><text x="580" y="104" text-anchor="middle" font-size="11">缺陷识别</text>
          <rect x="700" y="70" width="120" height="44" rx="14" fill="#f3f6fa" stroke="#152536"/><text x="760" y="88" text-anchor="middle" font-size="11">P4</text><text x="760" y="104" text-anchor="middle" font-size="11">结果输出</text>
          <rect x="160" y="250" width="120" height="44" rx="14" fill="#f3f6fa" stroke="#152536"/><text x="220" y="268" text-anchor="middle" font-size="11">P5</text><text x="220" y="284" text-anchor="middle" font-size="11">后台管理</text>
          <rect x="520" y="310" width="120" height="44" rx="14" fill="#f3f6fa" stroke="#152536"/><text x="580" y="328" text-anchor="middle" font-size="11">P6</text><text x="580" y="344" text-anchor="middle" font-size="11">数据导出</text>
          <path d="M300 170 h110 v28" fill="none" stroke="#152536"/><text x="355" y="162" text-anchor="middle" font-size="10">D1 产品原始图像</text>
          <path d="M470 170 h110 v28" fill="none" stroke="#152536"/><text x="525" y="162" text-anchor="middle" font-size="10">D2 预处理后图像</text>
          <path d="M300 220 h110 v28" fill="none" stroke="#152536"/><text x="355" y="212" text-anchor="middle" font-size="10">D3</text>
          <path d="M640 220 h110 v28" fill="none" stroke="#152536"/><text x="695" y="212" text-anchor="middle" font-size="10">D4</text>
          <path d="M160 330 h110 v28" fill="none" stroke="#152536"/><text x="215" y="322" text-anchor="middle" font-size="10">D5 系统参数</text>
          <line x1="110" y1="40" x2="160" y2="85" stroke="#152536" marker-end="url(#arr2)"/>
          <line x1="640" y1="92" x2="700" y2="92" stroke="#152536" marker-end="url(#arr2)"/>
          <text x="645" y="84" font-size="10">识别结果</text>
          <path d="M220 114 V184 H300" fill="none" stroke="#152536" marker-end="url(#arr2)"/>
          <text x="225" y="145" font-size="10">原始图像写入</text>
          <path d="M375 170 V114" fill="none" stroke="#152536" marker-end="url(#arr2)"/>
          <text x="310" y="137" font-size="10">原始图像读取</text>
          <path d="M430 114 V184 H470" fill="none" stroke="#152536" marker-end="url(#arr2)"/>
          <text x="435" y="150" font-size="10">预处理图像</text>
          <path d="M545 170 V114" fill="none" stroke="#152536" marker-end="url(#arr2)"/>
          <path d="M620 114 V204 H440 V234 H410" fill="none" stroke="#152536" marker-end="url(#arr2)"/>
          <text x="465" y="225" font-size="10">待命名流</text>
          <path d="M300 184 H290 V285 H545 V310" fill="none" stroke="#152536" marker-end="url(#arr2)"/>
          <text x="365" y="278" font-size="10">产品原始图像（导出）</text>
          <path d="M385 248 V265 H565 V310" fill="none" stroke="#152536" marker-end="url(#arr2)"/>
          <text x="440" y="258" font-size="10">图像特征</text>
          <path d="M695 248 V285 H610 V310" fill="none" stroke="#152536" marker-end="url(#arr2)"/>
          <text x="650" y="280" font-size="10">识别结果</text>
          <path d="M760 114 V410 H60 V230" fill="none" stroke="#152536" marker-end="url(#arr2)"/>
          <text x="330" y="405" font-size="10">识别结果（展示给质量管理员）</text>
          <line x1="110" y1="210" x2="160" y2="268" stroke="#152536" marker-end="url(#arr2)"/>
          <line x1="220" y1="294" x2="215" y2="330" stroke="#152536" marker-end="url(#arr2)"/>
          <line x1="760" y1="70" x2="820" y2="50" stroke="#c44536" stroke-dasharray="6 4" marker-end="url(#arrd)"/>
          <text x="790" y="36" font-size="10" fill="#c44536">?</text>
          <path d="M160 344 H130 V15 H600 V70" fill="none" stroke="#c44536" stroke-dasharray="6 4" marker-end="url(#arrd)"/>
          <text x="450" y="28" font-size="10" fill="#c44536">?（D5 → P3）</text>
          <line x1="640" y1="332" x2="810" y2="375" stroke="#152536" marker-end="url(#arr2)"/>
          <text x="720" y="348" font-size="10">导出数据</text>
          <line x1="810" y1="380" x2="640" y2="350" stroke="#152536" marker-end="url(#arr2)"/>
          <text x="760" y="400" font-size="10">数据请求</text>
          <line x1="580" y1="114" x2="695" y2="220" stroke="#c44536" stroke-dasharray="6 4" marker-end="url(#arrd)"/>
          <text x="655" y="160" font-size="10" fill="#c44536">?</text>
        </svg>`
      }
    ],
    problems: [
      {
        id: "p1",
        title: "【问题 1】（4 分）",
        prompt: "使用说明中的词语，给出图 1-1 中实体 E1～E4 的名称。",
        fields: [
          { id: "E1", label: "E1", type: "text", score: 1, answers: ["工业相机", "高分辨率工业相机", "相机"] },
          { id: "E2", label: "E2", type: "text", score: 1, answers: ["控制分拣系统", "分拣系统"] },
          { id: "E3", label: "E3", type: "text", score: 1, answers: ["质量管理员", "质管员"] },
          { id: "E4", label: "E4", type: "text", score: 1, answers: ["视觉模型训练平台", "训练平台", "模型训练平台"] }
        ]
      },
      {
        id: "p2",
        title: "【问题 2】（3 分）",
        prompt: "使用说明中的词语，给出图 1-2 中数据存储 D3、D4 的名称，以及 P3 写入 D3 的数据内容名称。",
        fields: [
          { id: "D3", label: "D3", type: "text", score: 1, answers: ["图像特征", "特征"] },
          { id: "D4", label: "D4", type: "text", score: 1, answers: ["识别结果"] },
          { id: "P3D3", label: "P3→D3 数据流名称", type: "text", score: 1, answers: ["图像特征", "特征"] }
        ]
      },
      {
        id: "p3",
        title: "【问题 3】（5 分）",
        prompt: "补充图 1-2 中缺失的数据流。每条须写出名称、起点、终点（可写加工编号如 P4，或实体/存储名）。",
        fields: [
          { id: "f1", label: "缺失流 1", type: "triplet", score: 2,
            answers: { name: ["控制指令"], from: ["P4", "结果输出", "P4结果输出"], to: ["E2", "控制分拣系统", "分拣系统"] } },
          { id: "f2", label: "缺失流 2", type: "triplet", score: 2,
            answers: { name: ["系统参数"], from: ["D5", "系统参数"], to: ["P3", "缺陷识别"] } },
          { id: "f3", label: "缺失流 3", type: "triplet", score: 1,
            answers: { name: ["识别结果"], from: ["P3", "缺陷识别"], to: ["D4", "识别结果"] } }
        ]
      },
      {
        id: "p4",
        title: "【问题 4】（3 分）",
        prompt: "根据说明，给出数据流“识别结果”的组成（用 名称 = 成分1 + 成分2 的形式）。",
        fields: [
          { id: "comp", label: "识别结果 =", type: "compose", score: 3,
            parts: [["有无缺陷", "是否有缺陷", "无缺陷或有缺陷"], ["缺陷类型", "缺陷种类"]] }
        ]
      }
    ],
    explain: "实体只在系统之外：相机、分拣系统、质量管理员、训练平台。加工和存储不是实体。\nD3 存特征，D4 存识别结果。P3 识别必须读 D5 系统参数，并把识别结果写入 D4；P4 必须向分拣系统发控制指令。\n识别结果 = 有无缺陷 + 缺陷类型。父图有的边界流，0 层必须能对上（或分解后内容守恒）。"
  },
  {
    id: "dfd-lab",
    type: "dfd",
    no: "试题一",
    title: "实验室设备预约系统",
    points: 15,
    minutes: 30,
    kind: "similar",
    seal: "类题",
    source: "自编类题，题型与下午试题一相同，用于练实体、存储、缺流和平衡。",
    intro: "阅读下列说明和图，回答问题 1 至问题 4。",
    story: [
      "某高校实验室拟开发设备预约系统，主要功能如下：",
      "（1）学生注册与登录。学生提交注册信息，系统校验后写入学生文件；登录时核对学生文件。",
      "（2）设备查询。学生按条件查询，系统读取设备文件返回设备清单。",
      "（3）预约申请。学生提交预约申请（学号、设备编号、时段）。系统读取设备文件与预约文件，判断冲突后生成预约记录写入预约文件，并向学生返回预约结果。",
      "（4）管理员审核。实验室管理员读取待审核预约，给出通过或驳回，系统更新预约文件，并把审核结果通知学生。",
      "（5）使用登记。实验员在设备实际领用/归还时登记，写入使用记录文件，并更新设备文件中的设备状态。",
      "（6）统计报表。管理员请求月报，系统根据预约文件和使用记录文件生成报表给管理员。"
    ],
    figures: [
      {
        caption: "图 1-1 上下文数据流图（不完整）",
        svg: `<svg viewBox="0 0 840 260" xmlns="http://www.w3.org/2000/svg" class="fig-svg">
          <defs><marker id="a3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#152536"/></marker></defs>
          <rect x="30" y="30" width="120" height="46" fill="#fff" stroke="#152536"/><text x="90" y="50" text-anchor="middle" font-size="12">E1</text><text x="90" y="66" text-anchor="middle" font-size="10" fill="#5b6b7c">（待填）</text>
          <rect x="30" y="180" width="120" height="46" fill="#fff" stroke="#152536"/><text x="90" y="200" text-anchor="middle" font-size="12">E2</text><text x="90" y="216" text-anchor="middle" font-size="10" fill="#5b6b7c">（待填）</text>
          <rect x="690" y="105" width="120" height="46" fill="#fff" stroke="#152536"/><text x="750" y="125" text-anchor="middle" font-size="12">E3</text><text x="750" y="141" text-anchor="middle" font-size="10" fill="#5b6b7c">（待填）</text>
          <rect x="300" y="95" width="230" height="66" rx="33" fill="#f3f6fa" stroke="#152536" stroke-width="1.6"/>
          <text x="415" y="125" text-anchor="middle" font-size="14">设备预约系统</text>
          <text x="415" y="145" text-anchor="middle" font-size="11" fill="#5b6b7c">0</text>
          <line x1="150" y1="53" x2="300" y2="115" stroke="#152536" marker-end="url(#a3)"/>
          <text x="180" y="72" font-size="11">注册信息/预约申请</text>
          <line x1="320" y1="120" x2="150" y2="70" stroke="#152536" marker-end="url(#a3)"/>
          <text x="155" y="110" font-size="10">注册登录结果/设备清单/预约及审核结果</text>
          <line x1="150" y1="203" x2="320" y2="150" stroke="#152536" marker-end="url(#a3)"/>
          <text x="175" y="168" font-size="11">审核意见/报表请求</text>
          <path d="M360 161 V245 H90 V226" fill="none" stroke="#152536" marker-end="url(#a3)"/>
          <text x="170" y="240" font-size="11">待审核预约/统计报表</text>
          <line x1="690" y1="128" x2="530" y2="128" stroke="#152536" marker-end="url(#a3)"/>
          <text x="560" y="120" font-size="11">使用登记</text>
        </svg>`
      },
      {
        caption: "图 1-2 0 层数据流图（局部：未展示统计报表加工；仅三条虚线为本题待补流）",
        svg: `<svg viewBox="0 0 900 360" xmlns="http://www.w3.org/2000/svg" class="fig-svg">
          <defs><marker id="a4" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#152536"/></marker>
          <marker id="ad" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#c44536"/></marker></defs>
          <rect x="20" y="20" width="90" height="36" fill="#fff" stroke="#152536"/><text x="65" y="42" text-anchor="middle" font-size="11">E1 学生</text>
          <rect x="20" y="160" width="90" height="36" fill="#fff" stroke="#152536"/><text x="65" y="182" text-anchor="middle" font-size="11">E2</text>
          <rect x="780" y="160" width="100" height="36" fill="#fff" stroke="#152536"/><text x="830" y="182" text-anchor="middle" font-size="11">E3 实验员</text>
          <rect x="160" y="70" width="110" height="40" rx="12" fill="#f3f6fa" stroke="#152536"/><text x="215" y="94" text-anchor="middle" font-size="11">P1 注册登录</text>
          <rect x="330" y="70" width="110" height="40" rx="12" fill="#f3f6fa" stroke="#152536"/><text x="385" y="94" text-anchor="middle" font-size="11">P2 设备查询</text>
          <rect x="500" y="70" width="110" height="40" rx="12" fill="#f3f6fa" stroke="#152536"/><text x="555" y="94" text-anchor="middle" font-size="11">P3 预约申请</text>
          <rect x="330" y="210" width="110" height="40" rx="12" fill="#f3f6fa" stroke="#152536"/><text x="385" y="234" text-anchor="middle" font-size="11">P4 管理员审核</text>
          <rect x="620" y="210" width="110" height="40" rx="12" fill="#f3f6fa" stroke="#152536"/><text x="675" y="234" text-anchor="middle" font-size="11">P5 使用登记</text>
          <path d="M160 150 h100 v24" fill="none" stroke="#152536"/><text x="210" y="144" text-anchor="middle" font-size="10">D1 学生文件</text>
          <path d="M360 150 h100 v24" fill="none" stroke="#152536"/><text x="410" y="144" text-anchor="middle" font-size="10">D2 设备文件</text>
          <path d="M520 150 h100 v24" fill="none" stroke="#152536"/><text x="570" y="144" text-anchor="middle" font-size="10">D3</text>
          <path d="M620 300 h100 v24" fill="none" stroke="#152536"/><text x="670" y="294" text-anchor="middle" font-size="10">D4 使用记录文件</text>
          <line x1="110" y1="38" x2="160" y2="80" stroke="#152536" marker-end="url(#a4)"/>
          <path d="M200 110 V150" fill="none" stroke="#152536" marker-end="url(#a4)"/>
          <path d="M235 150 V110" fill="none" stroke="#152536" marker-end="url(#a4)"/>
          <text x="160" y="130" font-size="9">学生信息读写</text>
          <path d="M410 150 V110" fill="none" stroke="#152536" marker-end="url(#a4)"/>
          <path d="M460 162 H485 V105 H500" fill="none" stroke="#152536" marker-end="url(#a4)"/>
          <path d="M600 150 V110" fill="none" stroke="#152536" marker-end="url(#a4)"/>
          <path d="M675 250 V300" fill="none" stroke="#152536" marker-end="url(#a4)"/>
          <text x="680" y="277" font-size="10">使用记录</text>
          <path d="M640 250 V275 H410 V174" fill="none" stroke="#152536" marker-end="url(#a4)"/>
          <text x="475" y="270" font-size="10">设备状态更新</text>
          <path d="M110 28 H385 V70" fill="none" stroke="#152536" marker-end="url(#a4)"/>
          <text x="290" y="22" font-size="10">查询条件</text>
          <path d="M110 20 V8 H555 V70" fill="none" stroke="#152536" marker-end="url(#a4)"/>
          <text x="460" y="22" font-size="10">预约申请</text>
          <path d="M175 70 V62 H95 V56" fill="none" stroke="#152536" marker-end="url(#a4)"/>
          <path d="M350 70 V48 H110" fill="none" stroke="#152536" marker-end="url(#a4)"/>
          <path d="M520 70 V58 H120 V48 H110" fill="none" stroke="#152536" marker-end="url(#a4)"/>
          <text x="185" y="45" font-size="9">注册登录结果 / 设备清单 / 预约结果</text>
          <line x1="555" y1="110" x2="570" y2="150" stroke="#c44536" stroke-dasharray="6 4" marker-end="url(#ad)"/>
          <text x="590" y="128" font-size="10" fill="#c44536">?</text>
          <line x1="110" y1="178" x2="330" y2="220" stroke="#152536" marker-end="url(#a4)"/>
          <path d="M330 240 H135 V195 H110" fill="none" stroke="#152536" marker-end="url(#a4)"/>
          <text x="165" y="250" font-size="10">待审核预约（展示）</text>
          <line x1="520" y1="164" x2="440" y2="230" stroke="#c44536" stroke-dasharray="6 4" marker-end="url(#ad)"/>
          <text x="455" y="188" font-size="10" fill="#c44536">?</text>
          <path d="M420 210 V190 H570 V174" fill="none" stroke="#152536" marker-end="url(#a4)"/>
          <text x="475" y="205" font-size="10">审核更新</text>
          <line x1="385" y1="210" x2="65" y2="56" stroke="#c44536" stroke-dasharray="6 4" marker-end="url(#ad)"/>
          <text x="180" y="120" font-size="10" fill="#c44536">?</text>
          <line x1="780" y1="178" x2="730" y2="230" stroke="#152536" marker-end="url(#a4)"/>
        </svg>`
      }
    ],
    problems: [
      {
        id: "p1",
        title: "【问题 1】（3 分）",
        prompt: "给出图 1-1 中实体 E1～E3 的名称。",
        fields: [
          { id: "E1", label: "E1", type: "text", score: 1, answers: ["学生"] },
          { id: "E2", label: "E2", type: "text", score: 1, answers: ["实验室管理员", "管理员"] },
          { id: "E3", label: "E3", type: "text", score: 1, answers: ["实验员"] }
        ]
      },
      {
        id: "p2",
        title: "【问题 2】（2 分）",
        prompt: "给出图 1-2 中数据存储 D3 的名称。",
        fields: [
          { id: "D3", label: "D3", type: "text", score: 2, answers: ["预约文件", "预约记录", "预约记录文件"] }
        ]
      },
      {
        id: "p3",
        title: "【问题 3】（7 分）",
        prompt: "补充图 1-2 中三条缺失数据流（名称、起点、终点）。",
        fields: [
          { id: "f1", label: "缺失流 1", type: "triplet", score: 3,
            answers: { name: ["预约记录", "预约申请记录", "预约信息"], from: ["P3", "预约申请"], to: ["D3", "预约文件", "预约记录", "预约记录文件"] } },
          { id: "f2", label: "缺失流 2", type: "triplet", score: 2,
            answers: { name: ["预约记录", "待审核预约", "预约信息"], from: ["D3", "预约文件", "预约记录文件"], to: ["P4", "管理员审核"] } },
          { id: "f3", label: "缺失流 3", type: "triplet", score: 2,
            answers: { name: ["审核结果", "预约结果", "通知"], from: ["P4", "管理员审核"], to: ["E1", "学生"] } }
        ]
      },
      {
        id: "p4",
        title: "【问题 4】（3 分）",
        prompt: "数据流“预约申请”的组成。",
        fields: [
          { id: "comp", label: "预约申请 =", type: "compose", score: 3,
            parts: [["学号"], ["设备编号", "设备号"], ["时段", "预约时段"]] }
        ]
      }
    ],
    explain: "三个外部实体：学生、实验室管理员、实验员。系统内部加工不是实体。\n预约申请写入预约文件（D3）；审核加工必须从 D3 读取待审核记录，并把审核结果送回学生——这三条常被漏画。\n组成用题干原词：学号 + 设备编号 + 时段。"
  },
  {
    id: "er-apt",
    type: "er",
    no: "试题二",
    title: "房屋租赁管理系统",
    points: 15,
    minutes: 30,
    kind: "similar",
    seal: "类题",
    source: "题型对齐下午试题二（联系类型 / 关系模式填空 / 主外键 / 新增需求）。场景为公寓租赁经典结构。",
    intro: "阅读下列说明，回答问题 1 至问题 3。",
    story: [
      "某房屋租赁公司拟开发管理系统，需求如下：",
      "（1）公司拥有多栋公寓楼。每栋公寓楼有唯一楼编号、地址，并由一名经理负责管理；一名经理可管理多栋公寓楼。经理属于员工。",
      "（2）每栋公寓楼包含多套公寓。公寓由楼编号和公寓号共同标识，并记录卧室数、卫生间数。",
      "（3）租客有租客编号、姓名、银行账号。一名租客可签订多份合同，一份合同只对应一套公寓、一名租客。合同记录合同编号、签订日期、起始日期、租期、月租金、押金，并由一名经理经办。",
      "（4）员工分为经理和维修工两类，记录员工编号、姓名、联系电话、类别、月工资。",
      "（5）新增：租期内公寓设施故障，租客可登记故障（系统生成故障编号，填写故障描述）。每项故障由一名维修工维修，需记录维修日期和维修内容。同一故障只维修一次。"
    ],
    figures: [
      {
        caption: "图 2-1 实体联系图（不完整）",
        svg: `<svg viewBox="0 0 900 340" xmlns="http://www.w3.org/2000/svg" class="fig-svg">
          <rect x="40" y="40" width="110" height="50" fill="#fff" stroke="#152536"/><text x="95" y="70" text-anchor="middle" font-size="13">员工</text>
          <polygon points="230,65 280,40 330,65 280,90" fill="#f3f6fa" stroke="#152536"/><text x="280" y="70" text-anchor="middle" font-size="12">管理</text>
          <rect x="380" y="40" width="110" height="50" fill="#fff" stroke="#152536"/><text x="435" y="70" text-anchor="middle" font-size="13">公寓楼</text>
          <polygon points="560,65 610,40 660,65 610,90" fill="#f3f6fa" stroke="#152536"/><text x="610" y="70" text-anchor="middle" font-size="12">包含</text>
          <rect x="710" y="40" width="110" height="50" fill="#fff" stroke="#152536"/><text x="765" y="70" text-anchor="middle" font-size="13">公寓</text>
          <rect x="40" y="230" width="110" height="50" fill="#fff" stroke="#152536"/><text x="95" y="260" text-anchor="middle" font-size="13">租客</text>
          <polygon points="230,255 280,230 330,255 280,280" fill="#f3f6fa" stroke="#152536"/><text x="280" y="260" text-anchor="middle" font-size="12">签订</text>
          <rect x="380" y="230" width="110" height="50" fill="#fff" stroke="#152536"/><text x="435" y="260" text-anchor="middle" font-size="13">合同</text>
          <line x1="150" y1="65" x2="230" y2="65" stroke="#152536"/><line x1="330" y1="65" x2="380" y2="65" stroke="#152536"/>
          <line x1="490" y1="65" x2="560" y2="65" stroke="#152536"/><line x1="660" y1="65" x2="710" y2="65" stroke="#152536"/>
          <line x1="150" y1="255" x2="230" y2="255" stroke="#152536"/><line x1="330" y1="255" x2="380" y2="255" stroke="#152536"/>
          <line x1="490" y1="255" x2="765" y2="90" stroke="#152536"/>
          <text x="190" y="58" font-size="11">1</text><text x="350" y="58" font-size="11">n</text>
          <text x="520" y="58" font-size="11">1</text><text x="680" y="58" font-size="11">n</text>
          <text x="190" y="248" font-size="11">1</text><text x="350" y="248" font-size="11">n</text>
          <text x="620" y="180" font-size="11">n:1</text>
          <text x="40" y="320" font-size="12" fill="#c44536">（故障、维修联系尚未画出）</text>
        </svg>`
      }
    ],
    problems: [
      {
        id: "p1",
        title: "【问题 1】（4 分）",
        prompt: "根据说明，按标签从左到右给出联系类型（1:1、1:n、n:1 或 m:n）。",
        fields: [
          { id: "r1", label: "员工（经理）— 公寓楼「管理」", type: "text", score: 1, answers: ["1:n", "1：n", "一对多"] },
          { id: "r2", label: "公寓楼 — 公寓「包含」", type: "text", score: 1, answers: ["1:n", "1：n", "一对多"] },
          { id: "r3", label: "租客 — 合同「签订」", type: "text", score: 1, answers: ["1:n", "1：n", "一对多"] },
          { id: "r4", label: "合同 — 公寓", type: "text", score: 1, answers: ["n:1", "n：1", "多对一"] }
        ]
      },
      {
        id: "p2",
        title: "【问题 2】（6 分）",
        prompt: "补充关系模式空缺，并指出主键、外键。下划线表示主键。",
        fields: [
          { id: "a", label: "公寓楼( (a) , 地址, 经理编号) 中的 (a)", type: "text", score: 2, answers: ["楼编号", "公寓楼编号"] },
          { id: "b", label: "公寓(楼编号, 公寓号, 卧室数, 卫生间数) 的主键", type: "text", score: 2, answers: ["楼编号+公寓号", "楼编号，公寓号", "(楼编号,公寓号)", "楼编号公寓号"] },
          { id: "c", label: "合同(..., 租期, (c) , 押金) 中的 (c)", type: "text", score: 1, answers: ["月租金", "租金"] },
          { id: "fk", label: "公寓楼.经理编号 参照的实体", type: "text", score: 1, answers: ["员工", "经理", "员工编号"] }
        ]
      },
      {
        id: "p3",
        title: "【问题 3】（5 分）",
        prompt: "根据新增故障维修需求，给出「故障」关系模式（属性用逗号分隔），并标明主键（可写：主键为××）。",
        fields: [
          { id: "fault", label: "故障关系模式", type: "compose", score: 3,
            parts: [["故障编号"], ["租客编号"], ["楼编号"], ["公寓号"], ["故障描述", "描述"]] },
          { id: "pk", label: "故障主键", type: "text", score: 1, answers: ["故障编号"] },
          { id: "fix", label: "维修关系至少应包含的外键（维修工）", type: "text", score: 1, answers: ["员工编号", "维修工编号", "维修工"] }
        ]
      }
    ],
    explain: "经理管理多栋楼 → 1:n，外键经理编号放在公寓楼。楼包含多套公寓 → 1:n，公寓主键为（楼编号，公寓号）。一份合同对应一套公寓、一名租客，租客可有多份合同 → 租客 1:n 合同，合同 n:1 公寓。\n合同要有月租金。故障是新实体，主键故障编号；维修关联员工（维修工）编号。"
  },
  {
    id: "er-course",
    type: "er",
    no: "试题二",
    title: "在线课程选修",
    points: 15,
    minutes: 30,
    kind: "similar",
    seal: "类题",
    source: "自编类题，专门练 m:n 转表、外键放置和范式判断。",
    intro: "阅读下列说明，回答问题 1 至问题 4。",
    story: [
      "某培训机构开发在线选课系统：",
      "（1）学员：学员号、姓名、手机号。学员号唯一。",
      "（2）讲师：讲师号、姓名、专长。一门课程恰好由一名讲师主讲，一名讲师可主讲多门课程。",
      "（3）课程：课程号、课程名、学时、学分。",
      "（4）学员选修课程。一名学员可选多门课，一门课可被多名学员选修。选修时记录选修日期、平时成绩、考试成绩。",
      "（5）课程号能唯一确定课程名、学时、学分和主讲讲师号。学员号能唯一确定姓名、手机号。"
    ],
    figures: [
      {
        caption: "图 2-1 实体联系图（不完整）",
        svg: `<svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" class="fig-svg">
          <rect x="40" y="90" width="110" height="50" fill="#fff" stroke="#152536"/><text x="95" y="120" text-anchor="middle" font-size="13">讲师</text>
          <polygon points="210,115 260,90 310,115 260,140" fill="#f3f6fa" stroke="#152536"/><text x="260" y="120" text-anchor="middle" font-size="12">主讲</text>
          <rect x="360" y="90" width="110" height="50" fill="#fff" stroke="#152536"/><text x="415" y="120" text-anchor="middle" font-size="13">课程</text>
          <polygon points="530,115 580,90 630,115 580,140" fill="#f3f6fa" stroke="#152536"/><text x="580" y="120" text-anchor="middle" font-size="12">选修</text>
          <rect x="670" y="90" width="110" height="50" fill="#fff" stroke="#152536"/><text x="725" y="120" text-anchor="middle" font-size="13">学员</text>
          <line x1="150" y1="115" x2="210" y2="115" stroke="#152536"/><line x1="310" y1="115" x2="360" y2="115" stroke="#152536"/>
          <line x1="470" y1="115" x2="530" y2="115" stroke="#152536"/><line x1="630" y1="115" x2="670" y2="115" stroke="#152536"/>
          <text x="175" y="108" font-size="12">1</text><text x="330" y="108" font-size="12">n</text>
          <text x="500" y="108" font-size="12">?</text><text x="645" y="108" font-size="12">?</text>
        </svg>`
      }
    ],
    problems: [
      {
        id: "p1",
        title: "【问题 1】（3 分）",
        prompt: "讲师与课程、学员与课程的联系类型。",
        fields: [
          { id: "r1", label: "讲师 — 课程", type: "text", score: 1, answers: ["1:n", "1：n", "一对多"] },
          { id: "r2", label: "学员 — 课程", type: "text", score: 2, answers: ["m:n", "m：n", "n:m", "多对多"] }
        ]
      },
      {
        id: "p2",
        title: "【问题 2】（5 分）",
        prompt: "将 E-R 图转换为关系模式。填写空缺。",
        fields: [
          { id: "course_fk", label: "课程关系中应增加的外键", type: "text", score: 2, answers: ["讲师号", "讲师编号"] },
          { id: "enroll", label: "选修关系应有的主键（联合）", type: "text", score: 2, answers: ["学员号+课程号", "课程号+学员号", "(学员号,课程号)", "学员号，课程号"] },
          { id: "enroll_a", label: "选修关系还应包含的属性（除主键外，写出其中一个成绩类属性即可）", type: "text", score: 1, answers: ["平时成绩", "考试成绩", "成绩"] }
        ]
      },
      {
        id: "p3",
        title: "【问题 3】（4 分）",
        prompt: "若设计成 选修(学员号, 姓名, 课程号, 课程名, 选修日期, 考试成绩)，该关系最高满足第几范式？主要问题是什么？",
        fields: [
          { id: "nf", label: "最高范式", type: "text", score: 2, answers: ["1NF", "第一范式", "1"] },
          { id: "why", label: "主要问题（写“部分依赖”即可）", type: "text", score: 2, answers: ["部分依赖", "部分函数依赖", "非主属性部分依赖于主键"] }
        ]
      },
      {
        id: "p4",
        title: "【问题 4】（3 分）",
        prompt: "把上述选修关系拆到 2NF 后，「课程」关系的主键是？",
        fields: [
          { id: "pk", label: "课程主键", type: "text", score: 3, answers: ["课程号"] }
        ]
      }
    ],
    explain: "一门课一名讲师、一名讲师多门课 → 1:n，外键讲师号放在课程表。选课是 m:n，必须新建选修表，主键（学员号，课程号）。\n把姓名、课程名塞进选修表会造成非主属性对主键的部分依赖，只有 1NF；拆出课程(课程号, 课程名, …) 后可达 2NF/3NF。"
  },
  {
    id: "er-mall",
    type: "er",
    no: "试题二",
    title: "连锁商场业务数据库",
    points: 15,
    minutes: 30,
    kind: "similar",
    seal: "改编题",
    source: "依据 2009 年上半年软件设计师下午试题二公开题材作本地改编；经理约束、紧急联系人标识与判分口径已明确化，不代表官方原题或官方评分标准。",
    intro: "阅读下列说明，回答问题 1 至问题 3，将解答填入答题栏。",
    blocks: [
      { p: "【说明】某集团公司拥有多个大型连锁商场，公司需要构建一个数据库系统以方便管理其业务运作活动。" },
      { p: "【需求分析结果】" },
      { p: "1. 商场需要记录的信息包括商场编号（编号唯一），商场名称，地址和联系电话。某商场信息如表 2-1 所示。" },
      {
        table: {
          caption: "表 2-1 商场信息表",
          headers: ["商场编号", "商场名称", "地址", "联系电话"],
          rows: [
            ["PS2101", "淮海商场", "淮海中路 918 号", "021-64158818"],
            ["PS2902", "西大街商场", "西大街时代盛典大厦", "029-87283220"],
            ["PS2903", "东大街商场", "碑林区东大街 239 号", "029-87450287"],
            ["PS2901", "长安商场", "雁塔区长安中路 38 号", "029-85264953"]
          ]
        }
      },
      { p: "2. 每个商场包含有不同的部门，部门需要记录的信息包括部门编号（集团公司分配），部门名称，位置分布和联系电话。某商场的部门信息如表 2-2 所示。" },
      {
        table: {
          caption: "表 2-2 部门信息表",
          headers: ["部门编号", "部门名称", "位置分布", "联系电话"],
          rows: [
            ["DT002", "财务部", "商场大楼六层", "82504342"],
            ["DT007", "后勤部", "商场地下副一层", "82504347"],
            ["DT021", "安保部", "商场地下副一层", "82504358"],
            ["DT005", "人事部", "商场大楼六层", "82504446"],
            ["DT001", "管理部", "商场裙楼三层", "82504668"]
          ]
        }
      },
      { p: "3. 每个部门雇用多名员工处理日常事务，每名员工只能隶属于一个部门（新进员工在培训期不隶属于任何部门）。员工需要记录的信息包括员工编号（集团公司分配），姓名，岗位，电话号码和工资。员工信息如表 2-3 所示。" },
      {
        table: {
          caption: "表 2-3 员工信息表",
          headers: ["员工编号", "姓名", "岗位", "电话号码", "工资"],
          rows: [
            ["XA3310", "周超", "理货员", "13609257638", "1500.00"],
            ["SH1075", "刘飞", "防损员", "13477293487", "1500.00"],
            ["XA0048", "江雪花", "广播员", "15234567893", "1428.00"],
            ["BJ3123", "张正华", "部门主管", "13345698432", "1876.00"]
          ]
        }
      },
      { p: "4. 每个部门的员工中有一名是经理，每个经理只能管理一个部门，系统需要记录每个经理的任职时间。本改编采用经理（员工编号，部门编号，任职时间）：员工编号为主键且引用员工，部门编号为非空唯一外键且引用部门；经理管理的部门必须与该员工所属部门一致。部门编号和员工编号均由集团统一分配且全局唯一。" },
      { p: "【概念模型设计】根据需求阶段收集的信息，设计的实体联系图和关系模式（不完整）如下。" }
    ],
    figures: [
      {
        caption: "图 2-1 实体联系图（不完整，请补四个联系）",
        svg: `<svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" class="fig-svg">
          <rect x="40" y="36" width="130" height="52" fill="#fff" stroke="#152536"/>
          <text x="105" y="68" text-anchor="middle" font-size="16">商场</text>
          <rect x="315" y="36" width="130" height="52" fill="#fff" stroke="#152536"/>
          <text x="380" y="68" text-anchor="middle" font-size="16">部门</text>
          <rect x="590" y="36" width="130" height="52" fill="#fff" stroke="#152536"/>
          <text x="655" y="68" text-anchor="middle" font-size="16">经理</text>
          <rect x="315" y="188" width="130" height="52" fill="#fff" stroke="#152536"/>
          <text x="380" y="220" text-anchor="middle" font-size="16">员工</text>
          <line x1="170" y1="62" x2="315" y2="62" stroke="#152536"/>
          <line x1="445" y1="62" x2="590" y2="62" stroke="#152536"/>
          <line x1="380" y1="88" x2="380" y2="188" stroke="#152536"/>
          <line x1="445" y1="214" x2="655" y2="88" stroke="#152536"/>
          <text x="230" y="54" font-size="11" fill="#c44536">联系?</text>
          <text x="500" y="54" font-size="11" fill="#c44536">联系?</text>
          <text x="390" y="150" font-size="11" fill="#c44536">联系?</text>
          <text x="560" y="170" font-size="11" fill="#c44536">联系?</text>
        </svg>`
      }
    ],
    schema: [
      "商场（商场编号，商场名称，地址，联系电话）",
      "部门（部门编号，部门名称，位置分布，联系电话，（a））",
      "员工（员工编号，员工姓名，岗位，电话号码，工资，（b））",
      "经理（（c），任职时间）"
    ],
    problems: [
      {
        id: "p1",
        title: "【问题 1】（6 分）",
        prompt: "根据问题描述，补充四个联系，完善图 2-1。联系名可用联系 1～联系 4 代替，类型填 1:1、1:n 或 m:n。",
        fields: [
          { id: "r1", label: "商场 — 部门", type: "text", score: 1.5, answers: ["1:n", "1：n", "1:m", "一对多"] },
          { id: "r2", label: "部门 — 员工", type: "text", score: 1.5, answers: ["1:n", "1：n", "1:m", "一对多"] },
          { id: "r3", label: "部门 — 经理", type: "text", score: 1.5, answers: ["1:1", "1：1", "一对一"] },
          { id: "r4", label: "员工 — 经理（超类/子类）", type: "text", score: 1.5, answers: ["1:1", "1：1", "一对一", "isa", "is-a", "超类", "子类"] }
        ]
      },
      {
        id: "p2",
        title: "【问题 2】（6 分）",
        prompt: "根据实体联系图，将关系模式中的空 (a)～(c) 补充完整，并分别给出部门、员工和经理关系模式的主键和外键。",
        fields: [
          { id: "a", label: "(a)", type: "text", score: 1, answers: ["商场编号"] },
          { id: "b", label: "(b)", type: "text", score: 1, answers: ["部门编号"] },
          { id: "c", label: "(c)（两个属性，逗号分隔）", type: "compose", score: 1, parts: [["员工编号"], ["部门编号"]] },
          { id: "deptpk", label: "部门：主键", type: "text", score: 0.5, answers: ["部门编号"] },
          { id: "deptfk", label: "部门：外键", type: "text", score: 0.5, answers: ["商场编号"] },
          { id: "emppk", label: "员工：主键", type: "text", score: 0.5, answers: ["员工编号"] },
          { id: "empfk", label: "员工：外键", type: "text", score: 0.5, answers: ["部门编号"] },
          { id: "mgrpk", label: "经理：主键", type: "text", score: 0.5, answers: ["员工编号"] },
          { id: "mgrfk", label: "经理：两个外键（逗号分隔）", type: "compose", score: 0.5, parts: [["员工编号"], ["部门编号"]] }
        ]
      },
      {
        id: "p3",
        title: "【问题 3】（3 分）",
        prompt: "本改编采用共享联系人设计：每位员工必须且只能登记一位紧急联系人，多名员工可以关联同一联系人；系统为每个联系人分配唯一联系人编号，记录姓名和联系电话，姓名或电话不作为唯一标识。员工关系增加非空外键联系人编号，引用紧急联系人。新增实体为 (1)；按“紧急联系人 → 员工”的方向填写 (2) 的联系类型，并给出新增实体的关系模式。",
        fields: [
          { id: "ent", label: "(1) 新增实体", type: "text", score: 1, answers: ["紧急联系人"] },
          { id: "rel", label: "(2) 紧急联系人 → 员工", type: "text", score: 1, answers: ["1:n", "1：n", "一对多"] },
          { id: "schema", label: "紧急联系人关系模式", type: "compose", score: 1,
            parts: [["联系人编号", "紧急联系人编号"], ["姓名", "紧急联系人姓名"], ["联系电话", "电话", "电话号码"]] }
        ]
      }
    ],
    explain: "本题是本地改编，不是官方评分口径。商场→部门为1:n，部门→员工为1:n；培训期员工的部门编号可空。部门→经理为1:1，经理是员工子类。\n部门的主键为部门编号、外键为商场编号；员工的主键为员工编号、外键为部门编号。经理（员工编号，部门编号，任职时间）以员工编号为主键，员工编号和部门编号分别引用员工和部门，部门编号需NOT NULL及UNIQUE；还须约束经理确为该部门员工，并通过业务事务等保证每个部门都有经理。\n共享模型：紧急联系人（联系人编号，姓名，联系电话），主键为联系人编号；员工新增非空外键联系人编号。紧急联系人→员工为1:n，反方向才是n:1。不能把员工编号当联系人主键，否则变成按员工存储联系人信息的另一种模型。"
  }
];
