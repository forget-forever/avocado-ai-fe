import { FC, useRef, useState } from 'react'
import { View, Textarea, Text } from '@tarojs/components'
import { createSelectorQuery } from '@tarojs/taro';
import { useData, useInertval, useMemoizedFn, useRouterParams } from '@/hooks';
import classNames from 'classnames';
import { ButtonAsync, PageContainer, TimeShow } from '@/components';
import { getConversationInfoVM, getConversationStatusVM, getMessageInfoVMList, sendMessage } from '@/serves';
import { useRequest } from 'taro-hooks';
import { AtAvatar } from 'taro-ui';
import { to } from 'await-to-js';
import { ConversationStatus } from '@/utils/enum';
import { system } from '@/utils';
import styles from './index.module.scss'

const customHeight = {top: system.customHeight}


const Chat: FC = () => {
  const { shortCode, ...resetParams } = useRouterParams('chat')

  const { current: temp } = useRef<Partial<PromiseReturn<typeof getConversationInfoVM>>>({...resetParams})

  const {roleDescription, title, remainTokenCount} = temp

  const { userName } = useData(({common}) => common.userInfo) || {}

  const [scrollTop, setScrollTop] = useState(0);

  /** 滚动到最下面 */
  const handleScrollBottom = useMemoizedFn(() => {
    setTimeout(() => {
      const query = createSelectorQuery().select(`.${styles.chat}`).boundingClientRect();
      query.exec((res) => {
        const newTop = +res?.[0]?.height || 0
        setScrollTop(newTop === scrollTop ? newTop + 1 : newTop)
      })
    }, 60)
  })

  const { data: messages = [], run: refreshMsg } = useRequest(async () => {
    const conversationRes = await getConversationInfoVM(shortCode)
    Object.assign(temp, conversationRes)
    const res = await getMessageInfoVMList({
      Limit: 200,
      Page: 1,
      UserName: userName!,
      ConversationId: temp.conversationId!,
    })
    handleScrollBottom()
    return res
  })

  const [content, setContent] = useState<{
    value: string;
    height: number;
    inputting: boolean;
  }>({
    value: '',
    height: 0,
    inputting: false
  });

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

  const handleSendClick = useMemoizedFn(async () => {
    await sendMessage({ conversationId: temp.conversationId!, content: content.value })
    temp.status = ConversationStatus.Waiting
    setContent({ ...content, value: '', height: 0, inputting: false })
    await refreshMsg()
  })

  useInertval(async () => {
    if (temp.conversationId) {
      const res = await getConversationStatusVM(temp.conversationId)
      if (temp.status !== res.status) {
        const [err] = await to(refreshMsg())
        if (err) {
          console.warn(err, '请求发送错误')
        }
      }
    }
  }, 3000)

  let loadingTipText = ''
  switch(temp.status) {
    case ConversationStatus.Running:
      loadingTipText = '处理中';
      break;
    case ConversationStatus.Waiting:
      loadingTipText = '等待队列中';
      break;
  }
  let remainCount = (remainTokenCount || 0) - (content.value || '').length * 2

  return (<PageContainer heightCheck={content.height} scrollTop={scrollTop} title={title}>
    <View className={classNames(styles.remainTip, content.inputting ? 'animation-slide-top' : 'hide')} style={customHeight}>
      <View>
        由于ChatGPT模型限制，每一个对话上下文最多支持大约4096个英文单词或2048个汉字
      </View>
      <View>
        当前问题ChatGPT最大可回答大约{remainCount}英文单词，或
        {remainCount / 2}
        汉字！
      </View>
    </View>
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