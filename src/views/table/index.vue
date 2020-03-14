<template>
  <div class="app-container">
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
