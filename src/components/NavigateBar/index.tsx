import { navigateBack } from "@/router"
import { system } from "@/utils/config"
import { View } from "@tarojs/components"
import { AtNavBar } from "taro-ui"

export type NavigateProps = {
  title?: string;
  background?: string;
  showBack?: boolean;
  backHandle?: () => void;
}
const NaviagteBar: React.FC<NavigateProps> = (props) => {
  const { title, showBack = true, backHandle, background } = props;
  const handleClick = () => {
    if (backHandle) {
      backHandle()
    } else {
      navigateBack()
    }
  }
  
  return (
    <>
      <View
        className='fixed'
        style={{
          width: '100vw',
          paddingTop: `${system.statusBarHeight}px`,
          background: background || '#333',
          top: 0,
          boxSizing: 'border-box',
        }}
      >
        <AtNavBar
          onClickLeftIcon={handleClick}
          color='#fff'
          customStyle={{background: '#333'}}
          title={title || '导航栏'}
          leftIconType={showBack ? 'chevron-left' : undefined}
          border={false}
        />
      </View>
      <View style={{width: '100vw', height: `${system.customHeight}px`}} /> 
    </>
  )
}
export default NaviagteBar;