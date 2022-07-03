import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import _ from "lodash";
import { useEffect } from "react";
import { AtTabs, AtTabsPane } from "taro-ui";
import icon from "../../assets/icon";
import tmp from "../../assets/tmp";
import { degree, offerStatus, RSetState } from "../../config/Constants";
import { NCollect } from "../../models/Collect";
import { NDelivery } from "../../models/Delivery";
import { NGlobal } from "../../models/Global";
import { NHistory } from "../../models/History";
import { NLogin } from "../../models/Login";
import { NOtherPlatform } from "../../models/OtherPlatform";
import { NUser } from "../../models/User";
import { effect, reducer, useStore } from "../../utils/dva16";
import './index.less'


export default () => {
  // ----------------------常量-------------------------
  const { currentOfferStatus } = useStore(NGlobal.Name)
  const { hrdata } = useStore(NDelivery.Name)
  const { makeData } = useStore(NCollect.Name)
  const { hrInfo } = useStore(NLogin.Name)
  // ----------------------生命周期----------------------
  useEffect(() => {
    effect(NDelivery.Name, NDelivery.hrget, { isView: offerStatus[currentOfferStatus] })
    effect(NCollect.Name, NCollect.companyGet, {})
    effect(NLogin.Name, NLogin.hrInfo, {})
  }, [])
  // ----------------------响应函数----------------------
  // ----------------------渲染函数----------------------
  return (
    <View className='index' >
      <AtTabs current={currentOfferStatus} animated tabList={offerStatus.map((title) => ({ title }))} onClick={(e) => {
        reducer(NGlobal.Name, RSetState, { currentOfferStatus: e })
        effect(NDelivery.Name, NDelivery.hrget, { isView: offerStatus[e] })
      }}>
        {hrdata && hrdata.map((v, i) => {
          v = v.resume
          return <View>{offerStatus.map((value, index) => (
            <AtTabsPane current={currentOfferStatus} key={value} index={index}>
              <View className="peopleBox">
                <View className="peopleInfo" onClick={() => {
                  reducer(NUser.Name, RSetState, { userDetail: v })
                  if (currentOfferStatus == 0) {
                    effect(NOtherPlatform.Name, NOtherPlatform.hrSendMessage, {
                      isView: offerStatus[1],
                      stationName: hrdata[i].station.name,
                      stationid: hrdata[i].station.id,
                      companyName: hrInfo.name,
                      userid: v.user.id
                    })
                    effect(NDelivery.Name, NDelivery.hrget, { isView: offerStatus[currentOfferStatus] })
                  }
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
                  <View className="checkResume">查看投递职位</View>
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
                    {currentOfferStatus != 3 &&
                      <View className="btn" onClick={() => {
                        effect(NOtherPlatform.Name, NOtherPlatform.hrSendMessage, {
                          isView: offerStatus[3],
                          stationName: hrdata[i].station.name,
                          stationid: hrdata[i].station.id,
                          companyName: hrInfo.name,
                          userid: v.user.id
                        })
                        effect(NDelivery.Name, NDelivery.hrget, { isView: offerStatus[currentOfferStatus] })
                      }}>不合适</View>
                    }
                    {(currentOfferStatus == 0 || currentOfferStatus == 1) &&
                      <View className="btn" onClick={() => {
                        effect(NOtherPlatform.Name, NOtherPlatform.hrSendMessage, {
                          isView: offerStatus[2],
                          stationName: hrdata[i].station.name,
                          stationid: hrdata[i].station.id,
                          companyName: hrInfo.name,
                          userid: v.user.id
                        })
                        effect(NDelivery.Name, NDelivery.hrget, { isView: offerStatus[currentOfferStatus] })
                      }}>约面试</View>
                    }
                  </View>
                </View>
              </View>
              <View className="line"></View>
            </AtTabsPane>
          ))}
          </View>
        })}
      </AtTabs>
    </View>
  )
}
