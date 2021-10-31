import { actions } from '@/store';
import { system } from '@/utils/config';
import useData from '@/utils/hooks/useData';
import { View } from '@tarojs/components';
import { useRouter } from '@tarojs/taro';
import React, { createRef, useEffect } from 'react';
import { Modal } from '..';
import NaviagteBar, { NavigateProps } from '../NavigateBar';

type IProps = NavigateProps & {
  hideNavigate?: boolean
}
const PageContainer: React.FC<IProps> = (props) => {
  const { children, hideNavigate } = props;
  const modal = createRef<Modal>();
  const router = useRouter()
  // console.log(router);
  const modalMsg = useData((state) => state.global.modalMsg);
  useEffect(() => {
    if (modalMsg && `/${router?.onShow}`?.includes(router.path)) {
      if (modalMsg) {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal, modalMsg])
  return (
    <>
      {!hideNavigate && <NaviagteBar {...props} />}
      <View style={{height: `calc(100vh - ${system.customHeight}px)`}}>{children}</View>
      <Modal
        ref={modal}
        onCancel={() => {
          if (modalMsg) {
            actions.modalOption(undefined)
          }
        }}
      />
    </>
  );
}
export default PageContainer