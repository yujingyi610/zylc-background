<template>
  <div class="RoleEdit">
    <el-dialog
      :title="type == 'edit' ? '编辑角色' : '新增角色'"
      :visible.sync="visible"
      width="30%"
      @close="close">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="角色名称:">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色类型:">
          <el-select v-model="editForm.roleType" placeholder="请选择角色类型">
            <el-option label="流程角色" value="0"></el-option>
            <el-option label="非流程角色" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="启用状态:">
          <el-select v-model="editForm.useable" placeholder="请选择角色类型">
            <el-option label="启用" value="0"></el-option>
            <el-option label="停用" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'RoleEdit',
  props: ['show', 'data', 'type'],
  data() {
    return {
      visible: this.show,
      editForm: {
        name: '',
        useable: '', // 0.启用 1.停用
        roleType: '' // 0.流程角色1.非流程角色
      }
    }
  },
  watch: {
    show(newVal) {
      this.visible = newVal
    },
    data: {
      handler(newVal) {
        this.editForm = Object.assign({}, newVal)
      },
      deep: true
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    cancle() {
      this.visible = false
    },
    confirm() {
      const emitData = {
        id: this.editForm.id,
        name: this.editForm.name,
        useable: this.editForm.useable,
        roleType: this.editForm.roleType
      }
      this.$emit('submit', emitData)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
