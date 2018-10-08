<template>
  <div class="Index">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="字典类目" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="字典类型" name="second">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
