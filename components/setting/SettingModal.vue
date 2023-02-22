<template lang="pug">
.SettingModal
  FriendlyCloseButton(@click.stop="TheSp.setting_modal_close")
  b-tabs(size="is-small" v-model="tab_index" :animated="false")
    template(v-for="e in TheSp.SettingTabInfo.values")
      b-tab-item(:label="e.name")
  .my_area
    SettingModalGroup1(v-if="tab_index === 0")
    SettingModalGroup2(v-if="tab_index === 1")
    SettingModalGroup3(v-if="tab_index === 2")
    SettingModalGroup4(v-if="tab_index === 3")
    SettingModalGroup5(v-if="tab_index === 4")
    SettingModalGroup6(v-if="tab_index === 5")
</template>

<script>
import { support } from "../support.js"

import FriendlyCloseButton from "./FriendlyCloseButton.vue"

import SettingModalGroup1 from "./SettingModalGroup1.vue"
import SettingModalGroup2 from "./SettingModalGroup2.vue"
import SettingModalGroup3 from "./SettingModalGroup3.vue"
import SettingModalGroup4 from "./SettingModalGroup4.vue"
import SettingModalGroup5 from "./SettingModalGroup5.vue"
import SettingModalGroup6 from "./SettingModalGroup6.vue"

export default {
  name: "SettingModal",
  mixins: [support],
  components: {
    FriendlyCloseButton,
    SettingModalGroup1,
    SettingModalGroup2,
    SettingModalGroup3,
    SettingModalGroup4,
    SettingModalGroup5,
    SettingModalGroup6,
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
        this.TheSp.setting_modal_close()
      }
    },
  },
}
</script>

<style lang="sass">
@import "../support.sass"

.ShogiPlayer .SettingModal
  position: fixed
  //- bottom: 25%
  bottom: 0%
  left: 0
  right: 0

  text-align: left
  z-index: $setting_modal_z
  background-color: white
  // width: 100%
  height: 50%
  // overflow: hidden

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
    .SettingModal
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
