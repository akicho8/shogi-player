<template lang="pug">
.AspectRatioFixedBlockWrap
  .AspectRatioFixedBlock(:class="ratio")
    .AspectRatioFixedBlockContainer
      slot
</template>

<script>
export default {
  name: "AspectRatioFixedBlock",
  props: {
    ratio: { type: String, required: false, default: "is_ratio_var" },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  +defvar(sp_board_aspect_ratio, 109.7%) // 盤の横を100としたときの縦の比率

  .AspectRatioFixedBlockWrap
    width: 100%

    .AspectRatioFixedBlock
      position: relative
      width: 100%

      &.is_ratio_4_3
        padding-top: 75%
      &.is_ratio_16_9
        padding-top: 56.25%
      &.is_ratio_3_2
        padding-top: 66.6666%
      &.is_ratio_1_1
        padding-top: 100%
      &.is_ratio_shogi
        // https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q1222739597
        padding-top: 109.7%
      &.is_ratio_var
        padding-top: var(--sp_board_aspect_ratio)

      .AspectRatioFixedBlockContainer
        +overlay_block
        // border: 1px dashed change_color($danger, $alpha: 0.5)
</style>
