<template>
    <div id="managerTree">
      <div class="tree-container">
        <div class="tree-search-container">
          <el-input
            size="mini"
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
        </div>
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
    </div>
</template>

<script>
  import { getLeftTree,getLeftTreeProject,getLeftBuildList } from '@/api/building'
    export default {
      watch: {
        filterText(val) {
          this.$refs.tree2.filter(val);
        }
      },
      data() {
        return {
          filterText: '',
          data2: [],
          defaultProps: {
            children: 'children',
            label: 'label',
          }
        }
      },
      methods:{
        initData(){
          let data = {

          }
          getLeftTree(data).then((res) => {
            if(res.code == 0){
              this.data2 = res.data;
              this.data2.map((item) => {
                item.label = item.projectCityName;
              });
            }
          })
        },
        handleNodeClick(data){
          if(data.estateName != undefined){
            this.$emit('buildingHandle',data);
          }
        },
        loadNode(node, resolve){
          console.log('node',node)
          if (node.level === 0) {
            return resolve([{ name: 'region' }]);
          }else if(node.level === 1){
            let childData
            let data = {
              companyId:node.data.projectCityCode
            }
            getLeftTreeProject(data).then((res) => {
              if(res.code == 0){
                childData = res.data;
                childData.map((item) => {
                  item.label = item.projectName
                })
              }
            })
            setTimeout(() => {
              resolve(childData);
            }, 500);
          }else if(node.level === 2){
            let child
            let data = {
              projectId:node.data.id
            }
            getLeftBuildList(data).then((res) => {
              if(res.code == 0){
                child = res.data.pageListData;
                child.map((item) => {
                  item.label = item.projname
                })
              }
            })
            setTimeout(() => {
              resolve(child);
            }, 500);
          }else if (node.level > 2) return resolve([]);
        },
        filterNode(value, data) {
          if (!value) return true;
          return data.label.indexOf(value) !== -1;
        }
      },
      created(){
        this.initData();
      }
    }
</script>

<style scoped>
 .tree-search-container{
   text-align: center;
   padding:10px 0px;
   border-bottom:solid thin #DAD8D8;
 }
  .tree-container{
    min-height:88vh;
  }
</style>
