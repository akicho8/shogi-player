<template lang="pug">
.PieceObject(v-if="count >= 1")
  .PieceTexture
    .PieceTextureSelf(:class="piece_texture_class")
</template>

<script>
import _ from "lodash"
import { support } from "./support.js"
import PieceObjectCount from "./PieceObjectCount.vue"

export default {
  name: "PieceObject",
  mixins: [support],
  components: {
    PieceObjectCount,
  },
  props: {
    piece_texture_class: { required: true              },
    count:               { required: false, default: 1 },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  +defvar(sp_mix_blend_mode, normal)    // 駒の mix-blend-mode の値

  // .BoardInner
  //   position: relative
  //   z-index: 1

  .PieceTexture
    +is_overlay_origin
  .PieceTextureSelf
    +is_overlay_block
    mix-blend-mode: difference
    background-size: contain      // 必ず駒の全体が表示されるようにする

  .BoardOuter
    .PieceObject
      width:  100%              // 外側の TD に合わせる
      height: 100%
    .PieceTexture
      width:  100%
      height: 100%
</style>
