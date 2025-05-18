/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import VERTC, {
  MirrorType,
  StreamIndex,
  IRTCEngine,
  RoomProfileType,
  onUserJoinedEvent,
  onUserLeaveEvent,
  MediaType,
  LocalStreamStats,
  RemoteStreamStats,
  StreamRemoveReason,
  LocalAudioPropertiesInfo,
  RemoteAudioPropertiesInfo,
  AudioProfileType,
  DeviceInfo,
  AutoPlayFailedEvent,
  PlayerEvent,
  NetworkQuality,
  VideoRenderMode,
  ScreenEncoderConfig,
} from '@volcengine/rtc';
import RTCAIAnsExtension from '@volcengine/rtc/extension-ainr';
import { Message } from '@arco-design/web-react';
import openAPIs from '@/app/api';
import aigcConfig from '@/config';
import Utils from '@/utils/utils';
import { COMMAND, INTERRUPT_PRIORITY } from '@/utils/handler';
import { endInterview, setInterviewReport, InterviewRecord } from '@/store/slices/room';

export interface IEventListener {
  handleError: (e: { errorCode: any }) => void;
  handleUserJoin: (e: onUserJoinedEvent) => void;
  handleUserLeave: (e: onUserLeaveEvent) => void;
  handleTrackEnded: (e: { kind: string; isScreen: boolean }) => void;
  handleUserPublishStream: (e: { userId: string; mediaType: MediaType }) => void;
  handleUserUnpublishStream: (e: {
    userId: string;
    mediaType: MediaType;
    reason: StreamRemoveReason;
  }) => void;
  handleRemoteStreamStats: (e: RemoteStreamStats) => void;
  handleLocalStreamStats: (e: LocalStreamStats) => void;
  handleLocalAudioPropertiesReport: (e: LocalAudioPropertiesInfo[]) => void;
  handleRemoteAudioPropertiesReport: (e: RemoteAudioPropertiesInfo[]) => void;
  handleAudioDeviceStateChanged: (e: DeviceInfo) => void;
  handleAutoPlayFail: (e: AutoPlayFailedEvent) => void;
  handlePlayerEvent: (e: PlayerEvent) => void;
  handleUserStartAudioCapture: (e: { userId: string }) => void;
  handleUserStopAudioCapture: (e: { userId: string }) => void;
  handleRoomBinaryMessageReceived: (e: { userId: string; message: ArrayBuffer }) => void;
  handleNetworkQuality: (
    uplinkNetworkQuality: NetworkQuality,
    downlinkNetworkQuality: NetworkQuality
  ) => void;
}

interface EngineOptions {
  appId: string;
  uid: string;
  roomId: string;
}

export interface BasicBody {
  room_id: string;
  user_id: string;
  login_token: string | null;
}

/**
 * @brief RTC Core Client
 * @notes Refer to official website documentation to get more information about the API.
 */
export class RTCClient {
  engine!: IRTCEngine;

  config!: EngineOptions;

  basicInfo!: BasicBody;

  private _audioCaptureDevice?: string;

  private _videoCaptureDevice?: string;

  audioBotEnabled = false;

  audioBotStartTime = 0;

  createEngine = async (props: EngineOptions) => {
    this.config = props;
    this.basicInfo = {
      room_id: props.roomId,
      user_id: props.uid,
      login_token: aigcConfig.BaseConfig.Token,
    };

    this.engine = VERTC.createEngine(this.config.appId);
    try {
      const AIAnsExtension = new RTCAIAnsExtension();
      await this.engine.registerExtension(AIAnsExtension);
      AIAnsExtension.enable();
    } catch (error) {
      console.warn(
        `当前环境不支持 AI 降噪, 此错误可忽略, 不影响实际使用, e: ${(error as any).message}`
      );
    }
  };

