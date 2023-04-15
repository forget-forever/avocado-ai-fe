import { Card, PageContainer, TitleDesc } from '@/components';
import { getOssUrl } from '@/utils';
import {useData} from '@/hooks'
import React, { useEffect, useMemo } from 'react'
import { AtCard, AtList, AtListItem } from 'taro-ui';
import style from './index.module.scss'

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
    <PageContainer hideBack>
      <Card title='AI助手' margin='16px 0'>
        <AtList>
          <AtListItem
            className={style.listItem}
            title='ChatGPT助手'
            note='基于OpenAI的ChatGPT技术，实现的多功能AI助手。'
            arrow='right'
            thumb={getOssUrl('/ChatGPT/chatgpt.png?x-oss-process=style/jmms')}
          />
          <AtListItem
            className={style.listItem}
            title='AI抠图'
            note='一键去除背景，AI智能抠图，抠出人物，物品，服装等内容。'
            arrow='right'
            thumb='https://avocado-ai.oss-cn-shenzhen.aliyuncs.com/Images/icon/rmbg.png'
          />
        </AtList>
      </Card>
    </PageContainer>
  )
}
export default Index
