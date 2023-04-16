import { useMemoizedFn } from '@/hooks';
import { hideLoading, showLoading } from '@/utils';
import React, { useState } from 'react';
import Button from '../MyButton';

type IProps = Omit<GetIProps<typeof Button>, 'onClick'> & {
  /** 点击事件加上promise的处理, 其他配置与Button标签一样 */
  onClick?: () => void | Promise<void>;
  /** 展示toast */
  showToast?: boolean | string
};
const ButtonAsync: React.FC<IProps> = (props) => {
  const { children, onClick, showToast, ...resetProps } = props;
  const [loading, setLoading] = useState(false);
  const clickHandle = useMemoizedFn(async () => {
    const res = onClick?.();
    if (res instanceof Promise) {
      setLoading(true);
      if (showToast) {
        showLoading({
          title: typeof showToast === 'string' ? showToast : '加载中'
        })
      }
      try {
        await res;
      } catch (error) {
        console.error(error);
      }
      hideLoading()
      setLoading(false);
    }
  });

  return (
    <Button loading={loading} onClick={clickHandle} {...resetProps}>
      {children}
    </Button>
  );
};

export default ButtonAsync;