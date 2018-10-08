<template>
    <div>
        <el-table :data="buildList" style="width: 100%" :border="true" v-if="!showFlag">
            <el-table-column label="头像" min-width="180" align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.photo" style="width: 140px;"/>
                </template>
            </el-table-column>
            <el-table-column prop="userRealName" label="经纪人姓名" min-width="180" align="center"></el-table-column>
            <el-table-column prop="phone" label="电话" min-width="180" align="center"></el-table-column>
            <el-table-column prop="userDesc" label="描述" min-width="400" align="center"></el-table-column>
            <el-table-column label="展示状态" min-width="100" align="center">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.showFlag" active-value="1" inactive-value="0" @change="handleChangeShowFlag(scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="排序" min-width="180" align="center">
                <template slot-scope="scope">
                    <div style="width: 100%; height: 100%" v-if="scope.row.sortFlag" @click="handleChangeSortFlag(scope.$index)">{{scope.row.sort}}</div>
                    <el-input v-model.number="scope.row.sort" class="shortInput" v-else @change="handleChangeSort(scope.row, scope.$index)"></el-input>

                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="200">
            <template slot-scope="scope">
                <el-button type="text" @click="handleOpenRedact(scope.row)">编辑</el-button>
            </template>
            </el-table-column>
        </el-table>
        <redact-broker v-if="showFlag" :brokerInfo="brokerInfo" @close="handleClodeChild"></redact-broker>
    </div>
</template>

<script>
import { buildingBrokerList, buildingBrokerModify } from '@/api/building-list.js'

import redactBroker from './components/redactBroker.vue'
    export default {
        props: ['estateInfo'],
        components: {
            redactBroker
        },
        data() {
            return{
                buildList: [],
                showFlag: false,// 控制子组件是否展示
                brokerInfo: null,// 传递给子组件的值
            }
        },
        methods: {
            handlebuildingBrokerList() {
                let data = {
                    estateId: this.estateInfo.id
                }
                buildingBrokerList(data).then(res=>{
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
            handleChangeShowFlag(row) {// 改变是否展示
                let data = {
                    showFlag: row.showFlag,
                    id: row.id
                }
                buildingBrokerModify(data).then(res=>{
                    if( res.code === 0 ){
                        this.$message.success('保存成功！')
                        this.handlebuildingBrokerList()
                    }else{
                        this.$message.error(res.message)
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
                buildingBrokerModify(data).then(res=>{
                    if( res.code === 0 ){
                        this.$message.success('保存成功！')
                        this.handlebuildingBrokerList()
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            handleOpenRedact(info) {// 打开子组件
                this.showFlag = true;
                this.brokerInfo = info;
            },
            handleClodeChild() {// 关闭子组件
                this.showFlag = false;
                this.handlebuildingBrokerList()
            }
        },
        created() {
            console.log(this.estateInfo)
            this.handlebuildingBrokerList()
        }
    }
</script>

<style scoped>

</style>
