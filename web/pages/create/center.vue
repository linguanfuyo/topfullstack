<template>
  <div>
    <div class="tisp">
      {{dateFormat(new Date())}}
      {{weekFormat(new Date())}}
    </div>
    <!-- 空状态 -->
    <div style="position:absolute;left:50%;top:50%;transform: translate(-50%,-50%);">
      <a-empty v-if="!isHaveData"
        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
        :image-style="{
        height: '200px'}">
        <span slot="description"> 你还没有发布过视频哦 </span>
        <a-button @click="$router.push('/create/display')" shape="round" type="primary">
          立即发布
        </a-button>
      </a-empty>
    </div>
    <div v-if="isHaveData" class="content column">
      <div class="top">
        <a-carousel dots autoplay>
          <div>
            <img src="https://sf1-dycdn-tos.pstatp.com/obj/eden-cn/nuvovhonuhog/xigua_web_creator/new_banner-2.jpg"
              alt="轮播图">
          </div>
          <div>
            <img src="https://p99.pstatp.com/origin/web-union/8fe9b5d5-4bdb-4a38-bd7e-183daad27451" alt="轮播图">
          </div>
          <div>
            <img src="https://sf3-scmcdn-tos.pstatp.com/obj/goofy/xigua_fe/xigua_video_web_pc/static/media/bg.52432ed6.png" alt="轮播图">
          </div>
        </a-carousel>
      </div>
      <div class="center">
        <div class="left-wrap">
          <div class="title">
            <div class="title-left">账号数据</div>
            <div class="title-right">详情</div>
          </div>
          <div class="data-list row">
            <div class="item column">
              <div class="name">总播放量</div>
              <div class="num">{{statistics.displayCount}}</div>
            </div>
            <div class="item column">
              <div class="name">粉丝数</div>
              <div class="num">{{statistics.followNum}}</div>
            </div>
            <div class="item column">
              <div class="name">总收益</div>
              <div class="num">0</div>
            </div>
          </div>
        </div>
        <div style="margin-left: 20px" class="left-wrap">
          <div class="title">
            <div class="title-left">今日数据</div>
            <div class="title-right">详情</div>
          </div>
          <div class="data-list row">
            <a-progress type="circle" :stroke-color="{
        '0%': '#108ee9',
        '100%': '#87d068',
      }" :percent="90" :format="percent => `今日播放:${percent}`" />
            <a-progress type="circle" :stroke-color="{
        '0%': '#108ee9',
        '100%': '#87d068',
      }" :percent="60" :format="percent => `今日收藏:${percent}`" />
            <a-progress type="circle" :stroke-color="{
        '0%': '#108ee9',
        '100%': '#87d068',
      }" :percent="10" :format="percent => `今日点赞:${percent}`" />
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="title">
          <div class="title-left">最新上传</div>
          <div class="title-right">详情</div>
        </div>
        <div class="bottom-wrap">
          <div @click="$router.push(`/videos/${newVideo._id}`)" class="wrap-left">
            <img class="big-img"
              :src="newVideo.cover" alt="">
            <img class="bg-img"
              :src="newVideo.cover" alt="">
            <div class="label">
              <span class="lable-left">{{newVideo.title || ''}}</span>
              <span class="status">{{newVideo.status === '1' ? '已发布': '未通过'}}</span>
            </div>
            <span class="drution">{{newVideo.duration || '00:00'}}</span>
          </div>
          <div class="wrap-right">
            <div class="right-item">
              <div class="name">播放量</div>
              <div class="num">{{newVideo.lookNum || 0}}</div>
            </div>
            <div class="right-item">
              <div>评论量</div>
              <div class="num">{{newVideo.commentNum || 0}}</div>
            </div>
            <div class="right-item">
              <div>点赞数</div>
              <div class="num">{{newVideo.likeNum || 0}}</div>
            </div>
            <div class="right-item">
              <div>收藏数</div>
              <div class="num">{{newVideo.collectNum || 0}}</div>
            </div>
            <div class="right-item">
              <div>不喜欢数</div>
              <div class="num">{{newVideo.unlikeNum || 0}}</div>
            </div>
            <div class="right-item">
              <div>弹幕量</div>
              <div class="num">122</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
