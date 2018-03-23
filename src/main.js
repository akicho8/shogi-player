// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'bulma/bulma.sass'
import "./components/ShogiPlayer.sass" // Rails 側で sp_assets_dir を変更してから読み込みたいので .vue の中では読まないようにする

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
