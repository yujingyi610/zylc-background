<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />
    <div class="user-info">
      <span class="user-name">{{ name }}</span>
      <div class="logout-icon" @click="logout">
        <svg-icon icon-class="logout"/>
      </div>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        // location.reload() // 为了重新实例化vue-router对象 避免bug
        // this.$router.push({ path: '/login' })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .user-info {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    font-size: 18px;
    .user-name{
      position: relative;
      padding-right: 15px;
      &::after {
        content: '';
        position: absolute;
        right: 5px;
        top: 4px;
        width: 1px;
        height: 18px;
        background-color: #ccc;
      }
    }
    .logout-icon{
      cursor: pointer;
      display: inline-block;
      vertical-align: middle;
      color: #ccc;
    }
  }
}
</style>

