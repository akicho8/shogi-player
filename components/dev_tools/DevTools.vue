<template lang="pug">
.DevTools(:class="component_class")
  FriendlyCloseButton(@click.stop="TheSp.dev_tools_close_handle")
  b-tabs(size="is-small" v-model="tab_index" :animated="false")
    template(v-for="e in TheSp.DevToolsGroupInfo.values")
      b-tab-item(:label="e.name")
  .DevToolsGroupContent
    template(v-for="e in TheSp.DevToolsGroupInfo.values")
      component(:is="e.component_name" v-if="tab_index === e.code")
</template>

<script>
import { support } from "../support.js"

import FriendlyCloseButton from "./FriendlyCloseButton.vue"

import GroupBasic from "./GroupBasic.vue"
import GroupSfen from "./GroupSfen.vue"
import GroupDebug from "./GroupDebug.vue"
import GroupProps from "./GroupProps.vue"
import GroupData from "./GroupData.vue"
import GroupDevTools from "./GroupDevTools.vue"

export default {
  name: "DevTools",
  mixins: [support],
  components: {
    FriendlyCloseButton,
    GroupBasic,
    GroupSfen,
    GroupDebug,
    GroupProps,
    GroupData,
    GroupDevTools,
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
        this.TheSp.dev_tools_close_handle()
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

.ShogiPlayer .DevTools
  position: fixed

  text-align: left
  z-index: $dev_tools_z
  background-color: white

  //////////////////////////////////////////////////////////////////////////////// レイアウト
  padding: 0.5rem               // 外側の隙間
  display: flex
  flex-direction: column
  gap: 0.5rem                   // ヘッダと本体の隙間
  .DevToolsGroupContent
    flex-grow: 1                // height: 100% などとしてはいけない
    overflow: auto

  //////////////////////////////////////////////////////////////////////////////// b-tabs のコンテンツは入れない

  .b-tabs
    margin: 0
    .tab-content
      display: none

  //////////////////////////////////////////////////////////////////////////////// b-tabs のコンテンツは入れない

.ShogiPlayer .SpGround
  &.is_layer_on
    .DevTools
      +is_layer_border
      .b-tabs
        +is_layer_border($danger, 2)
        .tab-content
          +is_layer_border($info, 2)
          .tab-item
            +is_layer_border($warning, 2)
      .DevToolsGroupContent
        +is_layer_border($success, 2)
</style>
