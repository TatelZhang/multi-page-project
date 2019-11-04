<template>
  <div class="user-page">
    <el-form size="mini" inline>
      <el-form-item>
        <el-input placeholder="搜索用户" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="query.status" placeholder="状态" clearable style="width: 90px;">
          <el-option label="激活" :value="1" />
          <el-option label="锁定" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary">
          搜索
        </el-button>
        <el-button icon="el-icon-plus" type="success">
          新增
        </el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="data" size="small">
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column :show-overflow-tooltip="true" prop="email" label="邮箱" />
      <el-table-column label="部门 / 岗位">
        <template slot-scope="scope">
          <div>{{ scope.row.dept.name }} / {{ scope.row.job.name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enabled"
            active-color="#409EFF"
            inactive-color="#F56C6C"
            @change="changeEnabled(scope.row, scope.row.enabled,)"
          />
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="125" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" style="margin-right: 5px;" @click="edit(scope.row)" />
          <el-popover
            placement="top"
            width="180"
          >
            <p>确定删除本条数据吗？</p>
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
    <el-dialog :visible.sync="dialogShowStatus" :title="isAdd ? '新增用户' : '编辑用户'" width="600px" class="system-dialog thin-dialog" :before-close="resetDialog">
      <el-form ref="userDiaolog" size="mini" label-width="80px" :model="userItemData" :rules="rules" style="margin: 0 auto;" inline>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="userItemData.name" placeholder="" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="userItemData.status" :label="0">
            激活
          </el-radio>
          <el-radio v-model="userItemData.status" :label="1">
            禁用
          </el-radio>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="userItemData.phone" placeholder="" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userItemData.email" />
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="userItemData.role" />
        </el-form-item>

        <el-form-item label="角色">
          <treeselect v-model="userItemData.pid" :options="[]" placeholder="请选择上级类目" style="width: 420px;" />
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
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { parseTime } from '@/utils/index'
export default {
  name: 'UserManage',
  components: {
    Treeselect
  },
  data: () => ({
    loading: false,
    delLoading: false,
    dialogShowStatus: true,
    isAdd: true,
    query: {
      status: 0
    },
    data: [],
    total: 1,
    page: 1,
    rules: {},
    userItemData: {
      status: 0
    }
  }),
  mounted() {
    this.data = data.content
  },
  methods: {
    parseTime,
    changeEnabled(data, val) {
      this.$confirm('此操作将 "' + this.dict.label.user_status[val] + '" ' + data.username + ', 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        edit(data).then(res => {
          this.$notify({
            title: this.dict.label.user_status[val] + '成功',
            type: 'success',
            duration: 2500
          })
        }).catch(err => {
          data.enabled = !data.enabled
          console.log(err.response.data.message)
        })
      }).catch(() => {
        data.enabled = !data.enabled
      })
    },
    doClose() {
      document.body.click()
    },
    edit() {

    },
    subDelete() {

    },
    sizeChange() {},
    pageChange() {},
    resetDialog(done) {
      done()
    }
  }
}
</script>
<style lang="scss">
.user-dialog .el-form label {
  font-weight: 700;
}
</style>
