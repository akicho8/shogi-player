<template lang="pug">
.ThinkMarkLayer.GeneralMarkLayer(v-if="current_items.length >= 1" :class="css_class")
  .general_mark_effect_container.is-overlay
    .general_mark_effect
  .general_mark_user_name_container.is-overlay
    template(v-for="(item, i) in current_items")
      .general_mark_user_name(v-if="item.general_mark_user_name")
        | {{item.general_mark_user_name}}
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
    current_items() { return this.TheSP.mut_think_mark_collection_hash[this.general_mark_pos_key] ?? [] }, // このセルの印たち
    css_class()     { return this.current_items.at(this.EFFECT_COLOR_OWNER).css_class             }, // このセルの代表色
  },
}
</script>

<style lang="scss">
@import "../../support.sass";
/* ../general_mark_color.scss */
/* ../general_mark_base.scss */

@import "./scss/tmv_circle_color.scss";
@import "./scss/tmv_circle_gray.scss";
@import "./scss/tmv_invisible.scss";

.ShogiPlayer {
  &.is_layer_on {
    .ThinkMarkLayer {
      .general_mark_user_name_container {
        __css_keep__: 0;
      }
    }
  }
}
</style>
