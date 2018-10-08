<template>
  <div class="workbench app-container">
    <el-card>
      <div class="info-card-box">
        <!--当前楼盘-->
        <div class="info-card">
          <div class="info-icon">
            <svg-icon icon-class="building"></svg-icon>
          </div>
          <div class="info-content">
            <div class="info-one single">
              <div class="info-title">当前楼盘</div>
              <div class="info">{{ info.estateCount ? info.estateCount : 0 }}个</div>
            </div>
          </div>
        </div>
        <!--预约-->
        <div class="info-card long">
          <div class="info-icon">
            <svg-icon icon-class="order"></svg-icon>
          </div>
          <div class="info-content">
            <div class="info-one">
              <div class="info-title">今日新增预约数</div>
              <div class="info">{{ info.proCount ? info.proCount : 0 }}个</div>
            </div>
            <div class="info-one">
              <div class="info-title">昨日预约总数</div>
              <div class="info">{{ info.yesterdayproCount ? info.yesterdayproCount : 0 }}个</div>
            </div>
          </div>
        </div>
        <!--客户-->
        <div class="info-card">
          <div class="info-icon">
            <svg-icon icon-class="customer"></svg-icon>
          </div>
          <div class="info-content">
            <div class="info-one">
              <div class="info-title">今日客户</div>
              <div class="info">{{ info.coustomCount ? info.coustomCount : 0 }}个</div>
            </div>
            <div class="info-one">
              <div class="info-title">昨日客户</div>
              <div class="info">{{ info.yesterdayCoustomCount ? info.yesterdayCoustomCount : 0 }}个</div>
            </div>
          </div>
        </div>
        <!--浏览-->
        <div class="info-card">
          <div class="info-icon">
            <svg-icon icon-class="view"></svg-icon>
          </div>
          <div class="info-content">
            <div class="info-one">
              <div class="info-title">今日浏览</div>
              <div class="info">{{ info.browseCount ? info.browseCount : 0 }}个</div>
            </div>
            <div class="info-one">
              <div class="info-title">昨日浏览</div>
              <div class="info">{{ info.yesterdayBrowseCount ? info.yesterdayBrowseCount : 0 }}个</div>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <div class="btn-box">
      <router-link :to="{ path: '/Building/BuildingList' }">
        <div class="btn-item">
          <svg-icon icon-class="building"></svg-icon>
          <div class="btn-text">楼盘维护</div>
        </div>
      </router-link>
      <router-link :to="{ path: '/Artist/ArtistAdd' }">
        <div class="btn-item">
          <svg-icon icon-class="article"></svg-icon>
          <div class="btn-text">创建文章</div>
        </div>
      </router-link>
      <router-link :to="{ path: '/Order/Order' }">
        <div class="btn-item">
          <svg-icon icon-class="list"></svg-icon>
          <div class="btn-text">预约列表</div>
        </div>
      </router-link>
      <router-link :to="{ path: '/Home/Index/List' }">
        <div class="btn-item">
          <svg-icon icon-class="home"></svg-icon>
          <div class="btn-text">首页维护</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { getWorkInfo } from 'api/workbench'

export default {
  name: 'Workbench',
  data() {
    return {
      info: {}
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getWorkInfo()
    })
  },
  methods: {
    getWorkInfo() {
      getWorkInfo().then((res) => {
        this.info = Object.assign({}, res.data)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .workbench{
    .info-card-box{
      width: 950px;
      height: 278px;
      display: flex;
      justify-content: space-between;
      align-content: space-between;
      flex-wrap: wrap;
      margin: 30px auto;
      .info-card{
        flex-shrink: 0;
        display: inline-block;
        width: 450px;
        height: 124px;
        background: #f4f4f5;
        border-radius: 4px;
        box-shadow: 0 0 4px 4px rgba(0,0,0,.01);
        box-sizing: border-box;
        padding: 37px 70px;
      }
      .long{
        padding-right: 10px;
      }
      .info-icon{
        display: inline-block;
        font-size: 50px;
        color: #ccc;
      }
      .info-content{
        display: inline-block;
        .info-one{
          position: relative;
          padding: 0 30px;
          display: inline-block;
          &:not(.single):not(:last-child)::after{
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            width: 1px;
            height: 100%;
            background-color: #CCC;
          }
          .info-title{
            line-height: 20px;
            font-size: 14px;
            color: #666666;
          }
          .info{
            line-height: 30px;
            font-size: 22px;
            color: #222222;
          }
        }
      }
    }
    .btn-box{
      padding: 40px 0;
      margin: 0 auto;
      width: 1240px;
      .btn-item {
        color: #FFF;
        width: 285px;
        height: 200px;
        background-color: #57A7E8;
        display: inline-block;
        margin: 0 10px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 50px;
        text-align: center;
        padding-top: 50px;
        .btn-text{
          margin-top: 15px;
          font-size: 18px;
          color: #FFFFFF;
        }
      }
    }
  }

</style>
