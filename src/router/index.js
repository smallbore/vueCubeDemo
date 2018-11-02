import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import secret from '@/pages/secret'
import setting from '@/pages/setting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/secret',
      name: 'secret',
      component: secret
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting
    }
  ]
})
