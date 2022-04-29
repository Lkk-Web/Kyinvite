import { Image, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import image from "../../assets/img";
import { NLogin } from "../../models/login";
import { effect } from "../../utils/dva16";
import './index.less'

export default () => {
  // ----------------------常量-------------------------
  // ----------------------生命周期----------------------
  // ----------------------响应函数----------------------
  // ----------------------渲染函数----------------------
  return (
    <View className="loginBox">
      <View className="logoBox">
        <Image src={image.logo} className='logo'></Image>
        <View className='bead'></View>
      </View>
      <View className='loginButton' onClick={() => {
        Taro.login({
          success: async function (res) {
            if (res.code) {
              //发起网络请求
              // effect(NLogin.Name, NLogin.login, { code: res.code }, (res) => {
                if (res) {
                  // 可以通过 Taro.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
                  Taro.getSetting({
                    success: function (res) {
                      if (!res.authSetting['scope.userInfo']) {
                        Taro.authorize({
                          scope: 'scope.userInfo',
                          success: function () {
                            // 用户已经同意小程序使用录音功能，后续调用 Taro.startRecord 接口不会弹窗询问
                          }
                        })
                      } else {
                        Taro.getUserInfo({
                          success: function (res) {
                            console.log('用户信息: ', res);
                            Taro.switchTab({
                              url: `/pages/home/index`,
                            })
                          }
                        })
                      }
                    }
                  })
                }
            //   })
            // } else {
            //   Taro.showModal({ title: '登录失败！' })
            //   console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }}>
        <Text>微信一键登录</Text>
      </View>
    </View>

  )
}
