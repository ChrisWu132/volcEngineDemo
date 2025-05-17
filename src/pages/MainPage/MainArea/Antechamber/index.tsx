/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import AvatarCard from '@/components/AvatarCard';
import Utils from '@/utils/utils';
import aigcConfig from '@/config';
import InvokeButton from '@/pages/MainPage/MainArea/Antechamber/InvokeButton';
import { useJoin } from '@/lib/useCommon';
import style from './index.module.less';
import MainBackground from '@/assets/img/main_background.png';
import RobotImage from '@/assets/img/robot.png';

function Antechamber() {
  const [joining, dispatchJoin] = useJoin();
  const username = aigcConfig.BaseConfig.UserId;
  const roomId = aigcConfig.BaseConfig.RoomId;

  const handleJoinRoom = () => {
    if (!joining) {
      dispatchJoin(
        {
          username,
          roomId,
          publishAudio: true,
        },
        false
      );
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.backgroundContainer}>
        <img src={MainBackground} alt="背景" className={style.background} />
      </div>
      
      <div className={style.contentContainer}>
        {/* 顶部区域 - 问候语 */}
        <div className={style.topSection}>
          <div className={style.hello}>你好！</div>
        </div>
        
        {/* 中部区域 - 仅包含机器人 */}
        <div className={style.middleSection}>
          <div className={style.robotContainer}>
            <img src={RobotImage} alt="机器人" className={style.robot} />
          </div>
        </div>
        
        {/* 底部区域 - 标题、副标题和按钮 */}
        <div className={style.bottomSection}>
          <div className={style.botInfo}>
            <div className={style.botName}>蒙迪</div>
            <div className={style.botDescription}>一个懂你的机器人</div>
          </div>
          
          <InvokeButton onClick={handleJoinRoom} loading={joining} className={style['invoke-btn']} />
          <AvatarCard className={`${style.avatar} ${Utils.isMobile() ? style.mobile : ''}`} />
        </div>
      </div>
    </div>
  );
}

export default Antechamber;
