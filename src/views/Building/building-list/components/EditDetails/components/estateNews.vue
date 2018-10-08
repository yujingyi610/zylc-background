<template>
    <div>
        <div v-if="!showFlag">
            <el-form :inline="true">
                <el-form-item label="楼盘名称">
                    {{estateInfo.estateName}}
                </el-form-item>
                <el-form-item label="动态标题">
                    <el-input v-model="title"></el-input>
                </el-form-item>
                <el-button type="primary" @click="handlebuildingNewsList">查询</el-button>
                <el-button type="primary" @click="handleOpenAdd">新建</el-button>
            </el-form>
            <el-table :data="tableList" style="width: 100%" :border="true" >
                <el-table-column prop="estateName" label="楼盘" min-width="180" align="center"></el-table-column>
                <el-table-column prop="title" label="标题" min-width="180" align="center"></el-table-column>
                <el-table-column prop="updateTime" label="更新时间" min-width="180" align="center"></el-table-column>
                <el-table-column label="操作" min-width="100" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="text" @click="handleRemove(scope.row.id)">删除</el-button>
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
        <add-news :estateInfo="estateInfo" v-if="showFlag" @close="handleCloseChild" :newsId="newsId"></add-news>
    </div>
</template>

<script>
import { buildingNewsList, buildingNewsDiscard } from '@/api/building-list.js'
import addNews from './components/addNews'
    export default {
        props: ['estateInfo'],
        components: {
            addNews
        },
        data() {
            return{
                title: '',
                tableList: [],

                currentPage: 1,// 分页当前页数
                pageSize: 10, // 分页数量
                total: 0,// 总数

                showFlag: false,
                newsId: null
            }
        },
        methods: {
            handlebuildingNewsList() {// 查询列表数据
                console.log(this.estateInfo)
                let params = {
                    estateId: this.estateInfo.id,
                    title: this.title,
                    pageLimit: this.pageSize,
                    pageCurrent: this.currentPage
                }
                buildingNewsList(params).then(res=>{
                    if(  res.code === 0){
                        this.tableList = res.data.pageListData;
                        this.total = res.data.resultCount
                    }
                })
            },
            handleOpenAdd() {// 新建
                this.showFlag = true;
            },
            handleEdit(row) {// 编辑
                this.newsId = row.id
                this.showFlag = true;
            },
            handleRemove(id) {// 删除
                buildingNewsDiscard({ id }).then(res=>{
                    if( res.code === 0 ){
                        this.$message.success('删除成功！')
                        this.handlebuildingNewsList()
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            handleCloseChild() {// 关闭子组件
                
                this.handlebuildingNewsList()
                this.showFlag = false;
            },
            /**********分页相关************/
            handleSizeChange(val) {
                
                this.pageSize = val;
                this.handlebuildingNewsList()
            },
            handleCurrentChange(val) {
                
                this.currentPage = val;
                this.handlebuildingNewsList()                
            },
        },
        created() {
            this.handlebuildingNewsList()
        }
    }
</script>

<style scoped>

</style>