  addEventListeners = ({
    handleError,
    handleUserJoin,
    handleUserLeave,
    handleTrackEnded,
    handleUserPublishStream,
    handleUserUnpublishStream,
    handleRemoteStreamStats,
    handleLocalStreamStats,
    handleLocalAudioPropertiesReport,
    handleRemoteAudioPropertiesReport,
    handleAudioDeviceStateChanged,
    handleAutoPlayFail,
    handlePlayerEvent,
    handleUserStartAudioCapture,
    handleUserStopAudioCapture,
    handleRoomBinaryMessageReceived,
    handleNetworkQuality,
  }: IEventListener) => {
    this.engine.on(VERTC.events.onError, handleError);
    this.engine.on(VERTC.events.onUserJoined, handleUserJoin);
    this.engine.on(VERTC.events.onUserLeave, handleUserLeave);
    this.engine.on(VERTC.events.onTrackEnded, handleTrackEnded);
    this.engine.on(VERTC.events.onUserPublishStream, handleUserPublishStream);
    this.engine.on(VERTC.events.onUserUnpublishStream, handleUserUnpublishStream);
    this.engine.on(VERTC.events.onRemoteStreamStats, handleRemoteStreamStats);
    this.engine.on(VERTC.events.onLocalStreamStats, handleLocalStreamStats);
    this.engine.on(VERTC.events.onAudioDeviceStateChanged, handleAudioDeviceStateChanged);
    this.engine.on(VERTC.events.onLocalAudioPropertiesReport, handleLocalAudioPropertiesReport);
    this.engine.on(VERTC.events.onRemoteAudioPropertiesReport, handleRemoteAudioPropertiesReport);
    this.engine.on(VERTC.events.onAutoplayFailed, handleAutoPlayFail);
    this.engine.on(VERTC.events.onPlayerEvent, handlePlayerEvent);
    this.engine.on(VERTC.events.onUserStartAudioCapture, handleUserStartAudioCapture);
    this.engine.on(VERTC.events.onUserStopAudioCapture, handleUserStopAudioCapture);
    this.engine.on(VERTC.events.onRoomBinaryMessageReceived, handleRoomBinaryMessageReceived);
    this.engine.on(VERTC.events.onNetworkQuality, handleNetworkQuality);
  };

  joinRoom = (token: string | null, username: string): Promise<void> => {
    this.engine.enableAudioPropertiesReport({ interval: 1000 });
    return this.engine.joinRoom(
      token,
      `${this.config.roomId!}`,
      {
        userId: this.config.uid!,
        extraInfo: JSON.stringify({
          call_scene: 'RTC-AIGC',
          user_name: username,
          user_id: this.config.uid,
        }),
      },
      {
        isAutoPublish: true,
        isAutoSubscribeAudio: true,
        roomProfileType: RoomProfileType.chat,
      }
    );
  };

  leaveRoom = () => {
    this.stopAudioBot();
    this.audioBotEnabled = false;
    this.engine.leaveRoom();
    VERTC.destroyEngine(this.engine);
    this._audioCaptureDevice = undefined;
  };

  checkPermission(): Promise<{
    video: boolean;
    audio: boolean;
  }> {
    return VERTC.enableDevices({
      video: false,
      audio: true,
    });
  }

  /**
   * @brief get the devices
   * @returns
   */
  async getDevices(props?: { video?: boolean; audio?: boolean }): Promise<{
    audioInputs: MediaDeviceInfo[];
    audioOutputs: MediaDeviceInfo[];
    videoInputs: MediaDeviceInfo[];
  }> {
    const { video = false, audio = true } = props || {};
    let audioInputs: MediaDeviceInfo[] = [];
    let audioOutputs: MediaDeviceInfo[] = [];
    let videoInputs: MediaDeviceInfo[] = [];
    const { video: hasVideoPermission, audio: hasAudioPermission } = await VERTC.enableDevices({
      video,
      audio,
    });
    if (audio) {
      const inputs = await VERTC.enumerateAudioCaptureDevices();
      const outputs = await VERTC.enumerateAudioPlaybackDevices();
      audioInputs = inputs.filter((i) => i.deviceId && i.kind === 'audioinput');
      audioOutputs = outputs.filter((i) => i.deviceId && i.kind === 'audiooutput');
      this._audioCaptureDevice = audioInputs.filter((i) => i.deviceId)?.[0]?.deviceId;
      if (hasAudioPermission) {
        if (!audioInputs?.length) {
          Message.error('无麦克风设备, 请先确认设备情况。');
        }
        if (!audioOutputs?.length) {
          Message.error('无扬声器设备, 请先确认设备情况。');
        }
      } else {
        Message.error('暂无麦克风设备权限, 请先确认设备权限授予情况。');
      }
    }
    if (video) {
      videoInputs = await VERTC.enumerateVideoCaptureDevices();
      videoInputs = videoInputs.filter((i) => i.deviceId && i.kind === 'videoinput');
      this._videoCaptureDevice = videoInputs?.[0]?.deviceId;
      if (hasVideoPermission) {
        if (!videoInputs?.length) {
          Message.error('无摄像头设备, 请先确认设备情况。');
        }
      } else {
        Message.error('暂无摄像头设备权限, 请先确认设备权限授予情况。');
      }
    }

    return {
      audioInputs,
      audioOutputs,
      videoInputs,
    };
  }

  startVideoCapture = async (camera?: string) => {
    await this.engine.startVideoCapture(camera || this._videoCaptureDevice);
  };

  stopVideoCapture = async () => {
    this.engine.setLocalVideoMirrorType(MirrorType.MIRROR_TYPE_RENDER);
    await this.engine.stopVideoCapture();
  };

  startScreenCapture = async (enableAudio = false) => {
    await this.engine.startScreenCapture({
      enableAudio,
    });
  };

