<template>
  <div class="app-container">
    <el-input placeholder="请输入内容" v-model="PostSaveParam.summary">
      <template slot="prepend">前言</template>
    </el-input>
    <hr>
    <el-form ref="form" :model="PostSaveParam">
      <el-form-item label="文章标题" label-width="70px" style="width: 20%;">
        <el-input v-model="PostSaveParam.title"/>
        <hr>
      </el-form-item>
      <el-input placeholder="请输入内容" v-model="PostSaveParam.url">
        <template slot="prepend">自定义路径</template>
      </el-input>
      <hr>
      <span> 标签:</span>
      <el-select v-model="tags" multiple placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span> 分类:</span>
      <el-select v-model="categories" multiple placeholder="请选择">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-radio-group v-model="radio">
        <el-radio :label="0">草稿</el-radio>
        <el-radio :label="1">发布</el-radio>
        <el-radio :label="2">备选项</el-radio>
      </el-radio-group>
      <hr>
      <el-form-item label="不允许评论">
        <el-switch v-model="PostSaveParam.disallowComment"/>
      </el-form-item>
      <MarkdownPro @on-save="handleOnSave"
                   :height="800" theme="light"
                    value="Hello Aamir"
                   :bordered="false"
                   :toolbars="{importmd:false}"
                   v-model="PostSaveParam.originalContent"/>
    </el-form>
    <el-button type="primary" @click="onSubmit">Create</el-button>
    <el-button @click="onCancel">Cancel</el-button>
    <el-button @click="OnSave"
               style="width:10%;margin-bottom:30px;">保存
    </el-button>

    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false">
      <h3 align="center">图片上传</h3>
      <div>
        <el-upload action="https://upload.qbox.me" :data="dataObj" drag :multiple="true" :before-upload="beforeUpload" align="center"
                   :on-success="uploadSuccess">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>

      <el-tabs>
        <el-tab-pane label="Copy and Paste" name="directly">
          <el-input v-model="url.configvalue+dataObj.key" placeholder="请输入内容" style='width:200px;'></el-input>
          <el-button type="primary" icon="document" @click='handleCopy(url.configvalue+dataObj.key,$event)'>copy</el-button>
        </el-tab-pane>
        <img v-show="dataObj.key!=''" :src="url.configvalue+dataObj.key+'?imageView2/1/w/320/h/180'" />
      </el-tabs>

      <h3 align="center">Md文章上传</h3>
      <div>
        <el-upload action="http://localhost:8090/photo/uploadmarkdown"  drag :multiple="true" :before-upload="beforeUpload" align="center"
                   :on-success="uploadSuccess">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
    </el-drawer>
    <el-button @click="drawer = true" type="primary" style="margin-left: 30px;">
      点我打开
    </el-button>
  </div>
</template>

<script>
  import {MarkdownPro} from 'vue-meditor'
  import {creatpost, getPostbyid} from '@/api/post'
  import {getAlltags} from '@/api/tag'
  import {getAllcategoies} from '@/api/category'
  import {getToken} from '@/api/qiniu'
  import clip from '@/utils/clipboard' // use clipboard directly
  import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
  import {findOption} from '@/api/option'



  export default {
    name: "markdown",
    components: {
      MarkdownPro
    },
    directives: {
      clipboard
    },
    props: {},
    data() {
      return {
        //

        //上传
        url:undefined,
        dataObj: {token: '', key: ''},
        image_uri: [],
        fileList: [],
        //抽屉
        drawer: false,
        //copy
        option:{
          configfield:"Qiniu",
          configname:"url",
          configvalue:undefined
        },

        radio: 0,
        value: undefined,
        defaultData: "preview",
        options1: [],
        options2: [],
        tags: [],
        categories: [],
        PostSaveParam: {
          id: undefined,
          title: '',
          status: 0,
          url: '',
          originalContent: '',
          summary: '',
          disallowComment: false,
          deleted: false,
          tagsid: [],
          categoriesid: [],
        }
      }
    },
    created() {
      this.getParams();
      this.initQiniuUrl();
      this.inittags();
      this.initcategories();
      this.initpost();
      //this.initpost
    },
    watch: {
      '$route': 'getParams'
    },
    methods: {
      initQiniuUrl(){
        let vm = this
        findOption(vm.option).then(response=>{
          vm.url = response.data.data
        })
      },
      handleOnSave({value, theme}) {
        console.log(value, theme);
      },
      OnSave() {
        var vm = this.value
        console.log(this.tags);
        console.log(vm);
      },
      onSubmit() {
        this.$message('submit!')
        this.PostSaveParam.status = this.radio;
        this.PostSaveParam.tagsid = this.tags;
        this.PostSaveParam.categoriesid = this.categories;
        creatpost(this.PostSaveParam).then(response => {
          console.log(response);
          if (response.data.resultCode == 200) {
            alert("创建文章成功！")
          }
        })
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      },
      inittags() {
        let vm = this
        getAlltags().then(reponse => {
          for (let i = 0; i < reponse.data.data.length; i++) {
            vm.options1[i] = ({value: reponse.data.data[i].id, label: reponse.data.data[i].name});
            //console.log(vm.options1);
            //强制重新渲染
            this.$forceUpdate();
          }
          console.log(vm.options1);
        })
      },
      initcategories() {
        let vm = this
        getAllcategoies().then(reponse => {
          for (let i = 0; i < reponse.data.data.length; i++) {
            vm.options2[i] = ({value: reponse.data.data[i].id, label: reponse.data.data[i].categroyname});
            //console.log(vm.options2);
            //强制重新渲染
            this.$forceUpdate();
          }
          //console.log(vm.options2);
        })
      },
      getParams() {
        this.PostSaveParam.id = this.$route.query.id
      },
      initpost() {
        let vm = this
        if (this.$route.query.id !== undefined) {
          getPostbyid({"id": this.$route.query.id}).then(response => {
            //console.log(response);
            vm.PostSaveParam.id = response.data.data.id
            vm.PostSaveParam.title = response.data.data.title
            vm.PostSaveParam.status = response.data.data.status
            vm.PostSaveParam.url = response.data.data.url
            vm.PostSaveParam.originalContent = response.data.data.originalContent
            vm.PostSaveParam.summary = response.data.data.summary
            vm.PostSaveParam.disallowComment = response.data.data.disallowComment
            vm.PostSaveParam.deleted = response.data.data.deleted
            vm.PostSaveParam.tagsid = response.data.data.tagsid
            vm.PostSaveParam.categoriesid = response.data.data.categoriesid
            vm.tags = response.data.data.tagsid
            vm.categories = response.data.data.categoriesid
            //console.log(vm.PostSaveParam);
          })
        }

      },
      beforeUpload(file) {
        console.log("+++++++++++++++++++++++++++++" + file.name);
        const _self = this
        return new Promise((resolve, reject) => {
          getToken().then(response => {
            //console.log(response.data.data);
            const key = response.data.data.key
            const token = response.data.data.token
            _self.dataObj.token = token
            _self.dataObj.key = key
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
      },
      uploadSuccess(response, file, fileList) {
        let vm =this
        vm.PostSaveParam.originalContent = response.data
        this.$message({
          message: '上传成功',
          type: 'success',
          duration: 1500
        })
/*        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        console.log(vm.PostSaveParam.originalContent);
        console.log(response.data);
        console.log(response);
        console.log(file.name);
        console.log(fileList);*/
      },
      handleCopy(text, event) {
        clip(text, event)
      },
      clipboardSuccess() {
        this.$message({
          message: '复制成功',
          type: 'success',
          duration: 1500
        })
      }
    },

  }
</script>
