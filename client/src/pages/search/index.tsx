import { Image, Input, View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import icon from "../../assets/icon";
import TargetView from "../../component/TargetView";
import { RSetState, tabList } from "../../config/Constants";
import { NGlobal } from "../../models/Global";
import { reducer, useStore } from "../../utils/dva16";
import './index.less'

export default () => {
  const { currentIndex } = useStore(NGlobal.Name)
  return (
    <View className='index' >
      <View className="searchBox">
        <Input className="search" type='text' placeholder='搜索职位、企业' focus />
        <Image className="searchIcon" src={icon.search}></Image>
      </View>
      <AtTabs current={currentIndex} animated tabList={tabList.map((title) => ({ title }))} onClick={(e) => {
        reducer(NGlobal.Name, RSetState, { currentIndex: e })
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
