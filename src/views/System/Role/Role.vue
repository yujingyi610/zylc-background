<template>
  <div class="Role app-container">
    <div>
      <el-form :inline="true" :model="queryData" ref="queryForm">
        <el-form-item label="角色名称:">
          <el-input v-model="queryData.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" style="margin-top: -60px;float: right" @click="addRole">新建角色</el-button>
    </div>
    <div>
      <el-table v-loading="loading" :data="list" border style="width: 100%">
        <el-table-column prop="name" label="角色名称" align="center"/>
        <el-table-column prop="roleType" label="角色类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.roleType == 0">流程角色</span>
            <span v-else>非流程角色</span>
          </template>
        </el-table-column>
        <el-table-column prop="useable" label="启用状态" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.useable == 0" type="success">启用</el-tag>
            <el-tag v-else type="danger">停用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="modifyRole(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="stopRole(scope.row)">
              <span v-if="scope.row.useable == 1">启用</span>
              <span v-else>停用</span>
            </el-button>
            <el-button type="text" size="small" @click="setRole(scope.row)">权限分配</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :total="count"
        :page-size="queryData.pageLimit"
        layout="total,sizes , prev, pager, next, jumper"
        @current-change="handPageChange"/>
    </div>
    <permission-edit :curr-id="id" :show="permissionEditIsShow" @close="permissionEditIsShow = false" @submit="submitPermission"/>
    <RoleEdit :data="currItem" :show="visible" @close="close" @submit="submitEdit" type="edit"/>
    <RoleEdit :show="addIsShow" @close="close" @submit="submitAdd" type="add"/>
  </div>
</template>

<script>
import { getRoleList, modifyRole, addRole, setPermissionList } from 'api/system/role.js'
// import { numberType } from '@/utils/rules.js'
// import { getToken } from '@/utils/auth'
import RoleEdit from './RoleEdit.vue'
import PermissionEdit from './PermissionEdit.vue'

export default {
  name: 'Role',
  components: {
    RoleEdit,
    PermissionEdit
  },
  data() {
    return {
      treeShow: true,
      permissionEditIsShow: false,
      visible: false,
      currItem: '',
      id: '',
      addIsShow: false,
      queryData: {
        pageCurrent: 1,
        pageLimit: this.$store.getters.pageLimt,
        name: '' // 角色名称
      },
      loading: true,
      list: [],
      count: 50,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.refresh()
    })
  },
  methods: {
    submitPermission(data) {
      this.permissionEditIsShow = false
      setPermissionList(data).then((res) => {
        this.$message({
          type: 'success',
          message: '权限分配成功'
        })
      })
    },
    setRole(item) {
      this.id = item.id
      this.permissionEditIsShow = true
    },
    addRole() {
      this.addIsShow = true
    },
    submitAdd(data) {
      addRole(data).then((res) => {
        this.$message({
          message: '新增成功',
          type: 'success'
        })
        this.addIsShow = false
        this.refresh()
      })
    },
    submitEdit(data) {
      modifyRole(data).then((res) => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.visible = false
        this.refresh()
      })
    },
    stopRole(item) {
      const useable = item.useable
      const id = item.id
      if ( useable == 0 ) {
        const data = {
          id,
          useable: 1
        }
        modifyRole(data).then((res) => {
          this.$message({
            message: '启用成功',
            type: 'success'
          })
          this.getData()
        })
      } else {
        const data = {
          id,
          useable: 0
        }
        modifyRole(data).then((res) => {
          this.$message({
            message: '停用成功',
            type: 'success'
          })
          this.getData()
        })
      }
    },
    modifyRole(item) {
      this.currItem = item
      this.visible = true
    },
    close() {
      this.visible = false
    },
    handPageChange(page) {
      this.queryData.pageCurrent = page
      this.refresh()
    },
    refresh() {
      this.loading = true
      this.getData().then(() => {
        setTimeout(() => {
          this.loading = false
        }, 500)
      })
    },
    search() {
      this.queryData.pageCurrent = 0
      this.refresh()
    },
    getData() {
      return new Promise((resolve) => {
        getRoleList(this.queryData).then((res) => {
          this.list = res.data
          resolve(res)
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tree-box{
  width: 100%;
  height: 600px;
  overflow: auto
}
</style>
