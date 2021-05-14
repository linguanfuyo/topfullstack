<template>
  <div class="content">
      <p v-html="articleDetail.content" class="content">
  </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
        articleDetail: {}
    }
  },
  mounted(){
      this.getData()
  },
  methods: {
      async getData(){
         try {
             const res = await this.$axios.post('articles/info',{_id:this.$route.params.id})
             console.log(res.data.data)
             this.articleDetail = res.data.data
         } catch (error) {
             console.log(error)
         }
      }
  },

}
</script>

<style lang="scss" scoped>
.content {
    margin: 30px;
}
</style>