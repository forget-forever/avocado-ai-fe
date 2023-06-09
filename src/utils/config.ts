import { getSystemInfoSync } from "@tarojs/taro";

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

export const system = {
  /** 静态栏Bar的高度 */
  statusBarHeight: statusBarHeightCnf,
  /** 屏幕的宽度 */
  screenWidth,
  /** 屏幕的高度 */
  screenHeight: screenHeightCnf,
  /** navigate的高度 */
  customHeight: +getCustomHeight() || 48,
  /** 对象存储的路径 */
  ossUrl: '',
  /** 可使用的区域大小 */
  windowHeight
}

export const getOssUrl = (url: string) => `https://aiquyin-static-beijing.oss-cn-beijing.aliyuncs.com/${url.replace(/^\//, '')}`