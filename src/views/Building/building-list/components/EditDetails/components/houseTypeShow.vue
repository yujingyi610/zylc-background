<template>
    <div>
        <div v-if="!showFlag">
            <div class="overfloe: hidden">
                <el-button @click="openHouseTypeMap">添加户型图</el-button>
                <!-- <el-button>返回</el-button> -->
            </div>
            <el-table :data="buildList" style="width: 100%" :border="true">
                <el-table-column label="户型图" min-width="220" align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.picWechat" style="width: 200px;"/>
                    </template>
                </el-table-column>
                <el-table-column prop="houseTypeName" label="户型" min-width="180" align="center"></el-table-column>
                <el-table-column prop="houseWebName" label="户型名称" min-width="180" align="center"></el-table-column>
                <el-table-column prop="houseName" label="户型图名称" min-width="400" align="center"></el-table-column>
                <el-table-column prop="housearea" label="户型面积（㎡）" min-width="100" align="center"></el-table-column>
                <el-table-column prop="userDesc" label="展示状态" min-width="100" align="center">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.isShow" active-value="1" inactive-value="0" @change="handleChangeShowFlag(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="排序" min-width="180" align="center">
                    <template slot-scope="scope">
                        <div style="width: 100%; height: 100%" v-if="scope.row.sortFlag" @click="handleChangeSortFlag(scope.$index)">{{scope.row.sort}}</div>
                        <el-input v-model.number="scope.row.sort" type="number" class="shortInput" v-else @change="handleChangeSort(scope.row, scope.$index)"></el-input>
                        
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" min-width="200">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleOpenRedact(scope.row.id)">编辑</el-button>
                    <el-button type="text" ><i class="iconfont icon-xiangshang"></i></el-button>
                    <el-button type="text" ><i class="iconfont icon-xiangxia"></i></el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        
        <house-type-map v-if="showFlag" @close="handleCloseChild" :estateInfo="estateInfo" :id="id"></house-type-map>
    </div>
</template>

<script>
import { buildingHouseList, buildingHouseShow } from '@/api/building-list.js'

import houseTypeMap from './components/houseTypeMap'
    export default {
        props: ['estateInfo'],
        components: {
            houseTypeMap
        },
        data() {
            return{
                buildList:[],
                showFlag:false,
                id: null
            }
        },
        methods: {
            handlebuildingHouseList() {// 获取列表
                let data = {
                    estateId: this.estateInfo.id
                }
                buildingHouseList(data).then(res=>{
                    if( res.code === 0 ){
                        this.buildList = res.data.pageListData;
                        this.buildList.map(item=>{
                            this.$set(item, 'sortFlag', true)
                            if( !item.sort ){
                                this.$set(item, 'sort', 1)
                            }
                        })
                    }else{
                        this.buildList = []
                    }
                })
            },
            openHouseTypeMap() {// 打开新增/编辑户型图
                this.showFlag = true;
            },  
            handleChangeShowFlag(row) {// 控制展示隐藏
                let data = {
                    id: row.id,
                    isShow: row.isShow
                }
                buildingHouseShow(data).then(res=>{
                    if( res.code === 0 ){
                        this.$message.success('保存成功！')
                        this.handlebuildingHouseList()
                    }else{
                        this.$message.success(res.msg)
                        this.handlebuildingHouseList()
                    }
                })
            },
            handleChangeSortFlag(idnex) {// 展示sort输入框
                this.buildList[idnex].sortFlag = false
            },
            handleChangeSort(row, index) {// 改变sort值，保存
                this.buildList[index].sort = parseInt(this.buildList[index].sort)
                if( isNaN(this.buildList[index].sort) ){
                    this.$message.error('请输入整数！')
                    this.buildList[index].sort = 1
                    return
                }
                if(this.buildList[index].sort > 99999999){
                    this.$message.error('排序最大为8位数字！')
                    this.buildList[index].sort = 99999999
                    return
                }
                let data = {
                    sort: row.sort,
                    id: row.id
                }
                buildingHouseShow(data).then(res=>{
                    if( res.code === 0 ){
                        this.$message.success('保存成功！')
                        this.handlebuildingHouseList()
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            handleOpenRedact(id) {// 编辑
                this.showFlag = true;
                this.id = id;
            },
            handleCloseChild() {// 关闭子组件
                this.showFlag = false;
                this.handlebuildingHouseList()
            }
        },
        created() {
            this.handlebuildingHouseList()
        }
    }
</script>

<style scoped>

</style>