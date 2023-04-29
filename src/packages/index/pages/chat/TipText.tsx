import { system } from "@/utils"
import { View } from "@tarojs/components"
import classNames from "classnames"

import styles from './index.module.scss'

const customHeight = {top: system.customHeight}

const TipText: React.FC<{
  show?: boolean;
  count?: number;
  inputValue?: string;
}> = (props) => {
  const { show, count, inputValue } = props

  let remainCount = (count || 0) - (inputValue|| '').length * 2

  return <View className={classNames(styles.remainTip, show ? 'animation-slide-top' : 'hide')} style={customHeight}>
    <View>
      由于ChatGPT模型限制，每一个对话上下文最多支持大约4096个英文单词或2048个汉字
    </View>
    <View>
      当前问题ChatGPT最大可回答大约{remainCount}英文单词，或
      {remainCount / 2}
      汉字！
    </View>
  </View>
}

export default TipText;
