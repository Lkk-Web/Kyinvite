import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Fragment, useEffect, useState } from "react";
import icon from "../../assets/icon";
import image from "../../assets/img";
import Config from "../../config/Config";
import { resumeFile } from "../../config/Constants";
import { NLogin } from "../../models/Login";
import { NResumeFile } from "../../models/resumeFile";
import { NUser } from "../../models/User";
import { effect, useStore } from "../../utils/dva16";
import './index.less'

export default () => {
  // ----------------------常量-------------------------
  const { viewKey } = useStore(NResumeFile.Name)
  const { userInfo } = useStore(NLogin.Name)
  const [file, setFile] = useState({
    path: '',
    fileName: ''
  })
  // ----------------------生命周期----------------------
  useEffect(() => {
    effect(NLogin.Name, NLogin.info, {})
    setFile({ path: userInfo.enclosure?.path, fileName: userInfo.enclosure?.fileName })
  }, [])

  // ----------------------响应函数----------------------
  const acquireFile = () => {
    Taro.chooseMessageFile({
      count: 1, type: 'file', success: (e) => {
        Taro.uploadFile({
          url: Config.UPLOAD_HOME + `?url=${'enclosure'}`,
          filePath: e.tempFiles[0].path,
          header: {
            'Content-Type': 'multipart/form-data',
            'authorization': Taro.getStorageSync("token"),  //如果需要token的话要传
          },
          name: "file",
          success: (res) => {
            if (JSON.parse(res.data).data) {
              setFile({
                path: e.tempFiles[0].path,
                fileName: e.tempFiles[0].name
              })
              let data = JSON.parse(res.data).data
              if (data.lastIndexOf('?')) data = data.substr(0, data.lastIndexOf("?"));
              effect(NUser.Name, NUser.update, { enclosure: { path: data, fileName: e.tempFiles[0].name } }, (res) => {
                if (res.data) {
                  Taro.showToast({
                    title: '上传成功',
                    icon: 'success',
                    duration: 500
                  })
                }
              })
            } else {
              Taro.showToast({
                title: '请检查文件大小',
                icon: 'error',
                duration: 500
              })
            }
          },
        });
      }, extension: ['pdf']
    })
  }

  const openFile = (path) => {
    Taro.downloadFile({
      url: path,
      success: function (res) {
        let filePath = res.tempFilePath
        Taro.openDocument({
          filePath: filePath,
          fileType: 'pdf',
          success() {
            console.log("打开成功")
          },
        })
      }
    })
  }
  // ----------------------渲染函数----------------------
  return (
    <View className="index">
      {
        viewKey == resumeFile.enclosedResume && <View className='index' >
          {userInfo.enclosure?.path || file.fileName ?
            <View className="fileBox" onClick={() => { if (file.path || userInfo.enclosure?.path) openFile(file.path || userInfo.enclosure?.path) }}>
              <Image className="fileIcon" src={icon.file1}></Image>
              <View className="content">{file.fileName || userInfo.enclosure?.fileName || '(附件)名称'}</View>
              <View className="choiceIcon">浏览</View>
            </View> :
            <Fragment>
              <Image src={image.letter} className='letter'></Image>
              <View className="hint">暂无简历附件，快去导入吧~</View>
            </Fragment>
          }
          <View className="fileHint">*仅支持pdf格式文件(5M以内)导入</View>
          <View className="wxBotton" onClick={() => { acquireFile() }}>{file.fileName || userInfo.enclosure?.fileName ? '修改附件简历' : '从微信中导入'}</View></View>
      }
      {
        viewKey == resumeFile.workDisplay && <View className='index' ><Image src={image.workDisplay} className='letter'></Image>
          <View className="hint">暂无作品集，快去导入吧~</View>
          <View className="fileHint">*仅支持pdf格式文件导入</View>
          <View className="wxBotton" onClick={() => { acquireFile() }}>从微信中导入</View></View>
      }
    </View>
  )
}
