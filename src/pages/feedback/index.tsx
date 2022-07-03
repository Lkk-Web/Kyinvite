import { Input, Textarea, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { telStr } from "../../config/Constants";
import { NFeedback } from "../../models/feedback";
import { effect } from "../../utils/dva16";
import './index.less'

export default () => {
  // ----------------------常量-------------------------
  const [textAreaDetail, setTextAreaDetail] = useState({ cursor: 0, value: '' })
  const [phone, setPhone] = useState('')
  // ----------------------生命周期----------------------
  // ----------------------响应函数----------------------
  const checkValue = () => {
    if (textAreaDetail.cursor == 0) return '反馈内容不合规'
    if (!telStr.test(phone)) return '手机号码不合规'
    //https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/sec-check/security.msgSecCheck.html 敏感词
  }
  // ----------------------渲染函数----------------------
  return (
    <View className='index' >
      <View className="feedbackContent">反馈内容:</View>
      <Textarea placeholder="请输入您需要反馈的内容" className="feedbackText" maxlength={500} onInput={({ detail }) => {
        setTextAreaDetail(detail)
      }} ></Textarea>
      <View className="numberWord" >{textAreaDetail.cursor}/500</View>
      <View className="relation">联系方式:</View>
      <Input type="text" placeholder="请留下您的联系电话，以便我们答复~" className="relationHint" maxlength={11} onInput={({ detail }) => {
        setPhone(detail.value)
      }}></Input>
      <view className="submit" onClick={() => {
        if (checkValue()) {
          Taro.showToast({
            title: checkValue() as string,
            icon: 'error',
            duration: 1000
          })
        } else {
          effect(NFeedback.Name, NFeedback.save, { content: textAreaDetail.value, phone })
          Taro.navigateBack();
          Taro.showModal({
            title: '提交成功',
            content: '我们会尽快处理并给您反馈，请耐心等待哦~',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }
      }}>提交</view>
    </View>
  )
}
