<template lang="pug">
.MainDocEditDemo1.column
  b-message(type="is-info")
    | すべての駒を自由に動かせる
  ShogiPlayer(
    :sp_body="'position startpos moves 7g7f 8c8d 2h6h 3c3d 6g6f 7a6b 3i3h 5a4b 4g4f 4b3b 3g3f 2b3c 1g1f 8d8e 8h7g 3b2b 7i7h 5c5d 7h6g 6a5b 2i3g 1a1b 6g5f 5d5e 5f4e 8b8d 3f3e 3d3e 3g2e 3c4d 6f6e 2c2d 6e6d 2d2e 4e4d 4c4d 7g5e N*3b P*3c 2b3c B*4e P*5d 5e6f 3c2b 6f8d 4d4e 6d6c+'"
    :sp_turn="-1"
    :sp_sound_enabled="true"
    :sp_sound_volume="0.25"
    sp_slider="is_slider_on"
    sp_bg_variant="is_bg_variant_a"
    sp_debug="is_debug_off"
    sp_run_mode="edit_mode"
    )
</template>

<script>
export default {
  name: "MainDocEditDemo1",
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocEditDemo1
</style>
