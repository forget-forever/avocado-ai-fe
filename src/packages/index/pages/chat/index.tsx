import { CSSProperties, FC, useMemo, useRef, useState, Fragment } from 'react'
import { View, Text, Textarea, Image } from '@tarojs/components'
import Taro, { pageScrollTo } from '@tarojs/taro';
import { useData, useMemoizedFn, useRouterParams } from '@/hooks';
import classNames from 'classnames';
import { PageContainer, TimeShow } from '@/components';
import { getConversationInfoVM, getMessageInfoVMList, sendMessage } from '@/serves';
import { useRequest } from 'taro-hooks';
import { hideLoading, showLoading } from '@/utils';
import { AtAvatar } from 'taro-ui';

import styles from './index.module.scss'




type Message = ISmallCamel<API.MessageInfoVM>[]

const Chat: FC = () => {
  const { current: temp } = useRef<{ conversationId?: string }>({})

  const { shortCode } = useRouterParams('chat')

  const { userName } = useData(({common}) => common.userInfo) || {}

  // const { data: messages = [] } = useRequest(async () => {
  //   if (!temp.conversationId) {
  //     const { conversationId } = await getConversationInfoVM(shortCode)
  //     temp.conversationId = conversationId
  //   }
  //   const res = await getMessageInfoVMList({
  //     Limit: 200,
  //     Page: 1,
  //     UserName: userName!,
  //     ConversationId: temp.conversationId,
  //   })
  //   return res
  // }, {
  //   pollingInterval: 1000,
  // })

  const messages: Message = [
    {
      id: 32359,
      userName: "hehezml",
      name: "hahazml",
      header: "https://aiquyin-static-beijing.oss-cn-beijing.aliyuncs.com/ChatGPT/Headers/boy1.png?x-oss-process=style/jmms",
      conversationId: "768639cf-05d9-4387-9955-a4769b36f182",
      messageId: "f518dd39-751a-482b-91af-546e4e1fd736",
      isChatGpt: false,
      content: "css怎么样",
      index: 0,
      createTime: new Date(),
      status: 3,
      city: "北京市",
      checkStatus: 0
    },
    {
      id: 32360,
      userName: "hehezml",
      name: '',
      header: '',
      conversationId: "768639cf-05d9-4387-9955-a4769b36f182",
      messageId: "1c71fe4b-99f2-4f36-8ce9-54d59410374c",
      isChatGpt: true,
      content: "CSS（Cascading Style Sheets）是一种用于描述HTML（Hyper Text Markup Language）和XML（eXtensible Markup Language）文档外观和样式的语言。它用于控制网页的布局、字体、颜色、背景、边框、动画等样式。\n\nCSS的语法比较简单，可以通过选择器来定位HTML或XML中的元素，然后通过属性来改变元素的样式。CSS可以通过内部样式表、外部样式表或内联样式表的方式应用到HTML或XML文档中。\n\nCSS具有很多优点，例如：\n\n1. 可以将样式从HTML或XML文档中分离出来，使文档结构更加清晰，易于维护和修改。\n\n2. 可以通过继承、层叠等机制来优化样式的定义，减少代码量。\n\n3. 可以通过响应式设计来适应不同设备的屏幕尺寸和分辨率，提高网页的可访问性和用户体验。\n\n总之，CSS是网页设计中不可或缺的一部分，掌握CSS对于网页设计和开发非常重要。",
      index: 1,
      createTime: new Date,
      status: 3,
      city: '',
      checkStatus: 0
    },
    {
      id: 32365,
      userName: "hehezml",
      name: "hahazml",
      header: "https://aiquyin-static-beijing.oss-cn-beijing.aliyuncs.com/ChatGPT/Headers/boy1.png?x-oss-process=style/jmms",
      conversationId: "768639cf-05d9-4387-9955-a4769b36f182",
      messageId: "d4a80019-33da-4db1-9eec-3f69a5539181",
      isChatGpt: false,
      content: "那它有啥新特性",
      index: 2,
      createTime: new Date(),
      status: 3,
      city: "北京市",
      checkStatus: 0
    },
    {
      id: 32366,
      userName: "hehezml",
      name: '',
      header: '',
      conversationId: "768639cf-05d9-4387-9955-a4769b36f182",
      messageId: "80072087-42e9-416a-a631-3427b47c9135",
      isChatGpt: true,
      content: "CSS3是CSS的最新版本，其中包含了许多新特性。以下是CSS3的一些新特性：\n\n1. 选择器：CSS3引入了一些新的选择器，如属性选择器、伪类选择器、伪元素选择器等，使开发者能够更精细地定位元素。\n\n2. 盒子模型：CSS3中的盒子模型允许开发者精确地控制元素的尺寸和边距，包括设置元素的圆角、阴影等效果。\n\n3. 边框：CSS3新增了一些边框样式，如圆角边框、渐变边框、图像边框等，使得开发者能够更加灵活地设计元素的边框。\n\n4. 背景：CSS3中的背景属性允许开发者设置复杂的背景效果，如渐变背景、图像背景、多重背景等。\n\n5. 动画和过渡：CSS3中新增了一些动画和过渡效果，使得开发者能够为元素添加更加生动的效果，如旋转、缩放、淡入淡出等。\n\n6. 响应式设计：CSS3使得响应式设计更加容易实现，能够根据不同设备的屏幕尺寸和分辨率来自动调整样式。\n\n总之，CSS3的新特性让开发者能够更加灵活地定制网页的样式和效果，提高网页的质量和用户体验。",
      index: 3,
      createTime: new Date("2023-04-26T21:55:14.103"),
      status: 3,
      city: '',
      checkStatus: 0
    }
  ]

  // const { listData: messages } = useListData(async (params: Parameters<typeof getMessageInfoVMList>[0]) => {
  //   if (!temp.conversationId) {
  //     const { conversationId } = await getConversationInfoVM(shortCode)
  //     temp.conversationId = conversationId
  //   }
  //   const res = await getMessageInfoVMList({
  //     ...params,
  //     UserName: userName!,
  //     ConversationId: temp.conversationId!,
  //   })
  //   return res
  // }, {}, {
  //   refreshHandle: ({ setListData, listData, infinite }) => {
  //     return async () => {
  //       const res = infinite.next()

  //     }
  //   }
  // })

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
      .select(`.${styles.chat}`)
      .boundingClientRect();
    query.exec((res) => {
      const newTop = +res?.[0]?.height || 0
      setScrollTop(newTop === scrollTop ? newTop - 0.1 : newTop)
    })

  })

  const handleSendClick = useMemoizedFn(async () => {
    showLoading({title: '发送中', mask: true})
    try {
      await sendMessage({ conversationId: temp.conversationId!, content: content.value })
    }finally {
      hideLoading()
    }
    
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

  const { keyboardStyle } = useMemo(() => {
    return {
      keyboardStyle: {bottom: `${content.height}px`} as CSSProperties,
    }
  }, [content.height])

  return (<PageContainer heightCheck={content.height + 50} scrollTop={scrollTop}>
    <View className={styles.chat}>
      {
        messages.map((message, index) => {
          if (!message.isChatGpt) {
            return <Fragment key={message.id}>
              <View>ChatGpt <TimeShow className='text-gray' /></View>
              <View className={classNames(styles.chatListItemRight, styles.chatListItem)}>
                <Text selectable className={classNames(styles.chatListItemRightText, styles.chatListItemText)}>
                  {message.content}
                </Text>
                <AtAvatar circle image={message.header} />
              </View>
            </Fragment>
          } else {
            return (
              <View key={index} className={classNames(styles.chatListItemLeft, styles.chatListItem)}>
                <AtAvatar circle image='https://aiquyin-static-beijing.oss-cn-beijing.aliyuncs.com/ChatGPT/chatgpt.png?x-oss-process=style/jmms' />
                <Text selectable className={classNames(styles.chatListItemLeftText, styles.chatListItemText)}>
                  {message.content}
                </Text>
              </View>
            )
          }
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
        content.value?.trim() && <View className={styles.chatBottomBtn} onClick={handleSendClick}>发送</View>
      }
    </View>
  </PageContainer>)
}

export default Chat;