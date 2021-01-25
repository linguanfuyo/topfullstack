<template>
  <div class="content pa-3">
    <v-row>
      <v-col :md="9">
        <!-- 视频播放区域 -->
        <div class="container">
          <keep-alive>
            <video-player class="video-player-box" ref="videoPlayer" :options="playerOptions" :playsinline="true"
              customEventName="customstatechangedeventname" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)"
              @ended="onPlayerEnded($event)" @waiting="onPlayerWaiting($event)" @playing="onPlayerPlaying($event)"
              @loadeddata="onPlayerLoadeddata($event)" @timeupdate="onPlayerTimeupdate($event)"
              @canplay="onPlayerCanplay($event)" @canplaythrough="onPlayerCanplaythrough($event)"
              @statechanged="playerStateChanged($event)" @ready="playerReadied">
            </video-player>
          </keep-alive>
          <div v-if="video._id" class="title">
            <div class="left-btn">
              <!-- 点赞 -->
              <div class="left-item">
                <like-btn @change="getVideoInfo" type="Video" :object="video._id" action="like" :num="video.likeNum">
                </like-btn>
              </div>
              <!-- 不点赞 -->
              <div class="left-item">
                <like-btn @change="getVideoInfo" type="Video" :object="video._id" action="unLike"
                  :num="video.unlikeNum">
                </like-btn>
              </div>
              <!-- 收藏 -->
              <div class="left-item">
                <like-btn @change="getVideoInfo" type="Video" :object="video._id" action="collection"
                  :num="video.collectNum"></like-btn>
              </div>
              <!-- 分享 -->
              <div @mouseenter="()=>{isShowShareView = true}" @mouseleave="()=>{isShowShareView = false}"
                class="share-content left-item">
                <v-btn icon color="#9a999b">
                  <v-icon>share</v-icon>
                </v-btn>
                <span>分享</span>
                <div v-show="isShowShareView" class="share-wrap">
                  <div class="platform">
                    <div v-for="item in shareList" :key="item.name" class="share-item">
                      <div :style="{'background-color': item.color}" class="bg">
                        <a-icon :style="{ fontSize: '22px', color: '#fff' }" :type="item.icon" />
                      </div>
                      <div class="share-name">{{item.name}}</div>
                    </div>
                  </div>
                  <div class="address">
                    <span>视频地址</span>
                    <input @click="copy" disabled ref="link" class="src"
                      value="https://www.ixigua.com/6912966026560799236?logTag=IIet6Ui2zf_0x2rLBG2BX" />
                    <div @click="copy" class="copy">复制</div>
                  </div>
                </div>
              </div>
              <!-- 举报 -->
              <div @click="report(video._id)" class="left-item">
                <v-btn icon color="#9a999b">
                  <v-icon>warning</v-icon>
                </v-btn>
                <span>举报</span>
              </div>
            </div>
            <div class="right-time">
              <span>{{video.lookNum}}次观看 · {{0}}条弹幕 · 发布于
                {{video.createdAt?video.createdAt.substring(0,10): '2021-mm-dd'}}
                · 原创</span>
            </div>
          </div>
        </div>
        <!-- 视频详情 -->
        <div class="video-info pa-3">
          <div style="display:flex;jusitify-content: space-between">
            <div class="video-title">
              {{video.title}}
            </div>
            <a-button @click="downLoad(video.file)" type="primary" shape="round" icon="cloud-download">下载</a-button>
          </div>
          <div class="video-desc">
            {{video.desc}}
          </div>
        </div>
        <div class="autho">
          <v-avatar style="cursor: pointer;" class="user" color="teal" size="54">
            <v-img v-if="authod.avatar!==''" :src="authod.avatar"></v-img>
            <span v-if="authod.avatar===''" class="white--text">{{authod.username[0].toUpperCase()}}</span>
          </v-avatar>
          <div class="autho-info">
            <div class="autho-name">{{authod.username}}</div>
            <div style="cursor: pointer;" class="autho-num">
              <span class="fans">{{authod.followNum}}粉丝 </span>
              <span class="video-num"> {{authod.videoNum}}视频</span>
            </div>
          </div>
          <like-btn @change="getVideoInfo" type="User" :object="authod._id" action="follow">
          </like-btn>
        </div>
        <div class="comment-wrap">
          <CommentList v-if="video._id" :from="video._id"></CommentList>
        </div>
      </v-col>

      <!-- 右侧推荐 -->
      <v-col :md="3.5">
        <div class="video-list">
          <div @click="$router.push(`/videos/${item._id}`)" v-for="item in recommentList" :key="item._id"
            class="video-item">
            <div class="video-left">
              <img class="video-cover" :src="item.cover" alt="">
              <div class="video-dration">{{item.duration}}</div>
            </div>
            <div v-if="item.uid" class="video-right">
              <span class="video-title">{{item.title}}</span>
              <span class="authod-name">{{item.uid.username}}</span>
              <span class="video-looknum">{{item.lookNum}}次观看</span>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import LikeBtn from '@/components/LikeBtn.vue'
