import { AtIcon, AtModal, AtModalAction, AtModalContent, AtModalHeader } from 'taro-ui';
import { Component, CSSProperties } from 'react';
import styles from './index.module.scss';
import ButtonAsync from '../ButtonAsync';
// import { useMoalState } from './options';

type ModalMsg = {
  title: React.ReactNode;
  content: React.ReactNode;
  closeOnClickOverlay?: boolean
  positiveText?: string; // 积极操作的文字
  passiveText?: string; // 消极/取消操作的文字
  positiveIcon?: React.ReactNode;
  passiveIcon?: React.ReactNode;
  positiveButton?: React.ReactNode;
  passiveButton?: React.ReactNode;
  hideButton?: boolean;
  hidePositiveButton?: boolean;
  hidePassiveButton?: boolean;
  showClose?: boolean;
  positiveHandle?: () => void;
  passiveHandle?: () => void;
}
type IProps = {
  style?: CSSProperties;
  onCancel?: () => void;
};
interface Modal {
  props: IProps;
  state: {
    msg?: ModalMsg;
    positiveButton?: React.ReactNode;
    passiveButton?: React.ReactNode;
    isOpen: boolean;
  }
  setState: (s: Partial<Modal['state']>, cb?: () => void) => void
}
class Modal extends Component {
  constructor(props: IProps) {
    super(props);
    this.state = {
      msg: undefined,
      isOpen: false
    }
  }
  showModal = (msg: ModalMsg) => {
    return new Promise<void>((resolve, reject) => {
      this.setState({
        msg,
        isOpen: true,
        positiveButton: <ButtonAsync
          onClick={() => this.hideShow(() => resolve?.())}
          style={{ color: 'var(--defaultButtonFillColor)' }}
        >
          {msg.positiveIcon}{msg.positiveText || '确定' }
        </ButtonAsync>,
        passiveButton: <ButtonAsync
          onClick={() => this.hideShow(() => reject?.())}
        >
          {msg.passiveIcon}{msg.passiveText || '取消' }
        </ButtonAsync>
      })
    })
  }
  hideShow = (cb?: () => void) => {
    const { onCancel } = this.props;
    onCancel?.()
    this.setState({
      isOpen: false
    }, cb);
  }

  render() {
    const { msg, positiveButton, passiveButton, isOpen } = this.state;
    const { style } = this.props;
    return (
      <AtModal
        customStyle={style}
        isOpened={isOpen}
        closeOnClickOverlay={msg?.closeOnClickOverlay ?? true}
        onCancel={() => this.hideShow()}
      >
        <AtModalHeader>
          {msg?.title}
          {msg?.showClose && <AtIcon value='close' className={styles.closeIcon} onClick={() => this.hideShow()} />}
        </AtModalHeader>
        <AtModalContent>{msg?.content}</AtModalContent>
        {!msg?.hideButton && <AtModalAction>
          {!msg?.hidePassiveButton && (msg?.passiveButton || passiveButton)}
          {!msg?.hidePositiveButton && (msg?.positiveButton || positiveButton)}
        </AtModalAction>}
      </AtModal>
    )
  }
}

export default Modal;
