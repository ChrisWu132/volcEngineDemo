/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import { useSelector } from 'react-redux';
import { Table } from '@arco-design/web-react';
import type { TableColumnProps } from '@arco-design/web-react';
import { RootState } from '@/store';
import style from './index.module.less';

interface IReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportText?: string;
}

interface ReportSection {
  key: string;
  section: string;
  content: string;
}

// 简单解析报告内容，提取4个主要部分
const parseReportSections = (text: string): ReportSection[] => {
  if (!text || text.trim() === '' || text.startsWith('点击') || text.startsWith('报告正在生成')) {
    return [];
  }

  const sections: ReportSection[] = [];
  
  // 按照数字开头的部分分割
  const parts = text.split(/(?=\d\.\s*\*\*)/);
  
  parts.forEach((part, index) => {
    if (part.trim()) {
      // 提取标题和内容
      const lines = part.trim().split('\n');
      const titleLine = lines[0];
      const content = lines.slice(1).join('\n').trim();
      
      // 清理标题，移除数字和星号
      const cleanTitle = titleLine.replace(/^\d\.\s*\*\*/g, '').replace(/\*\*/g, '').trim();
      
      sections.push({
        key: `section-${index}`,
        section: cleanTitle || `第${index + 1}部分`,
        content: content || '暂无内容'
      });
    }
  });

  return sections;
};

function ReportModal(props: IReportModalProps) {
  const { isOpen, onClose, reportText: initialReportText } = props;
  const conversationReport = useSelector((state: RootState) => state.room.conversationReport);
  const isGeneratingReport = useSelector((state: RootState) => state.room.isGeneratingReport);
  
  let reportContent = initialReportText || conversationReport;
  if (!reportContent) {
    reportContent = isGeneratingReport ? '报告正在生成中，请稍候...' : '点击"开始通话"按钮与AI进行对话，对话结束后将自动生成分析报告。';
  }
  
  const reportSections = parseReportSections(reportContent);

  if (!isOpen) return null;

  const columns: TableColumnProps<ReportSection>[] = [
    {
      title: '报告部分',
      dataIndex: 'section',
      key: 'section',
      width: 200,
      className: style.sectionCell,
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      className: style.contentCell,
      render: (content) => (
        <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {content}
        </div>
      ),
    },
  ];

  // 如果没有解析到报告内容，显示占位符
  if (reportSections.length === 0) {
    return (
      <div className={style.modalOverlay} onClick={onClose}>
        <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
          <div className={style.modalHeader}>
            <div className={style.modalTitle}>对话分析报告</div>
            <div className={style.closeButton} onClick={onClose}>×</div>
          </div>
          <div className={style.modalBody}>
            <div className={style.reportTextPlaceholder}>{reportContent}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={`${style.modalContent} ${style.modalContentTable}`}>
        <div className={style.modalHeader}>
          <div className={style.modalTitle}>对话分析报告</div>
          <div className={style.closeButton} onClick={onClose}>×</div>
        </div>
        <div className={style.modalBody}>
          <Table
            columns={columns}
            data={reportSections}
            pagination={false}
            border={{ wrapper: true, cell: true }}
            className={style.reportTable}
          />
        </div>
      </div>
    </div>
  );
}

export default ReportModal; 