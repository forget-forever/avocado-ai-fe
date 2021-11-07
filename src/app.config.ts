export const uniquePages = {
  h5: [ 'pages/h5pages/index/index'] as const,
  miniapp: [
    'pages/index/index',
    'pages/index/post/index',
    'pages/my/bindPhone/index',
    'pages/planetary/index'
  ] as const
};
export const generalPages = [ 'pages/my/index' ] as const
const pages = (() => {
  switch(process.env.TARO_ENV) {
    case 'h5':
      return uniquePages.h5;
    default:
      return [...uniquePages.miniapp, ...generalPages];
  }
})()


export default {
  pages,
  window: {
    navigationStyle: "custom",
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#333',
    navigationBarTitleText: '情意盲盒',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: '#999',
    selectedColor: '#aaa',
    backgroundColor: '#333',
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
        pagePath: 'pages/planetary/index',
        text: '星球圈',
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
