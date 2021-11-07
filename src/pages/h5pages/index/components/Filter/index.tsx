import { Modal, RadioButton } from "@/components";
import { createRef } from "react";
import OperateButton from "../OperateButton";
import styles from './index.module.scss';

const Filter: React.FC  = () => {
  const ModalRef = createRef<Modal>();
  
  return <>
    <OperateButton
      className={styles.filterButton}
      onClick={async () => {
        try {
          await ModalRef.current?.showModal({
            title: '筛选条件',
            content: <>
              <RadioButton title='星球：' options={[{ value: 0, label: '星球一' }]} />
            </>,
            hideButton: true
          })
        } catch (error) {
          
        }
        
      }}
    >
      筛 选
    </OperateButton>
    <Modal ref={ModalRef} />
  </>
}
export default Filter;