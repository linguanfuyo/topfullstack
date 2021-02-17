<template>
  <div ref="content">
    <Report :title="title" :type="type" :object="id" v-if="isShowReport"></Report>
    <BottomMeun></BottomMeun>
    <nuxt />
  </div>
</template>

<script>
import Report from '../components/Report'
import BottomMeun from '../components/BottomMeun'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      target: null,
    }
  },
  computed: {
    ...mapState({
      id: state => state.reportObject,
      isShowReport: state => state.isShowReport,
      type: state => state.reportType,
      title: state => state.reportType === 'Video' ? '举报视频' : state.reportType === 'Comment' ? '举报评论' : '用户反馈'
    })
  },
  components: {
    Report,
    BottomMeun
  },
  methods: {

  },
  mounted () {
    this.target = this.$refs.content
  }
}
</script>
<style lang="scss" scoped>
</style>
