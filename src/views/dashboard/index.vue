<template>
  <div class="dashboard-container">
    <!--    <div class="dashboard-text">name: {{ name }}</div>-->
    <el-upload action="https://upload.qbox.me" :data="dataObj" drag :multiple="true" :before-upload="beforeUpload"
               :on-success="uploadSuccess">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>

    <todo-list style="margin:0 8px;"></todo-list>
  </div>
</template>

<script>
  import TodoList from './components/TodoList'
  import {mapGetters} from 'vuex'
  import {getToken} from '@/api/qiniu'


  export default {
    name: 'Dashboard',
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    components: {
      TodoList,
    },

    data() {
      return {
        currentDate: new Date(),

        dataObj: {token: '', key: ''},
        image_uri: [],
        fileList: []
      }
    },
    methods: {
      beforeUpload(file) {
        console.log("+++++++++++++++++++++++++++++" + file.name);
        const _self = this
        return new Promise((resolve, reject) => {
          getToken().then(response => {
            console.log(response.data.data);
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
        console.log(response);
        console.log(file.name);
        console.log(fileList);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }

</style>
