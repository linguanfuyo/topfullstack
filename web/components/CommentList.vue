<template>
  <div class="content">
    <div class="comment-num">{{commentList.length}}条评论</div>
    <CommentInput @focus="hideOtherInput(1)" @fetch="fetch" :object="from"></CommentInput>
    <a-empty style="margin: 30px 0" description="还没有评论哦" v-if="commentList.length===0" />
    <div v-if="commentList.length!==0" class="comment-list">
      <div v-for="(item,i) in commentList" :key="i" class="comment-item">
        <div v-if="item.frist" class="com-frist">
          <v-avatar @click="$router.push(`/users/${item.frist.uid._id}`)"  v-if="item.frist && item.frist.uid" class="com-avatat" color="teal" size="35">
            <v-img v-if="item.frist.uid.avatar" :src="item.frist.uid.avatar || ''"></v-img>
            <span v-if="!item.frist.uid.avatar"
              class="white--text">{{item.frist.uid.username[0].toUpperCase()}}</span>
          </v-avatar>
          <div v-if="item.frist" class="com-right">
            <div v-if="item.frist && item.frist.uid" class="right-top">
              <span class="com-name">{{item.frist.uid.username}}</span>
              <span class="com-time">{{formatDate(item.frist.createdAt)}}</span>
            </div>
            <div class="com-content">{{item.frist.content}}</div>
            <div v-if="item.two" class="right-bottom">
              <div style="display:flex;align-item:center">
                <div @click="showFristInput(i)" class="replay">{{fristIndex===i?'收起回复':'回复'}}
                </div>
                <div v-if="item.two.length>0" @click="showTowComment(i)" class="replay" style="margin-left:20px">
                  <span>{{item.two.length}}条回复</span>
                  <a-icon style="font-size:12px" :type="item.isOpenReplay?'up':'down'" />
                </div>
              </div>
              <a-popover trigger="click">
                <template v-if="item.frist&&item.frist.uid " slot="content">
                  <div v-if="item.frist.uid._id === $store.state.auth.user._id" style="font-size:14px;cursor: pointer;"
                    @click="remove(item.frist._id)">删除</div>
                  <div v-if="item.frist.uid._id !== $store.state.auth.user._id" style="font-size:14px;cursor: pointer;"
                    @click="report(item.frist._id)">举报</div>
                </template>
                <a-icon style="cursor: pointer;" type="more" />
              </a-popover>
            </div>
            <CommentInput @focus="hideOtherInput(2)" @fetch="fetch" v-if="item.frist" v-show="i===fristIndex"
              :object="item.frist._id" :parentId="item.frist._id">
            </CommentInput>
          </div>
        </div>
        <div  v-show="item.isOpenReplay " v-for="(item2,i2) in item.two" :key="i2" class="com-tow">
          <v-avatar @click="$router.push(`/users/${item2.uid._id}`)" v-if="item2.uid" class="com-avatat" color="teal" size="35">
            <v-img v-if="item2.uid.avatar" :src="item2.uid.avatar || ''"></v-img>
            <span v-if="!item2.uid.avatar" class="white--text">{{item2.uid.username[0].toUpperCase()}}</span>
          </v-avatar>
          <div v-if="item2.uid" class="com-right">
            <div class="right-top">
              <span class="com-name">{{item2.uid.username}}</span>
              <span class="com-time">{{formatDate(item2.createdAt)}}</span>
            </div>
            <div v-if="item2.object&&item2.object.uid" class="com-content">{{'@'+item2.object.uid.username+'    '+item2.content}}</div>
            <div v-if="item2.uid" class="right-bottom">
              <div @click="showTowInput(i2,item2._id)" class="replay">
                {{i2===towIndex&& twoCommentId===item2._id?'收起回复':'回复'}}
              </div>
              <a-popover trigger="click">
                <template slot="content">
                  <div v-if="item2.uid._id === $store.state.auth.user._id" style="font-size:14px;cursor: pointer;"
                    @click="remove(item2._id)">删除</div>
                  <div v-if="item2.uid._id !== $store.state.auth.user._id" style="font-size:14px;cursor: pointer;"
                    @click="report(item2._id)">举报</div>
                </template>
                <a-icon style="cursor: pointer;" type="more" />
              </a-popover>
            </div>
            <CommentInput @focus="hideOtherInput(3)" @fetch="fetch" v-if="item.frist"
              v-show="i2===towIndex&& twoCommentId===item2._id" :object="item2._id" :parentId="item.frist._id">
            </CommentInput>
          </div>
        </div>

      </div>
    </div>
    <a-spin style="margin: 30px 0" v-if="loadingMore&&haveData" />
    <div v-if="!loadingMore" class="no-more">{{haveData?'加载更多':'没有更多评论了'}}</div>
  </div>
