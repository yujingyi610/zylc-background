<template>
  <div id="add-person">
    <div class="dialog-search-header">
      <el-row>
        <el-col :span="7"><div><label>用户名：</label><el-input size="mini" v-model="searchForm.changeUserName"></el-input></div></el-col>
        <el-col :span="7"><div><label>姓名：</label><el-input size="mini" v-model="searchForm.userName"></el-input></div></el-col>
        <el-col :span="7"><div style="height:30px;"><!--<label>所属组织：</label><el-input size="mini" v-model="searchForm"></el-input>--></div></el-col>
        <el-col :span="3"><div><el-button type="primary" size="mini" @click="search">查找</el-button></div></el-col>
      </el-row>
    </div>
    <div class="select-person-body">
      <el-row>
        <el-col :span="6">
          <div>
            <el-tree
              class="filter-tree"
              :data="data2"
              :props="defaultProps"
              lazy
              :filter-node-method="filterNode"
              @node-click="handleNodeClick"
              :load="loadNode"
              ref="tree2">
            </el-tree>
          </div>
        </el-col>
        <el-col :span="9">
          <div>
            <div style="background-color:#dadada;height:36px;line-height:36px;text-indent:10px;">成员</div>
            <el-table border :data="tableDataPerson" width="100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="changeUserName" align="center" label="用户名"></el-table-column>
              <el-table-column prop="userName" align="center" label="姓名"></el-table-column>
              <el-table-column prop="userCode" align="center" label="工号"></el-table-column>
              <el-table-column prop="orgUnitName" align="center" label="部门"></el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="3">
          <div>
            <div class="t-center"><el-button type="primary" @click="addToSelectedTable">添加 ></el-button></div>
            <div class="t-center"><el-button type="primary" @click="removeFromSelectedTable">< 移除</el-button></div>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <div style="background-color:#dadada;height:36px;line-height:36px;text-indent:10px;">团队成员</div>
            <el-table border :data="selectedTable" width="100%" @selection-change="selectRemoveArr">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="changeUserName" align="center" label="用户名"></el-table-column>
              <el-table-column prop="userName" align="center" label="姓名"></el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <div style="text-align:right;height:46px;line-height:46px;">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="addPerson">确定</el-button></div>
    </div>
  </div>
</template>

<script>
  import {getGreenTownInChina,getGroupAndCompany,getPart,getPersonList,saveTeamPerson,getPersonTableList} from '@/api/building'
    export default {
      props:['teamId'],
      watch: {
        filterText(val) {
          this.$refs.tree2.filter(val);
        }
      },
      data(){
        return{
          tableDataPerson:[],
          selectedArr:[],
          removeArr:[],
          selectedTable:[],
          data2:[],
          searchForm:{},
          defaultProps: {
            children: 'children',
            label: 'label',
          }
        }
      },
      methods:{
        filterNode(value, data) {
          if (!value) return true;
          return data.label.indexOf(value) !== -1;
        },
        handleNodeClick(data){
          if(data.orgUnitTypeName == '部门'){
            let d = {
              orgUnitCode:data.id
            }
            getPersonList(d).then((res) => {
              console.log('人员列表：',res);
              this.tableDataPerson = res.data;
            })
          }
        },
        search(){
          getPersonTableList(this.searchForm).then((res) => {
            if(res.code == 0){
              this.tableDataPerson = res.data;
            }else{
              this.$message({
                type:'error',
                message:res.msg
              })
            }
          })
        },
        loadNode(node, resolve){
          if (node.level === 0) {
            return resolve([{ name: 'region' }]);
          }else if(node.level === 1){
            let data = {
              orgUnitType:'40,41,50',
              verticalUnitCode:node.data.verticalUnitCode
            }
            let child = null;
            getGroupAndCompany(data).then((res) => {
              console.log(res);
              child = res.data;
              child.map((item) => {
                item.label = item.orgUnitName
              })
            })
            setTimeout(() => {
              resolve(child);
            }, 500);
          }else if(node.level === 2){
            let data = {
              orgUnitType:90,
              verticalUnitCode:node.data.verticalUnitCode
            }
            let child = null;
            getGroupAndCompany(data).then((res) => {
              child = res.data;
              child.map((item) => {
                item.label = item.orgUnitName
              })
            })
            setTimeout(() => {
              resolve(child);
            }, 500);
          }else if(node.level >= 3){
            return resolve([])
          }
        },
        handleSelectionChange(arr){
          console.log('选中数据：',arr);
          this.selectedArr = arr;
        },
        addToSelectedTable(){
          //this.selectedTable = this.selectedArr;
          debugger
          if(this.selectedTable.length == 0){
            this.selectedTable = this.selectedArr;
          }else{
            let arr1 = JSON.stringify(this.selectedTable);
            let arr2 = JSON.stringify(this.selectedArr);
            arr1 = JSON.parse(arr1);
            arr2 = JSON.parse(arr2);
            arr1.map((item) => {
              arr2.map((oitem,index) => {
                if(oitem.id == item.id){
                  arr2.splice(index,1);
                }
              })
            })
            arr2.map((item) => {
              this.selectedTable.push(item);
            })
          }
        },
        selectRemoveArr(arr){
         this.removeArr = arr;
        },
        removeFromSelectedTable(){
          this.selectedTable.map((item,index) => {
            this.removeArr.map((row) => {
              if(item.id == row.id){
                this.selectedTable.splice(index,1);
              }
            })
          })
        },
        addPerson(){
          //saveTeamPerson
          if(this.selectedArr.length == 0){
            this.$message({
              type:'warning',
              message:'未选中任何人员！'
            })
          }else{
            let userIdArr = new Array();
            this.selectedTable.map((item) => {
              userIdArr.push(item.id);
            })
            let data = {
              teamId:this.teamId,
              userIdStr:userIdArr.toString()
            }
            saveTeamPerson(data).then((res) => {
              if(res.code == 0){
                this.$message({
                  type:'success',
                  message:'新增团队成员成功！'
                })
                this.selectedTable = [];
                this.tableDataPerson = [];
                this.$emit('closeAddDialog');
              }else{
                this.$message({
                  type:'error',
                  message:res.msg
                })
              }
            })
          }
        },
        cancel(){
          this.tableDataPerson = [];
          this.selectedTable = [];
          this.$emit('closeAddDialog')
        },
        initData(){
          let data = {
            //orgUnitCode:'00000001',
            //orgUnitType:10
            orgUnitType:'15,30'
          }
          getGroupAndCompany(data).then((res) => {
            console.log('第一层',res);
            if(res.code == 0){
              //this.data2 = [];
              this.data2 = res.data;
              this.data2.map((item) => {
                item.label = item.orgUnitName
              })
            }
          })
        }
      },
      created(){
        this.initData();
      }
    }
</script>

<style lang="scss" scoped="scoped">
  .dialog-search-header{
    div{
      padding-left:10px;
    }
    border-bottom:solid thin #DAD8D8;
    padding-bottom:20px;
  }
  .t-center{
    text-align: center;
    margin-top:52px;
  }
</style>
