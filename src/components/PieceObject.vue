<template lang="pug">
.PieceObject
  .piece_fore(:class="tclass")
    template(v-if="base.simple_p")
      | {{piece_text}}
</template>

<script>
import _ from "lodash"
import { support_child } from "./support_child.js"

export default {
  name: "PieceObject",
  mixins: [support_child],
  props: {
    tclass: { required: true  },
    piece_text:  { required: false },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.shogi-player
  .PieceObject
    height: 100%    // 駒全体を表示するため

    cursor: default // テキスト選択「I」ではなく矢印カーソルとする
    &.selectable_p
      &:hover
        cursor: pointer
</style>
