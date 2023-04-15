import { navigate, navigateBack } from "@/router"
import { system } from "@/utils"
import { useData} from "@/hooks"
import { View } from "@tarojs/components"
import { CSSProperties, useMemo } from "react"
import { AtNavBar } from "taro-ui"

export type NavigateProps = {
  /**
   * navigateBar显示的标题
   */
  title?: string;
  /**
   * navagateBar的背景
   */
  background?: string;
  /**
   * 隐藏掉navagateBar的返回按钮
   */
  hideBack?: boolean;
  /**
   * 拦截返回操作
   */
  backHandle?: () => void;
}
const NaviagteBar: React.FC<NavigateProps> = (props) => {
  const { title, hideBack, backHandle, background } = props;

  const handleClick = async () => {
    if (hideBack) return;
    if (backHandle) {
      backHandle()
    } else {
      try {
        navigateBack()
      } catch (error) {
        navigate('index', {type: 'reLaunch',});
      }
      
    }
  }
  const themeColor = useData((state) => state.common.themeColor);

  const {containerStyle, headStyle} = useMemo<Record<'containerStyle' | 'headStyle', CSSProperties>>(() => ({
    containerStyle: {
      width: '100vw',
      paddingTop: `${system.statusBarHeight}px`,
      background: background || themeColor,
      top: 0,
      boxSizing: 'border-box',
      zIndex: 10,
      borderBottom: 'solid 1px rgb(245, 245, 245)'
    },
    headStyle: {width: '100vw', height: `${system.customHeight}px`}
  }), [background, themeColor])

  

  return (
    <>
      <View
        className='fixed'
        style={containerStyle}
      >
        <AtNavBar
          onClickLeftIcon={handleClick}
          title={title || '牛油果AI'}
          leftIconType={!hideBack ? 'chevron-left' : undefined}
          leftText={!hideBack ? '返回' : undefined}
        />
      </View>
      <View style={headStyle} /> 
    </>
  )
}
export default NaviagteBar;