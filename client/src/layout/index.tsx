import { useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.less'
import { RSetState, TAB_BAR } from '../config/Constants'
import { reducer, useStore } from '../utils/dva16'
import { NGlobal } from '../models/Global'

export default (props) => {
  const { children, menuIndex, bgColor } = props
  const { safeAreaHeight, tabBarHeight } = useStore(NGlobal.Name)
  useEffect(() => {
    Taro.hideTabBar()
    setTimeout(() => {
      Taro.createSelectorQuery()
        .select('.bottom_tab')
        .boundingClientRect((rect) => {
          if (rect) {
            let { height } = rect
            reducer(NGlobal.Name, RSetState, { tabBarHeight: height })
          }
        })
        .exec()
    }, 300)
  }, [])
  return (
    <View className="layout_container">
      <View
        style={{
          minHeight: `calc(100vh - ${tabBarHeight}px)`,
          paddingBottom: `${tabBarHeight + 20}px`,
          backgroundColor: bgColor,
          overflow: 'auto',
        }}
      >
        {children}
      </View>
      <View className="rowStartCenter bottom_tab">
        {TAB_BAR.map((item, index) => (
          <View
            key={index}
            className="rowStartCenter tab_item"
            style={{ paddingBottom: `${safeAreaHeight ? safeAreaHeight - 20 : 20}px` }}
            onClick={() => {
              console.log('item.pagePath: ', item.pagePath);
              Taro.switchTab({ url: item.pagePath })
            }}
          >
            <View className='tab_box'>
              <Image className="tab_icon" src={menuIndex === index ? item.selectedIconPath : item.iconPath} />
              <Text className={`tab_name ${menuIndex === index ? 'tab_name_active' : ''}`}>{item.text}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
