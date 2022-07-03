import { Image, Input, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Fragment, useState } from "react";
import icon from "../../assets/icon";
import tmp from "../../assets/tmp";
import Config from "../../config/Config";
import { emlStr, telStr } from "../../config/Constants";
import { NLogin } from "../../models/Login";
import { effect } from "../../utils/dva16";
import './index.less'

export default () => {
  // ----------------------常量-------------------------
  const [info, setInfo] = useState({
    account: '',
    password: '',
    affirmPassword: '',
    hrName: '',
    email: '',
    name: '',
    position: '',
  })
  const [headerImg, setHeaderImg] = useState()
  const [fileEnclose, setFileEnclose] = useState({
    path: '',
    fileName: ''
  })
  // ----------------------生命周期----------------------
  // ----------------------响应函数----------------------
  const registerCheck = () => {
    // if (!headerImg) return '请上传头像'  不开
    if (!telStr.test(info.account)) return '手机号码不合规'
    if (info.password.length <= 6) return '密码需大于6位'
    if (info.password.length >= 16) return '密码需小于16位'
    if (info.password != info.affirmPassword) return '确认密码不一致'
    if (info.hrName.length == 0) return '用户名不能为空'
    if (!emlStr.test(info.email)) return '邮箱地址不合规'
    if (info.name.length == 0) return '用户名不能为空'
    if (info.position.length == 0) return '用户名不能为空'
    if (!fileEnclose.path || !fileEnclose.fileName) return '附件不能为空'
  }

  const onPickerFile = () => {
    Taro.chooseMessageFile({
      count: 1, type: 'file', success: (e) => {
        setFileEnclose({ path: e.tempFiles[0].path, fileName: e.tempFiles[0].name })
      }, extension: ['zip']
    })
  }

  // ----------------------渲染函数----------------------
  return (
    <View className='index' >
      <View className="border">
        <View className="headerImg" onClick={() => {
          // onPickerImg() 
        }}>
          <Image src={headerImg || tmp.defaultHeaderImg} className='img'></Image>
        </View>
      </View>
      {/* <View className="remark">上传头像</View> */}
      <Input placeholder="请输入手机号" maxlength={11} className="count" onInput={({ detail }) => {
        setInfo({ ...info, account: detail.value })
      }}></Input>
      <Input placeholder="请输入密码" password className="password" onInput={({ detail }) => {
        setInfo({ ...info, password: detail.value })
      }}></Input>
      <Input placeholder="请确认密码" password className="form" onInput={({ detail }) => {
        setInfo({ ...info, affirmPassword: detail.value })
      }}></Input>
      <Input placeholder="请输入用户名" className="form" onInput={({ detail }) => {
        setInfo({ ...info, hrName: detail.value })
      }}></Input>
      <Input placeholder="请输入邮箱地址" className="form" onInput={({ detail }) => {
        setInfo({ ...info, email: detail.value })
      }}></Input>
      <Input placeholder="请输入您所在的企业名称" className="form" onInput={({ detail }) => {
        setInfo({ ...info, name: detail.value })
      }}></Input>
      <Input placeholder="请输入您在企业所担职务" className="form" onInput={({ detail }) => {
        setInfo({ ...info, position: detail.value })
      }}></Input>
      <View className="encloseBox">
        <View className="title">上传企业附件(Zip):</View>
        <View className="enclose" onClick={() => {
          onPickerFile();
        }}>
          <View className="iconBox">
            {
              fileEnclose.fileName ? <Text className="explain">{fileEnclose.fileName}</Text> : <Fragment>
                <Image src={icon.addIcon} className="img"></Image>
                <Text>添加</Text>
                <Text className="explain">请将图片或文件压缩成zip包后上传</Text>
              </Fragment>
            }
          </View>
        </View>
      </View>
      <View className="register" onClick={() => {
        if (registerCheck()) {
          Taro.showToast({
            title: `${registerCheck()}`,
            icon: 'error',
            duration: 1000
          })
        } else {
          Taro.uploadFile({
            url: Config.UPLOAD_HOME + `?url=${'companyEnclose'}&account=${info.account}`,
            filePath: fileEnclose.path,
            header: {
              'Content-Type': 'multipart/form-data',
              'authorization': Taro.getStorageSync("token"),  //如果需要token的话要传
            },
            name: "file",
            success: (res) => {
              if (JSON.parse(res.data).data) {
                let data = JSON.parse(res.data).data
                if (data.lastIndexOf('?')) data = data.substr(0, data.lastIndexOf("?"));
                effect(NLogin.Name, NLogin.register, { ...info, enclosure: { path: data, fileName: fileEnclose.fileName } }, (res) => {
                  if (res) {
                    Taro.navigateBack()
                    Taro.showModal({
                      title: '提交成功',
                      content: '注册结果我们将会在3个工作日内通过邮件或短信联系您，感谢您的使用（体验阶段，账号可正常使用）',
                      success: function (res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
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
        }
        // Taro.requestSubscribeMessage({
        //   tmplIds: [''],
        //   success: function (res) { }
        // })
      }}>注册</View>
    </View>
  )
}
