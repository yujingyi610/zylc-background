<template>
    <div style="overflow: hidden">
        <p class="title">{{title}}</p>
        <div style="float: left">
            <div v-for="(item, index) in fileList" :key="index" style="display: inline-block; margin-right: 20px;">
                <img :src="item.url" style="width: 148px; height: 148px"  class="pic-wrap"/>
                <div style="text-align: center">
                    <el-button v-if="item.showFlag === '1'" type="text" @click="handleSetting(index)">设为封面</el-button>
                    <el-button v-else type="text">封面</el-button>
                    <el-button type="text" @click="handleRemove(index, item.showFlag)">删除</el-button>
                </div>
            </div>
        </div>
        <div style="float: left">
            <el-upload
                action="https://zylc1.gtdreamlife.com/file/upload/api"
                :data="data"
                name="upfile"
                list-type="picture-card"
                :show-file-list="false"
                :on-remove="handleRemove"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeUpload">
                <i class="el-icon-plus"></i>
            </el-upload>
        </div>
        
    </div>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  props: ["title", 'list'],
  watch: {
      list: {
          handler(newVal, oldVal) {
              this.fileList = this.list;
              this.fileList.map(item=>{
                    item.url = item.uriwechat
                })
          },
          deep:true
      }
  },
  data() {
    return {
        data: {
            token: getToken()
        },
        fileList: []
    };
  },
  methods: {
    handleRemove(index, type) {// 删除
        let title = ''
        if( type === '1' ){
            title = '确定删除该图片?'
        }else{
            title = '该图片已设为封面，是否继续?'
        }
        this.$confirm(title, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.fileList.splice(index, 1)
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
        })
      
    },
    handleSetting(index) {// 设为封面
        this.$emit('setting', {
            title:this.title,
            index
        })
    },
    handleAvatarSuccess(res, file) {
        console.log(res)
        console.log(file)
        file.showFlag = '1'
        file.uriwechat = res.data
        this.fileList.push(file)
        console.log(this.fileList)
        // this.imageUrl = URL.createObjectURL(file.raw);
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
      this.fileList = this.list;
      this.fileList.map(item=>{
          item.url = item.uriwechat
      })
      console.log(this.fileList)
  }
};
</script>

<style scoped>
.title{
    line-height: 40px;
}
.pic-wrap{
    display: inline-block;
    
    border: 1px dashed #c0ccda;
    border-radius: 6px;
}
</style>