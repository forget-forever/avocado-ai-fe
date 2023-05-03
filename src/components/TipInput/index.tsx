import { AtTextarea } from "taro-ui";
import { Text } from '@tarojs/components'
import ListItem from "../ListItem";
import ListTitle from "../ListTitle"

import styles from './index.module.scss'

const TipInput: React.FC<{
  value?: string;
  placeholder?: string;
  onChange?: (val?: string) => void;
  label?: React.ReactNode;
  describeExtra?: React.ReactNode;
}> = (props) => {
  const { value, onChange, placeholder, label, describeExtra } = props

  return <>
    <ListTitle style={{marginBottom: 0}}>
      {label}
    </ListTitle>
    <ListItem
      describe={<>
        <Text className='iconfont icon-fanyi-full text-xl' />
        <Text className='text-xs'>中文将被谷歌AI翻译成英文，推荐直接使用英文描述！</Text>
        {describeExtra}
      </>}
      arrowIcon=''
    >
      <AtTextarea
        value={value!}
        onChange={onChange!}
        placeholder={placeholder}
        height='2em'
        className={styles.textarea}
      />
    </ListItem>
  </>
}

export default TipInput;
