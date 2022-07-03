import { Button, Input, Picker, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { AtList, AtListItem, AtTextarea } from "taro-ui";
import { degree, RSetState } from "../../config/Constants";
import { NResumeBrief } from "../../models/resumeBrief";
import { college } from "../../utils/college";
import { reducer, useStore } from "../../utils/dva16";
import './index.less'

export default () => {
  // ----------------------常量-------------------------
  const { routeValue, resumeInfo } = useStore(NResumeBrief.Name)
  // const [textAreaDetail, setTextAreaDetail] = useState("")
  const [degreeInfo, setDegreeInfo] = useState({
    degree: -1,
    enrollmentTime: '',
    graduationTime: '',
    profession: '',
    university: ''
  })
  // ----------------------生命周期----------------------
  useEffect(() => {
    resumeInfo && setDegreeInfo(resumeInfo)
    // setTextAreaDetail(resumeInfo?.[routeValue.key] || '')
  }, [])
  // ----------------------响应函数----------------------
  const checkValue = () => {
    if (degreeInfo.degree == -1) return '学历不合规'
    if (!degreeInfo.enrollmentTime) return '入学时间不合规'
    if (!degreeInfo.graduationTime) return '毕业时间不合规'
    if (!degreeInfo.profession) return `${degreeInfo.degree >= 3 ? '专业不合规' : '技能不合规'}`
  }

  const checkTextValue = () => {
    // if (degreeInfo.degree == -1) return '学历不合规'
    if (!resumeInfo?.[routeValue.key]) return `${routeValue.titleValue}不合规`
  }
  //自定义学校
  let city = college.schools.map((v) => {
    return v.province_name
  })

  let region = (value) => {
    return college.schools[value].cities.map(v => v.city_name)
  }

  let schools = (faValue, value) => {
    return college.schools[faValue].cities[value].universities
  }

  const [regionValue, setRegionValue] = useState(region(0))
  const [schoolValue, setSchoolValue] = useState(schools(0, 0))
  const [keyValue, setKeyValue] = useState({ city: 0, region: 0, school: 0 })
  // ----------------------渲染函数----------------------
  return (
    <View>
      {routeValue.keyIndex == 0 ? <View className='index' >
        <AtList>
          <Picker mode='selector' range={degree} value={0} onChange={({ detail }) => {
            setDegreeInfo({ ...degreeInfo, degree: detail.value as number })
          }}>
            <AtListItem
              arrow='right'
              note={degreeInfo.degree != -1 ? degree[degreeInfo.degree] : '请选择'}
              title='学历'
            />
          </Picker>
          <Picker mode='date' value={degreeInfo.enrollmentTime} onChange={({ detail }) => {
            setDegreeInfo({ ...degreeInfo, enrollmentTime: detail.value })
          }}>
            <AtListItem
              arrow='right'
              note={degreeInfo.enrollmentTime ? degreeInfo.enrollmentTime : '请选择'}
              title='入学时间'
            />
          </Picker>
          <Picker mode='date' value={degreeInfo.graduationTime} onChange={({ detail }) => {
            setDegreeInfo({ ...degreeInfo, graduationTime: detail.value })
          }}>
            <AtListItem
              arrow='right'
              note={degreeInfo.graduationTime ? degreeInfo.graduationTime : '请选择'}
              title='毕业时间'
            />
          </Picker>
          {degreeInfo.degree >= 3 && <Picker
            mode='multiSelector'
            range={[[...city as any], regionValue, schoolValue]}
            value={[keyValue.city as any, keyValue.region, keyValue.school]}
            onColumnChange={({ detail }) => {
              if (detail.column == 0) {
                setRegionValue(region(detail.value))
                setKeyValue({ ...keyValue, city: detail.value })
                setSchoolValue(schools(detail.value, 0))
              } else if (detail.column == 1) {
                setSchoolValue(schools(keyValue.city, detail.value))
                setKeyValue({ ...keyValue, region: detail.value })
              } else {
                setKeyValue({ ...keyValue, school: detail.value })
              }
            }}
            onChange={({ detail }) => {
              setDegreeInfo({ ...degreeInfo, university: college.schools?.[detail.value[0]]?.cities[detail.value[1]]?.universities[detail.value[2]] })
            }}>
            <AtListItem
              arrow='right'
              note={degreeInfo.university ? degreeInfo.university : '请选择'}
              title='学校名称'
            />
          </Picker>}
          {degreeInfo.degree >= 0 && <View className="inputBox line">
            <View className="inputBoxTitle">{degreeInfo.degree >= 3 ? '专业' : '技能'}</View>
            <Input placeholder={`请输入您的${degreeInfo.degree >= 3 ? '专业' : '技能'}`} className="input" value={degreeInfo.profession} maxlength={10} onInput={({ detail }) => {
              setDegreeInfo({ ...degreeInfo, profession: detail.value })
            }}></Input>
          </View>}
        </AtList>
      </View>
        : <View className='index' ><View className="title">{routeValue.titleValue}：</View>
          <AtTextarea
            placeholder={routeValue.contentValue}
            value={resumeInfo?.[routeValue.key]}
            className="experienceText"
            height={900}
            maxLength={1024}
            count={true}
            showConfirmBar
            textOverflowForbidden={false}
            onChange={(detail) => {
              reducer(NResumeBrief.Name, RSetState, { resumeInfo: { ...resumeInfo, [routeValue.key]: detail } })
              // setTextAreaDetail(detail)
            }} ></AtTextarea>
        </View>}
      <Button className="save" onClick={() => {
        if (routeValue.keyIndex == 0) {
          if (checkValue()) {
            Taro.showToast({
              title: checkValue() as string,
              icon: 'error',
              duration: 1000
            })
          } else {
            reducer(NResumeBrief.Name, RSetState, { resumeInfo: { ...resumeInfo, ...degreeInfo } })
            Taro.navigateBack()
          }
        } else {
          if (checkTextValue()) {
            Taro.showToast({
              title: checkTextValue() as string,
              icon: 'error',
              duration: 1000
            })
          } else {
            Taro.navigateBack()
          }
        }
      }}>确定</Button>
    </View>
  )
}
