/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import AvatarCard from '@/components/AvatarCard';
import Conversation from './Conversation';
import ToolBar from './ToolBar';
import CameraArea from './CameraArea';
import AudioController from './AudioController';
import utils from '@/utils/utils';
import style from './index.module.less';
import MONDI_COUNSELOR from '@/assets/img/MONDI_COUNSELOR.png';

function Room() {
  return (
    <div className={`${style.wrapper} ${utils.isMobile() ? style.mobile : ''}`}>
      <AvatarCard avatar={MONDI_COUNSELOR} className={style.avatar} />
      {utils.isMobile() ? null : <CameraArea />}
      <Conversation className={style.conversation} />
      <ToolBar className={style.toolBar} />
      <AudioController className={style.controller} />
      <div className={style.declare}>AI生成内容由大模型生成，不能完全保障真实</div>
    </div>
  );
}

export default Room;
