<template lang="html">
  <div class="upload-container">
    <el-upload
      :action="uploadUrl"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-change="change"
      name="upfile"
      :file-list="imgUrl"
      :data="params"
      :limit="1">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl">
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  props:['imgUrl'],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      isShow: true,
      uploadUrl: process.env.SERVER_API + 'file/upload/api',
      params: {
        token: getToken(),
        jobId: 6666
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    change(val) {
      this.$emit('uploadData',val.response)
      console.log('触发上传Event')
    }
  }
}
</script>

<style lang="scss" scoped="scoped">

</style>
