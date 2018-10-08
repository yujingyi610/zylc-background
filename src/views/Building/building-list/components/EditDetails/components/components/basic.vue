<template>
    <div>
        <el-form :model="form" :inline="true" label-width="250px" :rules="rules" ref="ruleForm" >
            <div>
                <el-form-item label="楼盘名称" prop="estateName">
                    <el-input v-model="form.estateName" size="mini"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="关键词">
                    <el-input v-model="form.description" size="mini"></el-input>
                </el-form-item>
            </div>
            <div class="nomalInput">
                <el-form-item label="楼盘地址">
                    <el-select v-model="form.province" placeholder="请选择省份" size="mini" value-key="id" @visible-change="handleChangeFlag">
                        <el-option v-for="(item, index) in provinceOption" :key="index" :label="item.areaName" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="form.city" placeholder="请选择城市" size="mini" value-key="id" @visible-change="handleChangeFlag">
                        <el-option v-for="(item, index) in cityOption" :key="index" :label="item.areaName" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="form.area" placeholder="请选择区县" size="mini" value-key="id" @visible-change="handleChangeFlag">
                        <el-option v-for="(item, index) in countyOption" :key="index" :label="item.areaName" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input  v-model="form.projectaddress" placeholder="请输入详细信息" size="mini"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="楼盘经纬度">
                    <el-input v-model="form.addressXY" size="mini"></el-input>
                </el-form-item>
                <a href="http://api.map.baidu.com/lbsapi/getpoint/index.html" target="_blank" style="color: mediumblue">获取经纬度</a>
            </div>
            <div>
                <el-form-item label="售楼处地址">
                    <el-input v-model="form.saleaddress" size="mini"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="单价（元/㎡起）" prop="unitpriceshow">
                    <el-input v-model="form.unitpriceshow" size="mini"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="总价（万元/套起）" prop="totalpriceshow">
                    <el-input v-model="form.totalpriceshow" size="mini"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="开发商">
                    <el-input v-model="form.developunitname" size="mini"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="物业单位">
                    <el-input v-model="form.propertyunitname" size="mini"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="案场电话">
                    <el-input v-model="form.contactphone" size="mini"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="占地面积" prop="occupyarea">
                    <el-input v-model.number="form.occupyarea" size="mini"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="绿化率" prop="greenrate">
                    <el-input v-model="form.greenrate" size="mini"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="容积率" prop="arearate">
                    <el-input v-model="form.arearate" size="mini"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="车位比">
                    <el-input v-model="form.parkingRate" size="mini"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="规划户数" prop="totalroomnum">
                    <el-input v-model="form.totalroomnum" size="mini"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="物业类型">
                    <el-input v-model="form.propertytype" size="mini"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="物业费" prop="propertyfee">
                    <el-input v-model="form.propertyfee" size="mini"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="楼栋总数（简介）">
                    <el-input v-model="form.buildingsummary" size="mini"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="装修情况">
                    <el-select v-model="form.decorationtype" size="mini">
                        <el-option value="毛坯" label="毛坯"></el-option>
                        <el-option value="精装" label="精装"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="产权（年）" prop="equity">
                    <el-input v-model="form.equity" size="mini"></el-input>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
