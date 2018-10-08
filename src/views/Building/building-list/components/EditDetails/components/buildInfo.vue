<template>
    <div>
        <div v-if="!showFlag">
            <el-form :model="searchForm" :inline="true">
                <el-form-item label="楼盘名称">
                    {{searchForm.estatesName}}
                </el-form-item>
                <el-form-item label="分期">
                    <el-select v-model="searchForm.divideName" clearable>
                        <el-option v-for="(item, index) in divideOption" :key="index" :label="item.divideName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="组团名称">
                    <el-input v-model="searchForm.groupName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handlebuildingGroupList">查询</el-button>
                </el-form-item>
                <el-button style="float: right">更新组团数据</el-button>
            </el-form>
            <el-table :data="List" style="width: 100%" :border="true" >
                <el-table-column prop="groupName" label="组团名称" min-width="180" align="center"></el-table-column>
                <el-table-column prop="divideName" label="分期名" min-width="180" align="center"></el-table-column>
                <el-table-column label="操作" min-width="100">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleOpenBuildList(scope.row)">楼栋列表</el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        <build-info-list v-if="showFlag" :groupInfo="groupInfo" :estateInfo="estateInfo" @closeChild="closeChild"></build-info-list>
    </div>
</template>

<script>
import { divideList, buildingGroupList } from '@/api/building-list.js'

import buildInfoList from './components/buildInfoList'
    export default {
        props: ['estateInfo'],
        components: {
            buildInfoList
        },
        data() {
            return{
                divideOption: [],
                searchForm: {
                    estatesName:'',
                    divideName: '',
                    groupName: ''

                },
                List: [],
                currentPage: 1,// 分页当前页数
                pageSize: 10, // 分页数量
                total: 0,// 总数

                showFlag: false,
                groupInfo: null,// 传递给子组件的数据
            }
        },
        methods: {
            handleGetdivideList() {// 根据楼盘id获取分期下拉数据
                let data = {
                    estateId: this.estateInfo.id
                }
                divideList(data).then(res=>{
                    if( res.code === 0){
                        this.divideOption = res.data;
                    }
                })  
            },
            handlebuildingGroupList() {// 获取组团信息数据
                let data = {
                    estateId: this.estateInfo.id,
                    groupName: this.searchForm.groupName,
                    divideId:this.searchForm.divideName,
                    pageLimit: this.pageSize,
                    pageCurrent: this.currentPage,
                }
                buildingGroupList(data).then(res=>{
                    if( res.code === 0 ){
                        this.List = res.data.pageListData;
                        this.total = res.data.resultCount;
                    }
                })
            },
            handleOpenBuildList(row) {// 打开楼栋列表
                this.groupInfo = row;
                this.showFlag = true;
            },
            closeChild() {// 关闭子组件
                console.log(111)
                this.showFlag = false;
                this.handlebuildingGroupList()
            },
            /**********分页相关************/
            handleSizeChange(val) {
                
                this.pageSize = val;
                this.handlebuildingGroupList()
            },
            handleCurrentChange(val) {
                
                this.currentPage = val;
                this.handlebuildingGroupList()                
            },
        },
        created() {
            console.log(this.estateInfo)
            this.searchForm.estatesName = this.estateInfo.estateName;
            this.handleGetdivideList()
            this.handlebuildingGroupList()

        }
    }
</script>

<style scoped>

</style>