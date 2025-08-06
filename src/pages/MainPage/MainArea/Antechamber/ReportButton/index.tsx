/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import style from './index.module.less';

interface IReportButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
}

function ReportButton(props: IReportButtonProps) {
  const { className, onClick, ...rest } = props;

  return (
    <div className={`${style.wrapper} ${className}`} onClick={onClick} {...rest}>
      <div className={style.button}>
        <div className={style.buttonText}>对话报告</div>
      </div>
    </div>
  );
}

export default ReportButton; 