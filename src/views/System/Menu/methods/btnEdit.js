import { getBtnInfo, addBtn, modifyBtn, discardBtn } from 'api/system/menu.js'

export default {
  delBtn(id) {
    this.$confirm('是否删除当前项?', '提示').then(() => {
      discardBtn(id).then(() => {
        this.$message({
          message: '删除成功!',
          type: 'success'
        })
        this.getNodeData()
      })
    }).catch()
  },
  submitAddBtn(data) {
    addBtn(data).then(() => {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
    })
  },
  editClick(id) {
    getBtnInfo(id).then((res) => {
      this.currBtnItem = res.data
      this.btnEditIsShow = true
    })
  },
  submitModifyBtn(data) {
    modifyBtn(data).then(() => {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      this.btnEditIsShow = false
      this.getNodeData()
    })
  },
  addBtn() {
    this.btnEditIsShow = true
  }
}
