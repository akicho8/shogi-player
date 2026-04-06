<template lang="pug">
.DebugBlock
  table.table.is-narrow.is-hoverable.is-fullwidth
    caption 最適化
    thead
      tr
        th
        th Value
        th 参照方法
    tbody
      DebugBlockRow(code="$data._ShogiPlayerRenderCount" name="ShogiPlayer beforeUpdate 呼び出し回数" :value="TheSP.$data._ShogiPlayerRenderCount")
      DebugBlockRow(code="$data._MainBoardRenderCount"   name="MainBoard beforeUpdate 呼び出し回数"   :value="TheSP.$data._MainBoardRenderCount")

  table.table.is-narrow.is-hoverable.is-fullwidth
    caption Global
    thead
      tr
        th
        th Value
        th 参照方法
    tbody
      DebugBlockRow(code="mut_mode"   name="現在のモード"              :value="TheSP.mut_mode")
      DebugBlockRow(code="mouseover_info" name="mouseの直前までの参照要素" :value="TheSP.mouseover_info")
      DebugBlockRow(code="sp_turn"        name="開始局面番号"              :value="TheSP.sp_turn")
      DebugBlockRow(code="mut_preset_key" name="初期配置"                  :value="TheSP.mut_preset_key")
  table.table.is-narrow.is-hoverable.is-fullwidth(v-if="TheSP.xcontainer")
    caption Xcontainer Methods
    thead
      tr
        th
        th Value
        th 参照方法
    tbody
      DebugBlockRow(code="piece_box.realize"    name="駒箱"         :value="TheSP.xcontainer.piece_box.realize")
      DebugBlockRow(code="hold_pieces"          name="持駒"         :value="TheSP.xcontainer.hold_pieces")
      DebugBlockRow(code="current_location.key" name="次の手番"     :value="TheSP.xcontainer.current_location.key")
      DebugBlockRow(code="to_simple_sfen"       name="現局面のSFEN" :value="TheSP.xcontainer.to_simple_sfen")
      DebugBlockRow(code="turn_offset"          name="正規化手番"   :value="TheSP.turn_offset")
  table.table.is-narrow.is-hoverable.is-fullwidth
    caption play
    thead
      tr
        th
        th Value
        th 参照方法
    tbody
      DebugBlockRow(code="pick_place"                name="移動元座標"               :value="TheSP.pick_place")
      DebugBlockRow(code="pick_piece"                name="駒台・駒箱から移動中の駒" :value="TheSP.pick_piece")
      DebugBlockRow(code="moves"                     name="play_modeでの指し手"      :value="TheSP.moves")
      DebugBlockRow(code="init_sfen"                 name="play_modeの開始局面"      :value="TheSP.init_sfen")
      DebugBlockRow(code="play_mode_full_moves_sfen" name="play_modeでのSFEN"        :value="TheSP.play_mode_full_moves_sfen")
  table.table.is-narrow.is-hoverable.is-fullwidth
    caption その他
    thead
      tr
        th
        th Value
        th 参照方法
    tbody
      DebugBlockRow(code="update_counter"          name="view_modeでの棋譜更新回数"        :value="TheSP.update_counter")
      DebugBlockRow(code="init_location_key"       name="編集モード時の手番"               :value="TheSP.init_location_key")
      DebugBlockRow(code="edit_mode_short_sfen()" name="編集モード時の手番を反映したSFEN" :value="TheSP.edit_mode_short_sfen()")
</template>

<script>
import { support } from "../support.js"
import DebugBlockRow from "./DebugBlockRow.vue"

export default {
  name: "DebugBlock",
  mixins: [support],
  components: {
    DebugBlockRow,
  },
}
</script>

<style lang="sass">
@import "../support.sass"
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
