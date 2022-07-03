import { Button, Image, Input, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import icon from "../../assets/icon";
import image from "../../assets/img";
import tmp from "../../assets/tmp";
import { RSetState, telStr } from "../../config/Constants";
import { NGlobal } from "../../models/Global";
import { effect, reducer, useStore } from "../../utils/dva16";
import './index.less'

export default () => {
  // ----------------------常量-------------------------
  const { userRole, code } = useStore(NGlobal.Name)
  const [agreed, setAgreed] = useState(false)
  const [loginInfo, setLoginInfo] = useState({
    account: '',
    password: ''
  })
  // ----------------------生命周期----------------------
  //TODO如有token直接进入主页
  // ----------------------响应函数----------------------
  const loginCheck = () => {
    if (!agreed) return Taro.showModal({
      title: '隐私协议', content: '请先同意我们的隐私协议哦~', success: (res) => {
        if (res.confirm) {
          setAgreed(!agreed)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

  const fromCheck = () => {
    if (!telStr.test(loginInfo.account)) return '手机号码不合规'
    if (loginInfo.password.length <= 6 || loginInfo.password.length >= 16) return '密码不合规'
  }
  const oneKeyLogin = () => {
    const token = Taro.getStorageSync('token')
    if (token) {
      Taro.switchTab({
        url: `/pages/home/index`,
      })
      Taro.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 500
      })
    } else {
      if (code) {
        Taro.getUserProfile({
          desc: '获取授权', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            console.log('res: ', res);
            if (res) {
              Taro.switchTab({
                url: `/pages/home/index`,
              })
              Taro.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 500
              })
            }
          },
          fail: () => {
            Taro.showModal({
              title: '请允许我们的请求哦~来让您开启愉快之旅',
            });
          }
        })
      }
    }
  }
  // ----------------------渲染函数----------------------
  return (
    <View className="index">
      <View className="logoBox">
        <Image src={tmp.background} className='backgroundLogo'></Image>
        <Image src={image.logo} className='logo'></Image>
        <Image src={image.font1} className='font1'></Image>
        <Image src={image.font2} className='font2'></Image>
        <Image src={image.font3} className='font3'></Image>
        <View className='bead'></View>
      </View>
      <View className="title">登录/注册（{userRole == 'user' ? '求职' : '招聘'}）</View>
      {userRole == 'user' ? <Button className='loginButton' onClick={() => {
        loginCheck()
        if (agreed) oneKeyLogin()
      }}>
        <Text>微信一键登录</Text>
      </Button> : <View className="inviteBox">
        <Input placeholder="请输入手机号" className="count" onInput={({ detail }) => {
          setLoginInfo({ ...loginInfo, account: detail.value })
        }}></Input>
        <Input placeholder="请输入密码" password className="password" onInput={({ detail }) => {
          setLoginInfo({ ...loginInfo, password: detail.value })
        }}></Input>
        <View className="login" onClick={() => {
          if (fromCheck()) {
            Taro.showToast({
              title: `${fromCheck()}`,
              icon: 'error',
              duration: 1000
            })
          } else {
            if (loginCheck()) return
            effect(NLogin.Name, NLogin.hrLogin, { loginInfo }, (res) => {
              if (res.data) {
                effect(NLogin.Name, NLogin.hrInfo, {})
                Taro.switchTab({
                  url: `/pages/home/index`,
                })
                Taro.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 500
                })
              }
            })
          }
        }}>登录</View>
        <View className="forget" onClick={() => { Taro.navigateTo({ url: '/pages/forgetPassword/index' }) }}>忘记密码?</View>
        <View className="register">还没有账户?<Text className="registerCount" onClick={() => {
          Taro.navigateTo({ url: '/pages/register/index' })
        }}>{'注册>>'}</Text></View>
      </View>}
      <View className={userRole == 'user' ? 'privacy' : 'privacy registerPrivacy'} >
        <Image src={agreed ? icon.onAgreed : icon.agreed} className='icon' onClick={() => { setAgreed(!agreed) }}></Image>
        <View className="privacyText">登录代表您已同意可依招聘《<Text className="text" onClick={() => {
          Taro.navigateTo({ url: '/pages/agreement/index' })
        }}>用户协议</Text>》和《<Text className="text" onClick={() => {
          Taro.navigateTo({ url: '/pages/agreement/index' })
        }}>隐私政策</Text>》</View>
      </View>
    </View>

  )
}
