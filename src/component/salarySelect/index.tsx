import { Input, View } from "@tarojs/components"
import { RSetState } from "../../config/Constants"
import { NUser } from "../../models/User"
import { reducer, useStore } from "../../utils/dva16"
import '../index.less'

export default (props) => {
    const { salaryType, setTextAreaDetail, textAreaDetail, type, setTreatmentSearch, treatmentSearch } = props
    // ----------------------常量-------------------------
    const { salary } = useStore(NUser.Name)
    // ----------------------生命周期----------------------
    // ----------------------响应函数----------------------
    // ----------------------渲染函数----------------------
    return (
        <View className="salarySelect">
            <Input type="number" className="numberInput" maxlength={3} value={type == 'postStation' ? textAreaDetail.salaryDown : type == 'search' ? treatmentSearch.salaryDown : salary?.min} onInput={({ detail }) => {
                if (type == 'postStation') {
                    setTextAreaDetail({ ...textAreaDetail, salaryDown: detail.value })
                }
                if (type == 'search') {
                    setTreatmentSearch({ ...treatmentSearch, salaryDown: detail.value })
                } else {
                    reducer(NUser.Name, RSetState, { salary: { ...salary, min: detail.value } })
                }
            }} ></Input>
            <View>{salaryType == '千元/月' ? 'K' : '￥'}</View>
            <View>~</View>
            <Input type="number" className="numberInput" maxlength={3} value={type == 'postStation' ? textAreaDetail.salaryUp : type == 'search' ? treatmentSearch.salaryUp : salary?.max} onInput={({ detail }) => {
                if (type == 'postStation') {
                    setTextAreaDetail({ ...textAreaDetail, salaryUp: detail.value })
                }
                if (type == 'search') {
                    setTreatmentSearch({ ...treatmentSearch, salaryUp: detail.value })
                } else {
                    reducer(NUser.Name, RSetState, { salary: { ...salary, max: detail.value } })
                }
            }}></Input>
            <View>{salaryType == '千元/月' ? 'K' : '￥'}</View>
        </View >
    )
}