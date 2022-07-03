import { Image, Input, Picker, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { AtTabs, AtTabsPane } from "taro-ui";
import icon from "../../assets/icon";
import tmp from "../../assets/tmp";
import CloumnLine from "../../component/cloumnLine";
import CompanyTargetView from "../../component/companyTargetView";
import { companyTabList, financing_status, personNumber, RSetState } from "../../config/Constants";
import { NCompany } from "../../models/Company";
import { NGlobal } from "../../models/Global";
import { NStation } from "../../models/Station";
import { reducer, useStore } from "../../utils/dva16";
import './index.less'

export default () => {
  // ----------------------常量-------------------------
  const { currentCompanyIndex, editCompantInfo } = useStore(NGlobal.Name)
  const { companyDetail } = useStore(NStation.Name)
  const { companyInfo } = useStore(NCompany.Name)
  const [edit, setEdit] = useState({
    name: false,
    financing_status: false
  })
  const [editInfo, setEditInfo] = useState({
    name: '',
    financing_status: -1,
    city: '',
    peopleMin: '',
    peopleMax: '',
    headerImg: '',
    introduce: '',
    environment: { value: ['', '', '', '', ''] },
    address: ''
  })
  // ----------------------生命周期----------------------
  useEffect(() => {
    companyInfo && setEditInfo({
      ...editInfo, name: companyInfo.name,
      financing_status: companyInfo.financing_status,
      city: companyInfo.city, peopleMin: companyInfo.peopleMin,
      peopleMax: companyInfo.peopleMax,
      headerImg: companyInfo.headerImg,
      introduce: companyInfo.introduce,
      environment: companyInfo.environment || { value: ['', '', '', '', ''] },
      address: companyInfo.address
    })
  }, [])

  // ----------------------响应函数----------------------
  const onPickerImg = () => {
    Taro.chooseMessageFile({
      count: 1, type: 'image', success: (e) => {
        setEditInfo({ ...editInfo, headerImg: e.tempFiles[0].path })
      }
    })
  }
  // ----------------------渲染函数----------------------
  return (
    <View className='index' >
      <View className="companyBox">
        <View className="companyMsg">
          {!editCompantInfo ? <View className="name">{companyDetail.name}</View> : !edit.name ? <View className="name">{editInfo.name || '企业名称'}<Image src={icon.edit2} className="icon" onClick={() => { setEdit({ ...edit, name: true }) }}></Image></View> : <Input className="name input" focus onInput={({ detail }) => {
            setEditInfo({ ...editInfo, name: detail.value })
          }} onBlur={() => {
            setEdit({ ...edit, name: false })
          }}>{companyDetail.name || '企业名称'}</Input>}
          <View className="companyMsgBriefBox">
            {!editCompantInfo ? <View className="address">{financing_status[companyDetail.financing_status]}</View> :
              <Picker mode='selector' range={financing_status} value={0} onChange={({ detail }) => {
                setEditInfo({ ...editInfo, financing_status: parseInt(detail.value as string) })
              }}>
                <View className="address">{financing_status[editInfo.financing_status] || '融资'}
                  <Image src={icon.selectDown} className="icon" onClick={() => { setEdit({ ...edit, name: true }) }}></Image>
                </View>
              </Picker>
            }
            <CloumnLine />
            {!editCompantInfo ? <View className="type">{companyDetail.city}</View> :
              <Picker mode='region' value={['', '', '']} onChange={({ detail }) => {
                setEditInfo({ ...editInfo, city: detail.value[1] })
              }}>
                <View className="type">{editInfo.city || '地点'}
                  <Image src={icon.selectDown} className="icon" onClick={() => { setEdit({ ...edit, name: true }) }}></Image>
                </View>
              </Picker>}
            <CloumnLine />
            {!editCompantInfo ? <View className="education">{companyDetail.peopleMin}-{companyDetail.peopleMax}人</View> :
              <Picker mode='selector' range={personNumber} onChange={({ detail }) => {
                let tmp = personNumber[detail.value].split('-')
                setEditInfo({ ...editInfo, peopleMin: tmp[0], peopleMax: tmp[1] })
              }}>
                <View className="education">{editInfo.peopleMin ? `${editInfo.peopleMin}-${editInfo.peopleMax}人` : '人数'}
                  <Image src={icon.selectDown} className="icon" onClick={() => { setEdit({ ...edit, name: true }) }}></Image>
                </View>
              </Picker>}
          </View>
        </View>
        <View className="box">
          {!editCompantInfo ?
            <Image src={companyDetail.headerImg || tmp.defaultHeaderImg} className="logo">
            </Image> :
            <Image src={editInfo.headerImg || tmp.defaultHeaderImg} className="logo" onClick={() => { onPickerImg() }}>
            </Image>}
          {editCompantInfo && <Image src={icon.edit3} className='icon'></Image>}
        </View>
      </View>
      <View className="iterview"></View>
      <View className="companyDetailBox">
        <AtTabs current={currentCompanyIndex} animated tabList={companyTabList.map((title) => ({ title }))} onClick={(e) => {
          reducer(NGlobal.Name, RSetState, { currentCompanyIndex: e })
        }}>
          {companyTabList.map((v, i) => (
            <AtTabsPane current={currentCompanyIndex} index={i} key={v}>
              <CompanyTargetView
                value={currentCompanyIndex}
                editInfo={editInfo}
                setEditInfo={setEditInfo}
                editCompantInfo={editCompantInfo}
                station={companyInfo.station}
              ></CompanyTargetView>
            </AtTabsPane>
          ))}
        </AtTabs>
      </View>
    </View >
  )
}
