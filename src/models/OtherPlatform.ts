import { RSetState } from "../config/Constants";
import { bindModel, requestPost } from "../utils/dva16";
import { IModel } from "../utils/Idva16";

export enum NOtherPlatform {
    Name = 'NOtherPlatform',
    sendMessage = 'sendMessage',
    hrSendMessage = 'hrSendMessage',
    // 修改是否禁用状态
}

const TT = <IModel>{
    namespace: NOtherPlatform.Name,
    state: {
        datas: [],
    },
    effects: {
        async [NOtherPlatform.sendMessage]({ payload }, { }) {
            await requestPost('msg/sendv1', { ...payload })
        },
        async [NOtherPlatform.hrSendMessage]({ payload }, { }) {
            await requestPost('msg/send', { ...payload })
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
