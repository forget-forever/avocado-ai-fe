import { navigate } from "@/router";
import { bindWxPhone } from "@/serves/common";
import useData from "@/utils/hooks/useData";
import { initLogin } from "@/utils/init";
import { showMaskToast } from "@/utils/utils";
import { BaseEventOrig, ButtonProps } from "@tarojs/components";
import { CSSProperties } from "react";
import { AtButton } from "taro-ui";

type IProps = {
  onSubmit?: (res: 'ok' | 'fail', data: BaseEventOrig<ButtonProps.onGetPhoneNumberEventDetail>) => void;
  style?: CSSProperties;
  size?: "small" | "normal",
  redirectBindPhone?: boolean
}
const GetPhone: React.FC<IProps> = (props) => {
  const { onSubmit, style, size = 'small', children, redirectBindPhone = true } = props;
  const { openId } = useData((state) => state.common)
  return (
    <AtButton
      type='primary'
      customStyle={{marginTop: '12px', ...style}}
      size={size}
      openType='getPhoneNumber'
      onGetPhoneNumber={async (res) => {
        const { iv, errMsg, encryptedData, cloudId } = res.detail as (typeof res.detail) & {cloudId?: string};
        let resData: 'ok' | 'fail' = 'fail';
        if(errMsg.includes(':ok')) {
          showMaskToast('授权中', 'loading', 10000)
          const {result} = await bindWxPhone({
            rawData: {iv, encryptedData, cloudID: cloudId},
            openId: openId!,
          })
          if (result) {
            await initLogin()
            showMaskToast('绑定成功');
            resData = 'ok';
          } else {
            showMaskToast('绑定失败');
          }
        } else {
          if ( redirectBindPhone ) {
            navigate('bindPhoneNumber', { type: 'redirect' });
          }
        }
        onSubmit?.(resData ,res)
      }}
    >
      {children || '授权登陆'}
    </AtButton>
  )
};
export default GetPhone;
