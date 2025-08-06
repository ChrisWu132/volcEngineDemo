/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import { useState } from 'react';
import { IconRight } from '@arco-design/web-react/icon';
import AISettings from '@/components/AISettings';
import styles from './index.module.less';

function AISettingAnchor() {
  const [open, setOpen] = useState(false);

  const handleOpenDrawer = () => setOpen(true);
  const handleCloseDrawer = () => setOpen(false);
  return (
    <>
      <div className={styles.row} onClick={handleOpenDrawer}>
        <div className={styles.firstPart}>AI 设置</div>
        <div className={styles.finalPart}>
          <IconRight className={styles.rightOutlined} />
        </div>
      </div>
      <AISettings open={open} onOk={handleCloseDrawer} onCancel={handleCloseDrawer} />
    </>
  );
}

export default AISettingAnchor;
