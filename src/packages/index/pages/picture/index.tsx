import { ConversationInfo, Empty, PageContainer } from "@/components"
import { useInertval, useRouterParams } from "@/hooks"
import { getConversationInfoVM, getConversationStatusVM } from "@/serves"
import { ConversationStatus } from "@/utils/enum"
import { useState } from "react"
import { useRequest } from "taro-hooks"
import { AtTabs, AtTabsPane } from "taro-ui"
import { Text } from '@tarojs/components'

import styles from './index.module.scss'

const tabList = [
  { title: '绘图' },
  { title: '评论' }
]

const Picture: React.FC = () => {
  const { drawCode } = useRouterParams('picture')

  const { data, run: refreshInfo } = useRequest(getConversationInfoVM, {defaultParams: [drawCode]})

  const [current, setCurrent] = useState(0)

  const { conversationId, status } = data || {}

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
  

  return <PageContainer title='AI绘图'>
    <ConversationInfo {...data} />
    <ConversationInfo.Interact {...data} className='padding' />
    <AtTabs current={current} tabList={tabList} onClick={setCurrent} className={styles.tab}>
      <AtTabsPane current={current} index={0}>
        <Empty>
          <Text className='iconfont icon-loading1 spinning text-lg inline-block' />
          AI正在绘制
        </Empty>
      </AtTabsPane>
      <AtTabsPane current={current} index={1}>
       
      </AtTabsPane>
    </AtTabs>
  </PageContainer>
}

export default Picture;
