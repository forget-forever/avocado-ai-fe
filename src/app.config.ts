const { tabBar } = require('./config')


const uniquePages = {
  h5: ['pages/my/index'] as const,
  miniapp: ['pages/my/index'] as const
};


const generalPages = [
  'pages/index/index',
  'pages/my/index',
  'pages/community/index',
] as const


const pagesSource =[...generalPages, ...(() => {
  switch (process.env.TARO_ENV) {
    case 'h5':
      return uniquePages.h5;
    default:
      return uniquePages.miniapp;
  }
})()]

const pages = [...new Set(pagesSource)]


export default {
  pages,
  subPackages: [
    {
      root: 'packages/index',
      pages: [
        'pages/chat/index',
        'pages/createCommunication/index'
      ]
    },
    {
      root: 'packages/my',
      pages: [
        'pages/bindPhone/index',
        'pages/signIn/index',
        'pages/message/index',
        'pages/userinfo/index',
        'pages/onwerShip/index',
        'pages/helpCenter/index',
        'pages/privacy/index'
      ]
    }
  ] as const,
  window: {
    navigationStyle: "custom",
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '牛油果AI',
    navigationBarTextStyle: 'white'
  },
  tabBar: tabBar,
}
