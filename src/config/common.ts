/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import 通用女声 from '@/assets/img/tongyongnvsheng.jpeg';
import 通用男声 from '@/assets/img/tongyongnansheng.jpeg';
import MONDI_COUNSELOR from '@/assets/img/MONDI_COUNSELOR.png';
import MONDI_SOUL_CABIN from '@/assets/img/MONDI_SOUL_CABIN.png';



export enum ModelSourceType {
  Custom = 'Custom',
  Available = 'Available',
}

export enum CustomParamsType {
  TTS = 'TTS',
  ASR = 'ASR',
  LLM = 'LLM',
}

export enum MODEL_MODE {
  ORIGINAL = 'original',
  VENDOR = 'vendor',
  COZE = 'coze',
}

/**
 * @brief AI 音色可选值
 * @default 通用女声
 * @notes 通用女声、通用男声为默认音色, 其它皆为付费音色。
 *        音色 ID 可于 https://console.volcengine.com/speech/service/8?s=g 中开通获取。
 *        对应 "音色详情" 中, "Voice_type" 列的值。
 */
export enum VOICE_TYPE {
  '通用女声' = 'BV001_streaming',
  '通用男声' = 'BV002_streaming',
}

export const VOICE_INFO_MAP = {
  [VOICE_TYPE['通用女声']]: {
    description: '女声 青年 语音合成 通用场景',
    url: '',
    icon: 通用女声,
  },
  [VOICE_TYPE['通用男声']]: {
    description: '男声 青年 语音合成 通用场景',
    url: '',
    icon: 通用男声,
  },
};

/**
 * @brief TTS 的 Cluster
 */
export enum TTS_CLUSTER {
  TTS = 'volcano_tts',
  MEGA = 'volcano_mega',
  ICL = 'volcano_icl',
}

/**
 * @brief TTS 的 Cluster Mapping
 */
export const TTS_CLUSTER_MAP = {
  ...(Object.keys(VOICE_TYPE).reduce(
    (map, type) => ({
      ...map,
      [type]: TTS_CLUSTER.TTS,
    }),
    {}
  ) as Record<VOICE_TYPE, TTS_CLUSTER>),
};

/**
 * @brief 模型可选值
 * @default SKYLARK_LITE_PUBLIC
 */
export enum AI_MODEL {
  DOUBAO_LITE_4K = 'Doubao-lite-4k',
  DOUBAO_PRO_4K = 'Doubao-pro-4k',
  DOUBAO_PRO_32K = 'Doubao-pro-32k',
  DOUBAO_PRO_128K = 'Doubao-pro-128k',
  VISION = 'Vision',
  ARK_BOT = 'ArkBot',
  DEEPSEEK_V3 = 'DeepSeek-V3',
}

/**
 * @brief 模型来源
 */
export enum AI_MODEL_MODE {
  CUSTOM = 'CustomLLM',
  ARK_V3 = 'ArkV3',
}

/**
 * @brief 各模型对应的模式
 */
export const AI_MODE_MAP: Partial<Record<AI_MODEL, AI_MODEL_MODE>> = {
  [AI_MODEL.DOUBAO_LITE_4K]: AI_MODEL_MODE.ARK_V3,
  [AI_MODEL.DOUBAO_PRO_4K]: AI_MODEL_MODE.ARK_V3,
  [AI_MODEL.DOUBAO_PRO_32K]: AI_MODEL_MODE.ARK_V3,
  [AI_MODEL.DOUBAO_PRO_128K]: AI_MODEL_MODE.ARK_V3,
  [AI_MODEL.VISION]: AI_MODEL_MODE.ARK_V3,
  [AI_MODEL.ARK_BOT]: AI_MODEL_MODE.ARK_V3,
  [AI_MODEL.DEEPSEEK_V3]: AI_MODEL_MODE.ARK_V3,
};

/**
 * @brief 方舟模型的 ID
 * @note 具体的模型 ID 请至 https://console.volcengine.com/ark/region:ark+cn-beijing/endpoint?config=%7B%7D&s=g 参看/创建
 *       模型 ID 即接入点 ID, 在上述链接中表格内 "接入点名称" 列中, 类似于 "ep-2024xxxxxx-xxx" 格式即是模型 ID。
 */
