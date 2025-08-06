/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

export enum ACTIONS {
  StartVoiceChat = 'StartVoiceChat',
  UpdateVoiceChat = 'UpdateVoiceChat',
  StopVoiceChat = 'StopVoiceChat',
}

/**
 * @brief 请求参数类型
 * @note OpenAPI 接口参数结构可能更新, 请参阅最新文档内容。
 * https://www.volcengine.com/docs/6348/1404673?s=g
 */
export interface RequestParams {
  /**
   * @brief 通过接口开启数字人，使用前需要开 ASR、LLM、TTS 等服务。
   */
  [ACTIONS.StartVoiceChat]: {
    AppId: string;
    BusinessId?: string;
    RoomId: string;
    TaskId: string;
    Config: Partial<{
      BotName: string;
      ASRConfig: {
        AppId: string;
        Cluster?: string;
      };
      TTSConfig: Partial<{
        AppId: string;
        VoiceType: string;
        Cluster?: string;
        IgnoreBracketText?: number[];
      }>;
      LLMConfig: Partial<{
        AppId: string;
        ModelName?: string;
        ModelVersion: string;
        Mode?: string;
        Host?: string;
        Region?: string;
        MaxTokens?: number;
        MinTokens?: number;
        Temperature?: number;
        TopP?: number;
        TopK?: number;
        MaxPromptTokens?: number;
        SystemMessages?: string[];
        UserMessages?: string[];
        HistoryLength?: number;
        WelcomeSpeech?: string;
        EndPointId?: string;
        BotId?: string;
      }>;
    }>;
    /**
     * @brief 智能体基本配置。
     */
    AgentConfig: {
      TargetUserId: string[];
      WelcomeMessage: string;
      UserId: string;
      EnableConversationStateCallback?: boolean;
      ServerMessageSignatureForRTS?: string;
      ServerMessageURLForRTS?: string;
    };
  };
  /**
   * @brief 控制数字人行为，目前支持行为见 Command 参数。
   */
  [ACTIONS.UpdateVoiceChat]: {
    AppId: string;
    BusinessId?: string;
    RoomId: string;
    TaskId: string;
    Command: string;
    Message?: string;
  };
  /**
   * @brief 关闭数字人任务。
   */
  [ACTIONS.StopVoiceChat]: {
    AppId: string;
    BusinessId?: string;
    RoomId: string;
    TaskId: string;
  };
}

/**
 * @brief 返回参数类型
 */
export interface RequestResponse {
  [ACTIONS.StartVoiceChat]: string;
  [ACTIONS.UpdateVoiceChat]: string;
  [ACTIONS.StopVoiceChat]: string;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};
