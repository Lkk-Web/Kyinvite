import { RSetState } from "../config/Constants";
import { bindModel, requestGet, requestPost } from "../utils/dva16";
import { IModel } from "../utils/Idva16";

export enum NCompany {
    Name = 'NCompany',
    update = 'update',
    get = 'get',
    // 修改是否禁用状态
}

const TT = <IModel>{
    namespace: NCompany.Name,
    state: {
        datas: [],
        companyInfo: {},
        stationInfo: {},
    },
    effects: {
        async [NCompany.update]({ payload, callback }, { }) {
            const res: any = await requestPost('company/update', { ...payload })
            callback && callback(res)
        },
        async [NCompany.get]({ }, { reducer }) {
            const res: any = await requestGet('company/select', {})
            reducer(RSetState, { companyInfo: res.data })
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
