<template>
    <div class="redactBroker">
        <el-form :model="form" label-width="200px">
            <el-form-item label="头像">
                <el-upload
                    class="avatar-uploader"
                    action="https://zylc1.gtdreamlife.com/file/upload/api"
                    :data="data"
                    name="upfile"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="form.photo" :src="form.photo" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="经纪人姓名">
                <el-input v-model="form.userName" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="所属城市">
                <el-input v-model="form.city" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="负责楼盘">
                <el-input v-model="form.chargeEstate" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input v-model="form.phone" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="经纪人描述">
                <el-input v-model="form.userDesc" size="mini"></el-input>
            </el-form-item>
            <div>
                <el-button type="primary" @click="handleSave">保存</el-button>
                <el-button @click="handleGoBack">返回</el-button>
            </div>
        </el-form>
    </div>  
</template>

<script>
import { getToken } from '@/utils/auth'
import { buildingBrokerInfo, buildingBrokerModify } from '@/api/building-list.js'
    export default {
        props: ['brokerInfo'],
        data() {
            return{
                form: {

                },
                imageUrl:'',
                data: {
                    token: getToken()
                }
            }
        },
        methods: {
            handlebuildingBrokerInfo() {// 获取经纪人信息
                let data = {
                    id: this.brokerInfo.id
                }
                buildingBrokerInfo(data).then(res=>{
                    if( res.code === 0 ){
                        console.log(res)
                        this.form = res.data;
                    }
                })
            },
            handleSave() {// 保存   
                buildingBrokerModify(this.form).then(res=>{
                    if( res.code === 0 ){
                        this.$message.success('保存成功！')
                        this.$emit('close')
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            handleGoBack() {// 返回
                this.$emit('close')
            },
            /*******上传图片**********/
            handleAvatarSuccess(res, file) {
                if( res.code === 0 ){
                    // this.form.photo = res.data;
                    this.$set(this.form, 'photo', res.data)
                    console.log(this.form.photo)
                }
                // console.log(res)
                // console.log(file)
                // this.form.photo = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                // const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                // if (!isJPG) {
                // this.$message.error('上传头像图片只能是 JPG 格式!');
                // }
                // if (!isLt2M) {
                // this.$message.error('上传头像图片大小不能超过 2MB!');
                // }
                return isLt2M;
            }
        },
        created() {
            this.handlebuildingBrokerInfo()
        }
    }
</script>

<style scoped>

</style>