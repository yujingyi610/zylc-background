<template>
  <div class="manage-team app-container">
    <el-container>
      <el-aside border width="250px">
        <div class="left-tree-container">
          <team-tree v-on:buildingHandle="buildingHandle"/>
        </div>
      </el-aside>
      <el-main>
        <div class="right-container">
          <header class="team-title">运营团队</header>
          <div class="select-container">
            <el-container>
              <el-aside width="250px" style="padding-left:10px;">
                <div class="tab-header">
                  <span>团队名称</span>
                  <div style="float:right">
                    <el-button type="text" size="mini" @click="editData">编辑</el-button>
                    <el-button type="text" size="mini" @click="deleteData">删除</el-button>
                    <el-button type="text" size="mini" @click="addData">新增</el-button>
                  </div>
                </div>
                <el-tree :highlight-current="true" :default-expand-all="true" :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
              </el-aside>
              <el-main>
                <div class="tab-header">
                  <span>团队成员</span>
                  <div style="float:right">
                    <el-button type="text" size="mini" @click="showTeanPerson">增加成员</el-button>
                  </div>
                </div>
                <el-table :data="tableData" border style="width: 100%">
                  <el-table-column align="center" type="index" label="序号" width="55"></el-table-column>
                  <el-table-column align="center" prop="changeUserName" label="用户名"></el-table-column>
                  <el-table-column align="center" prop="userName" label="姓名"></el-table-column>
                  <el-table-column align="center" prop="genderText" label="性别"></el-table-column>
                  <el-table-column align="center" prop="name" label="角色"></el-table-column>
                  <el-table-column align="center" prop="mainPositionName" label="职务（融合平台）"></el-table-column>
                  <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" @click="removeTeamPerson(scope.row)">移除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-main>
            </el-container>
          </div>
        </div>
      </el-main>
    </el-container>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" :before-close="cancel">
      <el-form label-position="right" label-width="100px" :model="formData" :rules="rules" ref="formData" class="demo-ruleForm">
        <el-form-item label="团队名称：" prop="teamName">
          <el-input size="mini" v-model="formData.teamName"></el-input>
        </el-form-item>
        <el-form-item label="上级组织：">
          <span>10015456454</span>
        </el-form-item>
        <el-form-item align="right">
          <el-button type="" size="mini" @click="cancel">取消</el-button>
          <el-button type="primary" size="mini" @click="save">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--新增团队人员弹框-->
    <el-dialog title="新增团队人员" :visible="addPersonVisible" width="80%" :before-close="cancelAddPerson">
      <add-person v-on:closeAddDialog="cancelAddPerson" :teamId="teamId"/>
    </el-dialog>
  </div>
</template>

<script>
  import TemeTree from './managerTree/manager-tree';
  import AddPerson from './addPerson/addPerson';
  import { getTeam,addTeamList,editTeamList,deleteTeamList,queryTeamPerson,removeTeamPerson } from '@/api/building';
