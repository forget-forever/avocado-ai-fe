import { useMemoizedFn } from '@/hooks'
import { showToast } from '@/utils'
import { Text } from '@tarojs/components'
import { setClipboardData } from '@tarojs/taro'
import { throttle } from 'lodash'
import classNames from 'classnames'
import styles from './index.module.scss';

const copy = throttle((str: string, successTip: string = '复制成功', successHandle?: () => void) => {
  return setClipboardData({
    data: str,
    success: successHandle || (() => {
      showToast(successTip)
    })
  })
}, 1000)

const CopyIcon: React.FC<{
  /** 复制的内容, 如果没有内容则不复制 */
  text?: string;
  /** 成功的提示的内容 */
  successTip?: string;
  /** 成功的回调 */
  successHandle?: () => void
}> & {
  copyText: typeof copy
} = (props) => {
  const { children, text, successTip } = props

  const copyHandle = useMemoizedFn(() => {
    if (text) {
      copy(text, successTip)
    } else {
      showToast('无内容可复制',)
    }
  })
  
  return <Text onClick={copyHandle}>
    { children || <Text className={classNames('iconfont icon-fuzhi', styles.itemFont)} /> }
  </Text>
}

CopyIcon.copyText = copy;

export default CopyIcon;