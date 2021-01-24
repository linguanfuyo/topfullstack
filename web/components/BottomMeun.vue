<template>
  <div class="right-meun">
    <a-popover placement="left" trigger="hover">
      <template slot="content">
        <div>回到首页</div>
      </template>
      <div @click="$router.push('/')" class="item border">
        <a-icon style="font-size: 16px;color:#1d1d1d" type="home" />
      </div>
    </a-popover>
    <a-popover placement="left" trigger="hover">
      <template slot="content">
        <div>问题反馈</div>
      </template>
      <div @click="report" class="item border">
        <a-icon style="font-size: 16px;color:#1d1d1d" type="alert" />
      </div>
    </a-popover>
    <a-popover placement="left" trigger="hover">
      <template slot="content">
        <div>回到顶部</div>
      </template>
      <a-back-top :visibilityHeight="300">
        <div class="item">
          <a-icon class="item" style="font-size: 16px;color:#1d1d1d;" type="vertical-align-top" />
        </div>
      </a-back-top>
    </a-popover>
  </div>
</template>

<script>
export default {
  methods: {
    report () {
      this.$store.commit('setVal', {
        valName: 'reportType',
        val: 'User'
      })
      this.$store.commit('setVal', {
        valName: 'isShowReport',
        val: true
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.ant-back-top {
  position: relative;
  left: 0;
  bottom: 0;
  z-index: 1;
}
.right-meun {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 40px;
  min-height: 40px;
  position: fixed;
  right: 0;
  bottom: 30px;
  z-index: 1000;
  color: #1d1d1d;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 4px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  .item {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .border {
    border-bottom: 1px solid #eaeaea;
  }
}
</style>