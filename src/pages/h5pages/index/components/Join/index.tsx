import TrapezoidButton from "@/components/TrapezoidButton";
import { View } from "@tarojs/components";
import styles from "./index.module.scss";

const Join: React.FC = () => {
  return <View className={styles.container}>
    <TrapezoidButton
      style={{position: 'relative', left: '16px'}}
      width={80}
      height={50}
      className='animation-slide-left'
    >
      &nbsp;&nbsp;&nbsp;&nbsp;投
    </TrapezoidButton>
    <TrapezoidButton
      style={{position: 'relative', right: '16px'}}
      direction='bottom'
      width={80}
      height={50}
      className='animation-slide-right'
    >
      抽&nbsp;&nbsp;&nbsp;&nbsp;
    </TrapezoidButton>
  </View>
};

export default Join;
