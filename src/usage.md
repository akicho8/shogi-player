## Rails (+ Vue) の場合

インストール

    % yarn add shogi-player

読み込み

(in app/javascript/packs/shogi_player_app.js)

    import Vue from 'vue/dist/vue.esm'
     
    import Buefy from 'buefy'
    import 'buefy/lib/buefy.css'
    Vue.use(Buefy)
     
    import ShogiPlayer from 'shogi-player/src/components/ShogiPlayer.vue'
    Vue.component('shogi-player', ShogiPlayer)
     
    import { PresetInfo } from "shogi-player/src/preset_info.js"
    import { RunModeInfo } from "shogi-player/src/run_mode_info.js"
    import { ThemeInfo } from "shogi-player/src/theme_info.js"
    import { SizeInfo } from "shogi-player/src/size_info.js"
    import { VariationInfo } from "shogi-player/src/variation_info.js"

    Object.defineProperty(Vue.prototype, 'PresetInfo', {value: PresetInfo})
    Object.defineProperty(Vue.prototype, 'RunModeInfo', {value: RunModeInfo})
    Object.defineProperty(Vue.prototype, 'ThemeInfo', {value: ThemeInfo})
    Object.defineProperty(Vue.prototype, 'SizeInfo', {value: SizeInfo})
    Object.defineProperty(Vue.prototype, 'VariationInfo', {value: VariationInfo})

    import Vuex from "vuex"
    Vue.use(Vuex)
     
    import _ from "lodash"
    Object.defineProperty(Vue.prototype, '_', {value: _})

    document.addEventListener('DOMContentLoaded', () => {
      new Vue({
        el: '#shogi_player_app',
      })
    })

(in app/javascript/packs/shogi_player_app.sass)

    // Bulma
    @import "../../../node_modules/bulma/sass/utilities/initial-variables.sass"
    @import "../../../node_modules/bulma/sass/utilities/derived-variables.sass"
     
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
     React 版は最低限の機能しかありません
  </div>
</article>

## JavaScript に変換したものを直接使う場合

    ただいま調査中
