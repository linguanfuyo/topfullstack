<template>
  <v-app class="login">
    <img draggable="false" class="bg-img" src="https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg"
      alt="">
    <div align="center" class="wrap">
      <div class="form">
        <div class="wrap-left">
          <v-tabs class="tabs" background-color="transparent" align-with-title v-model="tab">
            <v-tab>账号登录</v-tab>
            <v-tab>短信登录</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item class="tab-item">
              <v-form class="tab-items" ref="form" v-model="valid">
                <v-text-field class="text-filed" clearable v-model="loginModel.username" :counter="10"
                  :rules="nameRules" label="用户名" required>
                </v-text-field>
                <v-text-field :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1"
                  v-model="loginModel.password" :rules="passwordRules" label="密码" required :type="type">
                </v-text-field>
                <div class="password">
                  <v-checkbox v-model="checkbox" label="记住密码?"></v-checkbox>
                  <Nuxt-link to="/userAgreement" class="password-span">用户者协议</Nuxt-link>
                </div>
              </v-form>
            </v-tab-item>
            <!-- 短信登录 -->
            <v-tab-item class="tab-item">
              <v-form class="tab-items" ref="form" v-model="valid">
                <v-text-field class="text-filed" clearable v-model="loginModel.phone" :rules="phoneRules" label="手机号"
                  required>
                </v-text-field>
                <div class="notise">
                  <v-text-field v-model="loginModel.code" :rules="codeRules" label="验证码" required>
                  </v-text-field>
                  <v-btn :disabled="!checkPhone" class="mx-2" small @click="getCode">
                    {{num===0?'获取验证码':'已发送'+num+'s'}}
                  </v-btn>
                </div>
                <div class="password">
                  <v-checkbox v-model="checkbox" label="记住密码?"></v-checkbox>
                  <Nuxt-link to="/userAgreement" class="password-span">用户者协议</Nuxt-link>
                </div>
              </v-form>
            </v-tab-item>
          </v-tabs-items>
          <div class="login-button">
            <div>
              <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">
                登录
              </v-btn>
              <v-btn @click="$router.push('/register')" color="primary" class="mr-4">
                创建账号
              </v-btn>
            </div>
            <div class="login-icon">
              <img draggable="false" @click="github" class="img-github link" src="@/assets/img/GitHub.png" alt="aa">
              <img style="width:33px;height:33px;cursor: pointer" draggable="false" @click="oAuth"
                src="@/assets/img/weixin.svg" alt="aa">
            </div>
          </div>

        </div>
        <div class="right-wrap">
          <v-icon class="mx-4 blue--text logo">
            landscape
          </v-icon>
          <div>登录便可分享自己的视频和关注网站内的其他创作者。</div>
        </div>
      </div>
    </div>
  </v-app>
</template>
<script>
import { Base64 } from 'js-base64';
if (process.client) {
  var storage = window.localStorage
}
export default {
  auth: false,
  data: () => ({
    num: 0,
    tab: 0,
    show1: true,
    type: 'password',
    valid: false,
    nameRules: [
      v => !!v || '用户名不能为空',
      v => (v && v.length <= 10) || '用户名超出限制',
    ],
    phoneRules: [
      v => !!v || '手机号不能为空',
      v => /^1(3|4|5|6|7|8|9)\d{9}$/.test(v) || '手机号无效',
    ],
    codeRules: [
      v => !!v || '验证码不能为空',
      // v => /^1(3|4|5|6|7|8|9)\d{9}$/.test(v) || '手机号无效',
    ],
    passwordRules: [
      v => !!v || '密码不能为空',
      v => (v && v.length <= 10) || '密码超出限制',
    ],
    checkbox: true,
    loginModel: {},
    disabled: false,
    checkPhone: false
  }),
  watch: {
    show1 (newVal, oldVal) {
      if (!newVal) {
        this.type = 'name'
      } else {
        this.type = 'password'
      }
    },
    loginModel: {
      handler (newVal, oldVal) {
        const myreg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        this.checkPhone = myreg.test(newVal.phone)
      },
      deep: true
    }
  },
  computed: {
    // checkPhone: function () {
    //   const myreg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    //   return myreg.test(this.loginModel.phone || '')
    // }
  },
  methods: {
    async oAuth () {
      this.$auth.loginWith('social')
    },
    async github () {
      try {
        const res = await this.$auth.loginWith('github')
      } catch (error) {
        console.log(error)
      }

    },
    // 获取验证码
    async getCode () {
      if (this.num === 0) {
        // 发送请求
        const res = await this.$axios.$post('auth/getCode', { phone: this.loginModel.phone })
        // 倒计时
        this.num = 60
        let inter = setInterval(() => {
          this.num--;
          if (this.num == 0) {
            this.num = 0;
            clearInterval(inter);//关闭定时器
          }
        }, 1000);
      }
    },
    async login () {
      this.$refs.form.validate()
      try {
        if (this.tab === 0) {
          let res = await this.$auth.loginWith('local', { data: this.loginModel }).catch(err => {
          })
          if (res.data.token) {
            this.$store.commit('setVal', {
              valName: 'isLogin',
              val: true
            })
            storage.setItem("user", Base64.encode(JSON.stringify(res.data.user)));
            //记住密码
            this.$router.push('/')
            if (this.checkbox && this.tab === 0) {
              this.loginModel.phone = ''
              this.loginModel.code = ''
              storage.setItem("count", Base64.encode(JSON.stringify(this.loginModel)));
            }
            return
          }
        } else {
          // 发送请求
          const res = await this.$axios.$post('auth/codeLogin', { data: this.loginModel })
          if (res.token) {
            // token保存到localsore和获取用户信息保存到vuex
            this.$store.commit('setVal', {
              valName: 'auth',
              val: {
                loggedIn: true,
                strategy: "local",
                user: res.user
              }
            })
            // Bearer
            storage.setItem("auth._token.local", 'Bearer ' + res.token);
            storage.setItem("user", Base64.encode(JSON.stringify(res.user)));
            this.$router.push('/')
            return
          } else {
            this.$message.error({
              content: res.message
            })
          }
        }

      } catch (err) {
        this.$message.error({
          content: '用户名密码错误'
        })
        console.log(err)
      }

    },
  },
  async mounted () {
    if (this.$store.state.auth.loggedIn) {
      this.$router.push('/')
    }
    if (storage.getItem('count')) {
      this.loginModel = JSON.parse(Base64.decode(storage.getItem('count')))
    }

  }
}
</script>

<style lang="sass" scoped>
.login-icon
  position: absolute
  z-index: 999
  right: 0%
  width: 70px
  display: flex
  justify-content: space-between
.img-github
  width: 30px
  height: 30px
  cursor: pointer
.login
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
    border: 1px solid #dadce0
    width: 750px
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%,-50%)
    border-radius: 10px
    padding: 100px 0
    .form
      margin: 0 30px
      display: flex
      justify-content: space-between
      .password
        display: flex
        justify-content: space-between
        align-items: center
      .password-span
        cursor: pointer
      .login-button
        display: flex
        justify-content: space-between
        position: relative
      .right-wrap
        width: 35%
        text-align: center
        .logo
          font-size: 150px
      .wrap-left
        width: 300px
        .tabs
          height: 50px
          margin-bottom: 10px
        .tab-item
          height: 210px
          .text-filed
            margin-top: 0
          .notise
            display: flex
            align-items: center
            justify-content: space-between
</style>