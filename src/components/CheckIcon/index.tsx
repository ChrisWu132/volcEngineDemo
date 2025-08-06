/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import CheckedSVG from '@/assets/img/Checked.svg';
import styles from './index.module.less';

interface IProps {
  className?: string;
  blur?: boolean;
  checked: boolean;
  title?: string;
  onClick?: () => void;
  icon?: string;
  tag?: string;
}

function CheckIcon(props: IProps) {
  const { tag, blur, className = '', icon, title, checked, onClick } = props;
  const wrapperStyle = blur ? styles.blur : styles.wrapper;
  return (
    <div className={`${checked ? styles.active : wrapperStyle} ${className}`} onClick={onClick}>
      {tag ? <div className={styles.tag}>{tag}</div> : ''}
      <div className={styles.content}>
        {icon ? <img className={styles.icon} src={icon} alt="icon" /> : ''}
        <div className={styles['checked-text']}>{title}</div>
      </div>
      {checked ? <img className={styles.checkIcon} src={CheckedSVG} alt="checked" /> : ''}
    </div>
  );
}

export default CheckIcon;
