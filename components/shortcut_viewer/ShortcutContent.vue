<template lang="pug">
.ShortcutContent.box.has-text-left(@click="TheSp.shortcut_viewer_close_handle")
  .my_title
    | キーボードショートカット
  table.table.is-fullwidth.mt-1.mb-0
    tbody
      tr
        th 駒の反転
        td
          b-tag(type="is-primary") SPC
          b-tag.ml-1(type="is-primary") V
          b-tag.ml-1(type="is-primary") R
          .mt-1
            b-tag(type="") SHIFT
            span.mx-1 +
            b-tag(type="") クリック
      tr
        th ポインタ下の駒を<br>駒台に<b>移動</b>
        td
          b-tag(type="is-primary") B
          b-tag.ml-1(type="is-primary") W
      tr
        th ﾎﾟｲﾝﾀ下の駒と同じ駒を<br>駒台から取り出す
        td
          b-tag(type="is-primary") Q
      tr
        th 持った駒を元に戻す
        td
          b-tag(type="is-primary") ESC
          b-tag.ml-1(type="is-primary") Q
          b-tag.ml-1(type="") 右クリ
      tr
        th ポインタ下の駒を<br>駒箱に<b>移動</b>
        td
          b-tag(type="is-primary") T
          b-tag.ml-1(type="is-primary") BS
          b-tag.ml-1(type="is-primary") DEL
      tr
        th 盤面ローテイト
        td
          b-tag(type="is-primary") SHIFT
          span.mx-1 +
          b-tag(type="is-primary")
            b-icon(icon="arrow-all" size="is-small")
      tr
        th 盤面シャッフル
        td
          b-tag(type="is-primary") !
          span.is-size-7.mx-1 →
          b-tag(type="is-primary") 1
          span.is-size-7.mx-1 -
          b-tag(type="is-primary") 9
      tr(v-if="false")
        th ｷｰﾎﾞｰﾄﾞｼｮｰﾄｶｯﾄ
        td
          b-taglist
            b-tag(type="is-primary") ?
  hr.is-marginless.mt-2
  ul.mt-4.has-text-centered.is-size-7
    li
      | <b>移動</b>は
      b-tag.mx-1(type="is-primary") SHIFT
      | を合わせると
      b まとめて
      | 行う
</template>

<script>
import { support } from "../support.js"

export default {
  mixins: [support],
  name: "ShortcutContent",
}
</script>

<style lang="sass">
@import "../support.sass"
.ShogiPlayer .ShortcutContent
  .my_title
    padding-bottom: 0.75rem
    font-size: $size-6
    font-weight: bold
    border-bottom: 1px solid $grey-lighter
  .table
    th, td
      vertical-align: middle
    th
      font-weight: normal
      text-align: right
      border-width: 0
      font-size: $size-7
    td
      text-align: left
      border-width: 0
  .tag
    font-weight: bold
</style>
