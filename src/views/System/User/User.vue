<template>
  <div class="User app-container">
    <div>
      <el-form :inline="true" :model="queryData" :rules="rules" ref="queryForm">
        <el-form-item label="员工号:" prop="userCode">
          <el-input v-model.number="queryData.userCode" placeholder="请输入员工号" />
        </el-form-item>
        <el-form-item label="登录账号:">
          <el-input v-model.number="queryData.changeUserName" placeholder="请输入登录账号" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table v-loading="loading" :data="list" border style="width: 100%">
        <el-table-column prop="userCode" label="员工号" width="120" align="center"/>
        <el-table-column prop="changeUserName" label="登录账号" width="150" align="center"/>
        <el-table-column prop="userName" label="姓名" width="150" align="center"/>
        <el-table-column prop="userTypeName" label="用户类型	" width="150" align="center"/>
        <el-table-column prop="mainPositionName" label="职位" width="160" align="center"/>
        <el-table-column prop="nationName" label="民族" width="120" align="center"/>
        <el-table-column prop="nativePlaceName" label="地址" align="center"/>
        <el-table-column label="操作" align="center" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="setRole(scope.row)">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :total="count"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change = "handSizeChange"
        @current-change="handPageChange"/>
    </div>
    <el-dialog
      :visible.sync="visible"
      width="400px"
      :title="currItem.userName">
      <el-checkbox-group v-model="roleChecked">
        <div v-for="(item, index) in roleList" :key="index">
          <el-checkbox :label="item.id">{{ item.name }}</el-checkbox>
        </div>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, getRoleList, setUserRole } from 'api/system/user.js'
import { numberType } from '@/utils/rules.js'
import { getToken } from '@/utils/auth'

export default {
  name: 'User',
  data() {
    return {
      visible: false,
      roleList: [],
      roleChecked: [],
      currItem: '',
      rules: {
        userCode: [{ validator: numberType, trigger: 'blur' }]
      },
      queryData: {
        pageCurrent: 1,
        pageLimit: this.$store.getters.pageLimt,
        userCode: '', // 员工号
        changeUserName: ''// 登录账号
      },
      loading: true,
      list: [],
      count: 50
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.refresh()
    })
  },
  methods: {
    handSizeChange(size) {
      this.queryData.pageLimit = size
      this.refresh()
    },
    exportExcell() {
      location.href = process.env.BASE_API + '/customUser/proexport?token=' + getToken()
    },
    handPageChange(page) {
      this.queryData.pageCurrent = page
      this.refresh()
    },
    setRole(item) {
      this.visible = true
      this.currItem = item
      getRoleList(item.id).then((res) => {
        const roleList = res.data.roleList
        const checkedList = res.data.userRolelist
        const list = []
        roleList.forEach((val, index) => {
          list.push({
            name: val.name,
            id: val.id
          })
        })
        checkedList.forEach((cval, cindex) => {
          this.$set(this.roleChecked, cindex, cval.id)
        })
        this.roleList = list
      })
    },
    submitRole() {
      const data = {
        userId: this.currItem.id,
        roleIdStr: this.roleChecked.join(',')
      }
      this.visible = false
      setUserRole(data).then((res) => {
        this.$message({
          message: '设置角色成功',
          type: 'success'
        })
        this.refresh()
        this.roleChecked = []
      })
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
      this.$refs['queryForm'].validate((valid) => {
        if (valid) {
          this.queryData.pageCurrent = 0
          this.refresh()
        }
      })
    },
    getData() {
      return new Promise((resolve) => {
        getUserList(this.queryData).then((res) => {
          this.list = res.data
          resolve(res)
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
