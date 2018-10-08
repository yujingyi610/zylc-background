<template>
    <div class="hosueTypePic">
        <el-form :model="headForm">
            <el-form-item label="楼盘名">
                {{headForm.estatesName}}
            </el-form-item>
            <el-form-item label="组团名">
                {{headForm.groupName}}
            </el-form-item>
            <el-form-item label="楼栋名">
                {{headForm.buildName}}
            </el-form-item>
            <el-form-item label="户型图">
                <el-button @click="handleOpenDialog">选择户型图</el-button>
                <div>
                    <div v-for="(item, index) in list" :key="index" class="show-pic-wrap">
                        <img :src="item.picWechat" />
                        <p>{{item.houseTypeName}} {{item.houseName}}</p>
                        <i class="el-icon-circle-close closeIcon" @click="handleRemovePic(index)"></i>
                    </div>
                </div>
            </el-form-item>
            <div>
                <el-button type="primary" @click="handleSave">保存</el-button>
                <el-button @click="handleGoBack">取消</el-button>
            </div>
            
        </el-form>

        <el-dialog title="选择户型图" :visible.sync="dialogVisible" width="830px">
            <div class="pic-wrap">
                <el-checkbox-group v-model="checkList">
                    <el-checkbox v-for="(item, index) in picList" :key="index" :label="item">
                        <img :src="item.picWechat" class="img"/>
                        <p style="text-align: center">{{item.houseTypeName}} {{item.houseName}}</p>
                    </el-checkbox>
                </el-checkbox-group>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSaveChoose">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { houselist, buildingGroupModify } from '@/api/building-list.js'
    export default {
        props: ['groupInfo', 'estateInfo', 'buildInfo'],
        data () {
            return{
                headForm: {
                    estatesName: '',
                    groupName: '',
                    buildName: ''
                },
                list: [],
                dialogVisible: false,
                picList: [],// 弹框内户型图列表

                checkList: []
            }
        },
        methods: {
            handleSave() {// 保存
                console.log(this.list)
                let arr = this.list.map(item=>{
                    return {
                        houseId: item.id
                    }
                })
                let arrStr = JSON.stringify(arr)
                let data = {
                    estateId: this.estateInfo.id,
                    id: this.buildInfo.id,
                    arr: arrStr
                }
                buildingGroupModify(data).then(res=>{
                    if( res.code === 0 ){
                        this.$message.success('保存成功！')
                        this.$emit('closeChild')
                    }else{
                        this.$message.error(res.msg)
                    }
                })
            },
            handleGoBack() {// 返回
                this.$emit('closeChild')

            },
            handleOpenDialog() {
                this.dialogVisible = true;
                this.checkList = []
                this.handlehouselist()
            },
            handlehouselist() {// 获取户型图列表
                let arr = this.list.map(item=>{
                    return item.id
                })
                let id = JSON.stringify(arr)
                let data = {
                    estateId: this.estateInfo.id,
                    id
                    // id: '[1]'
                    // id: [1,2]
                }
                houselist(data).then(res=>{
                    if( res.code === 0 ){
                        this.picList = res.data;
                    }
                })
            },
            handleSaveChoose() {// 确定户型图
                this.list.push(...this.checkList)
                this.dialogVisible = false
                
            },
            handleRemovePic(index) {// 删除户型图
                this.list.splice(index, 1)
            }
        },
        created() {
            this.headForm.estatesName = this.estateInfo.estateName;
            this.headForm.groupName = this.groupInfo.groupName;
            this.headForm.buildName = this.buildInfo.buildingName;
            this.list = this.buildInfo.houseList
            console.log(this.buildInfo)
            this.handlehouselist()
        }
    }
</script>

<style scoped>
.img {
    width: 250px;
    height: 179px;
}
.pic-wrap{
    max-height: 600px;
    overflow: auto;
}
.show-pic-wrap{
    position: relative;
    display: inline-block;
    margin: 20px;
}
.show-pic-wrap img{
    width: 300px;
    height: 200px;
}
.closeIcon{
    position: absolute;
    right: -13px;
    top: -13px;
    font-size: 26px;
    cursor: pointer;
}
</style>