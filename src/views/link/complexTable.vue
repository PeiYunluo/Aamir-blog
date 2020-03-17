<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="标签"
                @input="change($event)" v-model="listQuery.name"/>

      <!-- <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.importance" placeholder="重要性">
         <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
         </el-option>
       </el-select>-->

      <!--<el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" placeholder="类型">
        <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
        </el-option>
      </el-select>-->

      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort"
                 placeholder="排序">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="el-icon-edit">添加
      </el-button>
      <!--      <el-button class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>-->
      <el-button class="filter-item" type="primary" icon="el-icon-download">导出</el-button>
      <el-checkbox class="filter-item" style='margin-left:15px;' v-model="isstripe">显示斑马条纹</el-checkbox>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
              highlight-current-row style="width: 100%" :stripe=isstripe>

      <el-table-column align="center" label="序号" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="类型" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column width="180px" align="center" label="时间">
         <template slot-scope="scope">
           <span>{{scope.row.updateTime}}</span>
         </template>
       </el-table-column>-->

      <el-table-column min-width="100px" label="名字">
        <template slot-scope="scope">

          <span class="link-type">{{scope.row.name}}</span>
          <el-button type="primary" size="small" style="margin-left:50px;" @click="handleUpdate(scope.row)"> 编辑
            <!--            -->
          </el-button>
          <!--<el-tag>{{'CN' | typeFilter}}</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column align="center" label="Url" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.url}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="描述" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.description}}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="删除">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.deleted"
            active-text="已删除"
            inactive-text="未删除"
            active-color="#409EFF"
            inactive-color="#67C23A"
            @change="handledeletetag(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>


      <el-table-column align="center" label="操作">
        <template slot-scope="scope">

          <el-button v-if="scope.row.deleted!=true" size="small" type="danger">删除接口
            <!-- @click="handleModifyStatus(scope.row,'deleted')"-->
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[1,2,5]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <!--         <el-form-item label="类型">
                   <el-select class="filter-item" v-model="temp.type" placeholder="请选择">
                     <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">
                     </el-option>
                   </el-select>
                 </el-form-item>

                 <el-form-item label="状态">
                   <el-select class="filter-item" v-model="temp.status" placeholder="请选择">
                     <el-option v-for="item in  statusOptions" :key="item" :label="item" :value="item">
                     </el-option>
                   </el-select>
                 </el-form-item>

                 <el-form-item label="时间">
                   <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="选择日期时间">
                   </el-date-picker>
                 </el-form-item>-->
        <el-form-item label="标签名">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="URL">
          <el-input v-model="temp.url"></el-input>
        </el-form-item>
        <el-form-item label="logo">
          <el-input v-model="temp.logo"></el-input>
          <img src="temp.logo"/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="temp.description"></el-input>
        </el-form-item>
        <!-- <el-form-item label="重要性">
          <el-rate style="margin-top:8px;" v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max='3'></el-rate>
        </el-form-item>-->
        <!--
        <el-form-item label="点评">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="temp.remark">
          </el-input>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

    <!--  <el-dialog title="阅读数统计" :visible.sync="dialogPvVisible">
        <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
          <el-table-column prop="key" label="渠道"> </el-table-column>
          <el-table-column prop="pv" label="pv"> </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogPvVisible = false">确 定</el-button>
        </span>
      </el-dialog>-->

  </div>
</template>

<script>
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import {getAll, editLink, addLink, deleteLink} from '@/api/link'

  export default {
    name: 'complexTable',
    directives: {
      waves
    },
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 2,
          sort: '+id',
        },
        temp: {
          id: undefined,
          name: '',
          url: '',
          logo: '',
          description: ''
        },
        sortOptions: [{label: '按ID升序列', key: '+id'}, {label: '按ID降序', key: '-id'}],
        statusOptions: ['published', 'draft', 'deleted'],
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        dialogPvVisible: false,
        pvData: [],
        isstripe: false,
        tableKey: 0
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      },
      typeFilter(type) {
        return calendarTypeKeyValue[type]
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        getAll(this.listQuery).then(response => {
          this.list = response.data.data
          console.log(this.total);
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      /*timeFilter(time) {
        if (!time[0]) {
          this.listQuery.start = undefined
          this.listQuery.end = undefined
          return
        }
        this.listQuery.start = parseInt(+time[0] / 1000)
        this.listQuery.end = parseInt((+time[1] + 3600 * 1000 * 24) / 1000)
      },*/
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
      },
      handleDelete(row) {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      },
      handledeletetag(row) {
        console.log(row);
        deleteLink(row).then(response => {
          if (response.status === 200) {
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
          }

        })
      },
      create() {
        console.log(this.temp);
        addLink(this.temp).then(response => {
          console.log(response);
          if (response.status === 200) {
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          }
        })

        this.dialogFormVisible = false
      },
      update() {
        editLink(this.temp).then(response => {
          console.log(response);
          if (response.status === 200) {
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          }
        })
        for (const v of this.list) {
          if (v.id === this.temp.id) {
            const index = this.list.indexOf(v)
            this.list.splice(index, 1, this.temp)
            break
          }
        }
        this.dialogFormVisible = false

      },
      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 0,
          remark: '',
          timestamp: 0,
          title: '',
          status: 'published',
          type: ''
        }
      },
      /*handleFetchPv(pv) {
        fetchPv(pv).then(response => {
          this.pvData = response.data.pvData
          this.dialogPvVisible = true
        })
      },*/
      change(e) {
        this.$forceUpdate()
      },
      /*   handleDownload() {
           require.ensure([], () => {
             const { export_json_to_excel } = require('vendor/Export2Excel')
             const tHeader = ['时间', '地区', '类型', '标题', '重要性']
             const filterVal = ['timestamp', 'province', 'type', 'title', 'importance']
             const data = this.formatJson(filterVal, this.list)
             export_json_to_excel(tHeader, data, 'table数据')
           })
         },*/
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      }
    }
  }
</script>
