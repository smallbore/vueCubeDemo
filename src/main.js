import 'amfe-flexible'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Cube from 'cube-ui'
import App from './App'
import router from './router'
import VueJsonp from 'vue-jsonp'

import '@/styles/style.styl'

Vue.use(Cube)
Vue.use(VueJsonp)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
