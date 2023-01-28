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
    font-size: 15px

  .content
    word-break: break-all

  .section
    +mobile
      margin: 2em 0em 1rem
      padding: 0

  .is_pi_variant_d
    --sp_board_piece_rate: 100%
</style>
