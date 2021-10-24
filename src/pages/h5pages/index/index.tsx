import React from 'react'
import { View } from '@tarojs/components'
import Star from './components/Star'
import styles from './index.module.scss'
import Join from './components/Join'

const Index: React.FC = () => {
  
  return (
    <View className={styles.container}>
      <Star />
      <Join />
    </View>
  )
}
export default Index
