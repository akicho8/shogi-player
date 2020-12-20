<template lang="pug">
.MainDocViewDemo1.column
  b-message(type="is-info")
    | コメント付きの KIF 表示。駒音あり
  .has-text-centered
    .title.is-4 六代大橋宗銀 vs 伊藤印達
    .subtitle.is-6 57番指し第57局 (1711/2/28)
  ShogiPlayer(
    :kifu_body="kifu_body"
    :start_turn="-1"
    :sp_bg_variant="'is_bg_variant_a'"
    :sp_pi_variant="'is_pi_variant_a1by'"
    :sound_effect="true"
    :volume="0.25"
    :sp_layer="'is_layer_off'"
    :sp_blink="'is_blink_on'"
    :sp_layout="'is_horizontal'"
    :debug_mode_p="false"
  )
</template>

<script>
import kifu_body from "./kif/15733.kif"

export default {
  name: "MainDocViewDemo1",
  data() {
    return {
      kifu_body: kifu_body,
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocViewDemo1
</style>
