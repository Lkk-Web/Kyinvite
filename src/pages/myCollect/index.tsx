import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect } from "react";
import icon from "../../assets/icon";
import tmp from "../../assets/tmp";
import CloumnLine from "../../component/cloumnLine";
import { RSetState } from "../../config/Constants";
import { NCollect } from "../../models/Collect";
import { NHistory } from "../../models/History";
import { NLogin } from "../../models/Login";
import { NStation } from "../../models/Station";
import { effect, reducer, useStore } from "../../utils/dva16";
import './index.less'


export default () => {
  // ----------------------常量-------------------------
  const { data } = useStore(NCollect.Name)
  console.log('data: ', data);
  // ----------------------生命周期----------------------
  useEffect(() => {
    effect(NCollect.Name, NCollect.get, {})
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
      {data && data.map((v) => {
        let value = v.station
        return <View className="castedList">
          {<View className="castedBox" onClick={() => {
            postResume(value)
          }}>
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
              <View className="chatBotton">
                <Image src={icon.chat} className='icon'></Image>
                沟通</View>
            </View>
          </View>
          }
        </View>
      })}
    </View>
  )
}
