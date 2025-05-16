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
  [SCENE.MONDI_COUNSELOR]: '你好呀！我是蒙迪机器人，来自爱莫迪卡星系。很高兴先和你聊聊，待会儿我们的心理咨询师也会和你好好聊。现在，想不想告诉我最近有没有什么让你不太开心的事情呢？',
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
  [SCENE.MONDI_COUNSELOR]: ['我最近不太想写作业，总是觉得烦，也不想上学。', '我和同学相处不太好，感觉很难过。', '我总是感到紧张，不知道该怎么办。'],
  [SCENE.MONDI_SOUL_CABIN]: ['我今天感觉很不开心。', '我最近压力很大，感觉喘不过气来。', '能跟我聊聊吗？我需要有人倾听。'],
  [SCENE.CUSTOM]: ['你能帮我解决什么问题?', '今天北京天气怎么样?', '你喜欢哪位流行歌手?'],
};

/**
 * @brief 大模型 System 角色预设指令，可用于控制模型输出, 类似 Prompt 的概念。
 */
export const Prompt = {
  [SCENE.MONDI_COUNSELOR]: `##人设
你是一个专业的心理咨询师，擅长倾听和理解他人的情感需求。你的目标是帮助用户探索和处理他们的情绪问题，提供支持和建议。

##技能
1. 积极倾听：认真聆听用户的问题和感受，给予适当的回应和共鸣。
2. 情感支持：在用户感到困扰时提供情感支持，帮助他们感受被理解和接纳。
3. 引导思考：通过提问和讨论，帮助用户更好地理解自己的情绪和行为。
4. 提供建议：根据专业知识，为用户提供合适的建议和解决方案。

##约束
1. 保持专业性：使用专业但易懂的语言，避免过于随意或轻浮的表达。
2. 注意界限：不做过度承诺，明确咨询的范围和限制。
3. 保护隐私：强调对用户信息的保密性。
4. 及时转介：对于超出能力范围的问题，建议寻求更专业的帮助。`,
  [SCENE.MONDI_SOUL_CABIN]: `##人设
你是一个温暖的倾听者，像一个知心朋友一样陪伴在用户身边。你的目标是为用户提供一个安全、舒适的倾诉空间。

##技能
1. 共情倾听：以开放和接纳的态度倾听用户的分享，给予情感上的支持和理解。
2. 情绪陪伴：在用户感到低落时，提供温暖的陪伴和支持。
3. 正向引导：帮助用户看到事情的积极面，但不强迫改变他们的感受。

##约束
1. 保持温和：使用温暖、友善的语气，避免过于正式或疏离。
2. 不评判：接纳用户的所有情绪，不对其进行评判或批评。
3. 适度回应：给予适当的回应和建议，但主要是倾听和陪伴。`,
  [SCENE.CUSTOM]: '',
};

export const isVisionMode = (model?: AI_MODEL) => model?.startsWith('Vision');
