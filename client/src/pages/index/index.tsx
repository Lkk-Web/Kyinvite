import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.less'
import Taro from '@tarojs/taro';

export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='index' onclick={() => {
        console.log(213123);
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
    )
  }
}
