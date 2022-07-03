import { RSetState } from "../config/Constants";
import { bindModel, requestGet } from "../utils/dva16";
import { IModel } from "../utils/Idva16";

export enum NSetting {
    Name = 'NSetting',
    get = 'get'
    // 修改是否禁用状态
}

const TT = <IModel>{
    namespace: NSetting.Name,
    state: {
        bannerImg: [],
    },
    effects: {
        async [NSetting.get]({ }, { reducer }) {
            const res: any = await requestGet('setting/List', {})
            reducer(RSetState, { bannerImg: res.data })
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