</template>
<script>
import moment from 'moment';
import 'moment/locale/zh-cn'
import CommentInput from './CommentInput.vue';
export default {
  props: {
    from: {
      type: String,
      required: true
    }

  },
  data () {
    return {
      commentList: [], // 评论列表
      fristIndex: -1, //一级评论索引
      towIndex: -1, // 二级评论索引
      isShowTow: false, // 是否显示二级评论
      twoCommentId: '', // 当前二级配评论id
      loadingMore: true, // 是否显示加载更多
      haveData: true, // 请求是否有数据返回
      limt: 10, // 每页10条
      page: 1, // 当前页数
    }
  },
  components: {
    CommentInput,
  },
  methods: {
    // 隐藏子输入款
    hideOtherInput (rank) {
      if (rank === 1) {
        this.fristIndex = -1
        this.towIndex = -1
      } else if (rank === 2) {
        this.towIndex = -1
      } else {
        this.fristIndex = -1
      }
    },
    // 显示二级评论
    showTowComment (index) {
      console.log(this.commentList, typeof (this.commentList))
      this.commentList.forEach((item, i) => {
        if (i === index) {
          item.isOpenReplay = !item.isOpenReplay
        }
      })
    },
    // 显示一级输入款
    showFristInput (index) {
      if (this.fristIndex === index) {
        this.fristIndex = -1
        return
      }
      this.fristIndex = index
    },
    // 显示二级输入款
    showTowInput (index, id) {
      if (this.towIndex === index) {
        this.towIndex = -1
        return
      }
      this.twoCommentId = id
      this.towIndex = index
    },
    report (id) {
      this.$store.commit('setVal', {
        valName: 'reportType',
        val: 'Comment'
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
    // 获取评论
    async fetch () {
      try {
        const res = await this.$axios.$get('comments', {
          params: {
            query: {
              where: {
                object: this.from
              },
              limit: 10,
              skip: 0
            }
          }
        })
        console.log(res)
        if (res.code === 1) {
          res.data.forEach(item => {
            item.isOpenReplay = false
          })
          this.fristIndex = -1
          this.towIndex = -1
          this.commentList = res.data.reverse()
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 删除评论
    async remove (id) {
      try {
        const res = await this.$axios.$post('comments/delete', {
          id: id
        })
        if (res) {
          this.$message.success({
            content: '删除成功'
          })
          this.fetch()
        } else {
          this.$message.success({
            content: '删除失败'
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
  //immediate: true 进来就执行 而不是改变才执行
  // watch: {
  //   object: {
  //     handler: 'fetch', //绑定事件名'fetch'
  //     immediate: true
  //   }
  // },
  mounted () {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  .comment-num {
    margin: 10px 0;
    font-size: 16px;
  }
  .comment-list {
    display: flex;
    flex-direction: column;
    .comment-item {
      width: 100%;
      min-height: 115px;
      margin-top: 15px;
      .com-frist {
        display: flex;
        .com-avatat {
          margin: 15px 0;
          cursor: pointer;
        }
        .com-right {
          flex: 1;
          padding-top: 15px;
          min-height: 115px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 20px;
          border-top: 1px solid #eaeaea;
          .right-top {
            .com-name {
              cursor: pointer;
            }
            .com-name:hover {
              color: #2196f3;
            }
            .com-time {
              margin-left: 10px;
              font-size: 12px;
              color: #666;
            }
          }
          .com-content {
            font-size: 15px;
            min-height: 56px;
            line-height: 56px;
          }
          .right-bottom {
            display: flex;
            flex-direction: row;
            align-items: center;
            color: #666;
            font-size: 14px;
            margin-bottom: 10px;
            justify-content: space-between;
            .replay {
              cursor: pointer;
            }
            .replay:hover {
              color: #2196f3;
            }
          }
        }
      }
      .com-tow {
        background-color: #f9f9f9;
        margin-left: 50px;
        display: flex;
        padding-left: 15px;
        .com-avatat {
          margin: 15px 0;
          cursor: pointer;
        }
        .com-right {
          flex: 1;
          padding-top: 15px;
          min-height: 115px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 20px;
          border-top: 1px solid #eaeaea;
          .right-top {
            .com-name {
              cursor: pointer;
            }
            .com-name:hover {
              color: #2196f3;
            }
            .com-time {
              margin-left: 10px;
              font-size: 12px;
              color: #666;
            }
          }
          .com-content {
            font-size: 15px;
            height: 56px;
            line-height: 56px;
          }
          .right-bottom {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            color: #666;
            font-size: 14px;
            margin-bottom: 10px;
            .replay {
              cursor: pointer;
            }
            .replay:hover {
              color: #2196f3;
            }
          }
        }
      }
    }
  }
  .no-more {
    color: #999;
    font-size: 14px;
    margin: 30px auto;
  }
}
</style>