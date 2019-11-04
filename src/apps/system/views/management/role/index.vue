<template>
  <div class="role-page">
    <el-form size="mini" inline>
      <el-form-item label="角色名称">
        <el-input v-model="keyword" placeholder="角色查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary">搜索</el-button>
        <el-button icon="el-icon-plus" type="success" @click="addRole">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="data" size="small">
      <el-table-column label="名称" prop="name" />
      <el-table-column label="数据权限" prop="dataScope"/>
      <el-table-column label="角色级别" prop="roleLevel"/>
      <el-table-column label="描述" prop="remark"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" style="margin-right: 5px;" @click="edit(scope.row)" />
          <el-popover
            placement="top"
            width="180"
          >
            <p>确定删除角色吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="doClose">
                取消
              </el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">
                确定
              </el-button>
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" />
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      :current-page="page + 1"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
    <add-role ref="roleAdd"/>
  </div>
</template>
<script>
import data from './roledata.json'
import AddRole from './form'
export default {
  name: 'roleManage',
  components: {
    AddRole
  },
  data: () => ({
    keyword: '',
    total: 1,
    page: 1,
    loading: false,
    delLoading: false,
    data: data.content
  }),
  methods: {
    addRole() {
      this.$refs.roleAdd.showSelf()
    },
    doClose() {
      document.body.click()
    },
    subDelete() {},
    edit() {},
    sizeChange() {},
    pageChange() {}
  },
  mounted() {
    console.log(data)
  }
}
</script>
