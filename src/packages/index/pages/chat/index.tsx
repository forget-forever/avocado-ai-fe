import { CSSProperties, FC, useMemo, useRef, useState } from 'react'
import { View, Text, Textarea } from '@tarojs/components'
import Taro, { pageScrollTo } from '@tarojs/taro';
import { useData, useMemoizedFn, useRouterParams, useListData } from '@/hooks';
import classNames from 'classnames';
import { PageContainer } from '@/components';
import { getConversationInfoVM, getMessageInfoVMList } from '@/serves';

import styles from './index.module.scss'

type Message = ISmallCamel<API.MessageInfoVM>[]

const Chat: FC = () => {
  const { current: temp } = useRef<{ conversationId?: string }>({})

  const { shortCode } = useRouterParams('chat')

  const { userName } = useData(({common}) => common.userInfo) || {}

  // const { data: messages = [] } = useRequest(, {
    
  // })

  const { listData: messages } = useListData(async (params: Parameters<typeof getMessageInfoVMList>[0]) => {
    if (!temp.conversationId) {
      const { conversationId } = await getConversationInfoVM(shortCode)
      temp.conversationId = conversationId
    }
    const res = await getMessageInfoVMList({
      ...params,
      UserName: userName!,
      ConversationId: temp.conversationId!,
    })
    return res
  }, {}, {
    refreshHandle: ({ setListData, listData, infinite }) => {
      return async () => {
        const res = infinite.next()
        
      }
    }
  })

  const [content, setContent] = useState<{
    value: string;
    height: number
  }>({
    value: '',
    height: 0
  });

  // const [scrollTop, setScrollTop] = useState(0);

  const handleScrollBottom = useMemoizedFn(() => {

    const query = Taro
      .createSelectorQuery()
      .select(`.${styles.chat}`)
      .boundingClientRect();
    query.exec((res) => {
      pageScrollTo({scrollTop: +res?.[0]?.height || 0})
    })

  })

  const handleSendClick = useMemoizedFn(async () => {

  })

  const handleConfirm = useMemoizedFn((e) => {
    setContent({...content, value: e?.detail?.value || ''});
  })

  const handleBlur = useMemoizedFn(() => {
    setContent({...content, height: 0});
  })

  const handleFocus = useMemoizedFn((e) => {
    setContent({...content, height: +e?.detail?.height || 0});
    handleScrollBottom();
  });

  const keyboardStyle = useMemo<CSSProperties>(() => {
    return {bottom: `${content.height}px`}
  }, [content.height])

  return (<PageContainer useContainer className={styles.chat} >
      {
        messages.map((message, index) => {
          if (!message.isChatGpt) {
            return (
              <View key={index} className={classNames(styles.chatListItemRight, styles.chatListItem)}>
                <Text selectable className={classNames(styles.chatListItemRightText, styles.chatListItemText)}>
                  {message.content}
                </Text>
                <View className={classNames(styles.chatListItemRightAvatar, styles.chatListItemAvatar)}>
                  我
                </View>
              </View>
            )
          } else {
            return (
              <View key={index} className={classNames(styles.chatListItemLeft, styles.chatListItem)}>
                <View className={classNames(styles.chatListItemLeftAvatar, styles.chatListItemAvatar)}>
                  AI
                </View>
                <Text selectable className={classNames(styles.chatListItemLeftText, styles.chatListItemText)}>
                  {message.content}
                </Text>
              </View>
            )
          }
        })
      }
      <View className={styles.chatBottom} style={keyboardStyle}>
        <Textarea
          maxlength={500}
          className={styles.chatBottomInput}
          value={content.value}
          fixed
          autoHeight
          onFocus={handleFocus}
          onBlur={handleBlur}
          onInput={handleConfirm}
          adjustPosition={false}
        />
        {
          content.value?.trim() && <View className={styles.chatBottomBtn} onClick={handleSendClick}>发送</View>
        }
      </View>
  </PageContainer>)
}

export default Chat;