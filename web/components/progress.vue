<template>
  <view>
    <canvas ref="canvasDemo" :width="canvasSize+'px'" :height="canvasSize+'px'"></canvas>
  </view>
</template>

<script>
export default {
  props: {
    precent: {
      type: Number,
      require: true,
      default: 0
    },
    lineColorStops: { // 进度条渐变颜色
      type: Array,
      require: true,
    },
    circleColor: {
      type: String,
      default: '#C7DDFF'  //  底环颜色
    },
    pointColor: {
      type: String,
      default: '#95D9F9'  // 开始圆点颜色
    },
    endPointColor: {
      type: String,
      default: '#168CFE'  // 结束圆点颜色
    },
    label: {
      type: String,
      require: true,
    }, // 字体内容
    fontColor: {
      type: String,
      require: true,
      default: '#178CFD'
    }, // 字体颜色
    labelTwo: {
      type: String,
      require: true,
    }, // 字体内容
    fontColorTwo: {
      type: String,
      require: true,
      default: '#969799'
    }, // 字体颜色
  },
  data () {
    return {
      lineWidth: 16, // 进度线的厚度
      gradient: null, // 进度线渐变对象

      startPointRadius: 8.2, // 开始圆点半径

      pointWhiteColor: '#FFF', // 开始白圆点颜色
      startWhitePointRadius: 5, // 开始白圆点半径


      endPointRadius: 8.2, // 开始圆点半径


      fontSize: '30',  // 字体大小


      fontSizeTwo: '13',  // 字体大小

      circleRadius: 110, // 圆环半径
      pointRadius: 16, // 圆点半径
      circleWidth: 16, // 底环厚度

    };
  },
  mounted () {
    // 获取canva对象
    this.$nextTick(() => {
      const canvas = this.$refs.canvasDemo;
      const ctx = canvas.getContext('2d');
      // 画底圆
      ctx.strokeStyle = this.circleColor;
      ctx.lineWidth = this.circleWidth;
      ctx.beginPath();
      //圆心X,Y坐标，半径，起,止弧度，是否逆时针等参数。 
      // 由于网页中以盒子的左上角坐标（0,0）为原点，所以原心坐标为（半径，半径）
      ctx.arc(this.outerRadius, this.outerRadius, this.circleRadius, 0, this.deg2Arc(360), true);
      ctx.stroke(); // 画路径
      // 主字体
      if (this.label) {
        ctx.font = `${this.fontSize}rpx Arial,"Microsoft YaHei"`
        ctx.fillStyle = this.fontColor;
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        // 内容,x,y位置
        ctx.fillText(this.label, this.canvasSize / 2, this.canvasSize / 2 + 20); // 画字
      }

      // 小字
      if (this.labelTwo) {
        ctx.font = `${this.fontSizeTwo}rpx Arial,"Microsoft YaHei"`
        ctx.fillStyle = this.fontColorTwo;
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        // 内容,x,y位置
        ctx.fillText(this.labelTwo, this.canvasSize / 2, this.canvasSize / 2 - 20); // 画字
      }

      // 进度条
      const withGradient = true // 是否渐变色
      if (withGradient) {
        // 创建渐变色默认是从上到下
        // (x,y,x1,y1) 起点坐标，终点坐标
        this.gradient = ctx.createLinearGradient(this.circleRadius * 0.5, this.circleRadius * 1.75, this.circleRadius * 1.25, this.circleRadius * 1.8);
        this.lineColorStops.forEach(item => {
          this.gradient.addColorStop(item.percent, item.color);
        });
      }
      ctx.strokeStyle = this.gradient
      ctx.lineWidth = this.lineWidth;
      ctx.beginPath();
      const deg = this.getTargetDegByPercentage(this.precent)
      ctx.arc(this.outerRadius, this.outerRadius, this.circleRadius, this.deg2Arc(270), this.deg2Arc(deg), true);
      ctx.stroke();

      // 开始进度头圆点
      ctx.fillStyle = this.pointColor;
      ctx.beginPath();
      //圆心X,Y坐标，半径，起,止弧度，是否逆时针等参数。
      ctx.arc(this.outerRadius, this.outerRadius - this.circleRadius, this.startPointRadius, this.deg2Arc(360), 0);
      ctx.fill(); // 填充

      // 开始进度白圆点
      ctx.fillStyle = this.pointWhiteColor;
      ctx.beginPath();
      //圆心X,Y坐标，半径，起,止弧度，是否逆时针等参数。
      ctx.arc(this.outerRadius, this.outerRadius - this.circleRadius, this.startWhitePointRadius, this.deg2Arc(360), 0);
      ctx.fill();

      // 结束进度头圆点
      ctx.fillStyle = this.endPointColor;
      ctx.beginPath();
      //圆心X,Y坐标，半径，起,止弧度，是否逆时针等参数。
      const deg2 = this.getTargetDegByPercentage(this.precent)
      const pointPosition = this.getPositionsByDeg(deg2);
      ctx.arc(pointPosition.x, pointPosition.y, this.endPointRadius, 0, this.deg2Arc(360));
      ctx.fill();

      // 最后别忘了 
      ctx.draw()
    })

  },
  computed: {
    // 外围半径
    outerRadius () {
      return this.circleRadius + this.pointRadius
    },
    // canvas宽/高
    canvasSize () {
      return 2 * this.outerRadius
    }
  },

  methods: {
    // deg转弧度
    deg2Arc (deg) {
      return deg / 180 * Math.PI
    },
    // 根据角度获取结束点的位置
    getPositionsByDeg (deg) {
      let x = 0;
      let y = 0;
      x = this.outerRadius + this.circleRadius * Math.cos(deg * 3.14 / 180)
      y = this.outerRadius + this.circleRadius * Math.sin(deg * 3.14 / 180)
      return { x, y }
    },
    // 根据开始角度和进度百分比求取目标角度
    getTargetDegByPercentage (precent) {
      let deg = 0
      // 270  ----- 180 ----- 90 ----- 0 -----  -90
      //   0 -----  25 -----  50 ----- 75 -----  100
      if (precent >= 75) {
        deg = -(precent - 75) * 3.6
      } else {
        deg = 270 - precent * 3.6
      }
      console.log(deg)
      return deg
    },
  }
}
</script>

<style lang="scss">
</style>
