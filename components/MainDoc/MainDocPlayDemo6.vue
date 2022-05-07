<template lang="pug">
.MainDocPlayDemo6
  b-message(type="is-info")
    | 画面幅ではなく実際にマウスの存在を判別し、マウスがあればhoverなどでセルが反応し、駒を持ち上げる動作になる
  .columns
    .column
      .has-text-centered
        | マウスが使えるときの挙動
      ShogiPlayer(v-bind="{...default_params, sp_device: 'is_device_desktop'}")
    .column
      .has-text-centered
        | スマホやタブレットでの挙動
      ShogiPlayer(v-bind="{...default_params, sp_device: 'is_device_touch'}")
</template>

<script>
export default {
  name: "MainDocPlayDemo6",
  computed: {
    default_params() {
      return {
        sp_run_mode: "play_mode",
        sp_summary: "is_summary_off",
      }
    },
  },
}
</script>

<style lang="sass">
// @import "./support.sass"
// .MainDocPlayDemo6
</style>
