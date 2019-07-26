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

## React で使う場合

    import React from 'react'
    import ReactDOM from 'react-dom'
    import ShogiPlayer from 'shogi-player/react/src/ShogiPlayer.js'

    class App extends React.Component {
      render() {
        return (
          <ShogiPlayer kifu_body='position startpos moves 7g7f 8c8d' start_turn="9" />
        )
      }
    }

    ReactDOM.render(
      <App />,
      document.getElementById('app')
    )

<article class="message is-warning">
  <div class="message-header">
    <p>注意点</p>
  </div>
  <div class="message-body">
     React 版は最低限の機能しかない
  </div>
</article>

## JavaScript に変換したものを直接使う場合

    TODO: どうやって単体でビルドするのかわからないので気が向いたら調べる

## 独自のスライダーを定義する例

    <ShogiPlayer kifu_body='position startpos moves 7g7f 8c8d' ref="sp" />

    <template v-if="$refs.sp">
      <input type="range" :value="$refs.sp.real_turn" @input="$refs.sp.current_turn_set($event.target.value)" :min="$refs.sp.turn_min" :max="$refs.sp.turn_max" />

$refs をテンプレート内で使うのはよくないようです(2019-05-09)
