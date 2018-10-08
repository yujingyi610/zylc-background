<template>
  <div class="Disk app-container">
    <el-tabs>
      <el-tab-pane label="字典类目">
        <DiskClass/>
      </el-tab-pane>
      <el-tab-pane :lazy="true" label="字典类型">
        <DiskType/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DiskClass from './DiskClass.vue'
import DiskType from './DiskType.vue'

export default {
  name: 'Disk',
  components: {
    DiskClass,
    DiskType
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
