import { Image, View } from "@tarojs/components";
import image from "../../assets/img";
import './index.less'

export default () => {
  return (
    <View className='indexBox'>
      <View className="title">选择你的角色</View>
      <View className="roleBox">
        <View className="applyJob">
          <Image src={image.applyJob} className='applyJobImg'></Image>
          <View>求职者</View>
        </View>
        <View className="inviteJob">
          <Image src={image.inviteJob} className='inviteJobImg'></Image>
          <View>招聘方</View>
        </View>
      </View>
    </View>
  )
}
