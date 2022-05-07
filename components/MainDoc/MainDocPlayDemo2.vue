<template lang="pug">
.MainDocPlayDemo2.column
  b-message(type="is-info")
    | sp_human_side オプションで▲側だけを人間が操作できるようにする。これは主にCPU対人間のときに使う
  ShogiPlayer(
    :sp_body="kifu_book_info.sp_body"
    :sp_turn="21"
    sp_slider="is_slider_on"
    sp_controller="is_controller_on"
    sp_bg_variant="is_bg_variant_f"
    :sp_sound_enabled="true"
    :sp_sound_volume="0.25"
    sp_debug_mode="is_debug_mode_off"
    sp_run_mode="play_mode"
    sp_human_side="black"
    )
</template>

<script>
import { KifuBookInfo } from "../models/kifu_book_info.js"

export default {
  name: "MainDocPlayDemo2",
  data() {
    return {
      kifu_book_info: KifuBookInfo.fetch("KIF_15733"),
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocPlayDemo2
</style>
