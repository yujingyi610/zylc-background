<template>
  <div class="Order app-container">
    <div>
      <el-form ref="queryForm" :inline="true" :model="queryData">
        <el-form-item label="城市:" prop="cityName">
          <el-input v-model.number="queryData.cityName" placeholder="请输入城市名称"/>
        </el-form-item>
        <el-form-item label="楼盘:" prop="estateName">
          <el-select v-model="queryData.estateName" placeholder="请选择">
            <el-option
              v-for="(item, index) in buildingList"
              :key="index"
              :label="item.label"
              :value="item.areaname"/>
          </el-select>
        </el-form-item>
        <el-form-item label="客户搜索:" prop="changeUserName">
          <el-input v-model="queryData.searchText" placeholder="请输入客户姓名或手机号" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="primary" @click="exportExcell">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table v-loading="loading" :data="list" border style="width: 100%">
        <el-table-column type="index" label="序号" width="60" align="center" fixed="left"/>
        <el-table-column prop="customName" label="客户姓名" width="120" align="center"/>
        <el-table-column prop="mobilePhone" label="手机号码" width="140" align="center"/>
        <el-table-column prop="userSecondName" label="客户昵称	" width="140" align="center"/>
        <el-table-column prop="cityName" label="城市" width="100" align="center"/>
        <el-table-column prop="estateName" label="预约楼盘" align="center"/>
        <el-table-column prop="proCount" label="预约次数" width="80" align="center"/>
        <el-table-column prop="proUpdateTime" label="预约提交时间" width="180" align="center"/>
        <el-table-column prop="propertyConsultName" label="预约置业顾问" width="110" align="center"/>
        <el-table-column prop="proConsultant" label="原置业顾问" width="100" align="center"/>
        <el-table-column prop="isconflict" label="顾问是否冲突" width="120" align="center">
          <template slot-scope="scope"> <!--1 冲突 0 不冲突-->
            <el-tag v-if="scope.row.isconflict == 0" type="success">不冲突</el-tag>
            <el-tag v-else type="danger">冲突</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="finalPropertyConsultName" label="最终置业顾问" align="center" width="120"/>
        <el-table-column prop="consultFrom" label="置业顾问来源" align="center" width="120"/>
        <el-table-column label="操作" align="center" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button v-if="scope.row.isconflict == 1" type="text" size="small" @click="confirmAdv(scope.row)">确认顾问</el-button>
            <el-button v-else type="text" size="small" @click="noticeAdv(scope.row)">通知顾问</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :total="count"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change = "handSizeChange"
        @current-change="handPageChange"/>
    </div>

    <!--确认顾问-->
    <el-dialog
      :visible.sync="visible"
      width="300px"
      title="提示">
      <el-radio v-for="(item, index) in advList" :key="index" v-model="finalAdv" :label="item">
        {{item.name}}
      </el-radio>
      <span slot="footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button :disabled="!finalAdv" type="primary" @click="submitAdv">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getOrderList, getBuildingList, getAdv, setAdv, noticeAdv } from 'api/order/order.js'
import { numberType } from '@/utils/rules.js'
import { setParamString } from '@/utils/index.js'
import { validatMobilePhone } from '@/utils/validate'

export default {
  name: 'Order',
  data() {
    return {
      rules: {
        userCode: [{ validator: numberType, trigger: 'blur' }],
        changeUserName: [{ validator: numberType, trigger: 'blur' }]
      },
      queryData: {
        pageCurrent: 1,
        pageLimit: this.$store.getters.pageLimt,
        estateName: '', // 楼盘名称
        cityName: '', // 城市
        searchText: ''// 客户名
      },
      count: 0,
      advList: [],
      currItem: {},
      finalAdv: '',
      visible: false,
      loading: true,
      list: [],
      buildingList: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.refresh()
      this.getBuildingList()
    })
  },
  methods: {
    handSizeChange(size) {
      this.queryData.pageLimit = size
      this.refresh()
    },
    exportExcell() {
      const data = {
        token: this.$store.getters.token,
        customName: this.queryData.customName, // 客户名
        cityName: this.queryData.cityName, // 城市
        estateName: this.queryData.cityName // 楼盘
      }
      location.href = process.env.BASE_API + '/customUser/proexport?' + setParamString(data)
    },
    handPageChange(page) {
      this.queryData.pageCurrent = page
      this.refresh()
    },
    confirmAdv(item) {
      this.currItem = item
      this.visible = true
      this.advList = [{
        name: item.proConsultant,
        id: item.proConsultantId
      }, {
        name: item.propertyConsultName,
        id: item.propertyConsultId
      }]
    },
    submitAdv() {
      if (this.finalAdv) {
        const data = {
          id: this.currItem.id,
          finalPropertyConsultName: this.finalAdv.name,
          finalPropertyConsultId: this.finalAdv.id
        }
        setAdv(data).then((res) => {
          this.visible = false
          this.$message({
            message: '确认顾问成功',
            type: 'success'
          })
          this.finalAdv = ''
          this.refresh()
        })
      }
    },
    noticeAdv(item) {
      noticeAdv(item.id).then((res) => {
        this.$message({
          message: '通知顾问成功',
          type: 'success'
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
      this.$refs['queryForm'].validate((valid) => {
        if (valid) {
          this.queryData.pageCurrent = 0
          this.refresh()
        }
      })
    },
    getData() {
      return new Promise((resolve) => {
        getOrderList(this.queryData).then((res) => {
          this.list = res.data.pageListData
          this.count = res.data.resultCount
          resolve(res)
        })
      })
    },
    getBuildingList() {
      getBuildingList().then((res) => {
        const olist = res.data.pageListData
        const list = []
        olist.forEach((val, index) => {
          const item = {
            areaname: val.estateName,
            label: val.estateName
          }
          list.push(item)
        })
        list.unshift({
          areaname: '',
          label: '全部'
        })
        this.buildingList = list
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
