import React, { useEffect } from 'react'
import { View } from '@tarojs/components'
import Star from './components/Star'
import styles from './index.module.scss'

console.log(styles);
const Index: React.FC = () => {

  useEffect(() => {
    // getUserInfo({
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
  }, [])
  
  return (
    <View className={styles.container}>
      <Star />

    </View>
  )
}
export default Index
