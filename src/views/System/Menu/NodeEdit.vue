<template>
  <div class="NodeEdit">
    <el-form ref="form" :model="nodeForm" label-width="100px">
      <el-form-item label="菜单名称：">
        <el-input v-model="nodeForm.name"></el-input>
      </el-form-item>
      <el-form-item label="父ID：">
        <el-input v-model="nodeForm.parentId"></el-input>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="nodeForm.sort"></el-input>
      </el-form-item>
      <el-form-item label="链接：">
        <el-input v-model="nodeForm.href"></el-input>
      </el-form-item>
      <el-form-item label="图标：">
        <el-input v-model="nodeForm.icon"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'NodeEdit',
  props: ['data'],
  data() {
    return {
      nodeForm: {
        id: '',
        parentId: '',
        name: '',
        sort: '',
        href: '',
        icon: ''
      }
    }
  },
  watch: {
    data: {
      handler(newVal) {
        this.nodeForm = newVal
      },
      deep: true
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.nodeForm)
    },
    cancel() {
      this.$emit('cancel', this.nodeForm)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
