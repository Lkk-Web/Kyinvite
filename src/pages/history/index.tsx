import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import _ from "lodash";
import { Fragment, useEffect } from "react";
import icon from "../../assets/icon";
import tmp from "../../assets/tmp";
import CloumnLine from "../../component/cloumnLine";
import { degree, EUserRole, RSetState } from "../../config/Constants";
import { NCollect } from "../../models/Collect";
import { NGlobal } from "../../models/Global";
import { NHistory } from "../../models/History";
import { NLogin } from "../../models/Login";
import { NStation } from "../../models/Station";
import { NUser } from "../../models/User";
import { effect, reducer, useStore } from "../../utils/dva16";
import './index.less'


export default () => {
  // ----------------------常量-------------------------
  const { data, hrdata } = useStore(NHistory.Name)
  const { userRole } = useStore(NGlobal.Name)
  const { makeData } = useStore(NCollect.Name)
  console.log('data: ', data);
  console.log('hrdata: ', hrdata);
  // ----------------------生命周期----------------------
  useEffect(() => {
    if (userRole == EUserRole.user) {
      effect(NHistory.Name, NHistory.get, {})
    } else {
      effect(NHistory.Name, NHistory.hrGet, {})
      effect(NCollect.Name, NCollect.companyGet, {})
    }
  }, [])
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
    <View className='index' >
      {
        userRole == EUserRole.user ? <Fragment>
          {data && data.map((v) => {
            let value = v.station
            return <View className="castedList">
              {<View className="castedBox" onClick={() => { postResume(value) }}>
                <View className="positionBox">
                  <Image src={v.station.company.headerImg || tmp.defaultHeaderImg} className='header'></Image>
                  <View className="positionMsg">
                    <View className="name">{v.station.name}</View>
                    <View className="company">
                      <View>{v.station.company.name}</View>
                      <CloumnLine />
                      <View>{v.station.company.city}</View>
                    </View>
                    <View className="salary">{v.station.salaryDown}-{v.station.salaryUp} {v.station.salaryType}</View>
                  </View>
                </View>
                <View className="otherBox">
                  <View className="time">{v.updatedat}</View>
                  <View className="chatBotton" onClick={() => {
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
                  }}>
                    <Image src={icon.chat} className='icon'></Image>
                    沟通</View>
                </View>
              </View>
              }
            </View>
          })}
        </Fragment> :
          <Fragment>
            {hrdata && hrdata.map((v, i) => {
              v = v.resume
              return <Fragment key={i}>
                <View className="peopleBox">
                  <View className="peopleInfo" onClick={() => {
                    reducer(NUser.Name, RSetState, { userDetail: v })
                    effect(NHistory.Name, NHistory.hrSave, { resumeid: v.id }, (res) => {
                      if (res.data) {
                        effect(NLogin.Name, NLogin.hrInfo, {})
                      }
                    })
                    Taro.navigateTo({ url: '/pages/checkResume/index' })
                  }}>
                    <View className="box">
                      <Image src={v?.headerimg || tmp.defaultHeaderImg} className="headerImg"></Image>
                      <View className="info">
                        <View className="position">{v.user?.station?.station?.[0].value || '暂无意向'}</View>
                        <View className="people">
                          <View className="margin">{v.name}</View>
                          <View className="margin">{v.sex == 0 ? '男' : '女'}</View>
                          <View className="margin">{v.city}</View>
                        </View>
                        <View className="degree">
                          {v.degree >= 3 && <><View>{v.university}</View>
                            <View className="margin">·</View></>}
                          <View>{v.profession}</View>
                          <View className="margin">·</View>
                          <View>{degree[v.degree]}</View>
                        </View>
                      </View>
                    </View>
                    <View className="checkResume">{v.updatedat}</View>
                  </View>
                  <View className="button">
                    <View className="make" onClick={() => {
                      let tmp = _.find(makeData, (e) => { if (e.resume?.id == v.id) return e })
                      if (!(tmp)) {
                        effect(NCollect.Name, NCollect.companySave, { id: v.id }, (res) => {
                          if (res.data) {
                            effect(NCollect.Name, NCollect.companyGet, {})
                            effect(NLogin.Name, NLogin.hrInfo, {})
                            Taro.showToast({
                              title: '标记成功',
                              icon: 'success',
                              duration: 1000
                            })
                          }
                        })
                      } else {
                        effect(NCollect.Name, NCollect.companyDelete, { id: tmp.id }, (res) => {
                          if (res.data) {
                            effect(NCollect.Name, NCollect.companyGet, {})
                            effect(NLogin.Name, NLogin.hrInfo, {})
                            Taro.showToast({
                              title: '取消标记成功',
                              icon: 'success',
                              duration: 1000
                            })
                          }
                        })
                      }
                    }}>
                      <Image src={_.find(makeData, (e) => { if (e.resume?.id == v.id) return e }) ? icon.collectDone : icon.collect} className='collect'></Image>
                      <View>标记</View>
                    </View>
                    <View className="goto">
                      <View className="btn" onClick={() => {
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
                      }}>去直聊</View>
                      <View className="btn" onClick={() => {
                        Taro.showModal({
                          title: '通知成功',
                          content: '您的面试邀约已通知用户~',
                          success: function (res) {
                            if (res.confirm) {
                            } else if (res.cancel) {
                              console.log('用户点击取消')
                            }
                          }
                        })
                      }}>约面试</View>
                    </View>
                  </View>
                </View>
                <View className="line"></View>
              </Fragment>
            })}
          </Fragment>
      }
    </View>
  )
}
