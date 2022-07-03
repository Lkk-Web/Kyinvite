import { RSetState } from "../config/Constants";
import { bindModel, requestGet } from "../utils/dva16";
import { IModel } from "../utils/Idva16";

export enum NDelivery {
    Name = 'NDelivery',
    get = 'get',
    hrget = 'hrget'
    // 修改是否禁用状态
}

const TT = <IModel>{
    namespace: NDelivery.Name,
    state: {
        data: [],
        hrdata: []
    },
    effects: {
        async [NDelivery.get]({ payload, callback }, { reducer }) {
            const res: any = await requestGet(`delivery/list?isView=${payload.isView}`, {})
            reducer(RSetState, { data: res.data })
            callback && callback(res)
        },
        async [NDelivery.hrget]({ payload, callback }, { reducer }) {
            const res: any = await requestGet(`delivery/listbycompany?isView=${payload.isView}`, {})
            reducer(RSetState, { hrdata: res.data })
            callback && callback(res)
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
