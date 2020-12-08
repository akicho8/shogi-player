import Vue from 'vue'
import Router from 'vue-router'
import SpDocument from '@/components/SpDocument'
import StyleEditor from '@/components/StyleEditor'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',            name: 'SpDocument',  component: SpDocument,  },
    { path: '/StyleEditor', name: 'StyleEditor', component: StyleEditor, },
  ],
})
