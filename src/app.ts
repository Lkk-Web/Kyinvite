import Taro from '@tarojs/taro'
import { useEffect } from 'react'
import './app.less'
import Config from './config/Config'
import { RSetState } from './config/Constants'
import { NGlobal } from './models/Global'
import { initRequest, reducer } from './utils/dva16'
import 'taro-ui/dist/style/index.scss'  //全局引入Taro ui 样式
import './utils/lodash'     //解决微信小程序引用lodash问题
// import './font.scss'  //TODO引入阿里巴巴矢量库
/*------------------------ 初始化dva16 ------------------------*/

initRequest(Config.SERVER_HOME, (status, data) => {
  console.log('[API Error]', status, data)
  setTimeout(() => {
    Taro.showToast({
      title: data.message,
      icon: 'error',
      mask: true,
    })
  }, 100)
  // TODO error handler
})

export default (props) => {
  useEffect(() => {
    Taro.getSystemInfo({
      success: (res) => {
        const {
          screenHeight,
          safeArea,
        } = res
        reducer(NGlobal.Name, RSetState, { safeAreaHeight: screenHeight - safeArea!.bottom })
      },
    })
  }, [])

  return props.children
}
