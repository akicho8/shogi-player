## Rails + Vue.js の場合

インストール

    % yarn add shogi-player

読み込み

(in app/javascript/packs/shogi_player_app.js)

    import Vue from 'vue/dist/vue.esm'

    import Buefy from 'buefy'
    // import 'buefy/lib/buefy.css'
    Vue.use(Buefy)

    import Vuex from "vuex"
    Vue.use(Vuex)

    import _ from "lodash"
    Object.defineProperty(Vue.prototype, '_', {value: _})

    import ShogiPlayer from 'shogi-player/src/components/ShogiPlayer.vue'

    document.addEventListener('DOMContentLoaded', () => {
      new Vue({
        el: '#app',
        components: {
          ShogiPlayer,
        },
      })
    })

(in app/javascript/packs/shogi_player_app.sass)

    // Bulma
    // @import "../../../node_modules/bulma/sass/utilities/initial-variables.sass"
    // @import "../../../node_modules/bulma/sass/utilities/derived-variables.sass"
    @import "~buefy/src/scss/buefy-build.scss"

    // ShogiPlayer
    $sp_assets_dir: "../../../node_modules/shogi-player/src/assets"
    @import "../../../node_modules/shogi-player/src/components/ShogiPlayer.sass"

表示

(in app/views/xxx/show.html.erb)

    <%= javascript_pack_tag("shogi_player_app") %>
    <%= stylesheet_pack_tag("shogi_player_app") %>

    <div id="shogi_player_app">
      <ShogiPlayer :kifu_body="'position startpos moves 7g7f 8c8d'"></ShogiPlayer>
    </div>
