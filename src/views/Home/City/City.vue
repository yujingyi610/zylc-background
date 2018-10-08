<template>
  <div class="City app-container">
    <div>
      <el-form :inline="true" :model="queryData">
        <el-form-item label="城市:">
          <el-input v-model="queryData.areaName" placeholder="请输入城市" />
        </el-form-item>
        <el-form-item label="启用状态:">
          <el-select v-model="queryData.isEnabled" placeholder="请选择">
            <el-option label="全部" value="" />
            <el-option label="启用" value="1" />
            <el-option label="禁用" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否热门城市:">
          <el-select v-model="queryData.isHotCity" placeholder="请选择">
            <el-option label="全部" value="" />
            <el-option label="是" value="1" />
            <el-option label="否" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table v-loading="loading" :data="list" border style="width: 100%">
        <el-table-column type="index" label="序号" width="80" align="center" fixed="left"/>
        <el-table-column prop="areaName" label="城市名称	" width="200" align="center"/>
        <el-table-column prop="pyName" label="城市拼音	" align="center"/>
        <el-table-column prop="isEnabled" label="启用状态" align="center" width="150">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.isEnabled == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="isHotCity" label="是否热门城市" width="150" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.isHotCity == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">不是</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="热门城市排序" width="200" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.sort" placeholder="请输入内容" @change="handSortChange(scope.row)"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="modifyCity(scope.row, 'enable')">
              <span v-if="scope.row.isEnabled == 1">禁用</span>
              <span v-else>启用</span>
            </el-button>
            <el-button type="text" size="small" @click="modifyCity(scope.row, 'hot')">
              <span v-if="scope.row.isHotCity == 1 && scope.row.isEnabled == 1">取消热门</span>
              <span v-if="scope.row.isHotCity == 0 && scope.row.isEnabled == 1">设为热门</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :total="count"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change = "handSizeChange"
        @current-change="handPageChange"/>
    </div>
  </div>
</template>

<script>
import { getCityList, modifyCity } from 'api/home/city/city.js'

export default {
  name: 'City',
  data() {
    return {
      queryData: {
        pageCurrent: 0,
        pageLimit: this.$store.getters.pageLimt,
        isHotCity: '', // 是否热门城市
        isEnabled: '', // 是否启用
        areaName: '' // 城市
      },
      count: 0,
      loading: true,
      list: []
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
    handSortChange(item) {
      console.log(item.id)
      modifyCity({ sort: item.sort, id: item.id })
      this.$message({
        message: '排序修改成功',
        type: 'success'
      })
      this.getData()
    },
    modifyCity(data, type) {
      if (type === 'hot') {
        if (data.isHotCity == 0) {
          // 设置热门
          modifyCity({ isHotCity: 1, id: data.id }).then(() => {
            this.$message({
              message: '设置成功！',
              type: 'success'
            })
            this.refresh()
          })
        } else {
          // 取消热门
          modifyCity({ isHotCity: 0, id: data.id }).then(() => {
            this.$message({
              message: '取消成功！',
              type: 'success'
            })
            this.refresh()
          })
        }
      } else if (type === 'enable') {
        if (data.isEnabled == 0) {
          // 启用
          modifyCity({ isEnabled: 1, id: data.id }).then(() => {
            this.$message({
              message: '启用成功！',
              type: 'success'
            })
            this.refresh()
          })
        } else {
          // 禁用
          modifyCity({ isEnabled: 0, id: data.id }).then(() => {
            this.$message({
              message: '禁用成功！',
              type: 'success'
            })
            this.refresh()
          })
        }
      }
    },
    handPageChange(page) {
      this.queryData.pageCurrent = page
      this.refresh()
    },
    search() {
      this.queryData.pageCurrent = 0
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
    getData() {
      return new Promise((resolve) => {
        getCityList(this.queryData).then((res) => {
          this.list = res.data.pageListData
          this.count = res.data.resultCount
          resolve(res)
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
