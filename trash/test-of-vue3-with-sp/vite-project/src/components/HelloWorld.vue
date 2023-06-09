<script setup>
const ev_play_mode_move = e => {
  alert(1)
  alert(e.detail[0].last_move_info.to_kif)
}
</script>

<template>
<shogi-player-wc sp_viewpoint="white" sp_dev_tools="true" sp_mode="play" @ev_play_mode_move="ev_play_mode_move"></shogi-player-wc>
</template>

<style scoped>
</style>
