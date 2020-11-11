<template>
  <div class="create">
    <!-- 上传界面 -->
    <div v-show="isUploaded" class="create-wrap">
      <div class="wrap-center">
        <a-upload-dragger ref="upload" :headers="getAuthHeaders()" :showUploadList="false" name="file" :multiple="false"
          action="http://localhost:3008/upload" @change="handleChange">
          <div class="upload-dragg" style="height: 500px;background-color: #ffff">
            <div class="center">
              <a-icon style="font-size: 150px;color:#e9e8e9" type="cloud-upload" />
              <div class="center-tips">点击上传或将文件拖入此区域</div>
              <div>
                <span style="color:#47b9af">极速</span>
                <span>预计完成时间：10分钟内</span>
              </div>
            </div>
            <div class="bottom">
              <div class="bottom-item">
                <div style="padding-right:10px">
                  <a-icon style="font-size: 32px;color:#e8e8e8" type="picture" theme="filled" />
                </div>
                <div>
                  <div style="text-align:start;color:#13161a">推荐尺寸</div>
                  <div>16:8，18:9，21:9的横版视频</div>
                </div>
              </div>
              <div class="bottom-item" style="padding: 0 80px">
                <div style="padding-right:10px">
                  <a-icon style="font-size: 32px;color:#e8e8e8" type="layout" theme="filled" />
                </div>
                <div>
                  <div style="text-align:start;color:#13161a">推荐分辨率</div>
                  <div>大于1080P（支持2k，4k及以上）</div>
                </div>
              </div>
              <div class="bottom-item">
                <div style="padding-right:10px">
                  <a-icon style="font-size: 32px;color:#e8e8e8" type="video-camera" theme="filled" />
                </div>
                <div>
                  <div style="text-align:start;color:#13161a">视频大小</div>
                  <div>小于32G</div>
                </div>
              </div>
            </div>
          </div>
        </a-upload-dragger>
      </div>
      <!-- 底部规范 -->
      <div class="create-bottom">
        鼓励发布优质原创视频，参考<span style="color:#0057fe;cursor: pointer">星空视频发文规范</span>
      </div>
    </div>
    <!-- 上面内容编辑 -->
    <div v-if="!isUploaded" class="display">
      <div class="dispay-header">
        <div class="video-info">
          <span class="video-name">{{viedoInfo.name}}</span>
          <span @click="changeUpload" class="video-btn">更换视频</span>
        </div>
        <div class="dispay-info">
          <div>
            <span class="dispay-lenght" style="padding-right: 40px">视频时长 <span
                style="font-weight:bold;color:black">{{formatTime(viedoInfo.timeStamp)}}秒</span></span>
            <span
              class="dispay-lenght">上传详情：{{formatFileSize(viedoInfo.loaded)}}/{{formatFileSize(viedoInfo.size)}}</span>
          </div>
          <div v-if="!isComplete" class="percent">
            {{percen}}%
          </div>
          <div class="dispay-status" v-if="isComplete">
            <span class="status-success" v-if="isSuccess">
              <a-icon theme="filled" style="color:#47b369;font-size:16px" type="check-circle" />
              <span>上传成功</span>
            </span>
            <span v-if="!isSuccess" class="status-error">
              <a-icon theme="filled" style="color:red;font-size:16px" type="close-circle" />
              <span>上传失败</span>
            </span>
          </div>

        </div>
      </div>
      <div class="progress">
        <v-progress-linear color="light-green darken-4" height="5" :value="percen" striped></v-progress-linear>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data () {
    return {
      isUploaded: true,
      viedoInfo: {},
      percen: 0,
      isComplete: false,
      isSuccess: false
    }
  },
  methods: {
    formatTime (time) {
      return moment.duration(time)
    },
    changeUpload () {
      this.$refs.upload.$children[0].$children[0].$children[0].onClick();
    },
    // 上传回调函数
    handleChange (info) {
      try {
        this.isUploaded = false
        const status = info.file.status;
        console.log(info)
        if (status === 'uploading') {
          this.percen = info.file.percent
          this.viedoInfo.name = info.file.name
          this.viedoInfo.size = info.file.size
          this.viedoInfo.timeStamp = info.event.timeStamp
          if (info.event.loaded) {
            this.viedoInfo.loaded = info.event.loaded
          }
          this.viedoInfo.lastModified = info.file.lastModified
        }
        if (status === 'done') {
          this.isComplete = true
          this.isSuccess = true
          this.viedoInfo.size = info.file.size
          // this.$message.success(`${info.file.name} 上传成功`);
        } else if (status === 'error') {
          this.isSuccess = false
          // this.$message.error(`${info.file.name} file upload failed.`);
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 格式化文件大小
    formatFileSize (fileSize) {
      if (fileSize < 1024) {
        return fileSize + 'B';
      } else if (fileSize < (1024 * 1024)) {
        var temp = fileSize / 1024;
        temp = temp.toFixed(2);
        return temp + 'KB';
      } else if (fileSize < (1024 * 1024 * 1024)) {
        var temp = fileSize / (1024 * 1024);
        temp = temp.toFixed(2);
        return temp + 'MB';
      } else {
        var temp = fileSize / (1024 * 1024 * 1024);
        temp = temp.toFixed(2);
        return temp + 'GB';
      }
    },
    // 获取token
    getAuthHeaders () {
      try {
        if (process.client) {
          const storage = window.localStorage
          const token = storage.getItem('auth._token.local')
          return {
            Authorization: token || ''
          }
        }

      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.ant-upload .ant-upload-drag
  border: 2.5px dashed #d9d9d9 !important
.create
  background-color: #f8f8f8
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  .display
    width: 80%
    height: 550px
    background-color: #fff
    border-radius: 7px
    margin: 0 auto
    margin-top: 30px
    .dispay-header
      margin: 30px
      .video-info
        display: flex
        justify-content: space-between
        margin-bottom: 25px
        .video-name
          font-size: 20px
          font-weight: 450px
        .video-btn
          color: #295fcc
          cursor: pointer
        .video-btn:hover
          color: #547fd6
      .dispay-info
        display: flex
        justify-content: space-between
        .percent
          font-size: 18px
          color: #1e1e1e
        .dispay-lenght
          color: #747e8c
        .dispay-status
          font-size: 14px
          .status-success
            color: #47b369
          .status-error
            color: red
  .wrap-center
    height: 484px
    width: 900px
    border-radius: 7px
  .upload-dragg
    position: absolute
    left: -1px
    top: -16px
    height: 516px
    width: 900px
    border: 2.5px dashed #efefef
    border-radius: 10px
  .upload-dragg:hover
    border: 2.5px dashed #b4bac2
  .create-bottom
    text-align: center
    color: #747e8c
    padding: 20px 0
  .create-wrap
    width: 900px
    height: 500px
    border-radius: 7px
    background-color: #ffff
    margin-top: 46px
    .center
      margin: auto 0
      padding-top: 110px
      .center-tips
        font-size: 18px
        color: #13161a
    .bottom
      display: flex
      justify-content: center
      margin-top: 115px
      .bottom-item
        display: flex
        align-items: center
</style>