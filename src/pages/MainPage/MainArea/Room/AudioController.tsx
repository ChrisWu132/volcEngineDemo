/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import { useDispatch, useSelector } from 'react-redux';
import AudioLoading from '@/components/Loading/AudioLoading';
import { RootState } from '@/store';
import RtcClient from '@/lib/RtcClient';
import { setInterruptMsg } from '@/store/slices/room';
import { useDeviceState } from '@/lib/useCommon';
import { COMMAND } from '@/utils/handler';
import style from './index.module.less';
import StopRobotBtn from '@/assets/img/StopRobotBtn.svg';

const THRESHOLD_VOLUME = 18;

function AudioController(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  const dispatch = useDispatch();
  const room = useSelector((state: RootState) => state.room);
  const volume = room.localUser.audioPropertiesInfo?.linearVolume || 0;
  const { isAudioPublished } = useDeviceState();
  const isAITalking = room.isAITalking;
  const isLoading = volume >= THRESHOLD_VOLUME && isAudioPublished;

  const handleInterrupt = () => {
    RtcClient.commandAudioBot(COMMAND.INTERRUPT);
    dispatch(setInterruptMsg());
  };
  return (
    <div className={`${className}`} {...rest}>
      {isAudioPublished ? (
        isAITalking ? (
          <div onClick={handleInterrupt} className={style.interrupt}>
            <img src={StopRobotBtn} alt="StopRobotBtn" />
            <span className={style['interrupt-text']}>点击打断</span>
          </div>
        ) : (
          <div className={style.text}>正在听...</div>
        )
      ) : (
        <div className={style.closed}>你已关闭麦克风</div>
      )}
      <AudioLoading loading={isLoading} color={isAudioPublished ? undefined : '#EAEDF1'} />
    </div>
  );
}
export default AudioController;
