export default {
  pages: [
    'pages/index/index',  //进入页
    'pages/login/index', //登录界面
    'pages/home/index',  //首页
    'pages/search/index',   //搜索页
    'pages/chat/index',  //直聊页
    'pages/user/index', //用户信息界面
    'pages/coach/index', //辅导页
    'pages/jobIntention/index', //求职意向页
    'pages/positionDetail/index', //职位详情页
    'pages/companyDetail/index', // 公司详情
    'pages/importResume/index', //导入附件页
    'pages/addResume/index', //新增简历
    'pages/feedback/index', //意见反馈页
    'pages/privicy/index', //隐私设置页
    'pages/editInfo/index',  //编辑简历基本信息
    'pages/addExperience/index', //添加经历
    'pages/castedResume/index', //查看我的投递简历页
    'pages/myCollect/index', //我的收藏
    'pages/history/index', //浏览历史页
    'pages/myResume/index', //我的简历页
    'pages/workDisplay/index',  //作品展示
    //招聘端
    'pages/register/index',   //注册页
    'pages/forgetPassword/index', //找回密码页
    'pages/postJob/index',    //发布岗位
    'pages/searchResult/index', //搜索结果
    'pages/checkResume/index',//查看简历
    'pages/onlineResume/index',//在线简历
    'pages/reciveResume/index', //查看投递我的简历页
    'pages/myMake/index', //我的标记
    //其他
    'pages/agreement/index', //用户协议和隐私政策
    'pages/law/index', //法律咨询
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#bed2bb',
    navigationBarTitleText: '可依招聘',
    navigationBarTextStyle: 'white',
    enablePullDownRefresh: true,
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
