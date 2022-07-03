import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import icon from "../../assets/icon";
import tmp from "../../assets/tmp";
import Config from "../../config/Config";
import { degree, RSetState } from "../../config/Constants";
import { NResumeBrief } from "../../models/resumeBrief";
import { effect, reducer, useStore } from "../../utils/dva16";
import './index.less'

export default () => {
  // ----------------------常量-------------------------
  const { isKnow, resumeInfo } = useStore(NResumeBrief.Name)
  const experience = [
    {
      keyIndex: 0,
      key: 'education',
      titleValue: '教育经历',
      contentValue: '您可以添加学历、在校经历等方面进行描述'
    },
    {
      keyIndex: 1,
      key: 'experience',
      titleValue: '主要经历',
      contentValue: '您可以从实习/工作经历、项目经历、学术经历等方面进行描述'
    },
    {
      keyIndex: 2,
      key: 'advantage',
      titleValue: '个人优势',
      contentValue: '您可以从获奖经历、技能/语言、职位相关能力、兴趣特长等方面进行描述'
    },
    {
      keyIndex: 3,
      key: 'workDisplay',
      titleValue: '作品展示',
      contentValue: '您可以从获奖作品，自身作品进行上传和描述'
    },
  ]
  const [filePath, setFilePath] = useState('')
  // ----------------------生命周期----------------------
  useEffect(() => {
    if (!isKnow) {
      Taro.showModal({
        title: '温馨提示',
        content: '请保证您填写的真实信息准确，让boss看到更好的你~',
        showCancel: false,
        confirmText: '我已知悉',
        success: function (res) {
          if (res.confirm) {
            reducer(NResumeBrief.Name, RSetState, { isKnow: true })
          }
        }
      })
    }
  }, [])

  useEffect(() => {
    effect(NResumeBrief.Name, NResumeBrief.get, {})
  }, [])
  // ----------------------响应函数----------------------
  const onPickerImg = () => {
    Taro.chooseMessageFile({
      count: 1, type: 'image', success: (e) => {
        setFilePath(e.tempFiles[0].path)
      }
    })
  }
  // ----------------------渲染函数----------------------
  return (
    <View className='index' >
      <View className="personalInformation">
        <View className="box">
          <Image src={filePath || resumeInfo?.headerimg || tmp.defaultHeaderImg} className="headerImg" onClick={() => { onPickerImg() }}></Image>
          <Image src={icon.edit3} className='icon'></Image>
        </View>
        <View className="message">
          <View className="name">{resumeInfo?.name || '待完善'}</View>
          <View className="editMessage" onClick={() => { Taro.navigateTo({ url: '/pages/editInfo/index' }) }}>
            <Image src={icon.edit2} className="icon"></Image>
            <View>编辑基本信息</View>
          </View>
        </View>
      </View>
      {experience.map((v, i) => {
        return <View key={i}>
          <View className="educationBox" onClick={() => {
            reducer(NResumeBrief.Name, RSetState, { routeValue: v, goUpdate: false })
            Taro.navigateTo({ url: `/pages/${i == 3 ? 'workDisplay' : 'addExperience'}/index` })
          }}>
            <View>
              <View className="title">{v.titleValue}</View>
              <View className="content">{((i == 0 && resumeInfo?.degree) &&
                `${resumeInfo?.degree >= 3 ? `${resumeInfo.university}·${resumeInfo.profession}·${degree[resumeInfo.degree]}` : `${resumeInfo.profession}·${degree[resumeInfo.degree]}`}`) || (i == 3 ? resumeInfo?.workdisplay?.fileName : resumeInfo?.[v.key]) || v.contentValue}</View>
            </View>
            <Image src={icon.outline_gray} className='icon'></Image>
          </View>
          {v.keyIndex != 3 && <View className="line"></View>}
        </View>
      })}
      <View className="saveButton" onClick={() => {
        if (filePath) {
          Taro.uploadFile({
            url: Config.UPLOAD_HOME + `?url=${'headerimg'}`,
            filePath: filePath,
            header: {
              'Content-Type': 'multipart/form-data',
              'authorization': Taro.getStorageSync("token"),  //如果需要token的话要传
            },
            name: "file",
            success: (res) => {
              if (res.data) {
                effect(NResumeBrief.Name, NResumeBrief.update, { headerimg: res.data })
              }
            },
          });
        }
        if (!resumeInfo?.city) {
          Taro.showModal({
            title: '温馨提示',
            content: '请填写完基本信息，再进行保存',
            confirmText: '去完善',
            success: function (res) {
              if (res.confirm) {
                Taro.navigateTo({ url: '/pages/editInfo/index' })
              }
            }
          })
        } else if (!resumeInfo?.degree) {
          Taro.showModal({
            title: '温馨提示',
            content: '请填写完教育经历，再进行保存',
            confirmText: '去完善',
            success: function (res) {
              if (res.confirm) {
                reducer(NResumeBrief.Name, RSetState, {
                  routeValue: {
                    keyIndex: 0,
                    key: 'education',
                    titleValue: '教育经历',
                    contentValue: '您可以添加学历、在校经历等方面进行描述'
                  }
                })
                Taro.navigateTo({ url: `/pages/addExperience/index` })
              }
            }
          })
        } else {
          effect(NResumeBrief.Name, NResumeBrief.update, { resumeInfo }, (res) => {
            if (res.data) {
              // Taro.switchTab({ url: '/pages/user/index' })
              Taro.navigateBack()
              Taro.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 500
              })
            }
          })
        }
      }}>保存</View>
      <View className="importResume" onClick={() => {
        Taro.navigateTo({ url: '/pages/importResume/index' })
      }}>{'>>'}导入简历附件</View>
    </View>
  )
}
