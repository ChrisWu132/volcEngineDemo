/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import Loading from './loading';
import style from './index.module.less';

interface IInvokeButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  loading?: boolean;
}

function InvokeButton(props: IInvokeButtonProps) {
  const { loading, className, ...rest } = props;

  return (
    <div className={`${style.wrapper} ${loading ? '' : style.cursor} ${className}`} {...rest}>
      <div className={style.btn}>
        {loading ? (
          <Loading className={style.icon} />
        ) : (
          <div className={style.buttonText}>点击开始通话</div>
        )}
      </div>
      <div className={style.text}>{loading ? '连接中' : ''}</div>
    </div>
  );
}

export default InvokeButton;
