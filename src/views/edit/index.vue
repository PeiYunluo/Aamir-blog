<!--
<template>

  <div class="app-container">
    <h2>what's this</h2>
    <editor/>
  </div>
</template>

<script>
  //import { Editor } from '@toast-ui/vue-editor';
  import {Editor} from  "../../components/tui-editor/"
  export default {
    name: "index",
    components: {
      'editor': Editor
    },
    data() {
      return {
      };
    },
  }
</script>
<style scoped>
</style>
-->
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
                   :height="600" theme="light"
                   initialValue="Hello Aamir"
                   v-model="PostSaveParam.originalContent"/>
    </el-form>
    <el-button type="primary" @click="onSubmit">Create</el-button>
    <el-button @click="onCancel">Cancel</el-button>
    <el-button @click="OnSave"
               style="width:10%;margin-bottom:30px;">保存
    </el-button>
  </div>

</template>

<script>
  import {MarkdownPro} from 'vue-meditor'
  import {creatpost, getPostbyid} from '@/api/post'
  import {getAlltags} from '@/api/tag'
  import {getAllcategoies} from '@/api/category'

  export default {
    name: "markdown",
    components: {
      MarkdownPro
    },
    props: {},
    data() {
      return {
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

      this.inittags();
      this.initcategories();
      this.initpost();
      //this.initpost
    },
    watch: {
      '$route': 'getParams'
    },
    methods: {
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
          //console.log(reponse);
          //console.log(reponse.data.data[0]);
          for (let i = 0; i < reponse.data.data.length; i++) {
            //console.log(reponse.data.data[i].id)
            //console.log(reponse.data.data[i].name);
            //console.log(vm.options1);
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
          //console.log(reponse);
          //console.log(reponse.data.data[0]);
          for (let i = 0; i < reponse.data.data.length; i++) {
            //console.log(reponse.data.data[i].id)
            //console.log(reponse.data.data[i].categroyname);
            //console.log(vm.options2);
            vm.options2[i] = ({value: reponse.data.data[i].id, label: reponse.data.data[i].categroyname});
            //console.log(vm.options2);
            //强制重新渲染
            this.$forceUpdate();
          }
          console.log(vm.options2);
        })
      },
      getParams() {
        this.PostSaveParam.id = this.$route.query.id
        //console.log(this.PostSaveParam.id);
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
            console.log(vm.PostSaveParam);
          })
        }

      }
    },

  }
</script>
