<template>
  <div class="like-view">
    <div class="img">
      <img draggable="false"
        src="https://sf3-scmcdn-tos.pstatp.com/obj/goofy/xigua_fe/xigua_video_web_pc/static/media/liked_bg.b9097c80.png"
        alt="img">
    </div>
    <div class="name">{{name}}的获赞</div>
    <div class="list">
      <div  class="list-item">
        <div class="item-num">{{likeNum}}</div>
        <div>视频获赞</div>
      </div>
      <div  class="list-item">
        <div class="item-num">{{0}}</div>
        <div>文章获赞</div>
      </div>
      <div  class="list-item">
        <div class="item-num">{{0}}</div>
        <div>音频获赞</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    likeNum: {
      type:Number,
      default:0
    }
  },
  data () {
    return {
    }
  },
  methods: {


  },

  mounted () {

  }

}
</script>
<style scoped lang="sass">
.like-view
  width: 300px
  height: 230px
  box-shadow: 0px 0px 4px #ccc
  border-radius: 6px
  background-color: #fff
  .img
    width: 200px
    height: 120px
    margin: 0 auto
    img
      width: 200px
      height: 120px
  .name
    color: #595959
    font-size: 20px
    margin: 0 auto
    text-align: center
  .list
    display: flex
    justify-content: around
    color: #595959
    .list-item
      margin: 10px auto
      text-align: center
      .item-num
        font-size: 17px
</style>