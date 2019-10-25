<template>
  <div class="app-container">
    <el-row class="full-height">
      <el-col :span="6" class="full-height">
        <side-menu />
      </el-col>
      <el-col :span="18" class="full-height">
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