export default {
  name: 'manage-team',
  components:{
    'team-tree':TemeTree,
    'add-person':AddPerson
  },
  data() {
    return {
      dialogTitle:null,
      dialogVisible:false,
      addPersonVisible:false,//新增团队人员弹框
      formData:{},//新增编辑表单
      tableData:[],
      treeNodeId:null,
      estateId:null,
      estateName:null,
      teamName:null,
      teamId:null,
      treeData: [],
      rules: {
        teamName: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
      },
      defaultProps: {
        children: 'teamList',
        label: 'label'
      }
    }
  },
  methods:{
    handleNodeClick(data) {
      console.log(data);
      if(data.estateName != undefined){
        this.estateId = data.estateId;
        this.estateName = data.estateName;
      }else if(data.teamName != undefined){
        this.teamName = data.teamName;
        this.teamId = data.id;
        this.getTeamPerson(data.id);
      }
    },
    editData(){//编辑
      if(this.teamName == null){
        this.$message({
          type:'warning',
          message:'请先选择需要编辑的团队节点！'
        })
      }else{
        this.dialogTitle = '编辑当前团队';
        this.dialogVisible = true;
      }
    },
    getTeamPerson(tid){//根据团队ID获取团队成员
      let data = {
        id:tid
      }
      queryTeamPerson(data).then((res) => {
        if(res.code == 0){
          console.log('团队成员',res);
          this.tableData = res.data;
        }else{
          this.$message({
            type:'error',
            message:res.msg
          })
        }
      })
    },
    buildingHandle(val){
      this.treeNodeId = val.id;
      let data = {
        estateName:val.estateName,
        id:val.id
      }
      getTeam(data).then((res) => {//根据楼盘ID获取团队
        this.treeData = [];
        this.treeData.push(res.data);
        this.treeData.map((item) => {
          item.label = item.estateName;
          item.teamList.map((team) => {
            team.label = team.teamName
          })
        })
      })
    },
    deleteData(){//删除
      let that = this;
      if(this.teamId == null || this.teamName == null){
        this.$message({
          type:'warning',
          message:'未选中任何团队节点，无法进行删除操作！'
        })
      }else{
        this.$confirm('此操作将永久删除('+this.teamName+')该节点, 是否继续?','提示',{type:'warning'}).then(() => {
          let data = {
            id:this.teamId
          }
          deleteTeamList(data).then((res) => {
            if(res.code == 0){
              that.$message({
                type:'success',
                message:'删除团队成功！'
              })
              this.getBuildAndTeamList()
            }else{
              that.$message({
                type:'warning',
                message:res.msg
              })
            }
          })
        }).catch(() => {

        })
      }
    },
    addData(){//新增
      if(this.estateId == null){
        this.$message({
          type:'warning',
          message:'请先选择新增父节点'
        })
      }else{
        this.dialogTitle = '新增团队';
        this.dialogVisible = true;
      }
    },
    removeTeamPerson(row){
      let that = this;
      this.$confirm('确定从团队中移除成员 ['+row.userName+'] 吗？','提示').then(() => {
        let data = {
          userId:row.id,
          teamId:that.teamId
        }
        removeTeamPerson(data).then((res) => {
          if(res.code == 0){
            that.$message({
              type:'success',
              message:'移除成员成功！'
            })
            that.getTeamPerson(that.teamId);
          }else{
            that.$message({
              type:'error',
              message:res.msg
            })
          }
        })
      }).catch(() => {

      })
      //console.log(row);
    },
    cancel(){
      this.formData = {};
      this.dialogVisible = false;
    },
    cancelAddPerson(){
      this.getTeamPerson(this.teamId);
      this.addPersonVisible = false;
    },
    showTeanPerson(){
      if(this.teamId == null || this.teamName ==null){
        this.$message({
          type:'warning',
          message:'请先选择添加成员的团队节点！'
        })
      }else{
        this.addPersonVisible = true;
      }
    },
    getBuildAndTeamList(){
      let d = {
        id:this.treeNodeId,
      }
      getTeam(d).then((res) => {//根据楼盘ID获取团队
        this.treeData = [];
        this.treeData.push(res.data);
        this.treeData.map((item) => {
          item.label = item.estateName;
          item.teamList.map((team) => {
            team.label = team.teamName
          })
        })
      })
    },
    save(){
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          let data = {
            estateId:this.estateId,
            teamName:this.formData.teamName
          }
          if(this.dialogTitle == '新增团队'){
            addTeamList(data).then((res) => {
              if(res.code == 0){
                this.$message({
                  type:'success',
                  message:'添加团队成功！'
                })
                this.cancel();
                this.getBuildAndTeamList();
              }else{
                this.$message({
                  type:'error',
                  message:res.msg
                })
              }
            })
          }else if(this.dialogTitle == '编辑当前团队'){
            let data = {
              teamName:this.formData.teamName,
              id:this.teamId
            }
            editTeamList(data).then((res) => {
              if(res.code == 0){
                this.$message({
                  type:'success',
                  message:'修改团队信息成功!'
                })
                this.cancel();
                this.getBuildAndTeamList();
              }else{
                this.$message({
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .right-container{
    border:solid thin #DAD8D8;
    border-radius:5px;
    min-height:88vh;
    .team-title{
      height:45px;
      line-height:45px;
      text-indent:10px;
      border-bottom:solid thin #DAD8D8;
    }
  }
  .left-tree-container{
    border:solid thin #DAD8D8;
    border-radius:5px;
    overflow-x: scroll;
  }
  .tab-header{
    height:36px;
    line-height:36px;
    border-bottom:solid thin #DAD8D8;
  }
  .dialog-search-header{
    div{
      padding-left:10px;
    }
    border-bottom:solid thin #DAD8D8;
    padding-bottom:20px;
  }
</style>
