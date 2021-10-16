export default {
  pages: [
    'pages/index/index',
    'pages/my/index'
  ] as const,
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '情意盲盒',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    // custom: true, // 仅 微信小程序支持自定义 需修改 custom-tab-bar 组件
    color: '#999',
    selectedColor: '#aaa',
    backgroundColor: '#FFF',
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
