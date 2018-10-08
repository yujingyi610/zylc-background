<template>
  <div class="artist-type app-container">
    <div class="type-container">
      <el-button type="primary" size="mini" @click="newType">新建</el-button>
    </div>
    <div class="type-container">
      <el-table :data="tableData" border style="width: 100%" header-row-class-name="center">
        <el-table-column align="center" prop="newsName" label="分类名称" ></el-table-column>
        <el-table-column align="center" prop="sort" label="排序（前台文章分类列表排序）"></el-table-column>
        <el-table-column align="center" prop="creator" label="创建人"></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
        <el-table-column align="center" label="操作" width="55">
          <template slot-scope="scope">
            <el-button type="text" @click="editType(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form label-position="right" label-width="80px" :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.newsName"></el-input>
        </el-form-item>
        <el-form-item label="分类排序">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { queryArticleType,addArticleType,editArticleType } from '@/api/article'
export default {
  data() {
    return {
      tableData:[],
      dialogVisible:false,
      form:{},
      title:null
    }
  },
  methods: {
    getPageList() {
      let data = {}
      queryArticleType(data).then((res) => {
        console.log('typelist',res)
        if(res.code == 0){
          this.tableData = res.data.pageListData
        }
      })
    },
    handleClose() {
      this.form = {}
      this.dialogVisible = false
    },
    newType() {
      this.title = '新建文章类型'
      this.dialogVisible = true
    },
    editType(row) {
      this.title = '编辑文章类型'
      this.dialogVisible = true
      this.form = JSON.stringify(row)
      this.form = JSON.parse(this.form)
    },
    inputCheck(){
      let flag = true
      if(this.form.newsName == null || this.form.newsName == '' || typeof(this.form.newsName) == undefined ){
        flag = false
        this.$message({
          type:'warning',
          message:'类型名称不能为空'
        })
      }else if( this.form.sort == null || this.form.sort == '' || typeof(this.form.sort) == undefined ){
        flag = false
        this.$message({
          type:'warning',
          message:'排序值名称不能为空'
        })
      }else if(isNaN(this.form.sort)){
        flag = false
        this.$message({
          type:'warning',
          message:'排序值只能为数字'
        })
      }
      if(flag){
        return true
      }else{
        return false
      }
    },
    save() {
      if(this.inputCheck()){
        if (this.title == '新建文章类型') {
          addArticleType(this.form).then((res) => {
            if(res.code == 0){
              this.$message({
                type: 'success',
                message: '新增类型成功！'
              })
              this.dialogVisible = false
              this.form = {}
              this.getPageList()
            }else{
              this.$message({
                type:'error',
                message:res.msg
              })
            }
          })
        }else if(this.title == '编辑文章类型') {
          editArticleType(this.form).then((res) => {
            if(res.code == 0){
              this.$message({
                type: 'success',
                message: '编辑类型成功！'
              })
              this.dialogVisible = false
              this.form = {}
              this.getPageList()
            }else{
              this.$message({
                type:'error',
                message:res.msg
              })
            }
          })
        }
      }
    }
  },
  created() {
    this.getPageList()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.type-container{
  text-align:right;
  padding:10px 10px;
}
</style>
