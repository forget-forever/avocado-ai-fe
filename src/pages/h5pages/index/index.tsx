import React, { useEffect } from 'react'
import { View } from '@tarojs/components'
import { getPageQuery } from '@/utils/utils'
import { setState } from '@/store'
import Star from './components/Star'
import styles from './index.module.scss'
import Join from './components/Join'
import Filter from './components/Filter'



const Index: React.FC = () => {

  useEffect(() => {
    const { token, time } = getPageQuery();
    alert(token)
    if (token) {
      setState('common', { token: {val: token as string, time: +(time as string)} })
    }
  }, [])
  
  return (
    <View className={styles.container}>
      {/* <Star /> */}
      <Filter />
      <Join />
    </View>
  )
}
export default Index
