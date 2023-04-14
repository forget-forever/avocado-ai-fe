// import { PageContainer } from '@/components'
import { PageContainer } from '@/components';
import useData from '@/utils/hooks/useData'
import React, { useEffect, useMemo } from 'react'

const Index: React.FC = () => {
  const token =  useData((state) => state.common.token);


  useEffect(() => {
    // getUserInfo({
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
    // setTimeout(() => {
    //   console.log('aaaaa')
    //   setShow(true)
    // }, 8000)
  }, [])
  
  return (
    <PageContainer>
      主页
    </PageContainer>
  )
}
export default Index
