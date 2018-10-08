<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>编辑楼盘</span>
            </div>
            <el-form :model="addForm" :inline="true">
                <div>
                    <el-form-item label="楼盘名称">
                        <el-input v-model="addForm.estatesName"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="项目">{{addForm.city.orgUnitName}}</el-form-item>
                    <el-form-item>{{addForm.project.projectName}}</el-form-item>
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
import {modifyPerson, buildingInfo} from '@/api/building-list.js'

import dialogInput from '@/components/dialogInput'
import ChooseMasterDialog from './ChooseMasterDialog'
    export default {
        props: ['estateInfo'],
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
            handleGetredactInfo() {// 获取编辑负责人的数据
                let data = {
                    id: this.estateInfo.id
                }
                buildingInfo(data).then(res=>{
                    if( res.code === 0 ){
                        let data = res.data.dataEstateData;

                        console.log(data)
                        this.addForm.estatesName = data.estateName;
                        this.addForm.city.id = data.companyId;
                        this.addForm.city.orgUnitName = data.companyName;
                        this.addForm.project.id = data.projectId;
                        this.addForm.project.projectName = data.projname;
                        this.addForm.masterId = data.eb2;
                        this.addForm.master = data.eb1;
                    }
                })
            },
            
            openChooseMaster() {// 打开选择项目运营负责人弹框
                this.$refs.ChooseMasterDialogRef.show()
            },
            handleGetOne(info) {// 获得选中的人
                if( info ){
                    console.log(info)
                    this.addForm.master = info.userName;
                    this.addForm.masterId = info.id;
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
                    id: this.estateInfo.id,
                    eb2 : this.addForm.masterId,
                    eb1 : this.addForm.master
                }
                modifyPerson(data).then(res=>{
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
            console.log(this.estateInfo)
            this.handleGetredactInfo()
        }
    }
</script>

<style scoped>

</style>