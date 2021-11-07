import { Modal } from "@/components";
import { createRef } from "react";
import OperateButton from "../OperateButton";
import styles from './index.module.scss';

const Filter: React.FC  = () => {
  const ModalRef = createRef<Modal>();
  
  return <>
    <OperateButton className={styles.filterButton}>筛 选</OperateButton>
    <Modal ref={ModalRef} />
  </>
}
export default Filter;