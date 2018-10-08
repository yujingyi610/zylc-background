<template>
  <div class="Consumer app-container">
    <div>
      <el-form :inline="true" :model="queryData">
        <el-form-item label="城市:">
          <el-input v-model="queryData.cityName" placeholder="请输入城市" />
        </el-form-item>
        <el-form-item label="客户搜索:">
          <el-input v-model="queryData.searchText" placeholder="请输入客户名" />
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
        <el-table-column type="index" label="序号" width="60" align="center" fixed="left"/>
        <el-table-column prop="userSecondName" label="客户昵称" width="120" align="center"/>
        <el-table-column prop="cityName" label="城市" align="center"/>
        <el-table-column prop="customName" label="客户姓名	" align="center"width="120"/>
        <el-table-column prop="mobilePhone" label="手机号" align="center" width="150"/>
        <el-table-column prop="building" label="预约楼盘" align="center">
          <template slot-scope="scope">
            <el-tag v-for="(item, index) in scope.row.building" :key="index" type="info" size="small">{{ item }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="times" label="预约次数" align="center" width="100">
          <template slot-scope="scope">
            <el-tag v-for="(item, index) in scope.row.times" :key="index" type="info" size="small">{{ item }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="adviser" label="联系置业顾问" align="center" width="200">
          <template slot-scope="scope">
            <el-tag v-for="(item, index) in scope.row.adviser" :key="index" type="info" size="small">{{ item }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="owner" label="是否业主" align="center" width="100"/>
        <el-table-column label="操作" align="center" width="100" fixed="right">
          <template slot-scope="scope">  <!--1 冻结状态 0 正常-->
            <el-button type="text" size="small" @click="updateCust(scope.row)">
              <span v-if="scope.row.status == 0">冻结</span>
              <span v-else>取消冻结</span>
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
import { getConsumerList, updateCust } from 'api/consumer/consumer.js'
import { getToken } from '@/utils/auth'
import { validatMobilePhone } from '@/utils/validate'

export default {
  name: 'Consumer',
  data() {
    return {
      queryData: {
        pageCurrent: 1,
        pageLimit: this.$store.getters.pageLimt,
        cityName: '',
        searchText: ''
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
  /* search() {
      this.loading = true
      searchCust(this.queryData).then((res) => {
        res.data.forEach((val, index) => {
          val.building = [val.estateName ? val.estateName : '无']
          val.times = [val.proCount ? val.proCount : '无']
          val.adviser = [val.finalPropertyConsultName ? val.finalPropertyConsultName : '无']
        })
        this.list = res.data
        console.log(this.list)
        setTimeout(() => {
          this.loading = false
        }, 500)
      })
    },*/
    handSizeChange(size) {
      this.queryData.pageLimit = size
      this.refresh()
    },
    exportExcell() {
      location.href = `${process.env.BASE_API}/customUser/proexport?token=${getToken()}&cityName=${this.queryData.cityName}&customName=${this.queryData.customName}`
    },
    handPageChange(page) {
      this.queryData.pageCurrent = page
      this.refresh()
    },
    updateCust(data) {
      const updateStatus = data.status == '0' ? '1' : '0'
      const text = data.status == '0' ? '冻结' : '解除冻结'
      updateCust(data.id, updateStatus).then((res) => {
        this.refresh()
        this.$message({
          type: 'success',
          message: text + '成功'
        })
      })
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
        getConsumerList(this.queryData).then((res) => {
          const data = res.data
          if (data.length === 0) {
            resolve(res)
            return false
          }
          data.forEach((val, idnex) => {
            const customProList = val.customProList
            const building = []
            const times = []
            const adviser = []
            customProList && customProList.forEach((cval, cindex) => {
              cval.estateName && building.push(cval.estateName)
              cval.proCount && times.push(cval.proCount)
              cval.finalPropertyConsultName && adviser.push(cval.finalPropertyConsultName)
            })
            val.building = building
            val.times = times
            val.adviser = adviser
          })
          this.list = data
          if (data[0].count) {
            this.count = data[0].count
          }
          resolve(res)
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .Consumer{
    .el-tag + .el-tag {
      margin: 3px;
    }
  }
</style>
