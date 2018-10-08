<template>
  <div class="Menu app-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="tree-box">
          <div class="btn-box">
            <el-button :disabled="!currNodeObj" type="primary" icon="el-icon-circle-plus-outline" @click="handAdd">添加</el-button>
            <el-button :disabled="!currNodeObj" type="primary" icon="el-icon-edit" @click="handEdit">编辑</el-button>
            <el-button :disabled="!(currNodeObj && currNodeObj.parentId != 0)" type="primary" icon="el-icon-delete" @click="discardMenu">删除</el-button>
          </div>
          <div class="filter-box">
            <el-input v-model="filterText" placeholder="输入关键字进行过滤"/>
          </div>
          <el-tree
            ref="tree"
            :data="treeData"
            :props="{label: 'name', children: 'childrens'}"
            :filter-node-method="filterNode"
            empty-text="暂无数据"
            node-key="id"
            @current-change="handNodeClick"/><!--@current-change="handNodeClick"-->
        </div>
      </el-col>
      <div>
        <!--编辑-->
        <el-col v-show="editIsShow" :span="16">
          <!--// 编辑-->
          <NodeEdit :btn-edit-is-show="btnEditIsShow" :btn-form="currBtnItem" :data="editData" @cancel="cancel" @submitNode="submitEdit" @submitAddBtn="submitAddBtn" @delBtn="delBtn" @editClick="editClick" @closeBtnForm="btnEditIsShow = false" @submitModifyBtn="submitModifyBtn" @add-btn="addBtn"/>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
import { getMenuList, getMenuInfo, setMenuInfo, addMenu, discardMenu } from 'api/system/menu.js'
import NodeEditMethod from './methods/NodeEdit'
import btnEditMethod from './methods/btnEdit'
// import NodeEdit from './NodeEdit/NodeEditForm.vue'
import NodeEdit from './NodeEdit/Index.vue'

export default {
  name: 'Menu',
  components: {
    NodeEdit
  },
  data() {
    return {
      filterText: '',
      treeData: [],
      btnEditIsShow: false,
      btnAddIsShow: false,
      currBtnItem: {}, // 表单项详情数据
      addBtnItem: {}, // 新增表单项详情数据
      editData: null, // 编辑数据
      addData: {}, // 新增数据
      currNodeObj: null,
      currNodeInfo: {}, // 当前节点详情数据
      editIsShow: false,
      addIsShow: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    ...NodeEditMethod,
    ...btnEditMethod,
    handAdd() {
      if (this.currNodeObj) {
        this.$set(this.addData, 'parentId', this.currNodeObj.parentId)
        this.$set(this.addData, 'id', this.currNodeObj.id)
        this.addIsShow = true
        this.editIsShow = false
      }
    },
    // 提交新增节点
    submitAdd(data) {
      addMenu(data).then((res) => {
        console.log(res)
      })
    },
    // 提交节点编辑
    submitEdit(data) {
      setMenuInfo(data).then((res) => {
        this.getData()
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        this.expandedKeys = [data.id]
      })
    },
    handEdit() {
      if (this.currNodeObj && this.currNodeObj.parentId != 0) {
        this.editIsShow = true
        this.addIsShow = false
        getMenuInfo(this.currNodeObj.id).then((res) => {
          this.editIsShow = true
          this.editData = {
            menuData: res.data.sysMeunDBO, // 菜单数据
            btnData: res.data.sysMeunFuncDBO // 按钮数据
          }
        })
      }
    },
    // 删除节点
    discardMenu() {
      this.$confirm('是否删除当前节点').then((res) => {
        discardMenu(this.currNodeObj.id).then((res) => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
      }).catch()
    },
    cancel() {
      this.editIsShow = false
      this.addIsShow = false
    },
    handNodeClick(nodeData) {
      this.currNodeObj = nodeData
      if (nodeData.parentId != 0 && this.editIsShow) {
        this.getNodeData()
      }
    },
    getNodeData() {
      getMenuInfo(this.currNodeObj.id).then((res) => {
        this.editIsShow = true
        const btnDataList = res.data.sysMeunFuncDBO
        console.log(btnDataList)
        this.editData = {
          menuData: res.data.sysMeunDBO, // 菜单数据
          btnData: res.data.sysMeunFuncDBO // 按钮数据
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    getData() {
      getMenuList().then((res) => {
        this.treeData = JSON.parse(res.data)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .Menu {
    .tree-box, .set-form-box{
      border: 1px solid #bfcbd9;
      padding: 12px;
      border-radius: 6px;
      .filter-box{
        margin-bottom: 20px;
      }
      .btn-box{
        padding: 20px 0;
      }
    }
    .form-title{
      font-size: 16px;
      line-height: 20px;
      color: #444;
      font-weight: 700;
      display: block;
      padding-bottom: 10px;
      border-bottom: 1px solid #bfcbd9;
      margin-bottom: 20px;
    }
  }

</style>
