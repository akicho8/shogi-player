## Rails の場合

インストール

    % yarn add shogi_player

読み込み

    // in app/javascript/packs/shogi_player.js

    import Vue from 'vue/dist/vue.esm'
    import ShogiPlayer from 'shogi_player/src/components/ShogiPlayer.vue'

    document.addEventListener('DOMContentLoaded', () => {
      const app = new Vue({
        el: '#shogi_player_app',
        components: { "shogi_player": ShogiPlayer },
      })
    })

表示

    in app/views/xxx/show.html.erb

    <!-- JavaScript の読み込み -->
    <%= javascript_pack_tag("shogi_player") %>

    <!-- CSSの読み込み (読み込まずに独自のデザインを適用してもかまいません) -->
    <%= stylesheet_pack_tag("shogi_player") %>

    <div id="shogi_player_app">
      <shogi_player :kifu_body="'position startpos moves 7g7f 8c8d'"></shogi_player>
    </div>

## JavaScript に変換したものを直接使う場合

    ただいま調査中……
