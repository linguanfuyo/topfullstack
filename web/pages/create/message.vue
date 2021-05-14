<template>
  <div class="content">
    <div>
      <v-tabs class="tabs" background-color="transparent" align-with-title v-model="tab">
        <v-tab>系统通知{{msgList.length}}</v-tab>
        <v-tab>用户通知{{0}}</v-tab>
      </v-tabs>
    </div>
    <div class="conten-wrap">
      <v-tabs-items v-model="tab">
        <v-tab-item class="tab-item">
          <!-- 视频 -->
          <div class="video">
            <div class="video-list">
              <div v-for="item in msgList" :key="item._id" class="video-item">
                <div class="image" >
                  <img :src="item.image || 'http://lgf-tofullstack.oss-cn-hangzhou.aliyuncs.com/2b0d24e286c97ec167ff3ddb11a24f3b.jpg'"
                    alt="">
                </div>
                <div class="item-info">
                  <div  class="title">{{item.title}}</div>
                  <div>
                    {{item.content}}
                  </div>
                  <div class="info-bottom">
                    <div class="info-item">
                      <span class="item-name">发布时间</span>
                      <span class="num">{{dateFormat(item.createdAt)}}</span>
                    </div>
                  </div>
                </div>
                <div class="item-right">
                  <a-popover trigger="click">
                    <template slot="content">
                      <div @click="deleteVidoe(item._id)" style="font-size:14px;cursor: pointer;">
                        忽略
                      </div>
                    </template>
                    <a-icon style="cursor: pointer; font-size: 16px;margin-left:10px;font-weight:500" type="ellipsis" />
                  </a-popover>
                </div>
              </div>
              <div v-if="msgList.length !==0" style="color:#747e8c;font-size:13px;text-align:center">没有更多通知了了</div>
            </div>
            <!-- 数据为空 -->
            <Empy v-if="msgList.length===0" title="你还没有收到系统通知哦" :isShowBtn="false"></Empy>
          </div>
        </v-tab-item>
        <v-tab-item class="tab-item">
          <!-- 视频 -->
          <div class="video">
            <Empy title="你还没有小伙伴的通知哦" :isShowBtn="false"></Empy>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import Empy from '../../components/Empy'
import moment from 'moment';
moment.locale('zh-cn');
export default {
  data () {
    return {
      tab: 0,
      msgList: [] 
    }
  },
  components: {
    Empy
  },
  methods:{
    dateFormat (date) {
      return moment(date).format('L');
    },
    async getMsgList () {
      try {
        // 获取本地id
        const res = await this.$axios.post('/notice/msgList', {type:1})
        console.log(res)
        if(res.data.code === 200){
          this.msgList = res.data.data.list
        }else {
          this.$message.error({
            content: res.data.msg
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    deleteVidoe (_id) {
      console.log(this.msgList.indexOf(_id))
      this.msgList.splice(this.msgList.indexOf(_id),1)
    }
  },
  mounted () {
    this.getMsgList()
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