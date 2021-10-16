import React from 'react'
import { View, Text } from '@tarojs/components'
import { AtBadge, AtButton } from 'taro-ui'
import { navigate } from '@/router'

const Index: React.FC = () => {
  
  return (
    <View>
      <Text className='text-main'>Hello world!</Text>
      <View className='at-icon at-icon-settings text-main'></View>
      <AtBadge className='margin-top' value='1'>
        <AtButton size='small' onClick={() => {
          navigate('my', {type: 'switchTab'})
        }}
        >按钮</AtButton>
      </AtBadge>
    </View>
  )
}
export default Index
