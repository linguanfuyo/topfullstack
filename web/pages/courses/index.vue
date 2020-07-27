<template>
  <div class="pa-3">
    <h3>
      热门课程
    </h3>
    <v-row>
      <v-col md="4" v-for="(item,i) in courses.data" :key="i">
        <v-card class="mx-auto" max-width="300">
          <router-link :to="`/courses/${item._id}`">
            <v-img :src="item.cover" height="200px"></v-img>
            <v-card-title>
              {{item.name}}
            </v-card-title>
            <v-card-subtitle>
              {{item.createdAt}}
            </v-card-subtitle>
          </router-link>

          <v-card-actions>
            <!-- 收藏按钮 -->
            <like-btn type="Course" :object="item._id"></like-btn>

            <v-btn color="purple" text>
              Explore
            </v-btn>

            <v-spacer></v-spacer>

            <!-- <v-btn
                 icon
                 @click="show = !show"
               >
                 <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
               </v-btn> -->
          </v-card-actions>

          <!-- <v-expand-transition>
               <div v-show="show">
                 <v-divider></v-divider>

                 <v-card-text>
                   I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                 </v-card-text>
               </div>
             </v-expand-transition> -->
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LikeBtn from '../../components/LikeBtn.vue'
export default {
  components: {
    LikeBtn
  },
  async asyncData ({ $axios }) {
    //$get 直接把res.data 赋值给course
    const courses = await $axios.$get('courses')
    return {
      courses
    }
  }
}
</script>

<style>
</style>
