
export const RSetState = 'RSetState'

export const tabList = ['常用', '职位', '待遇', '地点']

export const companyTabList = ['公司主页', '在招职位']

export const offerStatus = ['待查看', '已查看', '约面试', '不合适']

export const degree = ['小学', '初中', '高中', '本科', '硕士', '博士', '其他']

export const financing_status = ['未融资', '天使期', 'A轮', 'B轮', 'C轮', '其他']

export const personNumber = ['0-10', '11-50', '51-500', '501-1000', '1001-2000', '2001-10000','10001-99999']

export const telStr = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
export const emlStr = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/

export enum resumeFile {
    workDisplay = '作品集',
    enclosedResume = '附件简历'
}


export enum EUserRole {
    user = 'user', //'用户',
    invite = 'invite'//'招聘'
}

export const TAB_BAR = [
    {
        iconPath: require('../assets/icon/focus1.png'),
        selectedIconPath: require('../assets/icon/onFocus1.png'),
        pagePath: '/pages/home/index',
        text: '求职',
    },
    {
        iconPath: require('../assets/icon/focus2.png'),
        selectedIconPath: require('../assets/icon/onFocus2.png'),
        pagePath: '/pages/chat/index',
        text: '直聊',
    },
    {
        iconPath: require('../assets/icon/focus3.png'),
        selectedIconPath: require('../assets/icon/onFocus3.png'),
        pagePath: '/pages/coach/index',
        text: '辅导',
    },
    {
        iconPath: require('../assets/icon/focus4.png'),
        selectedIconPath: require('../assets/icon/onFocus4.png'),
        pagePath: '/pages/user/index',
        text: '我的',
    },
]


export const HR_TAB_BAR = [
    {
        iconPath: require('../assets/icon/focus1.png'),
        selectedIconPath: require('../assets/icon/onFocus1.png'),
        pagePath: '/pages/home/index',
        text: '招聘',
    },
    {
        iconPath: require('../assets/icon/focus2.png'),
        selectedIconPath: require('../assets/icon/onFocus2.png'),
        pagePath: '/pages/chat/index',
        text: '直聊',
    },
    {
        iconPath: require('../assets/icon/focus4.png'),
        selectedIconPath: require('../assets/icon/onFocus4.png'),
        pagePath: '/pages/user/index',
        text: '我的',
    },
]

