<template lang="pug">
.ShogiPlayer.shortcut_modal.modal-card.box.has-text-left(@click="delete_click_handle" style="width:auto")
  .has-text-weight-bold.simple_title.is-size-5.pb-3
    | キーボードショートカット
  table.modal-card-body.table.is-fullwidth.mt-3.mb-0
    tbody
      tr
        th 駒の反転
        td
          b-tag(type="is-primary") SPACE
          b-tag.ml-1(type="is-primary") V
          b-tag.ml-1(type="is-primary") R
          b-tag.ml-3(type="") 修飾キー
          span.mx-1 +
          b-tag(type="") 左クリック
      tr
        th カーソル下の駒と同じ駒を駒台から取り出す
        td
          b-tag(type="is-primary") Q
      tr
        th 持った駒を元に戻す
        td
          b-tag(type="is-primary") ESC
          b-tag.ml-1(type="is-primary") Q
          b-tag.ml-3(type="") 右クリック
      tr
        th カーソル下の駒を☗の駒台に移動
        td
          b-tag(type="is-primary") B
      tr
        th カーソル下の駒を☖の駒台に移動
        td
          b-tag(type="is-primary") W
      tr
        th カーソル下の駒を駒箱に移動
        td
          b-tag(type="is-primary") T
          b-tag.ml-1(type="is-primary") BACKSPACE
          b-tag.ml-1(type="is-primary") DELETE
      tr
        th 盤面シャッフル
        td
          b-tag(type="is-primary") !
          span.is-size-7.mx-1 で ON / OFF して
          b-tag(type="is-primary") 1
          span.is-size-7.mx-1 から
          b-tag(type="is-primary") 9

      tr
        th 盤面ローテイト
        td
          b-tag(type="is-primary") 修飾キー
          span.mx-1 +
          b-tag(type="is-primary")
            b-icon(icon="arrow-all" size="is-small")
      tr
        th キーボードショートカットの表示
        td
          b-taglist
            b-tag(type="is-primary") ?
  hr.is-marginless.mt-2
  ul.mt-4.has-text-centered.is-size-7
    li
      | 移動は
      b-tag.mx-1(type="is-primary") 修飾キー
      | を合わせると
      b まとめて
      | 行う
</template>

<script>
import { support_child } from "./support_child.js"

export default {
  mixins: [support_child],
  name: "shortcut_modal",
  methods: {
    delete_click_handle() {
      this.$emit("close")
    },
  },
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/initial-variables"
// @import "~bulma/sass/utilities/functions"
// @import "~bulma/sass/utilities/derived-variables"
// @import "~bulma/sass/utilities/mixins"
.ShogiPlayer
  &.shortcut_modal
    .simple_title
      border-bottom: 1px solid $grey-lighter
    .table
      th
        font-weight: normal
        text-align: right
        border-width: 0
      td
        text-align: left
        border-width: 0
    .tag
      font-weight: bold
</style>
