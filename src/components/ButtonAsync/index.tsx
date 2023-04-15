import React, { useState } from 'react';
import Button from '../MyButton';

type IProps = Omit<GetIProps<typeof Button>, 'onClick'> & {
  /** 点击事件加上promise的处理, 其他配置与Button标签一样 */
  onClick?: () => void | Promise<void>;
};
const ButtonAsync: React.FC<IProps> = (props) => {
  const { children, onClick, ...resetProps } = props;
  const [loading, setLoading] = useState(false);
  const clickHandle = async () => {
    const res = onClick?.();
    if (res instanceof Promise) {
      setLoading(true);
      try {
        await res;
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  };

  return (
    <Button loading={loading} onClick={clickHandle} {...resetProps}>
      {children}
    </Button>
  );
};

export default ButtonAsync;