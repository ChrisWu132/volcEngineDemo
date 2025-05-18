/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import { Button, Drawer } from '@arco-design/web-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import utils from '@/utils/utils';
import styles from './index.module.less';

export interface IInterviewReportProps {
  open: boolean;
  onClose?: () => void;
}

function InterviewReport({ open, onClose }: IInterviewReportProps) {
  const { interviewReport, isInterviewEnded } = useSelector((state: RootState) => state.room);

  return (
    <Drawer
      width={utils.isMobile() ? '100%' : 600}
      closable={false}
      maskClosable
      title={null}
      className={styles.container}
      style={{
        padding: utils.isMobile() ? '0px' : '16px 8px',
      }}
      footer={
        <div className={styles.footer}>
          <Button className={styles.close} onClick={onClose}>
            关闭
          </Button>
        </div>
      }
      visible={open && isInterviewEnded && !!interviewReport}
      onCancel={onClose}
    >
      <div className={styles.title}>情绪面谈报告</div>
      <div className={styles.content}>
        {interviewReport.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </Drawer>
  );
}

export default InterviewReport;
