/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import { MediaType } from '@volcengine/rtc';
import DeviceDrawerButton from '../DeviceDrawerButton';
import { useVisionMode } from '@/lib/useCommon';
import AISettingAnchor from '../AISettingAnchor';
import Interrupt from '../Interrupt';
import styles from './index.module.less';

function Operation() {
  const { isVisionMode, isScreenMode } = useVisionMode();
  return (
    <div className={`${styles.box} ${styles.device}`}>
      <Interrupt />
      <AISettingAnchor />
      <DeviceDrawerButton />
      {isVisionMode && !isScreenMode ? <DeviceDrawerButton type={MediaType.VIDEO} /> : ''}
    </div>
  );
}

export default Operation;
