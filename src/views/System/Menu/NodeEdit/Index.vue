<template>
  <div class="Index">
    <div class="set-form-box">
      <span class="form-title">编辑菜单</span>
      <el-row :gutter="20">
        <el-col :span="16">
          <NodeEditForm :data="editData.menuData" @submit="submit" @cancel="cancel"/>
        </el-col>
      </el-row>
    </div>
    <br>
    <div class="set-form-box">
      <div class="form-title">
        <span>按钮或资源</span>
        <el-button size="small" type="primary" style="float: right;margin-top: -8px" @click="addBtn">新增</el-button>
      </div>
      <el-table :data="editData.btnData" style="width: 100%" border>
        <el-table-column prop="name" label="资源名称" align="center"/>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editBtn(scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="delBtn(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--编辑-->
    <BtnEdit :show="isShow" :data="currBtnItem" @cancel="btnEditIsShow = false" @submit="submitModifyBtn" @close="closeBtnForm"/>
  </div>
</template>

<script>
import NodeEditForm from './NodeEditForm.vue'
import BtnEdit from './BtnEdit.vue'
import { getBtnInfo } from 'api/system/menu.js'

export default {
  components: {
    NodeEditForm,
    BtnEdit
  },
  props: ['data', 'btnEditIsShow', 'btnForm'],
  data() {
    return {
      isShow: this.btnEditIsShow,
      editData: {},
      tableData: [],
      currBtnItem: this.btnForm
    }
  },
  watch: {
    data: {
      handler(newVal) {
        this.editData = Object.assign({}, newVal)
      },
      deep: true
    },
    btnForm: {
      handler(newVal) {
        this.currBtnItem = Object.assign({}, newVal)
      },
      deep: true
    },
    btnEditIsShow(newVal) {
      this.isShow = newVal
    }
  },
  methods: {
    // 新增
    addBtn() {
      this.$emit('addBtn')
    },
    closeBtnForm() {
      this.$emit('closeBtnForm')
    },
    editBtn(id) {
      this.$emit('editClick', id)
    },
    cancel() {
      this.$emit('cancel')
    },
    submit(data) {
      this.$emit('submitNode', data)
    },
    delBtn(id) {
      this.$emit('delBtn', id)
    },
    submitModifyBtn(data) {
      this.$emit('submitModifyBtn', data)
    },
    submitAddBtn(data) {
      this.$emit('submitAddBtn', data)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
