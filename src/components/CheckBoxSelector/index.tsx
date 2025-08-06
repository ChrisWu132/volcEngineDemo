/**
 * Copyright 2025 Beijing Volcano Engine Technology Co., Ltd. All Rights Reserved.
 * SPDX-license-identifier: BSD-3-Clause
 */

import { useEffect, useMemo, useState, memo } from 'react';
import { Button, Drawer } from '@arco-design/web-react';
import CheckBox from '@/components/CheckBox';
import styles from './index.module.less';
import utils from '@/utils/utils';

export interface ICheckBoxItemProps {
  icon?: string;
  label: string;
  description?: string;
  key: string;
}

interface IProps {
  data?: ICheckBoxItemProps[];
  onChange?: (key: string) => void;
  value?: string;
  label?: string;
  moreIcon?: string;
  moreText?: string;
  placeHolder?: string;
}

function CheckBoxSelector(props: IProps) {
  const { placeHolder, label = '', data = [], value, onChange, moreIcon, moreText } = props;
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<string>(value!);
  const selectedOne = useMemo(() => data.find((item) => item.key === value), [data, value]);
  const handleSeeMore = () => {
    setVisible(true);
  };
  useEffect(() => {
    setSelected(value!);
  }, [visible]);

  return (
    <>
      <div className={styles.wrapper}>
        {selectedOne ? (
          <CheckBox
            className={styles.box}
            icon={selectedOne?.icon}
            label={selectedOne?.label || ''}
            description={selectedOne?.description}
            noStyle
          />
        ) : (
          <div className={styles.placeholder}>{placeHolder}</div>
        )}
        <Button type="text" className={styles.seeMore} onClick={handleSeeMore}>
          {moreIcon ? <img src={moreIcon} alt="moreIcon" /> : ''}
          <span className={styles.seeMoreText}>{moreText || '查看更多'}</span>
        </Button>
      </div>
      <Drawer
        style={{
          width: utils.isMobile() ? '100%' : '650px',
        }}
        closable={false}
        className={styles.modal}
        title={label}
        visible={visible}
        footer={
          <div className={styles.footer}>
            <Button className={styles.cancel} onClick={() => setVisible(false)}>
              取消
            </Button>
            <Button
              className={styles.confirm}
              onClick={() => {
                onChange?.(selected);
                setVisible(false);
              }}
            >
              确定
            </Button>
          </div>
        }
      >
        <div className={styles.modalInner}>
          {data.map((item) => (
            <CheckBox
              className={styles.box}
              key={item.key}
              icon={item.icon}
              label={item.label}
              description={item.description}
              checked={item.key === selected}
              onClick={() => setSelected(item.key)}
            />
          ))}
        </div>
      </Drawer>
    </>
  );
}

export default memo(CheckBoxSelector);
