<template>
  <div>
    <el-row
      type="flex"
      justify="center"
      align="middle"
      style="height: 100vh;"
    >
      <el-col
        :xl="8"
        :md="12"
        :sm="20"
        :xs="24"
      >
        <div class="card-container">
          <el-card
            title="Halo 安装向导"
            style="box-shadow: 0px 10px 20px 0px rgba(236, 236, 236, 0.86);"
          >

            <el-steps :active="stepCurrent">
              <el-step title="博主信息">
              </el-step>
              <el-step title="博客信息">
              </el-step>
              <el-step title="默认选项设置">
              </el-step>
            </el-steps>
            <el-divider dashed />
            <!-- Blogger info -->
            <el-form
              layout="horizontal"
              v-show="stepCurrent == 0"
              :form="bloggerForm"
            >
              <el-form-item class="animated fadeInUp">
                <el-input
                  v-model="installation.username"
                  placeholder="用户名"
                  v-decorator="[
                    'username',
                    {rules: [{ required: true, message: '请输入用户名' }]}
                  ]"
                >
                  <el-icon
                    slot="prefix"
                    type="user"
                    style="color: rgba(0,0,0,.25)"
                  />
                </el-input>
              </el-form-item>
              <el-form-item
                class="animated fadeInUp"
                :style="{'animation-delay': '0.1s'}"
              >
                <el-input
                  v-model="installation.nickname"
                  placeholder="用户昵称"
                >
                  <el-icon
                    slot="prefix"
                    type="smile"
                    style="color: rgba(0,0,0,.25)"
                  />
                </el-input>
              </el-form-item>
              <el-form-item
                class="animated fadeInUp"
                :style="{'animation-delay': '0.1s'}"
              >
                <el-input
                  v-model="installation.description"
                  placeholder="用户描述"
                >
                  <el-icon
                    slot="prefix"
                    type="smile"
                    style="color: rgba(0,0,0,.25)"
                  />
                </el-input>
              </el-form-item>
              <el-form-item
                class="animated fadeInUp"
                :style="{'animation-delay': '0.2s'}"
              >
                <el-input
                  v-model="installation.email"
                  placeholder="用户邮箱"
                  v-decorator="[
                    'email',
                    {rules: [{ required: true, message: '请输入邮箱' }]}
                  ]"
                >
                  <el-icon
                    slot="prefix"
                    type="mail"
                    style="color: rgba(0,0,0,.25)"
                  />
                </el-input>
              </el-form-item>
              <el-form-item
                class="animated fadeInUp"
                :style="{'animation-delay': '0.3s'}"
              >
                <el-input
                  v-model="installation.password"
                  type="password"
                  placeholder="用户密码（8-100位）"
                  v-decorator="[
                    'password',
                    {rules: [{ required: true, message: '请输入密码（8-100位）' }]}
                  ]"
                >
                  <el-icon
                    slot="prefix"
                    type="lock"
                    style="color: rgba(0,0,0,.25)"
                  />
                </el-input>
              </el-form-item>
              <el-form-item
                class="animated fadeInUp"
                :style="{'animation-delay': '0.4s'}"
              >
                <el-input
                  v-model="installation.confirmPassword"
                  type="password"
                  placeholder="确定密码"
                  v-decorator="[
                    'confirmPassword',
                    {rules: [{ required: true, message: '请确定密码' }]}
                  ]"
                >
                  <el-icon
                    slot="prefix"
                    type="lock"
                    style="color: rgba(0,0,0,.25)"
                  />
                </el-input>
              </el-form-item>
            </el-form>

            <!-- Blog info -->

            <el-form
              layout="horizontal"
              v-show="stepCurrent == 1"
            >
              <el-form-item class="animated fadeInUp">
                <el-input
                  v-model="installation.url"
                  placeholder="博客地址"
                >
                  <el-icon
                    slot="prefix"
                    type="link"
                    style="color: rgba(0,0,0,.25)"
                  />
                </el-input>
              </el-form-item>
              <el-form-item
                class="animated fadeInUp"
                :style="{'animation-delay': '0.2s'}"
              >
                <el-input
                  v-model="installation.title"
                  placeholder="博客标题"
                >
                  <el-icon
                    slot="prefix"
                    type="book"
                    style="color: rgba(0,0,0,.25)"
                  />
                </el-input>
              </el-form-item>
            </el-form>

            <!-- Data migration -->
            <div v-show="stepCurrent == 2">
              <el-alert
                style="margin-bottom: 1rem"
                message="如果有迁移需求，请点击并选择'迁移文件'"
                type="info"
                class="animated fadeInUp"
              />
            </div>

            <el-row
              class="install-action"
              type="flex"
              justify="space-between"
              style="margin-top: 1rem;"
            >
              <div>
                <el-button
                  class="previus-button"
                  v-if="stepCurrent != 0"
                  @click="stepCurrent--"
                  style="margin-right: 1rem;"
                >上一步</el-button>
                <el-button
                  type="primary"
                  v-if="stepCurrent != 2"
                  @click="handleNextStep"
                >下一步</el-button>
              </div>
              <el-button
                v-if="stepCurrent == 2"
                type="danger"
                icon="upload"
                @click="handleInstall"
              >安装</el-button>
            </el-row>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {install} from '@/api/install'

  export default {
    data() {
      return {
        installation: {},
        migrationUploadName: 'file',
        migrationData: null,
        stepCurrent: 0,
        bloggerForm: this.$form.createForm(this)
      }
    },
    created() {
     // this.verifyIsInstall()
     // this.installation.url = window.location.protocol + '//' + window.location.host
    },
    methods: {
      handleNextStep(e) {
        e.preventDefault()
        this.bloggerForm.validateFields((error, values) => {
          console.log('error', error)
          console.log('Received values of form: ', values)
          if (error != null) {
          } else {
            this.stepCurrent++
          }
        })
      },
      install() {
        install(this.installation).then(response => {
          console.log(response);
          if (response.data.resultCode === 400 ){
            this.$message.error('BadRequest')
          } else {
            this.$message.success('安装成功！')
          }
          setTimeout(() => {
            this.$router.push({ name: 'login' })
          }, 300)
        })
      },
      handleInstall() {
        const password = this.installation.password
        const confirmPassword = this.installation.confirmPassword
        if (password !== confirmPassword) {
          this.$message.error('确认密码和密码不匹配')
          return
        }
        // Handle migration
        if (this.migrationData) {

        } else {
          this.install()
        }
      }
   /*   verifyIsInstall() {
        adminApi.isInstalled().then(response => {
          if (response.data.data) {
            this.$router.push({ name: 'Login' })
          }
        })
      },
      handleNextStep(e) {
        e.preventDefault()
        this.bloggerForm.validateFields((error, values) => {
          console.log('error', error)
          console.log('Received values of form: ', values)
          if (error != null) {
          } else {
            this.stepCurrent++
          }
        })
      },
      handleMigrationUpload(data) {
        this.$log.debug('Selected data', data)
        this.migrationData = data
        return new Promise((resolve, reject) => {
          this.$log.debug('Handle uploading')
          resolve()
        })
      },
      handleMigrationFileRemove(file) {
        this.$log.debug('Removed file', file)
        this.$log.debug('Migration file from data', this.migrationData.get(this.migrationUploadName))
        if (this.migrationData.get(this.migrationUploadName).uid === file.uid) {
          this.migrationData = null
          this.migrationFile = null
        }
      },
      install() {
        adminApi.install(this.installation).then(response => {
          this.$log.debug('Installation response', response)
          this.$message.success('安装成功！')
          setTimeout(() => {
            this.$router.push({ name: 'Login' })
          }, 300)
        })
      },
      handleInstall() {
        const password = this.installation.password
        const confirmPassword = this.installation.confirmPassword

        this.$log.debug('Password', password)
        this.$log.debug('Confirm password', confirmPassword)

        if (password !== confirmPassword) {
          this.$message.error('确认密码和密码不匹配')
          return
        }

        // Handle migration
        if (this.migrationData) {
          recoveryApi.migrate(this.migrationData).then(response => {
            this.$log.debug('Migrated successfullly')
            this.$message.success('数据迁移成功！')
            this.install()
          })
        } else {
          this.install()
        }
      }*/
    }
  }
</script>
