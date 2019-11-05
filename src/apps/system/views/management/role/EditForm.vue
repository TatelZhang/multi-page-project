<template>
  <el-dialog ref="modal" :visible.sync="showStatus" title="编辑角色" class="thin-dialog" center :close-on-click-modal="false" width="800px" top="50px" @close="beforeClose">
    <el-tabs v-model="active" tab-position="left" class="role-tab">
      <el-tab-pane label="基本信息" name="info">
        <el-form label-width="80px" size="mini" class="role-content">
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
      </el-tab-pane>
      <el-tab-pane label="菜单分配" name="menu">
        <el-scrollbar class="scroll-pane">
          <el-tree
            ref="menu"
            :data="menus"
            :default-checked-keys="menuIds"
            :props="{children: 'children', label: 'label'}"
            accordion
            show-checkbox
            node-key="id"
            class="role-content"
          />
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="权限分配" name="permission">
        <el-scrollbar class="scroll-pane">
          <el-tree
            ref="permission"
            :data="permissions"
            :default-checked-keys="permissionIds"
            :props="{children: 'children', label: 'label'}"
            accordion
            show-checkbox
            node-key="id"
            class="role-content"
          />
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer" style="text-align: center;">
      <el-button type="primary" @click="saveRoleChange">
        保存修改
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
    active: 'info',
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
    showSelf(row) {
      console.log(row)
      const { name, roleLevel, remark, dataScope, permissions, menus } = row
      this.baseForm = {
        roleName: name, roleLevel, dataScope, remark
      }
      this.menuIds = Array.prototype.map.call(menus, item => item.id)
      this.permissionIds = Array.prototype.map.call(permissions, item => item.id)
      this.showStatus = true
    },
    beforeClose() {
      this.active = 'info'
      this.$refs.menu.setCheckedKeys([])
      this.$refs.menu.$children.forEach(item => { item.expanded = false; return })
      this.$refs.permission.setCheckedKeys([])
      this.$refs.permission.$children.forEach(item => { item.expanded = false; return })
    },
    saveRoleChange() {
      // console.log(this.menuIds)
      window.mm = this.$refs.menu
      this.$refs.menu.getCheckedKeys() // 获取选中key值
    }
  }
}
</script>
<style lang="scss">
.role-tab {
  .role-content {
    width: 80%;
    margin: 0 auto;
  }
  .scroll-pane {
    height: 500px;
    .el-scrollbar__wrap{
      overflow-x: hidden;
    }
  }
}
</style>
