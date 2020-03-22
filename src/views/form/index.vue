<template>
  <div class="app-container">
    <el-form ref="form" :model="userinfo" label-width="120px">
      <el-form-item label="Admin 用户名">
        <el-input v-model="userinfo.username"/>
      </el-form-item>
      <el-form-item label="Admin 昵称">
        <el-input v-model="userinfo.nickname"/>
      </el-form-item>
      <el-form-item label="Admin 电子邮箱">
        <el-input v-model="userinfo.email"/>
      </el-form-item>
      <el-form-item label="Admin 描述">
        <el-input v-model="userinfo.description"/>
      </el-form-item>
      <el-form-item label="Admin 头像">
        <img :src="userinfo.avatar+imageView"/>
        <el-input v-model="userinfo.avatar"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
    <el-button type="text" @click="open">点击打开 Message Box</el-button>

    <el-form ref="form" :model="resetpassword" label-width="120px" v-if="swichreset">
      <el-form-item label="Admin 用户名">
        <el-input v-model="resetpassword.username"/>
      </el-form-item>
      <el-form-item label="Admin 旧密码">
        <el-input v-model="resetpassword.oldpassword" show-password/>
      </el-form-item>
      <el-form-item label="Admin 新密码">
        <el-input v-model="resetpassword.newpassword" show-password/>
      </el-form-item>
      <el-form-item label="Admin 新密码">
        <el-input v-model="resetpassword.newpassword_test" @input="testpassword" show-password/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="ResetPassword">Reset</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {getUserInfo, updateUserInfo, resetPassword} from '@/api/user'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        disable: true,
        imageView: '?imageView2/1/w/40/h/40',
        swichreset: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        userinfo: undefined,
        resetpassword: {
          username: undefined,
          oldpassword: undefined,
          newpassword: undefined,
          newpassword_test: undefined
        }
      }
    },
    //http://q6yuglcls.bkt.clouddn.com/1584858864715
    created() {
      this.initUserInfo()
    },
    methods: {
      onSubmit() {
        let vm = this
        updateUserInfo(vm.userinfo).then(response => {
          if (response.data.resultCode == 200) {
            alert("修改成功")
          }
        })
        this.$message('submit!')
      },
      testpassword() {
        let vm = this
        if (vm.resetpassword.newpassword != vm.resetpassword.newpassword) {
          vm.disable = false
        }
        this.$forceUpdate()
      },
      ResetPassword() {

        let vm = this
        resetPassword(vm.resetpassword).then(response => {
          if (response.data.resultCode == 200) {
            alert("修改成功")
            this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          }
        })
        this.$message('submit!')
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      },
      initUserInfo() {
        let vm = this
        getUserInfo().then(response => {
          vm.userinfo = response.data.data;
          console.log(vm.userinfo);
        })
      },
      open() {
        this.resetpassword.username = this.userinfo.username
        this.swichreset = !this.swichreset
      }
    }
  }
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>

