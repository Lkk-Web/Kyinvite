import { Input, Swiper, SwiperItem, Text, View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import icon from "../../assets/icon";
import image from "../../assets/img";
import CloumnLine from "../../component/cloumnLine";
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
        <View className="bannerBg">
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
        </View>
        <View className="contentBg">
          <View className="indexButton">
            <View className="buttonBox">
              <Image src={image.occupation} className='buttonSearch'></Image>
              <Text>求职</Text>
            </View>
            <View className="buttonBox">
              <Image src={image.wallet} className='buttonSearch'></Image>
              <Text>待遇</Text>
            </View>
            <View className="buttonBox">
              <Image src={image.address} className='buttonSearch'> </Image>
              <Text>地点</Text>
            </View>
          </View>
          <View className="line"></View>
          <View className="searchBox">
            <Input className="search" disabled type='text' placeholder='搜索职位、企业' onClick={() => {
              Taro.navigateTo({ url: '/pages/search/index' })
            }} />
            <Image className="searchIcon" src={icon.search}></Image>
          </View>
          <View className="title">推荐</View>

          <View className="line"></View>
          <View className="briefBox">
            <View className="jobTitle">
              <View className="jobName">产品经理</View>
              <View className="jobSalary">10K-15K</View>
            </View>
            <View className="jobMessage">
              <View className="jobAskBox">
                <View className="jobAddress">北京</View>
                <CloumnLine />
                <View className="jobGraduate">应届生</View>
                <CloumnLine />
                <View className="education">本科</View>
              </View>
              <View>2022-04-28</View>
            </View>
            <View className="treatmentBox">
              <View className="treatment">有下午茶</View>
            </View>
            <View className="jobDetailBox">
              <View className="companyLogo"></View>
              <View className="companyMsgBox">
                <View className="companyName">网易</View>
                <View className="companyMsg">
                  <View>C轮</View>
                  <CloumnLine />
                  <View>互联网/游戏</View>
                  <CloumnLine />
                  <View>100-150人</View>
                </View>
              </View>
              <View className="chatBtn">我要直聊</View>
              <View className="deliverBtn">我要投递</View>
            </View>
          </View>
          <View className="line"></View>

        </View>
      </View>
    </Layout>
  )
}
