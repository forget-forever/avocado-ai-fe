import { View } from "@tarojs/components"
import { CSSProperties, useMemo } from "react"
import { AtCard } from "taro-ui"

const Card: React.FC<GetClassIprops<typeof AtCard> & {
  margin?: CSSProperties['margin'];
  padding?: CSSProperties['padding'];
  border?: CSSProperties['border']
}> = (props) => {
  const { children, margin, padding, border, ...resetProps } = props

  const style = useMemo(() => ({
    margin, padding, border,
  }), [border, margin, padding])

  return <View style={style}>
    <AtCard {...resetProps}>
      {children}
    </AtCard>
  </View>
}

export default Card