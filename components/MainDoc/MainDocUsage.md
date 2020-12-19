## Nuxt.js への組み込み例

インストール

    % yarn add shogi-player

事前設定

    # in nuxt.config.js

    export default {
      build: {
        transpile: ["shogi-player/components"],
      },
    }

コンポーネント

    <template lang="pug">
    .MySample.section
      .container
        .columns.is-centered
          .column.is-6-desktop
            ShogiPlayer(
              :sp_layout="'is_horizontal'"
              )
    </template>

    <script>
    import ShogiPlayer from "shogi-player/components/ShogiPlayer.vue"

    export default {
      name: "MySample",
      components: {
        ShogiPlayer,
      },
    }
    </script>

    <style lang="sass">
    $sp_assets_dir: "../node_modules/shogi-player/assets"
    @import "../node_modules/shogi-player/components/ShogiPlayer.sass"

    .MySample
      // CSSのカスタマイズ等
      --sp_ground_color: transparent // 盤は透明にする
      +mobile
        --sp_board_radius: 0 // モバイルのときに角を丸めない
    </style>
