import { RSetState } from "../config/Constants";
import { bindModel, requestPost } from "../utils/dva16";
import { IModel } from "../utils/Idva16";

export enum NLogin {
    Name = 'NLogin',
    login = 'login',
    get = 'get'
    // 修改是否禁用状态
}

const TT = <IModel>{
    namespace: NLogin.Name,
    state: {
        userInfo: [],
        role: 'user',
    },
    effects: {
        async [NLogin.login]({ payload, callback }, { reducer, effect, select }) {
            const openid = await requestPost('test', { ...payload })
            console.log('openid: ', openid);
            reducer(RSetState, { userInfo: [123] })
            callback && callback()
        },
        async [NLogin.get]({ }, { }) {
            console.log('测试hhhh');
        }
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
