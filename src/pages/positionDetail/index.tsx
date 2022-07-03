import { Image, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import _ from "lodash";
import { useEffect, useState } from "react";
import { AtFloatLayout } from "taro-ui";
import icon from "../../assets/icon";
import tmp from "../../assets/tmp";
import CloumnLine from "../../component/cloumnLine";
import { degree, financing_status, RSetState } from "../../config/Constants";
import { NCollect } from "../../models/Collect";
import { NGlobal } from "../../models/Global";
import { NLogin } from "../../models/Login";
import { NOtherPlatform } from "../../models/OtherPlatform";
import { NResumeBrief } from "../../models/resumeBrief";
import { NStation } from "../../models/Station";
import { effect, reducer, useStore } from "../../utils/dva16";
import './index.less'

export default () => {
  // ----------------------常量-------------------------
  const [isOpen, setIsOpen] = useState(false)
  const [key, setKey] = useState({ key1: false, key2: true, key3: false })
  const { positionDetail } = useStore(NStation.Name)
  const { data, isCollect } = useStore(NCollect.Name)
  const { resumeInfo } = useStore(NResumeBrief.Name)
  const { userInfo } = useStore(NLogin.Name)

  // ----------------------生命周期----------------------
  useEffect(() => {
    const collect = _.find(data, (e) => {
      if (e.station.id == positionDetail.id) return e
    })
    effect(NLogin.Name, NLogin.info, {}) // 调试
    reducer(NCollect.Name, RSetState, { isCollect: collect })
    effect(NResumeBrief.Name, NResumeBrief.get, {})
  }, [])
  // ----------------------响应函数----------------------
  const castResume = () => {
    setIsOpen(false)
    Taro.showToast({
      title: '投递成功',
      icon: 'success',
      duration: 500
    })
  }
  // ----------------------渲染函数----------------------
  return (
    <View>
      <View className='index' >
        <View className="positionName">{positionDetail.name}</View>
        <View className="positionBriefBox">
          <View className="address">{positionDetail.city}</View>
          <CloumnLine />
          <View className="type">{positionDetail.isfresh}</View>
          <CloumnLine />
          <View className="education">{degree[positionDetail.degree]}</View>
        </View>
        <View className="salary">{positionDetail.salaryDown}-{positionDetail.salaryUp} {positionDetail.salaryType}</View>
        <View className="companyBox" onClick={() => {
          reducer(NStation.Name, RSetState, { companyDetail: positionDetail.company })
          reducer(NGlobal.Name, RSetState, { editCompantInfo: false })
          Taro.navigateTo({ url: '/pages/companyDetail/index' })
        }}>
          <View className="company">
            <Image className="logo" src={positionDetail.company.headerImg || tmp.defaultHeaderImg}></Image>
            <View className="messageBox">
              <View className="companyTitle">{positionDetail.company?.name}</View>
              <View className="detail">
                <View>{financing_status[positionDetail.company?.financing_status]}</View>
                <CloumnLine />
                <View>{positionDetail.company?.city}</View>
                <CloumnLine />
                <View>{positionDetail.company?.peopleMin}-{positionDetail.company?.peopleMax}人</View>
              </View>
            </View>
          </View>
          <Image src={icon.outline_gray} className='icon'></Image>
        </View>
        <View className="title">职位亮点</View>
        <Text>{positionDetail.welfareDescription}</Text>
        <View className="title">职位描述</View>
        <Text>{positionDetail.description}</Text>
        <View className="title">投递要求</View>
        <Text>{positionDetail.requirements}</Text>
        <View className="title">工作地点</View>
        <Text>{positionDetail.workingPlace}</Text>
        <View className="deadline">截止日期：<Text>{positionDetail.deadline_time}</Text></View>
      </View>
      <View className="footerBox">
        <View className="collectBox" onClick={() => {
          if (!isCollect) {
            effect(NCollect.Name, NCollect.save, { id: positionDetail.id }, (res) => {
              if (res.data) {
                reducer(NCollect.Name, RSetState, { isCollect: res.data })
                effect(NCollect.Name, NCollect.get, {})
                effect(NLogin.Name, NLogin.info, {})
                Taro.showToast({
                  title: '收藏成功',
                  icon: 'success',
                  duration: 500
                })
              }
            })
          } else {
            effect(NCollect.Name, NCollect.delete, { id: isCollect.id }, (res) => {
              if (res.data) {
                reducer(NCollect.Name, RSetState, { isCollect: false })
                effect(NCollect.Name, NCollect.get, {})
                effect(NLogin.Name, NLogin.info, {})
                Taro.showToast({
                  title: '取消收藏成功',
                  icon: 'success',
                  duration: 500
                })
              }
            })
          }
        }}>
          <Image className="collectImg" src={isCollect ? icon.collectDone : icon.collect}></Image>
          <View className="collect">{isCollect ? '取消收藏' : '收藏'}</View>
        </View>
        <View className="castResume" onClick={() => {
          if (!resumeInfo?.id || !resumeInfo.name) {
            Taro.showModal({
              title: '温馨提示',
              content: '在线简历尚未完善，请先完善',
              confirmText: '去完善',
              success: function (res) {
                if (res.confirm) {
                  Taro.navigateTo({ url: '/pages/addResume/index' })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else {
            setIsOpen(true)
          }
        }}>投个简历</View>
      </View>
      <AtFloatLayout isOpened={isOpen} onClose={() => { setIsOpen(false) }} >
        <Image className="closeIcon" src={icon.close} onClick={() => { setIsOpen(false) }}></Image>
        <View className="atFloatLayoutBox">
          <View className="title">选择简历</View>
          <View className="fileBox" onClick={() => { setKey({ ...key, key1: !key.key1 }) }}>
            <Image className="fileIcon" src={icon.file1}></Image>
            <View className="content">{userInfo?.enclosure?.fileName || '(附件)名称'}</View>
            {userInfo?.enclosure?.path ? <Image src={key.key1 ? icon.onChoice : icon.choice} className="choiceIcon"></Image> : <View className="goDone" onClick={() => {
              Taro.navigateTo({ url: '/pages/importResume/index' })
            }}>去上传</View>}
          </View>
          <View className="fileBox" onClick={() => { setKey({ ...key, key2: !key.key2 }) }}>
            <Image className="fileIcon" src={icon.file2} ></Image>
            <View className="content">在线简历</View>
            <Image src={key.key2 ? icon.onChoice : icon.choice} className="choiceIcon"></Image>
          </View>
          <View className="title">选择设计作品集</View>
          <View className="fileBox" onClick={() => { setKey({ ...key, key3: !key.key3 }) }}>
            <Image className="fileIcon" src={icon.file3}></Image>
            <View className="content">{resumeInfo?.workdisplay?.fileName || '(作品集)名称'}</View>
            {resumeInfo?.workdisplay?.path ? <Image src={key.key3 ? icon.onChoice : icon.choice} className="choiceIcon"></Image> : <View className="goDone" onClick={() => {
              reducer(NResumeBrief.Name, RSetState, { goUpdate: true })
              Taro.navigateTo({ url: '/pages/workDisplay/index' })
            }}>去上传</View>}
          </View>
          <View className="castResume" onClick={() => {
            Taro.requestSubscribeMessage({
              tmplIds: ['curQaUQKS3JAdsJ_7xO4pe8PrNpMvwScqLZTxqJnm7M'],
              success: function (res) {
                if (res.curQaUQKS3JAdsJ_7xO4pe8PrNpMvwScqLZTxqJnm7M == "accept") {
                  effect(NOtherPlatform.Name, NOtherPlatform.sendMessage, { companyName: positionDetail.company.name, stationName: positionDetail.name, stationid: positionDetail.id })
                }
                effect(NStation.Name, NStation.delivery, { id: positionDetail.id }, (res) => {
                  if (res.data) {
                    effect(NLogin.Name, NLogin.info, {})
                  }
                })
                castResume()
              }
            })
          }}>投个简历</View>
        </View>
      </AtFloatLayout>
    </View>
  )
}
