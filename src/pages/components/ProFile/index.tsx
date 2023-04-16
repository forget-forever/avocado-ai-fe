import { useData } from "@/hooks"
import { View } from "@tarojs/components"
import classNames from "classnames"
import styles from './index.module.scss'
import LoginButton from "./LoginButton"
import SignIn from "./SignIn"
import RemainInfo from "./RemainInfo"

const ProFile: React.FC<{
  /** 登陆后面那块位置 */
  exTraDom?: React.ReactNode;
  className?: string
}> & {
  LoginButton: typeof LoginButton;
  SignIn: typeof SignIn;
  RemainInfo: typeof RemainInfo;
} = (props) => {
  const { exTraDom, children, className } = props
  const userInfo = useData((s) => s.common.userInfo)
  const { header, userName, name }  = userInfo || {}
 
  return <View className={classNames(styles.proFile, className)}>
    <LoginButton nickName={name} avatar={header} useName={userName} >
      { exTraDom }
    </LoginButton>
    { children }
  </View>
}

ProFile.LoginButton = LoginButton;
ProFile.SignIn = SignIn;
ProFile.RemainInfo = RemainInfo

export default ProFile