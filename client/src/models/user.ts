import { RSetState } from "../config/Constants";
import { bindModel, requestPost } from "../utils/dva16";
import { IModel } from "../utils/Idva16";

export enum NUser {
    Name = 'NUser',
    get = 'get'
}

const TT = <IModel>{
    namespace: NUser.Name,
    state: {
        userInfo: {
            area: ['', '北京', '']
        },
    },
    effects: {
        async [NUser.get]({ payload, callback }, { reducer, effect, select }) {
            await requestPost('test', { ...payload })
            reducer(RSetState, { datas: [123] })
            effect(NUser.get)
            let { datas } = select()
            console.log('datas: ', datas);
            callback && callback()
        },
        async [NUser.get]({ }, { }) {
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
