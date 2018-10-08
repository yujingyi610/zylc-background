<template>
    <div>
        <el-form>
            <el-form-item label="楼盘">
                {{estateInfo.estateName}}
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="title"></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input type="textarea" v-model="description"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <div style="display:inline-block;vertical-align:top;padding:10px 0;">
                    <ue-editor ref="ueEditerRef"  :defaultMsg="editContent"/>
                </div>
            </el-form-item>
            <div>
                <el-button type="primary" @click="handleSave">保存</el-button>
                <el-button @click="handleBack">取消</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import { buildingNewsInfo, buildingNewsModify, buildingNewsAppend } from '@/api/building-list.js'
import UeEditor from '@/components/UeEditor/ueeditor.vue'
    export default {
        props: ['estateInfo', 'newsId'],
        watch: {
            newsId(e) {
                if( e ){
                    this.handlebuildingNewsInfo()
                }
            }
        },
        components:{
            'ue-editor':UeEditor
        },
        data() {
            return{
                title: '',
                description: '',
                editContent: ''
            }
        },
        methods: {
            handleBack() {// 取消
                this.$emit('close')
            },
            handlebuildingNewsInfo() {
                if( !this.newsId ){
                    this.title = '';
                    this.description = '';
                    this.editContent = ''
                    return
                }
                buildingNewsInfo({ id: this.newsId }).then(res=>{
                    if( res.code === 0 ){
                        this.title = res.data.title;
                        this.description = res.data.summary;
                        this.editContent = res.data.content
                    }
                })
            },
            handleSave() {// 保存
                console.log(this.newsId)
                let content = this.$refs.ueEditerRef.getUEContent()
                let data = {
                    estateName: this.estateInfo.estateName,
                    estateId: this.estateInfo.id,
                    title: this.title,
                    summary: this.description,
                    content
                }   
                if( this.newsId ){
                    data.id = this.newsId
                    buildingNewsModify(data).then(res=>{
                        if( res.code === 0 ){
                            this.$message.success('保存成功！')
                            this.$emit('close')
                        }else{
                            this,$message.error(res.message)
                        }
                    })
                }else{
                    buildingNewsAppend(data).then(res=>{
                        if( res.code === 0 ){
                            this.$message.success('保存成功！')
                            this.$emit('close')
                        }else{
                            this,$message.error(res.message)
                        }
                    })
                }
            }
        },
        created() {
            this.handlebuildingNewsInfo()
        }
    }
</script>

<style scoped>

</style>