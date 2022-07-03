import { RSetState } from "../config/Constants";
import { bindModel, requestGet, requestPost } from "../utils/dva16";
import { IModel } from "../utils/Idva16";

export enum NResumeBrief {
    Name = 'NResumeBrief',
    get = 'get',
    update = 'update'
    // 修改是否禁用状态
}

const TT = <IModel>{
    namespace: NResumeBrief.Name,
    state: {
        isKnow: false,
        routeValue: null,
        resumeInfo: null,
        goUpdate: false
    },
    effects: {
        async [NResumeBrief.update]({ payload, callback }, { }) {
            const res = await requestPost('resume/update', { ...payload.resumeInfo })
            callback && callback(res)
        },
        async [NResumeBrief.get]({ callback }, { reducer }) {
            const res: any = await requestGet('resume/get', {})
            reducer(RSetState, { resumeInfo: res.data })
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
