<template>
  <div class="menu-page">
    <el-form size="mini" inline>
      <el-form-item>
        <el-input v-model="keyword" clearable placeholder="模糊搜索" size="mini" style="width: 200px;" />
      </el-form-item>
      <el-form-item>
        <el-button size="mini" icon="el-icon-search" type="primary">
          搜索
        </el-button>
        <el-button type="success" icon="el-icon-plus" @click="addMenu">
          新增
        </el-button>
      </el-form-item>
    </el-form>
    <el-table ref="table" v-loading="loading" :data="data" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="id" size="small">
      <el-table-column :show-overflow-tooltip="true" label="菜单名称" width="125px" prop="name" />
      <el-table-column prop="icon" label="图标" align="center" width="60">
        <template slot-scope="{ row }">
          <i :class="'el-icon-' + row.icon" />
        </template>
      </el-table-column>
      <el-table-column prop="sort" align="center" label="排序" />
      <el-table-column :show-overflow-tooltip="true" prop="path" label="路由地址" />
      <el-table-column :show-overflow-tooltip="true" prop="permission" label="权限标识" />
      <el-table-column :show-overflow-tooltip="true" prop="component" label="组件路径" />
      <el-table-column label="操作" width="130" align="center" fixed="right">
        <template slot-scope="{row}">
          <el-button size="mini" type="primary" icon="el-icon-edit" style="margin-right: 5px;" @click="edit(row)" />
          <el-popover
            placement="top"
            width="200"
            trigger="click"
          >
            <p>确定删除吗,如果存在下级节点则一并删除，此操作不能撤销！</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="doClose">
                取消
              </el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(row.id)">
                确定
              </el-button>
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" />
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogShowStatus" :title="isAdd ? '新增菜单' : '编辑菜单'" width="580px" class="system-dialog thin-dialog" :before-close="resetDialog">
      <el-form ref="menuDiaolog" size="mini" label-width="80px" :model="menuItemData" :rules="rules" style="width: 90%; margin: 0 auto;">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="menuItemData.name" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="组件地址">
          <el-input v-model="menuItemData.component" placeholder="请输入组件地址" />
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-input v-model="menuItemData.icon" />
        </el-form-item>
        <el-row>
          <el-col :lg="12" :xs="24">
            <el-form-item label="菜单路径">
              <el-input v-model="menuItemData.path" placeholder="请输入菜单路径" />
            </el-form-item>
          </el-col>
          <el-col :lg="12" :xs="24">
            <el-form-item label="菜单排序">
              <el-input-number v-model.number="menuItemData.sort" :min="1" :max="999" controls-position="right" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="上级类目">
          <treeselect v-model="menuItemData.pid" :options="treeData" placeholder="请选择上级类目" />
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: right;">
        <el-button type="text" size="small" @click="dialogShowStatus=false">
          取消
        </el-button>
        <el-button type="primary" size="small">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import data from './data.json'
import treeData from './treedata.json'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'Menu',
  components: {
    Treeselect
  },
  data: () => ({
    keyword: '',
    loading: false, // 加载菜单
    delLoading: false, // 菜单删除加载
    dialogShowStatus: false, // 菜单新增对话框弹出
    isAdd: true, // 是否是新增
    data: [],
    menuItemData: { // 新增菜单数据
      name: '',
      path: '',
      icon: '',
      sort: 1,
      component: '', // 组件路径
      pid: null // 父级id
    },
    treeData: [],
    rules: {
      name: [{ required: true, message: '请输入菜单名称' }]
    }
  }),
  mounted() {
    this.data = data.content
    this.treeData = treeData
  },
  methods: {
    addMenu() {
      this.dialogShowStatus = true
    },
    resetDialog(done) {
      this.menuItemData = { // 新增菜单数据
        name: '',
        path: '',
        icon: '',
        sort: 1,
        component: '', // 组件路径
        pid: null // 父级id
      }
      this.$refs['menuDiaolog'].resetFields()
      this.isAdd = true
      done()
    },
    edit(row) { // 编辑菜单
      console.log(row)
      const { name, path, icon, sort, component, pid } = row
      this.menuItemData = { name, path, icon, sort, component, pid: pid === 0 ? null : pid }
      this.isAdd = false
      this.dialogShowStatus = true
    },
    subDelete(id) {
      console.log(id)
    },
    doClose() {
      document.body.click()
    },
    doClick(e) {
      // console.log(e)
      console.log(this.$refs)
    }
  }
}
</script>
<style lang="scss">
.menu-dialog .el-form label {
  font-weight: 700;
}
</style>
