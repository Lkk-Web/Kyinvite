import { resumeFile, RSetState } from "../config/Constants";
import { bindModel, requestPost } from "../utils/dva16";
import { IModel } from "../utils/Idva16";

export enum NResumeFile {
    Name = 'NTMP',
    get = 'get'
    // 修改是否禁用状态
}

const TT = <IModel>{
    namespace: NResumeFile.Name,
    state: {
        viewKey: resumeFile.enclosedResume,
        datas: [],
    },
    effects: {
        async [NResumeFile.get]({ }, { }) {
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
