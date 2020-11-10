<template>
  <v-app class="login">
    <img class="bg-img" src="https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg" alt="">
    <v-row align="center" class="wrap">
      <div class="form">
        <v-form class="wrap-left" ref="form" v-model="valid">
          <v-text-field clearable v-model="model.username" :counter="10" :rules="nameRules" label="用户名" required>
          </v-text-field>

          <v-text-field append-icon="verified_user" type="password" v-model="model.password" :rules="passwordRules"
            label="用户密码" required></v-text-field>

          <v-text-field append-icon="verified_user" type="password" v-model="tempPassword" :rules="tempPasswordRules"
            label="确认密码" required>
          </v-text-field>
          <v-text-field clearable v-model="model.phone" :rules="phoneRules" label="手机号" required></v-text-field>
          <v-btn :disabled="!valid" color="success" class="mr-4" @click="regitser">
            注册
          </v-btn>

          <v-btn color="primary" class="mr-4" @click="$router.push('/login')">
            已有账号？
          </v-btn>

        </v-form>
        <div
          @click="downLoad('https://lgf-tofullstack.oss-cn-hangzhou.aliyuncs.com/153df586ce5decb4f2882f95d7dfdc11.mp4')"
          class="right-wrap">
          <img draggable="false" src="https://ssl.gstatic.com/accounts/signup/glif/account.svg" alt="">
          <div>只需一个帐号，您便可以使用该网站的所有产品和服务。</div>
          <!-- <a href="https://lgf-tofullstack.oss-cn-hangzhou.aliyuncs.com/153df586ce5decb4f2882f95d7dfdc11.mp4"
            download>下载</a> -->
        </div>
      </div>
    </v-row>
  </v-app>
</template>
<script>
import download from '@/util/download.js'
import { URL } from 'url'
export default {
  auth: false,
  data: () => ({
    valid: false,
    model: {
      username: '',
      password: '',
      phone: ''
    },
    nameRules: [
      v => !!v || '用户名不能为空',
      v => (v && v.length <= 10) || '用户名超出长度限制',
    ],
    tempPassword: '',
    passwordRules: [
      v => !!v || '密码不能为空',
      v => (v && v.length <= 10) || '密码超出长度限制',
    ],

    phoneRules: [
      v => !!v || '手机号不能为空',
      v => /^1(3|4|5|6|7|8|9)\d{9}$/.test(v) || '手机号无效',
    ],
  }),
  computed: {
    tempPasswordRules: function () {
      return [
        v => !!v || '确认密码不能为空',
        v => (v && this.model.password === v) || '密码不一致',
      ]
    },
  },

  methods: {
    async downLoad (url) {
      window.open(url);
    },
    async regitser () {
      this.$refs.form.validate()
      const res = await this.$axios.$post('auth/register', this.model)
      if (res.code === 200) {
        this.$router.push('/login')
      }
      this.$message.open({
        content: res.message
      })
    },

  },
}
</script>

<style lang="sass" scoped>
.login
  width: 100%
  height: 100%
  background-color: #f0f2f5
  .bg-img
    width: 100%
    height: 100%
    position: absolute
    left: 0
    z-index: 0
  .wrap
    background-color: #fff
    box-shadow: 1px 3px 10px 0px rgba(0, 0, 0, 0.2)
    margin: 100px auto
    border: 1px solid #dadce0
    width: 750px
    height: 400px
    border-radius: 10px
    .form
      margin: 30px
      display: flex
      justify-content: space-between
      .right-wrap
        width: 35%
        text-align: center
      .wrap-left
        width: 50%
</style>