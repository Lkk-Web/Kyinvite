import { Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import Layout from '../../layout'


export default () => {
  return (
    <Layout menuIndex={0} bgColor="#ffffff">
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
