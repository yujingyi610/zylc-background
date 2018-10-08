<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>新建楼盘</span>
            </div>
            <el-form :model="addForm" :inline="true" :rules="rules">
                <div>
                    <el-form-item label="楼盘名称">
                        <el-input v-model="addForm.estatesName"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="选择项目">
                        <el-select placeholder="请选择城市公司" v-model="addForm.city" value-key="id">
                            <el-option v-for="(item, index) in cityOption" :key="index" :label="item.projectCityName" :value="item"></el-option>
                        </el-select>

                    </el-form-item>
                    <el-form-item>
                        <el-select placeholder="请选择项目" v-model="addForm.project" value-key="id">
                            <el-option v-for="(item, index) in projectOption" :key="index" :label="item.projectName" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="选择项目运营负责人">
                        <div @click="openChooseMaster">
                            <dialog-input :val="addForm.master"></dialog-input>
                        </div>
                    </el-form-item>
                </div>
                <div>
                    <el-button type="primary" @click="handleGoBack">返回</el-button>
                    <el-button type="primary" @click="handleSave">保存</el-button>
                </div>
            </el-form>
        </el-card>
        <choose-master-dialog ref="ChooseMasterDialogRef" @chooseOne="handleGetOne"></choose-master-dialog>
    </div>
</template>

<script>
import {companyList, projectList, append} from '@/api/building-list.js'

import dialogInput from '@/components/dialogInput'
import ChooseMasterDialog from './ChooseMasterDialog'
    export default {
        watch: {
          "addForm.city": function(e) {
            this.addForm.project = '';
              if( e && e.projectCityCode ){
                  this.handleprojectList(e.projectCityCode);
              }
          }
        },
        components: {
            dialogInput,
            ChooseMasterDialog
        },
        data() {
            return {
                cityOption: [],// 城市公司下拉数据
                projectOption: [],// 项目公司下拉数据
                addForm: {
                    estatesName: null,
                    city: {},
                    project: {},
                    master: null,
                    masterId: null
                }
            }
        },
        methods: {
            handlecityList() {// 选择城市公司下拉数据
                let data = {
                    orgUnitType:'30',
                    jobId: new Date().getTime()
                }
                companyList(data).then(res=>{
                    if( res.code === 0 ){
                        this.cityOption = res.data
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            handleprojectList(companyId) {// 选择项目下拉数据
                let data = {
                    companyId,
                    jobId: new Date().getTime()
                }
                projectList(data).then(res=>{
                    if( res.code === 0 ){
                        this.projectOption = res.data
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            openChooseMaster() {// 打开选择项目运营负责人弹框
                this.$refs.ChooseMasterDialogRef.show()
            },
            handleGetOne(info) {// 获得选中的人
                if( info ){
                    console.log(info)
                    this.$set(this.addForm, 'master', info.userName)
                    this.$set(this.addForm, 'masterId', info.id)
                }else{
                    this.addForm.master = null;
                    this.addForm.masterId = null;
                }
            },
            handleGoBack() {// 返回
                this.$emit('close')
            },
            handleSave() {// 保存
                let data = {
                    estateName : this.addForm.estatesName,
                    companyId : this.addForm.city.id,
                    companyName : this.addForm.city.orgUnitName,
                    projectId : this.addForm.project.id,
                    projname : this.addForm.project.projectName,
                    eb2 : this.addForm.masterId,
                    eb1 : this.addForm.master
                }
                append(data).then(res=>{
                    if( res.code === 0 ){
                        this.$message.success('新增成功！')
                        this.$emit('close')
                    }else{
                        this.$message.error(res.message)
                    }
                })
            }
        },
        created() {
            this.handlecityList()
        }
    }
</script>

<style scoped>

</style>
