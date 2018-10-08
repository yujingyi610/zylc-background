<template>
  <div class="app-container">
    <div class="view-container">
      <div class="form-container">
        <el-row>
          <el-col :span="12">
            <div class="search-item">
              <label>文章名称:</label>
              <span>{{form.title}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="search-item">
              <label>文章分类:</label>
              <span>{{form.newsType}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="form-container">
        <el-row>
          <el-col :span="12">
            <div class="search-item">
              <label>发布城市:</label>
              <span v-for="(item,index) in form.cityList" :key="index">{{item.cityName}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="search-item">
              <label>关联楼盘:</label>
              <span>{{form.estateName}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="form-container" style="position:relative">
        <label>封面图片:</label>
        <div style="display:inline-block;vertical-align:top;">
          <img :src="form.image" style="width:148px;height:148px;" @mouseenter="isImgShow=true" @mouseleave="isImgShow=false">
        </div>
        <div v-show="isImgShow" style="position:absolute;left:250px;top:-150px;border:solid thin #dadada">
          <img :src="form.image">
        </div>
      </div>
      <div class="form-container">
        <label>文章摘要:</label>
        <div style="display:inline-block;vertical-align:top;min-width:70%;">
          <span>{{form.summary}}</span>
        </div>
      </div>
      <div class="form-container">
        <label>文章内容:</label>
        <div style="padding:10px 0;">
          <span v-html="form.content"></span>
        </div>
      </div>
      <div class="cancel-btn">
        <el-button type="primary" size="mini" @click="goLastPage">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/article'
export default {
  data(){
    return{
      form:{},
      isImgShow:false
    }
  },
  methods:{
    initPageData(){
      let data = {
        id:this.$route.query.ArticleId
      }
      getArticleDetail(data).then((res) => {
        if(res.code == 0){
          this.form = res.data
        }
      })
    },
    goLastPage(){
      window.history.go(-1);
    }
  },
  created(){
    this.initPageData();
  }
}
</script>

<style lang="scss" scoped>
  .form-container{
    padding:10px 0px;
    min-height:100px;
    label{
      font-weight:400;
    }
  }
  .cancel-btn{
    text-align:center;
    padding:15px 0;
  }
</style>
