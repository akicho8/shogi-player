<template lang="pug">
.DebugBlock(v-if="base.new_debug_mode_p")
  table.table.is-narrow.is-hoverable.is-fullwidth
    caption Global
    thead
      tr
        th
        th 値
        th 参照方法
    tbody
      tr
        th 現在のモード
        td {{base.new_run_mode}}
        td new_run_mode
      tr
        th mouseの直前までの参照要素
        td {{base.mouseover_info}}
        td mouseover_info
      tr
        th 開始局面番号
        td {{base.start_turn}}
        td start_turn
      tr
        th 初期配置
        td {{base.current_preset_key}}
        td current_preset_key

  table.table.is-narrow.is-hoverable.is-fullwidth(v-if="base.mediator")
    caption Mediator Methods
    thead
      tr
        th
        th 値
        th 参照方法
    tbody
      tr
        th 駒箱
        td {{base.mediator.piece_box_realize()}}
        td piece_box_realize()
      tr
        th 持駒
        td {{base.mediator.hold_pieces}}
        td hold_pieces
      tr
        th 次の手番
        td {{base.mediator.current_location.key}}
        td current_location.key
      tr
        th 現局面のSFEN
        td {{base.mediator.to_simple_sfen}}
        td to_simple_sfen
      tr
        th 正規化手番
        td {{base.turn_offset}}
        td turn_offset

  table.table.is-narrow.is-hoverable.is-fullwidth
    caption play_mode
    thead
      tr
        th
        th 値
        th 参照方法
    tbody
      tr
        th 移動元座標
        td {{base.place_from}}
        td place_from
      tr
        th 駒台・駒箱から移動中の駒
        td {{base.have_piece}}
        td have_piece
      tr
        th play_modeでの指し手
        td {{base.moves}}
        td moves
      tr
        th play_modeの開始局面
        td {{base.init_sfen}}
        td init_sfen
      tr
        th play_modeでのSFEN
        td {{base.play_mode_full_moves_sfen}}
        td play_mode_full_moves_sfen

  table.table.is-narrow.is-hoverable.is-fullwidth
    caption その他
    thead
      tr
        th
        th 値
        th 参照方法
    tbody
      tr
        th view_modeでの棋譜更新回数
        td {{base.update_counter}}
        td update_counter
      tr
        th 編集モード時の手番
        td {{base.init_location_key}}
        td init_location_key
      tr
        th 編集モード時の手番を反映したSFEN
        td {{base.edit_mode_snapshot_sfen()}}
        td edit_mode_snapshot_sfen
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
    tbody
      th
        text-align: right
</style>
