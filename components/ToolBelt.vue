<template lang="pug">
.ToolBelt(v-if="TheSP.edit_p")
  // プリセット
  //- https://buefy.org/documentation/dropdown
  b-dropdown(size="is-small" animation="")
    //  button.button にすると prevent を指定する場所がないため button で外側の form が反応してしまう ← どゆこと？
    .button.is-small(slot="trigger")
      b-icon(icon="apps" size="is-small")
    template(v-for="e in TheSP.PresetDropdownInfo.values")
      b-dropdown-item(:key="e.unique_key" @click="TheSP.xcontainer_setup_by_preset(e.preset_info)" :separator="e.separator")
        | {{e.name}}
    b-dropdown-item(separator)
    b-dropdown-item キャンセル

  // 命令
  b-dropdown.EditToolInfo(size="is-small" animation="")
    .button.is-small(slot="trigger")
      b-icon(icon="menu" size="is-small")
    template(v-for="e in TheSP.EditToolInfo.values")
      b-dropdown-item(:key="e.unique_key" @click="TheSP.edit_tool_click_handle(e)" :separator="e.separator")
        | {{e.name}}
    b-dropdown-item(separator)
    b-dropdown-item キャンセル

  // ↑↓
  b-button(@click.stop.prevent="TheSP.fn_half_spin" icon-left="pan-vertical" size="is-small")

  // ←→
  b-button(@click.stop.prevent="TheSP.fn_flop"   icon-left="pan-horizontal" size="is-small")

  // 手番反転
  b-button.location_name(@click.stop.prevent="TheSP.init_location_toggle" size="is-small")
    | {{TheSP.init_location.name}}

  // ショートカットモーダル起動
  b-button.has-text-weight-bold(@click.stop.prevent="TheSP.shortcut_viewer_toggle_handle" size="is-small") ?
</template>

<script>
import { support } from "./support.js"

export default {
  name: "ToolBelt",
  mixins: [support],
}
</script>

<style lang="sass">
@import "./support"
.ShogiPlayer
  .ToolBelt
    display: flex
    justify-content: center
    align-items: flex-end
    gap: 1px

    .dropdown
      text-align: left
      margin: 0 ! important         // .dropdown + .dropdown に勝つため
    .button
      border-radius: 0 ! important  // 複雑な条件で 2px 入っているため仕方なく詳細度を上げる
      border-width: 1px
      @media (hover: hover)
        &:hover
          background-color: $white-ter
    .location_name
      padding-left: 0.6rem               // ここだけでかいので調整する
      padding-right: 0.6rem              // 縦は触るな

  &.is_layer_on
    .ToolBelt
      +is_layer_border

  ////////////////////////////////////////////////////////////////////////////////
  +IF_HORIZONTAL
    .ToolBelt
      margin-bottom: var(--sp_common_gap_real_px)

  +IF_VERTICAL
    .ToolBelt
      margin-bottom: 0
</style>
