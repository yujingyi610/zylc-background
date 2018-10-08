<template>
  <div class="DiskType">
    <div>
      <el-form :inline="true" :model="queryData" ref="queryForm">
        <el-form-item label="类型名称：" prop="userCode">
          <el-input v-model.number="queryData.typeName" placeholder="请输入类型名称" />
        </el-form-item>
        <el-form-item label="条目编码：" prop="userCode">
          <el-input v-model.number="queryData.entryCode" placeholder="请输入条目编码" />
        </el-form-item>
        <el-button type="primary" style="float: right" @click="addIsShow = true">
          新增条目
        </el-button>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table v-loading="loading" :data="list" border style="width: 100%">
        <el-table-column prop="typeName" label="类型名称" width="150" align="center"/>
        <el-table-column prop="typeCode" label="类型编码" width="150" align="center"/>
        <el-table-column prop="sort" label="排序值" width="150" align="center"/>
        <el-table-column prop="description" label="类型说明" align="center"/>
        <el-table-column prop="createTime" label="创建时间" width="200" align="center"/>
        <el-table-column prop="createName" label="创建人" width="120" align="center"/>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="discard(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :total="count"
        :page-size="queryData.pageLimit"
        layout="total,sizes , prev, pager, next, jumper"
        @size-change = "handSizeChange"
        @current-change="handPageChange"/>
    </div>
    <AddDiskType :show="isShow" :data="currItem" @close="isShow = false" @submit="submitEdit"/>
    <AddDiskType :show="addIsShow" :data="addData" @close="addIsShow = false" @submit="submitAdd"/>
  </div>
</template>

<script>
import { getDiskList, discardDisk, editdDisk, addDisk } from 'api/system/disk.js'
import { numberType } from '@/utils/rules.js'
import { getToken } from '@/utils/auth'
import AddDiskType from './AddDiskType.vue'

export default {
  name: 'DiskType',
  components: {
    AddDiskType
  },
  data() {
    return {
      currItem: '',
      addData: {},
      addIsShow: false,
      isShow: false,
      rules: {
        userCode: [{ validator: numberType, trigger: 'blur' }]
      },
      queryData: {
        pageCurrent: 1,
        pageLimit: this.$store.getters.pageLimt,
        typeName: '',
        entryName: '',
        entryCode: ''
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
    submitEdit(data) {
      this.isShow = false
      editdDisk(data).then((res) => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        this.refresh()
      })
    },
    submitAdd(data) {
      this.addIsShow = false
      addDisk(data).then((res) => {
        this.$message({
          message: '新增成功',
          type: 'success'
        })
        this.refresh()
        this.addData = {}
      })
    },
    exportExcell() {
      location.href = process.env.BASE_API + '/customUser/proexport?token=' + getToken()
    },
    handPageChange(page) {
      this.queryData.pageCurrent = page
      this.refresh()
    },
    edit(item) {
      this.currItem = item
      this.isShow = true
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
    discard(id) {
      this.$confirm('是否删除该类型', '提示', {
        type: 'warning'
      }).then(() => {
        discardDisk(id).then((res) => {
          this.refresh()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
      }).catch(() => {})
    },
    getData() {
      return new Promise((resolve) => {
        getDiskList(this.queryData).then((res) => {
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
