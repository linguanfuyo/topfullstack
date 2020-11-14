<template>
  <div class="create">
    <!-- 上传界面 -->
    <div v-show="isUploaded" class="create-wrap">
      <div class="wrap-center">
        <a-upload-dragger ref="upload" :headers="getAuthHeaders()" :showUploadList="false" name="file" :multiple="false"
          action="http://localhost:3008/upload" @change="handleChange">
          <div class="upload-dragg" style="height: 500px;background-color: #ffff">
            <div @click.stop="" class="templateTips" v-if="isHaveTemplate">
              <span style="margin:1px 8px 0 20px">
                <a-icon style="font-size: 16px;color:#798499" theme="filled" type="video-camera" />
              </span>
              <span>你还有上次未提交的视频，是否继续编辑？</span>
              <span @click.stop="()=>{isUploaded = false}" style="color:#4e81d9;margin:0 15px 0 30px">继续编辑</span>
              <span @click.stop="deleteTemplate">放弃</span>
            </div>
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
          <span class="video-name">{{videoInfo.name}}</span>
          <span @click="changeUpload" class="video-btn">更换视频</span>
        </div>
        <div class="dispay-info">
          <div>
            <span class="dispay-lenght" style="padding-right: 40px">视频时长 <span
                style="font-weight:bold;color:black">{{durationTrans(videoInfo.duration)}}</span></span>
            <span
              class="dispay-lenght">上传详情：{{formatFileSize(videoInfo.loaded)}}/{{formatFileSize(videoInfo.size)}}</span>
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
        <v-progress-linear color="light-green darken-1" height="5" :value="percen" striped></v-progress-linear>
      </div>
      <!-- 视频长度比提示 -->
      <a-alert banner style="margin: 30px 30px 0px 30px; font-size: 12px;color:#222222" v-if="visible"
        message="竖版视频（宽<高的视频，如9:16）不享受收益分成，不支持参与活动，无原创、赞赏、定时等功能" type="error" closable :after-close="handleClose" />
      <!-- 视频表单 -->
      <div class="video-form" style="margin: 0 30px">
        <div class="input-item">
          <div style="width:50px; margin-right: 40px" for="title"><span style="color:red">* </span>标题</div>
          <a-input v-model="videoModel.title" size="large" :maxLength="30" />
        </div>
        <div class="input-item">
          <div style="width:50px; margin-right: 40px" for="title"><span style="color:red">* </span>封面</div>
          <a-upload name="file" list-type="picture-card" class="avatar-uploader" :show-upload-list="false"
            action="http://localhost:3008/upload" :headers="getAuthHeaders()" :before-upload="beforeUpload"
            @change="handleChange2">
            <img style="height: 100px;width: 150px" v-if="videoModel.cover" :src="videoModel.cover" alt="avatar" />
            <div v-else>
              <a-icon style="font-size:24px;color:#b4bac2" type="picture" />
              <div class="ant-upload-text">
                上传封面
              </div>
            </div>
          </a-upload>
        </div>
        <div style="margin-left: 85px;font-size:12px">清晰美观的封面有利于推荐，建议分辨率不低于1000*654（大小不超过2M）</div>
        <div class="input-item">
          <div style="width:50px; margin-right: 40px" for="title"><span style="color:red">* </span>
            类别</div>
          <a-select size="large" mode="multiple" :default-value="videoModel.category" style="width: 100%"
            placeholder="请选择视频类别" @change="optionChange">
            <a-select-option v-for="(item) in category" :key="item._id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </div>
        <div class="input-item">
          <div style="width:50px; margin-right: 40px" for="title"><span>* </span>描述</div>
          <a-textarea v-model="videoModel.desc" :maxLength="120" placeholder="简单的介绍一下你的视频吧~" :rows="4" />
        </div>
        <div class="input-item">
          <v-btn style="margin-left:85px" color="error" elevation="2">发布</v-btn>
          <v-btn @click="cancel" style="margin-left:30px" color="#f8f8f8" elevation="2">取消</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { Base64 } from 'js-base64';
