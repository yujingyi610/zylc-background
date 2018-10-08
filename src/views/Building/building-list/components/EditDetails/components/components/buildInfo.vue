<template>
    <div class="buildInfo">
        <el-form>
            <el-form-item label="楼栋信息图" label-width="250px">
                <el-upload
                    class="avatar-uploader"
                    action="https://zylc1.gtdreamlife.com/file/upload/api"
                    :data="data"
                    name="upfile"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeUpload">
                    <img v-if="aerialView" :src="aerialView" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getToken } from '@/utils/auth'
    export default {
        props: ['dataEstateData'],
        watch: {
            dataEstateData: {
                handler(val, oldval){
                    console.log(val)
                    if( val != oldval ){
                        this.handleInit(val, this.spotListData)
                    }
                },
                deep: true
            }
        },
        data() {
            return{
                aerialView: '',
                data: {
                    token: getToken()
                },
            }
        },
        methods: {
            handleInit(info) {// 初始化数据
                console.log(info)
                if( info ){
                    this.aerialView = info.aerialView;
                }else{
                    // this.changeFlag = true;
                }
                
            },
            /*******上传图片**********/
            handleAvatarSuccess(res, file) {
                console.log(res)
                console.log(file)
                this.aerialView = res.data;
            },
            beforeUpload(file) {
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
            if( this.dataEstateData ){
                this.handleInit(this.dataEstateData)
            }
        }
    }
</script>

<style scoped>

</style>