import { BaseEventOrig, ButtonProps } from "@tarojs/components";
import { CSSProperties } from "react";
import { AtButton } from "taro-ui";

type IProps = {
  onSubmit: (res: BaseEventOrig<ButtonProps.onGetPhoneNumberEventDetail>) => void;
  style?: CSSProperties;
  size?: "small" | "normal"
  text?: string
}
const GetPhone: React.FC<IProps> = (props) => {
  const { onSubmit, style, size = 'small', text = '授权登陆' } = props;
  return (
    <AtButton
      type='primary'
      customStyle={{marginTop: '12px', ...style}}
      size={size}
      openType='getPhoneNumber'
      onGetPhoneNumber={onSubmit}
    >
      {text}
    </AtButton>
  )
};
export default GetPhone;
