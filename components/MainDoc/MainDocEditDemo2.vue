<template lang="pug">
.MainDocEditDemo2.column
  b-message(type="is-info")
    | 詰将棋用の初期配置で開始
  ShogiPlayer(
    sp_preset_key="詰将棋"
    :sp_sound_enabled="true"
    :sp_sound_volume="0.25"
    sp_slider="is_slider_on"
    sp_bg_variant="is_bg_variant_a"
    sp_debug_mode="is_debug_mode_off"
    sp_run_mode="edit_mode"
    )
</template>

<script>
export default {
  name: "MainDocEditDemo2",
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocEditDemo2
</style>
