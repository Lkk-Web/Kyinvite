import { RSetState } from "../config/Constants";
import { bindModel, requestDelete, requestGet, requestPost } from "../utils/dva16";
import { IModel } from "../utils/Idva16";

export enum NCollect {
    Name = 'NCollect',
    save = 'save',
    get = 'get',
    delete = 'delete',
    companyGet = 'companyGet',
    companySave = 'companySave',
    companyDelete = 'companyDelete',
    // 修改是否禁用状态
}

const TT = <IModel>{
    namespace: NCollect.Name,
    state: {
        pageNum: 1,
        pageSize: 10,
        isCollect: false,
        data: [],
        makeData: []
    },
    effects: {
        async [NCollect.save]({ payload, callback }, { }) {
            const res = await requestPost(`collection/save?stationid=${payload.id}`, {})
            callback && callback(res)
        },
        async [NCollect.delete]({ payload, callback }, { }) {
            const res = await requestDelete(`collection/remove/${payload.id}`, {})
            callback && callback(res)
        },
        async [NCollect.get]({ callback }, { reducer }) {
            const res: any = await requestGet(`collection/list`, {})
            reducer(RSetState, { data: res.data })
            callback && callback(res)
        },
        async [NCollect.companySave]({ payload, callback }, { }) {
            const res = await requestPost(`/company-collection/save?resumeid=${payload.id}`, {})
            callback && callback(res)
        },
        async [NCollect.companyDelete]({ payload, callback }, { }) {
            const res = await requestDelete(`company-collection/remove/${payload.id}`, {})
            callback && callback(res)
        },
        async [NCollect.companyGet]({ callback }, { reducer }) {
            const res: any = await requestGet(`company-collection/list`, {})
            reducer(RSetState, { makeData: res.data })
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
