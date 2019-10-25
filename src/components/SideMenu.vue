<template>
  <el-scrollbar class="left-menu">
    <!-- <el-menu>
      
    </el-menu> -->
  </el-scrollbar>
</template>
<script>
export default {
  name: 'SideMenu'
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
</style>