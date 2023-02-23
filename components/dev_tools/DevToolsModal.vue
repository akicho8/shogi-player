<template lang="pug">
.DevToolsModal(:class="component_class")
  FriendlyCloseButton(@click.stop="TheSp.dev_tools_modal_close")
  b-tabs(size="is-small" v-model="tab_index" :animated="false")
    template(v-for="e in TheSp.DevToolsTabInfo.values")
      b-tab-item(:label="e.name")
    template(v-for="e in TheSp.DevToolsTabInfo.values")
      b-tab-item(:label="e.name")
    template(v-for="e in TheSp.DevToolsTabInfo.values")
      b-tab-item(:label="e.name")
    template(v-for="e in TheSp.DevToolsTabInfo.values")
      b-tab-item(:label="e.name")
    template(v-for="e in TheSp.DevToolsTabInfo.values")
      b-tab-item(:label="e.name")
  .my_area
    DevToolsModalGroup1(v-if="tab_index === 0")
    DevToolsModalGroup2(v-if="tab_index === 1")
    DevToolsModalGroup3(v-if="tab_index === 2")
    DevToolsModalGroup4(v-if="tab_index === 3")
    DevToolsModalGroup5(v-if="tab_index === 4")
    DevToolsModalGroup6(v-if="tab_index === 5")
</template>

<script>
import { support } from "../support.js"

import FriendlyCloseButton from "./FriendlyCloseButton.vue"

import DevToolsModalGroup1 from "./DevToolsModalGroup1.vue"
import DevToolsModalGroup2 from "./DevToolsModalGroup2.vue"
import DevToolsModalGroup3 from "./DevToolsModalGroup3.vue"
import DevToolsModalGroup4 from "./DevToolsModalGroup4.vue"
import DevToolsModalGroup5 from "./DevToolsModalGroup5.vue"
import DevToolsModalGroup6 from "./DevToolsModalGroup6.vue"

export default {
  name: "DevToolsModal",
  mixins: [support],
  components: {
    FriendlyCloseButton,
    DevToolsModalGroup1,
    DevToolsModalGroup2,
    DevToolsModalGroup3,
    DevToolsModalGroup4,
    DevToolsModalGroup5,
    DevToolsModalGroup6,
  },
  data() {
    return {
      tab_index: 0,
    }
  },
  mounted() {
    document.addEventListener("keydown", this.keydown_hook)
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.keydown_hook)
  },
  methods: {
    keydown_hook(e) {
      if (e.code === "Escape") {
        this.TheSp.dev_tools_modal_close()
      }
    },
  },
  computed: {
    component_class() {
      return [this.TheSp.dev_tools_layout_info.css_class]
    },
  },
}
</script>

<style lang="sass">
@import "../support.sass"
@import "./position.sass"

.ShogiPlayer .DevToolsModal
  position: fixed

  text-align: left
  z-index: $dev_tools_modal_z
  background-color: white

  //////////////////////////////////////////////////////////////////////////////// レイアウト
  padding: 0.5rem               // 外側の隙間
  display: flex
  flex-direction: column
  gap: 0.5rem                   // ヘッダと本体の隙間
  .my_area
    flex-grow: 1
    overflow: auto

  //////////////////////////////////////////////////////////////////////////////// b-tabs のコンテンツは入れない

  .b-tabs
    margin: 0
    .tab-content
      display: none

  //////////////////////////////////////////////////////////////////////////////// b-tabs のコンテンツは入れない

.ShogiPlayer .SpGround
  &.is_layer_on
    .DevToolsModal
      +is_layer_border
      .b-tabs
        +is_layer_border($danger, 2)
        .tab-content
          +is_layer_border($info, 2)
          .tab-item
            +is_layer_border($warning, 2)
      .my_area
        +is_layer_border($success, 2)
</style>
