<template>
    <div class="highlight">
        <el-form :model="form" label-width="250px">
            <el-form-item label="楼盘亮点主标题">
                <el-input v-model="form.brightTittle" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="楼盘亮点介绍语">
                <el-input v-model="form.brightDesc" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="亮点音频">
                <el-upload  v-if="!uploadFlag"
                    class="upload-demo"
                    action="https://zylc1.gtdreamlife.com/file/upload/api"
                    :data="data"
                    name="upfile"
                    :on-success="updateAnnexSuccess"
                    :before-upload="beforeAvatarUpload"
                    :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <div v-else>
                    <wx-audio :brightVoice="form.brightVoice"></wx-audio>
                    <span class="remove" @click="handleRemoveAudio">删除</span>
                </div>
                
            </el-form-item>
            
            <el-form-item label="楼盘亮点">
                <div class="listItem" v-for="(item, index) in highlightList" :key="index">
                    <highlight-item :index="index" :ref="'ref' + index" :info="item"></highlight-item>
                    <i class="removeIocn el-icon-remove" @click="handleRemoveListItem(index)"></i>
                    <i class="plusIocn el-icon-circle-plus" v-if="index === highlightList.length - 1" @click="handleAddListItem"></i>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import wxAudio from '@/components/wx-audio/wx-audio.vue'

import highlightItem from './highlight-item.vue'
    export default {
        props: ['dataEstateData', 'spotListData'],
        components: {
            wxAudio,
            highlightItem
        },
        watch: {
            dataEstateData: {
                handler(val, oldval){
                    console.log(val)
                    if( val != oldval ){
                        this.handleInit(val, this.spotListData)
                    }
                },
                deep: true
            },
            spotListData: {
                handler(val, oldval){
                    console.log(val)
                    if( val != oldval ){
                        this.handleInit(this.dataEstateData, val)
                    }
                },
                deep: true
            },
            'form.brightVoice'(e) {
                if( e ){
                    this.uploadFlag = true;
                }else{
                    this.uploadFlag = false
                }
            }
        },
        data() {
            return{
                data: {
                    token: getToken()
                },
                form:{
                    brightTittle: '',
                    brightDesc: '',
                    brightVoice: '',
                },
                uploadFlag: true,
                loading:false,
                fileList:[],
                

                highlightList: []
            }
        },
        methods: {
            handleInit(info, list) {// 初始化数据
                console.log(info)
                if( info ){
                    this.form.brightTittle = info.brightTittle;
                    this.form.brightDesc = info.brightDesc;
                    this.form.brightVoice = info.brightVoice;
                    
                    if( this.form.brightVoice ){
                        this.uploadFlag = true
                        console.log(info.brightVoice)
                    }
                }else{
                    // this.changeFlag = true;
                }
                if( list && list.length > 0 ){
                    this.highlightList = list
                }else{
                    this.highlightList = [{}]
                }
                
            },
            /*********上传音频****/
            updateAnnexSuccess(response) {
                // 上传成功的回调
                this.loading = false;
                if (response.status === 200) {
                    this.$message({
                        type: "success",
                        message: "上传成功！"
                    });
                } else {
                    this.$message.error(res.message);
                }
            },
            beforeAvatarUpload(file) {
                // 上传前判断文件大小
                const isLt2M = file.size / 1024 / 1024 < 10;
                if (!isLt2M) {
                    this.$message.error("上传文件大小不能超过 10MB!");
                }
                return isLt2M;
            },
            handleRemoveAudio() {// 删除音频
                this.fileList = [];
                this.uploadFlag = true;
            },
            handleAddListItem() {// 新增亮点子组件
                this.highlightList.push({})
            },
            handleRemoveListItem(index) {// 删除亮点子组件
                if( this.highlightList.length === 1 ){
                    this.$message.error('楼盘亮点不能为空！')
                    return
                }
                this.highlightList.splice(index, 1)
            }
        },
        created() {
            console.log(this.dataEstateData)
            console.log(this.spotListData)
            if( this.dataEstateData ){
                this.handleInit(this.dataEstateData)
            }
        }
    }
</script>

<style scoped>
.remove{
    color: #409EFF;
    padding-left: 20px;
    cursor: pointer;
}
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
.listItem{
    width: 700px;
    position: relative;
    margin-bottom: 20px;
}
.removeIocn{
    font-size: 36px;
    position: absolute;
    right: 51px;
    bottom: 0;
    cursor: pointer;
}
.plusIocn{
    position: absolute;
    font-size: 36px;
    right: 0;
    bottom: 0px;
    cursor: pointer;
}
</style>