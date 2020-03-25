<template>
  <div class="dashboard-container">
    <h2 align="center">Hello Aamir</h2>
    <panel-group></panel-group>

    <el-tooltip :content="'Switch value: ' + value" placement="top">
      <el-switch
        v-model="emailvalue"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-value="TURE"
        inactive-value="FALSE"
      @click="handleemail">
      </el-switch>
    </el-tooltip>


    <el-tooltip :content="'Switch value: ' + value" placement="top">
      <el-switch
        v-model="uploadvalue"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-value="TURE"
        inactive-value="FALSE"
        @click="handleupload">
      </el-switch>
    </el-tooltip>


    <el-tooltip :content="'Switch value: ' + value" placement="top">
      <el-switch
        v-model="notificationvalue"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-value="TURE"
        inactive-value="FALSE"
        @click="handlenotification">
      </el-switch>
    </el-tooltip>
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

    data() {
      return {
        emailvalue: 'FALSE',
        uploadvalue: 'FALSE',
        notificationvalue: 'FALSE',
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
        //console.log("1++++++++++++++++++++++++++++++++=");
        console.log(response);
        //console.log("2++++++++++++++++++++++++++++++++=");
        console.log(file.name);
        //console.log("3++++++++++++++++++++++++++++++++=");
        console.log(fileList);
      },
      handleemail(){

      },
      handleupload(){

      },
      handlenotification(){

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
