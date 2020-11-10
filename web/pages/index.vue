<template>
  <v-app id="inspire">
    <!-- 左边菜单 -->
    <v-navigation-drawer :mini-variant.sync="mini" width="220" app clipped>
      <v-list class="slide-muen" dense>
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
        <!-- 订阅 -->
        <v-subheader v-show="!mini" class="mt-6 grey--text text--darken-1">特色频道</v-subheader>
        <v-list v-show="isLogin&&!mini">
          <v-list-item :to="item.link" v-for="item in items2" :key="item.text" link>
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
        <v-subheader v-show="!mini" class="mt-4 grey--text text--darken-1">我的</v-subheader>
        <v-list v-show="isLogin">
          <v-list-item :to="item.link" v-for="item in items3" :key="item.text" link>
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
        <!-- 未登录 -->

        <v-row v-if="!isLogin&&!mini" align="start" justify="start">
          <span class="login-tips mx-8">
            登录即可顶视频、发表评论和订阅内容。
          </span>
          <v-btn @click="$router.push('/login')" class="mx-8 mt-3" color="primary" depressed elevation="2" outlined>
            <v-icon left>
              person
            </v-icon>
            登录
          </v-btn>
        </v-row>

      </v-list>
    </v-navigation-drawer>
    <!-- 头部app-bar -->
    <v-app-bar class="app-bar" app clipped-left dense>
      <v-app-bar-nav-icon @click.stop="mini = !mini"></v-app-bar-nav-icon>
      <div class=" logo" @click="$router.push('/')">
        <v-icon class="mx-4 blue--text" large>
          landscape
        </v-icon>

        <v-toolbar-title class="mr-12 align-center">
          <span class="subtitle-1 font-weight-bold">星空之巅</span>
        </v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <!-- 搜索 -->
      <v-row align="center" style="max-width: 35vw">
        <v-text-field :append-icon-cb="() => {}" placeholder="search..." rounded filled dense single-line
          append-icon="mdi-magnify" color="white" hide-details></v-text-field>
      </v-row>
      <v-spacer></v-spacer>
      <!-- 发布视频 -->
      <v-icon class="mx-6" @click="dispayVideo" link>
        video_call
      </v-icon>
      <v-btn v-show="!isLogin" @click="$router.push('/login')" class="login" color="primary" depressed elevation="2"
        outlined>
        <v-icon left>
          person
        </v-icon>
        登录
      </v-btn>

      <!-- 用户 -->
      <v-menu v-if="isLogin" bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar v-bind="attrs" v-on="on" class="user" v-if="isLogin" color="teal" size="35">
            <v-img v-if="userinfo.avatar!==''" :src="userinfo.avatar"></v-img>
            <span v-if="userinfo.avatar===''" class="white--text">{{userinfo.username[0].toUpperCase()}}</span>
          </v-avatar>
        </template>
        <v-card>
          <v-list>
            <v-list-item @click="$router.push('/userHome')" link>
              <v-list-item-avatar color="teal">
                <v-img v-if="userinfo.avatar!==''" :src="userinfo.avatar"></v-img>
                <span v-if="userinfo.avatar===''" class="white--text">{{userinfo.username[0].toUpperCase()}}</span>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{userinfo.username}}</v-list-item-title>
                <!-- <v-list-item-subtitle>{{$store.state.auth.user.desc}}</v-list-item-subtitle> -->
              </v-list-item-content>
              <v-list-item-action>
                <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="$router.push('/user')" link>
              <v-list-item-action>
                <a-icon style="fontSize: 20px;color:#717171" type="bulb" />
              </v-list-item-action>
              <v-list-item-content class="item-content">
                <v-list-item-title>
                  创作中心
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
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
export default {
  auth: false,
  props: {
    source: String,
  },
  data: () => ({
    mini: true,
    fav: true,
    drawer: null,
    items: [
      { icon: 'home', text: '首页', link: '/' },
      { icon: 'mdi-trending-up', text: '时下流行', link: '/hot' },
      { icon: 'ondemand_video', text: '番剧', link: '/courses' },
    ],
    items2: [
      { icon: 'videogame_asset', text: '游戏', link: '/game' },
      { icon: 'music_video', text: '音乐', link: '/music' },
      { icon: 'fastfood', text: '美食', link: '/food' },
      { icon: 'videogame_asset', text: '搞笑', link: 'funny' },
      { icon: 'outdoor_grill', text: '农人', link: 'farmer' },
      { icon: 'sports_soccer', text: '体育', link: 'sports' },
      { icon: 'emoji_nature', text: '宠物', link: 'pets' },
      { icon: 'flight', text: '科技', link: 'technology' },
      { icon: 'missed_video_call', text: 'Vlog', link: 'vlog' },
    ],
    items3: [
      { icon: 'favorite', text: '关注动态', link: '/dynamic' },
      { icon: 'history', text: '观看历史', link: '/history' },
      { icon: 'star', text: '我的收藏', link: '/collection' },
    ],
  }),
  wacth: {
  },
  computed: {
    ...mapState({
      userinfo: state => state.auth.user,
      strategy: state => state.auth.strategy,
      isLogin: state => state.auth.loggedIn
    })
  },
  methods: {
    dispayVideo () { },
    // 退出登录
    async layout () {
      await this.$auth.logout()
      this.$router.push('/login')

    },
    // 同步github用户
    async syncUser () {
      try {
        let userAuth = this.$store.state.auth
        if (userAuth.strategy === 'github') {
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
              storage.setItem("auth._token.local", 'Bearer ' + res1.token);
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
    let userAuth = this.$store.state.auth
    if (userAuth.loggedIn) {
      this.syncUser()
    }
    this.$vuetify.theme.dark = false //vuetify主题是否为黑色
  },
}
</script>
<style lang="sass" scoped>
.app-bar
  z-index: 99
.slide-muen
  height: 100%
  overflow-y: auto
  overflow-x: hidden
/* 定义滑块 内阴影+圆角 */
.slide-muen::-webkit-scrollbar
  width: 9px
  background-color: #F9F9F9
.slide-muen::-webkit-scrollbar-thumb
  border-radius: 8px
  background-color: #E5E5E5
  visibility: hidden
.slide-muen:hover::-webkit-scrollbar-thumb
  visibility: visible
.logo
  cursor: pointer
  display: flex
  align-items: center
.switch
  padding-right: 30px
.login-tips
  font-size: 14px
  color: #1e1e1e
.user
  cursor: pointer
.item-content
  padding-left: 44px
</style>
