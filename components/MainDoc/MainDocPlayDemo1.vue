<template lang="pug">
.MainDocPlayDemo1.column
  b-message(type="is-info")
    | 人間が操作できる。戻れば操作をやり直せる。デフォルトでは(二歩や千日手を除く)合法手のみの制限がある
  ShogiPlayer(
    :sp_body="kifu_book_info.sp_body"
    :sp_turn="-1"
    sp_slider="is_slider_on"
    sp_controller="is_controller_on"
    sp_bg_variant="is_bg_variant_a"
    :sp_sound_enabled="true"
    :sp_sound_volume="0.25"
    sp_debug="is_debug_off"
    sp_run_mode="play_mode"
    )
</template>

<script>
import { KifuBookInfo } from "../models/kifu_book_info.js"

export default {
  name: "MainDocPlayDemo1",
  data() {
    return {
      kifu_book_info: KifuBookInfo.fetch("KIF_15733"),
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocPlayDemo1
</style>
