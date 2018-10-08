<template>
  <div class="Index app-container">
    <router-view/>
  </div>
</template>

<script>
import Edit from './Edit/Edit.vue'
import upload from './Edit/UploadIcon.vue'

export default {
  name: 'List',
  components: {
    Edit,
    upload
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .Index{
    position: relative;
    .el-dialog__wrapper{
      position: absolute !important;
    }
  }
</style>
