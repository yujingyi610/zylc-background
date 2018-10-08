<template>
  <div class="building-list app-container">
    <div v-if="!isShow">
      <div class="searchHead">
        <el-form :model="searchForm" :inline="true">
          <el-form-item label="城市">
            <el-input v-model="searchForm.cityname" placeholder="请输入城市名"></el-input>
          </el-form-item>
          <el-form-item label="楼盘">
            <el-input v-model="searchForm.estateName" placeholder="请输入楼盘名"></el-input>
          </el-form-item>
          <el-form-item label="是否发布">
            <el-select v-model="searchForm.isPublishToZxgw">
              <el-option label="全部" value=""></el-option>
              <el-option label="未发布" value="0"></el-option>
              <el-option label="已发布" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="楼盘属性">
            <el-select v-model="searchForm.tableName" clearable>
              <el-option label="全部" value="is_tourism=1 OR is_greentown=1"></el-option>
              <el-option label="居旅地产" value="is_tourism=1"></el-option>
              <el-option label="绿城小镇" value="is_greentown=1"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" style="float: right" @click="handleGetList">搜索</el-button>
        </el-form>
        <el-button type="primary" style="float: right" @click="handleOpenAdd">新建楼盘</el-button>
      </div>
      <el-table :data="buildList" style="width: 100%" :border="true" >
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="estateName" label="楼盘名称" min-width="400" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.listpicwechat" style="width: 140px; height: 100px; float: left" />
            <span style="line-height: 100px;">{{scope.row.estateName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cityname" label="城市" min-width="100" align="center"></el-table-column>
        <el-table-column prop="isPublishToZxgw" label="发布状态" min-width="100" align="center">
          <template slot-scope="scope">
            {{scope.row.isPublishToZxgw === '0'?'未发布':'已发布'}}
          </template>
        </el-table-column>
        <el-table-column prop="unitpriceshow" label="单价（元/㎡）" min-width="100" align="center"></el-table-column>
        <el-table-column prop="totalpriceshow" label="总价（万元/套）" min-width="180" align="center"></el-table-column>
        <el-table-column prop="publishDate" label="更新时间" min-width="180" align="center"></el-table-column>
        <el-table-column label="操作" min-width="400">
          <template slot-scope="scope">
            <el-button type="text" @click="handlePubish(scope.row, '1')" v-if="scope.row.isPublishToZxgw === '0'">发布</el-button>
            <el-button type="text" @click="handlePubish(scope.row, '0')" v-else>下架</el-button>
            <el-button type="text" @click="handleEdit(scope.row, '0')">编辑</el-button>
            <el-button type="text" @click="handleEdit(scope.row, '1')">置业顾问</el-button>
            <el-button type="text" @click="handleEdit(scope.row, '4')">户型图</el-button>
            <el-button type="text" @click="handleEdit(scope.row, '2')">组团信息</el-button>
            <el-button type="text" @click="handleEdit(scope.row, '3')">楼盘相册</el-button>
            <el-button type="text" @click="handleEdit(scope.row, '5')">编辑动态</el-button>
            <el-button type="text" @click="handleEdit(scope.row, '6')">开盘信息</el-button>
            <el-button type="text" @click="handleRedactEstate(scope.row)">关联项目及负责人</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
    <!-- <add-estate v-if="showFlag" @close="closeAdd"></add-estate> -->
    <component :is="isShow" @close="closeAdd" :estateInfo="estateInfo" :activeIndex="activeIndex"></component>
  </div>
</template>

<script>
import {list, publishZylc} from '@/api/building-list.js'

import addEstate from './components/addEstate.vue'
import redactEstate from './components/redactEstate.vue'
import EditDetails from './components/EditDetails/EditDetails.vue'

export default {
  name: 'building-list',
  components: {
    addEstate,
    EditDetails,
    redactEstate
  },
  data() {
    return {
      searchForm: {
        cityname: '',
        estateName: '',
        isPublishToZxgw: '',
        tableName: '',
      },
      buildList: [],
      currentPage: 1,// 分页当前页数
      pageSize: 10, // 分页数量
      total: 0,// 总数
      isShow: '',// 控制新建子组件是否展示

      estateInfo: null,// 传递给子组件的楼盘数据
      activeIndex: '0',
    }
  },
  methods: {
    handleGetList() {// 获取列表数据
      let params = {
        cityname: this.searchForm.cityname,
        estateName: this.searchForm.estateName,
        isPublishToZxgw: this.searchForm.isPublishToZxgw,
        tableName: this.searchForm.tableName,
        pageLimit: this.pageSize,
        pageCurrent: this.currentPage,
        delFlag: '0'
        // token: '3041C061204020B2A5C1F6E241A523E7A4F2B1E76870847864B_4_2_7_3_9_9_'
      }
      list(params).then(res=>{
        if( res.code === 0 ){
          this.buildList = res.data.pageListData;
          this.total = res.data.resultCount;
        }
      })
    },
    handleOpenAdd() {// 打开新建楼盘子组件
      // this.showFlag = true
      this.isShow = 'addEstate'
    },
    closeAdd() {// 关闭新建楼盘子组件
      // this.showFlag = false
      this.isShow = ''
      this.handleGetList()
    },
    handlePubish(row, type) {// 发布
      if( !row.listpicwechat && type === '1' ){
        this.$message.error('暂未设置封面图，不能发布！')
        return
      }
      let msg = type === '1'?'发布成功！':'下架成功！';
      let data = {
          isPublishToZxgw: type,
          id: row.id
      }
      publishZylc(data).then(res=>{
        if( res.code === 0 ){
          this.$message.success(msg)
          this.handleGetList()
        }else{
          this.$message.error(res.msg)
        }
      })
    },  
    handleEdit(row, index) {// 编辑
      this.estateInfo = row;
      this.activeIndex = index;
      this.isShow ='EditDetails'
    },
    handleRedactEstate(row) {// 关联负责人
      this.estateInfo = row;
      this.isShow = 'redactEstate';
    },
    /**********分页相关************/
    handleSizeChange(val) {
          
        this.pageSize = val;
        this.handleGetList()
    },
    handleCurrentChange(val) {
          
        this.currentPage = val;
        this.handleGetList()                
    },
  },
  created() {
    this.handleGetList()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
