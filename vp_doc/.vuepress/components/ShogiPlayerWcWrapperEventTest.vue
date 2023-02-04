<template>
<ShogiPlayerWcWrapper sp_run_mode="play_mode" @update:play_mode_advanced_full_moves_sfen="receive_handld" />
</template>

<script>
export default {
  methods: {
    receive_handld(e) {
      console.log(e)
      alert(e.detail[0].last_move_info.to_kif)
    },
  },
}
</script>

<style lang="stylus">
</style>
