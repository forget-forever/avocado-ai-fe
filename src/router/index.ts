import { navigateTo, redirectTo, reLaunch, switchTab } from "@tarojs/taro";
import { IRouterMap, routerMap, RouterType } from "./routerMap";


type IConfig = {
  success?: (arg: Taro.General.CallbackResult) => void,
  fail?: (arg: Taro.General.CallbackResult) => void,
  complete?: (arg: Taro.General.CallbackResult) => void
}
type IParams<U extends keyof IRouterMap> = IRouterMap[U] extends undefined ? {} : {params: IRouterMap[U]}

/**
 * 页面跳转的函数
 * @param url 跳转的routeMap值，记得在routerMap中加好类型和跳转方案
 * @param config 其他的配置参数，包括success，fail，events什么的
 */
export const navigate = <U extends keyof IRouterMap, T extends RouterType = 'navigate'>(
  url: U,
  config?: IConfig & IParams<U> & {
    type?: T
    events?: T extends 'navigate' ? Record<string, any> | undefined : undefined
  }
) => {
  const { type = 'navigate', events, success, fail, complete} = config || {}
  const defaultData = { success, fail, complete, url: routerMap[url](type)};
  switch(type) {
    case 'navigate':
      navigateTo({
        ...defaultData,
        events,
      })
    break;
    case 'reLaunch': 
      reLaunch({ ...defaultData })
    break;
    case 'redirect': 
      redirectTo({ ...defaultData })
    break;
    case 'switchTab':
      switchTab({ ...defaultData })
    break;
    default: 
      console.log(`是谁乱传参数，传了个${type}`)
  }
}

export const navigateBack = (num = 1, config: IConfig) => {
  const { success, fail, complete } = config;
  Taro.navigateBack({
    delta: num,
    success,
    fail,
    complete
  });
}