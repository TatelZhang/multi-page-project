<template>
  <div class="app-container">
    <el-form :inline="true" :model="dataForm" class="demo-form-inline" size="mini">
      <el-form-item label="名称">
        <el-input v-model="dataForm.name" size="mini" placeholder="菜单名称" clearable />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" size="mini" type="success" @click="getDataListSch">
          搜索
        </el-button>
        <el-button icon="el-icon-plus" size="mini" type="primary" @click="upateOrAdd">
          新增
        </el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="dataLoading" size="mini" border :data="dataList" :height="documentClientIFRMAE" style="width: 100%" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="name" label="名称" width="200" />
      <el-table-column prop="icon" label="图标" align="center" width="80px">
        <template slot-scope="scope">
          <i :class="scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="sort" label="排序" width="100" />
      <el-table-column align="center" prop="path" label="地址" min-width="100" />
      <el-table-column align="center" prop="component" label="路径" min-width="200" />
      <el-table-column align="center" prop="createTime" label="创建时间" width="150">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="upateOrAdd(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteDataList(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="ruleForm.id ? '编辑' : '新增'" :visible.sync="dialogVisible" width="40%" :before-close="handleClose" append-to-body :close-on-click-modal="false">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" size="mini">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="ruleForm.name" size="mini" style="width: 250px" placeholder="请输入菜单名称" clearable />
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-input v-model="ruleForm.icon" size="mini" style="width: 250px" placeholder="请输入菜单图标" clearable />
        </el-form-item>
        <el-form-item label="菜单排序">
          <el-input-number v-model="ruleForm.sort" controls-position="right" :min="1" style="width: 250px" />
        </el-form-item>
        <el-form-item label="链接地址">
          <el-input v-model="ruleForm.path" size="mini" style="width: 250px" placeholder="请输入链接地址" clearable />
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="ruleForm.component" size="mini" style="width: 250px" placeholder="请输入菜单路径" clearable />
        </el-form-item>
        <el-form-item label="上级菜单">
          <treeselect v-model="ruleForm.pid" :options="menus" placeholder="选择上级菜单" style="width: 250px" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button size="mini" type="primary" @click="postDataList('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMenus, getMenusTree, addMenus, editMenus, delMenus } from '@/api/system'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { parseTime } from '@/utils/index'

export default {
  name: 'Menu',
  components: { Treeselect },
  data() {
    return {
      documentClientIFRMAE: document.documentElement['clientHeight'] - 200,
      dataForm: {
        name: ''
      },
      dataLoading: false,
      dataList: [],
      menus: [],
      dialogVisible: false,
      ruleForm: {
        id: '',
        sort: 1,
        component: '',
        name: '',
        pid: 0,
        path: '',
        icon: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getDataList()
    // this.getDataListTree()
  },
  methods: {
    parseTime, // 时间格式化
    // 获取菜单列表
    getDataList() {
      this.dataLoading = true
      getMenus(this.dataForm).then(res => {
        window.console.log(res)
        this.dataList = res.content
        console.log(this.dataList)
        this.total = res.totalElements
        this.dataLoading = false
      }).catch(err => {
        window.console.log(err)
      })
    },
    // 获取树形结构
    getDataListTree() {
      getMenusTree().then(res => {
        console.log(res)
        const menu = { id: 0, label: '顶级类目', children: [] }
        menu.children = res
        this.menus.push(menu)
      })
    },
    // 新增或者修改
    upateOrAdd(res) {
      console.log(res)
      this.menus = []
      this.getDataListTree()
      if (res.id) {
        this.ruleForm.id = res.id
        this.ruleForm.sort = res.sort
        this.ruleForm.component = res.component
        this.ruleForm.path = res.path
        this.ruleForm.name = res.name
        this.ruleForm.pid = res.pid
        this.ruleForm.icon = res.icon
      }
      this.dialogVisible = true
    },
    // 新增或者修改提交
    postDataList(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          if (this.ruleForm.id) {
            console.log('编辑')
            editMenus(this.ruleForm).then(() => {
              this.$message.success('提交成功')
              this.handleClose()
            }).catch(err => {
              window.console.log(err)
            })
          } else {
            addMenus(this.ruleForm).then(() => {
              this.$message.success('提交成功')
              this.handleClose()
            }).catch(err => {
              window.console.log(err)
            })
          }
        } else {
          this.$message.error('内容没填写完整！')
          return false
        }
      })
    },
    // 删除数据
    deleteDataList(res) {
      console.log(res)
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMenus(res).then(res => {
          window.console.log(res)
          this.$message.success('删除成功')
          this.getDataList()
        }).catch(err => {
          window.console.log(err)
          this.$message.error('删除失败')
        })
      }).catch(() => {

      })
    },
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false
      this.getDataList()
      this.$refs['ruleForm'].resetFields()
      this.ruleForm = {
        id: '',
        sort: 1,
        component: '',
        name: '',
        pid: 0,
        path: '',
        icon: ''
      }
    },
    // 数据搜索
    getDataListSch() {
      this.getDataList()
    }

  }
}
</script>
