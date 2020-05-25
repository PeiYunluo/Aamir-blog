<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
<!--      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="标签"
                @input="change($event)" v-model="listQuery.name"/>
      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort"
                 placeholder="排序">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>-->
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="el-icon-edit">添加
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-download">导出</el-button>
      <el-checkbox class="filter-item" style='margin-left:15px;' v-model="isstripe">显示斑马条纹</el-checkbox>
      <el-button class="filter-item" style='margin-left:15px;' @click="HandleQuerydeleted">未删除</el-button>
      <el-button class="filter-item" style='margin-left:15px;'>待审核</el-button>
      <el-button class="filter-item" style='margin-left:15px;' @click="clear">通知项目</el-button>

    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
              highlight-current-row style="width: 100%" :stripe=isstripe>

      <el-table-column align="center" label="发布者" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" label="url">
        <template slot-scope="scope">
          <span>{{scope.row.url}}</span>
        </template>
      </el-table-column>

      <el-table-column width="220" label="email">
        <template slot-scope="scope">
          <span>{{scope.row.email}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200" label="内容">
        <template slot-scope="scope">
          <div>
            <span class="link-type">{{scope.row.content}}</span>
          </div>
          <!--<el-tag>{{'CN' | typeFilter}}</el-tag>-->
        </template>
      </el-table-column>

      <el-table-column min-width="75" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==0" @click="HandleStatus(scope.row)">审核</el-button>
          <el-button type="primary" v-if="scope.row.status==1" @click="HandleStatus(scope.row)">取消审核</el-button>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="删除">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.deleted"
            active-text="已删除"
            inactive-text="未删除"
            active-color="#409EFF"
            inactive-color="#67C23A"
            @change="handledeletePost(scope.row)">
          </el-switch>
        </template>
      </el-table-column>


      <el-table-column width="110" align="center" label="文章">
        <template slot-scope="scope">
          <span style='color:red;'> {{scope.row.postId}} {{scope.row.partentId}}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status!=0" size="small" type="danger" @click="handlestatusswitch(scope.row)">草稿接口
          </el-button>
          <el-button v-if="scope.row.status!=1" size="small" type="success" @click="handlestatusswitch(scope.row)">发布接口
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[1,2,5,10,20]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label="文章标题">
          <el-input v-model="temp.title"></el-input>
        </el-form-item>
        <el-form-item label="url">
          <el-input v-model="temp.url"></el-input>
        </el-form-item>
        <el-form-item label="缩略图">
          <el-input v-model="temp.thumbnailurl"></el-input>
          <el-image :src="temp.thumbnailurl+'?imageView2/1/w/40/h/40'"/>
        </el-form-item>
        <el-form-item label="概述">
          <el-input v-model="temp.summary"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import waves from '@/directive/waves/index.js' // 水波纹指令

  import {
    getAll,
    getCommentsbydeleted,
    getCommentsbystatus,
    getCommentsbynotification,
    addComment,
    switchnotificationbyid,
    switchstatus,
    deletecomment,
    clearNotification
  } from '@/api/comment'


  export default {
    name: 'complexTable',
    directives: {
      waves
    },
    data() {
      return {
        options1: [],
        options2: [],
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          sort: '+id',
          status:undefined,
          deleted:false,
          allowNotification:undefined
        },
        temp: {
          id: undefined,
          title: '',
          url: '',
          thumbnailurl: '',
          summary: '',
          tagsid: [],
          categoriesid: []
          //status:undefined
        },
        sortOptions: [{label: '按ID升序列', key: '+id'}, {label: '按ID降序', key: '-id'}],
        statusOptions: ['草稿', '发布'],
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
          published: 1,
          draft: 0,
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
        this.listLoading = !this.listLoading
        getAll(this.listQuery).then(response => {
          console.log(response);
          this.list = response.data.data
          console.log(this.total);
          this.listLoading = false
        })
      },

      HandleQuerydeleted(){
        this.listLoading = true
        this.listQuery.deleted = !this.listQuery.deleted
        getCommentsbydeleted(this.listQuery).then(response => {
          console.log(response);
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
      handledeletePost(row) {
        console.log(row);
        deletecomment(row).then(response => {
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
      clear(){
        let vm =this
        clearNotification().then(response =>{
          if (response.data.resultCode == 200){
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      HandleStatus(row) {
        this.$forceUpdate()
        switchstatus(row).then(response => {
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
        this.dialogFormVisible = false
      },
      update() {
        console.log(this.temp);
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

      change(e) {
        this.$forceUpdate()
      },

      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
      photodetail(photourl) {
        console.log(photourl)
      }
    }
  }
</script>
