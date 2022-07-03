import Taro from "@tarojs/taro";
import { RSetState } from "../config/Constants";
import { bindModel, requestGet, requestPost } from "../utils/dva16";
import { IModel } from "../utils/Idva16";

export enum NStation {
    Name = 'NStation',
    list = 'list',
    delivery = 'delivery',
    companyPosition = 'companyPosition',
    postStation = 'postStation',
    updateStation = 'updateStation'
    // 修改是否禁用状态
}

const TT = <IModel>{
    namespace: NStation.Name,
    state: {
        datas: [],
        pageNum: 1,
        pageSize: 5,
        positionArray: [],
        positionDetail: {},
        companyDetail: {},
        companyPostion: [],
        postStation: '',
        postAddress: '',
    },
    effects: {
        async [NStation.list]({ payload, }, { reducer, select }) {
            let { positionArray } = select()
            const res: any = await requestGet(`station/list?pageNum=${payload.pageNum}&pageSize=${payload.pageSize}`, {})
            let data = res.data
            if (payload.sign) {
                positionArray = []
                if (res.data.length == 0) {
                    reducer(RSetState, { pageNum: 1 })
                    const req: any = await requestGet(`station/list?pageNum=${1}&pageSize=${5}`, {})
                    positionArray = req.data
                }
            }
            if (res.data.length == 0) { //到底不刷新
                if (!payload.sign) {
                    Taro.showToast({
                        title: '已经到底了~',
                        icon: 'success',
                        duration: 1000
                    });
                }
            }
            if (payload.pageNum >= 1) {
                data = positionArray.concat(data)
            }
            reducer(RSetState, { positionArray: data })
        },
        async [NStation.delivery]({ payload, callback }, { }) {
            const res = await requestPost(`delivery/save?stationid=${payload.id}`, {})
            callback && callback(res)
        },
        async [NStation.companyPosition]({ payload, callback }, { reducer }) {
            const res: any = await requestGet(`station/listbycompanyid?id=${payload.id}`, {})
            reducer(RSetState, { companyPostion: res.data })
            callback && callback(res)
        },
        async [NStation.postStation]({ payload, callback }, { }) {
            const res: any = await requestPost(`station/save`, { ...payload })
            callback && callback(res)
        },
        async [NStation.updateStation]({ payload, callback }, { }) {
            const res: any = await requestPost(`station/update`, { ...payload })
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
