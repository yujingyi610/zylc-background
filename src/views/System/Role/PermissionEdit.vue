<template>
  <div class="PermissionEdit">
    <el-dialog :visible.sync="treeShow" width="600px" @close="close">
      <div class="tree-box" v-loading="loading">
        <el-tree
          ref="tree"
          :data="treeData"
          :props="{label: 'name', children: 'childrens'}"
          :default-checked-keys="checkedKey"
          node-key="id"
          class="filter-tree"
          show-checkbox
          default-expand-all
          @current-change="handNodeChange"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList } from 'api/system/role.js'

export default {
  name: 'PermissionEdit',
  props: ['show', 'currId'],
  data() {
    return {
      treeShow: this.show,
      id: this.currId,
      loading: true,
      filterText: '',
      treeData: [],
      checkedKey: []
    }
  },
  watch: {
    show(newVal) {
      this.treeShow = newVal
      if (newVal) {
        this.checkedKey = []
        setTimeout(() => {
          this.getData()
        }, 20)
      }
    },
    currId(newVal) {
      this.id = newVal
    }
  },
  methods: {
    handNodeChange(nodeData) {
      console.log(nodeData)
    },
    submit() {
      // let checked = this.$refs['tree'].getCheckedKeys()
      const checkedNode = this.$refs['tree'].getCheckedNodes(true, false)
      const btnList = []
      const menuList = []
      const idArr = []
      checkedNode.forEach((val, index) => {
        const children = val.childrens
        idArr.push(val.id)
        if (children && children.length !== 0) {
          // 父节点
          menuList.push(val.id)
        } else {
          // 叶子节点
          btnList.push(val.id)
        }
      })
      var hash = {}
      var i = 0
      var res = []
      checkedNode.forEach(function(item) {
        var menuId = item.menuId
        hash[menuId] ? res[hash[menuId] - 1].meno.push(item.id) : hash[menuId] = ++i && res.push({
          meno: [item.id],
          meunId: menuId
        })
      })
      res.forEach((val, index) => {
        if (!val.meunId) {
          const menuList = val.meno
          console.log(menuList)
          menuList.forEach((cval, index) => {
            res.push({
              meunId: cval,
              meno: ''
            })
          })
          res.splice(index, 1)
        }
      })
      const data = {
        roleId: this.id,
        menuIdList: JSON.stringify(res)
      }
      console.log(data)
      this.$emit('submit', data)
    },
    formatTree(parr, carr) {
      parr.forEach((val, idnex) => {
        if (val.childrens.length !== 0) {
          this.formatTree(val.childrens, carr)
        } else {
          // 遍历到了根节点
          carr.forEach((cval, cindex) => {
            if (cval.menuId === val.id) {
              val.childrens.push(cval)
              cval.id = `${val.id}:${cval.id}` // ${val.id}:
            }
          })
        }
      })
    },
    getData() {
      getPermissionList(this.id).then((res) => {
        const menuList = JSON.parse(res.data.Meunlist)
        const menuListChecked = JSON.parse(res.data.roleMeunList)
        const funcList = JSON.parse(res.data.meunFuncList)
        this.formatTree(menuList, funcList)
        const checkedList = []
        menuListChecked.forEach((val, index) => {
          let meno = val.meno
          if (meno) {
            meno = JSON.parse(val.meno)
            meno.forEach((item) => {
              checkedList.push(item)
            })
          } else {
            checkedList.push(val.meunId)
          }
        })
        console.log(checkedList)
        this.treeData = menuList
        this.checkedKey = checkedList
        this.loading = false
      })
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
