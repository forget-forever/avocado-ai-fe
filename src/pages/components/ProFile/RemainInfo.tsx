import { Logo } from "@/components";
import { useData } from "@/hooks";
import { View } from "@tarojs/components"
import classNames from "classnames";

import styles from './index.module.scss'

const RemainInfo: React.FC = () => {
  const userInfo = useData((s) => s.common.userInfo)
  const { remainCount, usedCount, inviteCount } = userInfo || {}
  /** 没有用户信息那就没登陆，别显示了 */
  if (!userInfo) {
    return <></>
  }
  return <View className={classNames('flex flex-center width-100 margin-top', styles.countInfo,)}>
    <View className={classNames(styles.infoItem)}>
      <View className='flex flex-center'>
        {remainCount}
        <Logo top='0' />
      </View> 
      <View className={styles.title}>剩余数量</View>
    </View>
    <View className={classNames(styles.infoItem)}>
      <View className='flex flex-center'>
        {usedCount}
        <Logo top='0' />
      </View>
      <View className={styles.title}>已使用</View>
    </View>
    <View className={classNames(styles.infoItem)}>
      <View className='flex flex-center'>{ inviteCount }</View>
      <View className={styles.title}>邀请人数</View>
    </View>
  </View>
}

export default RemainInfo;
