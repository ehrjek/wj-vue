// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'
import axios from 'axios'
// import 'vee-validate'
// import echarts from 'echarts'
const echarts = require('echarts')
Vue.prototype.echarts = echarts

Vue.prototype.moment = moment
Vue.use(ElementUI)
Vue.prototype.axios = axios
Vue.config.productionTip = false
// axios.defaults.baseURL = 'http://218.93.206.188:49734/dmsapi'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
