import { AtModal, AtModalAction, AtModalContent, AtModalHeader } from 'taro-ui';
import { Button } from '@tarojs/components';
import { useMoalState } from './options';

const Modal: React.FC = () => {
  const { modalState, setModalState } = useMoalState();
  if (!modalState) return <></>
  const { title, content } = modalState;
  // console.log(modalState);
  return (
    <AtModal isOpened>
      <AtModalHeader>{title}</AtModalHeader>
      <AtModalContent>{content}</AtModalContent>
      <AtModalAction>
        <Button>取消</Button>
        <Button>确定</Button>
      </AtModalAction>
    </AtModal>
  )
}

export default Modal;
