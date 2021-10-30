import React, { useEffect } from 'react'
// import { View, Button } from '@tarojs/components'
// import { AtBadge, AtButton } from 'taro-ui'
// import { navigate } from '@/router'
// import { getUserInfo } from '@tarojs/taro'
import { WebView } from '@tarojs/components'
// import useData from '@/utils/hooks/useData'

const Index: React.FC = () => {
  // const {} useData((state) => state.common.openId)

  useEffect(() => {
    // getUserInfo({
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
  }, [])
  
  return (
    <WebView src='http://127.0.0.1:10086/#/pages/h5pages/index/index' ></WebView>
  )
}
export default Index
