import { RSetState } from "../config/Constants";
import { bindModel, requestPost } from "../utils/dva16";
import { IModel } from "../utils/Idva16";

export enum NSearch {
    Name = 'NSearch',
    search = 'search'
    // 修改是否禁用状态
}

const TT = <IModel>{
    namespace: NSearch.Name,
    state: {
        isBind: false,
        isPost: false,
        isHome: false,
        currentSearchIndex: 0,
        searchHistory: [],
        searchResult: [],
        searchHomeStation: '',
        searchHomeAddress: '',
    },
    effects: {
        async [NSearch.search]({ payload, callback }, { reducer }) {
            const res: any = await requestPost('station/likeV1', { ...payload })
            reducer(RSetState, { searchResult: res.data })
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
