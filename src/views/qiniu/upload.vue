<template>
  <el-upload action="https://upload.qiniup.com" :data="dataObj" drag :multiple="true" :before-upload="beforeUpload">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  </el-upload>
</template>


<script>
import { getToken } from '@/api/qiniu'
// 获取七牛token 后端通过Access Key,Secret Key,bucket等生成token
// 七牛官方sdk https://developer.qiniu.com/sdk#official-sdk


export default{
  data() {
    return {
      dataObj: { token: '', key: '' },
      image_uri: [],
      fileList: []
    }
  },
  created() {
    this.beforeUpload()
  },
  methods: {
    beforeUpload() {
      const vm = this
      console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        getToken().then(response => {
          console.log(response);
          vm.dataObj.token = response.data.key
          vm.dataObj.key = response.data.token
          console.log(vm.dataObj.token);
          resolve(true)
        })

    }
  },

}
</script>
