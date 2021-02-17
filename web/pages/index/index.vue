<template>
  <div class="conten">
    <div class="Collection-list">
      <div @mouseenter="()=>{index=o}" @mouseleave="()=>{index=-1}" v-for="o in 6" :key="o" class="Collection-item">
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
    <div v-infinite-scroll="handleInfiniteOnLoad" class="demo-infinite-container" :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="10">
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
    <a-spin v-if="loading&&!busy" class="demo-loading" />
  </div>
</template>

<script>
export default {
  loading: {
    continuous: true
  },
  data () {
    return {
      index: -1,
      loading: false,
      num: 20,
      busy: false
    }
  },
  methods: {
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
      margin-right: 0 30px;
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
      flex: 1;
      width: 345px;
      height: 300px;
      position: relative;
      cursor: pointer;
      .img-wrap {
        width: 345px;
        height: 190px;
        border-radius: 6px;
        position: relative;
        overflow: hidden;
        img {
          width: 345px;
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