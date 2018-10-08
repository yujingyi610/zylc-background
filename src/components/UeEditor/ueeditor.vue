<template lang="html">
  <div class="ue-editor">
    <script id="editor" type="text/plain"></script>
  </div>
</template>

<script>
export default {
  data(){
    return{
      name:'edit',
      editor: null
    }
  },
  watch:{
    defaultMsg(){
        this.editor.setContent(this.defaultMsg)// 确保UE加载完成后，放入内容
    }
  },
  props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      }
  },
  mounted() {
      const _this = this
      this.editor = UE.getEditor('editor', this.config) // 初始化UE
      this.editor.addListener("ready", function () {
        _this.editor.setContent(_this.defaultMsg) // 确保UE加载完成后，放入内容。
      })
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      }
    },
    destroyed() {
      this.editor.destroy()
    }
}
</script>

<style lang="scss" scoped="scoped">
.ue-editor{
  min-height:50vh;
}
</style>
