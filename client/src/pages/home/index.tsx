import { Input, Swiper, SwiperItem, Text, View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import icon from "../../assets/icon";
import Layout from '../../layout'
import './index.less'


export default () => {
  // ----------------------常量----------------------
  // ----------------------生命周期----------------------
  // ----------------------响应函数----------------------
  // ----------------------渲染函数----------------------
  return (
    <Layout menuIndex={0} bgColor="#ffffff">
      <View className='index'>
        <Swiper
          className='banner'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay>
          <SwiperItem>
            <View className='demo-text-1'>1</View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text-2'>2</View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text-3'>3</View>
          </SwiperItem>
        </Swiper>
        <Text>Hello world!</Text>
        <View className="searchBox">
          <Input className="search" disabled type='text' placeholder='搜索职位、企业' onClick={() => {
            Taro.navigateTo({ url: '/pages/search/index' })
          }} />
          <Image className="searchIcon" src={icon.search}></Image>
        </View>
      </View>
    </Layout>
  )
}
