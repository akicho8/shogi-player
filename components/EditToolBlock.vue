<template lang="pug">
.EditToolBlock(v-if="base.edit_p")
  b-dropdown(v-model="base.current_preset_key")
    //  button.button にすると prevent を指定する場所がないため button で外側の form が反応してしまう
    .button.is-small(slot="trigger")
      b-icon(icon="apps" size="is-small")
    b-dropdown-item(v-for="record in base.preset_info_values" :value="record.key" :key="record.key" @click="base.mediator_setup_by_preset(record)")
      | {{record.name}}
  b-dropdown.mx-0(v-model="base.any_func_key" size="is-small")
    .button.is-small(slot="trigger")
      b-icon(icon="menu" size="is-small")
    b-dropdown-item(v-for="e in base.AnyFuncInfo.values" :value="e.key" :key="e.key" @click="base.any_func_click_handle(e)")
      | {{e.name}}
  b-button(@click.stop.prevent="base.fn_flip_all" icon-left="pan-vertical" size="is-small")
  b-button(@click.stop.prevent="base.fn_flip_h"   icon-left="pan-horizontal" size="is-small")
  b-button(@click.stop.prevent="base.init_location_toggle" size="is-small")
    .is-size-7 {{base.init_location.name}}
  b-button.has-text-weight-bold(@click.stop.prevent="base.shortcut_modal_show_handle" size="is-small") ?
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
  +IS_HORIZONTAL_ONLY
    .EditToolBlock
      margin-bottom: var(--sp_common_gap)
  +IS_VERTICAL_OR_MOBILE
    .EditToolBlock
      margin-bottom: 0
</style>
