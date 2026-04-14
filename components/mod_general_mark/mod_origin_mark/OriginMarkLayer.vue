<template lang="pug">
.OriginMarkLayer.GeneralMarkLayer(v-if="current_items.length >= 1" :class="css_class")
  .general_mark_effect_container.is-overlay
    .general_mark_effect
  .general_mark_group_name_container.is-overlay(v-if="group_name_show_p")
    template(v-for="(item, i) in current_items")
      .general_mark_group_name(v-if="item.general_mark_group_name")
        | {{item.general_mark_group_name}}
</template>

<script>
import _ from "lodash"

import { support } from "../../support.js"

export default {
  name: "OriginMarkLayer",
  mixins: [support],
  props: {
    general_mark_pos_key: { default: null, },
  },
  computed: {
    current_items()     { return this.TheSP.mut_origin_mark_list_hash[this.general_mark_pos_key] ?? [] },
    css_class()         { return this.current_items.at(this.EFFECT_COLOR_OWNER).css_class              },
    group_name_show_p() { return this.TheSP.mut_origin_mark_list.many_p                                },
  },
}
</script>

<style lang="scss">
@import "../../support.sass";
/* ../general_mark_color.scss */
/* ../general_mark_base.scss */
@import "./scss/omv_aim.scss";
@import "./scss/omv_invisible.scss";
@import "./scss/omv_square_gray.scss";
@import "./scss/omv_square_color.scss";
@import "./scss/omv_fire.scss";
.ShogiPlayer {
  &.is_layer_on {
    .OriginMarkLayer {
      .general_mark_group_name_container {
        __css_keep__: 0;
      }
    }
  }
}
</style>
