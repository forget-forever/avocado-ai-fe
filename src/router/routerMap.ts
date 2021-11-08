import app from '../app.config';

export type IPageList = ValueOf<(typeof app)['pages']>

export type RouterType = 'switchTab' | 'navigate' | 'reLaunch' | 'redirect'

// 暂时以Record<string, string>的形式传参,因为参数是要拼接在path后面
export type IRouterMap = {
  my: never;
  index: never;
  postMsg: never;
  bindPhoneNumber?: { needWxBind?: string};
  planetary: never;
}
// 可以不用登陆就能进的页面
export const loginExcludeList: (keyof IRouterMap)[] = ['index', 'my', 'planetary']
export const routerMap: Record<keyof IRouterMap, (type: RouterType ) => `/${IPageList}`> = {
  my: (_type) => '/pages/my/index',
  index: (_type) => '/pages/index/index',
  postMsg: (_type) => "/pages/index/post/index",
  bindPhoneNumber: (_type) => '/pages/my/bindPhone/index',
  planetary: (_type) => '/pages/planetary/index'
}