import { PageContainer } from "@/components"
import { useListData } from "@/hooks";
import { getNotificationList } from "@/serves";
import { RichText, View } from "@tarojs/components";
import { usePullDownRefresh, useReachBottom } from "@tarojs/taro";

import styles from './index.module.scss'

const message: React.FC = () => {
  const { listData, getNext, refreshList } = useListData(getNotificationList)
  usePullDownRefresh(refreshList)
  useReachBottom(getNext)

  return <PageContainer useContainer>
    {
      listData.map((item) => <View
        key={item.notificationId}
        className={styles.itemCard}
      >
        <View>标题： {item.title}</View>
        <View>创建时间: {item.createTime}</View>
        <RichText nodes={item.content} />
      </View>)
    }
  </PageContainer>
}

export default message;