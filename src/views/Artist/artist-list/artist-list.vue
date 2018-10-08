<template>
  <div class="artist-list app-container">
    <div class="search-box">
      <el-row>
        <el-col :span="5">
          <div class="search-item">
            <label>城市:</label>
            <el-input size="mini" v-model="searchData.cityName"/>
            <!--<el-select size="mini" v-model="searchData.cityName" filterable remote reserve-keyword placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading">
              <el-option
                v-for="item in cityOption"
                :key="item.id"
                :label="item.areaName"
                :value="item.areaName">
              </el-option>
            </el-select>-->
          </div>
        </el-col>
        <el-col :span="5">
          <div class="search-item">
            <label>楼盘:</label>
            <el-select size="mini" v-model="searchData.estateId" filterable placeholder="请输入关键词">
              <el-option
                v-for="item in buildOption"
                :key="item.id"
                :label="item.estateName"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="search-item">
            <label>文章分类:</label>
            <el-select size="mini" v-model="searchData.newsTypeId" placeholder="请选择">
              <el-option
                v-for="item in typeOption"
                :key="item.id"
                :label="item.newsName"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="search-item">
            <label>文章搜索:</label>
            <el-input size="mini" v-model="searchData.title"/>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="search-item">
            <el-button size="mini" @click="reset">重置</el-button>
            <el-button type="primary" size="mini" @click="search">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="table-body">
      <div class="t-header"><el-button type="primary" size="mini" @click="publishArticle">发布文章</el-button></div>
      <el-table :data="tableData" border style="width: 100%" tooltip-effect='dark'>
        <el-table-column width="55" type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="title" label="标题名称" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="cityName" label="发布城市" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="newsType" label="文章分类" align="center"></el-table-column>
        <el-table-column label="发布状态" align="center">
          <template slot-scope="scope">
            {{scope.row.isPublish==0?'未发布':scope.row.isPublish==1?'已发布':'已下架'}}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="发布时间" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="readCount" label="阅读量" align="center"></el-table-column>
        <el-table-column prop="forwardCount" label="转发量" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="最后操作时间" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="creator" label="操作人" align="center"></el-table-column>
        <el-table-column label="操作" width="146" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="isPublish(scope.row)">{{scope.row.isPublish==0?'发布':scope.row.isPublish==1?'下架':'发布'}}</el-button>
            <el-button v-if="scope.row.isPublish==1" type="text" @click="viewArticle(scope.row.id)">查看</el-button>
            <el-button v-if="scope.row.isPublish != 1" type="text" @click="editArticle(scope.row.id)">编辑</el-button>
            <el-button type="text" @click="link(scope.row)">链接</el-button>
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
import {getArticleList,isPublishArticle,appendArticleInfo,editArticle,appendGroupArticleInfo,deleteArticleInfo,deleteGroupArticleInfo,queryArticleType} from '@/api/article'
import {getCityList,getBuildByCityId} from '@/api/common'
import Cookies from 'js-cookie'
export default {
  name: 'artist-list',
  data() {
    return {
      searchData:{},
      buildOptions:[],
      typeOption:[],
      cityOption:[],
      buildOption:[],
      loading: false,
      loading1: false,
      tableData:[],//表格数据
      pageNum:1,
      pageSize:10,
      total:0,
      token:null,
    }
  },
  methods:{
    getPageData(pageNum,pageSize){//获取页面数据
      let data = this.searchData
      data.pageLimit = pageSize
      data.pageCurrent = pageNum
      getArticleList(data).then((res) => {
        if(res.code == 0){
          this.tableData = res.data.pageListData
          this.total = res.data.resultCount
          this.tableData.map((item) => {
            let arr = new Array();
            item.cityList.map((obj) => {
              arr.push(obj.cityName);
            })
            item.cityName = arr.toString();
          })
        }
      })
    },
    publishArticle(){//发布文章
      this.$router.push({
        path:'ArtistAdd'
      })
    },
    editArticle(id){//编辑
      console.log('行Id',id);
      this.$router.push({
        path:'ArtistEdit',
        query:{
          ArticleId:id
        }
      })
    },
    changeStatus(data){
      isPublishArticle(data).then((res) => {
        if(res.code == 0){
          this.$message({
            type:'success',
            message:'操作成功！'
          })
          this.getPageData(this.pageNum,this.pageSize);
        }else{
          this.$message({
            type:'error',
            message:res.msg
          })
        }
      })
    },
    remoteMethod(query) {
        if (query !== '') {
          let data = {
            areaName:query
          }
          getCityList(data).then((res) => {
            if(res.code == 0){
              this.cityOption = res.data.pageListData
            }
          })
        } else {
          this.cityOption = [];
        }
    },
    remoteMethodBuild(query) {
      if (query !== '') {
        let data = {
          estateName:query,
          token:this.token
        }
        getBuildByCityId(data).then((res) => {//根据楼盘名称模糊查询楼盘列表
          if(res.code == 0){
            this.buildOption = res.data.pageListData
          }
        })
      } else {
        this.cityOption = [];
      }
    },
    isPublish(val){//下架，发布
      let data = {}
      data.id = val.id
      if(val.isPublish == 0 || val.isPublish == 2){
        data.isPublish = 1
        this.$confirm('确认发布此篇文章？','提示').then(() => {
          this.changeStatus(data)
        }).catch(() => {

        })
      }else{
        data.isPublish = 2
        this.$confirm('确认下架此篇文章？','提示').then(() => {
          this.changeStatus(data)
        }).catch(() => {

        })
      }
    },
    viewArticle(id){//查看
      this.$router.push({
        path:'ArtistView',
        query:{
          ArticleId:id
        }
      })
    },
    link(row){//链接
      let link = row.url?row.url:'无配置链接'
      this.$alert('<input id="linkCopy" class="el-input__inner" value="'+link+'"/>', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '复制链接',
      }).then(() => {
        document.getElementById('linkCopy').select();
        document.execCommand("Copy");
        this.$message({
          type:'success',
          message:'已成功复制到粘贴板！'
        })
      }).catch(()=>{

      });
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
      let data = {}
      queryArticleType(data).then((res) => {
        if(res.code == 0){
          this.typeOption = res.data.pageListData
        }
      })
    },
    getBuildList(){
      let data = {
        token:this.token
      }
      getBuildByCityId(data).then((res) => {
        if(res.code == 0){
          this.buildOption = res.data.pageListData
        }
      })
    },
    search(){//搜索
      this.getPageData(this.pageNum,this.pageSize)
    },
    reset(){//重置
      this.searchData = {}
    }
  },
  created(){
    this.getPageData(1,10)//初始化页面数据
    this.getArticleType()//获取筛选天骄文章分类
    this.token = Cookies.get('Admin-Token')
    this.getBuildList();
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