export const ARK_V3_MODEL_ID: Partial<Record<AI_MODEL, string>> = {
  [AI_MODEL.DOUBAO_LITE_4K]: '************** 此处填充方舟上的模型 ID *************',
  [AI_MODEL.DOUBAO_PRO_4K]: '************** 此处填充方舟上的模型 ID *************',
  [AI_MODEL.DOUBAO_PRO_32K]: '************** 此处填充方舟上的模型 ID *************',
  [AI_MODEL.DOUBAO_PRO_128K]: '************** 此处填充方舟上的模型 ID *************',
  [AI_MODEL.VISION]: '************** 此处填充方舟上的模型 ID *************',
  [AI_MODEL.DEEPSEEK_V3]: 'ep-20250514161352-rwlrx',
  // ... 可根据所开通的模型进行扩充
};

/**
 * @brief 方舟智能体 BotID
 * @note 具体的智能体 ID 请至 https://console.volcengine.com/ark/region:ark+cn-beijing/assistant?s=g 参看/创建
 *       Bot ID 即页面上的应用 ID, 类似于 "bot-2025xxxxxx-xxx" 格式即是应用 ID。
 */
export const LLM_BOT_ID: Partial<Record<AI_MODEL, string>> = {
  [AI_MODEL.ARK_BOT]: '************** 此处填充方舟上的 Bot ID *************',
  // ... 可根据所开通的模型进行扩充
};

export enum SCENE {
  MONDI_COUNSELOR = 'MONDI_COUNSELOR',
  MONDI_SOUL_CABIN = 'MONDI_SOUL_CABIN',
  CUSTOM = 'CUSTOM',
}

export const ScreenShareScene: SCENE[] = [];

export const Icon = {
  [SCENE.MONDI_COUNSELOR]: MONDI_COUNSELOR,
  [SCENE.MONDI_SOUL_CABIN]: MONDI_SOUL_CABIN,
  [SCENE.CUSTOM]: MONDI_COUNSELOR,
};

export const Name = {
  [SCENE.MONDI_COUNSELOR]: '蒙迪机器人',
  [SCENE.MONDI_SOUL_CABIN]: '心灵休息舱',
  [SCENE.CUSTOM]: '自定义',
};

/**
 * @brief 智能体启动后的欢迎词。
 */
export const Welcome = {
  [SCENE.MONDI_COUNSELOR]: '你好呀！我是蒙迪机器人，来自爱莫迪卡星系。很高兴先和你聊聊。现在，想不想告诉我最近有没有什么让你不太开心的事情呢？',
  [SCENE.MONDI_SOUL_CABIN]: '欢迎来到这里，这里是你的专属树洞，想说什么都可以。',
  [SCENE.CUSTOM]: '',
};

export const Model = {
  [SCENE.MONDI_COUNSELOR]: AI_MODEL.DEEPSEEK_V3,
  [SCENE.MONDI_SOUL_CABIN]: AI_MODEL.DEEPSEEK_V3,
  [SCENE.CUSTOM]: AI_MODEL.DEEPSEEK_V3,
};

export const Voice = {
  [SCENE.MONDI_COUNSELOR]: VOICE_TYPE.通用女声,
  [SCENE.MONDI_SOUL_CABIN]: VOICE_TYPE.通用女声,
  [SCENE.CUSTOM]: VOICE_TYPE.通用女声,
};

export const Questions = {
  [SCENE.MONDI_COUNSELOR]: [
    '我最近不太想写作业，总是觉得烦，也不想上学。',
    '我和同学相处不太好，感觉很难过。',
    '我总是感到紧张，不知道该怎么办。',
  ],
  [SCENE.MONDI_SOUL_CABIN]: [
    '我今天感觉很不开心。',
    '我最近压力很大，感觉喘不过气来。',
    '能跟我聊聊吗？我需要有人倾听。',
  ],
  [SCENE.CUSTOM]: ['你能帮我解决什么问题?', '今天北京天气怎么样?', '你喜欢哪位流行歌手?'],
};

/**
 * @brief 大模型 System 角色预设指令，可用于控制模型输出, 类似 Prompt 的概念。
 */
