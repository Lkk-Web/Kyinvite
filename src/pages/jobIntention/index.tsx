import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect } from "react";
import icon from "../../assets/icon";
import image from "../../assets/img";
import SalarySelect from "../../component/salarySelect";
import { RSetState } from "../../config/Constants";
import { NLogin } from "../../models/Login";
import { NSearch } from "../../models/Search";
import { NUser } from "../../models/User";
import { effect, reducer, useStore } from "../../utils/dva16";
import './index.less'
export default () => {
  // ----------------------常量-------------------------
  const { positionSelect, addressSelect, salary } = useStore(NUser.Name)
  // ----------------------生命周期----------------------
  useEffect(() => {
    effect(NLogin.Name, NLogin.info, {}, (res) => {
      if (res.data) {
        console.log('res: ', res.data.station);
        reducer(NUser.Name, RSetState, { positionSelect: res.data.station?.station || [] })
        reducer(NUser.Name, RSetState, { addressSelect: res.data.station?.address || [] })
        reducer(NUser.Name, RSetState, { salary: res.data.station?.salary || { min: null, max: null } })
      }
    })  //调试

  }, [])
  // ----------------------响应函数----------------------
  const check = () => {
    if ((!salary.min || !salary.max) || (salary.min - salary.max > 0)) return '期望薪资不合规'
    if (positionSelect.length == 0) return '期望岗位不合规'
    if (addressSelect.length == 0) return '期望城市不合规'
  }
  // ----------------------渲染函数----------------------
  return (
    <View className='index' >
      <View className="title">期望薪资</View>
      <SalarySelect salaryType={'千元/月'} />
      <View className="expectionJob" onClick={() => {
        reducer(NSearch.Name, RSetState, { isBind: true, currentSearchIndex: 1 })
        Taro.navigateTo({ url: '/pages/search/index' })
      }}>
        <View className="box">
          <Image className='jobImage' src={image.portfolio}></Image>
          <View className="textBox">
            <View className="titleText">期望岗位</View>
            {
              positionSelect?.map((v, i) => {
                if (positionSelect.length == i + 1) return <View className="view">{v.value}</View>
                return <View className="view">{v.value}、</View>
              })
            }
          </View>
        </View>
        <Image className='icon' src={icon.outlined}></Image>
      </View>
      <View className="expectionCity" onClick={() => {
        reducer(NSearch.Name, RSetState, { isBind: true, currentSearchIndex: 3 })
        Taro.navigateTo({ url: '/pages/search/index' })
      }}>
        <View className="box">
          <Image className='mapImage' src={image.map}></Image>
          <View className="textBox">
            <View className="titleText">期望城市</View>
            <View className="text">{addressSelect?.map((v, i) => {
              if (addressSelect.length == i + 1) return v.value
              return v.value + '、'
            })}</View>
          </View>
          <Image className='icon' src={icon.outlined}></Image>
        </View>
      </View>
      <View className="bind" onClick={() => {
        if (check()) {
          Taro.showToast({
            title: check() as any,
            icon: 'error',
            duration: 1000
          })
        } else {
          effect(NUser.Name, NUser.stationUpdate, { station: positionSelect, address: addressSelect, salary })
          Taro.navigateBack()
          Taro.showToast({
            title: '绑定成功',
            icon: 'success',
            duration: 500
          })
        }
      }}>绑定</View>
    </View>
  )
}
