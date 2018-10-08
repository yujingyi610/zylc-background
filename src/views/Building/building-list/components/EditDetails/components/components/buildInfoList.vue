<template>
    <div>
        <div v-if="!showFlag">
            <el-form :model="headForm" :inline="true">
                <el-form-item label="楼盘名">
                    {{headForm.estatesName}}
                </el-form-item>
                <el-form-item label="组团名">
                    {{headForm.groupName}}
                </el-form-item>
                <el-button style="float:right" @click="handleGoBack">返回</el-button>
            </el-form>
            <el-table :data="list" style="width: 100%" :border="true" >
                <el-table-column prop="buildingName" label="楼栋名称" min-width="180" align="center"></el-table-column>
                <el-table-column prop="unitCount" label="总单元数" min-width="80" align="center"></el-table-column>
                <el-table-column prop="houseCount" label="总户数" min-width="80" align="center"></el-table-column>
                <el-table-column prop="floorCount" label="总层数" min-width="80" align="center"></el-table-column>
                <el-table-column prop="ratio" label="梯户比" min-width="80" align="center">
                    <template slot-scope="scope">
                        {{scope.row.ratio || '暂无数据'}}
                    </template>
                </el-table-column>
                <el-table-column prop="divideName" label="销售情况" min-width="180" align="center">
                    <template slot-scope="scope">
                        预定{{scope.row.orderCount}} 签约{{scope.row.saleCount}} 未售{{scope.row.notSaleCount}} 
                    </template>
                </el-table-column>
                <el-table-column prop="divideName" label="户型图" min-width="300" align="center">
                    <template slot-scope="scope">
                        <div v-for="(item, index) in scope.row.houseList" :key="index">
                            {{item.houseWebName}} {{item.houseName}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="divideName" label="户型图绑定" min-width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleOpenHouseType(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="300" align="center">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.flag">
                            <div style="float:left; margin-left: 50px; width:120px">
                                <el-button type="text" @click="handlechangeStatus(scope.$index, scope.row, '1')">待售</el-button>
                                <el-button type="text" @click="handlechangeStatus(scope.$index, scope.row,  '2')">在售</el-button>
                                <el-button type="text" @click="handlechangeStatus(scope.$index, scope.row,  '3')">售罄</el-button>
                            </div>
                            <div style="float: right; margin-right: 50px;">
                                <el-button type="text" @click="handlebuildingGroupInsertLabelPoint(scope.row)">应用</el-button>
                            </div>
                            
                        </div>
                        <div v-else>
                            <div style="float:left; margin-left: 50px; width:120px; text-align:center">
                                <el-button type="text" @click="handlechangeStatus(scope.$index, scope.row, '0')">取消</el-button>
                            </div>
                            
                            <div style="float: right; margin-right: 50px;">
                                <el-button type="text" @click="handlebuildingGroupInsertLabelPoint(scope.row)">应用</el-button>
                            </div>
                        </div>
                        
                    </template>
                </el-table-column>
            </el-table>
            <div id="container">
                <img :src="aerialView" draggable="false"/>
            </div>
        </div>
        <house-type-pic v-if="showFlag" :groupInfo="groupInfo" :buildInfo="buildInfo" :estateInfo="estateInfo" @closeChild="closeChild"></house-type-pic>
    </div>
</template>

<script>
import { buildList, buildingGroupSalelabel, buildingGroupInsertLabelPoint, buildingGroupDeleteLabelPoint, buildingGroupFindLabelPoint, buildingGroupSale } from '@/api/building-list.js'
import { pushTag } from '@/api/common/index.js'

import houseTypePic from './houseTypePic.vue'
    export default {
        props: ['groupInfo', 'estateInfo'],
        components: {
            houseTypePic
        },
        data () {
            return{
                headForm: {
                    estatesName: '',
                    groupName: ''
                },
                list: [],

                showFlag: false,
                buildInfo: null,
                aerialView: null,
            }
        },
        methods: {
            handlebuildList() {// 获取楼盘列表数据
                let data = {
                    estateId: this.estateInfo.id,
                    groupId: this.groupInfo.id,
                    // groupName:this.groupInfo.groupName
                }
                buildList(data).then(res=>{
                    if(res.code === 0 ){
                        this.list = res.data.buildList;
                        this.list.map(item=>{
                            this.$set(item, 'flag' ,item.buildingStatus === '1' || item.buildingStatus === '2' || item.buildingStatus === '3')
                        })
                        this.aerialView = res.data.data.aerialView;
                    }
                })
            },
            handleGoBack() {// 返回
                this.$emit('closeChild')

            },
            handleOpenHouseType(row) {// 打开绑定户型图子组件
                this.buildInfo = row;
                this.showFlag = true
            },
            closeChild() {// 关闭子组件
                this.showFlag = false
                this.handlebuildList()
            },
            handlechangeStatus(index, row, type) {// 地图标点
                if( type === '0' ){
                    this.list[index].flag = true;
                    this.handlebuildingGroupDeleteLabelPoint(row, index)
                    // pushTag(row)
                }else{
                    this.list[index].flag = false;
                    this.handlebuildingGroupSalelabel(row, type)
                    // pushTag(row)
                }
                
            },
            handlebuildingGroupFindLabelPoint() {// 获取已存在标签数据
                let data = {
                    estateId: this.estateInfo.id,
                    groupId: this.groupInfo.id
                }
                buildingGroupFindLabelPoint(data).then(res=>{
                    if( res.code === 0 ){
                        res.data.map(item=>{
                            pushTag(item, item.addressX, item.addressY )
                        })
                    }
                })
            },
            handlebuildingGroupSalelabel(row, type) {// 获取标签数据
                let data = {
                    id: row.id,
                    saleStatus: type
                }
                buildingGroupSalelabel(data).then(res=>{
                    if( res.code === 0 ){
                        pushTag(res.data)
                    }
                })
            },
            handlebuildingGroupInsertLabelPoint(row) {// 应用标签数据
                let imgLocated = JSON.parse(sessionStorage.getItem('imgLocated'))
                console.log(imgLocated)
                console.log(row)
                let data = null;
                imgLocated.map(item=>{
                    if( item.buildingId === row.id ){
                        data = item
                    }
                })
                if( !data ){
                    return
                }
                buildingGroupInsertLabelPoint(data).then(res=>{
                    if( res.code === 0 ){
                        this.$message.success('应用成功！')
                    }
                })

                buildingGroupSale({ id: row.id, saleStatus: data.saleId }).then(res=>{

                })
            },
            handlebuildingGroupDeleteLabelPoint(row, index) {// 取消标签
                let imgLocated = JSON.parse(sessionStorage.getItem('imgLocated'))
                let data = null;
                let activeindex = 0;
                imgLocated.map((item, index)=>{
                    if( item.buildingId === row.id ){
                        data = item
                        activeindex = index
                    }
                })
                buildingGroupDeleteLabelPoint(data).then(res=>{
                    if( res.code === 0 ){
                        this.$message.success('取消成功！')
                        let container = document.getElementById('container')
                        let tip = document.getElementById(data.id)
                        container.removeChild(tip)
                        imgLocated.splice(activeindex, 1)
                        sessionStorage.setItem('imgLocated', JSON.stringify(imgLocated))
                        this.list[index].flag = false
                    } 
                }).then(()=>{
                    buildingGroupSale({ id: row.id, saleStatus: '0' })
                })
            }
        },
        created() {
            console.log(this.groupInfo)
            console.log(this.estateInfo)
            this.headForm.estatesName = this.estateInfo.estateName;
            this.headForm.groupName = this.groupInfo.groupName;
            this.handlebuildList()
            this.handlebuildingGroupFindLabelPoint()
        }

    }
</script>

<style scoped>
#container{
    width: 100%;
    margin-top: 50px;
}
#container img{
    width: 100%;
    user-select: none;
}
</style>