import { IPageList } from '@/router/routerMap';
import { AtMessage } from 'taro-ui';
import { actions } from '@/store';
import { serializeParams } from '@/utils';
import { useStatus }from '@/hooks';
import { View } from '@tarojs/components';
import { useDidShow, useShareAppMessage, useShareTimeline } from '@tarojs/taro';
import React, { createRef, CSSProperties, useMemo } from 'react';
import Modal from '../Modal';
import NaviagteBar, { NavigateProps } from '../NavigateBar';


// import TabBar from '../TabBar';


type IProps = NavigateProps & {
  hideNavigate?: boolean;
  className?: string;
  share?: {
    /** 分享的卡片的标题 */
    title?: string;
    /** 点击后进入的页面，跟着类型提示走*/
    path?: IPageList;
    /** 进入页面的参数 */
    query?: Record<string, string>,
    /** 分享的图片链接，可以本地也可以网络图片 */
    imageUrl?: string;
  };
  /** 使用自带的容器 */
  useContainer?: boolean;
}
const PageContainer: React.FC<IProps> = (props) => {
  const { children, hideNavigate, share, background, className, useContainer, ...resetProps} = props;
  const modal = createRef<Modal>();
  
  const system = useStatus()

  useDidShow(() => {
    actions.setOpenModalFunc(async (modalMsg?: GlobalState['global']['modalMsg']) => {
      if (!modalMsg) {
        return;
      }
      const { success, cancel, complete } = modalMsg;
      try {
        await modal.current?.showModal(modalMsg)
        success?.()
      } catch (error) {
        cancel?.()
      }
      complete?.()
    })
  })

  useShareAppMessage(() => {
    // if (res.from === 'button') {
    //   // 来自页面内转发按钮
    //   console.log(res.target)
    // }
    const res = { ...share };
    if (res.query){
      res.path += `?${serializeParams(res.query)}`
    }
    return res;
  })
  useShareTimeline(() => {
    return {...share, query: JSON.stringify(share?.query || {})}
  })

  let statusHeigit = 5

  if (process.env.TARO_ENV === 'h5') {
    statusHeigit = 60
  }

  const wholeHeight = system.windowHeight - statusHeigit

  const containerStyle = useMemo<CSSProperties>(() => ({
    height: hideNavigate ? `${wholeHeight}px` : `${wholeHeight - (hideNavigate ? 0 : system.customHeight)}px`,
    width: '100vw',
    overflowX: 'hidden',
    overflowY: 'auto',
    fontSize: '16px',
    background: 'var(--defaultBackGround)',
  }), [hideNavigate, system.customHeight, wholeHeight])

  return (
    <>
      <AtMessage />
      {!hideNavigate && <NaviagteBar {...resetProps} />}
      {
        useContainer ? children : <View style={containerStyle} className={className}>
          {children}
        </View>
      }
      {/* <TabBar></TabBar> */}
      <Modal ref={modal} />
    </>
  );
}
export default PageContainer