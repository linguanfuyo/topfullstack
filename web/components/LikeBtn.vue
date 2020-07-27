<template>
  <v-btn falt icon :color="status ? 'pink' : null" @click="toggle">
    <v-icon>mdi-heart</v-icon>
  </v-btn>
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
    }
  },
  data () {
    return {
      status: false //是否已收藏
    }
  },
  methods: {
    //获取课程状态
    async getStatus () {
      //获取当前课程收藏状态
      const res = await this.$axios.$get('actions/status', {
        params: {
          // user: 用户名 客户端不该传过去 应该由后端自己识别获取
          type: this.type,
          object: this.object,
          action: 'like'
        }
      })
      this.status = res.status
    },
    //切换收藏状态
    async toggle () {
      //await 
      //this.status = ...
      const res = await this.$axios.$post('actions/toggle', {
        type: this.type,
        object: this.object,
        action: 'like'
      })
      this.status = res.status
    }
  },
  mounted () {
    this.getStatus()
  }

}
</script>
<style scoped lang="scss">
</style>