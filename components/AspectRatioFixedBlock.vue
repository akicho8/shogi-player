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
  +defvar(sp_board_aspect_ratio, 109.7) // 盤の横を100としたときの縦の比率

  // TODO: https://techblog.yahoo.co.jp/entry/2020122130052964/#8.%E3%82%A2%E3%82%B9%E3%83%9A%E3%82%AF%E3%83%88%E6%AF%94%E3%82%92%E7%B0%A1%E5%8D%98%E3%81%AB%E4%BF%9D%E3%81%A4%EF%BC%9A%E3%80%8Caspect-ratio%E3%80%8D
  .AspectRatioFixedBlockWrap
    width: 100%

    .AspectRatioFixedBlock
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
        padding-top: calc(var(--sp_board_aspect_ratio) * 1%)

      +is_overlay_origin
      .AspectRatioFixedBlockContainer
        +is_overlay_block
        // border: 1px dashed change_color($danger, $alpha: 0.5)
</style>
