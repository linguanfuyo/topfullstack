<template>
  <div class="content">
    <div>
      <v-tabs class="tabs" background-color="transparent" align-with-title v-model="tab">
        <v-tab>视频{{0}}</v-tab>
        <v-tab>文章{{0}}</v-tab>
        <v-tab>音乐{{0}}</v-tab>
      </v-tabs>
    </div>
    <div class="conten-wrap">
      <v-tabs-items v-model="tab">
        <v-tab-item class="tab-item">
          <!-- 视频 -->
          <div class="video">
            <div class="video-list">
              <div v-for="o in 10" :key="o" class="video-item">
                <div class="image">
                  <img src="http://lgf-tofullstack.oss-cn-hangzhou.aliyuncs.com/2b0d24e286c97ec167ff3ddb11a24f3b.jpg"
                    alt="">
                </div>
                <div class="item-info">
                  <div class="title">刺客伍六柒</div>
                  <div class="info-bottom">
                    <div class="info-item">
                      <span class="item-name">播放</span>
                      <span class="num">128</span>
                    </div>
                    <div class="info-item">
                      <span class="item-name">点赞</span>
                      <span class="num">55</span>
                    </div>
                    <div class="info-item">
                      <span class="item-name">收藏</span>
                      <span class="num">10</span>
                    </div>
                    <div class="info-item">
                      <span class="item-name">评论</span>
                      <span class="num">5</span>
                    </div>
                  </div>
                </div>
                <div class="item-right">
                  <a-popover @click="$router.push('/create/statistics')" trigger="hover">
                    <template slot="content">
                      <div style="font-size:14px;cursor: pointer;">
                        统计
                      </div>
                    </template>
                    <a-icon style="cursor: pointer;font-size: 16px;margin-left:10px;font-weight:500" type="bar-chart" />
                  </a-popover>
                  <a-popover @click="$router.push('/create/comment')" trigger="hover">
                    <template slot="content">
                      <div style="font-size:14px;cursor: pointer;">
                        评论
                      </div>
                    </template>
                    <a-icon style="cursor: pointer;font-size: 16px;margin-left:10px;font-weight:500" type="message" />
                  </a-popover>
                  <a-popover trigger="click">
                    <template slot="content">
                      <div style="font-size:14px;cursor: pointer;">
                        删除
                      </div>
                    </template>
                    <a-icon style="cursor: pointer; font-size: 16px;margin-left:10px;font-weight:500" type="ellipsis" />
                  </a-popover>
                </div>
              </div>
              <div style="color:#747e8c;font-size:13px;text-align:center">没有更多数据了</div>
            </div>
            <!-- 数据为空 -->
            <Empy v-if="false" title="你还没有发布过任何视频" to="/create/display"></Empy>
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
  </div>
</template>

<script>
import Empy from '../../components/Empy'
export default {
  data () {
    return {
      tab: 0
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
  .conten-wrap {
    flex: 1;
    overflow: auto;
    background-color: #f8f8f8;
  }
  .video {
    width: 100%;
    height: 85vh;
    overflow: auto;
    background-color: #f7f7f7;
    display: flex;
    justify-content: center;
    .video-list {
      margin: 70px;
      width: 100%;
      .video-item {
        padding: 15px;
        width: 100%;
        background-color: #fff;
        margin-bottom: 20px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        .image {
          height: 136px;
          width: 240px;
          border-radius: 4px;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3 ease;
          img {
            height: 136px;
            width: 240px;
            border-radius: 4px;
            transition: all 0.6s;
            overflow: hidden;
          }
          img:hover {
            transform: scale(1.2);
          }
        }
        .item-info {
          flex: 1;
          padding-left: 10px;
          display: flex;
          flex-direction: column;
          height: 136px;
          justify-content: space-between;
          .title {
            font-size: 13px;
            color: #1e1e1e;
            cursor: pointer;
          }
          .title:hover {
            color: #2196f3;
          }
          .info-bottom {
            display: flex;
            .info-item {
              padding-right: 15px;
              .item-name {
                color: #747e8c;
              }
            }
          }
        }
      }
    }
  }
}
</style>