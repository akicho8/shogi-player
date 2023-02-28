<template lang="pug">
.DevTools(:class="component_class")
  FriendlyCloseButton(@click.stop="TheSp.dev_tools_close_handle")
  b-tabs(
    size="is-small"
    :value="TheSp.dev_tools_group_info.code"
    @input="e => TheSp.mut_dev_tools_group = this.TheSp.DevToolsGroupInfo.fetch(e).code"
    :animated="false"
    )
    template(v-for="e in TheSp.DevToolsGroupInfo.values")
      b-tab-item(:label="e.name" :icon="e.icon")
  .DevToolsGroupContent
    template(v-for="e in TheSp.DevToolsGroupInfo.values")
      component(:is="e.component" v-if="TheSp.dev_tools_group_info.key === e.key")
</template>

<script>
import { support } from "../support.js"

import FriendlyCloseButton from "./FriendlyCloseButton.vue"

import GroupMain from "./GroupMain.vue"
import GroupStyle  from "./GroupStyle.vue"
import GroupEvent  from "./GroupEvent.vue"
import GroupSfen  from "./GroupSfen.vue"
import GroupDebug from "./GroupDebug.vue"
import GroupProps from "./GroupProps.vue"
import GroupData  from "./GroupData.vue"
import GroupCog   from "./GroupCog.vue"

export default {
  name: "DevTools",
  mixins: [support],
  components: {
    FriendlyCloseButton,
    GroupMain,
    GroupStyle,
    GroupEvent,
    GroupSfen,
    GroupDebug,
    GroupProps,
    GroupData,
    GroupCog,
  },
  mounted() {
    this.TheSp.dev_tools_restore()
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
      return [
        this.TheSp.dev_tools_position_info.css_class,
      ]
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
  padding: 0     // 外側の隙間
  display: flex
  flex-direction: column
  gap: 0rem                   // ヘッダと本体の隙間
  .DevToolsGroupContent
    padding: 0.75rem
    flex-grow: 1                // height: 100% などとしてはいけない
    overflow: auto
    pre
      padding: 0.5rem

  //////////////////////////////////////////////////////////////////////////////// b-tabs のコンテンツは入れない
  .b-tabs
    margin: 0
    .tab-content
      display: none


.ShogiPlayer
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
