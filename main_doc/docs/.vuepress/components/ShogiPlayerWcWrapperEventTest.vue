<template>
<ShogiPlayerWcWrapper sp_mode="play" @ev_play_mode_move="move_handle" />
</template>

<script>
export default {
  methods: {
    move_handle(e) {
      console.log(e)
      alert(e.detail[0].last_move_info.to_kif)
    },
  },
}
</script>
