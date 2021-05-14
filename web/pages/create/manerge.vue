<template>
  <div class="content">
    <div>
      <v-tabs class="tabs" background-color="transparent" align-with-title v-model="tab">
        <v-tab>视频{{videoList.length}}</v-tab>
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
              <div v-for="item in videoList" :key="item._id" class="video-item">
                <div class="image" @click="$router.push(`/videos/${item._id}`)">
                  <img :src="item.cover || 'http://lgf-tofullstack.oss-cn-hangzhou.aliyuncs.com/2b0d24e286c97ec167ff3ddb11a24f3b.jpg'"
                    alt="">
                    <div class="label">
                      <span class="status">{{item.status === '1' ? '已发布': '未通过'}}</span>
                    </div>
                    <span class="drution">{{item.duration || '00:00'}}</span>
                </div>
                <div class="item-info">
                  <div @click="$router.push(`/videos/${item._id}`)" class="title">{{item.title}}</div>
                  <div class="info-bottom">
                    <div class="info-item">
                      <span class="item-name">播放</span>
                      <span class="num">{{item.lookNum}}</span>
                    </div>
                    <div class="info-item">
                      <span class="item-name">点赞</span>
                      <span class="num">{{item.likeNum}}</span>
                    </div>
                    <div class="info-item">
                      <span class="item-name">收藏</span>
                      <span class="num">{{item.collectNum}}</span>
                    </div>
                    <div class="info-item">
                      <span class="item-name">评论</span>
                      <span class="num">{{item.commentNum}}</span>
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
                      <div @click="deleteVidoe(item._id)" style="font-size:14px;cursor: pointer;">
                        删除
                      </div>
                    </template>
                    <a-icon style="cursor: pointer; font-size: 16px;margin-left:10px;font-weight:500" type="ellipsis" />
                  </a-popover>
                </div>
              </div>
               <div v-if="videoList.length !==0" style="color:#747e8c;font-size:13px;text-align:center">没有更多数据了</div>
            </div>
            <!-- 数据为空 -->
            <Empy v-if="videoList.length ===0" title="你还没有发布过任何视频" to="/create/display"></Empy>
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
import { Base64 } from 'js-base64';
export default {
  data () {
    return {
      tab: 0,
      videoList: [] // 用户视频列表
    }
  },
  components: {
    Empy
  },
  methods:{
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
    async deleteVidoe (_id) {
      try {
        // 获取本地id
        const res = await this.$axios.post('/videos/delete', {
              _id: _id
        })
        console.log(res)
        if(res.data.code === 200){
          this.$message.success({
            content: res.data.msg
          })
          this.getVideoList()
        }else {
          this.$message.error({
            content: res.data.msg
          })
        }
      } catch (error) {
        console.log(error)
      }
    },

  },
  mounted () {
    this.getVideoList()
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
          position: relative;
          .label {
            position: absolute;
            right: 0px;
            top: 0px;
            display: flex;
            justify-content: space-between;
            padding: 10px;
            align-items: center;
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