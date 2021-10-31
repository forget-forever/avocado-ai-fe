import { navigate } from "@/router";
import { bindWxPhone } from "@/serves/common";
import useData from "@/utils/hooks/useData";
import { initLogin } from "@/utils/init";
import { BaseEventOrig, ButtonProps } from "@tarojs/components";
import { CSSProperties } from "react";
import { AtButton } from "taro-ui";

type IProps = {
  onSubmit?: (res: BaseEventOrig<ButtonProps.onGetPhoneNumberEventDetail>) => void;
  style?: CSSProperties;
  size?: "small" | "normal",
  text?: string,
}
const GetPhone: React.FC<IProps> = (props) => {
  const { onSubmit, style, size = 'small', text = '授权登陆' } = props;
  const { openId } = useData((state) => state.common)
  return (
    <AtButton
      type='primary'
      customStyle={{marginTop: '12px', ...style}}
      size={size}
      openType='getPhoneNumber'
      onGetPhoneNumber={async (res) => {
        const { iv, errMsg, encryptedData, cloudId } = res.detail as (typeof res.detail) & {cloudId?: string} ;
        if(errMsg.includes(':ok')) {
          const {result} = await bindWxPhone({
            rawData: {iv, encryptedData, cloudID: cloudId},
            openId: openId!,
          })
          if (result) {
            await initLogin()
          }
        } else {
          navigate('bindPhoneNumber', { type: 'redirect' });
        }
        onSubmit?.(res)
      }}
    >
      {text}
    </AtButton>
  )
};
export default GetPhone;
