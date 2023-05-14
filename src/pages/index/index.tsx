import { Card, PageContainer } from '@/components';
import React, { useEffect } from 'react'
import { AtList, AtListItem } from 'taro-ui';
import { navigate } from '@/router';

import style from './index.module.scss'

const Index: React.FC = () => {
  // const token =  useData((state) => state.common.token);


  // useEffect(() => {
  // }, [])
  
  return (
    <PageContainer hideBack useContainer>
      <Card title='AI助手' margin='16px 0'>
        <AtList hasBorder={false}>
          <AtListItem
            className={style.listItem}
            title='AI问答'
            note='多功能问答工具, 为您解答各类问题'
            arrow='right'
            thumb='https://status.zhoumeilei.cn/img/rengongzhineng.png'
            onClick={() => navigate('createCommunication')}
          />
          <AtListItem
            className={style.listItem}
            title='AI绘图'
            note='描述一幅画面，AI自动生成，每一张图片都是独一无二的。'
            arrow='right'
            thumb='https://aiquyin-static-beijing.oss-cn-beijing.aliyuncs.com/ChatGPT/icons/painting.png?x-oss-process=style/jmms'
            onClick={() => navigate('draw')}
            hasBorder={false}
          />
        </AtList>
      </Card>
      <Card title='其他' className='margin-top'>
        <AtList hasBorder={false}>
          <AtListItem
            className={style.listItem}
            title='无水印下载视频/图集'
            thumb='https://aiquyin-static-beijing.oss-cn-beijing.aliyuncs.com/ChatGPT/icons/watemark.png?x-oss-process=style/jmms'
            arrow='right'
            note='抖音、快手、小红书、微博、B站、皮皮虾、陌陌、头条、TikTok等200多个短视频平台。'
            onClick={() => navigate('downloadMedia')}
            hasBorder={false}
          />
        </AtList>
      </Card>
    </PageContainer>
  )
}
export default Index
