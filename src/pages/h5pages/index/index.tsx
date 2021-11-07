import React from 'react'
import { View } from '@tarojs/components'
import Star from './components/Star'
import styles from './index.module.scss'
import Join from './components/Join'
import Filter from './components/Filter'

const Index: React.FC = () => {
  
  return (
    <View className={styles.container}>
      <Filter />
      {/* <Star /> */}
      <Join />
    </View>
  )
}
export default Index
