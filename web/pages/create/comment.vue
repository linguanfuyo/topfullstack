<template>
  <div class="content">
    <Empy title="还没有收到小伙伴的回复哦" to="/create/display" btnValue="去发布作品"></Empy>
  </div>
</template>

<script>
import Empy from '../../components/Empy'
export default {
  data () {
    return {

    }
  },
  components: {
    Empy
  }
}
</script>

<style lang="scss" scoped>
.content {
}
</style>