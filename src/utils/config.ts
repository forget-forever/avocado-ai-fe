import { getSystemInfoSync } from "@tarojs/taro";

const { statusBarHeight, screenWidth } = getSystemInfoSync()
const getCustomHeight = () => {
  if (statusBarHeight >= 30) {
    return statusBarHeight * 2
  } else {
    return statusBarHeight * 750 / screenWidth + statusBarHeight;
  }
}
export const system = {
  statusBarHeight,
  customHeight: getCustomHeight()
}