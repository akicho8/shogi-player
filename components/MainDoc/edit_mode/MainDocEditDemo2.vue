<template lang="pug">
.MainDocEditDemo2.column
  b-message(type="is-info")
    | 詰将棋用の初期配置で開始
  ShogiPlayer(
    sp_preset="詰将棋"
    sp_slider
    sp_board_variant="wood_normal"
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
