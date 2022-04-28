import { Image, Input, View } from "@tarojs/components";
import { useState } from "react";
import { AtTabs, AtTabsPane } from "taro-ui";
import icon from "../../assets/icon";
import TargetView from "../../component/TargetView";
import { tabList } from "../../config/Constants";
import './index.less'

export default () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  return (
    <View className='index' >
      <View className="searchBox">
        <Input className="search" type='text' placeholder='搜索职位、企业' focus />
        <Image className="searchIcon" src={icon.search}></Image>
      </View>
      <AtTabs current={currentIndex} animated tabList={tabList.map((title) => ({ title }))} onClick={(e) => {
        setCurrentIndex(e)
      }}>
        {tabList.map((v, i) => (
          <AtTabsPane current={currentIndex} index={i} key={v}>
            <TargetView
              value={currentIndex}
            ></TargetView>
          </AtTabsPane>
        ))}
      </AtTabs>
    </View>
  )
}
