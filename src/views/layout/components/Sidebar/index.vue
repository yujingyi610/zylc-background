<template>
  <el-scrollbar wrap-class="scrollbar-wrapper" ondragstart="return false;" oncontextmenu="return false;">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
    >
      <sidebar-item v-for="route in routes" :key="route.name" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
