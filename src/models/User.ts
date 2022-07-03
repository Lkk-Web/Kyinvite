import Taro from "@tarojs/taro";
import { RSetState } from "../config/Constants";
import { bindModel, requestPost } from "../utils/dva16";
import { IModel } from "../utils/Idva16";

export enum NUser {
    Name = 'NUser',
    stationUpdate = 'stationUpdate',
    update = 'update',
    list = 'list',
    hrSearch = 'hrSearch'
}

const TT = <IModel>{
    namespace: NUser.Name,
    state: {
        searchKeyValue: [],
        hrIssueStation: [],
        positionSelect: [],
        addressSelect: [],
        salary: { min: null, max: null },
        pageNumHr: 1,
        pageSizeHr: 5,
        userArray: [],
        userDetail: {}
    },
    effects: {
        async [NUser.stationUpdate]({ payload, }, { }) {
            await requestPost('user/update', { station: { ...payload } })
        },
        async [NUser.update]({ payload, callback }, { }) {
            const res: any = await requestPost('user/update', { ...payload })
            callback && callback(res)
        },
        async [NUser.list]({ payload, }, { reducer, select }) {
            let { userArray } = select()
            const res: any = await requestPost(`resume/like?pageNum=${payload.pageNumHr}&pageSize=${payload.pageSizeHr}`, {})
            let data = res.data
            if (payload.sign) {
                userArray = []
                if (res.data.length == 0) {
                    reducer(RSetState, { pageNum: 1 })
                    const req: any = await requestPost(`resume/like?pageNum=${1}&pageSize=${5}`, {})
                    userArray = req.data
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
            if (payload.pageNumHr >= 1) {
                data = userArray.concat(data)
            }
            reducer(RSetState, { userArray: data })
        },
        async [NUser.hrSearch]({ payload, callback }, { reducer }) {
            const res: any = await requestPost(`resume/like?pageNum=${payload.pageNumHr}&pageSize=${payload.pageSizeHr}`, { city: payload.city, degree: payload.degree, name: payload.name })
            reducer(RSetState, { userArray: res.data })
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
