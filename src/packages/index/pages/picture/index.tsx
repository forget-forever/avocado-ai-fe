import { ConversationInfo, Empty, PageContainer } from "@/components"
import { useInertval, useRouterParams } from "@/hooks"
import { getConversationInfoVM, getConversationStatusVM } from "@/serves"
import { ConversationStatus } from "@/utils/enum"
import { useState } from "react"
import { useRequest } from "taro-hooks"
import { AtTabs, AtTabsPane } from "taro-ui"
import { Image, Text } from '@tarojs/components'

import styles from './index.module.scss'

const tabList = [
  { title: '绘图' },
  { title: '评论' }
]

const Picture: React.FC = () => {
  const { drawCode } = useRouterParams('picture')

  const { data, run: refreshInfo } = useRequest(getConversationInfoVM, {defaultParams: [drawCode]})

  const [current, setCurrent] = useState(0)

  const { conversationId, status, images, comments } = data || {}

  useInertval(async () => {
    if (conversationId) {
      const res = await getConversationStatusVM(conversationId)
      if (res.status !== status) {
        await refreshInfo(drawCode)
      }
      if (res.status === ConversationStatus.NoAction) {
        return false
      }
    }
    return true
  }, 3000)

  let tipStr: React.ReactNode = ''
  if (!images?.length) {
    tipStr = '赞无图片'
  }
  if (status === ConversationStatus.Running) {
    tipStr = <><Text className='iconfont icon-loading1 spinning text-lg inline-block' />AI正在绘制</>
  }
  

  return <PageContainer title='AI绘图'>
    <ConversationInfo {...data}>
      <ConversationInfo.Interact {...data} />
    </ConversationInfo>
    <AtTabs current={current} tabList={tabList} onClick={setCurrent}>
      <AtTabsPane current={current} index={0}>
        {tipStr ? <Empty>
          {tipStr}
        </Empty> : images?.map((ele) => {
          return <Image src={ele} key={ele} className='width-100' />
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