import { getProviceList, getCityList, getAreaList } from '@/api/building-list.js'
    export default {
        props: ['estateInfo', 'dataEstateData'],
        watch: {
            dataEstateData: {
                handler(val, oldval){
                    console.log(val)
                    if( val != oldval ){
                        this.handleInit(val)
                    }
                },
                deep: true
            },
            'form.province'(e) {
                if( this.changeFlag ){
                    this.form.city = {}
                }
                if( e && e.id ){
                    this.handleGetCityList({ parentId: e.id })
                }
            },
            'form.city'(e) {
                if( this.changeFlag ){
                    this.form.area = {}
                }
                if( e && e.id ){
                    this.handleGetAreaList({ parentId: e.id })
                }
            },
            'form.area'(e) {
                if( this.changeFlag ){
                    this.form.projectaddress = ''
                }
            }
        },
        data() {
            var price = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('价格不能为空'));
                }
                if (!Number(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    callback();
                }
            };
            var occupyarea = (rule, value, callback) => {
                if( value == 0 ){
                    callback();
                } else if (!Number(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if( value < 0 ){
                        callback(new Error('不能小于0'));
                    }else{
                        callback();
                    }
                    
                }
            };
            var rate = (rule, value, callback) => {
                if( value == 0 ){
                    callback();
                } else if (!Number(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if( value > 100 ){
                        callback(new Error('比率不能大于100'));
                    }else{
                        callback();
                    }
                    
                }
            };
            return{
                form: {
                    estateName: '',
                    description: '',
                    province: {},
                    city: {},
                    area: {},
                    projectaddress: '',
                    addressXY: '',
                    saleaddress: '',
                    unitpriceshow: '',
                    totalpriceshow: '',
                    developunitname: '',
                    propertyunitname: '',
                    contactphone: '',
                    occupyarea: '',
                    greenrate: '',
                    arearate: '',
                    parkingRate: '',
                    totalroomnum: '',
                    propertytype: '',
                    propertyfee: '',
                    buildingsummary: '',
                    decorationtype: '',
                    equity: '',
                },

                provinceOption: [],
                cityOption: [],
                countyOption: [],

                changeFlag: false,

                rules: {
                    estateName: [
                        { required: true, message: '请输入楼盘名称', trigger: 'blur' }
                    ],
                    unitpriceshow: [
                        { required: true, validator: price, trigger: 'blur' }
                    ],
                    totalpriceshow: [
                        { required: true, validator: price, trigger: 'blur' }
                    ],
                    occupyarea: [
                        { required: false, validator: occupyarea, trigger: 'change' }
                    ],
                    greenrate: [
                        { required: false, validator: rate, trigger: 'change' }
                    ],
                    arearate: [
                        { required: false, validator: rate, trigger: 'change' }
                    ],
                    parkingRate: [
                        { required: false, validator: rate, trigger: 'change' }
                    ],
                    totalroomnum: [
                        { required: false, validator: occupyarea, trigger: 'change' }
                    ],
                    propertyfee: [
                        { required: false, validator: occupyarea, trigger: 'change' }
                    ],
                    equity: [
                        { required: false, validator: occupyarea, trigger: 'change' }
                    ],
                }
            }
        },
        methods: {
            handleInit(info) {// 初始化数据
                if( info ){
                    for( let key in info ){
                        this.form[key] = info[key]
                    }
                    this.form.province = {
                        areaName: info.provincename,
                        id: info.provinceid
                    }
                    this.form.city = {
                        areaName: info.cityname,
                        id: info.cityid
                    }
                    this.form.area = {
                        areaName: info.areaname,
                        id: info.areaid
                    }
                    if( info.addressx && info.addressy ){
                        this.form.addressXY = info.addressx + ',' + info.addressy
                    }
                    

                    // this.changeFlag = true;
                }else{
                    // this.changeFlag = true;
                }
                
            },
            handleGetProviceList() {// 省
                getProviceList().then(res=>{
                    if( res.code === 0 ){
                        this.provinceOption = res.data;
                    }
                })
            },
            handleGetCityList(data) {// 市
                getCityList(data).then(res=>{
                    if( res.code === 0 ){
                        this.cityOption = res.data;
                    }
                })
            },
            handleGetAreaList(data) {// 区
                getAreaList(data).then(res=>{
                    if( res.code === 0 ){
                        this.countyOption = res.data;
                    }
                })
            },
            handleChangeFlag(type) {// select回调，判断当前下拉框是否展示
                this.changeFlag = type;
            }
        },
        created() {
            this.handleGetProviceList()
            console.log(this.dataEstateData)
            if( this.dataEstateData ){
                this.handleInit(this.dataEstateData)
            }
        }
    }
</script>

<style scoped>

</style>