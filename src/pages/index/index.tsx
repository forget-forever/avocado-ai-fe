import React, { useEffect, useMemo } from 'react'
import { WebView } from '@tarojs/components'
import useData from '@/utils/hooks/useData'
import Star from '@/components/Star';

const Index: React.FC = () => {
  const token =  useData((state) => state.common.token);
  
  const src = useMemo(() => {
    if (token?.val) {
      return `http://127.0.0.1:10086/#/pages/h5pages/index/index?token=${token.val}&time=${token.time}`;
    } else {
      return 'http://127.0.0.1:10086/#/pages/h5pages/index/index';
    }
  }, [token])

  useEffect(() => {
    // getUserInfo({
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
    // setTimeout(() => {
    //   console.log('aaaaa')
    //   setSrc1('http://127.0.0.1:10086/#/pages/h5pages/index/index?token=12345&time=123485968549')
    // }, 5000)
  }, [])
  
  return (
    <Star />
  )
}
export default Index
