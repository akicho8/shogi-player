<template lang="pug">
.MainDocIndex
  MainDocHero
  MainDocDemo
</template>

<script>
export default {
  name: "MainDocIndex",
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocIndex
  +mobile
    font-size: 15px

  .content
    word-break: break-all

  .section
    +mobile
      margin: 2em 0em 1rem
      padding: 0

  .is_piece_variant_d
    --sp_board_piece_size: 1.0
</style>
