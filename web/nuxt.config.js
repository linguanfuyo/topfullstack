import colors from 'vuetify/es5/util/colors'
//配置dotenv 用于处理环境变量
import dotenv from 'dotenv'
dotenv.config()
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href:"https://fonts.googleapis.com/css?family=Material+Icons", rel:"stylesheet"}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'ant-design-vue/dist/antd.css',
    'video.js/dist/video-js.css',
    'vue-video-player/src/custom-theme.css',
    'assets/style/main.scss',
    
    /* 定义滑块 内阴影+圆角 */
  ],
  styleResources:{
    scss:[
      './assets/styles/main.scss'
    ]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/route.js', // 配置路由守卫
    '@/plugins/antd-ui',  // 导入antUI
    '@/plugins/axios', // 导入axios请求包
    { src: '~plugins/nuxt-video-player-plugin.js', ssr: false } // 导入视频播放组件 ssr: false 是否服务端渲染
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    // '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources' // 全局样式

  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    
  },
  proxy: {
    '/api/': {
      target: 'https://lgf-tofullstack.oss-cn-hangzhou.aliyuncs.com/', // 目标服务器ip
      pathRewrite: {
        '^/api/': '/',
        changeOrigin: true
      }
    }
  },
  // 全局路由
  router: {
    // middleware: ['auth']
  },
  // 配置auth  路由卫士 + cookie / vuex 持久化操作 + 登入登出重定向 + 自带 auth 请求头
  // 更多登录策略
  auth: {
      strategies: {
          local: {
            endpoints: {
              login: { url: '/auth/login',propertyName: 'token'},
              logout: { url: '/auth/logout'},
              user: { url: '/auth/user',propertyName: false}
            },
            // tokenRequired: true,
            // tokenType: 'bearer',
            // globalToken: true,
            autoFetchUser: true // 是否自动获取用户信息
          },
          github: {
            client_id: '229aace769ca428f3844',
            client_secret: 'e4db5b78482267290cceed2d6aa524fae21a24cb'
          },
          social: {
            _scheme: 'oauth2',
            authorization_endpoint: 'https://passport.yhd.com/wechat/login.do',
            userinfo_endpoint: 'https://passport.yhd.com/wechat/login.do',
            scope: ['openid', 'profile', 'email'],
            access_type: 'code',
            access_token_endpoint: 'https://passport.yhd.com/wechat/login.do',
            response_type: 'token',
            token_type: 'Bearer',
            redirect_uri: '/login',
            client_id: 'SET_ME',
            token_key: 'access_token',
            state: 'UNIQUE_AND_NON_GUESSABLE'
          }
          
        },
        // cookie: {
        //   options: {
        //     maxAge: 60 * 60 * 24 * 7
        //   }
        // },
        redirect: {
          login: '/login',
          logout: '/',
          callback: '/login',
          home: '/'
        },
        // localStorage: false
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}