<template>
  <div class="Feedback">
    <div>
      <el-form :inline="true" :model="queryData">
        <el-form-item label="客户搜索:">
          <el-input v-model="queryData.searchText" placeholder="请输入客户昵称或手机号" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportExcell">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table v-loading="loading" :data="list" border style="width: 100%">
        <el-table-column type="index" label="序号" width="80" align="center"/>
        <el-table-column prop="customSecondName" label="客户昵称" width="100" align="center"/>
        <el-table-column prop="mobilePhone" label="客户电话" width="150" align="center"/>
        <el-table-column prop="cusBack" label="客户反馈详情	" align="center"/>
      </el-table>

      <el-pagination
        :total="count"
        :page-size = "queryData.pageLimit"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change = "handSizeChange"
        @current-change="handPageChange"/>
    </div>
  </div>
</template>

<script>
import { getFeedBackList } from 'api/consumer/consumer.js'
import { getToken } from '@/utils/auth'
import { validatMobilePhone } from '@/utils/validate'

export default {
  name: 'Feedback',
  data() {
    return {
      queryData: {
        pageCurrent: 1,
        pageLimit: this.$store.getters.pageLimt,
        searchText: '' // 客户手机号
      },
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
    exportExcell() {
      window.open(process.env.BASE_API + '/customUser/backexport?token=' + getToken() + '&mobilePhone=' + this.queryData.mobilePhone + '&userSecondName=' + this.queryData.userSecondName, '_self')
    },
    handPageChange(page) {
      this.queryData.pageCurrent = page
      this.refresh()
    },
    refresh() {
      this.loading = true
      const searchText = this.queryData.searchText
      const result = validatMobilePhone(searchText)
      if (result) {
        // 手机号搜索
        this.queryData.mobilePhone = searchText
        this.queryData.customName = undefined
      } else {
        // 用户名搜索
        this.queryData.customName = searchText
        this.queryData.mobilePhone = undefined
      }
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
        getFeedBackList(this.queryData).then((res) => {
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
