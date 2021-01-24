<template>
  <div>
    <v-btn falt icon :color="status ? colors[action] : '#9a999b'" @click="toggle">
      <v-icon :style="{'font-size': type==='Comment'?'15px':''}">{{icons[action]}}</v-icon>
    </v-btn>
    <span :style="{'font-size': type==='Comment'?'13px':''}">
      {{num}}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      requierd: true
    },
    object: {
      type: String,
      requierd: true
    },
    num: {
      type: Number,
      default: 0
    },
    action: {
      type: String,
      requierd: true
    },
  },
  data () {
    return {
      status: false, //是否已收藏
      icons: {
        'like': 'mdi-thumb-up',
        'collection': 'mdi-star',
        'unLike': 'mdi-thumb-down'
      },
      colors: {
        'like': '#64b5f6',
        'collection': '#e56149',
        'unLike': '#e57373'
      }
    }
  },
  methods: {
    //获取课程状态
    async getStatus () {
      //获取当前课程收藏状态
      const storage = window.localStorage
      // 判断是否有token
      if (this.$store.state.auth.loggedIn) {
        try {
          const res = await this.$axios.$get('actions/status', {
            params: {
              // user: 用户名 客户端不该传过去 应该由后端自己识别获取
              type: this.type,
              object: this.object,
              action: this.action,
            }
          })
          this.status = res.status
        } catch (error) {
          console.log(error)
        }
      }

    },
    //切换收藏状态
    async toggle () {
      try {
        const res = await this.$axios.$post('actions/toggle', {
          type: this.type,
          object: this.object,
          action: this.action,
        })
        this.status = res.status
        await this.updateNum()
      } catch (error) {
        console.log(error)
      }
    },
    async updateNum () {
      try {
        const res = await this.$axios.$post('videos/updateNum', {
          object: this.object,
          action: this.action,
        })
        if (res.code === 1) {
          this.$emit('change', false)
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.getStatus()
  }

}
</script>
<style scoped lang="scss">
</style>