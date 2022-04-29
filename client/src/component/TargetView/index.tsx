import { Image, Picker, View } from "@tarojs/components"
import { useEffect } from "react";
import { AtList, AtListItem } from "taro-ui";
import icon from "../../assets/icon";
import { RSetState } from "../../config/Constants";
import { NUser } from "../../models/user";
import { reducer, useStore } from "../../utils/dva16";
import '../index.less'

export default ({ value }) => {
    // ----------------------常量-------------------------
    const { userInfo: { area } } = useStore(NUser.Name)
    // ----------------------生命周期----------------------
    // ----------------------响应函数----------------------
    // ----------------------渲染函数----------------------
    return (
        <View className="TargetViewBox">
            {value == 0 && <View className="TargetViewSearch">
                <View>搜索历史</View>
                <View className="searchKeyBox">
                    <View className="searchKey">后端</View>
                </View>
            </View>}
            {value == 1 && <View className="TargetViewJob">
                <View className="choice">
                    <View className="choiceType">互联网</View>
                </View>
                <View className="choiceResultBox">
                    <View className="choiceResult">
                        <View className="line"></View>
                        <View>产品</View>
                        <View className="line"></View>
                    </View>
                    <View className="choiceResultJob">
                        <View className="choiceResultJobType">
                            产品经理
                        </View>
                    </View>
                </View>
            </View>}
            {value == 3 && <View className="TargetViewJob">
                <View className="choice">
                    <View className="choiceType">省</View>
                </View>
                <View className="choiceResultBox">
                    <View className="currentAddress">当前定位</View>
                    <Picker mode='region' value={area} onChange={(res) => {
                        reducer(NUser.Name, RSetState, { userInfo: { area: res.detail.value } })
                    }}>
                        <AtList>
                            <View className="choiceResultJob" >
                                <View className="choiceResultJobType" >
                                    <Image src={icon.address} className='addressIcon'></Image>{area[1]}
                                </View>
                            </View>
                        </AtList>
                    </Picker>
                    <View className="hotAddress">热门城市</View>
                </View>
            </View>}

        </View>
    )
}