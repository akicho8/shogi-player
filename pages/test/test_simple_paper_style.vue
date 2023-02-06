<template lang="pug">
.test-test_simple_paper_style
  .section
    .container
      ShogiPlayer(
        sp_layout="is_layout_horizontal"
        sp_piece_variant="is_piece_variant_b"
        sp_summary="is_summary_off"
        sp_digit_label="is_digit_label_on"
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
    --sp_grid_stroke: 1
    --sp_grid_outer_stroke: 2
</style>
