import { Text, View } from "@tarojs/components";
import Layout from '../../layout'


export default () => {
  // ----------------------常量-------------------------
  // ----------------------生命周期----------------------
  // ----------------------响应函数----------------------
  // ----------------------渲染函数----------------------
  return (
    <Layout menuIndex={2} bgColor="#ffffff">
      <View className='index'>
        <Text>辅导</Text>
      </View>
    </Layout>
  )
}
