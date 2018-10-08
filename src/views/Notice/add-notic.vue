<template lang="html">
  <div class="app-container">
    <div class="form-container">
      <el-row>
        <el-col :span="12">
          <div class="search-item">
            <label>公告名称:</label>
            <el-input size="mini" class="longInput" v-model="form.noticeName"/>
            <div v-html="number">12</div>
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
      <label>公告内容:</label>
      <div style="display:inline-block;vertical-align:top;padding:10px 0;">
        <ue-editor ref="fn" :defaultMsg="editContent"/>
      </div>
    </div>
    <div class="button-container">
      <el-button type="primary" @click="publicNotic">保存</el-button>
      <el-button type="primary" @click="backNotic">返回</el-button>
    </div>
  </div>
</template>
<script>
import {getNoticList,deleteNoticInfo,noticeInfo,noticEditor,checkNoticInfo,addNoticInfo} from '@/api/notic'
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
    	number:10,
      form:{
        noticeName:'',
       	image:'',
        content:'',
      },
      citys:[],
      typeOption:[],
      loading: false,
      loading1: false,
      editContent: null,
      token: null,
      imgUrl:[]
    }
  },
  methods:{
  	backNotic(){//返回跳转 
		this.$router .push({
			path:'Notice'
		})
  },
   checkMust(){//必填项校验
      let flag = true
      let mustArr = [//必填项
        {name:'公告名称',code:this.form.noticeName},
        {name:'封面图片',code:this.form.image},
        {name:'公告内容',code:this.form.content}
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
    publicNotic(){
      let that = this
      this.form.content = this.$refs.fn.getUEContent()
      if(this.checkMust()){
        if(this.$route.name == 'AddNotic'){//新增公告
          this.$confirm('确认填写公告，并保存公告？','提示').then(() => {
            addNoticInfo(that.form).then((res) => {
              if(res.code == 0){
                this.$message({
                  type:'success',
                  message:'公告保存成功！'
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
        }else if(this.$route.name == 'NoticEdit'){//编辑文章
          let that = this
          this.$confirm('确认修改公告，并保存公告?','提示').then(() => {
            noticEditor(that.form).then((res) => {
              if(res.code == 0){
                this.$message({
                  type:'success',
                  message:'公告保存成功!'
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
  	console.log(this.$route.query.NoticEdit)
    window.Vue = this
    console.log(this.$route.name);
    if(this.$route.name == 'NoticEdit'){//编辑
      let that = this
      let data = {
        id:this.$route.query.NoticEdit
      }
      checkNoticInfo(data).then((res) => {
        if(res.code == 0){
          this.form =res.data
          this.noticeName = res.data.noticeName
          this.editContent = res.data.content
          this.imgUrl.push({url:res.data.image, status: 'finished'})
        }
      })
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
   