import CommentList from '@/components/CommentList.vue'
import { mapState } from 'vuex'
export default {
  components: {
    LikeBtn,
    CommentList,
  },
  data () {
    return {
      isShowShareView: false, // 是否显示分享
      // 视频详情
      video: {
        likeNum: 0
      },
      recommentList: [], // 推荐视频
      // 作者详情
      authod: {},
      // 分享列表
      shareList: [
        {
          name: '微信',
          color: '#13d36a',
          icon: 'wechat'
        },
        {
          name: 'QQ',
          color: '#5cb2ff',
          icon: 'qq'
        },
        {
          name: '飞书',
          color: '#ffa838',
          icon: 'twitter'
        },
        {
          name: '微博',
          color: '#fd4c15',
          icon: 'weibo'
        }
      ],
      // component options
      playsinline: true,
      // videojs options
      playerOptions: {
        sourceOrder: true,
        hls: true, //启用hls？
        muted: false,
        language: 'zh-CN',
        autoplay: true,
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        fluid: true,
        preload: 'auto',
        aspectRatio: '16:9',
        sources: [{
          type: "video/mp4",
          src: 'http://lgf-tofullstack.oss-cn-hangzhou.aliyuncs.com/ec039ead3ff0c9f14bc0012188b544f3.mp4', // 替代无视频资源
        }],
        poster: '',
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: true,
          fullscreenToggle: true  //全屏按钮
        }
      }
    }
  },
  watch: {
    '$route' (to, from) {
      // 监听路由的变化，做你想做的一些事情...
      // this.init()
      this.updateVideo()
    }
  },
  computed: {
    ...mapState({
      type: state => state.reportType
    })
  },
  methods: {
    // 举报
    report (id) {
      this.$store.commit('setVal', {
        valName: 'reportType',
        val: 'Video'
      })
      this.$store.commit('setVal', {
        valName: 'reportObject',
        val: id
      })
      this.$store.commit('setVal', {
        valName: 'isShowReport',
        val: true
      })
    },
    // 视频下载
    async downLoad (url) {
      window.open(url);
    },
    // 复制
    copy () {
      this.$refs.link.select()
      document.execCommand("Copy")
      this.$message.open({
        content: '复制成功'
      })


    },
    // 更改视频播放量
    async updateVideo () {
      try {
        await this.getVideoInfo(true)
        const res = await this.$axios.$put(`videos/${this.$route.params.id}`, { 'lookNum': this.video.lookNum + 1 })
        if (res) {
          this.video.lookNum = res.lookNum
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 获取视频详情
    async getVideoInfo (value) {
      //关联查询课时
      try {
        const res = await this.$axios.$post(`videos/info`, {
          _id: this.$route.params.id
        })
        this.video = res.one
        this.recommentList = res.two
        this.authod = this.video.uid
        this.authod.followNum = res.static.followNum
        this.authod.videoNum = res.static.videoNum
        if (value) {
          this.playerOptions.sources[0].src = this.video.file
          this.playerOptions.poster = this.video.cover
        } else {

        }
      } catch (error) {
        console.log(error)
      }
    },
    // listen event
    onPlayerPlay (player) {
      // console.log('player play!', player)
    },
    onPlayerPause (player) {
      // console.log('player pause!', player)
    },
    onPlayerEnded (player) {
      // console.log('player ended!', player)
    },
    onPlayerLoadeddata (player) {
      // console.log('player Loadeddata!', player)
    },
    onPlayerWaiting (player) {
      // console.log('player Waiting!', player)
    },
    onPlayerPlaying (player) {
      // console.log('player Playing!', player)
    },
    onPlayerTimeupdate (player) {
      // console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay (player) {
      // console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough (player) {
      // console.log('player Canplaythrough!', player)
    },
    // or listen state event
    playerStateChanged (playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },
    // player is ready
    playerReadied (player) {
      // console.log('example 01: the player is readied', player)
    }
  },
  created () {
    this.updateVideo()
  },
  computed: {
  }
}
</script>

<style lang="scss">
.content {
  display: flex;
  background-color: #f6f6f6;
  .title {
    align-items: center;
    display: flex;
    justify-content: space-between;
    background-color: #18171a;
    height: 50px;
    .left-btn {
      margin-left: 10px;
      display: flex;
      align-items: center;
      .left-item {
        font-size: 13px;
        color: #666;
        margin-right: 4px;
        position: relative;

        .share-wrap {
          width: 350px;
          height: 170px;
          background-color: #fff;
          border-radius: 6px;
          box-shadow: 0px 0px 4px #ccc;
          position: absolute;
          bottom: -170px;
          z-index: 9;
          .platform {
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding-top: 25px;
            .share-item {
              display: flex;
              flex-direction: column;
              align-items: center;
              .bg {
                width: 42px;
                height: 42px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
              }
              .share-name {
                font-size: 13px;
                color: #666;
                padding-top: 3px;
              }
            }
          }

          .address {
            display: flex;
            align-items: center;
            margin: 20px auto 30px auto;
            justify-content: center;
            span {
              font-size: 13px;
              padding-right: 10px;
            }
            .src {
              width: 190px;
              height: 30px;
              padding: 0 10px;
              background-color: #f6f6f6;
              border: 1px solid #eeeeee;
              color: #666;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              line-height: 30px;
              font-size: 13px;
              cursor: pointer;
            }
            .copy {
              height: 30px;
              width: 45px;
              background-color: #2079c7;
              color: #fff;
              text-align: center;
              line-height: 30px;
              font-size: 13px;
              cursor: pointer;
            }
          }
        }
      }
    }
    .right-time {
      font-size: 14px;
      color: #666;
      margin-right: 20px;
    }
  }
  .video-info {
    .video-title {
      width: 100%;
      font-size: 24px;
      color: #1d1d1d;
    }
    .video-desc {
      font-size: 15px;
      color: #666;
      padding-top: 8px;
    }
  }
  .autho {
    display: flex;
    align-items: center;
    margin-left: 12px;
    .autho-info {
      margin: 0 60px 0 10px;
      .autho-name {
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
      }
      .autho-name:hover {
        color: #2196f3;
      }
    }
  }
  .comment-wrap {
    display: flex;
    flex-direction: column;
    margin: 12px;
    padding: 20px 0;
  }
  .video-list {
    padding-top: 12px;
    .video-item {
      max-width: 400px;
      height: 90px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      .video-left {
        position: relative;
        cursor: pointer;
        border-radius: 6px;
        img {
          width: 160px;
          height: 90px;
          border-radius: 6px;
          background-color: pink;
        }
        .video-dration {
          border-radius: 2px;
          width: 40px;
          height: 15px;
          background-color: rgba($color: #000000, $alpha: 0.5);
          text-align: center;
          line-height: 15px;
          color: #f6f6f6;
          position: absolute;
          right: 5px;
          bottom: 5px;
        }
      }
      .video-right {
        width: 220px;
        height: 100%;
        display: flex;
        flex-direction: column;
        .video-title {
          font-size: 15px;
          color: #1d1d1d;
          cursor: pointer;
          &:hover {
            color: #2b81d6;
          }
        }
        .authod-name {
          color: #666;
          padding: 2px 0;
          cursor: pointer;
        }
        .video-looknum {
          color: #666;
          cursor: pointer;
        }
      }
    }
  }

  // 播放按钮样式
  .video-js .vjs-big-play-button {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 75px;
  }
  .video-js .vjs-control-bar {
    background-color: rgba($color: #000000, $alpha: 0.3);
  }
  .video-js .vjs-slider {
    background-color: skyblue;
  }
  .video-js .vjs-play-progress {
    background-color: #2279c3;
  }
  .container {
    .video-player-box {
      .video-js {
        height: 410px;
      }
    }
  }
}
</style>