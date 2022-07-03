import { Image, Video, View } from "@tarojs/components";
import { useEffect } from "react";
import icon from "../../assets/icon";
import Layout from '../../layout'
import { NSetting } from "../../models/Setting";
import { effect, useStore } from "../../utils/dva16";
import './index.less'

export default () => {
  // ----------------------常量-------------------------
  const { bannerImg } = useStore(NSetting.Name)
  // ----------------------生命周期----------------------
  useEffect(() => {
    effect(NSetting.Name, NSetting.get, {})
  }, [])
  // ----------------------响应函数----------------------
  // ----------------------渲染函数----------------------
  return (
    <Layout menuIndex={2} bgColor="#ffffff">
      <View className='index'>
        <View className="titleBox">
          <Image src={icon.coach} className="icon"></Image>
          <View className="title">简历辅导</View>
        </View>
        <Video
          src={bannerImg?.[0]?.coach}
          className="video"
          id='video'
          // poster='https://kyingsoft.oss-cn-hangzhou.aliyuncs.com/kying/setting/1.png'
          initialTime={0}
          controls={true}
          autoplay={false}
          loop={false}
          muted={false}
        ></Video>
        <View className="titleBox margin">
          <Image src={icon.train} className="icon"></Image>
          <View className="title">职业培训</View>
        </View>
        <Video
          src={bannerImg?.[0]?.train}
          className="video"
          id='video'
          // poster='https://kyingsoft.oss-cn-hangzhou.aliyuncs.com/kying/setting/1.png'
          initialTime={0}
          controls={true}
          autoplay={false}
          loop={false}
          muted={false}
        ></Video>
      </View>
    </Layout>
  )
}
