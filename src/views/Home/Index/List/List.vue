<template>
  <div class="Index app-container">
    <div>
      <el-form :inline="true" :model="queryData">
        <el-form-item label="城市名称 :">
          <el-input v-model="queryData.homePage" placeholder="请输入城市名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table v-loading="loading" :data="list" border style="width: 100%">
        <el-table-column prop="homePage" label="城市首页" width="200" align="center"/>
        <el-table-column prop="lastModifiedTime" label="最后修改时间" width="200" align="center"/>
        <el-table-column prop="lastModified" label="修改人" align="center"/>
        <el-table-column prop="bannerCount" label="头图数量" align="center"/>
        <el-table-column prop="buildingCount" label="好盘推荐数量" width="150" align="center"/>
        <el-table-column prop="newsCount" label="房产咨询数量" width="150" align="center"/>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
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
import { getCityList } from 'api/home/index/list.js'
import Edit from '../Edit/Edit.vue'
import upload from '../Edit/UploadIcon.vue'

export default {
  name: 'List',
  components: {
    Edit,
    upload
  },
  data() {
    return {
      count: 0,
      queryData: {
        homePage: '',
        pageCurrent: 1,
        pageLimit: this.$store.getters.pageLimt
      },
      loading: true,
      showEdit: false,
      list: [],
      editData: {}
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getData()
    })
  },
  methods: {
    handSizeChange(size) {
      this.queryData.pageLimit = size
      this.refresh()
    },
    handPageChange(page) {
      this.queryData.pageCurrent = page
      this.refresh()
    },
    handSortChange(sort) {
      modifyCity({ special: sort })
    },
    edit(data) {
      sessionStorage.isNationwide = data.isNationwide
      this.$router.push({ path: '/Home/Index/NationEdit/' + data.id })
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
        getCityList(this.queryData).then((res) => {
          this.list = res.data.pageListData
          this.count = res.data.resultCount
          setTimeout(() => {
            this.loading = false
            resolve(res)
          }, 500)
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .Index{
    position: relative;
    .el-dialog__wrapper{
      position: absolute !important;
    }
  }
</style>
