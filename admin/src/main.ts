import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element'
import './sass/style.scss'
Vue.config.productionTip = false
//导入axios 并配置
import axios from 'axios'
const http = axios.create({
	baseURL: process.env.VUE_APP_API_URL
})
window.axios = http
// Vue.prototype.$httpajax = http
Vue.prototype.$http = http
//使用动态表单
import EleForm from 'vue-ele-form'
Vue.use(EleForm)

//使用crud模板组件
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
Vue.use(Avue);

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
