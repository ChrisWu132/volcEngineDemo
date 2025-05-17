/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import AvatarCard from '@/components/AvatarCard';
import Conversation from './Conversation';
import ToolBar from './ToolBar';
import CameraArea from './CameraArea';
import AudioController from './AudioController';
import utils from '@/utils/utils';
import style from './index.module.less';
import MONDI_COUNSELOR from '@/assets/img/MONDI_COUNSELOR.png';
import MainBackground from '@/assets/img/main_background.png';
import RobotImage from '@/assets/img/robot.png';

function Room() {
  return (
    <div className={`${style.wrapper} ${utils.isMobile() ? style.mobile : ''}`}>
      {/* Background container */}
      <div className={style.backgroundContainer}>
        <img src={MainBackground} alt="背景" className={style.background} />
      </div>
      
      {/* Content container */}
      <div className={style.contentContainer}>
        <AvatarCard avatar={MONDI_COUNSELOR} className={style.avatar} />
        {utils.isMobile() ? null : <CameraArea />}
        
        {/* Robot image */}
        <div className={style.robotContainer}>
          <img src={RobotImage} alt="机器人" className={style.robot} />
        </div>
        
        <Conversation className={style.conversation} />
        <ToolBar className={style.toolBar} />
        <AudioController className={style.controller} />
        <div className={style.declare}>AI生成内容由大模型生成，不能完全保障真实</div>
      </div>
    </div>
  );
}

export default Room;
