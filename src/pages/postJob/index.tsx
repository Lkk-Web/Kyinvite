import { Image, Input, Picker, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import _ from "lodash";
import { Fragment, useEffect, useState } from "react";
import { AtIcon, AtListItem, AtTextarea } from "taro-ui";
import icon from "../../assets/icon";
import SalarySelect from "../../component/salarySelect";
import { degree, RSetState } from "../../config/Constants";
import { NCompany } from "../../models/Company";
import { NSearch } from "../../models/Search";
import { NStation } from "../../models/Station";
import { NUser } from "../../models/User";
import { effect, reducer, useStore } from "../../utils/dva16";
import './index.less'

export default () => {
  // ----------------------常量-------------------------
  const [treatments, setTreatments] = useState([
    {
      key: 'restWeekends',
      value: '周末双休',
    },
    {
      key: 'socialInsurance',
      value: '五险一金',
    },
    {
      key: 'housingAdd',
      value: '住房补贴',
    },
    {
      key: 'transportation',
      value: '交通补贴',
    },
    {
      key: 'haveWorkMeal',
      value: '有工作餐',
    },
  ])
  const [isAdd, setIsAdd] = useState(true)
  let { hrIssueStation } = useStore(NUser.Name)
  const { postStation, postAddress } = useStore(NStation.Name)
  const { stationInfo } = useStore(NCompany.Name)
  console.log('stationInfo: ', stationInfo);
  const [textAreaDetail, setTextAreaDetail] = useState({
    welfareDescription: "",
    description: '',
    requirements: '',
    workingPlace: '',
    isfresh: '是否应届',
    degree: -1,
    salaryType: '千元/月',
    salaryDown: '',
    salaryUp: '',
    treatment: [],
    deadline_time: ''
  })
  const isFresh = ['应届', '不限']
  // ----------------------生命周期----------------------
  useEffect(() => {
    stationInfo && setTextAreaDetail({
      welfareDescription: stationInfo?.welfareDescription,
      description: stationInfo?.description,
      requirements: stationInfo?.requirements,
      workingPlace: stationInfo?.workingPlace,
      isfresh: stationInfo?.isfresh || '是否应届',
      degree: stationInfo.degree || -1,
      salaryType: stationInfo?.salaryType || '千元/月',
      salaryDown: stationInfo?.salaryDown,
      salaryUp: stationInfo?.salaryUp,
      treatment: stationInfo?.treatment || [],
      deadline_time: stationInfo?.deadline_time,
    })
    reducer(NStation.Name, RSetState, { postStation: stationInfo?.name, postAddress: stationInfo?.city })
  }, [])
  // ----------------------响应函数----------------------
  const checkValue = () => {
    if (!postStation) return '职位名称不合规'
    if (!postAddress) return '职位地点不合规'
    if (textAreaDetail.isfresh == '是否应届') return '是否应届不合规'
    if (textAreaDetail.degree == -1) return '学历要求不合规'
    if (!textAreaDetail.salaryDown) return '薪资下限不合规'
    if (!textAreaDetail.salaryUp) return '薪资上限限不合规'
    if (textAreaDetail.salaryDown > textAreaDetail.salaryUp) return '薪资范围不合规'
    if (!textAreaDetail.deadline_time) return '截止时间不合规'
    if (!textAreaDetail.welfareDescription) return '职位亮点不合规'
    if (!textAreaDetail.description) return '职位描述不合规'
    if (!textAreaDetail.requirements) return '投递要求不合规'
    if (!textAreaDetail.workingPlace) return '工作地点不合规'
  }
  // ----------------------渲染函数----------------------
  return (
    <View className='index postStationView' >
      <View className="title" >基本信息</View>
      <View className="buttonBox" >
        <View className="button" onClick={() => {
          reducer(NSearch.Name, RSetState, { isPost: true, currentSearchIndex: 1 })
          Taro.navigateTo({ url: '/pages/search/index' })
        }}>{postStation || '职位'}</View>
        <View className="button" onClick={() => {
          reducer(NSearch.Name, RSetState, { isPost: true, currentSearchIndex: 3 })
          Taro.navigateTo({ url: '/pages/search/index' })
        }}>{postAddress || '地点'}</View>
      </View>
      <View className="buttonBox">
        <Picker mode='selector' range={isFresh} value={textAreaDetail.isfresh == '应届' ? 0 : textAreaDetail.isfresh == '不限' ? 1 : '是否应届' as any} onChange={({ detail }) => {
          setTextAreaDetail({ ...textAreaDetail, isfresh: detail.value == 0 ? '应届' : '不限' })
        }}>
          <View className="button">{textAreaDetail.isfresh != '是否应届' ? textAreaDetail.isfresh : <Fragment>
            <Text>{textAreaDetail.isfresh}</Text><AtIcon value='chevron-down' size='15' color='#ffffff' className="right"></AtIcon></Fragment>}</View>
        </Picker>
        <Picker mode='selector' range={degree} value={textAreaDetail.degree} onChange={({ detail }) => {
          setTextAreaDetail({ ...textAreaDetail, degree: detail.value as any })
        }}>
          <View className="button">{textAreaDetail.degree == -1 ? <Fragment> <Text>{'学历要求'}</Text><AtIcon value='chevron-down' size='15' color='#ffffff' className="right"></AtIcon></Fragment> : degree[textAreaDetail.degree]}</View>
        </Picker>
      </View >
      <View className="titleBox">
        <View className="title">薪资（{textAreaDetail.salaryType}）</View>
        <View className="switch" onClick={() => {
          setTextAreaDetail({ ...textAreaDetail, salaryType: textAreaDetail.salaryType == '千元/月' ? '元/天' : '千元/月' })
        }}>点击切换</View>
      </View>
      <SalarySelect
        salaryType={textAreaDetail.salaryType}
        setTextAreaDetail={setTextAreaDetail}
        textAreaDetail={textAreaDetail}
        type={'postStation'}
      />
      <View className="title">待遇</View>
      <View className="treatmentBox">
        {treatments.map((v, i) => {
          return <View className={hrIssueStation.indexOf(v.key) >= 0 ? 'beTreatmentSelect' : 'treatmentSelect'} key={i} onClick={() => {
            const select = hrIssueStation.indexOf(v.key)
            if (select >= 0) {
              hrIssueStation.splice(select, 1)
            } else {
              hrIssueStation = hrIssueStation.concat(v.key)
            }
            reducer(NUser.Name, RSetState, { hrIssueStation })
          }}>{v.value}</View>
        })}
        {isAdd ? <View className="treatmentAdd" onClick={() => {
          setIsAdd(false)
        }}>添加其他<Image src={icon.add} className='icon'></Image></View> : <Input className="treatmentAdd input" maxlength={5} focus onBlur={(e) => {
          if (e.detail.value) {
            reducer(NUser.Name, RSetState, { hrIssueStation: hrIssueStation.concat(`userAdd${treatments?.length}`) })
            let tmps = treatments.concat([{ key: `userAdd${treatments?.length}`, value: e.detail.value }])
            setTreatments(tmps)
          } else {
            Taro.showToast({
              title: '添加值不能为空~',
              icon: 'error',
              duration: 500
            })
          }
          setIsAdd(true)
        }}></Input>
        }
      </View>
      <View className="title titleBox">招聘时间</View>
      <Picker mode='date' value={textAreaDetail.deadline_time} onChange={({ detail }) => {
        setTextAreaDetail({ ...textAreaDetail, deadline_time: detail.value })
      }}>
        <AtListItem
          arrow='right'
          note={textAreaDetail.deadline_time}
          title='截止时间'
        />
      </Picker>
      <View className="title titleBox">职位亮点</View>
      <AtTextarea
        placeholder={'输入您的职位亮点。如有下午茶，带薪年假，定期团建等'}
        value={textAreaDetail.welfareDescription}
        className="experienceText"
        height={250}
        maxLength={520}
        count={true}
        showConfirmBar
        textOverflowForbidden={false}
        onChange={(detail) => {
          setTextAreaDetail({ ...textAreaDetail, welfareDescription: detail })
        }} ></AtTextarea>
      <View className="title titleBox">职位描述</View>
      <AtTextarea
        placeholder={'对您发布的职位进描述，如该职位的职责，该职位的能力、技能要求'}
        value={textAreaDetail.description}
        className="experienceText"
        height={250}
        maxLength={520}
        count={true}
        showConfirmBar
        textOverflowForbidden={false}
        onChange={(detail) => {
          setTextAreaDetail({ ...textAreaDetail, description: detail })
        }} ></AtTextarea>
      <View className="title titleBox">投递要求</View>
      <AtTextarea
        placeholder={'输入您的投递要求，如要求简历是英文等'}
        value={textAreaDetail.requirements}
        className="experienceText"
        height={250}
        maxLength={520}
        count={true}
        showConfirmBar
        textOverflowForbidden={false}
        onChange={(detail) => {
          setTextAreaDetail({ ...textAreaDetail, requirements: detail })
        }} ></AtTextarea>
      <View className="title titleBox">工作地点</View>
      <AtTextarea
        placeholder={'请填写您发布的岗位工作地址，务必准确且精确到号'}
        value={textAreaDetail.workingPlace}
        className="experienceText"
        height={80}
        maxLength={100}
        count={true}
        showConfirmBar
        textOverflowForbidden={false}
        onChange={(detail) => {
          setTextAreaDetail({ ...textAreaDetail, workingPlace: detail })
        }} ></AtTextarea>
      <View className="post" onClick={() => {
        let tmp: any = []
        _.find(treatments, (e) => {
          // return hrIssueStation.includes(e.key)
          if (hrIssueStation.includes(e.key)) tmp.push(e)
        })
        setTextAreaDetail({ ...textAreaDetail, treatment: tmp })
        if (checkValue()) {
          Taro.showToast({
            title: checkValue() as string,
            icon: 'error',
            duration: 1000
          })
        } else {
          if (stationInfo?.city) {
            effect(NStation.Name, NStation.updateStation, { ...textAreaDetail, treatment: tmp, name: postStation, city: postAddress }, (res) => {
              if (res.data) {
                Taro.navigateBack()
                Taro.showToast({
                  title: '岗位修改成功',
                  icon: 'success',
                  duration: 1000
                })
              }
            })
          } else {
            effect(NStation.Name, NStation.postStation, { ...textAreaDetail, treatment: tmp, name: postStation, city: postAddress }, (res) => {
              if (res.data) {
                Taro.navigateBack()
                Taro.showToast({
                  title: '发布岗位成功',
                  icon: 'success',
                  duration: 1000
                })
              }
            })
          }
        }
      }}>{stationInfo?.city ? '修改' : '发布'}</View>
    </View >
  )
}
