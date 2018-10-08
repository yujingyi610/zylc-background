<template>
  <div class="Index app-container">
    <el-tabs>
      <el-tab-pane label="客户列表">
        <Consumer/>
      </el-tab-pane>
      <el-tab-pane :lazy="true" label="客户反馈">
        <Feedback/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Consumer from './Consumer.vue'
import Feedback from './Feedback.vue'

export default {
  name: 'Index',
  components: {
    Consumer,
    Feedback
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
