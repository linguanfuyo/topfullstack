<template>
  <div class="content">
    <Empy title="你还没有发布过任何作品" to="/create/display"></Empy>
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
</style>