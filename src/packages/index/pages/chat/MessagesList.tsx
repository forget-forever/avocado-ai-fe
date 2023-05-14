import { CopyIcon, TimeShow } from "@/components"
import { View } from "@tarojs/components"
import classNames from "classnames"
import { AtAvatar } from "taro-ui"

import styles from './index.module.scss'

const MessageList: React.FC<{
  messages?: ISmallCamel<API.MessageInfoVM>[]
}> = (props) => {
  const { messages = [] } = props
  return <>
    {
        messages.map((message) => {
          const classContainer = message.isChatGpt ? styles.chatListItemLeft : styles.chatListItemRight
          const avatarNode = <AtAvatar
            circle
            image={message.header || 'https://status.zhoumeilei.cn/img/rengongzhineng.png'}
          />
          return (
            <View key={message.id} className={classNames(classContainer, styles.chatListItem)}>
              {message.isChatGpt && avatarNode}
              <View>
                <TimeShow value={message.createTime} className={classNames('text-gray', styles.title)} directFormat='YYYY-MM-DD HH:mm' />
                <View className={classNames(styles.itemText, styles.chatListItemText, 'flex align-items')}>
                  <View>
                    {message.content}
                  </View>
                  {message.isChatGpt && <CopyIcon text={message.content} />}
                </View>
              </View>
              {!message.isChatGpt && avatarNode}
            </View>
          )
        })
      }
  </>
}

export default MessageList;