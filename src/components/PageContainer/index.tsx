import { IPageList } from '@/router/routerMap';
import { AtMessage, AtNoticebar } from 'taro-ui';
import { actions, store } from '@/store';
import { serializeParams } from '@/utils';
import { useStatus }from '@/hooks';
import { ScrollView } from '@tarojs/components';
import { useDidShow, useRouter, useShareAppMessage, useShareTimeline } from '@tarojs/taro';
import React, { CSSProperties, useMemo, Fragment, useRef, LegacyRef } from 'react';
import classNames from 'classnames';
import Modal from '../Modal';
import NaviagteBar, { NavigateProps } from '../NavigateBar';
import styels from './index.module.scss';



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
  containerRef?: LegacyRef<any>;
  style?: CSSProperties;
  /**
   * 高度修正值，容器会减去这个高度
   * @default 0
  */
  heightCheck?: number | ((val: number) => number);
  /** 滚动位置 */
  scrollTop?: number;
  /** 额外的根节点 */
  rootNode?: React.ReactNode;
  notice?: React.ReactNode;
}
const PageContainer: React.FC<IProps> = (props) => {
  const {
    children,
    hideNavigate,
    share,
    background,
    className,
    useContainer,
    containerRef,
    scrollTop,
    heightCheck = 0,
    style,
    rootNode,
    notice,
    ...resetProps
  } = props;
  const modal = useRef<Modal>(null);
  
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
        return Promise.reject()
      } finally {
        complete?.()
      }
    })
  })

  const getShareParams = () => {
    /** 节约点性能，需要的时候主动获取 */
    const shareParams = { inviteCode: store.getState().common.userInfo?.inviteCode }
    return shareParams
  }
  const route = useRouter()

  useShareAppMessage(() => {
    // if (res.from === 'button') {
    //   // 来自页面内转发按钮
    //   console.log(res.target)
    // }
    const res = {
      ...share,
      path: share?.path || `/${route.path}`
    }
    res.path += `?${serializeParams({...res.query, ...getShareParams()})}`
    console.log(res)
    return res;
  })
  useShareTimeline(() => {
    return {
      ...share,
      query: JSON.stringify({...share?.query, ...getShareParams()}),
    }
  })

  let statusHeigit = 5

  if (process.env.TARO_ENV === 'h5') {
    statusHeigit = 60
  }

  const wholeHeight = system.getWindowHeight() - statusHeigit

  const containerStyle = useMemo<CSSProperties>(() => {
    const heightCheckFn = (val: number) => {
      if (typeof heightCheck === 'function') {
        return heightCheck(val)
      }
      return heightCheck
    }
    const resHeight = hideNavigate ? wholeHeight : (wholeHeight - (hideNavigate ? 0 : system.customHeight))
    return {
      height: `${resHeight - heightCheckFn(resHeight)}px`,
      width: '100vw',
      overflowX: 'hidden',
      background: 'var(--defaultBackGround)',
      ...style
    }
  }, [heightCheck, hideNavigate, style, system.customHeight, wholeHeight])

  return (
    <Fragment>
      <AtMessage />
      {!hideNavigate && <NaviagteBar {...resetProps} />}
      {rootNode}
      <ScrollView
        scrollY
        style={useContainer ? style : containerStyle}
        className={classNames(className, styels.container)}
        ref={containerRef}
        scrollTop={scrollTop}
      >
        {notice && <AtNoticebar icon='volume-plus' marquee className='sticky'>
          {notice}
        </AtNoticebar>}
        {children}
      </ScrollView>
      {/* <TabBar></TabBar> */}
      <Modal ref={modal} />
    </Fragment>
  );
}
export default PageContainer