import { Image, View, } from "@tarojs/components";
import Taro from "@tarojs/taro";
import Layout from '../../layout'
import { AtList, AtListItem } from 'taro-ui'
import './index.less'
import image from "../../assets/img";
import icon from "../../assets/icon";

export default () => {
  // ----------------------常量-------------------------
  // ----------------------生命周期----------------------
  // ----------------------响应函数----------------------
  // ----------------------渲染函数----------------------
  return (
    <Layout menuIndex={3} bgColor="#ffffff">
      <View className='userBox'>
        <View className="background">
          <View className="userBox">
            <Image className='avatar' src={image.address}></Image>
            <View className="userMsg">
              <View className="userDetail">
                <View className="userName">用户名</View>
                <View className="createResume">新建简历</View>
              </View>
              <Image className='edit' src={icon.edit}></Image>
            </View>
          </View>
          <View className="communicationBox">
            <View className="castResume">
              <View className="resumeCount">0</View>
              <View className="resumeTitle">已投简历</View>
            </View>
            <View className="line"></View>
            <View className="castResume">
              <View className="resumeCount">0</View>
              <View className="resumeTitle">我的收藏</View>
            </View>
            <View className="line"></View>
            <View className="castResume">
              <View className="resumeCount">0</View>
              <View className="resumeTitle">浏览历史</View>
            </View>
          </View>
        </View>
        <View className="settingList">
          <AtList>
            <AtListItem title='求职意向' arrow='right' iconInfo={{ value: 'tag', size: 25, color: 'black' }} />
            <AtListItem title='我的简历' arrow='right' iconInfo={{ value: 'list', size: 25, color: 'black' }} />
            <AtListItem title='我的投递' arrow='right' iconInfo={{ value: 'mail', size: 25, color: 'black' }} />
            <AtListItem title='意见反馈' arrow='right' iconInfo={{ value: 'help', size: 25, color: 'black' }} />
            <AtListItem title='隐私设置' arrow='right' iconInfo={{ value: 'settings', size: 25, color: 'black' }} />
          </AtList>
        </View>
        <View className="quitLogin" onClick={() => {
          Taro.navigateTo({ url: '/pages/index/index' })
          setTimeout(() => {
            Taro.showToast({ title: '退出成功', icon: 'success' })
          }, 100)
        }}>退出登录</View>
      </View>
    </Layout>
  )
}
