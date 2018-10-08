<template>
    <div class="highlight-item">
        <div class="item-left">
            <div class="text-wrap"><el-input v-model="itemInfo.briTittle" placeholder="亮点标题"></el-input></div>
            <div class="textarea-wrap"><el-input v-model="itemInfo.briContent" type="textarea"  :rows="5" placeholder="亮点内容"></el-input></div>
        </div>
        <div class="item-right">
            <el-upload
                class="avatar-uploader"
                action="https://zylc1.gtdreamlife.com/file/upload/api"
                :data="data"
                name="upfile"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeUpload">
                <img v-if="itemInfo.briPhoto" :src="itemInfo.briPhoto" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
    </div>
</template>

<script>
import { getToken } from '@/utils/auth'
    export default {
        props: ['info'],
        watch: {
            info: {
                handler(val, oldval){
                    console.log(val)
                    if( val != oldval ){
                        this.handleInit(val)
                    }
                },
                deep: true
            },
        },
        data() {
            return{
                itemInfo: {
                    briPhoto: '',
                    briTittle: '',
                    briContent: ''
                },
                data: {
                    token: getToken()
                },
                
            }
        },
        methods: {
            handleInit(info) {// 初始化数据
                console.log(info)
                if( info ){
                    this.itemInfo.briPhoto = info.briPhoto;
                    this.itemInfo.briTittle = info.briTittle;
                    this.itemInfo.briContent = info.briContent;
                }else{
                    // this.changeFlag = true;
                }
                
            },
            /*******上传图片**********/
            handleAvatarSuccess(res, file) {
                console.log(res)
                console.log(file)
                this.itemInfo.briPhoto = res.data;
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
            if( this.info ){
                this.handleInit(this.info)
            }
        }
    }
</script>

<style scoped>
.highlight-item{
    padding: 20px;
    border: 1px solid #666;
    width: 600px;
    overflow: hidden;
}
.item-left{
    width: 350px;
    float: left;
}
.text-wrap{
    margin-bottom: 20px;
}
.item-right{
    width: 178px;
    float: right;
}
</style>