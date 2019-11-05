<template>
  <el-dialog ref="modal" :visible.sync="showStatus" title="添加角色" class="thin-dialog" center :close-on-click-modal="false" width="800px" top="50px" @close="beforeClose">
    <el-steps :active="active" simple finish-status="success">
      <el-step title="基本信息" />
      <el-step title="菜单分配" />
      <el-step title="权限分配" />
    </el-steps>
    <div v-show="active <= 0" class="step-pane">
      <el-alert type="info" :closable="false" style="margin-bottom: 20px;" center>
        请填写角色信息
      </el-alert>
      <el-form label-width="80px" size="mini">
        <el-form-item label="角色名称">
          <el-input v-model="baseForm.roleName" />
        </el-form-item>
        <el-form-item label="角色级别">
          <el-input-number v-model="baseForm.roleLevel" controls-position="right" :min="1" :max="5" />
        </el-form-item>
        <el-form-item label="数据范围">
          <el-select v-model="baseForm.dataScope">
            <el-option value="all" label="全部" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述信息">
          <el-input v-model="baseForm.remark" type="textarea" placeholder="角色描述信息" />
        </el-form-item>
      </el-form>
    </div>
    <div v-show="active===1" class="step-pane">
      <el-alert type="info" :closable="false" style="margin-bottom: 20px;">
        请选择角色可见菜单
      </el-alert>
      <el-scrollbar class="scroll-pane">
        <el-tree
          ref="menu"
          :data="menus"
          :default-checked-keys="menuIds"
          :props="{children: 'children', label: 'label'}"
          accordion
          show-checkbox
          node-key="id"
        />
      </el-scrollbar>
    </div>
    <div v-show="active===2" class="step-pane">
      <el-alert type="info" :closable="false" style="margin-bottom: 20px;">
        请选择角色可使用权限
      </el-alert>
      <el-scrollbar class="scroll-pane">
        <el-tree
          ref="permission"
          :data="permissions"
          :default-checked-keys="permissionIds"
          :props="{children: 'children', label: 'label'}"
          accordion
          show-checkbox
          node-key="id"
        />
      </el-scrollbar>
    </div>
    <div v-show="active===3" class="step-pane">
      <!-- <el-alert type="success" :closable="false"  style="margin-bottom: 20px;">点击完成保存角色</el-alert> -->
      <h2 style="text-align: center;">
        点击完成保存角色
      </h2>
    </div>
    <div slot="footer" style="text-align: center;">
      <el-button v-show="active > 0" @click="prev">
        上一步
      </el-button>
      <el-button v-show="active !== 3" type="primary" @click="next">
        下一步
      </el-button>
      <el-button v-show="active===3" type="success" @click="addRole">
        完成
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import menus from './menus.json'
import permissions from './permissions'
export default {
  name: 'AddRole',
  data: () => ({
    showStatus: false,
    active: 0,
    baseForm: {
      roleName: '',
      roleLevel: 1,
      dataScope: '',
      remark: ''
    },
    menus: menus,
    menuIds: [],
    permissions: permissions,
    permissionIds: []
  }),
  methods: {
    showSelf() {
      this.showStatus = true
    },
    prev() {
      const step = this.active
      if (step > 0) this.active--
      // console.log(this.active)
    },
    next() {
      this.active < 3 ? this.active++ : ''
      // console.log(this.active)
    },
    beforeClose() {
      console.log('close')
      this.active = 0
      this.baseForm = {
        roleName: '',
        roleLevel: 1,
        dataScope: '',
        remark: ''
      }
      this.$refs.menu.setCheckedKeys([])
      this.$refs.menu.$children.forEach(item => item.expanded = false)
      this.$refs.permission.setCheckedKeys([])
      this.$refs.permission.$children.forEach(item => item.expanded = false)
      // console.log(this.$refs.menu)
    },
    addRole() {
      this.showStatus = false
    }
  }
}
</script>
<style lang="scss">
.step-pane{
  margin: 20px auto 0;
  width: 500px;
  .scroll-pane {
    height: 500px;
    .el-scrollbar__wrap{
      overflow-x: hidden;
    }
  }
}
</style>
