<template>
  <el-row class="panel-group" :gutter="20">
    <el-col :span="4">
      <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">New Visits</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="countsvisit" :duration="3600"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="table" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Posts</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="countposts" :duration="4000"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="table" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Tags</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="counttags" :duration="4000"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon icon-class="table" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Categories</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="countcategories" :duration="4600"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Notifications</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="countnotifica" :duration="4600"></count-to>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import {countsposts,countstags,countscategories,countsvisits,countsnotifications} from '@/api/others'

export default {
  data() {
    return{
      countposts:undefined,
      counttags:undefined,
      countcategories:undefined,
      countsvisit:undefined,
      countnotifica:undefined
    }
  },
  created() {
    this.initdata()
  },

  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    initdata(){
      let vm =this

      countsposts().then(response =>{
        vm.countposts = response.data.data
      })
      countstags().then(response =>{
        vm.counttags = response.data.data
      })
      countscategories().then(response =>{
        vm.countcategories = response.data.data
      })
      countsvisits().then(response =>{
        vm.countsvisit = response.data.data
      })
      countsnotifications().then(response =>{
        vm.countnotifica = response.data.data
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 20px;
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shoppingCard {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

</style>
