import { IPageList } from '@/router/routerMap';
import { actions } from '@/store';
import { system, serializeParams } from '@/utils';
import { useData, useMemoizedFn }from '@/hooks';
import { View } from '@tarojs/components';
import { useRouter, useShareAppMessage, useShareTimeline } from '@tarojs/taro';
import React, { createRef, CSSProperties, useEffect, useMemo } from 'react';
import { Modal } from '..';
import NaviagteBar, { NavigateProps } from '../NavigateBar';
// import TabBar from '../TabBar';


let statusHeigit = 0

if (process.env.TARO_ENV === 'h5') {
  statusHeigit = 55
}


type IProps = NavigateProps & {
  hideNavigate?: boolean;
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
}
const PageContainer: React.FC<IProps> = (props) => {
  const { children, hideNavigate, share, background, ...resetProps} = props;
  const modal = createRef<Modal>();

  const router = useRouter();

  const modalMsg = useData((state) => state.global.modalMsg);

  useEffect(() => {
    if (modalMsg && `/${router?.onShow}`?.includes(router.path)) {
      if (modal.current?.showModal) {
        const { success, cancel, complete } = modalMsg;
        (async () => {
          try {
            await modal.current?.showModal(modalMsg)
            success?.()
          } catch (error) {
            cancel?.()
          }
          complete?.()
        })()
      }
    }
  }, [modal, modalMsg, router?.onShow, router.path])

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

  const wholeHeight = system.screenHeight - statusHeigit

  const containerStyle = useMemo<CSSProperties>(() => ({
    height: hideNavigate ? `${wholeHeight}px` : `${wholeHeight - (hideNavigate ? 0 : system.customHeight)}px`,
    width: '100vw',
    overflowX: 'hidden',
    overflowY: 'auto',
    fontSize: '16px',
    background,
  }), [background, hideNavigate, wholeHeight])

  const cancelHandle = useMemoizedFn(() => {
    if (modalMsg) {
      actions.modalOption(undefined)
    }
  })

  return (
    <>
      {!hideNavigate && <NaviagteBar {...resetProps} />}
      <View style={containerStyle}>
        {children}
      </View>
      {/* <TabBar></TabBar> */}
      <Modal
        ref={modal}
        onCancel={cancelHandle}
      />
    </>
  );
}
export default PageContainer