import { ButtonAsync, Tag, TimeShow } from '@/components'
import { useListData } from '@/hooks'
// import { navigate } from '@/router'
import { readNotification } from '@/serves'
import { showMaskToast } from '@/utils'
import { getSourceTypeBgColor, getSourceTypeText } from '@/utils/enum'
import { RichText, View } from '@tarojs/components'
import classNames from 'classnames'
import styles from './index.module.scss'


const MessageList: React.FC<{
  listData?: ISmallCamel<API.NotificationInfoVM>[];
  changeRowData?: ReturnType<typeof useListData>['changeRowData']
}> = (props) => {
  const { listData = [], changeRowData } = props

  return <>{
    listData.map((item, index) => <View
      key={item.notificationId}
      className={styles.itemCard}
      // onClick={() => {
      //   if (getSourceTypeText(item.sourceType) === '对话提醒') {
      //     navigate('chat', {params: {shortCode: item.sourceCode}})
      //   }
      // }}
    >
      <View className={styles.information}>
        <Tag type='primary' bgColor={getSourceTypeBgColor(getSourceTypeText(item.sourceType))}>
          {getSourceTypeText(item.sourceType)}
        </Tag>
        <View className={styles.createTime}>
          <TimeShow value={item.createTime} />
        </View>
      </View>
      <View className={styles.title}>{item.title}</View>
      <RichText className={styles.content} nodes={item.content} />
      <View className={classNames('flex', styles.readButtonView, 'width-100')}>
        {!item.isRead && changeRowData && <ButtonAsync
          size='mini'
          className={styles.button}
          onClick={async () => {
            await readNotification(item.notificationId)
            changeRowData(index, {isRead: !item.isRead})
            showMaskToast('已读成功')
          }}
        >
          已读
        </ButtonAsync>}
      </View>
    </View>)
  }</>
}

export default MessageList;