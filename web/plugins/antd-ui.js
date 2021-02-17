import Vue from 'vue'
//  动态引入ant-design-vue模块
import message from 'ant-design-vue/lib/message';
import upload from 'ant-design-vue/lib/upload';
import icon from 'ant-design-vue/lib/icon';
import modal from 'ant-design-vue/lib/modal';
import input from 'ant-design-vue/lib/input';
import alert from 'ant-design-vue/lib/alert';
import select from 'ant-design-vue/lib/select';
import button from 'ant-design-vue/lib/button';
import radio from 'ant-design-vue/lib/radio';
import textarea from 'ant-design-vue/lib/radio';
import empty from 'ant-design-vue/lib/empty';
import spin from 'ant-design-vue/lib/spin';
import popover from 'ant-design-vue/lib/popover'; 
import backtop from 'ant-design-vue/lib/back-top';
import carousel from 'ant-design-vue/lib/carousel';
import progress from 'ant-design-vue/lib/progress';
Vue.use(upload)
Vue.use(icon)
Vue.use(modal)
Vue.use(input)
Vue.use(alert)
Vue.use(select)
Vue.use(button)
Vue.use(radio)
Vue.use(textarea)
Vue.use(empty)
Vue.use(spin)
Vue.use(popover)
Vue.use(backtop)
Vue.use(carousel)
Vue.use(progress)
message.config({
    maxCount: 3
  });
Vue.prototype.$message = message;