import { MyButton } from "@/components/index"
import { sendVerifyCodeByOpenId } from "@/serves/user"
import { SmsCodeUseType } from "@/utils/enum"
import { isPhone } from "@/utils/tool"
import { useState, useCallback, useMemo } from "react"
import { AtInput } from "taro-ui"

type IProps = {
  msg: IRequest.VerifyCodeBindParams
  setMsg: (msg: IRequest.VerifyCodeBindParams) => void
}
const GetVerifyCode: React.FC<IProps> = (props) => {
  const { msg, setMsg } = props;
  const [tip, setTip] = useState('发送验证码');
  const [ loading, setLoading ] = useState(false)

  const countDown = useCallback((num: number) => {
    try {
      if (num > 0 && setMsg) {
        setTip(`${num}s后重试`);
        setTimeout(() => countDown(num - 1), 1000)
      } else {
        setTip('重新发送')
      }
    } catch (error) {}
  },[setMsg]);

  const canSendVerifyCode = useMemo(() => !isPhone(msg.phone) || (tip !== '发送验证码' && tip !== '重新发送'), [msg.phone, tip])

  const sendVerifyCode = useCallback(async () => {
    const { phone, openId } = msg;
    setLoading(true)
    await sendVerifyCodeByOpenId({ phone, openId, userType: SmsCodeUseType.wxBind });
    setLoading(false);
    countDown(60);
  }, [countDown, msg])

  return <AtInput
    clear
    title='验证码'
    type='number'
    maxlength={4}
    placeholder='验证码'
    value={msg.smsCode}
    onChange={(val) => setMsg({ ...msg, smsCode: `${val}` })}
    name='smsCode'
  >
    <MyButton
      type='primary'
      disabled={canSendVerifyCode}
      onClick={sendVerifyCode}
      style={{borderRadius: 0, width: '140px'}}
      loading={loading}
    >
      {tip}
    </MyButton>
  </AtInput>
}
export default GetVerifyCode;
