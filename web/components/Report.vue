<template>
  <div v-if="isShowArrange" class="arrageTask">
    <!-- 遮罩层 -->
    <div class="mask">
      <!-- 内容 -->
      <div class="arrageTask-wrap">
        <!-- 头部 -->
        <div class="hearder">
          <div class="hearder-left">
            {{title}}
          </div>
          <div class="hearder-right" @click="close">
            <a-icon type="close" />
          </div>
        </div>
        <a-radio-group v-if="type==='Video'||type==='Comment'" @change="change" class="radio-list" name="radioGroup"
          :value="reportModel.reportType" :default-value="1">
          <a-radio v-for="item in type==='Video'?radioList: commentRadio" :key="item.value" :style="radioStyle"
            :value="item.value">
            {{item.name}}
          </a-radio>
        </a-radio-group>
        <span v-if="type==='User'" class="lable">请问您遇到什么问题？（必填）</span>
        <a-textarea v-model="reportModel.desc" :maxLength="150" placeholder="（选填）请填写详细描述" :rows="4" />
        <span v-if="type==='User'" class="lable">请输入您的手机号码以便工作人员取得联系（选填）</span>
        <a-input v-if="type==='User'" v-model="reportModel.phone" size="large" placeholder="请输入手机号" />
        <!-- 底部按钮 -->
        <div class="arrange-bottom">
          <div></div>
          <div class="btn">
            <v-btn style="margin-right: 30px" @click="close">取消</v-btn>
            <v-btn style="color: #fff;background-color: #1890ff" @click="comfrim">确定</v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Upload from '@/components/Upload.vue'
import { mapState } from 'vuex'
export default {
  props: {
    type: {
      type: String,
      require: true
    },
    object: {
      type: String,
    },
    title: {
      type: String,
      default: '用户反馈'
    }
  },
  data () {
    return {
      radioList: [
        {
          name: '违法违规',
          value: 1
        },
        {
          name: '低俗色情',
          value: 2
        },
        {
          name: '广告诈骗',
          value: 3
        },
        {
          name: '未成年不良信息',
          value: 4
        },
        {
          name: '内容质量差',
          value: 5
        },
        {
          name: '侵权投诉',
          value: 6
        },
        {
          name: '其他问题',
          value: 7
        },
      ],
      commentRadio: [
        {
          name: '违反法律法规',
          value: 1
        },
        {
          name: '侵犯个人权益',
          value: 2
        },
        {
          name: '有害社会环境',
          value: 3
        },
        {
          name: '其他问题',
          value: 4
        }
      ],
      isShowArrange: true, //是否显示
      radioStyle: {
        marginBottom: '12px'
      },
      // 上报数据
      reportModel: {
        desc: null,
        phone: null,
        reportType: 1
      }
    }
  },
  methods: {
    change (e) {
      this.reportModel.reportType = e.target.value
      console.log(e)
    },
    close () {
      this.$store.commit('setVal', {
        valName: 'isShowReport',
        val: false
      })
    },
    async comfrim () {
      try {
        const { desc, phone, reportType } = this.reportModel
        const myreg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        const checkPhone = myreg.test(phone)
        if (phone !== null && !checkPhone) {
          this.$message.error({
            content: '请输入正确的手机号'
          })
          return
        }
        if (desc === '' || desc === null) {
          this.$message.error({
            content: '请输入描述信息'
          })
          return
        }

        const res = await this.$axios.$post('/reports', {
          type: this.type,
          object: this.object,
          content: desc,
          phone: phone,
          faultType: reportType
        })
        console.log(res)
        if (res) {
          this.$message.success({
            content: this.type === 'User' ? '感谢您的反馈' : '举报成功'
          })
          this.$store.commit('setVal', {
            valName: 'isShowReport',
            val: false
          })
        }
      } catch (error) {
        console.log(error)
      }

    }
  },
  mounted () {

  }
}
</script>

<style scoped lang="sass">
.arrageTask
    width: 100%
    height: 100%
    overflow-y: hidden
    position: fixed
    top: 0
    left: 0
    z-index: 999
.mask
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, 0.3)
    display: flex
    justify-content: center
    -webkit-overflow-scrolling: touch
.arrageTask-wrap
    animation: zoom 0.8s ease
    padding: 25px
    width: 400px
    min-height: 300px
    user-select: none
    overflow-y: auto
    overflow-x: hidden
    background: rgba(249, 249, 249, 1)
    border-radius: 6px
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%,-50%)
    .hearder
        display: flex
        justify-content: space-between
        padding-bottom: 14px
        .hearder-right
            width: 11px
            height: 11px
            cursor: pointer
        .hearder-right:hover
            color: #ff3b2f
    .radio-list
        display: flex
        flex-direction: column
    .lable
        font-size: 15px
        color: #1d1d1d
        display: block
        margin: 20px 0 10px 0
    .arrange-bottom
        padding-top: 10px
        display: flex
        justify-content: space-between
        .cansel-btn
            width: 100px
            background: rgba(255, 255, 255, 1)
            border: 1px solid rgba(229, 229, 229, 1)
            border-radius: 6px
            margin-right: 20px
            margin-left: 80px
        .confirm-btn
            width: 100px
            background: #1890ff
            border-radius: 6px
@keyframes zoom
    0%
        transform: scale(0)
    100%
        transform: scale(100%)
</style>