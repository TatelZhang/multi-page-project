<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        菜单区域
        <side-menu />
      </el-col>
      <el-col :span="18">
        内容区域
        <router-view />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import SideMenu from './SideMenu'
export default {
  name: 'AppContainer',
  components: {
    SideMenu
  }
}
</script>
<style lang="scss" scoped>
  .app-container {
    width: 100%;
    height: 100%;
  }
</style>
