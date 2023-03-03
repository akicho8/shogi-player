import Vue from "vue"
import App from "./App.vue"

Vue.config.productionTip = false

// Buefy
import Buefy from "buefy"
import "buefy/dist/buefy.css" // カスタイズする場合はこれ読み込まず分割してSASS変数を設定する
Vue.use(Buefy)

// ShogiPlayer
import "@/assets/application.sass"

new Vue({
  render: h => h(App),
}).$mount("#app")
