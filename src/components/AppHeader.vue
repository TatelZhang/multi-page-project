<template>
  <el-row style="background-color: #545c64;">
    <!-- 一级菜单主菜单 -->
    <el-col :span="2">
      <div class="logo">
        <img :src="require('@/assets/image/logo.svg')" height="40" width="40">
      </div>
    </el-col>
    <el-col :span="14">
      <el-menu mode="horizontal" class="el-menu-super" size="mini" :default-active="currentIndex" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="1">
          <!-- <i class="el-icon-location"></i> -->
          <a :href="jump('/system')">系统管理</a>
        </el-menu-item>
        <el-menu-item index="2">
          <!-- <i class="el-icon-location"></i> -->
          <a :href="jump('/base')">基本资料</a>
        </el-menu-item>
        <el-menu-item index="3">
          <!-- <i class="el-icon-location"></i> -->
          <a :href="jump('/system')">物权管理</a>
        </el-menu-item>
        <el-menu-item index="4">
          <!-- <i class="el-icon-location"></i> -->
          <a :href="jump('/system')">作业管理</a>
        </el-menu-item>
        <el-menu-item index="5">
          <!-- <i class="el-icon-location"></i> -->
          <a :href="jump('/system')">工资管理</a>
        </el-menu-item>
        <el-menu-item index="6">
          <!-- <i class="el-icon-location"></i> -->
          <a :href="jump('/system')">耗材管理</a>
        </el-menu-item>
        <el-menu-item index="7">
          <!-- <i class="el-icon-location"></i> -->
          <a :href="jump('/system')">贸易管理</a>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="8">
      <ul class="right-bar">
        <li class="user-info">
          <img :src="require('@/assets/image/logo.svg')" alt="" class="avatar">
          <span>
            您好,老罗
          </span>
        </li>
        <li class="exit" @click="logout">
          <!-- <i class="el-icon-"></i> -->
          <span>退出登录</span>
        </li>
      </ul>
    </el-col>
  </el-row>
</template>
<script>
// 顶部菜单
import { remeoveToken } from '../utils/auth'
import { MessageBox } from 'element-ui'
const getIndex = name => {
  switch (name) {
    case '/system': return '1'
    case '3' : return '3'
    case '4' : return '4'
    case '5' : return '5'
    case '6' : return '6'
    case '7' : return '7'
  }
}
export default {
  name: 'AppHeader',
  data: () => ({
    currentIndex: '1'
  }),
  mounted() {
    const pathname = location.pathname
    this.currentIndex = getIndex(pathname)
  },
  methods: {
    jump(path) {
      const pathname = location.pathname
      if (pathname === path) return 'javascript:void(0);'
      // location.href = path
      return path
    },
    logout() {
      MessageBox.confirm(
        '是否要退出登录',
        '退出',
        {
          type: 'info'
        }
      ).then(() => {
        remeoveToken()
        location.href = '/'
      })
    }
  }
}
</script>
<style lang="scss" socped>
.el-menu-super {
  &.el-menu.el-menu--horizontal{
    border-bottom: none;
  }

  a {
    text-decoration: none;

  }
}
.logo {
  height: 60px;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
  img {
    box-sizing: border-box;
    border-radius: 50%;
    background-color: #ffffff;
    padding: 5px;
  }
}
.right-bar {
  text-align: right;
  margin: 0;
  padding: 0;
  list-style: none;
  > li {
    display: inline-block;
    line-height: 60px;
    color: #ffffff;
    padding: 0 20px;
    font-size: 15px;
  }
  .user-info {
    img {
      background: #ffffff;
      border-radius: 50px;
      box-sizing: border-box;
      height: 40px;
      width: 40px;
      padding: 5px;
      vertical-align: middle;
    }
    span {
      margin-left: 10px;
      font-size: 15px;
    }
  }
  .exit {
    cursor: pointer;
  }
  .exit:hover {
    background-color: rgb(67, 74, 80);
    user-select: none;
  }
}
</style>
