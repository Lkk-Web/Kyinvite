import { RSetState } from "../config/Constants";
import { bindModel, requestGet, requestPost } from "../utils/dva16";
import { IModel } from "../utils/Idva16";

export enum NHistory {
    Name = 'NHistory',
    get = 'get',
    hrGet = 'hrGet',
    save = 'save',
    hrSave = 'hrSave'
    // 修改是否禁用状态
}

const TT = <IModel>{
    namespace: NHistory.Name,
    state: {
        data: [],
        hrdata: []
    },
    effects: {
        async [NHistory.get]({ callback }, { reducer }) {
            const res: any = await requestGet(`userhistory/select?pageNum=1&pageSize=999`, {})
            reducer(RSetState, { data: res.data })
            callback && callback(res)
        },
        async [NHistory.hrGet]({ payload, callback }, { reducer }) {
            const res: any = await requestGet(`company-history/select?pageNum=1&pageSize=999`, {})
            reducer(RSetState, { hrdata: res.data })
            callback && callback(res)
        },
        async [NHistory.save]({ payload, callback }, { }) {
            const res: any = await requestPost(`userhistory/save?stationid=${payload.stationid}`, {})
            callback && callback(res)
        },
        async [NHistory.hrSave]({ payload, callback }, { }) {
            const res: any = await requestPost(`company-history/save?resumeid=${payload.resumeid}`, {})
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
