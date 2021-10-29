import React, { useEffect } from 'react'
// import { View, Button } from '@tarojs/components'
// import { AtBadge, AtButton } from 'taro-ui'
// import { navigate } from '@/router'
import { getUserInfo } from '@tarojs/taro'
import { WebView } from '@tarojs/components'

const Index: React.FC = () => {

  useEffect(() => {
    getUserInfo({
      success: (res) => {
        console.log(res)
      }
    })
  }, [])
  
  return (
    // <View>
    //   <View className='at-icon at-icon-settings text-main'></View>
    //   <AtBadge className='margin-top' value='1'>
    //     <AtButton size='small' onClick={() => {
    //       navigate('my', {type: 'switchTab'})
    //     }}
    //     >按钮</AtButton>
    //   </AtBadge>
    //   <Button
    //     onGetPhoneNumber={(e) => {
    //       console.log(e)
    //     }}
    //     open-type='getPhoneNumber'
    //   >
    //     获取电话号码
    //   </Button>
    // </View>
    <WebView src='http://127.0.0.1:10086/#/pages/h5pages/index/index' ></WebView>
  )
}
export default Index