moment.locale('zh-cn');
export default {
  data () {
    return {
      isHaveData: true,
      statistics: {},
      newVideo: {},
    }
  },
  components: {

  },
  mounted(){
    this.getData()
  },
  methods: {
    dateFormat (date) {
      return moment(date).format('L');
    },
    weekFormat (date) {
      return moment(date).format('dddd');
    },
    async getData () {
      try {
        // 获取本地id
        const res = await this.$axios.post('/auth/statistics', {})
        console.log(res)
        if(res.data.code === 200){
          this.statistics = res.data.data
          this.newVideo = this.statistics.newVideo
        }else {
          this.$message.error({
            content: res.data.msg
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.tisp {
  padding: 15px 20px;
  width: 100%;
  background-color: #fff;
  font-size: 16px;
  color: #747e8c;
  border-bottom: 1xp solid #747e8c;
}
.content {
  flex: 1;
  background-color: #f8f8f8;
  height: 90vh;
  padding: 30px 48px;
  overflow: hidden;
  .top {
    width: 100%;
    height: 150px;
    background-color: #fff;
    position: relative;
    border-radius: 3px;
    img {
      height: 150px;
      width: 100%;
      border-radius: 3px;
    }
    // 轮播图
    .ant-carousel >>> .slick-slide {
      border-radius: 3px;
      text-align: center;
      height: 115px;
      height: 115px;
      background: #364d79;
      overflow: hidden;
    }
  }
  .title {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    .title-left {
      font-size: 18px;
      color: #13161a;
    }
    .title-right {
      font-size: 13px;
      color: #525a66;
      cursor: pointer;
      line-height: 17px;
      padding: 3px;
    }
    .title-right:hover {
      background-color: #f6f6f6;
    }
  }
  .center {
    margin-top: 20px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    .left-wrap {
      border-radius: 6px;
      padding: 20px;
      background-color: #fff;
      width: 50%;

      .data-list {
        justify-content: space-around;
        padding-top: 20px;
        .item {
          padding: 20px 30px;
          cursor: pointer;
          .name {
            font-size: 13px;
            color: #13161a;
          }
          .num {
            font-size: 36px;
            color: #13161a;
          }
        }
        .item:hover {
          background-color: #f6f6f6;
        }
      }
    }
  }
  .bottom {
    padding: 20px;
    width: 100%;
    margin-top: 20px;
    background-color: #fff;
    border-radius: 6px;
    .bottom-wrap {
      display: flex;
      padding-top: 30px;
      align-items: center;
      .wrap-left {
        border-radius: 3px;
        background-color: #f8f8f8;
        width: 35%;
        height: 220px;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        .big-img {
          width: 400px;
          height: 400px;
          transform: scale(3);
          filter: blur(3px);
        }
        .bg-img {
          width: 35%;
          height: 220px;
          border-radius: 3px;
          position: absolute;
          z-index: 1;
          left: 50%;
          right: 50%;
          transform: translate(-50%);
          transition: all 0.3s;
        }
        .label {
          position: absolute;
          right: 0px;
          top: 10px;
          display: flex;
          justify-content: space-between;
          padding: 10px;
          align-items: center;
          width: 100%;
          .lable-left {
            color: #fff;
            font-size: 15px;
          }
          .status {
            background-color: #525a66;
            color: #fff;
            font-size: 12px;
            border-radius: 2px;
            line-height: 22px;
            display: block;
            padding: 0 3px;
          }
        }
        .drution {
          background-color: #1b1b22;
          color: #fff;
          font-size: 12px;
          border-radius: 2px;
          line-height: 22px;
          position: absolute;
          padding: 0 3px;
          right: 10px;
          bottom: 10px;
        }
      }
      .wrap-right {
        margin-left: 20px;
        flex: 1;
        height: 220px;
        display: flex;
        flex-wrap: wrap;
        .right-item {
          width: 30%;
          height: 95px;
          background-color: #f8f8f8;
          border-radius: 6px;
          cursor: pointer;
          margin: 10px 10px;
          padding: 15px 10px;
          .name {
            font-size: 13px;
            color: #13161a;
          }
          .num {
            font-size: 26px;
            color: #13161a;
          }
        }
        .right-item:hover {
          background-color: #ebebeb;
        }
      }
    }
  }
}
</style>