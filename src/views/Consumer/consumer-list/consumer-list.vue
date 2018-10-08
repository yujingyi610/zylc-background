<template>
  <div class="artist-list app-container">
    <div class="search-box">
      <el-row>
        <el-col :span="5">
          <div class="search-item">
            <label>城市:</label>
            <el-input size="mini" v-model="searchData.cityName" placeholder="输入城市名称"/>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="search-item">
            <label>楼盘:</label>
            <el-select size="mini" v-model="searchData.estateId" placeholder="全部">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="search-item">
            <label>客户搜索:</label>
            <el-input size="mini" v-model="searchData.newsTypeId" placeholder="输入客户名称或手机号"/>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="search-item">
            <el-button type="primary" size="mini" @click="search">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="table-body">
      <div class="t-header"><el-button type="primary" size="mini">导出</el-button></div>
      <el-table :data="tableData" border style="width: 100%" tooltip-effect='dark'>
        <el-table-column width="55" type="index" label="序号" ></el-table-column>
        <el-table-column prop="title" label="客户昵称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="cityName" label="城市" show-overflow-tooltip></el-table-column>
        <el-table-column prop="newsType" label="客户姓名"></el-table-column>
        <el-table-column prop="createTime" label="手机号码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="readCount" label="预约楼盘"></el-table-column>
        <el-table-column prop="forwardCount" label="预约次数"></el-table-column>
        <el-table-column prop="updateTime" label="联系置业顾问" show-overflow-tooltip></el-table-column>
        <!--<el-table-column prop="creator" label="是否业主"></el-table-column>-->
         <el-table-column label="是否业主">
          <template slot-scope="scope">
            {{scope.row.isPublish==0?'西溪云庐业主':'否'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="146">
          <template slot-scope="scope">
            <el-button type="text">下架</el-button>
            <el-button type="text">查看</el-button>
            <el-button type="text">链接</el-button>
          </template>
        </el-table-column>
  </el-table>
      <div class="pager">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="0"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {getArticleList,appendArticleInfo,appendGroupArticleInfo,deleteArticleInfo,deleteGroupArticleInfo,queryArticleType} from '@/api/article'
export default {
  name: 'artist-list',
  data() {
    return {
      searchData:{},
      options:[
        {label:'select',value:'1'}
      ],
      typeOption:[],
      tableData:[],//表格数据
      pageNum:1,
      pageSize:10,
      total:0,
    }
  },
  methods:{
    getPageData(pageNum,pageSize){//获取页面数据
      let data = this.searchData
      data.pageLimit = pageSize
      data.pageCurrent = pageNum
      getArticleList(data).then((res) => {
        console.log(res)
        if(res.code == 0){
          this.tableData = res.data.pageListData
          this.total = res.data.resultCount
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getPageData(1,val)
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getPageData(val,this.pageSize)
    },
    getArticleType(){
      queryArticleType().then((res) => {
        if(res.code == 0){
          this.typeOption = res.data.pageListData
        }
      })
    },
    search(){//搜索
      this.getPageData(this.pageNum,this.pageSize)
    }
  },
  created(){
    this.getPageData(1,10)//初始化页面数据
    this.getArticleType()//获取筛选天骄文章分类
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .t-header{
    padding: 30px 20px 15px 0px;
    text-align: right;
  }
  .search-item label{
    font-weight:400;
  }
  .pager{
    text-align:center;
    padding:20px;
  }
</style>
