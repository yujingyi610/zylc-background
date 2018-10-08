<template>
  <div class="UploadImg">
    <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      :on-success="success"
      :before-upload="beforeAvatarUpload"
      :action="uploadUrl"
      name="upfile"
      :data="params"
      :on-change="change">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  name: 'UploadImg',
  props: ['index', 'showImg'],
  data() {
    return {
      imageUrl: this.showImg,
      uploadUrl: process.env.SERVER_API + 'file/upload/api',
      params: {
        token: getToken(),
        jobId: 6666
      }
    }
  },
  watch: {
    showImg(newVal) {
      this.imageUrl = newVal
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG = file.type.substring(0, 5) === 'image'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('请选择图片文件!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    success(response) {
      const imgUrl = response.data
      // this.imageUrl = imgUrl
      this.$emit('success', {
        imgUrl,
        index: this.index
      })
    },
    change(file, fileList) {
      this.$emit('change', file, fileList)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  $size: 150px;
  .UploadImg{
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: $size;
      height: $size;
      line-height: $size;
      text-align: center;
    }
    .avatar {
      width: $size;
      height: $size;
      display: block;
    }
  }
</style>
