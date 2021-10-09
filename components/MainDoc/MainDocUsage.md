## Nuxt.js への組み込み方法 (2021-10-09 こっちは動く)

create-nuxt-app したときの選択肢

- UI framework → Buefy
- Programming language → JavaScript
- Linting tools: → なし

nuxt.config.js の build の所をこうする

    build: {
      transpile: ["shogi-player"],
    },

buefy で便利 mixin をグローバルで使えるようにする。nuxt.config.js も変更する必要あり。

    yarn add --dev @nuxtjs/style-resources

shogi-player のスタイルを読み込む

書き切れないので https://github.com/akicho8/shogi-player-nuxt-sample を見てください

## Vue CLI への組み込み方法 (2021-09-12 動かなくなりました。解決方法求む)

バージョン確認

    % node -v
    v12.13.0

    % vue -V
    @vue/cli 4.5.13

~/src/shogi-player-vue-cli-sample に作成することにします

    % cd ~/src

    % vue create shogi-player-vue-cli-sample
    ↑
    Default ([Vue 2] babel, eslint) を選択

    % cd shogi-player-vue-cli-sample

    % yarn add shogi-player

既存の components/HelloWorld.vue をこのような内容に書き換えます

    <template lang="pug">
    .is-flex.is-justify-content-center
      .MyShogiPlayerContainer
        ShogiPlayer(
          sp_layout="is_horizontal"
          sp_controller="is_controller_on"
          sp_body="position sfen lnsgkgsnl/1r7/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1 moves 7a6b 7g7f 5c5d 2g2f 5a4b 2f2e 4b3b 2e2d 2c2d 2h2d 6b5c 2d2f P*2c 3i4h 8c8d 7i7h 8d8e 8h7g 4a4b 5g5f 6a5b 6g6f 7c7d 7g6h 5c6d 7h6g 5b5c 6i7h 9c9d 9g9f 5c4d 6f6e 6d7c 4h5g 8b6b 8i7g 6b8b 5g6f 1c1d 1g1f 9d9e 9f9e 8e8f 8g8f 9a9e P*9g 9e9g 9i9g P*9f 7g8e 9f9g+ 8e7c+ 8a7c P*9d 8b9b S*8c 9b9a 2f2h P*8g 6h4f 5d5e 6f5e 4d4e 4f5g 7c6e 5g8d N*3e L*2g 3e2g+ 2h2g 8g8h+ 7h6h 9g8g 5e6f 8h7h 6g7h 8g7h 6h7h L*6d P*6g 4e5f P*5h P*5g 2g2f L*5c 6f6e 6d6e 5i6h 5g5h+ 4i5h P*5g 5h4h S*8i N*7i P*8g 7h8g S*7h N*6f 9a8a 9d9c+ 7h8g+ 7i8g 8a8c 9c8c G*7h 6h5i S*5h"
          )
    </template>

    <script>
    import Vue from "vue"

    // Buefy
    import Buefy from "buefy"
    import "buefy/dist/buefy.css"
    Vue.use(Buefy)

    // 本体
    import ShogiPlayer from "shogi-player/components/ShogiPlayer.vue"

    export default {
      name: "HelloWorld",
      components: {
        ShogiPlayer,
      },
      props: {
        msg: String,
      },
    }
    </script>

    <style lang="sass">
    // ShogiPlayer のスタイルの読み込み
    $sp_assets_dir: "../../node_modules/shogi-player/assets"
    @import "../../node_modules/shogi-player/components/ShogiPlayer.sass"

    // これは public/index.html で読み込んだ方がいいかも
    @import url("https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css")

    // +mobile などを使うため
    @import "~bulma/sass/utilities/_all"

    // ShogiPlayer は常に横100%まで広がるので外側で大きさを調整する
    .MyShogiPlayerContainer
      +mobile
        width: 100%
      +tablet
        width: 80vmin
    </style>

起動

    vue-cli-service serve --port 3100 --open

<div class="notification is-warning">
2021-09-12
ここ↑でクラス定数や "??" 構文がパースできなくて起動しなくなりました (昔はクラス定数などを使ってなかったのでたまたま動いていた)
Nuxt だと nuxt.config.js の build の transpile で shogi-player を指定するとビルドできます
しかし Vue CLI だとどうやって node_modules をビルドするのかわかりません。お手上げです (2021-09-12)
</div>

完成品は https://github.com/akicho8/shogi-player-vue-cli-sample に置いています

上の手順をまとめた半自動生成スクリプトはこちら [shogi-player-vue-cli-sample-create.sh](https://github.com/akicho8/shogi-player/blob/master/shogi-player-vue-cli-sample-create.sh) です
