import { useMemoizedFn } from '@/hooks'
import { showToast } from '@/utils'
import { Text } from '@tarojs/components'
import { setClipboardData } from '@tarojs/taro'
import { throttle } from 'lodash'
import classNames from 'classnames'
import styles from './index.module.scss';

const copy = throttle((str: string) => {
  setClipboardData({
    data: str,
    success: () => {
      showToast('复制成功')
    }
  })
}, 1000)

const CopyIcon: React.FC<{
  /** 复制的内容, 如果没有内容则不复制 */
  text?: string;
}> = (props) => {
  const { children, text } = props

  const copyHandle = useMemoizedFn(() => {
    if (text) {
      copy(text)
    } else {
      showToast('无内容可复制')
    }
  })
  
  return <Text onClick={copyHandle}>
    { children || <Text className={classNames('iconfont icon-fuzhi', styles.itemFont)} /> }
  </Text>
}

export default CopyIcon;