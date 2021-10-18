import React, { useEffect } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { AtBadge, AtButton } from 'taro-ui'
import { navigate } from '@/router'
import { getUserInfo } from '@tarojs/taro'
import Star from './components/Star'

const Index: React.FC = () => {

  useEffect(() => {
    getUserInfo({
      success: (res) => {
        console.log(res)
      }
    })
  }, [])
  
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
      <Button
        onGetPhoneNumber={(e) => {
          console.log(e)
        }}
        open-type='getPhoneNumber'
      >
        获取电话号码
      </Button>
      <Star />
    </View>
  )
}
export default Index
