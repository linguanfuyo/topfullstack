<template>
  <v-card flat tile>
    <v-form @submit.prevent="send">
      <v-text-field v-model="content" label="说点啥吧~" required append-icon="mdi-send" @click:append="send">
      </v-text-field>
    </v-form>
    <v-list dense twoLine shaped avatar>
      <v-list-item-group color="primary">
        <v-list-item v-for="(item, i) in commentList" :key="i">
          <v-list-item-avatar color="#22a6f2">
            <v-img v-if="item.user.avatar" :src="item.avatar"></v-img>
            <span class="white--text" v-if="!item.user.avatar">{{item.user.username[0].toUpperCase()}}</span>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="item.content"></v-list-item-title>
            <v-list-item-subtitle>
              <span>{{item.user.username}}</span>
              <span>{{item.createdAt}}</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    object: {
      type: String,
      required: true
    }

  },
  data () {
    return {
      commentList: [],
      content: ''
    }
  },
  methods: {
    async send () {
      if (this.content) {
        const res = await this.$axios.$post('comments', {
          type: this.type,
          object: this.object,
          content: this.content
        })
      }
      this.content = ''
      this.fetch()
    },
    async fetch () {
      const res = await this.$axios.$get('comments', {
        params: {
          query: {
            where: {
              object: this.object,
              type: this.type
            },
            limit: 10,
            skip: 0
          }
        }
      })
      this.commentList = res
    }
  },
  //immediate: true 进来就执行 而不是改变才执行
  watch: {
    object: {
      handler: 'fetch', //绑定事件名'fetch'
      immediate: true
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped></style>