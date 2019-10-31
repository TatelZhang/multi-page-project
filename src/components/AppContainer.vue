<template>
  <div class="app-container">
    <el-row class="full-height">
      <el-col :span="4" class="full-height">
        <side-menu />
      </el-col>
      <el-col :span="20" class="full-height">
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
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
