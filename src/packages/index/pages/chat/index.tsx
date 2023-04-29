import { FC, useRef, useState } from 'react'
import { View, Textarea, Text } from '@tarojs/components'
import { createSelectorQuery } from '@tarojs/taro';
import { useData, useInertval, useMemoizedFn, useRouterParams } from '@/hooks';
import classNames from 'classnames';
import { ButtonAsync, PageContainer } from '@/components';
import { getConversationInfoVM, getConversationStatusVM, getMessageInfoVMList, sendMessage } from '@/serves';
import { useRequest } from 'taro-hooks';
import { to } from 'await-to-js';
import { ConversationStatus } from '@/utils/enum';
import styles from './index.module.scss'
import MessageList from './MessagesList';
import TipText from './TipText';


const Chat: FC = () => {
  const { shortCode, ...resetParams } = useRouterParams('chat')

  const { current: temp } = useRef<Partial<PromiseReturn<typeof getConversationInfoVM>>>({...resetParams})

  const {roleDescription, title, remainTokenCount} = temp

  const { userName } = useData(({common}) => common.userInfo) || {}

  const [scrollTop, setScrollTop] = useState(0);
  const [content, setContent] = useState({ value: '', height: 0, inputting: false });

  /** 滚动到最下面 */
  const handleScrollBottom = useMemoizedFn((delay: number = 0) => {
    setTimeout(() => {
      const query = createSelectorQuery().select(`.${styles.chat}`).boundingClientRect();
      query.exec((res) => {
        const newTop = +res?.[0]?.height || 0
        setScrollTop(newTop === scrollTop ? newTop + 1 : newTop)
      })
    }, delay)
  })

  const { data: messages, run: refreshMsg } = useRequest(async () => {
    const conversationRes = await getConversationInfoVM(shortCode)
    Object.assign(temp, conversationRes)
    const res = await getMessageInfoVMList({
      Limit: 200,
      Page: 1,
      UserName: userName!,
      ConversationId: temp.conversationId!,
    })
    handleScrollBottom(60)
    return res
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

  const { runContinue } = useInertval(async () => {
    if (temp.conversationId) {
      const res = await getConversationStatusVM(temp.conversationId)
      if (temp.status !== res.status) {
        const [err] = await to(refreshMsg())
        if (err) {
          console.warn(err, '请求发送错误')
        }
      }
      if (res.status === ConversationStatus.NoAction) {
        return false
      }
    }
    return true
  }, 3000)

  const handleSendClick = useMemoizedFn(async () => {
    await sendMessage({ conversationId: temp.conversationId!, content: content.value })
    temp.status = ConversationStatus.Waiting
    setContent({ ...content, value: '', height: 0, inputting: false })
    runContinue()
    await refreshMsg()
  })

  let loadingTipText = ''
  switch(temp.status) {
    case ConversationStatus.Running:
      loadingTipText = '处理中';
      break;
    case ConversationStatus.Waiting:
      loadingTipText = '等待队列中';
      break;
  }

  return (<PageContainer heightCheck={content.height} scrollTop={scrollTop} title={title}>
    <TipText show={content.inputting} count={remainTokenCount} inputValue={content.value} />
    <View className={styles.chat}>
      {roleDescription && <View className='bg-gray width-7 text-center padding'>{
        roleDescription
      }</View>}
      <MessageList messages={messages} />
      <View className={classNames(styles.loadingTip, 'text-center', loadingTipText ? '' : 'hide')}>
        <Text className='iconfont icon-loading1 spinning' />
        {loadingTipText}
      </View>
    </View>
    <View className={styles.chatBottom}>
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
      <ButtonAsync
        type='primary'
        className={classNames(styles.chatBottomBtn, content.value?.trim() ? '' : 'hide')}
        onClick={handleSendClick}
        disabled={!!loadingTipText}
      >
        发送
      </ButtonAsync>
    </View>
  </PageContainer>)
}

export default Chat;