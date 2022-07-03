import { Button, Input, Picker, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect } from "react";
import { useState } from "react";
import { AtList, AtListItem } from "taro-ui";
import { emlStr, RSetState, telStr } from "../../config/Constants";
import { NResumeBrief } from "../../models/resumeBrief";
import { effect, reducer, useStore } from "../../utils/dva16";
import './index.less'

export default () => {
  // ----------------------常量-------------------------
  const { resumeInfo } = useStore(NResumeBrief.Name)
  const [info, setInfo] = useState({ name: '', phone: '', email: '', birthday: '', sex: 2, city: '' })
  const sex = ['男', '女']

  // ----------------------生命周期----------------------
  useEffect(() => {
    resumeInfo && setInfo(resumeInfo)
  }, [])
  // ----------------------响应函数----------------------
  const checkValue = () => {
    if (!info.name) return '姓名不合规'
    if (!telStr.test(info.phone)) return '手机号码不合规'
    if (!emlStr.test(info.email)) return '邮箱地址不合规'
    if (!info.birthday) return '出生年月不合规'
    if (info.sex == 2) return '性别不合规'
    if (!info.city) return '所在城市不合规'
  }
  // ----------------------渲染函数----------------------
  return (
    <View className='index' >
      <View className="inputBox line">
        <View className="title">真实姓名</View>
        <Input placeholder="请输入" className="input" value={info.name} maxlength={8} onBlur={({ detail }) => {
          setInfo({ ...info, name: detail.value.trim() }) //去掉字符串前后空白
        }}></Input>
      </View>
      <View className="inputBox line">
        <View className="title" >手机号码</View>
        <Input placeholder="请输入" type='number' className="input" maxlength={11} value={info.phone} onBlur={({ detail }) => {
          setInfo({ ...info, phone: detail.value })
        }}></Input>
      </View>
      <View className="inputBox">
        <View className="title" >邮箱地址</View>
        <Input placeholder="请输入" className="input" value={info.email} onBlur={({ detail }) => {
          setInfo({ ...info, email: detail.value.trim() })
        }}></Input>
      </View>
      <AtList>
        <Picker mode='date' value={info.birthday} onChange={({ detail }) => {
          setInfo({ ...info, birthday: detail.value })
        }}>
          <AtListItem
            arrow='right'
            note={info.birthday ? info.birthday : '请选择'}
            title='出生年月'
          />
        </Picker>
        <Picker mode='selector' range={sex} value={info.sex} onChange={({ detail }) => {
          setInfo({ ...info, sex: parseInt(detail.value as string) })
        }}>
          <AtListItem
            arrow='right'
            note={info.sex == 2 ? '请选择' : info.sex == 0 ? '男' : '女'}
            title='性别'
          />
        </Picker>
        <Picker mode='region' value={['', '', '']} onChange={({ detail }) => {
          setInfo({ ...info, city: detail.value[1] })
        }}>
          <AtListItem
            arrow='right'
            note={info.city ? info.city : '请选择'}
            title='所在城市'
          />
        </Picker>
      </AtList>
      <Button className="save" onClick={() => {
        if (checkValue()) {
          Taro.showToast({
            title: checkValue() as string,
            icon: 'error',
            duration: 1000
          })
        } else {
          reducer(NResumeBrief.Name, RSetState, { resumeInfo: { ...resumeInfo, ...info } })
          effect(NResumeBrief.Name, NResumeBrief.update, {})
          Taro.navigateBack()
        }
      }}>确定</Button>
    </View>
  )
}
