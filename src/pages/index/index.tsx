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
            title='AI绘图'
            note='描述一幅画面，AI自动生成，每一张图片都是独一无二的。'
            arrow='right'
            thumb='https://aiquyin-static-beijing.oss-cn-beijing.aliyuncs.com/ChatGPT/icons/painting.png?x-oss-process=style/jmms'
            hasBorder={false}
            onClick={() => navigate('draw')}
          />
        </AtList>
      </Card>
    </PageContainer>
  )
}
export default Index
