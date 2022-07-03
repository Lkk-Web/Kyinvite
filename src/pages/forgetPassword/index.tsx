import { Input, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { emlStr, telStr } from "../../config/Constants";
import { NLogin } from "../../models/Login";
import { effect } from "../../utils/dva16";
import './index.less'

export default () => {
  // ----------------------常量-------------------------
  const [info, setInfo] = useState({
    account: '',
    email: ''
  })
  // ----------------------生命周期----------------------
  // ----------------------响应函数----------------------
  const forgetCheck = () => {
    if (!telStr.test(info.account)) return '手机号码不合规'
    if (!emlStr.test(info.email)) return '邮箱地址不合规'
  }
  // ----------------------渲染函数----------------------
  return (
    <View className='index' >
      <Text className="titleText">找回密码</Text>
      <Input placeholder="请输入您的账号（手机号）" className="form" onInput={({ detail }) => {
        setInfo({ ...info, account: detail.value })
      }}></Input>
      <Input placeholder="请输入您的邮箱" className="form" onInput={({ detail }) => {
        setInfo({ ...info, email: detail.value })
      }}></Input>
      {/* {    <View className="encloseBox">
        <View className="title">上传企业附件(pdf):</View>
        <View className="enclose">
          <View className="iconBox">
            <Image src={icon.addIcon} className="img"></Image>
            <Text>添加</Text>
          </View>
        </View>
      </View>} */}
      <View className="submit" onClick={() => {
        if (forgetCheck()) {
          Taro.showToast({
            title: `${forgetCheck()}`,
            icon: 'error',
            duration: 1000
          })
        } else {
          effect(NLogin.Name, NLogin.forgetPassword, { ...info }, (res) => {
            if (res.data) {
              Taro.showModal({
                title: '提交成功',
                content: '我们将会在3个工作日内通过邮件或短信联系您找回密码，感谢您的使用',
                showCancel: false,
                confirmText: '我已知悉',
                success: function (res) {
                  if (res.confirm) {
                    Taro.navigateBack()
                    console.log('用户点击确定')
                  }
                }
              })
            }
          })
        }
      }}>提交</View>
    </View>
  )
}
