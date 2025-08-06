/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import { useState } from 'react';
import { useSelector } from 'react-redux';
import AvatarCard from '@/components/AvatarCard';
import ReportModal from '@/components/ReportModal';
import Utils from '@/utils/utils';
import aigcConfig from '@/config';
import InvokeButton from '@/pages/MainPage/MainArea/Antechamber/InvokeButton';
import ReportButton from '@/pages/MainPage/MainArea/Antechamber/ReportButton';
import { useJoin } from '@/lib/useCommon';
import { RootState } from '@/store';
import style from './index.module.less';
import MainBackground from '@/assets/img/main_background.png';
import RobotImage from '@/assets/img/robot.png';

function Antechamber() {
  const [joining, dispatchJoin] = useJoin();
  const [isReportOpen, setIsReportOpen] = useState(false);
  const username = aigcConfig.BaseConfig.UserId;
  const roomId = aigcConfig.BaseConfig.RoomId;
  
  // 获取对话报告状态
  const conversationReport = useSelector((state: RootState) => state.room.conversationReport);
  const isGeneratingReport = useSelector((state: RootState) => state.room.isGeneratingReport);
  const hasReport = !!conversationReport;

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

  const toggleReport = () => {
    setIsReportOpen(!isReportOpen);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.backgroundContainer}>
        <img src={MainBackground} alt="背景" className={style.background} />
      </div>
      
      <div className={style.contentContainer}>
        {/* 顶部区域 - 问候语和报告按钮 */}
        <div className={style.topSection}>
          <div className={style.hello}>你好！</div>
          <ReportButton 
            className={style.reportButton} 
            onClick={toggleReport} 
          />
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
      
      {/* 报告模态框 */}
      <ReportModal 
        isOpen={isReportOpen} 
        onClose={() => setIsReportOpen(false)}
        reportText={hasReport ? undefined : (isGeneratingReport ? '报告正在生成中，请稍候...' : '点击"开始通话"按钮与AI进行对话，对话结束后将自动生成分析报告。')}
      />
    </div>
  );
}

export default Antechamber;