  stopScreenCapture = async () => {
    await this.engine.stopScreenCapture();
  };

  startAudioCapture = async (mic?: string) => {
    await this.engine.startAudioCapture(mic || this._audioCaptureDevice);
  };

  stopAudioCapture = async () => {
    await this.engine.stopAudioCapture();
  };

  publishStream = (mediaType: MediaType) => {
    this.engine.publishStream(mediaType);
  };

  unpublishStream = (mediaType: MediaType) => {
    this.engine.unpublishStream(mediaType);
  };

  publishScreenStream = async (mediaType: MediaType) => {
    await this.engine.publishScreen(mediaType);
  };

  unpublishScreenStream = async (mediaType: MediaType) => {
    await this.engine.unpublishScreen(mediaType);
  };

  setScreenEncoderConfig = async (description: ScreenEncoderConfig) => {
    await this.engine.setScreenEncoderConfig(description);
  };

  /**
   * @brief 设置业务标识参数
   * @param businessId
   */
  setBusinessId = (businessId: string) => {
    this.engine.setBusinessId(businessId);
  };

  setAudioVolume = (volume: number) => {
    this.engine.setCaptureVolume(StreamIndex.STREAM_INDEX_MAIN, volume);
    this.engine.setCaptureVolume(StreamIndex.STREAM_INDEX_SCREEN, volume);
  };

  /**
   * @brief 设置音质档位
   */
  setAudioProfile = (profile: AudioProfileType) => {
    this.engine.setAudioProfile(profile);
  };

  /**
   * @brief 切换设备
   */
  switchDevice = (deviceType: MediaType, deviceId: string) => {
    if (deviceType === MediaType.AUDIO) {
      this._audioCaptureDevice = deviceId;
      this.engine.setAudioCaptureDevice(deviceId);
    }
    if (deviceType === MediaType.VIDEO) {
      this._videoCaptureDevice = deviceId;
      this.engine.setVideoCaptureDevice(deviceId);
    }
    if (deviceType === MediaType.AUDIO_AND_VIDEO) {
      this._audioCaptureDevice = deviceId;
      this._videoCaptureDevice = deviceId;
      this.engine.setVideoCaptureDevice(deviceId);
      this.engine.setAudioCaptureDevice(deviceId);
    }
  };

  setLocalVideoMirrorType = (type: MirrorType) => {
    return this.engine.setLocalVideoMirrorType(type);
  };

  setLocalVideoPlayer = (
    userId: string,
    renderDom?: string | HTMLElement,
    isScreenShare = false
  ) => {
    return this.engine.setLocalVideoPlayer(
      isScreenShare ? StreamIndex.STREAM_INDEX_SCREEN : StreamIndex.STREAM_INDEX_MAIN,
      {
        renderDom,
        userId,
        renderMode: VideoRenderMode.RENDER_MODE_FILL,
      }
    );
  };

  /**
   * @brief 启用 AIGC
   */
  startAudioBot = async () => {
    const roomId = this.basicInfo.room_id;
    const userId = this.basicInfo.user_id;
    if (this.audioBotEnabled) {
      await this.stopAudioBot();
    }
    const agentConfig = aigcConfig.aigcConfig.AgentConfig;

    const options = {
      AppId: aigcConfig.BaseConfig.AppId,
      BusinessId: aigcConfig.BaseConfig.BusinessId,
      RoomId: roomId,
      TaskId: userId,
      AgentConfig: {
        ...agentConfig,
        TargetUserId: [userId],
      },
      Config: aigcConfig.aigcConfig.Config,
    };
    await openAPIs.StartVoiceChat(options);
    this.audioBotEnabled = true;
    this.audioBotStartTime = Date.now();
    Utils.setSessionInfo({ audioBotEnabled: 'enable' });
  };

  /**
   * @brief 关闭 AIGC
   */
  stopAudioBot = async () => {
    const roomId = this.basicInfo.room_id;
    const userId = this.basicInfo.user_id;
    if (this.audioBotEnabled || sessionStorage.getItem('audioBotEnabled')) {
      await openAPIs.StopVoiceChat({
        AppId: aigcConfig.BaseConfig.AppId,
        BusinessId: aigcConfig.BaseConfig.BusinessId,
        RoomId: roomId,
        TaskId: userId,
      });
      this.audioBotStartTime = 0;
      sessionStorage.removeItem('audioBotEnabled');
    }
    this.audioBotEnabled = false;
  };

  /**
   * @brief 命令 AIGC
   */
  commandAudioBot = (command: COMMAND, interruptMode = INTERRUPT_PRIORITY.NONE, message = '') => {
    if (this.audioBotEnabled) {
      this.engine.sendUserBinaryMessage(
        aigcConfig.BotName,
        Utils.string2tlv(
          JSON.stringify({
            Command: command,
            InterruptMode: interruptMode,
            Message: message,
          }),
          'ctrl'
        )
      );
      return;
    }
    console.warn('Interrupt failed, bot not enabled.');
  };

