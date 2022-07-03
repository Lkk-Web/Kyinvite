import { Image, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Fragment } from "react";
import icon from "../../assets/icon";
import tmp from "../../assets/tmp";
import { degree } from "../../config/Constants";
import { NUser } from "../../models/User";
import { useStore } from "../../utils/dva16";
import './index.less'

export default () => {
  // ----------------------常量-------------------------
  const { userDetail } = useStore(NUser.Name)
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

  const getAge = (birthday) => {
    let tmp = birthday?.split('-')
    let nowYear = new Date().getFullYear();
    return nowYear - tmp?.[0]
  }

  // ----------------------渲染函数----------------------
  return (
    <View className='index' >
      <View className="info">
        <Image src={userDetail.headerimg || tmp.defaultHeaderImg} className="headerImg"></Image>
        <View className="infoBox">
          <View className="name">{userDetail.name}</View>
          <View className="detail">
            <View className="margin">{userDetail.sex == 0 ? '男' : '女'}</View>
            <View className="margin">{userDetail.city}</View>
            <View>{getAge(userDetail.birthday) || '-'}岁</View>
          </View>
        </View>
      </View>
      <View className="title">教育经历</View>
      <View className="content">学历：{degree[userDetail.degree]}</View>
      <View className="content">学校：{userDetail.university}</View>
      <View className="content">专业：{userDetail.profession}</View>
      <View className="content">在校时间：{userDetail.enrollmentTime} - {userDetail.graduationTime}</View>
      <View className="title">主要经历</View>
      <View className="content">{userDetail.experience}</View>
      <View className="title">个人优势</View>
      <View className="content">{userDetail.advantage}</View>
      <View className="title">联系方式</View>
      <View className="content">
        <Text>联系电话：</Text>{userDetail.phone}
      </View>
      <View className="content">
        <Text>邮箱：</Text>{userDetail.email}
      </View>
      {userDetail?.workdisplay?.path && <Fragment>
        <View className="title">作品集</View>
        <View className="content">作品介绍：</View>
        <View className="content">{userDetail?.workdisplay?.introduce}</View>
        <View className="fileBox" onClick={() => {
          openFile(userDetail?.workdisplay?.path)
        }}>
          <Image className="fileIcon" src={icon.file3}></Image>
          <View className="content">作品集：{userDetail?.workdisplay?.fileName}</View>
          <View className="choiceIcon">浏览</View>
        </View>
      </Fragment>
      }
    </View>
  )
}
