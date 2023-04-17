import { PageContainer, Tag } from "@/components"
import { useListData } from "@/hooks";
import { getNotificationList } from "@/serves";
import { getSourceTypeText, getSourceTypeBgColor } from "@/utils/enum";
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
        <View className={styles.information}>
          <Tag type='primary' bgColor={getSourceTypeBgColor(getSourceTypeText(item.sourceType))}>
            {getSourceTypeText(item.sourceType)}
          </Tag>
          <View className={styles.createTime}>{item.createTime}</View>
        </View>
        <View className={styles.title}>{item.title}</View>
        <RichText className={styles.content} nodes={item.content} />
      </View>)
    }
  </PageContainer>
}

export default message;