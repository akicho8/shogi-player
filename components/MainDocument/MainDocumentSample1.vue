<template lang="pug">
.MainDocumentSample1.column
  b-message(size="is-small")
    | コメント付きの KIF 表示。9手目から表示。駒音あり
  .has-text-centered
    .title.is-4 藤井聡太四段 vs 佐藤天彦名人
    .subtitle.is-6 第11回朝日杯将棋オープン戦本戦
  ShogiPlayer.first_sp(
    :kifu_body="kifu_body"
    :start_turn="9"
    :slider_show="true"
    :controller_show="true"
    :sp_bg_variant="'is_bg_variant_a'"
    :sp_pi_variant="'is_pi_variant_a'"
    :sound_effect="true"
    :volume="0.25"
    :sp_layer="'is_layer_off'"
    :sp_layout="'is_horizontal'"
    :debug_mode_p="false"
  )
</template>

<script>
import kifu_body from "./kif/第11回朝日杯将棋オープン戦本戦.kif"

export default {
  name: "MainDocumentSample1",
  data() {
    return {
      kifu_body: kifu_body,
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocumentSample1
</style>
