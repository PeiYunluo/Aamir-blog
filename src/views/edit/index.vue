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
    <el-input placeholder="请输入内容" v-model="PostSaveParam.categoriesid">
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
      <el-lable> 标签 ：</el-lable>
      <el-select v-model="tags" multiple placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-lable> 分类 ：</el-lable>
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
      <el-form-item label="单选">
        <el-select placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai"/>
          <el-option label="Zone two" value="beijing"/>
        </el-select>
      </el-form-item>
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
  import {creatpost} from '@/api/post'
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
        radio:0,
        value: 'hello aamir',
        defaultData: "preview",
        options1: [],
        options2: [],
        tags: [],
        categories: [],
        PostSaveParam: {
          id: '',
          title: '',
          status: 0,
          url: '',
          originalContent: '',
          summary: '',
          disallowComment: false,
          deleted: false,
          tagsid: [1],
          categoriesid: [1],
        }
      }
    },
    created() {
      this.inittags();
      this.initcategories();
      //this.initpost
    }
    ,
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
          console.log(reponse);
          console.log(reponse.data.data[0]);
          for (let i = 0; i < reponse.data.data.length; i++) {
            console.log(reponse.data.data[i].id)
            console.log(reponse.data.data[i].name);
            console.log(vm.options1);
            vm.options1[i] = ({value: reponse.data.data[i].id, label: reponse.data.data[i].name});
            console.log(vm.options1);
            //强制重新渲染
            this.$forceUpdate();
          }
        })
      },
      initcategories() {
        let vm = this
        getAllcategoies().then(reponse => {
          console.log(reponse);
          console.log(reponse.data.data[0]);
          for (let i = 0; i < reponse.data.data.length; i++) {
            console.log(reponse.data.data[i].id)
            console.log(reponse.data.data[i].categroyname);
            console.log(vm.options2);
            vm.options2[i] = ({value: reponse.data.data[i].id, label: reponse.data.data[i].categroyname});
            console.log(vm.options2);
            //强制重新渲染
            this.$forceUpdate();
          }
        })
      },
    }
  }
</script>
