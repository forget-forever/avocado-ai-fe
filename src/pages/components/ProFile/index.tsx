import { useData } from "@/hooks"
import { View } from "@tarojs/components"
import styles from './index.module.scss'
import LoginButton from "./LoginButton"

const ProFile: React.FC & {
  LoginButton: typeof LoginButton;
} = () => {
  const userInfo = useData((s) => s.common.userInfo)
  const { header, userName, name }  = userInfo || {}
 
  return <View className={styles.proFile}>
    <LoginButton nickName={name} avatar={header} useName={userName} />
  </View>
}

ProFile.LoginButton = LoginButton;

export default ProFile