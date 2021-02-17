<template>
  <div class="video-bg">
    <img draggable="false" class="bg-img"
      src="https://sf3-scmcdn-tos.pstatp.com/obj/goofy/xigua_fe/xigua_video_web_pc/static/media/userdetail_noresult.66fb0f1a.png"
      alt="">
    <p class="video-de">{{title}}</p>
    <a-button v-if="isShowBtn" @click="$router.push(to)" shape="round" type="primary">
      {{btnValue}}
    </a-button>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '数据为空'
    },
    isShowBtn: {
      type: Boolean,
      default: true
    },
    btnValue: {
      type: String,
      default: '立即发布'
    },
    to: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.video-bg {
  margin: 250px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .video-de {
    color: grey;
    text-align: center;
  }
  .bg-img {
    width: 240px;
    height: 135px;
  }
}
</style>