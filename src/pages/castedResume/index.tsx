import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect } from "react";
import { AtTabs, AtTabsPane } from "taro-ui";
import icon from "../../assets/icon";
import tmp from "../../assets/tmp";
import CloumnLine from "../../component/cloumnLine";
import { offerStatus, RSetState } from "../../config/Constants";
import { NDelivery } from "../../models/Delivery";
import { NGlobal } from "../../models/Global";
import { NHistory } from "../../models/History";
import { NLogin } from "../../models/Login";
import { NStation } from "../../models/Station";
import { effect, reducer, useStore } from "../../utils/dva16";
import './index.less'


export default () => {
  // ----------------------常量-------------------------
  const { currentOfferStatus } = useStore(NGlobal.Name)
  const { data } = useStore(NDelivery.Name)
  // ----------------------生命周期----------------------
  useEffect(() => {
    effect(NDelivery.Name, NDelivery.get, { isView: offerStatus[currentOfferStatus] })
  }, [])
  // ----------------------响应函数----------------------
  const postResume = (v: any) => {
    reducer(NStation.Name, RSetState, { positionDetail: v })
    effect(NHistory.Name, NHistory.save, { stationid: v?.id }, (res) => {
      if (res.data) {
        effect(NLogin.Name, NLogin.info, {})
      }
    })
    Taro.navigateTo({ url: '/pages/positionDetail/index' })
  }
  // ----------------------渲染函数----------------------
  return (
    <View className='index' >
      <AtTabs current={currentOfferStatus} animated tabList={offerStatus.map((title) => ({ title }))} onClick={(e) => {
        reducer(NGlobal.Name, RSetState, { currentOfferStatus: e })
        effect(NDelivery.Name, NDelivery.get, { isView: offerStatus[e] })
      }}>
        {data && data.map((v) => {
          let info = v.station
          return <View className="castedList">
            {offerStatus.map((value, i) => (
              <AtTabsPane current={currentOfferStatus} key={value} index={i}>
                {<View className="castedBox" onClick={() => { postResume(info) }}>
                  <View className="positionBox">
                    <Image src={v.station.company.headerImg || tmp.defaultHeaderImg} className='header'></Image>
                    <View className="positionMsg">
                      <View className="name">{v.station.name}</View>
                      <View className="company">
                        <View>{v.station.company.name}</View>
                        <CloumnLine />
                        <View>{v.station.company.city}</View>
                      </View>
                      <View className="salary">{v.station.salaryDown}-{v.station.salaryUp} {v.station.salaryType}</View>
                    </View>
                  </View>
                  <View className="otherBox">
                    <View className="time">{v.updatedat}</View>
                    <View className="chatBotton" >
                      <Image src={icon.chat} className='icon'></Image>
                      沟通</View>
                  </View>
                </View>
                }
              </AtTabsPane>
            ))}
          </View>
        })}
      </AtTabs>
    </View>
  )
}
