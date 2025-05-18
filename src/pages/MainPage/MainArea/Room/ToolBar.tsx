/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import { useSelector } from 'react-redux';
import { memo, useState } from 'react';
import { Drawer, Button } from '@arco-design/web-react';
import { useDeviceState, useLeave } from '@/lib/useCommon';
import { RootState } from '@/store';
import { isVisionMode } from '@/config/common';
import { ScreenShareScene } from '@/config';
import utils from '@/utils/utils';
import Menu from '../../Menu';

import style from './index.module.less';
import CameraOpenSVG from '@/assets/img/CameraOpen.svg';
import CameraCloseSVG from '@/assets/img/CameraClose.svg';
import MicOpenSVG from '@/assets/img/MicOpen.svg';
import SettingSVG from '@/assets/img/Setting.svg';
import MicCloseSVG from '@/assets/img/MicClose.svg';
import LeaveRoomSVG from '@/assets/img/LeaveRoom.svg';
import ScreenOnSVG from '@/assets/img/ScreenOn.svg';
import ScreenOffSVG from '@/assets/img/ScreenOff.svg';
import ReportSVG from '@/assets/img/Report.svg';

interface ToolBarProps extends React.HTMLAttributes<HTMLDivElement> {
  showReport?: () => void;
  isInterviewScene?: boolean;
  isInterviewEnded?: boolean;
}

function ToolBar(props: ToolBarProps) {
  const { className, showReport, isInterviewScene, isInterviewEnded, ...rest } = props;
  const room = useSelector((state: RootState) => state.room);
  const [open, setOpen] = useState(false);
  const model = room.aiConfig.Config.LLMConfig?.ModelName;
  const isScreenMode = ScreenShareScene.includes(room.scene);
  const leaveRoom = useLeave();
  const {
    isAudioPublished,
    isVideoPublished,
    isScreenPublished,
    switchMic,
    switchCamera,
    switchScreenCapture,
  } = useDeviceState();

  const handleSetting = () => {
    setOpen(true);
  };
  return (
    <div className={`${className} ${style.btns} ${utils.isMobile() ? style.column : ''}`} {...rest}>
      {utils.isMobile() ? (
        <img src={SettingSVG} onClick={handleSetting} className={style.setting} alt="setting" />
      ) : null}
      <img
        src={isAudioPublished ? MicOpenSVG : MicCloseSVG}
        onClick={() => switchMic(true)}
        className={style.btn}
        alt="mic"
      />
      {isVisionMode(model) ? (
        isScreenMode ? (
          <img
            src={isScreenPublished ? ScreenOnSVG : ScreenOffSVG}
            onClick={() => switchScreenCapture()}
            className={style.btn}
            alt="screenShare"
          />
        ) : (
          <img
            src={isVideoPublished ? CameraOpenSVG : CameraCloseSVG}
            onClick={() => switchCamera(true)}
            className={style.btn}
            alt="camera"
          />
        )
      ) : (
        ''
      )}
      {isInterviewScene && isInterviewEnded && showReport && (
        <img 
          src={ReportSVG} 
          onClick={showReport} 
          className={style.btn} 
          alt="report"
          title="查看情绪面谈报告" 
        />
      )}
      <img src={LeaveRoomSVG} onClick={leaveRoom} className={style.btn} alt="leave" />
      {utils.isMobile() ? (
        <Drawer
          title="设置"
          visible={open}
          onCancel={() => setOpen(false)}
          style={{
            width: 'max-content',
          }}
          footer={null}
        >
          <Menu />
        </Drawer>
      ) : null}
    </div>
  );
}
export default memo(ToolBar);
