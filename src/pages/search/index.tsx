import { Image, Input, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Fragment, useEffect, useState } from "react";
import { AtTabs, AtTabsPane } from "taro-ui";
import icon from "../../assets/icon";
import TargetView from "../../component/TargetView";
import { RSetState, tabList } from "../../config/Constants";
import { NSearch } from "../../models/Search";
import { effect, reducer, useStore } from "../../utils/dva16";
import './index.less'

export default () => {
  // ----------------------常量-------------------------
  const { isBind, isPost, isHome, currentSearchIndex } = useStore(NSearch.Name)
  let { searchHistory } = useStore(NSearch.Name)
  const [searchText, setSearchText] = useState('')
  // ----------------------生命周期----------------------
  useEffect(() => {
    try {
      Taro.getStorage({
        key: 'search_history',
        success: function (res) {
          reducer(NSearch.Name, RSetState, { searchHistory: res.data })
        },
        fail: function () {
          Taro.setStorage({
            key: 'search_history',
            data: []
          })
        },
      })
    } catch (error) {
    }
  }, [])
  // ----------------------响应函数----------------------
  const search = async () => {
    searchHistory.unshift(searchText)
    if (searchHistory.length > 20) {
      searchHistory.pop()
    }
    reducer(NSearch.Name, RSetState, { searchHistory: searchHistory })
    await Taro.setStorage({
      key: 'search_history',
      data: searchHistory
    })
    effect(NSearch.Name, NSearch.search, { name: searchText }, (res) => {
      if (res) {
        Taro.navigateTo({ url: '/pages/searchResult/index' })
      }
    })
  }
  // ----------------------渲染函数----------------------
  return (
    <View className='index' >
      {
        (isBind || isPost || isHome) ? <TargetView
          value={currentSearchIndex}
        ></TargetView> :
          <Fragment>
            <View className="searchBox">
              <Input className="search" type='text' placeholder='搜索职位、企业' focus={currentSearchIndex == 0} onInput={({ detail }) => {
                setSearchText(detail.value)
              }} />
              <Image className="searchIcon" src={icon.search} onClick={() => {
                if (!searchText) {
                  Taro.showToast({
                    title: '您输入内容为空',
                    icon: 'error',
                    duration: 1000
                  })
                } else {
                  search()
                }
              }}></Image>
            </View>
            <AtTabs current={currentSearchIndex} animated tabList={tabList.map((title) => ({ title }))} onClick={(e) => {
              reducer(NSearch.Name, RSetState, { isBind: false, currentSearchIndex: e })
            }}>
              {tabList.map((v, i) => (
                <AtTabsPane current={currentSearchIndex} index={i} key={v}>
                  <TargetView
                    value={currentSearchIndex}
                  ></TargetView>
                </AtTabsPane>
              ))}
            </AtTabs>
          </Fragment>
      }
    </View>
  )
}
