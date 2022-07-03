import { Button, Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { AtTextarea } from "taro-ui";
import icon from "../../assets/icon";
import image from "../../assets/img";
import Config from "../../config/Config";
import { RSetState } from "../../config/Constants";
import { NResumeBrief } from "../../models/resumeBrief";
import { effect, reducer, useStore } from "../../utils/dva16";
import './index.less'

export default () => {
  // ----------------------常量-------------------------
  const { resumeInfo, goUpdate } = useStore(NResumeBrief.Name)
  const [file, setFile] = useState({
    introduce: '',
    path: '',
    fileName: ''
  })
  // ----------------------生命周期----------------------
  useEffect(() => {
    effect(NResumeBrief.Name, NResumeBrief.get, {}, (res) => {
      if (res.data) {
        setFile({ introduce: res.data?.workdisplay?.introduce, path: res.data?.workdisplay?.path, fileName: res.data?.workdisplay?.fileName })
      }
    })
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
              let data = JSON.parse(res.data).data
              if (data.lastIndexOf('?')) data = data.substr(0, data.lastIndexOf("?"));
              setFile({
                ...file,
                path: data,
                fileName: e.tempFiles[0].name
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

  const openFile = () => {
    Taro.downloadFile({
      url: file.path || resumeInfo?.workdisplay?.path,
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
  const checkValue = () => {
    if (!file.introduce) return '作品介绍不合规'
    if (!file.path || !file.fileName) return '请上传作品附件'
  }
  // ----------------------渲染函数----------------------
  return (
    <View className='index' >
      <View className="title">作品介绍：</View>
      <AtTextarea
        placeholder={'请简单介绍您的作品'}
        value={file?.introduce}
        className="experienceText"
        height={250}
        maxLength={520}
        count={true}
        showConfirmBar
        textOverflowForbidden={false}
        onChange={(detail) => {
          setFile({ ...file, introduce: detail })
        }} ></AtTextarea>
      <View className="title">上传作品：</View>
      {file?.path ? <View className="fileBox" onClick={() => { if (file?.path || resumeInfo?.workdisplay?.path) openFile() }}>
        <Image className="fileIcon" src={icon.file1}></Image>
        <View className="content">{file.fileName || resumeInfo?.workdisplay?.fileName || '(附件)名称'}</View>
        <View className="choiceIcon">浏览</View>
      </View> : <View className="uploadBox" onClick={() => { acquireFile() }}>
        <Image src={image.upload} className='uploadImg'></Image>
        <View>上传作品文件</View>
        <View>格式：无要求</View>
        <View>大小：3M内</View>
      </View>}
      <Button className="save" onClick={() => {
        if (checkValue()) {
          Taro.showToast({
            title: checkValue() as string,
            icon: 'error',
            duration: 1000
          })
        } else {
          if (goUpdate) {
            effect(NResumeBrief.Name, NResumeBrief.update, { resumeInfo: { workdisplay: file } }, (res) => {
              if (res.data) {
                Taro.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 500
                })
              }
            })
          } else {
            reducer(NResumeBrief.Name, RSetState, { resumeInfo: { ...resumeInfo, workdisplay: file } })
          }
          Taro.navigateBack()
        }
      }}>{goUpdate ? '保存' : '确定'}</Button>
      {file?.path && <Button className="save update" onClick={() => {
        acquireFile()
      }}>修改作品附件</Button>}
    </View>
  )
}
