<template>
  <div>参数设置
    <el-button @click="doClick">点击</el-button>
  </div>
</template>
<script>
export default {
  name: 'Parameter',
  methods: {
    doClick() {
      console.log(this.$route)
    }
  }
}
</script>