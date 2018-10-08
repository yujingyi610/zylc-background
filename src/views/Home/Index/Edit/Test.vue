<template>
  <div class="Test">
    <el-upload
      action="https://zylc1.gtdreamlife.com/file/upload/api"
      list-type="picture-card"
      name="upfile"
      :limit="limit"
      :data="params"
      :multiple="multiple"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="success"
      :on-change="change">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  name: 'UploadIcon',
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 1
    },
    listType: {
      type: String,
      default: 'picture-card'
    }
  },
  data() {
    return {
      imageUrl: '',
      dialogVisible: false,
      dialogImageUrl: '',
      params: {
        token: getToken(),
        jobId: 6666
      }
    }
  },
  mounted: {

  },
  methods: {
    success(response) {
      const imgUrl = response.data
      this.dialogImageUrl = imgUrl
      this.$emit('success', imgUrl)
    },
    change(file, fileList) {
      this.$emit('change', file, fileList)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  $width: 40px;
  $height: 40px;
  .test{
    .el-upload .el-upload--picture-card {
      width: $width;
      height: $width;
      line-height: $width !important;
    }
    .el-upload--picture-card {
      width: $width;
      height: $width;
      line-height: $width !important;
    }
    .el-upload-list--picture-card .el-upload-list__item{
      width: $height;
      height: $height;
    }
    .el-dialog__wrapper{
      position: fixed !important;
    }
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
      width: $width;
      height: $height;
      line-height: $height;
      text-align: center;
    }
    .avatar {
      width: $width;
      height: $height;
      display: block;
    }
  }
</style>
