<template>
  <div>
    <h3>{{isNew ? '创建' : '编辑'}}课程</h3>
    <ele-form v-model="data" :formDesc="fields" :request-fn="submit"></ele-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
export default class CourseEdit extends Vue {
  @Prop(String) id!: string
  data = {}
  rules: {
    title: [
      { min: 3; max: 5; message: '长度在 3 到 5 个字符'; trigger: 'blur' }
    ]
  }
  fields = {
    name: { label: '课程名称', type: 'input', required: true },
    cover: { label: '课程封面图', type: 'input', required: true },
  }
  $http: any
  get isNew() {
    return !this.id
  }
  async fetch() {
    const res = await this.$http.get(`courses/${this.id}`)
    this.data = res.data
    console.log(res)
  }
  async submit(data) {
    //这里比以前更加简洁了 舒服
    const url = this.isNew ? 'courses' : `courses/${this.id}`
    const method = this.isNew ? 'post' : 'put'
    const res = await this.$http[method](url, data)
    this.data = {}
    this.$message.success('保存成功')
    this.$router.push('/courses/list')
  }
  created() {
    !this.isNew && this.fetch()
  }
}
</script>

<style>
</style>
