<template>
  <div class="pa-3">
    <v-row>
      <v-col :md="8">
        <video width="100%" height="450" controls :src="episode.file"></video>
        <div class="title">
          <h3>{{course.name}}</h3>
          <like-btn type="Course" :object="course._id"></like-btn>
        </div>
        <v-select v-model="currentIndex" :items="course.episodes.map((v,i)=> ({text: v.name,value: i}))"></v-select>
        <!-- <div>{{episode}}</div> -->
      </v-col>
      <v-col :md="4">
        <comment-list type="Episode" :object="episode._id"></comment-list>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import LikeBtn from '@/components/LikeBtn.vue'
import CommentList from '@/components/CommentList.vue'

export default {
  components: {
    LikeBtn,
    CommentList
  },
  async asyncData ({
    params,
    $axios
  }) {
    const {
      id
    } = params
    //关联查询课时
    const course = await $axios.$get(`courses/${id}`, {
      params: {
        query: {
          populate: 'user'
        }
      }
    })
    return {
      course
    }

  },
  data () {
    return {
      currentIndex: 0
    }
  },
  computed: {
    episode () {
      return this.course.episodes[this.currentIndex]
    }
  }
}
</script>

<style>
.title {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
</style>
