<template lang="pug">
ul.PieceBox(
  v-if="base.edit_p"
  :class="component_class"
  @click.stop.prevent="base.piece_box_other_click"
  @click.right.prevent="base.hold_cancel"
  )
  li(
    v-for="[piece, count] in base.mediator.piece_box_realize()"
    :class="{holding_p: base.piece_box_have_p(piece)}"
    @click.stop.prevent="base.piece_box_piece_click(piece, $event)"
    @mouseover="base.piece_box_mouseover_handle(piece, $event)"
    @mouseleave="base.mouseleave_handle"
    )
    .piece_back(:class="base.piece_box_piece_back_class(piece)")
      .piece_fore(:class="base.piece_box_piece_inner_class(piece)" v-text="piece.name")
    .piece_count(v-if="count >= 1" :class="`piece_count${count}`")
      | {{count}}
</template>

<script>
import { support_child } from "./support_child.js"

export default {
  mixins: [support_child],

  computed: {
    component_class() {
      const list = []
      if (this.base.holding_p) {
        list.push("hoverable_p")
      }
      return list
    },
  },
}
</script>
