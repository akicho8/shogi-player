<template lang="pug">
.AspectRatioFixedBlock
  slot
</template>

<script>
export default {
  name: "AspectRatioFixedBlock",
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayer
  +defvar(sp_board_aspect_ratio, 1.097) // 盤の横を1.0としたときの縦の比率

  .AspectRatioFixedBlock
    width: 100%
    aspect-ratio: 1 / var(--sp_board_aspect_ratio)
</style>
