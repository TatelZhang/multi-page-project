<template>
  <div class="login-page">
    <div class="login-panel">
      <div class="login-logo">
        <img :src="require('@/assets/image/logo.svg')" width="90" height="65">
      </div>
      <div class="login-title">
        <span>利华贸易和码头仓储管理系统</span>
      </div>
      <el-form class="login-form" size="large" :model="loginForm" :rules="rules" ref="login">
        <el-form-item class="login-item" prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid" placeholder="请输入登陆用户名" />
        </el-form-item>
        <el-form-item class="login-item" prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-s-tools" placeholder="请输入登陆密码" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" :loading="loading" @click="login">
            登陆
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/user'
export default {
  name: 'LoginPage',
  data: () => ({
    loading: false,
    loginForm: {
      username: '',
      password: ''
    },
    rules: {
      username: [
        { required: true, message: '请输入登陆用户名', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入用户密码', trigger: 'blur' }
      ]
    }
  }),
  methods: {
    login() { // 登陆系统
      this.loading = true
      this.$refs.login.validate(status => {
        console.log(status)
        if(!status) {
          this.loading = false
          return
        }
        // login()
        this.loading = false
        setTimeout(() => {
          location.href = '/system'
        }, 1000);
      })
    }
  }
}
</script>
<style lang="scss">
body {
  margin: 0;
  background-color: rgba(26, 188, 156, 1);
  background-image: url('../../assets/image/bg.jpg')
}
.login-page {
  position: relative;
  height: 100%;
  width: 100%;
  min-width: 1100px;
  min-height: 800px;
  .login-panel {
    border-radius: 10px;
    background: #ffffff;
    width: 350px;
    height: 420px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    .login-logo {
      text-align: center;
      padding-top: 26px;
      padding-bottom: 12px;
    }
    .login-title {
      padding: 2px;
      text-align: center;
      > span {
        font-size: 24px;
        color: #0079FE;
        line-height: 28px;
        font-weight: 700;
        font-family: 'Microsoft YaHei Bold';
        font-style: normal;
      }
    }
    .login-form {
      padding: 20px 25px;
      .login-item {
        margin-bottom: 30px;
      }
    }
  }
}
</style>
