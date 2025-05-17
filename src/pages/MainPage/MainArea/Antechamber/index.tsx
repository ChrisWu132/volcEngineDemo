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
        <div className={style.greeting}>
          <div className={style.hello}>你好，</div>
          <div className={style.goodMorning}>早上好</div>
        </div>
        
        <div className={style.robotContainer}>
          <img src={RobotImage} alt="机器人" className={style.robot} />
        </div>
        
        <div className={style.botInfo}>
          <div className={style.botName}>蒙迪</div>
          <div className={style.botDescription}>一个能让科学变得有趣并回答好奇问题的聪明机器人</div>
        </div>
        
        <InvokeButton onClick={handleJoinRoom} loading={joining} className={style['invoke-btn']} />
        
        <AvatarCard className={`${style.avatar} ${Utils.isMobile() ? style.mobile : ''}`} />
      </div>
    </div>
  );
}

export default Antechamber;
