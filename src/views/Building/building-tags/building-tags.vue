<template>
  <div class="building-tags app-container">
    <div class="search-box">
      <el-row>
        <el-col :span="8">
          <div class="search-item">
            <label>标签名称：</label>
            <el-input size="mini" v-model="searchData.labelName" placeholder="请输入标签名称"/>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="search-item">
            <label>创建时间：</label>
            <el-date-picker size="mini" v-model="searchData.startDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker> 到
            <el-date-picker size="mini" v-model="searchData.endDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
          </div>
        </el-col>
        <el-col :span="4"><div class="search-item"><el-button size="mini" type="primary" @click="search">搜索</el-button></div></el-col>
      </el-row>
    </div>
    <div class="table-container">
      <div class="btn-container">
        <el-button type="primary" size="mini" @click="addOrEditTag('add')">新增标签</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%" tooltip-effect='dark'>
        <el-table-column prop="labelName" label="标签名称" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="creator" label="创建人" align="center"></el-table-column>
        <el-table-column prop="count" label="应用楼盘数量" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="addOrEditTag(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteTag(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules" class="demo-ruleForm">
        <el-form-item label="标签名称" prop="labelName">
          <el-input v-model="form.labelName"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="primary" @click="save(title)">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTagList,addTag,editTag,deleteTag } from '@/api/building'
export default {
  data() {
    return {
      searchData: {},
      tableData: [],
      form: {
        labelName:'',
      },
      title: null,
      dialogVisible: false,
      currentPage4:1,
      pageNum:1,
      pageSize:10,
      total:0,
      rules: {
        labelName: [
          {required: true, message: '请输入标签名称', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ]
      },
    }
  },
  methods:{
    getTagList(pageNum,pageSize){
      let data = this.searchData
      data.pageLimit = pageSize;
      data.pageCurrent = pageNum;
      getTagList(data).then((res) => {
        if(res.code == 0){
          this.tableData = res.data.pageListData;
          this.total = res.data.resultCount;
        }
      })
    },
    addOrEditTag(type) {
      if (type == 'add') {
        this.title = '新增标签'
      } else {

        this.title = '编辑标签'
        this.form.id = type.id
        this.form.labelName = type.labelName
      }
      this.dialogVisible = true
    },
    search(){
      this.getTagList(1,10)
    },
    handleClose(){
      this.dialogVisible = false;
      this.form = {}
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTagList(1,val)
    },
    handleCurrentChange(val) {
      this.getTagList(val,this.pageSize);
    },
    save(title){
      let that = this;
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if(title == '新增标签'){
            addTag(that.form).then((res) => {
              if(res.code == 0){
                that.$message({
                  type:'success',
                  message:'新增标签成功'
                })
                that.dialogVisible = false;
                that.form = {}
                that.getTagList()
              }else{
                that.$message({
                  type:'error',
                  message:res.msg
                })
              }
            })
          }else{//编辑标签
            editTag(that.form).then((res) => {
              if(res.code == 0){
                that.$message({
                  type:'success',
                  message:'标签保存成功！'
                })
                that.dialogVisible = false;
                that.form = {}
                that.getTagList()
              }else{
                that.$message({
                  type:'error',
                  message:res.msg
                })
              }
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    deleteTag(rowId){
      let that = this
      this.$confirm('确定要删除该标签吗？','提示').then(() => {
        let data = {
          id:rowId
        }
        deleteTag(data).then((res) => {
          if (res.code == 0) {
            that.$message({
              type: 'success',
              message: '删除标签成功！'
            })
            that.getTagList()
          }else{
            that.$message({
              type:'error',
              message:res.msg
            })
          }
        })
      }).catch( () => {
        return
      })
    }
  },
  created(){
    this.getTagList(this.pageNum,this.pageSize);
  }
}
</script>

<style lang="scss" scoped>
.table-container{
  padding:20px 0;
}
  .btn-container{
    text-align:right;
    padding:10px 0;
  }
</style>
