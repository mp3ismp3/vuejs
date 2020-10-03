import Vue from 'vue'
import Router from 'vue-router'
import PageOrder from '@/components/pages/PageOrder'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/PageOrder',
      name: 'PageOrder',
      component: PageOrder
    },
  ]
})
