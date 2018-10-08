<template>
  <el-dialog title="提示" :visible.sync="visible" width="400px" @close="close">
    <div class="BtnEdit">
      <el-form ref="form" :model="btnForm" label-width="100px">
        <el-form-item label="资源名称：">
          <el-input v-model="btnForm.name"></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="btnForm.sort"></el-input>
        </el-form-item>
        <el-form-item label="菜单ID：">
          <el-input v-model="btnForm.menuId" disabled></el-input>
        </el-form-item>
        <el-form-item label="链接：">
          <el-input v-model="btnForm.href"></el-input>
        </el-form-item>
        <el-form-item label="说明：">
          <el-input v-model="btnForm.meno"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button type="primary" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'BtnEdit',
  props: ['data', 'show'],
  data() {
    return {
      visible: this.show,
      btnForm: {
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
        this.btnForm = newVal
        console.log(newVal)
      },
      deep: true
    },
    show(newVal) {
      this.visible = newVal
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.btnForm)
    },
    cancel() {
      this.$emit('cancel', this.btnForm)
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
