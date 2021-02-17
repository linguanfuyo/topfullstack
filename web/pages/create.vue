<template>
  <v-app id="inspire">
    <!-- 左边菜单 -->
    <v-navigation-drawer width="220" v-model="drawer" app clipped>
      <div class="user-avatar">
        <div class="user-upload">
          <!-- <Upload></Upload> -->
          <!-- 头像 -->
          <div @click="$router.push('/users')" class="user-img-box" @mouseenter="imgHover" @mouseleave="imgLeave">
            <v-avatar class="user-img-bg" v-if="isLogin" color="teal" size="100">
              <v-img v-if="userinfo.avatar" :src="userinfo.avatar"></v-img>
              <span style="font-size: 20px" v-if="!userinfo.avatar"
                class="white--text">{{userinfo.username[0].toUpperCase()}}</span>
            </v-avatar>
            <div v-if="isUserImgHover" class="avatar-marsk">
              <div class="marsk-icon">
                <a-icon style="color: #fff;font-size: 16px" type="export" />
                <div style="color: #fff">个人中心</div>
              </div>
            </div>
          </div>

          <div class="user-channel">您的频道</div>
          <div class="user-name">{{userinfo.name}}</div>
          <a-button style="margin-top: 20px" @click="$router.push('/create/display')" shape="round" type="primary">
            发布视频
          </a-button>
        </div>
      </div>
      <v-list dense>
        <v-list-item :to="item.link" v-for="item in items" :key="item.text" link>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- 头部app-bar -->
    <v-app-bar color="#ffffff" class="app-bar" app clipped-left dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="logo" @click="$router.push('/')">
        <v-icon class="mx-4 blue--text" large>
          landscape
        </v-icon>

        <v-toolbar-title class="mr-12 align-center">
          <span class="subtitle-1 font-weight-bold">星空创作平台</span>
        </v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <!-- 搜索 -->
      <!-- <v-row align="center" style="max-width: 35vw">
        <v-text-field :append-icon-cb="() => {}" placeholder="search..." rounded filled dense single-line
          append-icon="mdi-magnify" color="white" hide-details></v-text-field>
      </v-row> -->
      <v-spacer></v-spacer>
      <!-- 发布视频 -->
      <v-icon class="mx-6" @click="$router.push('/create/display')" link>
        video_call
      </v-icon>
      <v-btn v-show="!isLogin" @click="$router.push('/login')" class="login" color="primary" depressed elevation="2"
        outlined>
        <v-icon left>
          person
        </v-icon>
        登录
      </v-btn>

      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Dropdown
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list> -->

      <!-- 用户 -->
      <v-menu v-if="isLogin" bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar v-bind="attrs" v-on="on" class="user" v-if="isLogin" color="teal" size="35">
            <v-img v-if="userinfo.avatar" :src="userinfo.avatar"></v-img>
            <span v-if="userinfo.avatar===''" class="white--text">{{userinfo.username[0].toUpperCase()}}</span>
          </v-avatar>
        </template>
        <v-card>
          <v-list>
            <v-list-item @click="$router.push(`/users/${userinfo._id}`)" link>
              <v-list-item-avatar color="teal">
                <v-img v-if="userinfo.avatar" :src="userinfo.avatar"></v-img>
                <span v-if="userinfo.avatar===''" class="white--text">{{userinfo.username[0].toUpperCase()}}</span>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{userinfo.username}}</v-list-item-title>
                <v-list-item-subtitle>{{$store.state.auth.user.desc}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item link>
              <v-list-item-action>
                <!-- 切换按钮 -->
                <v-switch class="switch" v-model="$vuetify.theme.dark" hide-details></v-switch>
              </v-list-item-action>
              <v-list-item-content class="">
                <v-list-item-title>
                  切换主题
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link @click="layout">
              <v-list-item-action>
                <v-icon>undo</v-icon>
              </v-list-item-action>
              <v-list-item-content class="item-content">
                <v-list-item-title>
                  退出登录
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-content @click.stop="drawer = !drawer">
      <nuxt-child />
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import Upload from '@/components/Upload.vue'
export default {
  auth: true,
  props: {
  },
  data: () => ({
    isUserImgHover: false,
    fav: true,
    drawer: null,
    items: [
      { icon: 'home', text: '首页', link: '/create/center' },
      { icon: 'mdi-youtube-subscription', text: '内容管理', link: '/create/manerge' },
      { icon: 'insert_chart_outlined', text: '数据分析', link: '/create/statistics' },
      { icon: 'message', text: '评论管理', link: '/create/comment' },
      { icon: 'settings', text: '设置' },
    ],

  }),
  computed: {
    ...mapState({
      userinfo: state => state.auth.user || {},
      strategy: state => state.auth.strategy,
      isLogin: state => state.auth.loggedIn,
      isSyncCount: state => state.isSyncCount
    })
  },
  components: {
    Upload
  },
  methods: {
    imgHover () {
      this.isUserImgHover = true
    },
    imgLeave () {
      this.isUserImgHover = false
    },
    // 退出登录
    async layout () {
      await this.$auth.logout()
      if (process.client) {
        const storage = window.localStorage
        storage.removeItem('user')
        storage.removeItem('token')
      }
      this.$router.push('/login')

    },
    // 同步github用户
    async syncUser () {
      try {
        let userAuth = this.$store.state.auth
        if (userAuth.strategy === 'github' && !this.isSyncCount) {
          const user = userAuth.user
          const githubModel = {}
          githubModel.username = user.login
          githubModel.avatar = user.avatar_url
          githubModel.type = 'github'
          githubModel.user_id = user.id
          if (githubModel.user_id) {
            // 同步注册本地用户
            const res = await this.$axios.$post('auth/register', githubModel)
            if (res) {
              this.$store.commit('setUser', res.user)
              // 获取用户token
              const res1 = await this.$axios.$post('auth/githubLogin', githubModel)
              // Bearer
              const storage = window.localStorage
              // storage.setItem("auth._token.local", 'Bearer ' + res1.token);
              this.$store.commit('setVal', {
                valName: 'isSyncCount',
                val: true
              })
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },

  },
  mounted () {
    // console.log(userAuth.user.avatar_url)
    // 判断用户是否已经登录
    try {
      let userAuth = this.$store.state.auth
      if (userAuth.loggedIn) {
        this.syncUser()
      }
      this.$vuetify.theme.dark = false //vuetify主题是否为黑色
    } catch (error) {
      console.log(error)
    }
  },
}
</script>
<style lang="sass" scoped>
.user-avatar
  height: 240px
  display: flex
  align-item: center
  justify-content: center
  .user-img-box
    position: relative
    .avatar-marsk
      width: 100px
      height: 100px
      border-radius: 50%
      background-color: rgba(0,0,0,0.5)
      position: absolute
      top: 0
      left: 5px
      display: flex
      justify-content: center
      align-item: center
      .marsk-icon
        margin: auto 0
  .user-upload
    width: 110px
    height: 110px
    margin-top: 20px
    text-align: center
    cursor: pointer
  .user-channel
    font-size: 16px
    margin-top: 10px
    font-weight: 500
  .user-name
    color: grey
.logo
  cursor: pointer
  display: flex
  align-items: center
.switch
  padding-right: 30px
.login-tips
  font-size: 14px
  color: #1e1e1e
.item-content
  padding-left: 44px
</style>
