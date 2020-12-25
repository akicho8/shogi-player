## Nuxt.js への組み込み例

インストール

    yarn add shogi-player

事前設定

    # in nuxt.config.js

    export default {
      build: {
        transpile: ["shogi-player/components"],
      },
    }

コンポーネント

    <template lang="pug">
    .MyPage.section
      .container
        .columns.is-centered
          .column.is-half-desktop
            ShogiPlayer
    </template>

    <script>
    import ShogiPlayer from "shogi-player/components/ShogiPlayer.vue"

    export default {
      name: "MyPage",
      components: {
        ShogiPlayer,
      },
    }
    </script>

    <style lang="sass">
    $sp_assets_dir: "../node_modules/shogi-player/assets"
    @import "../node_modules/shogi-player/components/ShogiPlayer.sass"

    .MyPage
      +mobile
        --sp_board_radius: 0 // モバイルのときに角を丸めない
    </style>
