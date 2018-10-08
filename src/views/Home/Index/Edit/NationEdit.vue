<template>
  <div class="Edit">
    <el-dialog
      :visible.sync="visible"
      :modal="false"
      :fullscreen="true"
      :modal-append-to-body="false"
      :close-on-press-escape="true"
      custom-class="indexEdit-dialog"
      lock-scroll
      @close="handleClose">
      <BannerSet @submit="submitBanner"/>
      <Recommend @submit="submitBanner"/>
      <BuildingNews @submit="submitBanner"/>
    </el-dialog>
  </div>
</template>

<script>
import BannerSet from './BannerSet.vue'
import Recommend from './Recommend.vue'
import BuildingNews from './BuildingNews.vue'

export default {
  name: 'Edit',
  components: {
    BannerSet,
    Recommend,
    BuildingNews
  },
  props: ['data', 'show'],
  data() {
    return {
      visible: this.show,
      queryData: {
        page: 1,
        pageLimit: this.$store.getters.pageLimt,
        isHotCity: '', // 是否热门城市
        isEnabled: '', // 是否启用
        areaName: '' // 城市
      }
    }
  },
  watch: {
    show(newVal) {
      this.visible = newVal
    }
  },
  methods: {
    submitIcon(data) {
      console.log(data)
    },
    submitBanner(data) {
      console.log(data)
    },
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .Edit{
    .indexEdit-dialog{
      .el-form-item{
        margin-bottom: 0;
      }
      .Index{
        position: relative;
        .el-dialog__wrapper{
          position: absolute !important;
        }
      }
    }
  }
</style>
