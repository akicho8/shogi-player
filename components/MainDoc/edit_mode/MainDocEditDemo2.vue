<template lang="pug">
.MainDocEditDemo2.column
  b-message(type="is-info")
    | 詰将棋用の初期配置で開始
  ShogiPlayer(
    sp_preset="詰将棋"
    :sp_slider="true"
    sp_bg_variant="is_bg_variant_a"
    sp_debug_mode="is_debug_mode_off"
    sp_mode="edit"
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
@import "../support.sass"
.MainDocEditDemo2
</style>
