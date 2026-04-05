<template lang="pug">
.ThinkMarkLayer(v-if="current_items.length >= 1")
  .think_mark_effect_container.is-overlay
    .think_mark_effect(:class="current_css_effect_class")
  .think_mark_user_name_container.is-overlay
    template(v-for="(item, i) in current_items")
      template(v-if="item.think_mark_user_name")
        .think_mark_user_name(:class="item.css_label_class")
          | {{item.think_mark_user_name}}
</template>

<script>
import _ from "lodash"

import { support } from "../support.js"

const EFFECT_COLOR_OWNER = 0    // 0:最初の人 -1:最後の人

export default {
  name: "ThinkMarkLayer",
  mixins: [support],
  props: {
    think_mark_pos_key: { default: null, },
  },
  computed: {
    // 現在のセルで表示するマークたち
    current_items() {
      return this.TheSP.mut_think_mark_list_hash[this.think_mark_pos_key] ?? []
    },

    current_css_effect_class() {
      return this.current_items.at(EFFECT_COLOR_OWNER).css_effect_class
    },
  },
}
</script>

<style lang="sass">
@import "../support.sass"
@import "./think_mark_color.scss"

.ShogiPlayer
  // .BoardCell
  .PieceTap
    position: relative
    .ThinkMarkLayer
      z-index: $piece_count_z + 1 // 駒数より上に円を書く。FIXME: これは本当に必要？

  .think_mark_effect_container
    // 円を中央に表示するため
    display: flex
    align-items: center
    justify-content: center

  .think_mark_effect
    // 円の最大をセルの大きさとするには100%だけど隙間がないと気持ちわるいので少し小さめにする
    width: 80%
    height: 80%
    border-radius: 50%
    border-width: 4px
    border-style: solid

  .think_mark_user_name_container
    // 左上から左揃えで並べる
    display: flex
    flex-direction: column
    align-items: center
    justify-content: flex-start
    gap: 1px

    overflow: hidden        // 何行にもなったときに下の枠を飛び出すのを防ぐため

  .think_mark_user_name
    flex-shrink: 0          // 何行にもなったときにテキスト部分が最優先で縮小されるのを防ぐ
    white-space: nowrap     // テキストの折り返しを防止
    overflow: hidden        // はみ出した部分を非表示
    max-width: 100%         // 小さい文字列なら横100%にはしないため
    max-height: 100%

    // スタイル共通
    font-size: $size-7
    line-height: 1.25
    padding: 0 0.25em
    font-weight: bold
    border-radius: 2px
    +mobile
      font-size: 0.5em

.ShogiPlayer
  &.is_layer_on
    .think_mark_user_name_container
      __css_keep__: 0
      // border: 4px solid blue
</style>
