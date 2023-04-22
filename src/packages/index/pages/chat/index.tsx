import { CSSProperties, FC, useMemo, useState } from 'react'
import { View, ScrollView, Text, Textarea } from '@tarojs/components'
import Taro from '@tarojs/taro';
import { useMemoizedFn } from '@/hooks';
import classNames from 'classnames';
import { PageContainer } from '@/components';

import styles from './index.module.scss'


enum RoleEnum {
  USER = 'user',
  ASSISTANT = 'assistant',
}

export type Message = {
  role: RoleEnum,
  content: string,
};

const Chat: FC = () => {

  const [messages, setMessages] = useState<Message[]>([
    { role: RoleEnum.ASSISTANT, content: 'haha' },
    { role: RoleEnum.USER, content: 'hehe' }
  ]);

  const [content, setContent] = useState<{
    value: string;
    height: number
  }>({
    value: '',
    height: 0
  });

  const [scrollTop, setScrollTop] = useState(0);

  const handleScrollBottom = useMemoizedFn(() => {
    const query = Taro
      .createSelectorQuery()
      .select(`.${styles.chatList}`)
      .boundingClientRect();
    query.exec((res) => {
      setScrollTop(res[0].height)
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

  return (<PageContainer useContainer>
    <View className={styles.chat}>
      <ScrollView scrollY scrollTop={scrollTop} scrollWithAnimation className={styles.chatList}>
        {
          messages.map((message, index) => {
            if (message.role === RoleEnum.USER) {
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
            } else if (message.role === RoleEnum.ASSISTANT) {
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
            } else {
              return <></>
            }
          })
        }
      </ScrollView>
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
    </View>
  </PageContainer>)
}

export default Chat;