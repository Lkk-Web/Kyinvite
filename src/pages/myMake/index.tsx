import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import _ from "lodash";
import { Fragment, useEffect } from "react";
import icon from "../../assets/icon";
import tmp from "../../assets/tmp";
import { degree, RSetState } from "../../config/Constants";
import { NCollect } from "../../models/Collect";
import { NHistory } from "../../models/History";
import { NLogin } from "../../models/Login";
import { NUser } from "../../models/User";
import { effect, reducer, useStore } from "../../utils/dva16";
import './index.less'


export default () => {
  // ----------------------常量-------------------------
  const { makeData } = useStore(NCollect.Name)
  console.log('makeData: ', makeData);
  // ----------------------生命周期----------------------
  useEffect(() => {
    effect(NCollect.Name, NCollect.companyGet, {})
  }, [])
  // ----------------------响应函数----------------------
  // ----------------------渲染函数----------------------
  return (
    <View className='index' >
      {makeData && makeData.map((v, i) => {
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
              <View className="checkResume">
                <View>标记时间：</View>
                <View>{v.updatedat}</View>
              </View>
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
                <View className="btn">去直聊</View>
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
    </View>
  )
}
