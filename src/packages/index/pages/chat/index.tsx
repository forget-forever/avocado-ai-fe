import { CSSProperties, FC, useMemo, useRef, useState, Fragment } from 'react'
import { View, Text, Textarea, Image } from '@tarojs/components'
import Taro, { pageScrollTo } from '@tarojs/taro';
import { useData, useMemoizedFn, useRouterParams } from '@/hooks';
import classNames from 'classnames';
import { ButtonAsync, PageContainer, TimeShow } from '@/components';
import { getConversationInfoVM, getMessageInfoVMList, sendMessage } from '@/serves';
import { useRequest } from 'taro-hooks';
import { AtAvatar } from 'taro-ui';

import styles from './index.module.scss'




type Message = ISmallCamel<API.MessageInfoVM>[]

const Chat: FC = () => {
  const { current: temp } = useRef<Partial<PromiseReturn<typeof getConversationInfoVM>>>({})

  const { shortCode } = useRouterParams('chat')

  const { userName } = useData(({common}) => common.userInfo) || {}

  const { data: messages = [], run: refreshMsg } = useRequest(async () => {
    if (!temp.conversationId) {
      const { conversationId } = await getConversationInfoVM(shortCode)
      temp.conversationId = conversationId
    }
    const res = await getMessageInfoVMList({
      Limit: 200,
      Page: 1,
      UserName: userName!,
      ConversationId: temp.conversationId,
    })
    return res
  })

  

  const [content, setContent] = useState<{
    value: string;
    height: number;
    inputting: boolean
  }>({
    value: '',
    height: 0,
    inputting: false
  });

  const [scrollTop, setScrollTop] = useState(0);

  const { roleDescription, title } = temp

  const handleScrollBottom = useMemoizedFn(() => {

    const query = Taro
      .createSelectorQuery()
      .select(`.${styles.chat}`)
      .boundingClientRect();
    query.exec((res) => {
      const newTop = +res?.[0]?.height || 0
      setScrollTop(newTop === scrollTop ? newTop + 1 : newTop)
    })
  })

  const handleSendClick = useMemoizedFn(async () => {
    await sendMessage({ conversationId: temp.conversationId!, content: content.value })
  })

  const handleConfirm = useMemoizedFn((e) => {
    setContent({...content, value: e?.detail?.value || ''});
  })

  const handleBlur = useMemoizedFn(() => {
    setContent({...content, height: 0, inputting: false });
  })

  const handleFocus = useMemoizedFn((e) => {
    setContent({...content, height: +e?.detail?.height || 0, inputting: true });
    handleScrollBottom();
  });

  const { keyboardStyle } = useMemo(() => {
    return {
      keyboardStyle: {bottom: `${content.height}px`} as CSSProperties,
    }
  }, [content.height])

  return (<PageContainer heightCheck={content.height + 50} scrollTop={scrollTop} title={title}>
    <View className={styles.chat}>
      {roleDescription && <View className='bg-gray width-7 text-center padding margin-top'>{
        roleDescription
      }</View>}
      {
        messages.map((message) => {
          const classContainer = message.isChatGpt ? styles.chatListItemLeft : styles.chatListItemRight
          const avatarNode = <AtAvatar
            circle
            image={message.header || 'https://aiquyin-static-beijing.oss-cn-beijing.aliyuncs.com/ChatGPT/chatgpt.png?x-oss-process=style/jmms'}
          />
          return (
            <View key={message.id} className={classNames(classContainer, styles.chatListItem)}>
              {message.isChatGpt && avatarNode}
              <View>
                <TimeShow value={message.createTime} className={classNames('text-gray', styles.title)} directFormat='YYYY-MM-DD HH:mm' />
                <View className={classNames(styles.itemText, styles.chatListItemText)}>
                  {message.content}
                </View>
              </View>
              {!message.isChatGpt && avatarNode}
            </View>
          )
        })
      }
    </View>
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
        content.value?.trim() && <ButtonAsync type='primary' className={styles.chatBottomBtn} onClick={handleSendClick}>
          发送
        </ButtonAsync>
      }
    </View>
  </PageContainer>)
}

export default Chat;