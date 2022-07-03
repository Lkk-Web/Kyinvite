import { Image, Swiper, SwiperItem, Text, View } from "@tarojs/components"
import Taro from "@tarojs/taro";
import _ from "lodash";
import { useEffect, useState } from "react";
import { AtTextarea } from "taro-ui";
import tmp from "../../assets/tmp";
import Config from "../../config/Config";
import { degree, EUserRole, RSetState } from "../../config/Constants";
import { NCompany } from "../../models/Company";
import { NGlobal } from "../../models/Global";
import { NLogin } from "../../models/Login";
import { NStation } from "../../models/Station";
import { effect, reducer, useStore } from "../../utils/dva16";
import CloumnLine from "../cloumnLine";
import '../index.less'

export default (props) => {
    // ----------------------常量-------------------------
    const { value, editInfo, setEditInfo, editCompantInfo, station } = props
    const { companyDetail, companyPostion } = useStore(NStation.Name)
    const { hrInfo } = useStore(NLogin.Name)
    const { userRole } = useStore(NGlobal.Name)
    const [count, setCount] = useState(0)
    // ----------------------生命周期----------------------
    useEffect(() => {
        if (userRole == EUserRole.user) {
            effect(NStation.Name, NStation.companyPosition, { id: companyDetail.id })
        } else {
            // effect(NCompany.get, NCompany.Name, {})
        }
    }, [])
    // ----------------------响应函数----------------------
    const checkInfo = () => {
        if (!editInfo.name) return '企业名称不合规'
        if (editInfo.financing_status == -1) return '企业融资不合规'
        if (!editInfo.city) return '企业地点不合规'
        if (!editInfo.peopleMin || !editInfo.peopleMax) return '企业人数不合规'
        if (!editInfo.headerImg) return '企业头像不合规'
        if (!editInfo.introduce) return '公司介绍不合规'
        if (!editInfo.environment.value[0]) return '环境图像不合规'
        if (!editInfo.address) return '公司地址不合规'
    }
    // ----------------------渲染函数----------------------
    return (
        <View className="companyViewBox">
            {value == 0 && <View className="companyHome">
                <View className="choiceResult">
                    <View className="line"></View>
                    <View>公司介绍</View>
                    <View className="line"></View>
                </View>
                {!editCompantInfo ? <Text className="text">{companyDetail?.introduce}</Text> :
                    <AtTextarea
                        placeholder={'编辑您的公司介绍信息'}
                        value={editInfo?.introduce || ''}
                        className="experienceText"
                        height={300}
                        maxLength={1024}
                        count={true}
                        showConfirmBar
                        textOverflowForbidden={false}
                        onChange={(detail) => {
                            setEditInfo({ ...editInfo, introduce: detail })
                        }} />
                }
                <View className="choiceResult">
                    <View className="line"></View>
                    <View>公司环境</View>
                    <View className="line"></View>
                </View>
                {!editCompantInfo ? <Swiper
                    className='bannerEnvironment'
                    indicatorColor='#999'
                    indicatorActiveColor='#333'
                    circular
                    indicatorDots
                    autoplay
                >
                    {
                        companyDetail?.environment?.value.map((v) => {
                            if (v) {
                                if (v.lastIndexOf('?')) v = v.substr(0, v.lastIndexOf("?"));
                                return <SwiperItem>
                                    <Image src={v} className='demo1'></Image>
                                </SwiperItem>
                            }
                        })
                    }
                </Swiper> : <Swiper
                    className='bannerEnvironment'
                    indicatorColor='#999'
                    indicatorActiveColor='#333'
                    circular
                    indicatorDots
                    current={count}
                >
                    {editInfo?.environment?.value.map((v, i) => {
                        if (v.lastIndexOf('?')) v = v.substr(0, v.lastIndexOf("?"));
                        return <SwiperItem>
                            <Image className='demo1' src={v || tmp.template} onClick={() => {
                                Taro.chooseMessageFile({
                                    count: 1, type: 'image', success: (e) => {
                                        Taro.uploadFile({
                                            url: Config.UPLOAD_HOME + `?url=${'companyEnvironment'}&account=${hrInfo.account}`,
                                            filePath: e.tempFiles[0].path,
                                            header: {
                                                'Content-Type': 'multipart/form-data',
                                                'authorization': Taro.getStorageSync("token"),  //如果需要token的话要传
                                            },
                                            name: "file",
                                            success: (res) => {
                                                if (res.data) {
                                                    let tmp = editInfo
                                                    tmp.environment.value[i] = JSON.parse(res.data).data;
                                                    setEditInfo({ ...tmp })
                                                    setCount(count + 1)
                                                }
                                            },
                                        });
                                    }
                                })
                            }}></Image>
                        </SwiperItem>
                    })}
                </Swiper>}
                <View className="choiceResult">
                    <View className="line"></View>
                    <View>公司地址</View>
                    <View className="line"></View>
                </View>
                {!editCompantInfo ? <Text className="text">{companyDetail.address}</Text> :
                    <AtTextarea
                        placeholder={'编辑您的公司信息地址，精确到xx路xx号xxx'}
                        value={editInfo?.address || ''}
                        className="experienceText"
                        height={80}
                        maxLength={100}
                        count={true}
                        showConfirmBar
                        textOverflowForbidden={false}
                        onChange={(detail) => {
                            setEditInfo({ ...editInfo, address: detail })
                        }} />
                }
                {editCompantInfo && <View className="save" onClick={() => {
                    if (checkInfo()) {
                        Taro.showToast({
                            title: checkInfo() as string,
                            icon: 'error',
                            duration: 1000
                        })
                    } else {
                        Taro.uploadFile({
                            url: Config.UPLOAD_HOME + `?url=${'headerimg'}&account=${hrInfo.account}`,
                            filePath: editInfo.headerImg,
                            header: {
                                'Content-Type': 'multipart/form-data',
                                'authorization': Taro.getStorageSync("token"),  //如果需要token的话要传
                            },
                            name: "file",
                            success: (res) => {
                                if (res.data) {
                                    let data = JSON.parse(res.data).data
                                    if (data.lastIndexOf('?')) data = data.substr(0, data.lastIndexOf("?"));
                                    setEditInfo({ ...editInfo, headerImg: data })
                                    effect(NCompany.Name, NCompany.update, { ...editInfo, headerImg: data }, (res) => {
                                        if (res.data) {
                                            Taro.navigateBack()
                                            Taro.showToast({
                                                title: '信息更新成功',
                                                icon: 'success',
                                                duration: 1000
                                            })
                                        }
                                    })
                                }
                            },
                        });
                    }
                }}>保存</View>}
            </View>}
            {
                value == 1 && companyPostion && (userRole == EUserRole.user ? companyPostion : station).map((v, i) => {
                    return <View className={i == 0 ? `positionInvite postionBox` : 'positionInvite'}>
                        <View className="jobTitle">
                            <View className="jobName">{v.name}</View>
                            <View className="jobSalary">{v.salaryDown}-{v.salaryUp} {v.salaryType}</View>
                        </View>
                        <View className="jobMessage">
                            <View className="jobAskBox">
                                <View className="jobAddress">{v.city}</View>
                                <CloumnLine />
                                <View className="jobGraduate">{v.isfresh}</View>
                                <CloumnLine />
                                <View className="education">{degree[v.degree]}</View>
                            </View>
                            <View>{v.deadline_time}</View>
                        </View>
                        {userRole == EUserRole.invite && <View className="detail" onClick={() => {
                            reducer(NCompany.Name, RSetState, { stationInfo: v })
                            Taro.navigateTo({ url: '/pages/postJob/index' })
                        }}>详情</View>}
                        <View className="line"></View>
                    </View>
                })
            }
        </View >
    )
}