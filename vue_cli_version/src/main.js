// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy)

import ShogiPlayer from './components/ShogiPlayer'
Vue.component("ShogiPlayer", ShogiPlayer)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// import Vue from 'vue'
//
// import App from './App'
// import StyleEditor from './StyleEditor'
//
// import Buefy from 'buefy'
// import 'buefy/dist/buefy.css'
// Vue.use(Buefy)
//
// // import 'bulma/bulma.sass'
// // import "buefy/src/scss/buefy-build.scss"
//
// // import "~buefy/src/scss/buefy-build.scss"
// // import "./components/ShogiPlayer.sass" // Rails 側で sp_assets_dir を変更してから読み込みたいので .vue の中では読まないようにする
//
// Vue.config.productionTip = true
//
// // new Vue({
// //   el: '#app',
// //   router,
// //   template: '<App/>',
// //   components: {
// //     App,
// //   }
// // })
//
// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')
