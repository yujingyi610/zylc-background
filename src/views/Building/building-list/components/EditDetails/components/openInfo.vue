<template>
    <div>
        <div style="overflow: hidden">
            <el-button @click="handleOpenDialog">添加</el-button>
            <el-table :data="list" style="width: 100%" :border="true">
                <el-table-column prop="displayOpenTime" label="展示开盘开盘时间" min-width="180" align="center"></el-table-column>
                <el-table-column prop="strActualOpenTime" label="实际开盘时间" min-width="180" align="center"></el-table-column>
                <el-table-column prop="openBuildingInfo" label="开盘楼栋" min-width="400" align="center"></el-table-column>
                <el-table-column label="操作" align="center" min-width="200">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleRedact(scope.row)">编辑</el-button>
                    <el-button type="text" @click="handleRemove(scope.row.id)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="开盘信息" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="830px">
            <el-form :model="form">
                <el-form-item label="实际开盘时间">
                    <el-date-picker v-model="form.actualOpenTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="展示开盘时间">
                    <el-input v-model="form.displayOpenTime"></el-input>
                    <!-- <el-date-picker v-model="form.displayOpenTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker> -->
                </el-form-item>
                <el-form-item label="开盘房源">
                    <el-input v-model="form.openBuildingInfo"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSaveChoose">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { estateInfoList, estateInfoAppend, estateInfoModify, estateInfoDiscard } from '@/api/building-list.js'
    export default {
        props: ['estateInfo'],
        data() {
            return{
                list: [],
                dialogVisible: false,
                form: {
                    actualOpenTime:'',// 实际开盘时间
                    displayOpenTime:'',// 展示开盘时间
                    openBuildingInfo:'',// 开盘楼栋信息内容
                }
            }
        },
        methods: {
            handleRedact(row) {// 编辑
                this.form.actualOpenTime = row.actualOpenTime;
                this.form.displayOpenTime = row.displayOpenTime;
                this.form.openBuildingInfo = row.openBuildingInfo;
                this.form.id = row.id;
                this.dialogVisible = true;
            },
            handleRemove(id) {// 删除
                estateInfoDiscard({id}).then(res=>{
                    if( res.code === 0 ){
                        this.$message.success('删除成功！')
                        this.handleestateInfoList()
                    }else{
                        this.$message.error(res.msg)
                    }
                })
            },
            handleestateInfoList() {// 获取列表
                let data = {
                    // estateId: '760204'
                    estateId: this.estateInfo.id
                }
                estateInfoList(data).then(res=>{
                    if( res.code === 0 ){
                        this.list = res.data.pageListData
                    }
                })
            },
            handleOpenDialog() {// 打开弹框
                this.form.actualOpenTime = '';
                this.form.displayOpenTime = '';
                this.form.openBuildingInfo = '';
                this.form.id = '';
                this.dialogVisible = true;
            },
            handleSaveChoose() {// 弹框保存
                let data = {
                    estateId: this.estateInfo.id,
                    // estateId: '760204',
                    estateName: this.estateInfo.estateName,
                    displayOpenTime: this.form.displayOpenTime,
                    actualOpenTime: this.form.actualOpenTime,
                    openBuildingInfo: this.form.openBuildingInfo
                }
                if(this.form.id ){
                    data.id = this.form.id
                    estateInfoModify(data).then(res=>{
                        if( res.code === 0 ){
                            this.$message.success('保存成功！')
                            this.dialogVisible = false;
                            this.handleestateInfoList()
                        }else{
                            this.$message.error(res.msg)
                        }
                    })
                }else{
                    estateInfoAppend(data).then(res=>{
                        if( res.code === 0 ){
                            this.$message.success('保存成功！')
                            this.dialogVisible = false;
                            this.handleestateInfoList()
                        }else{
                            this.$message.error(res.msg)
                        }
                    })
                }
                
            }
        },
        created() {
            this.handleestateInfoList()
        }
    }
</script>

<style scoped>

</style>