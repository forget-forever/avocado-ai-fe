import app from '../app.config';

type IPageList = ValueOf<(typeof app)['pages']>

export type RouterType = 'switchTab' | 'navigate' | 'reLaunch' | 'redirect'
export type IRouterMap = {
  my: undefined;
  index: undefined;
}
export const routerMap: Record<keyof IRouterMap, (type: RouterType ) => `/${IPageList}`> = {
  my: (_type) => '/pages/my/index',
  index: (_type) => '/pages/index/index'
}