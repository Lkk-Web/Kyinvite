import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import _ from "lodash";
import icon from "../../assets/icon";
import tmp from "../../assets/tmp";
import { degree } from "../../config/Constants";
import { NCollect } from "../../models/Collect";
import { NLogin } from "../../models/Login";
import { NUser } from "../../models/User";
import { effect, useStore } from "../../utils/dva16";
import './index.less'

export default () => {
  // ----------------------常量-------------------------
  const { userDetail } = useStore(NUser.Name)
  console.log('userDetail: ', userDetail);
  const { makeData } = useStore(NCollect.Name)
  // ----------------------生命周期----------------------
  // ----------------------响应函数----------------------
  const openFile = (path) => {
    Taro.downloadFile({
      url: path,
      success: function (res) {
        let filePath = res.tempFilePath
        Taro.openDocument({
          filePath: filePath,
          fileType: 'pdf',
          success() {
            console.log("打开成功")
          },
        })
      }
    })
  }
  // ----------------------渲染函数----------------------
  return (
    <View className='index' >
      <View className="peopleBox">
        <View className="peopleInfo">
          <View className="box">
            <Image src={userDetail?.headerimg || tmp.defaultHeaderImg} className="headerImg"></Image>
            <View className="info">
              <View className="position">{userDetail.user.station?.station[0].value || '暂无意向'}</View>
              <View className="people">
                <View className="margin">{userDetail.name}</View>
                <View className="margin">{userDetail.sex == 0 ? '男' : '女'}</View>
                <View className="margin">{userDetail.city}</View>
              </View>
              <View className="degree">
                {4 >= 3 && <><View>{userDetail.university}</View>
                  <View className="margin">·</View></>}
                <View>{userDetail.profession}</View>
                <View className="margin">·</View>
                <View>{degree[userDetail.degree]}</View>
              </View>
            </View>
          </View>
        </View>
        <View className="button">
          <View className="make" onClick={() => {
            let tmp = _.find(makeData, (e) => { if (e.resume?.id == userDetail.id) return e })
            if (!(tmp)) {
              effect(NCollect.Name, NCollect.companySave, { id: userDetail.id }, (res) => {
                if (res.data) {
                  Taro.showToast({
                    title: '标记成功',
                    icon: 'success',
                    duration: 1000
                  })
                  effect(NCollect.Name, NCollect.companyGet, {})
                  effect(NLogin.Name, NLogin.hrInfo, {})
                }
              })
            } else {
              effect(NCollect.Name, NCollect.companyDelete, { id: tmp.id }, (res) => {
                if (res.data) {
                  Taro.showToast({
                    title: '取消标记成功',
                    icon: 'success',
                    duration: 1000
                  })
                  effect(NCollect.Name, NCollect.companyGet, {})
                  effect(NLogin.Name, NLogin.hrInfo, {})
                }
              })
            }
          }}>
            <Image src={_.find(makeData, (e) => { if (e.resume?.id == userDetail.id) return e }) ? icon.collectDone : icon.collect} className='collect'></Image>
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
      <View className="atFloatLayoutBox">
        <View className="title">ta的简历</View>
        <View className="fileBox" onClick={() => {
          Taro.navigateTo({ url: '/pages/onlineResume/index' })
        }}>
          <Image className="fileIcon" src={icon.file2} ></Image>
          <View className="content">在线简历</View>
          <View className="choiceIcon">浏览</View>
        </View>
        {
          userDetail.user.enclosure?.path && <View className="fileBox" onClick={() => {
            openFile(userDetail.user.enclosure?.path)
          }}>
            <Image className="fileIcon" src={icon.file1}></Image>
            <View className="content">附件简历：{userDetail.user.enclosure?.fileName}</View>
            <View className="choiceIcon">浏览</View>
          </View>
        }
        <View className="castResume" onClick={() => {
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
          //自动发信息给用户
          // Taro.requestSubscribeMessage({
          //   tmplIds: ['curQaUQKS3JAdsJ_7xO4pe8PrNpMvwScqLZTxqJnm7M'],
          //   success: function (res) {
          //     if (res.errMsg == 'accept') {
          //       effect(NOtherPlatform.Name, NOtherPlatform.sendMessage, { companyName: positionDetail.company.name, stationName: positionDetail.name, stationid: positionDetail.id })
          //     }
          //     effect(NStation.Name, NStation.delivery, { id: positionDetail.id }, (res) => {
          //       if (res.data) {
          //         effect(NLogin.Name, NLogin.info, {})
          //       }
          //     })
          //     castResume()
          //   }
          // })
        }}>约个面试</View>
      </View>
    </View>
  )
}
