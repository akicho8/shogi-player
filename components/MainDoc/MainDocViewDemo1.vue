<template lang="pug">
.MainDocViewDemo1.column
  b-message(type="is-info")
    | コメント付きのKIF表示。駒音あり。view_modeは再生用のモードだけど、継盤のような感じでデフォルトでは駒を動かせる。勝手に駒を動かした後でも手を進めると本線に戻る
  .has-text-centered
    .title.is-4 {{kifu_book_info.name}}
  ShogiPlayer(
    :sp_body="kifu_book_info.sp_body"
    :sp_turn="4"
    :sp_player_info="sp_player_info"
    :sp_sound_enabled="true"
    :sp_sound_volume="0.25"
    sp_bg_variant="is_bg_variant_b"
    sp_pi_variant="is_pi_variant_g"
    sp_blink="is_blink_on"
    sp_layout="is_horizontal"
    sp_controller="is_controller_on"
    sp_slider="is_slider_on"
  )
</template>

<script>
import { KifuBookInfo } from "../models/kifu_book_info.js"

export default {
  name: "MainDocViewDemo1",
  data() {
    return {
      kifu_book_info: KifuBookInfo.fetch("KIF_15733"),
      sp_player_info: {
        black: { name: "六代大橋宗銀", },
        white: { name: "伊藤印達",     },
      },
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocViewDemo1
</style>
