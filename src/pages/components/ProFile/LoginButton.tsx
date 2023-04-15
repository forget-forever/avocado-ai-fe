import { View, Text } from "@tarojs/components"
import { AtAvatar, AtButton } from "taro-ui"
import styles from './index.module.scss'

const LoginButton: React.FC<{
  avatar?: string;
  nickName?: string;
  useName?: string
}> = (props) => {
  const { avatar, nickName, useName, children } = props
  return <View className={styles.loginButtonContainer}>
    <AtAvatar image={avatar} circle className={styles.avatar} />
    <AtButton openType='getUserInfo' className={styles.loginButton}>
      <View>
        {nickName ?? '点击登录'}
        <Text className='at-icon at-icon-chevron-right' />
      </View>
      {useName && <Text className={styles.tinyName}>{useName}</Text>}
    </AtButton>
    {children && <View className={styles.extraNode}>
      { children }
    </View>}
  </View>
}

export default LoginButton;