import { Image, View, } from "@tarojs/components";
import Taro from "@tarojs/taro";
import Layout from '../../layout'
import { AtList, AtListItem } from 'taro-ui'
import './index.less'
import icon from "../../assets/icon";
import { effect, reducer, useStore } from "../../utils/dva16";
import { NLogin } from "../../models/Login";
import { NGlobal } from "../../models/Global";
import { EUserRole, RSetState } from "../../config/Constants";
import tmp from "../../assets/tmp";
import { useEffect } from "react";
import { NCompany } from "../../models/Company";
import Config from "../../config/Config";

export default () => {
  // ----------------------常量-------------------------
  const { userInfo, hrInfo } = useStore(NLogin.Name)
  const { userRole } = useStore(NGlobal.Name)
  const { companyInfo } = useStore(NCompany.Name)
  // ----------------------生命周期----------------------
  useEffect(() => {
    if (userRole == EUserRole.user) {
      effect(NLogin.Name, NLogin.info, {})
    } else {
      effect(NLogin.Name, NLogin.hrInfo, {})
      effect(NCompany.Name, NCompany.get, {})
    }
  }, [])
  // ----------------------响应函数----------------------
  // ----------------------渲染函数----------------------
  return (
    <Layout menuIndex={(userRole == EUserRole.user) ? 3 : 2} bgColor="#ffffff">
      {userRole == EUserRole.user ? <View className='userBox'>
        <View className="background">
          <View className="userBox">
            <View className="box">
              <Image className='avatar' src={userInfo.headerImg || tmp.defaultHeaderImg}></Image>
            </View>
            <View className="userMsg">
              <View className="userDetail" onClick={() => { Taro.navigateTo({ url: '/pages/addResume/index' }) }}>
                <View className="userName">
                  <View className="text">{userInfo.name}</View>
                  <View className='edit'>
                    <Image src={icon.edit} className='editImg'></Image>
                  </View>
                </View>
                <View className="createResume" >编辑简历</View>
              </View>

            </View>
          </View>
          <View className="communicationBox">
            <View className="castResume" onClick={() => {
              Taro.navigateTo({ url: '/pages/castedResume/index' })
            }}>
              <View className="resumeCount">{userInfo.resumeTotol || 0}</View>
              <View className="resumeTitle">已投简历</View>
            </View>
            <View className="line"></View>
            <View className="castResume" onClick={() => {
              Taro.navigateTo({ url: '/pages/myCollect/index' })
            }}>
              <View className="resumeCount">{userInfo.collectionTotol || 0}</View>
              <View className="resumeTitle">我的收藏</View>
            </View>
            <View className="line"></View>
            <View className="castResume" onClick={() => {
              Taro.navigateTo({ url: '/pages/history/index' })
            }}>
              <View className="resumeCount">{userInfo.historyTotol || 0}</View>
              <View className="resumeTitle">浏览历史</View>
            </View>
          </View>
        </View>
        <View className="settingList">
          <AtList>
            <AtListItem title='求职意向' arrow='right' iconInfo={{ value: 'tag', size: 25, color: 'black' }} onClick={() => {
              Taro.navigateTo({ url: '/pages/jobIntention/index' })
            }} />
            <AtListItem title='我的简历' arrow='right' iconInfo={{ value: 'list', size: 25, color: 'black' }} onClick={() => { Taro.navigateTo({ url: '/pages/myResume/index' }) }} />
            <AtListItem title='隐私设置' arrow='right' iconInfo={{ value: 'settings', size: 25, color: 'black' }} onClick={() => { Taro.navigateTo({ url: '/pages/privicy/index' }) }} />
            <AtListItem title='意见反馈' arrow='right' iconInfo={{ value: 'help', size: 25, color: 'black' }} onClick={() => { Taro.navigateTo({ url: '/pages/feedback/index' }) }} />
            <AtListItem title='法律咨询' arrow='right' iconInfo={{ value: 'file-code', size: 25, color: 'black' }} onClick={() => { Taro.navigateTo({ url: '/pages/law/index' }) }} />
            <AtListItem title='联系客服' arrow='right' iconInfo={{ value: 'message', size: 25, color: 'black' }} onClick={() => {
              //TODO缺少企业参数
              Taro.showModal({
                title: '温馨提示',
                content: '可依还未创建企业，我们相约再见~',
                confirmText: '好的~',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                  }
                }
              })
              // Taro.openCustomerServiceChat({
              //   extInfo: { url: '' },
              //   corpId: '',
              //   success: function (res) {
              //     console.log('res: ', res);
              //   }
              // })
            }} />
          </AtList>
        </View>
        <View className="quitLogin" onClick={() => {
          Taro.clearStorage()
          Taro.redirectTo({ url: '/pages/index/index' })
          setTimeout(() => {
            Taro.showToast({ title: '退出成功', icon: 'success' })
          }, 100)
        }}>退出登录</View>
      </View> : <View className='userBox'>
        <View className="background">
          <View className="userBox">
            <View className="box">
              <Image src={hrInfo?.hrheaderImg?.substr(0, hrInfo?.hrheaderImg.lastIndexOf("?")) || tmp.defaultHeaderImg} className="avatar" onClick={() => {
                Taro.chooseMessageFile({
                  count: 1, type: 'image', success: (e) => {
                    Taro.uploadFile({
                      url: Config.UPLOAD_HOME + `?url=${'headerImg'}&account=${hrInfo.account}`,
                      filePath: e.tempFiles[0].path,
                      header: {
                        'Content-Type': 'multipart/form-data',
                        'authorization': Taro.getStorageSync("token"),  //如果需要token的话要传
                      },
                      name: "file",
                      success: (res) => {
                        if (res.data) {
                          effect(NCompany.Name, NCompany.update, { hrheaderImg: JSON.parse(res.data).data }, (res) => {
                            if (res.data) {
                              effect(NLogin.Name, NLogin.hrInfo, {})
                              Taro.showToast({
                                title: '修改成功',
                                icon: 'success',
                                duration: 1000
                              })
                            }
                          })
                        }
                      },
                    });
                  }
                })
              }}>
              </Image>
              <Image src={icon.edit3} className='icon'></Image>
            </View>
            <View className="userMsg">
              <View className="userDetail" onClick={() => {
                reducer(NGlobal.Name, RSetState, { editCompantInfo: true })
                Taro.navigateTo({ url: '/pages/companyDetail/index' })
              }}>
                <View className="userName">
                  <View className="text">{hrInfo.hrName}</View>
                  <View className='edit'>
                    <Image src={icon.edit} className='editImg'></Image>
                  </View>
                </View>
                <View className="createResume editCompany" >企业信息编辑</View>
              </View>
            </View>
          </View>
          <View className="communicationBox">
            <View className="castResume" onClick={() => {
              Taro.navigateTo({ url: '/pages/reciveResume/index' })
            }}>
              <View className="resumeCount">{hrInfo.deliveryTotal || 0}</View>
              <View className="resumeTitle">我收到的</View>
            </View>
            <View className="line"></View>
            <View className="castResume" onClick={() => {
              Taro.navigateTo({ url: '/pages/myMake/index' })
            }}>
              <View className="resumeCount">{hrInfo.collectionTotal || 0}</View>
              <View className="resumeTitle">我的标记</View>
            </View>
            <View className="line"></View>
            <View className="castResume" onClick={() => {
              Taro.navigateTo({ url: '/pages/history/index' })
            }}>
              <View className="resumeCount">{hrInfo.historyTotal || 0}</View>
              <View className="resumeTitle">浏览历史</View>
            </View>
          </View>
        </View>
        <View className="settingList">
          <AtList>
            <AtListItem title='发布岗位' arrow='right' iconInfo={{ value: 'add-circle', size: 25, color: 'black' }} onClick={() => {
              if (!companyInfo.introduce) {
                reducer(NGlobal.Name, RSetState, { editCompantInfo: true })
                Taro.showModal({
                  title: '温馨提示',
                  content: '请先完善企业信息，在进行发布岗位',
                  success: function (res) {
                    if (res.confirm) {
                      Taro.navigateTo({ url: '/pages/companyDetail/index' })
                    } else if (res.cancel) { }
                  }
                })
              } else {
                reducer(NCompany.Name, RSetState, { stationInfo: {} })
                Taro.navigateTo({ url: '/pages/postJob/index' })
              }
            }} />
            <AtListItem title='意见反馈' arrow='right' iconInfo={{ value: 'help', size: 25, color: 'black' }} onClick={() => { Taro.navigateTo({ url: '/pages/feedback/index' }) }} />
            <AtListItem title='法律咨询' arrow='right' iconInfo={{ value: 'file-code', size: 25, color: 'black' }} onClick={() => { Taro.navigateTo({ url: '/pages/law/index' }) }} />
            <AtListItem title='联系客服' arrow='right' iconInfo={{ value: 'message', size: 25, color: 'black' }} onClick={() => {
              //TODO缺少企业参数
              Taro.showModal({
                title: '温馨提示',
                content: '可依还未创建企业，我们相约再见~',
                confirmText: '好的~',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              })
            }} />
          </AtList>
        </View>
        <View className="quitLogin" onClick={() => {
          Taro.clearStorage()
          Taro.redirectTo({ url: '/pages/index/index' })
          setTimeout(() => {
            Taro.showToast({ title: '退出成功', icon: 'success' })
          }, 100)
        }}>退出登录</View>
      </View>}
    </Layout>
  )
}
