import Vue from 'vue'
import Router from 'vue-router'
import HelloPlayer from '@/components/HelloPlayer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloPlayer',
      component: HelloPlayer
    }
  ]
})
