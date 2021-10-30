import app from '../app.config';

type IPageList = ValueOf<(typeof app)['pages']>

export type RouterType = 'switchTab' | 'navigate' | 'reLaunch' | 'redirect'

// 暂时以Record的形式传参
export type IRouterMap = {
  my: undefined;
  index: undefined;
  postMsg: undefined;
}
export const routerMap: Record<keyof IRouterMap, (type: RouterType ) => `/${IPageList}`> = {
  my: (_type) => '/pages/my/index',
  index: (_type) => '/pages/index/index',
  postMsg: (_type) => "/pages/index/post/index",
}