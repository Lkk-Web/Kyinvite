import { Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import Layout from '../../layout'


export default () => {
  // ----------------------常量-------------------------
  // ----------------------生命周期----------------------
  // ----------------------响应函数----------------------
  // ----------------------渲染函数----------------------
  return (
    <Layout menuIndex={1} bgColor="#ffffff">
      <View className='index' onClick={() => {
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
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }}>
        <Text>Hello world!</Text>
      </View>
    </Layout>
  )
}
