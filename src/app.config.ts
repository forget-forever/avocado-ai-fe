export const uniquePages = {
  h5: [ 'pages/h5pages/index/index'] as const,
  weapp: [ 'pages/index/index' ] as const
};
export const generalPages = [ 'pages/my/index' ] as const
const pages = (() => {
  switch(process.env.TARO_ENV) {
    case 'h5':
      return uniquePages.h5;
      break;
    default:
      return [...uniquePages.weapp, ...generalPages];
  }
})()


export default {
  pages,
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#000',
    navigationBarTitleText: '情意盲盒',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: '#999',
    selectedColor: '#aaa',
    backgroundColor: '#000',
    list: [
      {
        selectedIconPath: 'assets/images/on-home.png',
        iconPath: 'assets/images/home.png',
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        iconPath: 'assets/images/my.png',
        selectedIconPath: 'assets/images/on-my.png',
        pagePath: 'pages/my/index',
        text: '我的',
      },
    ],
  },
}
