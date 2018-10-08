<template lang="html">
  <div class="app-container">
    <div class="form-container">
      <el-row>
        <el-col :span="12">
          <div class="search-item" style="margin-bottom: 30px;">
            <label>公告名称:</label>
            <el-input size="mini" v-model="form.title"/>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="form-container" style="margin-bottom: 25px;">
      <label>封面图片:&nbsp;</label>
      <div style="display:inline-block;vertical-align:top;">
        <img-upload type="single" v-on:uploadData="getUploadData"/>
      </div>
    </div>
    <div class="form-container">
      <label style="margin-bottom: 5px;">公告内容:</label>
      <div style="display:inline-block;vertical-align:top;padding:10px 0;">
        <ue-editor/>
      </div>
    </div>
    <div style="text-align: center; margin-right: 46px;">
    	<el-button>保存</el-button>
    	<el-button>返回</el-button>
    </div>
  </div>
</template>

<script>
import {appendArticleInfo,editArticle,appendGroupArticleInfo,queryArticleType} from '@/api/article'
import Upload from '@/components/upload/upload.vue'
import UeEditor from '@/components/UeEditor/ueeditor.vue'
export default {
  components:{
    'img-upload':Upload,
    'ue-editor':UeEditor
  },
  data(){
    return{
      form:{},
      typeOption:[]
    }
  },
  methods:{
    getArticleType(){//获取文章分类
      queryArticleType().then((res) => {
        if(res.code == 0){
          this.typeOption = res.data.pageListData
        }
      })
    },
    getUploadData(data){
      console.log(data);
    }
  },
  created(){
    this.getArticleType();
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
</style>
