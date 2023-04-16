import { View, Text } from "@tarojs/components"
import classNames from "classnames"
import { AtAvatar, AtButton } from "taro-ui"
import styles from './index.module.scss'

const LoginButton: React.FC<{
  avatar?: string;
  nickName?: string;
  useName?: string
}> = (props) => {
  const { avatar, nickName, useName, children } = props
  return <View className={styles.loginButtonContainer}>
    <AtAvatar image={avatar} circle className={classNames('styles.avatar', 'animation-ripple')} />
    <AtButton openType='getUserInfo' className={styles.loginButton}>
      <View className={styles.name}>
        <View className={classNames(styles.textView, 'text-cut')}>
          {nickName ?? '点击登录'}
        </View>
        <Text className='at-icon at-icon-chevron-right' />
      </View>
      {useName && <View className={classNames(styles.tinyName, styles.textView, 'text-cut')}>{useName}</View>}
    </AtButton>
    {children && <View className={styles.extraNode}>
      { children }
    </View>}
  </View>
}

export default LoginButton;