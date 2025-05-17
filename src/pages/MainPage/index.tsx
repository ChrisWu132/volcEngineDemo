/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import ResizeWrapper from '@/components/ResizeWrapper';
// import Menu from './Menu'; // do not delete this yet, might be used in the future
import utils from '@/utils/utils';
import MainArea from './MainArea';
import styles from './index.module.less';

export default function () {
  return (
    <ResizeWrapper className={styles.container}>
      <div
        className={styles.main}
        style={{
          padding: utils.isMobile() ? '' : '24px 124px',
        }}
      >
        <div className={`${styles.mainArea} ${utils.isMobile() ? styles.isMobile : ''}`}>
          <MainArea />
        </div>
         {/* do not delete this yet, might be used in the future
        {utils.isMobile() ? null : (
          <div className={styles.operationArea}>
            <Menu />
          </div>
        )}
          */}
      </div>
    </ResizeWrapper>
  );
}
