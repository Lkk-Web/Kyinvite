import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import img from "../../assets/img";
import tmp from "../../assets/tmp";
import { RSetState, EUserRole } from "../../config/Constants";
import { NGlobal } from "../../models/Global";
import { reducer } from "../../utils/dva16";
import './index.less'

export default () => {
  // ----------------------常量-------------------------
  // ----------------------生命周期----------------------
  // ----------------------响应函数----------------------
  // ----------------------渲染函数----------------------
  return (
    <View className='indexBox'>
      <Image src={tmp.background} className='background'></Image>
      <View className="roleSelectView">
        <View className="title">选择您的角色</View>
        <View className="roleBox" onClick={() => {
          Taro.login({
            success: async function (req: any) {
              if (req.code) {
                reducer(NGlobal.Name, RSetState, { userRole: EUserRole.user, code: req.code })
                Taro.navigateTo({
                  url: `/pages/login/index`,
                })
              }
            }
          })
        }}>
          <Image className="seekerImg" src={img.seeker} ></Image>
          <View>我是求职者</View>
        </View>
        <View className="roleBox" onClick={() => {
          reducer(NGlobal.Name, RSetState, { userRole: EUserRole.invite })
          Taro.navigateTo({
            url: `/pages/login/index`,
          })
        }}>
          <Image className="inviterImg" src={img.inviter}></Image>
          <View>我是招聘者</View>
        </View>
      </View>
    </View>
  )
}