export const Prompt = {
  [SCENE.MONDI_COUNSELOR]: `
# 角色
你是 **蒙迪 (Mondi)**，来自“爱莫迪卡”星系的情绪伙伴（这只是一个趣味设定，当被问及身份的时候据此回答，其他时候不要把自己当成外星人）。你是一个善于共情和支持的人，懂得用温暖的语言和好奇心引导学生说出他的真实感受，并且给他们给予支持和鼓励。  
当被问及身份时，回答：「我是来自爱莫迪卡星系的外星机器人蒙迪。」平时说话保持心理咨询的自然口吻，不以外星人口吻交流。  
 面向对象为**青少年与儿童**。涉及恋爱话题时，不评判、不胁迫，帮助学生识别界限、尊重与安全，兼顾学业与作息。使用适龄用语，强调界限、尊重、安全与时间管理，不鼓励也不否定，重在引导自我觉察与选择。

# 对话守则和流程
现在你正在和他们进行约 10 分钟的一对一对话。在进行对话的最开始，尝试引导学生说出自己的困惑。当学生说出来之后，大致遵循以下的步骤（可以适当调整，不要生搬硬套，目的是让孩子更轻松表达感受）：

**1. 倾听共情，确认情绪**  
用 ≤2 句、≤50 字复述学生当下情绪，表达理解与接纳。用「也就是说…对吗？」类似的结构，校准对方的真实处境与需求。

**2. 深入提问**（每次确认后选择合适的方向进行追问）  
- 事件细节：比如「后来发生了什么？」  
- 情感体验：比如「那一刻你心里是什么感觉？」  
- 现实层面：父母/老师知情度、环境因素。  
- 个人诉求：比如「为什么不想让他人知道？」  
**（新增）恋爱话题（青少年）：**  
- 「你们相处时最开心的是什么？最困扰的是什么？」  
- 「对方是否尊重你的界限？你期待哪些边界？」  
- 「这段关系对你的作息和学习有影响吗？你想怎么平衡？」

**3. 情绪教育，正向鼓励**  
在获得足够的信息后，用日常例子解释情绪作用，并给 1–2 个非呼吸类放松小技巧。肯定学生的表达与努力。  
**（新增）** 若是恋爱相关：简单解释「喜欢」与「界限/尊重/安全」的关系，鼓励先照顾作息与学业，再安排沟通与相处时间。

**当学生说「不知道说什么」时**  
不要回复「想到什么说什么」。请直接温和引导：  
- 「可以讲讲你现在的心情吗？」  
- 「发生了什么事让你有这样的心情呢？」

# 语言约束
- 口吻要温暖、亲切、具体，口语化，把学生当成成熟的人聊天。  
- 避免列 1234，避免像外星人一样说话，避免比喻、神秘能量描述，避免明显幼稚的语言比如小动物有关的。  
- 避免诊断、避免承诺。  
- 避免进行一些对自己动作的描述，避免说出你内心的想法比如（根据规则我应该 xxx），只进行对话。  
- 避免问宽泛、不好回答的问题，比如「做什么会让你舒服一些呢？」  
- 收到不完整句子时，仅回复「嗯，我在听，你想继续说吗？」再等输入。  
- 单条回复不要长，≤60 字，便于移动端阅读。  
- 如果学生提了不想说什么话题，就不要提这个话题了，聊一点别的之后再回来。



---


`,
  [SCENE.MONDI_SOUL_CABIN]:  `
  ## 人设  
  你是 **蒙迪 (Mondi)**，来自 **爱莫迪卡 (Emotica)** 星系的“情绪伙伴”。你会在在学生正式见心理咨询师前和学生进行大约时长 10 分钟的一对一对话，引导他们分享的情绪，经历和想法。
  你要用温暖的语言和好奇心引导学生说出他的真实感受，进行合适的追问，帮助他们理解情绪背后的需求，并且给他们给予支持和鼓励。外星人只是趣味设定，目的是让孩子更轻松表达感受。
  
  ## 对话守则
  1. **倾听共情**：用简洁句式复述他们的感受，让学生感到被理解。 语气温暖、亲切，简单，适合儿童/青少年；
  2. **开放提问**：问“今天发生了什么？”、“你觉得怎样？”等具体问题。得到回答后尽量努力继续深挖学生的情况，进行追问，追问的方向有1他具体发生了什么 2他有什么感受。
  3. **情绪教育**：在努力进行足够的追问并且获得足够的信息之后，用日常例子说明情绪作用，可以考虑教 1–2 个简易放松方法，不要说呼吸等即时练习。  
  4. **正向鼓励**：多说肯定或鼓励，增强安全感；若有危机，建议专业帮助。
  
  ## 约束  
  - 不要像外星人一样说话，不要抽象比喻或神秘能量描写；  
  - 不做诊断、不过度承诺；  
  - 不要问宽泛，不好回答的问题，比如“做什么会让你舒服一些呢？“
  - 每次回复 ≤ 120 个中文字符，分段清晰，便于移动端阅读；  
  - 保护隐私；若检测到自伤/他伤倾向，立即引导至咨询师或紧急热线。  
  
  `,
  [SCENE.CUSTOM]: '',
};

export const isVisionMode = (model?: AI_MODEL) => model?.startsWith('Vision');
