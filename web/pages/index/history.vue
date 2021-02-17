<template>
  <div class="content">
    <div class="nav-top">
      <v-tabs class="tabs" background-color="transparent" align-with-title v-model="tab">
        <v-tab>全部历史</v-tab>
        <v-tab>视频</v-tab>
        <v-tab>文章</v-tab>
      </v-tabs>
      <div class="nav-right">
        <a-icon style="font-size: 16px;margin-right: 10px" theme="twoTone" type="delete" />
        <div>一键清空</div>
      </div>
    </div>
    <div class="conten-wrap">
      <v-tabs-items v-model="tab">
        <v-tab-item class="tab-item">
          <!-- 视频 -->
          <div v-infinite-scroll="handleInfiniteOnLoad" class="video" :infinite-scroll-disabled="busy"
            :infinite-scroll-distance="10">
            <div class="day-item">
              <div class="day-time">今天</div>
              <div class="video-list">
                <div v-for="o in num" :key="o" class="video-item">
                  <div class="img-wrap">
                    <img
                      src="https://p9-xg.byteimg.com/img/tos-cn-i-0004/a19770be97cc46e0a54d9994b7e83bc8~tplv-xg-center-qs:840:470:q75.webp"
                      alt="">
                    <span class="drution">08:10</span>
                  </div>
                  <div class="avatar-wrap">
                    <img
                      src="https://p3-xg.byteimg.com/img/pgc-image/fca0126d0dc44d0da3f222419c55968a~tplv-xg-center-qs:88:88:q75.webp"
                      alt="">
                  </div>
                  <div class="authod">地理游天下</div>
                  <div class="video-title">一线城市广州，是否已超越世界最繁华的香港？卫星地图带你了解一下</div>
                  <div class="video-info">598次观看 · 2个月前</div>
                </div>
              </div>

            </div>
            <div class="day-item">
              <div class="day-time">昨天</div>
              <div class="video-list">
                <div v-for="o in 2" :key="o" class="video-item">
                  <div class="img-wrap">
                    <img
                      src="https://p9-xg.byteimg.com/img/tos-cn-i-0004/a19770be97cc46e0a54d9994b7e83bc8~tplv-xg-center-qs:840:470:q75.webp"
                      alt="">
                    <span class="drution">08:10</span>
                  </div>
                  <div class="avatar-wrap">
                    <img
                      src="https://p3-xg.byteimg.com/img/pgc-image/fca0126d0dc44d0da3f222419c55968a~tplv-xg-center-qs:88:88:q75.webp"
                      alt="">
                  </div>
                  <div class="authod">地理游天下</div>
                  <div class="video-title">一线城市广州，是否已超越世界最繁华的香港？卫星地图带你了解一下</div>
                  <div class="video-info">598次观看 · 2个月前</div>
                </div>
              </div>
            </div>
            <div class="day-item">
              <div class="day-time">更早</div>
              <div class="video-list">
                <div v-for="o in 10" :key="o" class="video-item">
                  <div class="img-wrap">
                    <img
                      src="https://p9-xg.byteimg.com/img/tos-cn-i-0004/a19770be97cc46e0a54d9994b7e83bc8~tplv-xg-center-qs:840:470:q75.webp"
                      alt="">
                    <span class="drution">08:10</span>
                  </div>
                  <div class="avatar-wrap">
                    <img
                      src="https://p3-xg.byteimg.com/img/pgc-image/fca0126d0dc44d0da3f222419c55968a~tplv-xg-center-qs:88:88:q75.webp"
                      alt="">
                  </div>
                  <div class="authod">地理游天下</div>
                  <div class="video-title">一线城市广州，是否已超越世界最繁华的香港？卫星地图带你了解一下</div>
                  <div class="video-info">598次观看 · 2个月前</div>
                </div>
              </div>
            </div>
            <a-spin style="padding: 30px 0" v-if="loading&&!busy" class="demo-loading" />
          </div>
          <!-- 加载中 -->
          <!-- 数据为空 -->
          <Empy v-if="false" title="你没有观看记录哦" btnValue="去发现" to="/"></Empy>
        </v-tab-item>
        <v-tab-item class="tab-item">
          <!-- 视频 -->
          <div class="video">
            <Empy title="你还没有观看过任何视频哦" btnValue="去发现" to="/"></Empy>
          </div>
        </v-tab-item>
        <v-tab-item class="tab-item">
          <!-- 视频 -->
          <div class="video">
            <Empy title="你还没有观看过任何文章哦" btnValue="去发现" to="/"></Empy>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import Empy from '../../components/Empy'
export default {
  data () {
    return {
      tab: 0,
      loading: false,
      num: 5,
      busy: false
    }
  },
  methods: {
    handleInfiniteOnLoad () {
      this.loading = true;
      //   setTimeout(() => {
      //     this.num = this.num + 10
      //     this.loading = false;
      //   }, 2000)
    }
  },
  components: {
    Empy
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  height: 95vh;
  .nav-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 50px;
    background-color: #fff;
    .nav-right {
      display: flex;
      align-items: center;
      padding: 0 20px;
      cursor: pointer;
      width: 200px;
      color: #999999;
    }
    .nav-right:hover {
      color: #2196f3;
    }
  }
  .conten-wrap {
    flex: 1;
    overflow: auto;
    background-color: #f8f8f8;
  }
  .video {
    width: 100%;
    height: 85vh;
    background-color: #f7f7f7;
    display: flex;
    flex-direction: column;
    padding: 0 30px;
    .day-time {
      padding: 40px 0 15px 0;
      font-size: 26px;
      font-weight: 500;
    }
    .video-list {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      justify-content: flex-start;
      .video-item {
        width: 335px;
        height: 300px;
        position: relative;
        // margin-right: 13px;
        cursor: pointer;
        .img-wrap {
          width: 335px;
          height: 190px;
          border-radius: 6px;
          position: relative;
          overflow: hidden;
          img {
            width: 335px;
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
}
</style>