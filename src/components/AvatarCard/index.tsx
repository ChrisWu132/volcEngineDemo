/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import { useSelector } from 'react-redux';
import { Button } from '@arco-design/web-react';
import { useState } from 'react';
import AISettings from '../AISettings';
import style from './index.module.less';

import { RootState } from '@/store';
import { MODEL_MODE, Name, VOICE_TYPE } from '@/config'; 
import MONDI_COUNSELOR from '@/assets/img/MONDI_COUNSELOR.png';// 此处可以换成gif

interface IAvatarCardProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar?: string;
}

const ReversedVoiceType = Object.entries(VOICE_TYPE).reduce<Record<string, string>>(
  (acc, [key, value]) => {
    acc[value] = key;
    return acc;
  },
  {}
);

const SourceName = {
  [MODEL_MODE.VENDOR]: '第三方模型',
  [MODEL_MODE.COZE]: 'Coze',
};

function AvatarCard(props: IAvatarCardProps) {
  const room = useSelector((state: RootState) => state.room);
  const { scene, aiConfig, modelMode } = room;
  const [open, setOpen] = useState(false);
  const { LLMConfig, TTSConfig } = aiConfig.Config || {};
  const { avatar, className, ...rest } = props;
  const voice = TTSConfig.ProviderParams.audio.voice_type;

  const handleOpenDrawer = () => setOpen(true);
  const handleCloseDrawer = () => setOpen(false);

  return (
    <div className={`${style.card} ${className}`} {...rest}>
      <div className={style.corner} />
      <div className={style.avatar}>
        <img
          id="avatar-card"
          src={avatar || MONDI_COUNSELOR}
          className={style['doubao-gif']}
          alt="Avatar"
        />
      </div>
      <div className={style.body} />
      <div className={style['text-wrapper']}>
        <div className={style['user-info']}>
          <div className={style.title}>{Name[scene]}</div>
          <div className={style.description}>声源来自 {ReversedVoiceType[voice || '']}</div>
          <div className={style.description}>
            {modelMode === MODEL_MODE.ORIGINAL
              ? `模型 ${LLMConfig.ModelName}`
              : `模型来源 ${SourceName[modelMode]}`}
          </div>
          <AISettings open={open} onOk={handleCloseDrawer} onCancel={handleCloseDrawer} />
          <Button className={style.button} onClick={handleOpenDrawer}>
            <div className={style['button-text']}>修改 AI 设定</div>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AvatarCard;
