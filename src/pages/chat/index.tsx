import { View } from "@tarojs/components";
import Layout from '../../layout'
import './index.less'

export default () => {
  // ----------------------常量-------------------------
  // ----------------------生命周期----------------------
  // ----------------------响应函数----------------------
  // ----------------------渲染函数----------------------
  return (
    <Layout menuIndex={1} bgColor="#ffffff">
      <View className='index' >
        <View className="unMessage">
          <View>暂无会话~</View>
          <View className="communication">快去找招聘者交流吧</View>
        </View>
      </View>
    </Layout>
  )
}
