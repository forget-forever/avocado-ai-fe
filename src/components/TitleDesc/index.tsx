import { View } from "@tarojs/components"
import { CSSProperties } from "react"


const style: CSSProperties = {
  padding: '10px',
  color: 'rgb(153, 153, 153)',
  fontSize: '12px',
}

const TitleDesc: React.FC = (props) => {
  const { children } = props
  return <View style={style}>
    {children}
  </View>
}

export default TitleDesc;