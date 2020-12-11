<template lang="pug">
.MainDocApp
  MainDocHero
  MainDocSummary
  MainDocDemo
  //- MainDocUsage
  //- MainDocApi
  //- MainDocCredit
</template>

<script>
export default {
  name: "MainDocApp",
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocApp
  +mobile
    font-size: 14px

  .content
    word-break: break-all

  .section
    +mobile
      margin: 2em 0em 1rem
      padding: 0

  .is_book_like
    --sp_grid_outer_stroke: 1
    --sp_board_padding: 0
    --sp_board_color: transparent

  .media-content
    font-size: $size-7
</style>
