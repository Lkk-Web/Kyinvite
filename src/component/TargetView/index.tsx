import { Image, Input, View } from "@tarojs/components"
import Taro from "@tarojs/taro";
import _ from "lodash";
import { Fragment, useState } from "react";
import icon from "../../assets/icon";
import { RSetState } from "../../config/Constants";
import { NSearch } from "../../models/Search";
import { NUser } from "../../models/User";
import { effect, reducer, useStore } from "../../utils/dva16";
import { position } from "../../utils/position";
import { areaData } from "../../utils/area";

import '../index.less'
import SalarySelect from "../salarySelect";
import { NLogin } from "../../models/Login";
import { NStation } from "../../models/Station";

export default ({ value }) => {
    // ----------------------常量-------------------------
    let { searchKeyValue, positionSelect, addressSelect } = useStore(NUser.Name)
    const { searchHistory, isBind, isPost, isHome } = useStore(NSearch.Name)
    const [isAdd, setIsAdd] = useState(true)
    const { userInfo } = useStore(NLogin.Name)
    const searchKey = [
        { key: 'name', value: '职位', placeholder: '从职位中挑选更准确哦~' },
        { key: 'treatment', value: '待遇', placeholder: '从待遇中挑选更准确哦~' },
        { key: 'city', value: '地点', placeholder: '从地点中挑选更准确哦~' }]
    const [searchText, setSearchText] = useState(0)
    const [searchAreaText, setSearchAreaText] = useState(0)
    const [treatment, setTreatment] = useState(
        [
            {
                key: 'restWeekends',
                value: '周末双休',
            },
            {
                key: 'socialInsurance',
                value: '五险一金',
            },
            {
                key: 'housingAdd',
                value: '住房补贴',
            },
            {
                key: 'transportation',
                value: '交通补贴',
            },
            {
                key: 'haveWorkMeal',
                value: '有工作餐',
            },
        ]
    )
    const [treatmentSearch, setTreatmentSearch] = useState({
        salaryType: '千元/月',
        salaryDown: '',
        salaryUp: '',
    })
    const [commonSearch, setCommonSearch] = useState({
        name: '',
        treatment: '',
        city: ''
    })
    // ----------------------生命周期----------------------
    // ----------------------响应函数----------------------
    // ----------------------渲染函数----------------------
    return (
        <View className="TargetViewBox">
            {value == 0 && <View className="TargetViewSearch">
                <View className="checkBox">
                    <Image src={icon.check} className="icon"></Image>
                    <View className="title">多选</View>
                </View>
                <View className="batchSearch">
                    {searchKey.map((v, i) => {
                        return <View key={i} className='inputKey'>
                            <View className="searchKey">{v.value}</View>
                            <Input className="input" placeholder={v.placeholder} onInput={({ detail }) => {
                                setCommonSearch({ ...commonSearch, [v.key]: detail.value })
                            }}></Input>
                        </View>
                    })}
                </View>
                <View className="searchButton" onClick={() => {
                    let tmp = [] as any
                    commonSearch.treatment && tmp.push(commonSearch.treatment)
                    effect(NSearch.Name, NSearch.search, { name: commonSearch.name, city: commonSearch.city, treatment: tmp })
                    Taro.navigateTo({ url: '/pages/searchResult/index' })
                }}>搜索</View>
                <View className="checkBox iconBox">
                    <View className="titleBox">
                        <Image src={icon.searchIcon} className="searchIcon"></Image>
                        <View className="title">搜索历史</View>
                    </View>
                    <Image src={icon.deleteIcon} className="deleteIcon" onClick={() => {
                        Taro.showModal({
                            title: '温馨提示',
                            content: '您是否确定删除所有的搜索历史',
                            success: function (res) {
                                if (res.confirm) {
                                    Taro.removeStorage({
                                        key: 'search_history',
                                        success: function () {
                                            reducer(NSearch.Name, RSetState, { searchHistory: [] })
                                            Taro.showToast({
                                                title: '清除成功',
                                                icon: 'success',
                                                duration: 2000
                                            })
                                        }
                                    })
                                }
                            }
                        })
                    }}></Image>
                </View>
                <View className="searchKeyBox">
                    {searchHistory && searchHistory.map((v) => {
                        return <View className="searchKey">{v}</View>
                    })}
                </View>
            </View>}
            {
                value == 1 && <View className="TargetViewJob">
                    <View className={`${(isBind || isPost || isHome) ? "choice bind" : "choice"}`}>
                        {position.data.map((v, i) => {
                            return <View className={`${i == searchText ? "onChoiceType" : "choiceType"}`} key={i} onClick={() => {
                                setSearchText(i)
                            }} >{v.name}</View>
                        })}
                    </View>
                    <View className={`${(isBind || isPost || isHome) ? "choiceResultBox bind" : "choiceResultBox"}`}>
                        {position.data[searchText].subLevelModelList.map((v) => {
                            return <Fragment key={v.code}>
                                <View className="choiceResult">
                                    <View className="line"></View>
                                    <View className="text">{v.name}</View>
                                    <View className="line"></View>
                                </View>
                                <View className="choiceResultJob">
                                    {v.subLevelModelList.map((value) => {
                                        let selectKey = _.find(positionSelect, { 'key': value.code })
                                        return <View className={`${selectKey ? "choiceResultJobType select" : 'choiceResultJobType'}`} key={value.code} onClick={() => {
                                            if (isBind) {
                                                let node = positionSelect
                                                if (selectKey) {
                                                    const positionKey = positionSelect.indexOf(selectKey)
                                                    node.splice(positionKey, 1)
                                                } else {
                                                    if (node.length >= 3) {
                                                        Taro.showToast({
                                                            title: '您至多绑定3个',
                                                            icon: 'error',
                                                            duration: 1000
                                                        })
                                                    } else {
                                                        node = node.concat({ key: value.code, value: value.name })
                                                    }
                                                }
                                                reducer(NUser.Name, RSetState, { positionSelect: node })
                                            } else if (isPost) {
                                                reducer(NStation.Name, RSetState, { postStation: value.name })
                                                Taro.navigateBack()
                                            } else if (isHome) {
                                                reducer(NSearch.Name, RSetState, { searchHomeStation: value.name })
                                                Taro.navigateBack()
                                            } else {
                                                effect(NSearch.Name, NSearch.search, { name: value.name })
                                                Taro.navigateTo({ url: '/pages/searchResult/index' })
                                            }
                                        }}>
                                            {value.name}
                                        </View>
                                    })}
                                </View>
                            </Fragment>
                        })}
                    </View>
                </View>
            }
            {
                value == 2 && <View className="treatmentView">
                    <View className="titleBox">
                        <View className="salaryTitle">薪资（{treatmentSearch.salaryType}）</View>
                        <View className="switch" onClick={() => {
                            setTreatmentSearch({ ...treatmentSearch, salaryType: treatmentSearch.salaryType == '千元/月' ? '元/天' : '千元/月' })
                        }}>点击切换</View>
                    </View>
                    <SalarySelect
                        salaryType={treatmentSearch.salaryType}
                        type={'search'}
                        setTreatmentSearch={setTreatmentSearch}
                        treatmentSearch={treatmentSearch}
                    />
                    <View className="treatmentTitle">待遇</View>
                    <View className="treatmentBox">
                        {/* //TODO太慢了，待优化 */}
                        {treatment.map((v, i) => {
                            return <View className={searchKeyValue.indexOf(v.key) >= 0 ? 'beTreatmentSelect' : 'treatmentSelect'} key={i} onClick={() => {
                                const select = searchKeyValue.indexOf(v.key)
                                if (select >= 0) {
                                    searchKeyValue.splice(select, 1)
                                } else {
                                    searchKeyValue = searchKeyValue.concat(v.key)
                                }
                                reducer(NUser.Name, RSetState, { searchKeyValue })
                            }}>{v.value}</View>
                        })}
                        {isAdd ? <View className="treatmentAdd" onClick={() => {
                            setIsAdd(false)
                        }}>添加其他<Image src={icon.add} className='icon'></Image></View> : <Input className="treatmentAdd input" maxlength={5} focus onBlur={(e) => {
                            if (e.detail.value) {
                                reducer(NUser.Name, RSetState, { searchKeyValue: searchKeyValue.concat(`userAdd${treatment.length}`) })
                                let tmps = treatment.concat([{ key: `userAdd${treatment.length}`, value: e.detail.value }])
                                setTreatment(tmps)
                            } else {
                                Taro.showToast({
                                    title: '添加值不能为空~',
                                    icon: 'error',
                                    duration: 500
                                })
                            }
                            setIsAdd(true)
                        }}></Input>
                        }
                    </View>
                    <View className="search" onClick={() => {
                        if (treatmentSearch.salaryDown > treatmentSearch.salaryUp) {
                            Taro.showToast({
                                title: '薪资范围不合规',
                                icon: 'error',
                                duration: 1000
                            })
                        } else {
                            let tmp: any = []
                            _.find(treatment, (e) => {
                                if (searchKeyValue.includes(e.key)) tmp.push(e.value)
                            })
                            effect(NSearch.Name, NSearch.search, { ...treatmentSearch, treatment: tmp })
                            Taro.navigateTo({ url: '/pages/searchResult/index' })
                        }
                    }}>搜索</View>
                </View>
            }
            {
                value == 3 && <View className="TargetViewJob">
                    <View className={`${(isBind || isPost || isHome) ? "choice bind" : "choice"}`}>
                        {areaData.area.map((v, i) => {
                            return <View className={`${i == searchAreaText ? "onChoiceType" : "choiceType"}`} key={v.code} onClick={() => {
                                setSearchAreaText(i)
                            }} >{v.name}</View>
                        })}
                    </View>
                    <View className={`${(isBind || isPost || isHome) ? "choiceResultBox bind" : "choiceResultBox"}`}>
                        {!isBind &&
                            <> <View className="currentAddress">当前定位</View>
                                <View className="choiceResultAddress" onClick={() => {
                                    if (userInfo.address?.value) {
                                        if (isPost) {
                                            reducer(NStation.Name, RSetState, { postAddress: userInfo.address?.value })
                                            Taro.navigateBack()
                                        } else {
                                            effect(NSearch.Name, NSearch.search, { city: userInfo.address?.value })
                                            Taro.navigateTo({ url: '/pages/searchResult/index' })
                                        }
                                    } else {
                                        if (isPost) {

                                        } else {
                                            Taro.navigateTo({ url: '/pages/addResume/index' })
                                        }
                                    }
                                }}>
                                    <View className="choiceResultJobType" >
                                        <Image src={icon.address} className='addressIcon'></Image>{userInfo.address?.value || '待绑定'}
                                    </View>
                                </View></>
                        }
                        <View className="hotAddress">城市</View>
                        <View className="choiceResultAddress" >
                            {areaData.area[searchAreaText].subList.map((value) => {
                                let selectKey = _.find(addressSelect, { 'key': value.code })
                                return <View className={`${selectKey ? "choiceResultJobType select" : 'choiceResultJobType'}`} key={value.code} onClick={() => {
                                    if (isBind) {
                                        let node = addressSelect
                                        if (selectKey) {
                                            const positionKey = addressSelect.indexOf(selectKey)
                                            node.splice(positionKey, 1)
                                        } else {
                                            if (node.length >= 3) {
                                                Taro.showToast({
                                                    title: '您至多绑定3个',
                                                    icon: 'error',
                                                    duration: 1000
                                                })
                                            } else {
                                                node = node.concat({ key: value.code, value: value.name })
                                            }
                                        }
                                        reducer(NUser.Name, RSetState, { addressSelect: node })
                                    } else if (isPost) {
                                        reducer(NStation.Name, RSetState, { postAddress: value.name })
                                        Taro.navigateBack()
                                    } else if (isHome) {
                                        reducer(NSearch.Name, RSetState, { searchHomeAddress: value.name })
                                        Taro.navigateBack()
                                    } else {
                                        effect(NSearch.Name, NSearch.search, { city: value.name })
                                        Taro.navigateTo({ url: '/pages/searchResult/index' })
                                    }
                                }}>
                                    {value.name}
                                </View>
                            })}
                        </View>
                    </View>
                </View>
            }
            {
                (value == 1 || value == 3) && isBind && < View className="fixBotton" onClick={() => {
                    Taro.navigateBack()
                }}>确认</View>
            }
        </View >
    )
}