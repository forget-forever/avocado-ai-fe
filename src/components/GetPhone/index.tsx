import { navigate } from "@/router";
import { bindWxPhone } from "@/serves";
import { initLogin, showMaskToast } from "@/utils";
import { BaseEventOrig, ButtonProps } from "@tarojs/components";
import classNames from "classnames";
import { CSSProperties } from "react";
import { AtButton } from "taro-ui";
import styles from './index.module.scss'

type IProps = {
  onSubmit?: (res: 'ok' | 'fail', data: BaseEventOrig<ButtonProps.onGetPhoneNumberEventDetail>) => void;
  style?: CSSProperties;
  /**
   * 按钮的大小
   * @default 'normal'
   */
  size?: "small" | "normal",
  /**
   * 拒绝绑定时跳手动绑定电话号码的页面
   * @default true
   */
  redirectBindPhone?: boolean;
  /**
   * 提示绑定的描述文案
   * @default 尚未绑定个人信息，没有绑定个人信息的时，无法使用小程序的全部功能。
   */
  describe?: React.ReactNode;
  className?: string;
}
const GetPhone: React.FC<IProps> = (props) => {
  const {
    onSubmit,
    style,
    size = 'small',
    children,
    redirectBindPhone = true,
    describe = '尚未绑定个人信息，没有绑定个人信息的时，无法使用小程序的全部功能。',
    className,
  } = props;
  return (
    <>
    {describe}
    <AtButton
      type='primary'
      customStyle={style}
      size={size}
      className={classNames(styles.button, className)}
      /** @TODO 以后再说吧 */
      // openType='getPhoneNumber'
      // onGetPhoneNumber={async (res) => {
      //   const { iv, errMsg, encryptedData, cloudId } = res.detail as (typeof res.detail) & {cloudId?: string};
      //   let resData: 'ok' | 'fail' = 'fail';
      //   if(errMsg.includes(':ok')) {
      //     showMaskToast('授权中', 'loading', 10000)
      //     const {result} = await bindWxPhone({
      //       rawData: {iv, encryptedData, cloudID: cloudId},
      //       openId: openId!,
      //     })
      //     if (result) {
      //       await initLogin()
      //       showMaskToast('绑定成功');
      //       resData = 'ok';
      //     } else {
      //       showMaskToast('绑定失败');
      //     }
      //   } else {
      //     if ( redirectBindPhone ) {
      //       navigate('bindPhoneNumber', { type: 'redirect' });
      //     }
      //   }
      //   onSubmit?.(resData ,res)
      // }}
      onClick={() => navigate('bindPhoneNumber', { type: 'navigate' })}
    >
      {children || '授权登陆'}
    </AtButton>
    </>
  )
};
export default GetPhone;
