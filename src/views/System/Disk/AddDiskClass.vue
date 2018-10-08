<template>
  <div class="AddDiskClass">
    <el-dialog
      :visible.sync="visible"
      width="400px"
      @close="close">
      <span slot="title">条目编辑</span>
      <el-form ref="form" :model="formData" label-width="120px">
        <el-form-item label="类型名称：">
          <el-input v-model="formData.typeName"></el-input>
        </el-form-item>
        <el-form-item label="条目名称：">
          <el-input v-model="formData.entryName"></el-input>
        </el-form-item>
        <el-form-item label="条目编码：">
          <el-input v-model="formData.entryCode"></el-input>
        </el-form-item>
        <el-form-item label="条目分组：">
          <el-input v-model="formData.parentId"></el-input>
        </el-form-item>
        <el-form-item label="条目子分组：">
          <el-input v-model="formData.sonId"></el-input>
        </el-form-item>
        <el-form-item label="排序值：">
          <el-input v-model="formData.sort" type="number"></el-input>
        </el-form-item>
        <el-form-item label="条目说明：">
          <el-input v-model="formData.entryDescription" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddDiskClass',
  props: ['show', 'data'],
  data() {
    return {
      formData: {},
      visible: this.show
    }
  },
  watch: {
    show(newVal) {
      this.visible = newVal
    },
    data: {
      handler(newVal) {
        this.formData = Object.assign({}, newVal)
      },
      deep: true
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    submit() {
      this.$emit('submit', this.formData)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
