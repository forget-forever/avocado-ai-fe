import { Image } from "@tarojs/components"
import { CSSProperties, useMemo } from 'react'

const Logo: React.FC<MyOmit<GetIProps<typeof Image> & {
  /** 下偏移 */
  top?: string;
}, 'src'>> = (props) => {

  const { top = '4px', ...resetProps } = props
  const style= useMemo<CSSProperties>(() => {
    return {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      position: 'relative',
      top: top
    }
  }, [top])

  return <Image
    style={style}
    src='https://aiquyin-static-beijing.oss-cn-beijing.aliyuncs.com/ChatGPT/avocado.png?x-oss-process=style/jmms'
    {...resetProps}
  />
}

export default Logo