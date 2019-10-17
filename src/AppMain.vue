<template>
  <div>
    <div class="main-container" :style="mainStyle">
      <app-container />
    </div>
    <div class="main-header">
      <app-header />
    </div>
  </div>
</template>
<script>
import AppHeader from '@/components/AppHeader'
import AppContainer from '@/components/AppContainer'
function getHeight() {
  const height = window.innerHeight - 50
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
    mainStyle () {
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
