import { Input, Swiper, SwiperItem, Text, View, Image, ScrollView, Picker } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { AtIcon } from "taro-ui";
import icon from "../../assets/icon";
import image from "../../assets/img";
import PeopleView from "../../component/peopleView";
import PositionView from "../../component/positionView";
import { degree, EUserRole, RSetState } from "../../config/Constants";
import Layout from '../../layout'
import { NCollect } from "../../models/Collect";
import { NGlobal } from "../../models/Global";
import { NSearch } from "../../models/Search";
import { NSetting } from "../../models/Setting";
import { NStation } from "../../models/Station";
import { NUser } from "../../models/User";
import { effect, reducer, useStore } from "../../utils/dva16";
import './index.less'


export default () => {
  // ----------------------常量-------------------------
  const { tabBarHeight, userRole } = useStore(NGlobal.Name)
  const { pageNum, pageSize, positionArray } = useStore(NStation.Name)
  const { pageNumHr, pageSizeHr, userArray } = useStore(NUser.Name)
  const { searchHomeStation, searchHomeAddress } = useStore(NSearch.Name)
  const { bannerImg } = useStore(NSetting.Name)
  const [topHeight, setTopHeight] = useState(0)
  const [titleHeight, setTitleHeight] = useState(0)
  const [refresh, setRefresh] = useState(true)
  const [searchValue, setSearchValue] = useState({
    degree: -1,
  })
  // ----------------------生命周期----------------------
  useEffect(() => {
    effect(NSetting.Name, NSetting.get, {})
    if (userRole == EUserRole.user) {
      // effect(NLogin.Name, NLogin.info, {})  //调试，慎开
      effect(NCollect.Name, NCollect.get, {})
      reducer(NStation.Name, RSetState, { pageNum: 1, pageSize: 5 })
      effect(NStation.Name, NStation.list, { pageNum, pageSize })
    } else {
      // effect(NLogin.Name, NLogin.hrInfo, {})  //调试，慎开
      reducer(NUser.Name, RSetState, { pageNumHr: 1, pageSizeHr: 5 })
      effect(NUser.Name, NUser.list, { pageNumHr, pageSizeHr })
    }
  }, [])
  useEffect(() => {
    setTimeout(() => {
      let query = Taro.createSelectorQuery();
      query
        .select(".heightBox")
        .boundingClientRect((rect) => {
          if (rect) {
            const { height } = rect;
            setTopHeight(height);
          }
        })
        .exec();
    }, 300);
  }, [])
  useEffect(() => {
    setTimeout(() => {
      let query = Taro.createSelectorQuery();
      query
        .select(".title")
        .boundingClientRect((rect) => {
          if (rect) {
            const { height } = rect;
            setTitleHeight(height);
          }
        })
        .exec();
    }, 300);
  }, [])
  // ----------------------响应函数----------------------
  const routePage = (e: number) => {
    Taro.navigateTo({
      url: `/pages/search/index`,
      success: function () {
        reducer(NSearch.Name, RSetState, { currentSearchIndex: e })
      }
    })
  }

  let salaryRange = [] as any
  for (let i = 0; i < 100; i++) {
    salaryRange.push(`${i}K`)
  }
  //触底刷新
  const onReachBottom = () => {
    if (userRole == EUserRole.user) {
      reducer(NStation.Name, RSetState, { pageNum: pageNum + 1, pageSize: 5 })
      effect(NStation.Name, NStation.list, { pageNum: pageNum + 1, pageSize })
    } else {
      reducer(NUser.Name, RSetState, { pageNumHr: pageNumHr + 1, pageSizeHr: 5 })
      effect(NUser.Name, NUser.list, { pageNumHr: pageNumHr + 1, pageSizeHr })
    }
  }

  const onRefresherPulling = () => {
    if (userRole == EUserRole.user) {
      reducer(NStation.Name, RSetState, { pageNum: pageNum + 1, pageSize: 5 })
      effect(NStation.Name, NStation.list, { pageNum: pageNum + 1, pageSize, sign: 1 })
    } else {
      reducer(NUser.Name, RSetState, { pageNumHr: 1, pageSizeHr: 5 })
      effect(NUser.Name, NUser.list, { pageNumHr: pageNumHr + 1, pageSizeHr, sign: 1 })
    }
  }
  // ----------------------渲染函数----------------------
  return (
    <Layout menuIndex={0} bgColor="#ffffff">
      <View className='indexBox'>
        <View className="bannerBg">
          <Swiper
            className='banner'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
            autoplay>
            {userRole == EUserRole.user ?
              bannerImg?.[0]?.banner && bannerImg[0].banner.map((v) => {
                return <SwiperItem>
                  <Image src={v || ''} className='demo'></Image>
                </SwiperItem>
              })
              : bannerImg?.[0]?.banner && bannerImg[0].hrbanner.map((v) => {
                return <SwiperItem>
                  <Image src={v} className='demo'></Image>
                </SwiperItem>
              })
            }
          </Swiper>
        </View>
        <View className="bead"></View>
        <View className="contentBg">
          {userRole == EUserRole.user ?
            <View className="heightBox">
              <View className="indexButton">
                <View className="buttonBox" onClick={() => { routePage(1) }}>
                  <Image src={image.occupation} className='buttonSearch'></Image>
                  <Text>职位</Text>
                </View>
                <View className="buttonBox" onClick={() => { routePage(2) }}>
                  <Image src={image.wallet} className='buttonSearch'></Image>
                  <Text>待遇</Text>
                </View>
                <View className="buttonBox" onClick={() => { routePage(3) }}>
                  <Image src={image.address} className='buttonSearch'> </Image>
                  <Text>地点</Text>
                </View>
              </View>
              <View className="line"></View>
              <View className="searchBox">
                <Input className="search" disabled type='text' placeholder='搜索职位、企业' onClick={() => {
                  routePage(0)
                }} />
                <Image className="searchIcon" src={icon.search}></Image>
              </View>
            </View>
            :
            <View className="heightBox">
              <View className="conditionTitle">筛选条件</View>
              <View className="buttonBox">
                <View className="button" onClick={() => {
                  reducer(NSearch.Name, RSetState, { isHome: true, currentSearchIndex: 1 })
                  Taro.navigateTo({ url: '/pages/search/index' })
                }}>{searchHomeStation || '职位'}</View>
                <Picker mode='selector' range={degree} value={searchValue.degree} onChange={({ detail }) => {
                  setSearchValue({ ...searchValue, degree: detail.value as any })
                }}>
                  {searchValue.degree != -1 ? <View className="button">{`${degree[searchValue.degree]}以上`}</View> : <View className="button">学历下限<AtIcon value='chevron-down' size='15' color='#ffffff' className="right"></AtIcon></View>}
                </Picker>
                <View className="button" onClick={() => {
                  reducer(NSearch.Name, RSetState, { isHome: true, currentSearchIndex: 3 })
                  Taro.navigateTo({ url: '/pages/search/index' })
                }}>{searchHomeAddress || '地点'}</View>
              </View>
              <View className="searchButton" onClick={() => {
                reducer(NUser.Name, RSetState, { pageNumHr: 1, pageSizeHr: 5 })
                effect(NUser.Name, NUser.hrSearch, { pageNumHr, pageSizeHr: 5, degree: searchValue.degree, name: searchHomeStation, city: searchHomeAddress }, (res) => {
                  if (res.data) {
                    reducer(NSearch.Name, RSetState, { searchHomeStation: '', searchHomeAddress: '' })
                    setSearchValue({ degree: -1 })
                    Taro.showToast({
                      title: '搜索成功',
                      icon: 'success',
                      duration: 1000
                    })
                  }
                })
              }}>搜索</View>
            </View>}
          <View className="title">推荐</View>
          <View className="line"></View>
          <ScrollView
            style={{
              height: `calc(100vh - 165px - 29px - 16px - ${topHeight}px - ${titleHeight}px - ${tabBarHeight}px)`,
            }}
            scrollY
            refresherEnabled
            refresherTriggered={refresh}
            enableBackToTop={true}
            lowerThreshold={50}
            onScrollToLower={() => {
              onReachBottom()
            }}
            onRefresherRefresh={() => {
              setTimeout(function () {
                setRefresh(false)
              }, 100);
              setRefresh(true)
              onRefresherPulling()
            }}
          >
            {userRole == EUserRole.user ? <PositionView positionArray={positionArray} /> : <PeopleView userArray={userArray} />}
          </ScrollView>
        </View>
      </View>
    </Layout>
  )
}
