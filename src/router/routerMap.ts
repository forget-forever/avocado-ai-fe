import { getCurrentPages } from '@tarojs/taro';
import app from '../app.config';

declare type NumberList = 0 | 1

type SubPackages = typeof app['subPackages']
// type SubPackageItem = SubPackages[number];
// type SubPackagesVal = `${SubPackageItem['root']}/${ValueOf<SubPackageItem['pages']>}`;
type SubPackagesList = {
  [K in NumberList]: `${SubPackages[K]['root']}/${ValueOf<SubPackages[K]['pages']>}`
}

export type IPageList = ValueOf<(typeof app)['pages']> | ValueOf<SubPackagesList>

export type RouterType = 'switchTab' | 'navigate' | 'reLaunch' | 'redirect'

// 暂时以Record<string, string>的形式传参,因为参数是要拼接在path后面
export type IRouterMap = {
  my?: never;
  index?: never;
  chat: { shortCode: string, roleDescription?: string, title?: string };
  bindPhoneNumber?: { needWxBind?: string};
  community?: never;
  signIn?: never;
  messageNotice?: never;
  userinfo?: never;
  onwerShip?: never;
  helpCenter?: never;
  privacy?: never;
  createCommunication?: never;
  draw?: never;
  picture: {drawCode: string};
  pictureDetail: { pictureId: string },
  downloadMedia: never,
}

/**
 * 判断是否在tabBar页面
 * @returns 
 */
export const inTabBarPage = () => {
  const page =  getCurrentPages()
  const pageUrl = page[page.length - 1].route as IPageList

  return (['pages/index/index', 'pages/my/index'] as IPageList[]).includes(pageUrl)
}

// 可以不用登陆就能进的页面
export const loginExcludeList: (keyof IRouterMap)[] = ['index', 'my', 'community', 'bindPhoneNumber']

export const routerMap: Record<keyof IRouterMap, (type: RouterType ) => `/${IPageList}`> = {
  my: (_type) => '/pages/my/index',
  index: (_type) => '/pages/index/index',
  bindPhoneNumber: (_type) => '/packages/my/pages/bindPhone/index',
  community: (_type) => '/pages/community/index',
  signIn: (_) => '/packages/my/pages/signIn/index',
  messageNotice: () => '/packages/my/pages/message/index',
  userinfo: () => '/packages/my/pages/userinfo/index',
  onwerShip: () => '/packages/my/pages/onwerShip/index',
  helpCenter: () => '/packages/my/pages/helpCenter/index',
  privacy: () => '/packages/my/pages/privacy/index',
  chat: () => '/packages/index/pages/chat/index',
  createCommunication: () => '/packages/index/pages/createCommunication/index',
  draw: () => '/packages/index/pages/draw/index',
  picture: () => '/packages/index/pages/picture/index',
  pictureDetail: () => '/packages/index/pages/pictureDetail/index',
  downloadMedia: () => '/packages/index/pages/downloadMedia/index'
}