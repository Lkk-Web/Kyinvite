export default {
  pages: [
    'pages/coach/index',
    'pages/index/index',
    'pages/home/index',
    'pages/chat/index',
    'pages/user/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
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
