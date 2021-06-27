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
  .video-list {
    display: flex;
    margin-top: 50px;
    flex-wrap: wrap;
    .video-item {
      width: 23%;
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