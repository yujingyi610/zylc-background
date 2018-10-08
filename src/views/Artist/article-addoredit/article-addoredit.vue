<template lang="html">
  <div class="app-container">
    <div class="form-container">
      <el-row>
        <el-col :span="12">
          <div class="search-item">
            <label>文章名称:</label>
            <el-input size="mini" class="longInput" v-model="form.title"/>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="search-item">
            <label>文章分类:</label>
            <el-select size="mini" v-model="form.newsTypeId" placeholder="请选择">
              <el-option
                v-for="item in typeOption"
                :key="item.id"
                :label="item.newsName"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="form-container">
      <el-row>
        <el-col :span="12">
          <div class="search-item">
            <label>发布城市:</label>
            <el-select size="mini" class="longInput" v-model="citys" multiple filterable placeholder="请输入关键词">
              <el-option
                v-for="item in cityOption"
                :key="item.id"
                :label="item.areaName"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="search-item">
            <label>关联楼盘:</label>
            <el-select size="mini" v-model="form.estateId" filterable placeholder="请输入关键词">
              <el-option
                v-for="item in buildOption"
                :key="item.id"
                :label="item.estateName"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="form-container">
      <label>封面图片:</label>
      <div style="display:inline-block;vertical-align:top;">
        <img-upload :imgUrl="imgUrl" v-on:uploadData="getUploadData"/>
      </div>
    </div>
    <div class="form-container">
      <label>文章摘要:</label>
      <div style="display:inline-block;vertical-align:top;min-width:70%;">
        <el-input type="textarea" v-model="form.summary"></el-input>
      </div>
    </div>
    <div class="form-container">
      <label>文章内容:</label>
      <div style="display:inline-block;vertical-align:top;padding:10px 0;">
        <ue-editor ref="fn" :defaultMsg="editContent"/>
      </div>
    </div>
    <div class="button-container">
      <el-button type="primary" @click="goLastPage">{{btnName}}</el-button>
      <el-button type="primary" @click="publicArticle">发布文章</el-button>
    </div>
  </div>
</template>

<script>
import {appendArticleInfo,editArticle,appendGroupArticleInfo,queryArticleType,getArticleDetail} from '@/api/article'
import {getAllCityList,getBuildByCityId} from '@/api/common'
import Cookies from 'js-cookie'
import Upload from '@/components/upload/upload.vue'
import UeEditor from '@/components/UeEditor/ueeditor.vue'
export default {
  components:{
    'img-upload':Upload,
    'ue-editor':UeEditor
  },
  data(){
    return{
      form:{
        title:'',
        newsTypeId:'',
        citys:'',
        estateId:'',
        image:'',
        content:'',
      },
      citys:[],
      typeOption:[],
      cityOption:[],
      buildOption:[],
      loading: false,
      loading1: false,
      editContent: null,
      token: null,
      imgUrl:[],
      btnName:null
    }
  },
  methods:{
    getArticleType(){//获取文章分类
      let data = {}
      queryArticleType(data).then((res) => {
        if(res.code == 0){
          this.typeOption = res.data.pageListData
        }
      })
    },
    remoteMethod(query) {
        if (query !== '') {
          let data = {
            areaName:query
          }
          getAllCityList(data).then((res) => {
            if(res.code == 0){
              this.cityOption = res.data.pageListData
            }
          })
        } else {
          this.cityOption = []
        }
    },
    getCityList(){
      let data = {
        token:this.token
      }
      getAllCityList(data).then((res) => {
        if(res.code == 0){
          this.cityOption = res.data
        }
      })
    },
    goLastPage(){
      this.$confirm('退出当前所填写数据将不被保存，确定退出？','提示',{type:'warning'}).then(() => {
        this.form = {};
        this.citys = [];
        window.history.go(-1);
      }).catch(() => {

      })
    },
    remoteMethodBuild(query){
      if (query !== '') {
        let data = {
          estateName: query,
          token:this.token
        }
        getBuildByCityId(data).then((res) => {
          console.log('楼盘列表',res)
          if(res.code == 0){
            this.buildOption = res.data.pageListData
          }
        })
      } else {
        this.cityOption = [];
      }
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
    checkMust(){//必填项校验
      let flag = true
      let mustArr = [//必填项
        {name:'文章名称',code:this.form.title},
        {name:'文章分类',code:this.form.newsTypeId},
        {name:'发布城市',code:this.form.citys},
        {name:'关联楼盘',code:this.form.estateId},
        {name:'封面图片',code:this.form.image},
        {name:'文章内容',code:this.form.content}
      ]
      mustArr.map((item) => {
        if(item.code == '' || item.code == null || typeof(item.code) == undefined || item.code == undefined){
          this.$message({
            type:'warning',
            message:'请完善'+ item.name +'信息！'
          })
          flag = false
        }
      })
      if(flag){
        return true
      }else{
        return false
      }
    },
    getUploadData(data) {
      this.form.image = data.data
    },
    publicArticle(){
      let that = this
      this.form.content = this.$refs.fn.getUEContent()
      this.form.citys = this.citys.toString()
      if(this.checkMust()){
        if(this.$route.name == 'ArtistAdd'){//新发布文章
          this.$confirm('确认填写信息，并发布文章？','提示').then(() => {
            appendArticleInfo(that.form).then((res) => {
              if(res.code == 0){
                this.$message({
                  type:'success',
                  message:'文章发布成功！'
                })
                window.history.go(-1);
              }else{
                this.$message({
                  type:'error',
                  message:res.msg
                })
              }
            })
          })
        }else if(this.$route.name == 'ArtistEdit'){//编辑文章
          let that = this
          console.log('citys',that.citys);
          that.form.citys = that.citys.toString()
          delete that.form.cityList
          this.$confirm('确认修改信息，并发布文章?','提示').then(() => {
            editArticle(that.form).then((res) => {
              if(res.code == 0){
                this.$message({
                  type:'success',
                  message:'文章发布成功!'
                })
                window.history.go(-1);
              }else{
                this.$message({
                  type:'error',
                  message:res.msg
                })
              }
            })
          })
        }
      }
    }
  },
  created(){
    window.Vue = this
    this.getArticleType();
    this.getCityList();
    this.getBuildList();
    if(this.$route.name == 'ArtistEdit'){//编辑
      let that = this
      this.btnName = '退出编辑';
      let data = {
        id:this.$route.query.ArticleId
      }
      getArticleDetail(data).then((res) => {
        if(res.code == 0){
          this.form =res.data
          this.editContent = res.data.content
          this.imgUrl.push({url:res.data.image, status: 'finished'})
          let arr = new Array();
          res.data.cityList.map((item) => {
            arr.push(item.cityId);
          })
          this.citys = arr;//发布城市回显
        }
      })
    }else{
      this.btnName = '退出新增';
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
.form-container{
  padding:10px 0px;
  label{
    font-weight:400;
  }
}
.button-container{
  text-align:center;
  padding:20px 0;
}
</style>