export default {
  data () {
    return {
      visible: true, // 是否显示alert
      isUploaded: true, // 是否已导入视频或图片
      videoInfo: {
        name: '',
      },  // 视频信息
      videoModel: {
        title: '',
        desc: '',
        category: ['生活'],
        cover: '', // 封面
        file: '' // url
      }, // 保存到数据库的视频信息
      percen: 0,  // 加载百分比
      isComplete: false, // 是否完成加载
      isSuccess: false, // 加载是否成功
      isHaveTemplate: false, // 是否有模板
      category: [],
    }
  },
  beforeDestroy () {
    this.saveTemplate()
  },
  methods: {
    handleClose () {
      this.visible = false;
    },
    // 时间格式化
    durationTrans (a) {
      var b = ""
      var h = parseInt(a / 3600),
        m = parseInt(a % 3600 / 60),
        s = parseInt(a % 3600 % 60);
      if (h > 0) {
        h = h < 10 ? '0' + h : h
        b += h + ":"
      }
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      b += m + ":" + s
      return b;
    },
    changeUpload () {
      this.$refs.upload.$children[0].$children[0].$children[0].onClick();
    },
    beforeUpload (file) {

    },
    // 上传回调函数
    handleChange (info) {
      try {
        this.getTimes(info.file)
        this.isUploaded = false
        const status = info.file.status;
        if (status === 'uploading') {
          this.percen = info.file.percent
          this.videoInfo.name = info.file.name
          if (info.event.loaded) {
            this.videoInfo.loaded = info.event.loaded
            this.videoInfo.size = info.event.total
          }
        }
        if (status === 'done') {
          this.isComplete = true
          this.isSuccess = true
          this.videoModel.file = info.file.response.url
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
    // 获取视频长度
    getTimes (file) {
      // //获取录音时长
      let url = URL.createObjectURL(file.originFileObj);
      // //经测试，发现audio也可获取视频的时长
      let audioElement = new Audio(url);
      let duration;
      audioElement.addEventListener("loadedmetadata", _event => {
        duration = audioElement.duration;
        if (duration) {
          this.videoInfo.duration = duration
          console.log(this.videoInfo.duration)
        }
      });
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
    },
    // 上传图片
    handleChange2 (info) {
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        this.videoModel.cover = info.file.response.url;
      }
    },
    beforeUpload (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('只能上传图片!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('图标大小必须小于2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
    // 选择框改变
    optionChange (value) {
      this.videoModel.category = value
    },
    // 保存模板信息
    saveTemplate () {
      const videoTemplate = {
        percen: this.percen,
        videoModel: this.videoModel,
        videoInfo: this.videoInfo,
        isComplete: this.isComplete,
        isSuccess: this.isSuccess
      } // 保存到版本地的模板
      const storage = window.localStorage
      storage.setItem("video_template", Base64.encode(JSON.stringify(videoTemplate)));
    },
    //删除模板
    deleteTemplate () {
      const videoTemplate = {}
      const storage = window.localStorage
      // 删除本地存储 初始化数据
      storage.removeItem("video_template");
      this.videoInfo = {}
      this.videoModel = {}
      this.percen = ''
      this.isComplete = false
      this.isSuccess = false
      this.isHaveTemplate = false
    },
    // 获取模板信息
    getTemplate () {
      const storage = window.localStorage
      return JSON.parse(Base64.decode(storage.getItem("video_template")));
    },
    // 取消上传
    cancel () {
      //保存模板到本地存储
      this.saveTemplate()
      this.isUploaded = true
      this.isHaveTemplate = true
    },
    // 获取分类
    async getCategory () {
      try {
        const res = await this.$axios.$get('getCategory');
        this.category = res.category
      } catch (error) {

      }
    }
  },
  mounted () {
    // 加载模板信息
    try {
      this.getCategory()
      const template = this.getTemplate()
      if (template) {
        if (template.videoModel.file) {
          this.isHaveTemplate = true
          this.videoInfo = template.videoInfo
          this.videoModel = template.videoModel
          this.percen = template.percen
          this.isComplete = template.isComplete
          this.isSuccess = template.isSuccess
        }
      }
    } catch (error) {
      console.log(error)
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
    height: 710px
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
    width: 80%
    border-radius: 7px
  .upload-dragg
    position: absolute
    left: -1px
    top: -16px
    height: 516px
    width: 900px
    border: 2.5px dashed #efefef
    border-radius: 10px
    .templateTips
      height: 40px
      width: 870px
      background-color: #f8f8f8
      margin: 10px auto
      position: absolute
      display: flex
      align-item: center
      line-height: 40px
      left: 12px
      z-index: 5
      border-radius: 2px
  .upload-dragg:hover
    border: 2.5px dashed #b4bac2
  .create-bottom
    text-align: center
    color: #747e8c
    padding: 20px 0
  .create-wrap
    width: 900px
    height: 484px
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
.video-form
  color: grey
  margin-top: 30px
  .input-item
    display: flex
    align-item: center
    margin-top: 30px
</style>