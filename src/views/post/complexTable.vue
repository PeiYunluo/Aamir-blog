<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="el-icon-edit">添加
      </el-button>
      <el-checkbox class="filter-item" style='margin-left:15px;' v-model="isstripe">显示斑马条纹</el-checkbox>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
              highlight-current-row style="width: 100%" :stripe=isstripe>
      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="url">
        <template slot-scope="scope">
          <span>{{scope.row.url}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="标题">
        <template slot-scope="scope">
          <div>
            <span class="link-type">{{scope.row.title}}</span>
            <el-link icon="el-icon-edit" @click="handleUpdate(scope.row)" style="color: #1482f0">编辑</el-link>
            <el-link style="color: #FEC171" @click="clickByRouter(scope.row.id)">查看<i class="el-icon-view el-icon--right" style="color: #FEC171"></i>
            </el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="概述">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.summary}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="25px" label="数量">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.visits}}</span>

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
            @change="handledeletePost(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column width="250px" align="center" label="评论开关">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.disallowComment"
            active-text="不允许评论"
            inactive-text="允许评论"
            active-color="#409EFF"
            inactive-color="#67C23A"
            @change="handlecommentswitch(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="缩略图">
        <template slot-scope="scope">
          <span style='color:red;'><img :src="scope.row.thumbnailurl+'?imageView2/1/w/40/h/40'" height="40" width="40"></span>
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
                     :page-size="listQuery.limit"
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

        <el-form-item>
          <span> 标签:</span>
          <el-select v-model="temp.tagsid" multiple placeholder="请选择">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item>
          <span> 分类:</span>
          <el-select v-model="temp.categoriesid" multiple placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
    getposts,
    deletePost,
    commentswitch,
    gettagsbyid,
    getcategoriesbyid,
    updatePost,
    statusswitch
  } from '@/api/post'
  import {getAlltags} from '@/api/tag'
  import {getAllcategoies} from '@/api/category'

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
      this.inittags();
      this.initcategories();
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        getposts(this.listQuery).then(response => {
          console.log(response);
          this.list = response.data.data
          //this.total = response.data.data.length
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
      handleUpdate(row) {
        this.temp = Object.assign({}, row)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        //是否在此时调用接口改变temp.tags的值
        let vm = this
        gettagsbyid(row).then(response => {
          vm.temp.tagsid = response.data.data;
          console.log(vm.temp.tagsid);
          vm.$forceUpdate()
        })
        getcategoriesbyid(row).then(response => {
          vm.temp.categoriesid = response.data.data
          vm.$forceUpdate()
        })
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
        deletePost(row).then(response => {
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
      handlecommentswitch(row) {
        console.log(row);
        commentswitch(row).then(response => {
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
      clickByRouter(id){
        this.$router.push({path:'/edit/index',query:{"id":id}})
      },
      handlestatusswitch(row) {
        statusswitch(row).then(response => {
          if (response.status === 200) {
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
          }
        })
        this.$forceUpdate()
      },
      inittags() {
        let vm = this
        getAlltags().then(reponse => {
          //console.log(reponse);
          //console.log(reponse.data.data[0]);
          for (let i = 0; i < reponse.data.data.length; i++) {
            //console.log(reponse.data.data[i].id)
            //console.log(reponse.data.data[i].name);
            //console.log(vm.options1);
            vm.options1[i] = ({value: reponse.data.data[i].id, label: reponse.data.data[i].name});
            //console.log(vm.options1);
            //
            //强制重新渲染
            this.$forceUpdate();
          }
        })
      },
      initcategories() {
        let vm = this
        getAllcategoies().then(reponse => {
          // console.log(reponse);
          //console.log(reponse.data.data[0]);
          for (let i = 0; i < reponse.data.data.length; i++) {
            //console.log(reponse.data.data[i].id)
            //console.log(reponse.data.data[i].categroyname);
            // console.log(vm.options2);
            vm.options2[i] = ({value: reponse.data.data[i].id, label: reponse.data.data[i].categroyname});
            //console.log(vm.options2);
            //强制重新渲染
            this.$forceUpdate();
          }
        })
      },
      create() {
        console.log(this.temp);
        this.dialogFormVisible = false
      },
      update() {
        //this.temp.timestamp = +this.temp.timestamp
        //console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        updatePost(this.temp).then(response => {
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
        console.log(this.temp);
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
      },
      photodetail(photourl){
        console.log(photourl)
      }
    }
  }
</script>
