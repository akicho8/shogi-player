<template lang="pug">
.ThinkMarkLayer.GeneralMarkLayer(v-if="current_items.length >= 1" :class="css_class")
  .general_mark_effect_container.is-overlay
    .general_mark_effect
  .general_mark_group_name_container.is-overlay
    template(v-for="(item, i) in current_items")
      .general_mark_group_name(v-if="item.general_mark_group_name")
        | {{item.general_mark_group_name}}
</template>

<script>
import _ from "lodash"

import { support } from "../../support.js"

export default {
  name: "ThinkMarkLayer",
  mixins: [support],
  props: {
    general_mark_pos_key: { default: null, },
  },
  computed: {
    current_items() { return this.TheSP.mut_think_mark_list_hash[this.general_mark_pos_key] ?? [] }, // このセルの印たち
    css_class()     { return this.current_items.at(this.EFFECT_COLOR_OWNER).css_class             }, // このセルの代表色
  },
}
</script>

<style lang="sass">
@import "../../support.sass"

.ShogiPlayer
  .ThinkMarkLayer
    // ../../mod_general_mark/general_mark_base.scss
    // ../../mod_general_mark/general_mark_color.scss
    .general_mark_effect
      // 円の最大をセルの大きさとするには100%だけど隙間がないと気持ちわるいので少し小さめにする
      width: 80%
      height: 80%
      border-radius: 50%
      border: 4px solid var(--general_mark_stroke_color)

.ShogiPlayer
  &.is_layer_on
    .ThinkMarkLayer
      .general_mark_group_name_container
        __css_keep__: 0
</style>
