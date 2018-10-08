<template>
    <div>
        <el-collapse v-model="activeNames">
            <el-collapse-item title="基本信息" name="1">
                <basic-view ref="basicViewRef" :estateInfo="estateInfo" :dataEstateData="dataEstateData"></basic-view>
            </el-collapse-item>
            <el-collapse-item title="楼盘亮点" name="2">
                <highlights-view ref="HighlightsViewRef" :estateInfo="estateInfo" :dataEstateData="dataEstateData" :spotListData="spotListData"></highlights-view>
            </el-collapse-item>
            <el-collapse-item title="楼栋信息" name="3">
                <build-info ref="buildInfoRef" :estateInfo="estateInfo" :dataEstateData="dataEstateData"></build-info>
            </el-collapse-item>
            <el-collapse-item title="楼盘属性" name="4">
                <estates-attr ref="estatesAttrRef" :estateInfo="estateInfo" :dataEstateData="dataEstateData"></estates-attr>
            </el-collapse-item>
            <el-collapse-item title="楼盘标签" name="5">
                <estates-tag ref="estatesTagRef" :estateInfo="estateInfo" :labelListData="labelListData"></estates-tag>
            </el-collapse-item>
        </el-collapse>
        <div>
            <el-button type="primary" @click="submitForm">保存</el-button>
            <el-button>取消</el-button>
        </div>
        
    </div>
</template>

<script>
import basicView from './components/basic'
import HighlightsView from './components/Highlights'
import buildInfo from './components/buildInfo'
import estatesAttr from './components/estatesAttr'
import estatesTag from './components/estatesTag'

import { buildingInfo, buildingInfoModify } from '@/api/building-list.js'

    export default {
        props: ['estateInfo'],
        components: {
            basicView,
            HighlightsView,
            buildInfo,
            estatesAttr,
            estatesTag
        },
        data() {
            return{
                activeNames: ['1','2','3', '4', '5'],
                dataEstateData: null,// 楼盘信息对象
                spotListData: null,// 亮点信息对象
                labelListData: null,// 标签信息对象
            }
        },
        methods: {
            handlebuildingInfo() {// 获取楼盘信息
                let data = {
                    id: this.estateInfo.id
                }
                buildingInfo(data).then(res=>{
                    if( res.code === 0 ){
                        this.dataEstateData = res.data.dataEstateData;
                        this.spotListData = res.data.spotListData;
                        this.labelListData = res.data.labelListData;
                    }
                })
            },
            submitForm() {// 表单验证
                this.$refs.basicViewRef.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.handleSave()
                } else {
                    this.$message.error('输入有误，请检查!')
                    return false;
                }
                });
            },
            handleSave() {// 保存

                let labelList = this.$refs.estatesTagRef.value.map(item=>{
                    return{
                        estateId: this.estateInfo.id,
                        labelId: item.id,
                        labelName: item.labelName,
                    }
                })
                let labelArr = JSON.stringify(labelList)

                let refAll = this.$refs.HighlightsViewRef.$refs;
                let refList = []
                for( let key in refAll ){
                    refList.push({
                        estateId: this.estateInfo.id,
                        briTittle: refAll[key][0].itemInfo.briTittle,
                        briContent: refAll[key][0].itemInfo.briContent,
                        briPhoto: refAll[key][0].itemInfo.briPhoto,
                    })
                }
                let spotArr = JSON.stringify(refList)


                let form1 = this.$refs.basicViewRef.form;
                let form2 = this.$refs.HighlightsViewRef.form;
                let form4 = this.$refs.estatesAttrRef.form;

                let addressx = ''
                let addressy = ''
                if( form1.addressXY && form1.addressXY.indexOf(',') !== -1 ){
                    console.log(form1.addressXY)
                    addressx = form1.addressXY.split(',')[0]
                    addressy = form1.addressXY.split(',')[1]
                }
                let data = {

                    id: this.estateInfo.id,
                    addressx,// 楼盘经纬度
                    addressy,


                    areaName: form1.area.areaName,
                    areaid: form1.area.id,
                    cityname: form1.city.areaName,
                    cityid: form1.city.id,
                    provincename: form1.province.areaName,
                    provinceid: form1.province.id,


                    description: form1.description,// 关键词
                    estateName: form1.estateName,// 楼盘名称
                    projectaddress: form1.projectaddress,// 楼盘地址
                    saleaddress: form1.saleaddress,// 售楼处地址
                    unitpriceshow: Number(form1.unitpriceshow),// 单价（元/㎡起）
                    totalpriceshow: Number(form1.totalpriceshow),// 总价（万元/套起
                    developunitname: form1.developunitname,// 开发商
                    propertyunitname: form1.propertyunitname,// 物业单位
                    contactphone: form1.contactphone,// 案场电话
                    occupyarea: form1.occupyarea,// 占地面积
                    greenrate: form1.greenrate,// 绿化率
                    arearate: form1.arearate,// 容积率
                    parkingRate: form1.parkingRate,// 车位比
                    totalroomnum: form1.totalroomnum,// 规划户数
                    propertytype: form1.propertytype,// 物业类型
                    propertyfee: form1.propertyfee,// 物业费
                    buildingsummary: form1.buildingsummary,// 楼栋总数（简介）
                    decorationtype: form1.decorationtype,// 装修情况
                    equity: form1.equity,// 产权（年）




                    brightTittle: form2.brightTittle,// 楼盘亮点主标题
                    brightDesc: form2.brightDesc,// 楼盘亮点介绍语
                    brightVoice: form2.brightVoice,// 亮点音频


                    aerialView: this.$refs.buildInfoRef.aerialView,// 楼栋信息图

                    isGreentown: form4.isGreentown,// 是否绿城小镇
                    isTourism: form4.isTourism,// 是否居旅地产

                    spotArr,// 楼盘亮点数组
                    labelArr,// 标签数组
                }
                buildingInfoModify(data).then(res=>{
                    if( res.code === 0 ){
                        this.$message.success('保存成功！')
                        this.handlebuildingInfo()
                    }else{
                        this.$message.error(res.msg)
                    }
                })
            }
        },
        created() {
            this.handlebuildingInfo()
        }
    }
</script>

<style scoped>

</style>