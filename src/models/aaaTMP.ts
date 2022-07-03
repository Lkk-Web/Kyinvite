import { RSetState } from "../config/Constants";
import { bindModel, requestPost } from "../utils/dva16";
import { IModel } from "../utils/Idva16";

export enum NTMP {
    Name = 'NTMP',     //命名空间
    import = 'import',  
    get = 'get'
}

const TT = <IModel>{
    namespace: NTMP.Name,
    state: {
        datas: [],
    },
    effects: {
        async [NTMP.import]({ payload, callback }, { reducer, effect, select }) {
            await requestPost('test', { payload })
            reducer(RSetState, { datas: [123] })
            effect(NTMP.get)
            let { datas } = select()
            console.log('datas: ', datas);
            callback && callback()
        },
        async [NTMP.get]({ }, { }) {
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
