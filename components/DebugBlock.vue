<template lang="pug">
.DebugBlock.box(v-if="TheSp.debug_p")
  table.table.is-narrow.is-hoverable.is-fullwidth
    caption 最適化
    thead
      tr
        th
        th Value
        th 参照方法
    tbody
      DebugBlockRow(code="$data._ShogiPlayerRenderCount" name="ShogiPlayer beforeUpdate 呼び出し回数" :value="TheSp.$data._ShogiPlayerRenderCount")
      DebugBlockRow(code="$data._MainBoardRenderCount"   name="MainBoard beforeUpdate 呼び出し回数"   :value="TheSp.$data._MainBoardRenderCount")

  table.table.is-narrow.is-hoverable.is-fullwidth
    caption Global
    thead
      tr
        th
        th Value
        th 参照方法
    tbody
      DebugBlockRow(code="new_mode"   name="現在のモード"              :value="TheSp.new_mode")
      DebugBlockRow(code="mouseover_info" name="mouseの直前までの参照要素" :value="TheSp.mouseover_info")
      DebugBlockRow(code="sp_turn"        name="開始局面番号"              :value="TheSp.sp_turn")
      DebugBlockRow(code="new_preset_key" name="初期配置"                  :value="TheSp.new_preset_key")
  table.table.is-narrow.is-hoverable.is-fullwidth(v-if="TheSp.xcontainer")
    caption Xcontainer Methods
    thead
      tr
        th
        th Value
        th 参照方法
    tbody
      DebugBlockRow(code="piece_box_realize()"  name="駒箱"         :value="TheSp.xcontainer.piece_box_realize()")
      DebugBlockRow(code="hold_pieces"          name="持駒"         :value="TheSp.xcontainer.hold_pieces")
      DebugBlockRow(code="current_location.key" name="次の手番"     :value="TheSp.xcontainer.current_location.key")
      DebugBlockRow(code="to_simple_sfen"       name="現局面のSFEN" :value="TheSp.xcontainer.to_simple_sfen")
      DebugBlockRow(code="turn_offset"          name="正規化手番"   :value="TheSp.turn_offset")
  table.table.is-narrow.is-hoverable.is-fullwidth
    caption play
    thead
      tr
        th
        th Value
        th 参照方法
    tbody
      DebugBlockRow(code="place_from"                name="移動元座標"               :value="TheSp.place_from")
      DebugBlockRow(code="have_piece"                name="駒台・駒箱から移動中の駒" :value="TheSp.have_piece")
      DebugBlockRow(code="moves"                     name="play_modeでの指し手"      :value="TheSp.moves")
      DebugBlockRow(code="init_sfen"                 name="play_modeの開始局面"      :value="TheSp.init_sfen")
      DebugBlockRow(code="play_mode_full_moves_sfen" name="play_modeでのSFEN"        :value="TheSp.play_mode_full_moves_sfen")
  table.table.is-narrow.is-hoverable.is-fullwidth
    caption その他
    thead
      tr
        th
        th Value
        th 参照方法
    tbody
      DebugBlockRow(code="update_counter"          name="view_modeでの棋譜更新回数"        :value="TheSp.update_counter")
      DebugBlockRow(code="init_location_key"       name="編集モード時の手番"               :value="TheSp.init_location_key")
      DebugBlockRow(code="edit_mode_short_sfen()" name="編集モード時の手番を反映したSFEN" :value="TheSp.edit_mode_short_sfen()")
</template>

<script>
import { support } from "./support.js"
import DebugBlockRow from "./DebugBlockRow.vue"

export default {
  name: "DebugBlock",
  mixins: [support],
  components: {
    // 明示的に指定しないと shoig-exednd 側で次のエラーがでる
    //- [Vue warn]: Unknown custom element: <DebugBlockRow> - did you register the component correctly? For recursive components, make sure to provide the "name" option.
    // 原因不明
    DebugBlockRow,
  },
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
