## Rails の場合

インストール

    % yarn add shogi_player

読み込み

(in app/javascript/packs/shogi_player.js)

    import Vue from 'vue/dist/vue.esm'
    import ShogiPlayer from 'shogi_player/src/components/ShogiPlayer.vue'

    document.addEventListener('DOMContentLoaded', () => {
      new Vue({
        el: '#shogi_player_app',
        components: { ShogiPlayer },
      })
    })

表示

(in app/views/xxx/show.html.erb)

    <%= javascript_pack_tag("shogi_player") %>
    <%= stylesheet_pack_tag("shogi_player") %>

    <div id="shogi_player_app">
      <ShogiPlayer :kifu_body="'position startpos moves 7g7f 8c8d'"></ShogiPlayer>
    </div>

## JavaScript に変換したものを直接使う場合

    ただいま調査中……
