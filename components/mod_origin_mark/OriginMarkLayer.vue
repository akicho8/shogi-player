<template lang="pug">
.OriginMarkLayer.GeneralMarkLayer(v-if="current_items.length >= 1")
  .general_mark_effect_container.is-overlay
    .general_mark_effect(:class="current_css_effect_class")
  .general_mark_user_name_container.is-overlay(v-if="name_show_p")
    template(v-for="(item, i) in current_items")
      template(v-if="item.general_mark_group_name")
        .general_mark_group_name(:class="item.css_label_class")
          | {{item.general_mark_group_name}}
</template>

<script>
import _ from "lodash"

import { support } from "../support.js"

const EFFECT_COLOR_OWNER = 0    // 0:最初の人 -1:最後の人

export default {
  name: "OriginMarkLayer",
  mixins: [support],
  props: {
    general_mark_pos_key: { default: null, },
  },
  computed: {
    // 現在のセルで表示するマークたち
    current_items() {
      return this.TheSP.mut_origin_mark_list_hash[this.general_mark_pos_key] ?? []
    },

    current_css_effect_class() {
      return this.current_items.at(EFFECT_COLOR_OWNER).css_effect_class
    },

    name_show_p() {
      return this.TheSP.mut_origin_mark_list.many_p
    },
  },
}
</script>

<style lang="sass">
@import "../support.sass"

.ShogiPlayer
  .OriginMarkLayer
    // ../../components/mod_general_mark/general_mark_base.scss
    // ../../components/mod_general_mark/general_mark_color.scss
    .general_mark_effect
      width: 100%
      height: 100%
      border-width: 4px
      border-style: solid

.ShogiPlayer
  &.is_layer_on
    .general_mark_user_name_container
      __css_keep__: 0
      // border: 4px solid blue
</style>
