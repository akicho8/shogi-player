<template lang="pug">
.DebugBlock.box(v-if="base.debug_p")
  table.table.is-narrow.is-hoverable.is-fullwidth
    caption Global
    thead
      tr
        th
        th Value
        th 参照方法
    tbody
      DebugBlockRow(code="new_run_mode"   name="現在のモード"              :value="base.new_run_mode")
      DebugBlockRow(code="mouseover_info" name="mouseの直前までの参照要素" :value="base.mouseover_info")
      DebugBlockRow(code="sp_turn"        name="開始局面番号"              :value="base.sp_turn")
      DebugBlockRow(code="new_preset_key" name="初期配置"                  :value="base.new_preset_key")
  table.table.is-narrow.is-hoverable.is-fullwidth(v-if="base.mediator")
    caption Mediator Methods
    thead
      tr
        th
        th Value
        th 参照方法
    tbody
      DebugBlockRow(code="piece_box_realize()"  name="駒箱"         :value="base.mediator.piece_box_realize()")
      DebugBlockRow(code="hold_pieces"          name="持駒"         :value="base.mediator.hold_pieces")
      DebugBlockRow(code="current_location.key" name="次の手番"     :value="base.mediator.current_location.key")
      DebugBlockRow(code="to_simple_sfen"       name="現局面のSFEN" :value="base.mediator.to_simple_sfen")
      DebugBlockRow(code="turn_offset"          name="正規化手番"   :value="base.turn_offset")
  table.table.is-narrow.is-hoverable.is-fullwidth
    caption play_mode
    thead
      tr
        th
        th Value
        th 参照方法
    tbody
      DebugBlockRow(code="place_from"                name="移動元座標"               :value="base.place_from")
      DebugBlockRow(code="have_piece"                name="駒台・駒箱から移動中の駒" :value="base.have_piece")
      DebugBlockRow(code="moves"                     name="play_modeでの指し手"      :value="base.moves")
      DebugBlockRow(code="init_sfen"                 name="play_modeの開始局面"      :value="base.init_sfen")
      DebugBlockRow(code="play_mode_full_moves_sfen" name="play_modeでのSFEN"        :value="base.play_mode_full_moves_sfen")
  table.table.is-narrow.is-hoverable.is-fullwidth
    caption その他
    thead
      tr
        th
        th Value
        th 参照方法
    tbody
      DebugBlockRow(code="update_counter"          name="view_modeでの棋譜更新回数"        :value="base.update_counter")
      DebugBlockRow(code="init_location_key"       name="編集モード時の手番"               :value="base.init_location_key")
      DebugBlockRow(code="edit_mode_snapshot_sfen()" name="編集モード時の手番を反映したSFEN" :value="base.edit_mode_snapshot_sfen()")
</template>

<script>
import { support } from "./support.js"

export default {
  name: "DebugBlock",
  mixins: [support],
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayer
  .DebugBlock
    font-size: $size-7
    word-break: break-all
    caption
      font-weight: bold
    thead
      th:nth-of-type(1)
        width: 25%
      th:nth-of-type(3)
        width: 25%
</style>
