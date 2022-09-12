<template lang="pug">
.EditToolBlock(v-if="TheSp.edit_p")
  b-dropdown(v-model="TheSp.new_preset_key")
    //  button.button にすると prevent を指定する場所がないため button で外側の form が反応してしまう
    .button.is-small(slot="trigger")
      b-icon(icon="apps" size="is-small")
    b-dropdown-item(v-for="record in TheSp.preset_info_values" :value="record.key" :key="record.key" @click="TheSp.xcontainer_setup_by_preset(record)")
      | {{record.name}}
    b-dropdown-item(separator)
    b-dropdown-item キャンセル
  b-dropdown.mx-0(v-model="TheSp.any_func_key" size="is-small")
    .button.is-small(slot="trigger")
      b-icon(icon="menu" size="is-small")
    b-dropdown-item(v-for="e in TheSp.AnyFuncInfo.values" :value="e.key" :key="e.key" @click="TheSp.any_func_click_handle(e)")
      | {{e.name}}
    b-dropdown-item(separator)
    b-dropdown-item キャンセル
  b-button(@click.stop.prevent="TheSp.fn_flip_all" icon-left="pan-vertical" size="is-small")
  b-button(@click.stop.prevent="TheSp.fn_flop"   icon-left="pan-horizontal" size="is-small")
  b-button(@click.stop.prevent="TheSp.init_location_toggle" size="is-small")
    .is-size-7 {{TheSp.init_location.name}}
  b-button.has-text-weight-bold(@click.stop.prevent="TheSp.shortcut_modal_show_handle" size="is-small") ?
</template>

<script>
import { support } from "./support.js"

export default {
  name: "EditToolBlock",
  mixins: [support],
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  .EditToolBlock
    .dropdown
      text-align: left
    .button
      margin-left: 0px
      margin-right: 0px

  &.is_layer_on
    .EditToolBlock
      +is_layer_border

  ////////////////////////////////////////////////////////////////////////////////
  +IS_HORIZONTAL
    .EditToolBlock
      margin-bottom: var(--sp_common_gap)
  +IS_VERTICAL
    .EditToolBlock
      margin-bottom: 0
</style>
