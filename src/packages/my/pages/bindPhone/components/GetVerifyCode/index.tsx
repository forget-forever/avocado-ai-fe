import { ButtonAsync } from "@/components"
import { sendVerifyCodeByOpenId } from "@/serves/user"
import { SmsCodeUseType } from "@/utils/enum"
import { isPhone } from "@/utils"
import { useState, useMemo, CSSProperties } from "react"
import { AtInput } from "taro-ui"
import { useMemoizedFn } from "@/hooks"

const tipStyle: CSSProperties = {borderRadius: 0, width: '110px', padding: 0, height: '36px', lineHeight: '36px' }

type IProps = {
  msg: API.VerifyCodeBindParams
  setMsg?: (msg: API.VerifyCodeBindParams) => void
  className?: string;
}
const GetVerifyCode: React.FC<IProps> = (props) => {
  const { msg, setMsg, className } = props;
  const [tip, setTip] = useState('发送验证码');

  const countDown = useMemoizedFn((num: number) => {
    try {
      if (num > 0 && setMsg) {
        setTip(`${num}s后重试`);
        setTimeout(() => countDown(num - 1), 1000)
      } else {
        setTip('重新发送')
      }
    } catch (error) {}
  });

  const canSendVerifyCode = useMemo(() => !isPhone(msg.phone) || (tip !== '发送验证码' && tip !== '重新发送'), [msg.phone, tip])

  const sendVerifyCode = useMemoizedFn(async () => {
    const { phone, openId } = msg;
    await sendVerifyCodeByOpenId({ phone, openId, userType: SmsCodeUseType.wxBind });
    countDown(60);
  })

  return <AtInput
    clear
    title='验证码'
    type='number'
    maxlength={4}
    placeholder='验证码'
    value={msg.smsCode}
    onChange={(val) => setMsg?.({ ...msg, smsCode: `${val}` })}
    name='smsCode'
    className={className}
  >
    <ButtonAsync
      type='primary'
      disabled={canSendVerifyCode}
      onClick={sendVerifyCode}
      style={tipStyle}
    >
      {tip}
    </ButtonAsync>
  </AtInput>
}
export default GetVerifyCode;
