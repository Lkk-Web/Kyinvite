import { Image, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import image from "../../assets/img";
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
          success: function (res) {
            console.log('res: ', res);
            if (res.code) {
              //发起网络请求
              // Taro.request({
              //   url: 'https://test.com/onLogin',
              //   data: {
              //     code: res.code
              //   }
              // })
              Taro.switchTab({
                url: `/pages/home/index`,
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }}>
        <Text>微信一键登录</Text>
      </View>
    </View>

  )
}
