import { View } from "@tarojs/components";
import PositionView from "../../component/positionView";
import { NSearch } from "../../models/Search";
import { useStore } from "../../utils/dva16";
import './index.less'

export default () => {
  // ----------------------常量-------------------------
  const { searchResult } = useStore(NSearch.Name)
  // ----------------------生命周期----------------------
  // ----------------------响应函数----------------------
  // ----------------------渲染函数----------------------
  return (
    <View className='index' >
      <PositionView positionArray={searchResult} />
    </View>
  )
}
