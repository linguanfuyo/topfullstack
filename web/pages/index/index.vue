<template>
  <div class="conten">
    <!-- 文章列表 -->
    <div class="article-list">
      <div class="article-item" v-for="item in articleList" :key="item._id" @click="$router.push(`/articles/${item._id}`)">
        <div class="article-title">{{item.title}}</div>
        <div class="article-titme">{{formatDate(item.createdAt)}}</div>
      </div>
    </div>
    <!-- 番剧列表 -->
    <div class="Collection-list" v-if="false">
      <div @mouseenter="()=>{index=o}" @mouseleave="()=>{index=-1}" v-for="o in 8" :key="o" class="Collection-item">
        <div v-show="o!==index">
          <div class="img-wrap">
            <img
              src="https://p1-xg.byteimg.com/img/xigua-lvideo-pic/4df848c4901a4da86bdb0a45b0ccd9c6~tplv-xg-center-qs:574:802:q75.jpg"
              alt="">
            <span class="drution">2集全</span>
          </div>
          <span class="Collection-name">看见中国：咸鸭上的烤鸡</span>
          <span class="Collection-desc">与世隔绝的村庄</span>
        </div>
        <div class="hover-wrap" v-show="o===index">
          <img src="https://p9-xg.byteimg.com/img/xigua-lvideo-pic/8d0a39fc9ad227aa07c42936df7a7428~tplv-noop.webp"
            alt="">
          <div class="hover-info">
            <span class="info-name">看见中国：咸鸭上的烤鸡</span>
            <span class="info-type">类型：纪录片/中国大陆/2021</span>
            <span class="info-desc">简介：在湖北恩施的幽谷茂林之中有一个与世隔绝的村庄，叫渔山村。一条悬挂于两山之间的简易索道成为进出这个村庄的“生命线”。
              管理员张新建和他的父亲一直默默地守护着这条索道十六年，见证了村庄的变化及人们的喜怒哀乐。2014年，渔山村通往铁炉乡的公路贯通了，闭塞的渔山村终于打通了与外界的通道。</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 短视频列表 -->
    <div v-infinite-scroll="handleInfiniteOnLoad" class="demo-infinite-container" :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="10">
      <div class="video-list">
        <div v-for="item in videoList" :key="item._id" class="video-item"  @click="$router.push(`/videos/${item._id}`)">
          <div class="img-wrap">
            <img
              :src="item.cover"
              alt="">
            <span class="drution">{{item.duration}}</span>
          </div>
          <div v-if="item.uid" class="avatar-wrap">
            <img
              :src="item.uid.avatar || 'http://p4.music.126.net/rTEHhwE2t2EJUWFcYYU9HA==/19243652509565097.jpg'"
              alt="">
          </div>
          <div v-if="item.uid" class="authod">{{item.uid.username}}</div>
          <div class="video-title">{{item.title}}</div>
          <div class="video-info">{{item.lookNum}}次观看 · {{formatDate(item.createdAt)}}</div>
        </div>
      </div>
    </div>
    <a-spin v-if="loading&&!busy" class="demo-loading" />
  </div>
</template>

<script>
import moment from 'moment';
import 'moment/locale/zh-cn'
export default {
  loading: {
    continuous: true
  },
  data () {
    return {
      index: -1,
      loading: false,
      busy: false,
      videoList: [],
      articleList: []
    }
  },
  mounted(){
    this.getData()
  },
  methods: {
    async getData(){
      try {
        const res = await this.$axios.$post('auth/home', {})
        this.articleList = res.data.articleList
        this.videoList = res.data.videoList
      } catch (error) {
        console.log(error)
      }
    },
    // 评论日期处理
    formatDate (date) {
      let newTiem = moment(date).fromNow();;
      return newTiem
    },
    handleInfiniteOnLoad () {
      this.loading = true;
      setTimeout(() => {
        this.num = this.num + 10
        this.loading = false;
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
.conten {
  display: flex;
  flex-direction: column;
  padding: 55px 40px;
  .article-list {
    .article-item {
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 15px;
      cursor: pointer;
      .article-title {
        font-weight: 500;
        color: #1e1e1e;
        font-size: 16px;
      }
      .article-title:hover {
        color: #2196f3;
      }
      .article-titme {
        color: #666666;
      }
    }
    .article-item:hover {
      box-shadow: 0 5px 5px #e5e5e5;
    }

  }
  .Collection-list {
    display: flex;
    justify-content: space-between;
    .Collection-item:hover {
      transform: scale(1.1);
    }
    .hover-wrap {
      width: 100%;
      height: 360px;
      background-color: #fff;
      box-shadow: 0 0 10px #54545a;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      .hover-info {
        display: flex;
        flex-direction: column;
        padding: 15px;
        .info-name {
          font-size: 18px;
          padding: 10xp 0px;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .info-type {
          font-size: 13px;
          color: #666;
          padding: 5px 0;
        }
        .info-name:hover {
          color: #2196f3;
        }
        .info-desc {
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          line-clamp: 4;
          -webkit-box-orient: vertical;
          color: #666;
          padding: 15px 0 0 0;
        }
      }
      img {
        height: 145px;
        width: 100%;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
      }
    }
    .Collection-item {
      width: 16%;
      margin-right: 20px;
      height: 360px;
      display: flex;
      flex-direction: column;
      transition: all 0.4s;
      cursor: pointer;
      .img-wrap {
        position: relative;
        img {
          width: 100%;
          height: 300px;
          border-radius: 6px;
        }
        .drution {
          background-color: rgba($color: #000000, $alpha: 0.8);
          color: #fff;
          font-size: 12px;
          border-radius: 3px;
          line-height: 22px;
          position: absolute;
          padding: 0 3px;
          right: 10px;
          bottom: 10px;
        }
      }
      .Collection-name {
        font-size: 16px;
        display: block;
        margin: 10px 0 5px 0;
      }
      .Collection-desc {
        color: #666;
        display: block;
      }
    }
  }
  .video-list {
    display: flex;
    margin-top: 50px;
    flex-wrap: wrap;
    .video-item {
      width: 16%;
      height: 300px;
      position: relative;
      cursor: pointer;
      margin-right: 13px;
      .img-wrap {
        width: 100%;
        height: 190px;
        border-radius: 6px;
        position: relative;
        overflow: hidden;
        img {
          width: 100%;
          height: 190px;
          border-radius: 6px;
          transition: all 0.3s;
        }
        img:hover {
          transform: scale(1.2);
        }
        .drution {
          background-color: rgba($color: #000000, $alpha: 0.7);
          color: #fff;
          font-size: 12px;
          border-radius: 3px;
          line-height: 22px;
          position: absolute;
          padding: 0 3px;
          right: 10px;
          bottom: 10px;
          font-weight: 500;
        }
      }
      .avatar-wrap {
        width: 41px;
        height: 41px;
        border-radius: 50%;
        background-color: #f8f8f8;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 10px;
        top: 175px;
        img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
        }
      }
      .authod {
        font-size: 13px;
        padding: 6px 20px 10px 60px;
      }
      .authod:hover {
        color: #2196f3;
      }
      .video-title {
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .video-title:hover {
        color: #2196f3;
      }
      .video-info {
        display: block;
        color: #666;
        font-size: 12px;
      }
    }
  }
}
</style>