  /**
   * @brief 更新 AIGC 配置
   */
  updateAudioBot = async () => {
    if (this.audioBotEnabled) {
      await this.stopAudioBot();
      await this.startAudioBot();
    } else {
      await this.startAudioBot();
    }
  };

  /**
   * @brief 获取当前 AI 是否启用
   */
  getAudioBotEnabled = () => {
    return this.audioBotEnabled;
  };

  /**
   * @brief 结束情绪面谈并生成报告
   * @description 读取面谈历史，标记面谈结束，生成报告，并停止语音机器人
   */
  endEmotionInterview = async () => {
    const store = (window as any)?.store?.getState();
    const interviewHistory = store?.room?.interviewHistory || [];
    const dispatch = (window as any)?.store?.dispatch;

    if (!interviewHistory.length || !dispatch) {
      console.error('No interview history found or dispatch not available');
      return;
    }

    dispatch(endInterview());

    this.commandAudioBot(
      COMMAND.EXTERNAL_TEXT_TO_SPEECH,
      INTERRUPT_PRIORITY.HIGH,
      '报告正在生成中，请稍候...'
    );

    try {
      const historyText = interviewHistory
        .map(
          (record: InterviewRecord, index: number) =>
            `第${index + 1}轮：\n问题：${record.question}\n回答：${record.answer}\n`
        )
        .join('\n');

      const reportText = `# 情绪面谈报告

## 主要情绪
根据面谈内容，用户表现出了多种情绪状态，包括${getEmotionKeywords(interviewHistory)}。

## 互动概览
本次面谈共进行了${interviewHistory.length}轮对话，涵盖了用户近期的情绪状态、生活经历和心理感受。

## 情绪分析
通过分析用户的回答，可以看出用户的情绪波动与日常生活、人际关系和自我认知密切相关。用户在表达中展现了自我反思的能力，同时也有寻求改变的意愿。

## 建议
1. 建立规律的生活习惯，保持充足的睡眠和适当的运动
2. 学习情绪管理技巧，如深呼吸、冥想等放松方法
3. 与亲友保持良好的沟通，分享自己的感受
4. 在需要时寻求专业心理咨询的帮助

## 面谈记录摘要
${historyText}

注：本报告仅基于面谈内容生成，仅供参考，不构成专业医疗建议。`;

      dispatch(setInterviewReport(reportText));

      this.commandAudioBot(
        COMMAND.EXTERNAL_TEXT_TO_SPEECH,
        INTERRUPT_PRIORITY.HIGH,
        '报告已生成，你可以在页面上查看详细内容。'
      );
    } catch (error) {
      console.error('Failed to generate interview report:', error);
      this.commandAudioBot(
        COMMAND.EXTERNAL_TEXT_TO_SPEECH,
        INTERRUPT_PRIORITY.HIGH,
        '生成报告时出现错误，请稍后再试。'
      );
    }

    await this.stopAudioBot();
  };
}

/**
 * 从面谈历史中提取情绪关键词
 * @param interviewHistory 面谈历史记录
 * @returns 情绪关键词字符串
 */
function getEmotionKeywords(interviewHistory: InterviewRecord[]): string {
  const emotionKeywords = [
    '高兴',
    '开心',
    '快乐',
    '兴奋',
    '愉悦',
    '悲伤',
    '难过',
    '伤心',
    '痛苦',
    '忧郁',
    '愤怒',
    '生气',
    '恼火',
    '烦躁',
    '不满',
    '恐惧',
    '害怕',
    '担忧',
    '焦虑',
    '紧张',
    '惊讶',
    '震惊',
    '意外',
    '困惑',
    '疑惑',
    '厌恶',
    '讨厌',
    '反感',
    '嫌弃',
    '不喜欢',
    '平静',
    '满足',
    '放松',
    '安心',
    '舒适',
  ];

  const allAnswers = interviewHistory.map((record) => record.answer).join('');

  const foundEmotions = emotionKeywords.filter((emotion) => allAnswers.includes(emotion));

  if (foundEmotions.length === 0) {
    return '复杂的情绪状态';
  }

  const limitedEmotions = foundEmotions.slice(0, 3);

  if (limitedEmotions.length === 1) {
    return limitedEmotions[0];
  }

  if (limitedEmotions.length === 2) {
    return `${limitedEmotions[0]}和${limitedEmotions[1]}`;
  }

  return `${limitedEmotions[0]}、${limitedEmotions[1]}和${limitedEmotions[2]}`;
}

export default new RTCClient();
