<template>
  <div class="write-comment">
    <v-avatar class="user" color="teal" size="35">
      <v-img v-if="user.avatar!==''" :src="user.avatar"></v-img>
      <span v-if="user.avatar===''" class="white--text">{{user.username[0].toUpperCase()}}</span>
    </v-avatar>
    <div class="write-wrap">
      <a-textarea @keyup.enter="send" @focus="focus" v-model="content" class="text-area" placeholder="说说你的看法"
        :rows="4" />
      <div class="write-bottom">
        <div class="left">
          <a-icon style="color:#999;font-size: 25px;margin-right:6px" type="smile" />
          <span>表情</span>
        </div>
        <v-btn @click="send" :disabled="content===''" color="primary" elevation="2">发送</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    object: {
      type: String,
      requierd: true
    },
    parentId: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      content: '', // 评论内容
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
    })
  },
  methods: {
    focus () {
      this.$emit('focus')
    },
    // 发送评论
    async send () {
      try {
        const res = await this.$axios.$post('/comments', {
          object: this.object,
          content: this.content,
          parentId: this.parentId
        })
        if (res) {
          this.$message.success({
            content: '评论成功'
          })
          this.content = ''
          this.$emit('fetch')
        } else {
          this.$message.error({
            content: '评论失败'
          })
        }

      } catch (error) {
        console.log(error)
      }
    }
  },

}
</script>

<style lang="scss" scoped>
.write-comment {
  display: flex;
  .write-wrap {
    background-color: #fff;
    margin-left: 20px;
    flex: 1;
    .text-area {
      border-color: #fff;
      padding-right: 0;
    }
    .write-bottom {
      .left {
        display: flex;
        align-items: center;
        margin: 5px 0 0 12px;
        cursor: pointer;
      }
      height: 40px;
      display: flex;
      color: #9999;
      align-items: center;
      justify-content: space-between;
      margin: 0px 12px 12px 0;
    }
  }
}
</style>