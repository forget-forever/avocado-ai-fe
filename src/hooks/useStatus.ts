import { getSystemInfoSync } from "@tarojs/taro";

/** 获取一些静态参数 */
const useStatus = () => {
  const { statusBarHeight, screenWidth, screenHeight, windowHeight } = getSystemInfoSync()
const getCustomHeight = () => {
  if (statusBarHeight >= 30) {
    return statusBarHeight * 2
  } else {
    return statusBarHeight * 750 / screenWidth + statusBarHeight;
  }
}

let screenHeightCnf = screenHeight;
const statusBarHeightCnf = +statusBarHeight

const getClilentHeight = () => {
  const heightClient = document?.body?.clientHeight

  if (heightClient) {
    return heightClient - statusBarHeightCnf;
  }
  return 0
}
const heightClient = getClilentHeight()

if (heightClient) {
  screenHeightCnf = heightClient;
}

const system = {
  /** 静态栏Bar的高度 */
  statusBarHeight: statusBarHeightCnf,
  /** 屏幕的宽度 */
  screenWidth,
  /** 屏幕的高度 */
  screenHeight: screenHeightCnf,
  /** navigate的高度 */
  customHeight: +getCustomHeight() || 48,
  /** 可使用的区域大小 */
  windowHeight
}
return system
}

export default useStatus;
