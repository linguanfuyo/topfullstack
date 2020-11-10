<template>
  <div v-if="isShowArrange" class="arrageTask">
    <!-- 遮罩层 -->
    <div class="mask">
      <!-- 内容 -->
      <div class="arrageTask-wrap">
        <!-- 头部 -->
        <div class="hearder">
          <div class="hearder-left">
            用户信息
          </div>
          <div class="hearder-right" @click="close">
            <a-icon type="close" />
          </div>
        </div>
        <!-- 内容 -->
        <div class="content">
          <div class="from-item">
            <div class="item-avatar">头像：</div>
            <Upload @beforeUpload="beforeUpload($event)" style="margin-left: 60px"></Upload>
          </div>
          <div class="from-item">
            <div class="item-avatar">用户名：</div>
            <a-input v-model="userinfo.username" style="width:350px" size="large" :placeholder="user.username" />
          </div>
          <div class="from-item">
            <div class="item-avatar">个性签名：</div>
            <a-textarea v-model="userinfo.desc" style="width:350px" :placeholder="user.desc" :rows="3" />
          </div>
        </div>
        <!-- 底部按钮 -->
        <div class="arrange-bottom">
          <div></div>
          <div class="btn">
            <v-btn style="margin-right: 30px" @click="close">取消</v-btn>
            <v-btn color="error" @click="confrim">确定</v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Upload from '@/components/Upload.vue'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      isShowArrange: true,
      userinfo: {}
    }
  },
  components: {
    Upload
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      strategy: state => state.auth.strategy,
      isLogin: state => state.auth.loggedIn
    })
  },
  watch: {

  },
  methods: {
    beforeUpload ($event) {
      this.userinfo.avatar = $event
    },
    // confirm 确定安排
    async confrim () {
      try {
        console.log(this.userinfo)
        const res = await this.$axios.$post('/auth/userEdit', this.userinfo)
        if (res.code === 200) {
          this.$message.open({
            content: res.message
          })
          this.$store.commit('setUser', res.user)
          this.$emit('closeEdit')
          this.userinfo = {}
        }
      } catch (error) {
        console.log(error)
      }

    },
    // 关闭取消
    close () {
      this.$emit('closeEdit')
    },
  },
  mounted () {
    if (!this.userinfo.username) {
      this.userinfo.username = this.user.username
    }
    if (!this.userinfo.avatar) {
      this.userinfo.avatar = this.user.avatar
    }
    if (!this.userinfo.desc) {
      this.userinfo.desc = this.user.desc
    }
  }
}
</script>

<style scoped lang="sass">
.hearder-right
    width: 11px
    height: 11px
    cursor: pointer
.hearder-right:hover
    color: #ff3b2f
.arrageTask
    width: 100%
    height: 100%
    position: absolute
    z-index: 9
.mask
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, 0.3)
    display: flex
    justify-content: center
.arrageTask-wrap
    animation: zoom 0.8s ease
    padding: 30px
    width: 450px
    height: 400px
    user-select: none
    overflow-y: auto
    overflow-x: hidden
    background: rgba(249, 249, 249, 1)
    border-radius: 6px
    margin: 200px 0
    .content
        font-size: 16px
        color: #707070
    .from-item
        display: flex
        align-item: center
        justify-content: around
        padding: 10px 0
        .item-avatar
            margin: auto 0
            width: 120px
            text-align: start
.hearder
    display: flex
    justify-content: space-between
    padding-bottom: 14px
.arrange-bottom
    padding-top: 10px
    display: flex
    justify-content: space-between
    .cansel-btn
        width: 100px
        background: rgba(255, 255, 255, 1)
        border: 1px solid rgba(229, 229, 229, 1)
        border-radius: 6px
        margin-right: 20px
        margin-left: 80px
    .confirm-btn
        width: 100px
        background: rgba(0, 152, 250, 1)
        border-radius: 6px
@keyframes zoom
    0%
        transform: scale(0)
    100%
        transform: scale(100%)
</style>
