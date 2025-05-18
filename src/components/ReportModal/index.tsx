/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import React, { useEffect, useState } from 'react';
import { Modal, Button, Typography } from '@arco-design/web-react';
import { useSelector } from 'react-redux';

const { Paragraph, Title } = Typography;

interface ReportModalProps {
  visible: boolean;
  onClose: () => void;
}

function ReportModal({ visible, onClose }: ReportModalProps) {
  const { reportText, isInterviewFinished } = useSelector((state: any) => state.room);
  const [sections, setSections] = useState<string[]>([]);

  useEffect(() => {
    if (reportText) {
      const paragraphs = reportText.split('\n\n').filter((p: string) => p.trim().length > 0);
      setSections(paragraphs);
    }
  }, [reportText]);

  return (
    <Modal
      title="情绪访谈报告"
      visible={visible}
      onCancel={onClose}
      footer={
        <Button type="primary" onClick={onClose}>
          关闭
        </Button>
      }
      style={{ width: '600px', maxWidth: '90vw' }}
    >
      <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: '8px 0' }}>
        {!reportText && (
          <div style={{ textAlign: 'center', color: 'var(--color-text-3)', padding: '40px 0' }}>
            {isInterviewFinished ? '报告生成中，请稍候...' : '暂无报告，请先完成访谈'}
          </div>
        )}
        
        {sections.map((section, index) => (
          <div key={index} style={{ marginBottom: '16px' }}>
            {section.startsWith('情绪概况') || 
             section.startsWith('关键问题') || 
             section.startsWith('建议') || 
             section.startsWith('总结') ? (
              <Title heading={4}>{section.split('：')[0]}</Title>
            ) : null}
            <Paragraph copyable>{section}</Paragraph>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ReportModal;
