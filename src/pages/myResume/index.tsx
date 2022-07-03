import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect } from "react";
import { AtList, AtListItem } from "taro-ui";
import { resumeFile, RSetState } from "../../config/Constants";
import { NLogin } from "../../models/Login";
import { NResumeBrief } from "../../models/resumeBrief";
import { NResumeFile } from "../../models/resumeFile";
import { effect, reducer, useStore } from "../../utils/dva16";
import './index.less'

export default () => {
  // ----------------------常量-------------------------
  const { resumeInfo } = useStore(NResumeBrief.Name)
  const { userInfo } = useStore(NLogin.Name)
  // ----------------------生命周期----------------------
  useEffect(() => {
    effect(NLogin.Name, NLogin.info, {}) // 调试
    effect(NResumeBrief.Name, NResumeBrief.get, {})
  }, [])
  // ----------------------响应函数----------------------
  // ----------------------渲染函数----------------------
  return (
    <View className='index' >
      <AtList>
        <AtListItem title='在线简历' note={resumeInfo?.name ? `${resumeInfo?.name} ...` : '您的展示信息'} extraText={'去完善'} arrow='right' onClick={() => {
          Taro.navigateTo({ url: '/pages/addResume/index' })
        }} />
        <AtListItem title='附件简历' note={userInfo?.enclosure?.fileName || '您上传的简历附件'} extraText={userInfo?.enclosure?.fileName ? '去修改' : '去上传'} arrow='right' onClick={() => {
          reducer(NResumeFile.Name, RSetState, { viewKey: resumeFile.enclosedResume })
          Taro.navigateTo({ url: '/pages/importResume/index' })
        }} />
        <AtListItem title='作品集' note={resumeInfo?.workdisplay?.fileName || '您的作品图片、视频或项目'} extraText={resumeInfo?.workdisplay?.fileName ? '去修改' : '去上传'} arrow='right' onClick={() => {
          reducer(NResumeBrief.Name, RSetState, { goUpdate: true })
          Taro.navigateTo({ url: '/pages/workDisplay/index' })
        }} />
      </AtList>
    </View>
  )
}
