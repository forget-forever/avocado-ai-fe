import { CSSProperties, useMemo } from "react"
import { AtTag } from "taro-ui"

const Tag: React.FC<{
  className?: string;
  bgColor?: string;
  color?: string;
} & GetClassIprops<typeof AtTag>> = (props) => {
  const { color = '#fff', bgColor, children, ...resetProps } = props

  const style = useMemo<CSSProperties>(() => {
    return {
      background: bgColor,
      color
    }
  }, [bgColor, color])

  return <AtTag customStyle={style} {...resetProps}>
    {children}
  </AtTag>
}

export default Tag;