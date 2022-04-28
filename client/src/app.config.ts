export default {
  pages: [
    'pages/index/index',
    'pages/login/index',
    'pages/home/index',
    'pages/search/index',
    'pages/chat/index',
    'pages/user/index',
    'pages/coach/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#bed2bb',
    navigationBarTitleText: '可依',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999',
    selectedColor: '#000',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '求职',
      },
      {
        pagePath: 'pages/chat/index',
        text: '直聊',
      },
      {
        pagePath: 'pages/coach/index',
        text: '辅导',
      },
      {
        pagePath: 'pages/user/index',
        text: '我的',
      },
    ],
  },
}
