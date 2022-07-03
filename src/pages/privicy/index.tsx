import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import icon from "../../assets/icon";
import CloumnLine from "../../component/cloumnLine";
import { RSetState } from "../../config/Constants";
import { NLogin } from "../../models/Login";
import { reducer, useStore } from "../../utils/dva16";
import './index.less'

export default () => {
  // ----------------------常量-------------------------
  const { tmp } = useStore(NLogin.Name)
  // ----------------------生命周期----------------------
  // ----------------------响应函数----------------------
  // ----------------------渲染函数----------------------
  return (
    <View className='index' >
      <View className="myInfoBox">
        <View className="text title">将我的信息公布给HR</View>
        <Image src={tmp ? icon.onAgreed : icon.agreed} className="icon" onClick={() => {
          if (tmp) {
            Taro.showModal({
              title: '温馨提示',
              content: '您的简历将不能被看到，请慎重选择',
              success: function (res) {
                if (res.confirm) {
                  reducer(NLogin.Name, RSetState, { tmp: !tmp })
                  Taro.showToast({
                    title: '更改成功',
                    icon: 'success',
                    duration: 500
                  })
                }
              }
            })
          } else {
            reducer(NLogin.Name, RSetState, { tmp: !tmp })
            Taro.showToast({
              title: '更改成功',
              icon: 'success',
              duration: 500
            })
          }
        }}></Image>
      </View>
      <View className="hintTextBox">
        <View className="hintText">选择同意后，您的简历将更容易被看到，</View>
        <View className="hintText"> 找工作更容易哟~</View>
      </View>
      <View className="title">屏蔽企业</View>
      <View className="companyList">
        <View className="companyBox" onClick={() => {
          let person: any = { name: "Lydia" };
          const members = [person];
          person = null;			//这里感觉会报错，因为const是常量，而”=”这				个为浅拷贝，不就相对于members 指向的数据变了吗。。
          console.log(members);
        }}>
          <View className="companyMsg">
            <View className="companyMassege">
              <View className="name">公司名称</View>
              <View className="companyMsgBriefBox">
                <View className="address">C论</View>
                <CloumnLine />
                <View className="type">互联网/游戏</View>
                <CloumnLine />
                <View className="education">200-250人</View>
              </View>
            </View>
            <Image src="" className="logo"></Image>
          </View>
        </View>
      </View>
      {/* <View className="addCompany">新增企业</View> */}
    </View>
  )
}
