import { Image } from "@tarojs/components"
import { CSSProperties } from 'react'

const style: CSSProperties = {
  display: 'inline-block',
  width: '20px',
  height: '20px',
  position: 'relative',
  top: '4px'
}

const Logo: React.FC<MyOmit<GetIProps<typeof Image>, 'src'>> = (props) => {
  return <Image
    style={style}
    src='https://aiquyin-static-beijing.oss-cn-beijing.aliyuncs.com/ChatGPT/avocado.png?x-oss-process=style/jmms'
    {...props}
  />
}

export default Logo