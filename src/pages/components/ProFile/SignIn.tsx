import { useData, useMemoizedFn } from "@/hooks"
import { navigate } from "@/router"
import { actions } from "@/store"
import { View } from "@tarojs/components"
import classNames from "classnames"
import styles from './index.module.scss'

const SignIn: React.FC = () => {

  const userInfo = useData((s) => s.common.userInfo)

  const { isSignToday } = userInfo || {}

  const clickHandle = useMemoizedFn(() => {
    if (isSignToday) {
      actions.modalOption({
        title: '已签到',
        content: '今天已签到, 明天再来吧！',
        hidePassiveButton: true,
        positiveText: '好的'
      })
    } else {
      navigate('signIn', { type: 'navigate' })
    }
  })

  if (!userInfo) {
    return <></>
  }
  return <View className={styles.signIn} onClick={clickHandle}>
    <View className={classNames('iconfont icon-qiandao1')} />
    <View className={styles.text}>{isSignToday ? '已签到' : '每日签到'}</View>
  </View>
}

export default SignIn;
