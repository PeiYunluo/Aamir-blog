<template>
  <div class="app-container">
    <!--TODO:后端获取项目地址-->


    <div>

    </div>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <div class="post-lists">
      <div class="post-lists-body">
        <div class="post-title"># 七牛云</div>

        <div class="post-list-item" v-for="item in urllist" @click="PicturePreviewQiniu(item)">
          <div class="post-list-item-container">
            <div class="item-thumb bg-deepgrey"
                 :style="{backgroundImage:'url('+responseurl.configvalue+item+')'}"></div>
            <a>
              <div class="item-desc"><p>{{responseurl.configvalue+item}}</p>
              </div>
            </a>
            <div class="item-slant reverse-slant bg-deepgrey"></div>
            <div class="item-slant"></div>
            <div class="item-label">
              <div class="item-title"><a>图片名字</a></div>
            </div>
          </div>
        </div>
        <hr>
        <div class="post-title"># 本地</div>
        <el-upload
          action="http://localhost:8090/photo/uploadFile"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <div class="post-list-item" v-for="item in list" @click="PicturePreview(item)">
          <div class="post-list-item-container">
            <div class="item-thumb bg-deepgrey"
                 :style="{backgroundImage:'url('+responselocalurl.configvalue+item+')'}"></div>
            <a>
              <div class="item-desc">
                <p>{{responselocalurl.configvalue+item}}</p>
              </div>
            </a>
            <div class="item-slant reverse-slant bg-deepgrey"></div>
            <div class="item-slant"></div>
            <div class="item-label">
              <div class="item-title"><a>图片名字</a></div>
            </div>
          </div>
        </div>
        <hr>
        <div class="post-title"># 阿里云</div>
        <el-upload action="http://localhost:8090/photo/uploadAliOss"
                   list-type="picture-card"
                   :on-preview="handlePictureCardPreview"
                   :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <div class="post-list-item" v-for="item in AliOssurllist" @click="PicturePreview(item)">
          <div class="post-list-item-container">
            <div class="item-thumb bg-deepgrey"
                 :style="{backgroundImage:'url('+responseAliOssurl.configvalue+item+')'}"></div>
            <a>
              <div class="item-desc">
                <p>{{responseAliOssurl.configvalue+item}}</p>
              </div>
            </a>
            <div class="item-slant reverse-slant bg-deepgrey"></div>
            <div class="item-slant"></div>
            <div class="item-label">
              <div class="item-title"><a>图片名字</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
  import {getAllphotos, uploadFile, getAlllocalphotos,getAllAliOssphotos} from '@/api/qiniu'
  import {findOption} from '@/api/option'

  export default {

    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        option: {
          configfield: "Qiniu",
          configname: "url",
          configvalue: undefined
        },
        optionlocal: {
          configfield: "Local",
          configname: "BaseURL",
          configvalue: undefined
        },
        optionAliOss: {
          configfield: "AliOss",
          configname: "url",
          configvalue: undefined
        },
        responseurl: undefined,
        responselocalurl: undefined,
        responseAliOssurl: undefined,


        //TODO:从后端获取该链接
        src: "http://q6yuglcls.bkt.clouddn.com/",
        urllist: [],
        AliOssurllist:[],
        list: [],
      }
    },
    created() {
      this.initQiniuUrl()
      this.initLocalUrl()
      this.initAliOssUrl()
      this.initphotos()
      this.initlocalphotos()
      this.initAliOssphotos()
    },
    methods: {
      initphotos() {
        let vm = this
        getAllphotos().then(response => {
          vm.urllist = response.data.data
          console.log(vm.urllist);
        })
      },
      initAliOssphotos() {
        let vm = this
        getAllAliOssphotos().then(response => {
          vm.AliOssurllist = response.data.data
          console.log(vm.urllist);
        })
      },
      handleCopy(text, event) {
        clip(text, event)
      },
      initlocalphotos() {
        let vm = this
        getAlllocalphotos().then(response => {
          vm.list = response.data.data
          console.log(vm.list);
        })
      },
      initQiniuUrl() {
        let vm = this
        findOption(vm.option).then(response => {
          vm.responseurl = response.data.data
          console.log(vm.responseurl);
        })
      },
      initAliOssUrl() {
        let vm = this
        findOption(vm.optionAliOss).then(response => {
          vm.responseAliOssurl = response.data.data
          console.log(vm.responseAliOssurl);
        })
      },
      initLocalUrl() {
        let vm = this
        findOption(vm.optionlocal).then(response => {
          vm.responselocalurl = response.data.data
          console.log(vm.responselocalurl);
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        console.log(this.dialogImageUrl);
        this.dialogVisible = true;
      },
      PicturePreview(item){
        this.dialogImageUrl = this.responselocalurl.configvalue+item
        this.dialogVisible = true;
      },
      PicturePreviewQiniu(item){
        this.dialogImageUrl = this.responseurl.configvalue+item
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
