<template>
  <div class="Edit">
    <MobileIcon :data="menu" @flesh="flesh" v-if="id == 1"/>
    <BannerSet :data="banner" @flesh="flesh"/>
    <Recommend :data="building" @flesh="flesh"/>
    <BuildingNews :data="news" @flesh="flesh"/>
  </div>
</template>

<script>
import MobileIcon from './MobileIcon.vue'
import BannerSet from './BannerSet.vue'
import Recommend from './Recommend.vue'
import BuildingNews from './BuildingNews.vue'
import { getCityInfo } from 'api/home/index/edit.js'

export default {
  name: 'Edit',
  components: {
    MobileIcon,
    BannerSet,
    Recommend,
    BuildingNews
  },
  props: ['data', 'show'],
  data() {
    return {
      visible: this.show,
      id: this.$route.params.id,
      editData: '',
      menu: [],
      banner: [],
      building: [],
      news: []
    }
  },
  watch: {
    show(newVal) {
      this.visible = newVal
    },
    data: {
      handler(newVal) {
        this.editData = Object.assign({}, newVal)
        this.getInfo()
      },
      deep: true
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    flesh() {
      this.getInfo().then(() => {
        this.$message({
          message: '操作成功！',
          type: 'success'
        })
      })
    },
    getInfo() {
      return new Promise((resolve, reject) => {
        getCityInfo(this.id).then((res) => {
          this.menu = res.data.menu
          this.banner = res.data.banner
          this.building = res.data.building
          this.news = res.data.news
          resolve()
        })
      })
    },
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .Edit{
    .BannerSet,.Recommend,.BuildingNews {
      margin-top: 50px;
    }
    .item-box{
      margin-top: 10px;
      .item-form-box{
        display: inline-block;
        vertical-align: middle;
        .el-card {
          width: 1080px;
          .upload-img-box{
            text-align: center;
            .upload-text{
              font-size: 14px;
              color: #606266;
              line-height: 40px;
            }
          }
          .el-form-item{
            margin-bottom: 0;
            .el-input {
              max-width: 230px;
            }
          }
        }
      }
      .mobile-btn-box{
        display: inline-block;
        vertical-align: middle;
        margin-left: 20px;
      }
      .item-title{
        font-size: 14px;
        padding: 10px 0;
        color: #606266;
        font-weight: 700;
        line-height: 20px;
      }
    }
  }
</style>
