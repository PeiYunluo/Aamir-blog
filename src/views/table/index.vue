<template>
  <div class="app-container">
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
   <el-card v-for="item in urllist">
     <img :src="src+item+'?imageView2/1/w/320/h/180'" />
   </el-card>
  </div>
</template>

<script>
  import {getAllphotos} from '@/api/qiniu'

  export default {

    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,

        //TODO:从后端获取该链接
        src: "http://q6yuglcls.bkt.clouddn.com/",
        urllist: []
      }
    },
    created() {
      this.initphotos()
    },
    methods: {
      initphotos() {
        let vm = this
        getAllphotos().then(response => {
          //console.log(response);
          vm.urllist = response.data.data
          console.log(vm.urllist)
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  }
</script>
<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
