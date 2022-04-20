import { Image, Input, View } from "@tarojs/components";
import { useState } from "react";
import { AtTabs, AtTabsPane } from "taro-ui";
import icon from "../../assets/icon";
import './index.less'

export default () => {
  const tabList = ['标签页1']
  const [currentIndex, setCurrentIndex] = useState(0)
  return (
    <View className='index' >
      <View className="searchBox">
        <Input className="search" type='text' placeholder='搜索职位、企业' />
        <Image className="searchIcon" src={icon.search}></Image>
      </View>
      {/* <AtTabs current={currentIndex} tabList={tabList.map((title) => ({ title }))} onClick={setCurrentIndex}>
        {tabList.map((name, i) => (
          <AtTabsPane current={currentIndex} index={i}>
            <View style="background-color: #FAFBFC;text-align: center;"> */}
      {/* {targetsByType[i].map((vo, j) => ( */}
      {/* <TargetView
                  value={vo}
                  onChange={(newVo) => {
                    updateTarget(i, j, newVo)
                  }}
                  onDelete={() => {
                    deleteTarget(i, j)
                  }}
                ></TargetView> */}
      {/* ))} */}
      {/* <View
                  className="add-new-punch"
                  onClick={() => {
                    addTargetByType(i)
                  }}
                >
                  + 点击添加打卡项
                </View> */}
      {/* </View>
          </AtTabsPane>
        ))}
      </AtTabs> */}
    </View>
  )
}
