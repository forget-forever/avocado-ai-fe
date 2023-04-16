import { View } from "@tarojs/components"
import { CSSProperties } from "react"


const style: CSSProperties = {
  padding: '16px',
  color: 'rgb(153, 153, 153)',
  fontSize: '12px',
}

const TitleDesc: React.FC<GetIProps<typeof View>> = (props) => {
  const { children, ...resetProps } = props
  return <View style={style} {...resetProps}>
    {children}
  </View>
}

export default TitleDesc;