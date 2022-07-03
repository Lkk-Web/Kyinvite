import { RSetState } from "../config/Constants";
import { bindModel, requestPost } from "../utils/dva16";
import { IModel } from "../utils/Idva16";

export enum NFeedback {
    Name = 'NFeedback',
    save = 'save',
    // 修改是否禁用状态
}

const TT = <IModel>{
    namespace: NFeedback.Name,
    state: {
        datas: [],
    },
    effects: {
        async [NFeedback.save]({ payload }, { }) {
            const res = await requestPost('feedback/save', { ...payload })
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
