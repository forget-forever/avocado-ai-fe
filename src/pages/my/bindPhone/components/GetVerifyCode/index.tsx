import { isPhone } from "@/utils/utils"
import { Button } from "@tarojs/components"
import { useState, useCallback } from "react"
import { AtInput } from "taro-ui"

type IProps = {
  msg: IRequest.User.VerifyCodeBindParams
  setMsg: (msg: IRequest.User.VerifyCodeBindParams) => void
}
const GetVerifyCode: React.FC<IProps> = (props) => {
  const { msg, setMsg } = props;
  const [tip, setTip] = useState('发送验证码');
  const countDown = useCallback((num: number) => {
    try {
      if (num > 0 && setMsg) {
        setTip(`${num}s后重试`);
        setTimeout(() => countDown(num - 1), 1000)
      } else {
        setTip('重新发送')
      }
    } catch (error) {
      
    }
  },[setMsg])
  const sendVerifyCode = () => {
    countDown(60)
  };
  return <AtInput
    clear
    title='验证码'
    type='number'
    maxlength={4}
    placeholder='验证码'
    value={msg.verifyCode}
    onChange={(val) => setMsg({ ...msg, verifyCode: `${val}` })}
    name='verifyCode'
  >
    <Button
      type='primary'
      disabled={!isPhone(msg.phone) || (tip !== '发送验证码' && tip !== '重新发送')}
      onClick={sendVerifyCode}
      style={{borderRadius: 0, width: '140px'}}
      loading={false}
    >
      {tip}
    </Button>
  </AtInput>
}
export default GetVerifyCode;