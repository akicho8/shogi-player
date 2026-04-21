<template lang="pug">
.OriginMarkLayer.GeneralMarkLayer(v-if="current_items.length >= 1" :class="css_class")
  .general_mark_effect_container.is-overlay
    .general_mark_effect
  .general_mark_user_name_container.is-overlay(v-if="TheSP.mut_origin_mark_collection.many_p")
    template(v-for="(item, i) in current_items")
      .general_mark_user_name(v-if="item.gm_user_name")
        | {{item.gm_user_name}}
</template>

<script>
import _ from "lodash"

import { support } from "../../support.js"

export default {
  name: "OriginMarkLayer",
  mixins: [support],
  props: {
    origin_mark_pos_key: { default: null, },
  },
  computed: {
    current_items() { return this.TheSP.mut_origin_mark_collection_hash[this.origin_mark_pos_key] ?? [] },
    css_class()     { return this.current_items.at(this.EFFECT_COLOR_OWNER).css_class                    },
  },
}
</script>

<style lang="scss">
@import "../../support.sass";
@import "./scss/square.scss";
@import "./scss/invisible.scss";
.ShogiPlayer {
  &.is_layer_on {
    .OriginMarkLayer {
      .general_mark_user_name_container {
        __css_keep__: 0;
      }
    }
  }
}
</style>
