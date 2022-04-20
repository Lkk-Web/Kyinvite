import { Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import Layout from '../../layout'

export default () => {
  return (
    <Layout menuIndex={3} bgColor="#ffffff">
      <View className='index' >
        <Text>我的</Text>
      </View>
    </Layout>
  )
}
