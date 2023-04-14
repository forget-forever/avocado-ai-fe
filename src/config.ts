let tabBar = {
  color: '#999',
  selectedColor: '#aaa',
  backgroundColor: '#333',
  list: [
    {
      selectedIconPath: 'assets/images/home-on.png',
      // selectedIconUrl: getOssUrl('UI/home/home_on.png'),
      // iconUrl: getOssUrl('UI/home/home.png'),
      iconPath: 'assets/images/home.png',
      pagePath: 'pages/index/index',
      text: '首页',
    },
    {
      iconPath: 'assets/images/community.png',
      selectedIconPath: 'assets/images/community-on.png',
      // selectedIconUrl: getOssUrl('UI/home/planetary_on.png'),
      // iconUrl: getOssUrl('UI/home/planetary.png'),
      pagePath: 'pages/planetary/index',
      text: '社区',
    },
    {
      iconPath: 'assets/images/person.png',
      selectedIconPath: 'assets/images/person-on.png',
      // selectedIconUrl: getOssUrl('UI/home/my_on.png'),
      // iconUrl: getOssUrl('UI/home/my.png'),
      pagePath: 'pages/my/index',
      text: '我的',
    },
  ],
}

module.exports = {
  tabBar,
}
