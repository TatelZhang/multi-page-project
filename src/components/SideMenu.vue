<template>
  <el-scrollbar class="left-menu">
    <el-menu
      :default-active="$route.path"
      router
      style="min-height: 100%;"
    >
      <side-menu-item v-for="menu in sideMenus" :key="menu.path" :menu="menu" :base-path="menu.path" />
    </el-menu>
  </el-scrollbar>
</template>
<script>
import { mapGetters } from 'vuex'
import SideMenuItem from './SideMenuItem'
export default {
  name: 'SideMenu',
  components: {
    SideMenuItem
  },
  computed: {
    ...mapGetters([
      'sideMenus'
    ])
  },
  watch: {
  }
}
</script>
<style lang="scss" scoped>
.left-menu {
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss">
.left-menu .el-scrollbar__wrap{
  overflow-x: hidden;
}
.left-menu .el-scrollbar__view {
  height: 100%;
}
</style>
