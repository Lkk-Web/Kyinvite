import { Swiper, SwiperItem, Text, View,} from "@tarojs/components";
import Taro from "@tarojs/taro";
import Layout from '../../layout'
import { AtAvatar } from 'taro-ui'
import { AtIcon } from 'taro-ui'

export default () => {
  return (
    <Layout menuIndex={3} bgColor="#ffffff">
      <View className='index' >
     
      <View className='components-page'>
        <Text>flex-direction: row 横向布局</Text>
        <View className='flex-wrp' style='flex-direction:row;'>
          <View className='flex-item demo-text-1'/>
      </View>

      <Text>用户名</Text>

      <View className='at-icon at-icon-settings'></View>
      <AtIcon value='heart' size='32' color='C6C6C6'></AtIcon>

       <AtAvatar 
         className="touxiang"
         ></AtAvatar>
       <AtAvatar image='https://jdc.jd.com/img/200'></AtAvatar>
       <AtAvatar text='头像'></AtAvatar>
       <AtAvatar circle image='https://jdc.jd.com/img/200'></AtAvatar>
       <AtAvatar circle text='头像'></AtAvatar>

       <Text>求职意向</Text>

      </View>
    </Layout>
  )
}
