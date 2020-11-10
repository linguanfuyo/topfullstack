<template>
  <div class="user-home">
    <div class="header-img">
      <img draggable="false" class="header-img"
        src="https://sf3-scmcdn-tos.pstatp.com/obj/goofy/xigua_fe/xigua_video_web_pc/static/media/bg.52432ed6.png"
        alt="">
      <div class="user-info">
        <div>
          <v-avatar class="user-avatar" v-if="isLogin" color="teal" size="100">
            <v-img v-if="userinfo.avatar" :src="userinfo.avatar"></v-img>
            <span v-if="!userinfo.avatar" style="font-size: 20px"
              class="white--text">{{userinfo.name[0].toUpperCase()}}</span>
          </v-avatar>
          <div class="user">
            <div class="user-name">{{userinfo.name}}</div>
            <div class="user-desc">这人很烂什么视频都没有留下</div>
          </div>
        </div>
        <div class="user-info-right">
          <div class="num-list">
            <div class="num-item">
              <div class="num">{{0}}</div>
              <div class="num-name">关注</div>
            </div>
            <div class="num-item">
              <div class="num">{{0}}</div>
              <div class="num-name">粉丝</div>
            </div>
            <div @mouseenter="mouseenter" @mouseleave="mouseleave" class="num-item">
              <div class="num">{{0}}</div>
              <div class="num-name">获赞
                <LikeView v-show="isShowLikeView" :name="userinfo.name" class="like-view"></LikeView>
              </div>
            </div>
          </div>
          <v-btn class="create-btn" small color="error" elevation="2">前往创作平台</v-btn>
        </div>
      </div>
    </div>
    <div style="padding-top: 150px">
      <v-tabs class="tabs" background-color="transparent" align-with-title v-model="tab">
        <v-tab>视频{{0}}</v-tab>
        <v-tab>文章{{0}}</v-tab>
        <v-tab>音乐{{0}}</v-tab>
      </v-tabs>
    </div>
    <v-tabs-items v-model="tab">
      <v-tab-item class="tab-item">
        <!-- 视频 -->
        <div class="video">
          <div class="video-bg">
            <img draggable="false" class="bg-img"
              src="https://sf3-scmcdn-tos.pstatp.com/obj/goofy/xigua_fe/xigua_video_web_pc/static/media/userdetail_noresult.66fb0f1a.png"
              alt="">
            <p class="video-de">你还没有发布过任何视频</p>
          </div>
        </div>
      </v-tab-item>
      <v-tab-item class="tab-item">
        <!-- 视频 -->
        <div class="video">
          <div class="video-bg">
            <img draggable="false" class="bg-img"
              src="https://sf3-scmcdn-tos.pstatp.com/obj/goofy/xigua_fe/xigua_video_web_pc/static/media/userdetail_noresult.66fb0f1a.png"
              alt="">
            <p class="video-de">你还没有发布过任何文章</p>
          </div>
        </div>
      </v-tab-item>
      <v-tab-item class="tab-item">
        <!-- 视频 -->
        <div class="video">
          <div class="video-bg">
            <img draggable="false" class="bg-img"
              src="https://sf3-scmcdn-tos.pstatp.com/obj/goofy/xigua_fe/xigua_video_web_pc/static/media/userdetail_noresult.66fb0f1a.png"
              alt="">
            <p class="video-de">你还没有发布过任何音频</p>
          </div>
        </div>
      </v-tab-item>
    </v-tabs-items>

  </div>
</template>

<script>
import LikeView from '@/components/LikeView.vue';
export default {
  data () {
    return {
      isShowLikeView: false, // 是否显示点赞面板
      tab: 0,
      isLogin: false,
      strategy: '',
      userinfo: {},
      numList: [
        {
          name: '关注',
          num: 0
        },
        {
          name: '粉丝',
          num: 0
        },
        {
          name: '获赞',
          num: 0
        },
      ]
    }
  },
  components: {
    LikeView
  },
  methods: {
    mouseenter () {
      this.isShowLikeView = true
    },
    mouseleave () {
      this.isShowLikeView = false
    }
  },
  mounted () {
    try {
      let userAuth = this.$store.state.auth
      if (userAuth.loggedIn) {
        this.isLogin = userAuth.loggedIn
        this.strategy = userAuth.strategy
        this.userinfo.name = this.strategy === 'local' ? userAuth.user.username : userAuth.user.login
        this.userinfo.avatar = this.strategy === 'local' ? userAuth.user.avatar : userAuth.user.avatar_url
        this.userinfo.desc = userAuth.user.desc
      }
      this.$vuetify.theme.dark = false //vuetify主题是否为黑色
    } catch (error) {
      console.log(error)
    }
  }

}
</script>

<style lang="sass" scoped>
.user-home
  height: 100%
  width: 100%
  overflow-y: auto
/* 定义滑块 内阴影+圆角 */
.user-home::-webkit-scrollbar
  width: 8px
  background-color: #F9F9F9
.user-home::-webkit-scrollbar-thumb
  border-radius: 8px
  background-color: #E5E5E5
  visibility: hidden
.user-home:hover::-webkit-scrollbar-thumb
  visibility: visible
.header-img
  height: 150px
  width: 100%
.user-info
  backgrouund-color: #fff
  height: 100px
  width: 100%
  display: flex
  justify-content: space-between
  position: relative
  .user-info-right
    margin: auto 35px
    height: 50px
    display: flex
    align-item: center
    .like-view
      position: absolute
      left: 69%
      top: 80%
      z-index: 9
    .create-btn
      margin-top: 10px
    .num-list
      cursor: pointer
      display: flex
      margin: 0 30px
      font-size: 16px
      color: #646464
      .num-item
        margin: 0 12px
        text-align: center
  .user-avatar
    position: absolute
    top: -30%
    left: 30px
  .user
    padding: 10px 140px
    .user-name
      font-size: 18px
      font-weight: bold
    .user-desc
      font-size: 13px
      color: grey
.video
  width: 100%
  height: 85vh
  background-color: #f7f7f7
  display: flex
  justify-content: center
  .video-bg
    width: 240px
    height: 135px
    margin: auto 0
    .video-de
      color: grey
      text-align: center
    .bg-img
      width: 240px
      height: 135px
</style>
