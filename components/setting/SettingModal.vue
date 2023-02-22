<template lang="pug">
.SettingModal.is-overlay
  FriendlyCloseButton(@click.stop="TheSp.setting_modal_close")
  b-tabs(type="is-boxed" size="is-small" v-model="tab_index")
    SettingModalGroup1
    SettingModalGroup2
</template>

<script>
import { support } from "../support.js"

import FriendlyCloseButton from "./FriendlyCloseButton.vue"

import SettingModalGroup1 from "./SettingModalGroup1.vue"
import SettingModalGroup2 from "./SettingModalGroup2.vue"

export default {
  name: "SettingModal",
  mixins: [support],
  components: {
    FriendlyCloseButton,
    SettingModalGroup1,
    SettingModalGroup2,
  },
  data() {
    return {
      tab_index: 0,
    }
  },
}
</script>

<style lang="sass">
@import "../support.sass"

.ShogiPlayer .SettingModal
  position: fixed

  text-align: left
  z-index: $setting_modal_z
  background-color: white
  width: 100%
  height: 100%
  padding: 1rem

.ShogiPlayer .SpGround
  &.is_layer_on
    .SettingModal
      +is_layer_border
      .b-tabs
        +is_layer_border
</style>
