<template>
  <div class="dashboard-container">
    <h2 align="center">Hello Aamir</h2>
    <panel-group></panel-group>
    <el-divider></el-divider>
    <span>请确保相关设置已经配置完成：</span>

    <el-divider></el-divider>
    <span>Email：</span>
    <el-tooltip :content="'Switch value: ' + aamirEmailOption.configvalue" placement="top">
      <el-switch
        v-model="aamirEmailOption.configvalue"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-value="TRUE"
        inactive-value="FALSE"
        @change="handleemail">
      </el-switch>
    </el-tooltip>

    <el-divider></el-divider>

    <span>Qiniu Upload：</span>
    <el-tooltip :content="'Switch value: ' + aamirUploadOption.configvalue" placement="top">
      <el-switch
        v-model="aamirUploadOption.configvalue"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-value="TRUE"
        inactive-value="FALSE"
        @change="handleupload">
      </el-switch>
    </el-tooltip>
    <el-divider></el-divider>
    <span>Notification：</span>
    <el-tooltip :content="'Switch value: ' + aamirNotifiOption.configvalue" placement="top">
      <el-switch
        v-model="aamirNotifiOption.configvalue"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-value="TRUE"
        inactive-value="FALSE"
        @change="handlenotification">
      </el-switch>
    </el-tooltip>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
    <!--
        <el-row style="margin-top:30px;background:#fff;padding:15px 15px 0;">
          <line-chart :chart-data="lineChartData"></line-chart>
        </el-row>-->

    <!--  <el-upload action="https://upload.qbox.me" :data="dataObj" drag :multiple="true" :before-upload="beforeUpload"
                 :on-success="uploadSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>-->

    <!--    <todo-list style="margin:0 8px;"></todo-list>-->
  </div>
</template>

<script>
  import TodoList from './components/TodoList'
  import {mapGetters} from 'vuex'
  import {getToken} from '@/api/qiniu'
  import PanelGroup from './components/PanelGroup'
  import LineChart from './components/LineChart'
  import {findOption, switches} from "@/api/option";


  const lineChartData = {
    newVisitis: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    messages: {
      expectedData: [200, 192, 120, 144, 160, 130, 140],
      actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    purchases: {
      expectedData: [80, 100, 121, 104, 105, 90, 100],
      actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
      expectedData: [130, 140, 141, 142, 145, 150, 160],
      actualData: [120, 82, 91, 154, 162, 140, 130]
    }
  }

  export default {
    name: 'Dashboard',
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    components: {
      TodoList,
      PanelGroup,
      LineChart
    },

    created() {
      this.initOption()

    },
    data() {
      return {
        dialogVisible: false,
        aamirEmailOption: {
          configfield: "QQMail",
          configname: "email",
          configvalue: undefined
        },
        aamirNotifiOption: {
          configfield: "WeChattest",
          configname: "notification",
          configvalue: undefined
        },
        aamirUploadOption: {
          configfield: "Qiniu",
          configname: "upload",
          configvalue: undefined
        },
        currentDate: new Date(),
        dataObj: {token: '', key: ''},
        image_uri: [],
        fileList: [],
        lineChartData: lineChartData.newVisitis
      }
    },
    methods: {
      handleSetLineChartData(type) {
        this.lineChartData = lineChartData[type]
      },
      beforeUpload(file) {
        //console.log("+++++++++++++++++++++++++++++" + file.name);
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
        // console.log(response);
        // console.log(file.name);
        //console.log(fileList);
      },
      initOption() {
        let vm = this
        findOption(this.aamirEmailOption).then(response => {
          console.log(response);
          vm.aamirEmailOption.configvalue = response.data.data.configvalue
        })
        findOption(this.aamirNotifiOption).then(response => {
          vm.aamirNotifiOption.configvalue = response.data.data.configvalue
        })
        findOption(this.aamirUploadOption).then(response => {
          vm.aamirUploadOption.configvalue = response.data.data.configvalue
        })
      },
      handleemail() {
        let vm = this
        switches(this.aamirEmailOption).then(response => {
          console.log(response);
        })
      },
      handleupload() {
        let vm = this
        switches(this.aamirUploadOption).then(response => {
          console.log(response);
        })
      },
      handlenotification() {
        let vm = this
        switches(this.aamirNotifiOption).then(response => {
          console.log(response);
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 30px;
    background-color: rgb(240, 242, 245);

    .chart-wrapper {
      background: #fff;
      padding: 15px 15px 0;
    }
  }
</style>
