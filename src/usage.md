## Rails (+ Vue) の場合

インストール

    % yarn add shogi-player

読み込み

(in app/javascript/packs/shogi_player.js)

    import Vue from "vue/dist/vue.esm"
    import ShogiPlayer from "shogi-player/src/components/ShogiPlayer.vue"

    import _ from "lodash"
    Object.defineProperty(Vue.prototype, "_", {value: _})

    document.addEventListener("DOMContentLoaded", () => {
      new Vue({
        el: "#shogi_player_app",
        components: { ShogiPlayer },
      })
    })

表示

(in app/views/xxx/show.html.erb)

    <!-- JavaScript の読み込み -->
    <%= javascript_pack_tag("shogi_player") %>

    <!-- CSSの読み込み (読み込まずに独自のデザインを適用してもかまいません) -->
    <%= stylesheet_pack_tag("shogi_player") %>

    <div id="shogi_player_app">
      <ShogiPlayer :kifu_body="'position startpos moves 7g7f 8c8d'"></ShogiPlayer>
    </div>

## React で使う場合

    import React from 'react'
    port ShogiPlayer from './shogi-player/react/src/ShogiPlayer.js

    class App extends React.Component {
      render() {
        return (
          <ShogiPlayer kifu_body='position startpos moves 7g7f 8c8d' turn_start="9" />
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
