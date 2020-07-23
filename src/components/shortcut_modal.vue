<template lang="pug">
.shogi-player.shortcut_modal.modal-card.box.has-text-left(@click="delete_click_handle" style="width:auto")
  .has-text-weight-bold.simple_title.is-size-5.pb-3
    | キーボードショートカット
  table.modal-card-body.table.is-fullwidth.mt-3.mb-0
    tbody
      tr
        th 駒の反転
        td
          b-taglist
            b-tag(type="is-primary") SPACE
            b-tag(type="is-primary") V
            b-tag(type="is-primary") R
            b-tag(type="") 装飾キー + 左クリック
      tr
        th カーソル下の駒と同じ駒を駒台から取り出す
        td
          b-taglist
            b-tag(type="is-primary") Q
      tr
        th 持った駒を元に戻す
        td
          b-taglist
            b-tag(type="is-primary") ESC
            b-tag(type="is-primary") Q
            b-tag(type="") 右クリック
      tr
        th カーソル下の駒を☗の駒台に移動
        td
          b-taglist
            b-tag(type="is-primary") B
      tr
        th カーソル下の駒を☖の駒台に移動
        td
          b-taglist
            b-tag(type="is-primary") W
      tr
        th カーソル下の駒を駒箱に移動
        td
          b-taglist
            b-tag(type="is-primary") T
            b-tag(type="is-primary") BACKSPACE
            b-tag(type="is-primary") DELETE
      tr
        th キーボードショートカットの表示
        td
          b-taglist
            b-tag(type="is-primary") ?
  hr.is-marginless.mt-2
  ul.mt-4.has-text-centered.is-size-7
    li
      | 移動は
      b-tag.mx-1(type="is-primary") 装飾キー
      | を合わせると
      b まとめて
      | 行う
</template>

<script>

export default {
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
.shogi-player
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
