import { Card, PageContainer } from '@/components';
import { getOssUrl } from '@/utils';
import React, { useEffect } from 'react'
import { AtList, AtListItem } from 'taro-ui';
import { navigate } from '@/router';

import style from './index.module.scss'

const Index: React.FC = () => {
  // const token =  useData((state) => state.common.token);


  // useEffect(() => {
  // }, [])
  
  return (
    <PageContainer hideBack>
      {/* <AtNoticebar icon='volume-plus' marquee>
        这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
      </AtNoticebar> */}
      <Card title='AI助手' margin='16px 0'>
        <AtList hasBorder={false}>
          <AtListItem
            className={style.listItem}
            title='ChatGPT助手'
            note='基于OpenAI的ChatGPT技术，实现的多功能AI助手。'
            arrow='right'
            thumb={getOssUrl('/ChatGPT/chatgpt.png?x-oss-process=style/jmms')}
            onClick={() => navigate('createCommunication')}
          />
          <AtListItem
            className={style.listItem}
            title='AI抠图'
            note='一键去除背景，AI智能抠图，抠出人物，物品，服装等内容。'
            arrow='right'
            thumb='https://avocado-ai.oss-cn-shenzhen.aliyuncs.com/Images/icon/rmbg.png'
            hasBorder={false}
            onClick={() => navigate('draw')}
          />
        </AtList>
      </Card>
    </PageContainer>
  )
}
export default Index
