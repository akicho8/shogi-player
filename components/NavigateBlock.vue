<template lang="pug">
// よかれと考えてこれに v-sp-disable-interactions を指定すると touchstart の制限が影響してコントローラー(ボタン)が押せなくなるので注意せよ
.NavigateBlock(v-if="TheSP.inside_navigate_p")
  .NavigateBlockInside
    SpController(v-if="TheSP.inside_controller_p")
    SpSlider(v-if="TheSP.inside_slider_p" ref="SpSlider")
</template>

<script>
import { support } from "./support.js"
import SpController from "./SpController.vue"
import SpSlider from "./SpSlider.vue"

export default {
  name: "NavigateBlock",
  mixins: [support],
  components: {
    SpSlider,
    SpController,
  },
  mounted() {
    this.TheSP.$NavigateBlock = this // どこからでも refs するための荒技
  },
}
</script>

<style lang="sass">
@import "./support"

.ShogiPlayer
  +defvar(sp_controller_width, 0.5)        // コントローラー横幅
  +defvar(sp_controller_width_mobile, 0.8) // コントローラー横幅(モバイル時)

  .NavigateBlock
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column

  .NavigateBlockInside
    +tablet
      width: calc(var(--sp_controller_width) * var(--sp_board_entire_current_w))
    +mobile
      width: calc(var(--sp_controller_width_mobile) * var(--sp_board_entire_current_w))

  &.is_layer_on
    .NavigateBlock, .NavigateBlockInside
      +is_layer_border($danger)
</style>
