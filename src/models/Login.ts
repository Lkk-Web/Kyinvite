import Taro from "@tarojs/taro";
import { EUserRole, RSetState } from "../config/Constants";
import { bindJWTToken, bindModel, requestGet, requestPost } from "../utils/dva16";
import { IModel } from "../utils/Idva16";

export enum NLogin {
    Name = 'NLogin',
    login = 'login',
    info = 'info',
    register = 'register',
    hrLogin = 'hrLogin',
    hrInfo = 'hrInfo',
    forgetPassword = 'forgetPassword'
    // 修改是否禁用状态
}

const TT = <IModel>{
    namespace: NLogin.Name,
    state: {
        userInfo: {},
        hrInfo: {},
        role: EUserRole.user,
        tmp: true,
    },
    effects: {
        async [NLogin.login]({ payload, callback }, { select }) {
            let { userInfo } = select()
            const token: any = await requestPost('login', { code: payload.code, avatarUrl: userInfo.avatarUrl, nickName: userInfo.nickName })
            if (token) {
                bindJWTToken(token.toString())
            }
            callback && callback(token)
        },
        async [NLogin.info]({ callback }, { reducer }) {
            const res: any = await requestGet('user/select', {})
            reducer(RSetState, { userInfo: res.data })
            if (res.data) {
                callback && callback(res)
            } else {
                Taro.showModal({
                    title: '登录失败！',
                    success: function () {
                        Taro.clearStorage()
                        Taro.redirectTo({ url: '/pages/index/index' })
                    }
                })
                console.log('登录失败！' + res.errMsg)
            }
        },
        async [NLogin.register]({ payload, callback }, { }) {
            const token: any = await requestPost('company/register', { ...payload })
            if (token) {
                bindJWTToken(token.toString())
            }
            callback && callback(token)
        },
        async [NLogin.hrLogin]({ payload, callback }, { }) {
            const res: any = await requestPost('company/login', { ...payload.loginInfo })
            if (res.data) {
                bindJWTToken(res.data.toString())
            }
            callback && callback(res)
        },
        async [NLogin.hrInfo]({ callback }, { reducer }) {
            const res: any = await requestGet('company/select', {})
            reducer(RSetState, { hrInfo: res.data })
            if (res) {
                callback && callback(res)
            } else {
                Taro.showModal({
                    title: '登录失败！',
                    success: function () {
                        Taro.clearStorage()
                        Taro.redirectTo({ url: '/pages/index/index' })
                    }
                })
                console.log('登录失败！' + res.errMsg)
            }
        },
        async [NLogin.forgetPassword]({ payload, callback }, { reducer }) {
            const res: any = await requestPost('forgotpassword/save', { ...payload })
            callback && callback(res)
        },
    },
    reducers: {
        [RSetState](state: any, { payload }: any) {
            return {
                ...state,
                ...payload,
            };
        },
    }
}

bindModel(TT);
