import Vue from 'vue'
//  动态引入ant-design-vue模块
import message from 'ant-design-vue/lib/message';
import upload from 'ant-design-vue/lib/upload';
import icon from 'ant-design-vue/lib/icon';
import modal from 'ant-design-vue/lib/modal';
import input from 'ant-design-vue/lib/input';
import alert from 'ant-design-vue/lib/alert';
import select from 'ant-design-vue/lib/select';
Vue.use(upload)
Vue.use(icon)
Vue.use(modal)
Vue.use(input)
Vue.use(alert)
Vue.use(select)
message.config({
    maxCount: 3
  });
Vue.prototype.$message = message;