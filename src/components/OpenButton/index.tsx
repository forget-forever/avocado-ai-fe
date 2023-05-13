import { Button } from "@tarojs/components"
import classNames from "classnames";
import style from './index.module.scss'

const OpenButton: React.FC<{
  nostyle?: boolean;
  openType?: 'contact' | 'share' | 'getUserInfo' | 'getPhoneNumber' | 'launchApp' | 'openSetting' | 'feedback' | 'getRealnameAuthInfo'
} & MyOmit<GetIProps<typeof Button>, 'openType'>> = (props) => {
  const { children, nostyle, className, ...resetProps } = props;

  return <Button
    openType='share'
    className={classNames(className, nostyle ? style.nostyle : '')}
    {...resetProps}
  >
    {children}
  </Button>
}

export default OpenButton;