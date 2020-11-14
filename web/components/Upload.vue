<template>
  <div class="user-img-box">
    <div class="user-img-box" @mouseenter="imgHover" @mouseleave="imgLeave">
      <div class="hover" v-if="isUserImgHover">
        <v-avatar class="user-img-bg" v-if="auth.loggedIn" color="teal" size="80">
          <v-img v-if="userObj.avatar||imgTemp" :src="imgTemp !== '' ? imgTemp :userObj.avatar"></v-img>
          <span style="font-size: 20px" v-if="userObj.avatar===''&&!imgTemp"
            class="white--text">{{userObj.name[0].toUpperCase()}}</span>
        </v-avatar>
        <!-- <img class="user-img-bg" :src="this.imgTemp === '' ? this.userImg : this.imgTemp"> -->
        <!-- 绑定上传按钮 -->
        <label for="upload">
          <img class="user-img" src="../assets/img/upload_photo.png" />
        </label>
      </div>
      <v-avatar class="user-img" v-if="auth.loggedIn" color="teal" size="80">
        <v-img v-if="userObj.avatar||imgTemp" :src="imgTemp !== '' ? imgTemp :userObj.avatar"></v-img>
        <span style="font-size: 20px" v-if="userObj.avatar===''&&!imgTemp"
          class="white--text">{{userObj.name[0].toUpperCase()}}</span>
      </v-avatar>
      <!-- <img class="user-img" :src="this.imgTemp === '' ? this.userImg : this.imgTemp"> -->
    </div>
    <input class="upload" id="upload" @change='selectImg' type="file">
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
  },
  data () {
    return {
      isUserImgHover: false,
      userName: '',
      imgTemp: '',
      imgFile: null,
      defaultImg: require('../assets/img/default_avatar_70.png'),
      headers: {
        authorization: 'authorization-text'
      },
      imgData: {
        accept: 'image/gif, image/jpeg, image/png, image/jpg'
      },
      ossImage: ''
    };
  },
  computed: {
    ...mapState({
      auth: state => state.auth,
      userObj () {
        const { user } = this.$store.state.auth
        return {
          name: user.username,
          avatar: user.avatar
        }
      }
    })
  },
  methods: {
    imgHover () {
      this.isUserImgHover = true
    },
    imgLeave () {
      this.isUserImgHover = false
    },
    async upload () {
      if (this.imgFile !== null) {
        console.log(1)
        // 创建formdata数据
        const formData = new FormData();
        formData.append('file', this.imgFile);
        const res = await this.$axios.$post('upload', formData)
        this.ossImage = res.url
        this.$emit('beforeUpload', this.ossImage)
      }
    },
    // 上传图片
    selectImg (event) {
      const reader = new FileReader();
      const img1 = event.target.files[0];
      const type = img1.type;// 文件的类型，判断是否是图片
      const size = img1.size;// 文件的大小，判断图片的大小
      if (this.imgData.accept.indexOf(type) === -1) {
        this.$message.open({
          content: '请选择我们支持的图片格式！'
        })
        return
      }
      if (size > 3145728) {
        this.$message.open({
          content: '请选择3M以内的图片！'
        })
        return
      }
      this.imgFile = img1
      reader.readAsDataURL(img1)
      reader.onload = (e) => {
        // 显示文件
        this.imgTemp = e.target.result
      }
      // 上传图片
      this.upload()
    }
  }
}
</script>

<style lang="sass" scoped>
.user-img-box
  width: 80px
  height: 80px
  background-size: 100% 100%
  background-repeat: no-repeat
  border-radius: 50%
  overflow: hidden
  .user-img-bg
    width: 80px
    height: 80px
    position: absolute
    z-index: -1
    .user-img
      width: 80px
      height: 80px
.hover
  width: 80px
  height: 80px
  cursor: pointer
  background-size: 100% 100%
  background-repeat: no-repeat
  .user-img
    width: 80px
    height: 80px
.user-input
  width: 100vw
  height: 44px
  margin-top: 10px
  display: flex
  align-items: center
  .user-input-text
    width: 60px
    height: 44px
    margin-left: 20px
    line-height: 44px
    font-size: 16px
    color: #333
    .user-name-input
      flex: 1
      height: 44px
      margin: 0px 20px 0px 10px
.upload
  width: 0px
  height: 0px
  visibility: hidden
</style>