import { ConversationInfo, Empty, ImageItem, PageContainer } from "@/components"
import { useInertval, useRouterParams } from "@/hooks"
import { getAiDrawingDetailsByConversationId, getConversationInfoVM, getConversationStatusVM } from "@/serves"
import { ConversationStatus } from "@/utils/enum"
import { useState } from "react"
import { useRequest } from "taro-hooks"
import { AtTabs, AtTabsPane } from "taro-ui"
import { Text } from '@tarojs/components'
import { navigate } from "@/router"
import { previewImage } from "@tarojs/taro"

import styles from './index.module.scss'


const tabList = [
  { title: '绘图' },
  { title: '评论' }
]

const loadOk = (status?: ConversationStatus) => {
  return [ConversationStatus.NoAction, ConversationStatus.RunningSuccess].includes(status!)
}

const Picture: React.FC = () => {
  const { drawCode } = useRouterParams('picture')

  const { data, run: refreshInfo } = useRequest(async () => {
    const res = await getConversationInfoVM(drawCode)
    let images: API.DrawingPictureDetailInfoVM[] = []
    if (loadOk(res.status)) {
      images = await getAiDrawingDetailsByConversationId(res.conversationId)
    }
    return {
      ...res,
      imagesRes: images,
      imageUrls: images.map(({url}) => url)
    }
  })

  const [current, setCurrent] = useState(0)

  const { conversationId, status, imagesRes, imageUrls, } = data || {}

  useInertval(async () => {
    if (conversationId) {
      const res = await getConversationStatusVM(conversationId)
      if (res.status !== status) {
        await refreshInfo()
      }
      if (loadOk(res.status)) {
        return false
      }
    }
    return true
  }, 3000)

  let tipStr: React.ReactNode = ''
  if (!imagesRes?.length) {
    tipStr = '赞无图片'
  }
  if (status === ConversationStatus.Running) {
    tipStr = <><Text className='iconfont icon-loading1 spinning text-lg inline-block' />AI正在绘制</>
  }
  

  return <PageContainer title='AI绘图'>
    <ConversationInfo {...data}>
      <ConversationInfo.Interact {...data} />
    </ConversationInfo>
    <AtTabs current={current} tabList={tabList} onClick={setCurrent} className={styles.tab}>
      <AtTabsPane current={current} index={0}>
        {tipStr ? <Empty>
          {tipStr}
        </Empty> : imagesRes?.map((ele) => {
          const { pictureId, url } = ele
          return <ImageItem
            onClick={() => previewImage({
              urls: imageUrls || [],
              current: url
            })}
            src={url}
            key={url}
            imgClassName='width-100'
            onDetailClick={() => navigate('pictureDetail', { params: {pictureId} })}
          />
        })}

      </AtTabsPane>
      <AtTabsPane current={current} index={1}>
        <Empty.Tip >
          功能开发中
        </Empty.Tip>
      </AtTabsPane>
    </AtTabs>
  </PageContainer>
}

export default Picture;
