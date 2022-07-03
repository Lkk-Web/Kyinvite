import { Image, View } from "@tarojs/components"
import Taro from "@tarojs/taro";
import { Fragment } from "react";
import tmp from "../../assets/tmp";
import { degree, financing_status, RSetState } from "../../config/Constants";
import { NHistory } from "../../models/History";
import { NLogin } from "../../models/Login";
import { NStation } from "../../models/Station";
import { effect, reducer } from "../../utils/dva16";
import CloumnLine from "../cloumnLine";
import '../index.less'

export default (props) => {
    const { positionArray } = props
    // ----------------------常量-------------------------
    // ----------------------生命周期----------------------
    // ----------------------响应函数----------------------
    const postResume = (v: any) => {
        reducer(NStation.Name, RSetState, { positionDetail: v })
        effect(NHistory.Name, NHistory.save, { stationid: v?.id }, (res) => {
            if (res.data) {
                effect(NLogin.Name, NLogin.info, {})
            }
        })
        Taro.navigateTo({ url: '/pages/positionDetail/index' })
    }
    // ----------------------渲染函数----------------------
    return (
        <View className="positionView">
            {positionArray.map((v) => {
                return <Fragment>
                    <View className="briefBox">
                        <View onClick={() => {
                            postResume(v)
                        }}>
                            <View className="jobTitle">
                                <View className="jobName">{v?.name}</View>
                                <View className="jobSalary">{v.salaryDown}-{v.salaryUp} {v.salaryType}</View>
                            </View>
                            <View className="jobMessage">
                                <View className="jobAskBox">
                                    <View className="jobAddress">{v.city}</View>
                                    {v.isfresh && <><CloumnLine />
                                        <View className="jobGraduate">{v.isfresh}</View></>
                                    }
                                    <CloumnLine />
                                    <View className="education">{degree[v.degree]}</View>
                                </View>
                                {v.deadline_time && <View>{v.deadline_time}</View>}
                            </View>
                            <View className="treatmentBox">
                                {v.treatment && v.treatment.map((value) => {
                                    return <View className="treatment">{value.value}</View>
                                })}
                            </View>
                        </View>
                        <View className="jobDetailBox">
                            <Image className="companyLogo" src={v.company.headerImg || tmp.defaultHeaderImg}></Image>
                            <View className="companyMsgBox">
                                <View className="companyName">{v.company.name}</View>
                                <View className="companyMsg">
                                    <View>{financing_status[v.company.financing_status]}</View>
                                    <CloumnLine />
                                    <View>{v.company.city}</View>
                                    <CloumnLine />
                                    <View>{v.company.peopleMin}-{v.company.peopleMax}人</View>
                                </View>
                            </View>
                            <View className="chatBtn" onClick={() => {
                                Taro.showModal({
                                    title: '温馨提示',
                                    content: '聊天功能开发中，敬请期待~',
                                    success: function (res) {
                                        if (res.confirm) {
                                            console.log('用户点击确定')
                                        } else if (res.cancel) {
                                            console.log('用户点击取消')
                                        }
                                    }
                                })
                            }}>我要直聊</View>
                            <View className="deliverBtn" onClick={() => {
                                postResume(v)
                            }}>我要投递</View>
                        </View>
                    </View>
                    <View className="line"></View>
                </Fragment>
            })}
        </View >
    )
}