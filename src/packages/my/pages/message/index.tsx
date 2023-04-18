import { PageContainer } from "@/components"
import { useListData, useMemoizedFn } from "@/hooks";
import { getNotificationList } from "@/serves";
import { useState, useMemo } from "react";
import { AtTabs, AtTabsPane } from "taro-ui";
import MessageList from "./MessageList";

const tabList = [
  { title: '全部' },
  { title: '未读' }
]

const message: React.FC = () => {
  const { listData, changeRowData, refreshList, setParams } = useListData(getNotificationList)

  const [current, setCurrent] = useState(0)

  const messageDom = useMemo(() => {
    return <MessageList listData={listData} changeRowData={changeRowData} />
  }, [changeRowData, listData])

  const tabChangeHandle = useMemoizedFn((index: number) => {
    /** 坐标1是未读 */
    if (index === 1) {
      setParams({isRead: false})
    } else {
      setParams({isRead: undefined})
    }
    
    refreshList()
    setCurrent(index)
  })

  return <PageContainer useContainer>
    <AtTabs current={current} tabList={tabList} onClick={tabChangeHandle}>
      <AtTabsPane current={current} index={0}>
        {messageDom}
      </AtTabsPane>
      <AtTabsPane current={current} index={1}>
        {messageDom}
      </AtTabsPane>
    </AtTabs>
  </PageContainer>
}

export default message;