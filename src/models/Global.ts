import { RSetState, EUserRole } from "../config/Constants"
import { bindModel } from "../utils/dva16";
import { IModel } from "../utils/Idva16";

export enum NGlobal {
  Name = 'NGlobal',
}

const TT = <IModel>{
  namespace: NGlobal.Name,
  state: {
    safeAreaHeight: 0,
    tabBarHeight: 0,
    currentCompanyIndex: 0,
    currentOfferStatus: 0,
    userRole: EUserRole.user,
    code: '',
    editCompantInfo: false
  },
  reducers: {
    [RSetState](state: any, { payload }: any) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: {},
}

bindModel(TT);
