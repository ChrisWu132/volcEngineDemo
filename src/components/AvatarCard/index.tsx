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
import { Name } from '@/config'; 


interface IAvatarCardProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar?: string;
}

function AvatarCard(props: IAvatarCardProps) {
  const room = useSelector((state: RootState) => state.room);
  const { scene} = room;
  const [open, setOpen] = useState(false);
 
  const { className, ...rest } = props;
  

  const handleOpenDrawer = () => setOpen(true);
  const handleCloseDrawer = () => setOpen(false);

  return (
    <div className={`${style.settingsCard} ${className}`} {...rest}>
          <AISettings open={open} onOk={handleCloseDrawer} onCancel={handleCloseDrawer} />
          <Button className={style.button} onClick={handleOpenDrawer}>
            <div className={style['button-text']}>当前设定：{Name[scene]}</div>
          </Button>
    </div>
  );
}

export default AvatarCard;
