<template>
  <!-- 通用layout页面 -->
  <el-container>
    <el-header class="main-header" style="padding: 0;">
      <app-header />
    </el-header>
    <el-main class="main-container" :style="mainStyle" style="padding: 0;">
      <app-container />
    </el-main>
  </el-container>
</template>
<script>
import AppHeader from '@/components/AppHeader'
import AppContainer from '@/components/AppContainer'
function getHeight() {
  const height = window.innerHeight - 61
  return height > 200 ? height : 200
}
export default {
  name: 'AppMain',
  components: {
    AppHeader,
    AppContainer
  },
  data: () => ({
    height: getHeight()
  }),
  computed: {
    mainStyle() {
      return { height: this.height + 'px' }
    }
  },
  mounted() {
    this.height = getHeight()
    window.onresize = () => {
      this.height = getHeight()
    }
  }
}
</script>
