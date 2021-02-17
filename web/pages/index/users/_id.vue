<template>
  <div class="user-home">
    <!-- 用户信息编辑框 -->
    <UserInfo @closeEdit="closeEdit" v-if="visible"></UserInfo>
    <!-- 头部 -->
    <div class="header-img">
      <img draggable="false" class="header-img"
        src="https://sf3-scmcdn-tos.pstatp.com/obj/goofy/xigua_fe/xigua_video_web_pc/static/media/bg.52432ed6.png"
        alt="">
      <div style="background:#fff" class="user-info">
        <div>
          <v-avatar class="user-avatar" v-if="isLogin" color="teal" size="100">
            <v-img style="width: 102px;height:102px" v-if="userinfo.avatar" :src="userinfo.avatar"></v-img>
            <span v-if="userinfo.avatar===''" style="font-size: 20px"
              class="white--text">{{userinfo.username[0].toUpperCase()}}</span>
          </v-avatar>
          <div class="user">
            <div class="user-name">{{userinfo.username}}</div>
            <!-- 本地用户才能修改信息 -->
            <div v-if="this.strategy === 'local'" class="user-desc">{{userinfo.desc}}<span @click="()=>{visible = true}"
                class="edit">编辑...</span></div>
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
            <div @mouseenter="()=>{isShowLikeView = true}" @mouseleave="()=>{isShowLikeView = false}" class="num-item">
              <div class="num">{{0}}</div>
              <div class="num-name">获赞
              </div>
              <LikeView v-show="isShowLikeView" :name="userinfo.username" class="like-view"></LikeView>
            </div>
          </div>
          <v-btn @click="$router.push('/create/center')" class="create-btn" small color="error" elevation="2">前往创作平台
          </v-btn>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div style="padding-top: 150px ;background:#fff">
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
          <!-- 视频列表展示 -->
          <div v-if="this.videoList.length !== 0" class="video-wrap">
            <div class="video-list">
              <div v-for="item in videoList" :key="item.id" class="video-item"
                @click="$router.push(`/videos/${item._id}`)">
                <div class="img-wrap">
                  <img :src="item.cover" alt="">
                </div>
                <div class="video-title">{{item.title}}</div>
                <div class="video-bottom">
                  <span class="num">{{item.lookNum}}次观看</span>
                  <span class="display-time">{{formatDate(item.createdAt)}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 数据为空 -->
          <Empy v-if="this.videoList.length === 0" title="你还没有发布过任何视频" to="/create/display"></Empy>
        </div>
      </v-tab-item>
      <v-tab-item class="tab-item">
        <!-- 视频 -->
        <div class="video">
          <Empy title="你还没有发布过任何文章" to="/create/display"></Empy>
        </div>
      </v-tab-item>
      <v-tab-item class="tab-item">
        <!-- 视频 -->
        <div class="video">
          <Empy title="你还没有发布过任何音频" to="/create/display"></Empy>
        </div>
      </v-tab-item>
    </v-tabs-items>

  </div>
</template>

<script>
import Upload from '@/components/Upload.vue'
import LikeView from '@/components/LikeView.vue';
import UserInfo from '@/components/UserInfo.vue';
import Empy from '@/components/Empy'
import moment from 'moment';
import 'moment/locale/zh-cn'
import { mapState } from 'vuex'
import { Base64 } from 'js-base64';
export default {
  auth: true,
  data () {
    return {
      visible: false, // 是否显示编辑框
      isShowLikeView: false, // 是否显示点赞面板
      tab: 0,
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
      ],
      videoList: [] // 用户视频列表
    }
  },
  computed: {
    ...mapState({
      userinfo: state => state.auth.user || {},
      strategy: state => state.auth.strategy,
      isLogin: state => state.auth.loggedIn
    })
  },
  components: {
    LikeView,
    UserInfo,
    Empy
  },
  methods: {
    closeEdit () {
      this.visible = false
    },
    async getVideoList () {
      try {
        // 获取用户id
        if (process.client) {
          const storage = window.localStorage
          if (storage.getItem('user')) {
            var temp = JSON.parse(Base64.decode(storage.getItem('user')));
          }
        }
        // 获取本地id
        const res = await this.$axios.get('videos', {
          params: {
            query: {
              where: {
                uid: temp._id,
              },
              limit: 10,
              skip: 0
            }
          }
        })
        if (res.statusText === 'OK') {
          this.videoList = res.data.data
        } else {
          this.$message.error({
            content: '请求错误'
          })
        }
      } catch (error) {
        console.log(error)
      }

    },
    // 评论日期处理
    formatDate (date) {
      let newTiem = moment(date).fromNow();;
      return newTiem
    }
  },

  mounted () {
    this.getVideoList()
  }

}
</script>

<style lang="sass" scoped>
.user-home
  height: 100%
  width: 100%
  overflow-y: auto
  .list-item
    width: 200px
    display: flex
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
  backgrouund: #fff
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
      left: 70%
      top: 80%
      z-index: 9
    .create-btn
      margin-top: 10px
    .num-list
      cursor: pointer
      display: flex
      padding: 0 20px
      margin: 0 30px
      font-size: 16px
      color: #646464
      border-right: 1px solid #f0f0f0
      .num-item
        margin: 0 12px
        text-align: center
  .user-avatar
    position: absolute
    top: -30%
    left: 30px
  .user
    padding: 10px 140px
    .edit
      padding-left: 20px
      color: #ff6060
      cursor: pointer
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
  .video-wrap
    width: 100%
    height: 100%
    padding: 24px 32px
    .video-list
      display: flex
      .video-item
        width: 210px
        height: 355px
        margin-right: 15px
        margin-bottom: 40px
        background-color: #fff
        border-radius: 5px
        .img-wrap
          overflow: hidden
          height: 289px
          width: 210px
          img
            cursor: pointer
            border-radius: 5px
            height: 289px
            width: 100%
            transition: all 0.6s
            overflow: hidden
          img:hover
            transform: scale(1.2)
        .video-title
          cursor: pointer
          font-size: 15px
          color: #000
          margin: 8px 10px
          display: inline-block
          white-space: nowrap
          width: 189px
          overflow: hidden
          text-overflow: ellipsis
        .video-bottom
          margin: 0 10px
          span
            color: #666
            font-size: 12px
            margin: 4px 14px 0 0
</style>
