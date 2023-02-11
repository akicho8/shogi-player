<template>
<ShogiPlayerWcWrapper sp_run_mode="play_mode" @ev:play_mode_next_info="move_handle" />
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
