<template lang="pug">
.test-test_simple_paper_style
  .section
    .container
      ShogiPlayer(
        sp_layout="horizontal"
        sp_piece_variant="b"
        :sp_coordinate="true"
      )
</template>

<script>
export default {
}
</script>

<style lang="sass">
.test-test_simple_paper_style
  .container
    width: 40%
  .ShogiPlayer
    --sp_board_padding: 0
    --sp_board_color: white
    --sp_grid_inner_stroke: 1
    --sp_grid_outer_stroke: 2
</style>
