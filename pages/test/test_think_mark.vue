<template lang="pug">
.test-test_think_mark
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold ThinkMark
  .section
    .container.is-fluid
      .columns
        .column
          b-field(custom-class="is-small" label="メンバー")
            template(v-for="(user, i) in current_users")
              b-radio-button(size="is-small" v-model="user_index" :native-value="i") {{user.name}}
          b-field(custom-class="is-small" label="機能" grouped)
            .control
              .buttons.are-small
                b-button(@click="test_clear")   消去
                b-button(@click="test_all"    ) 全体
                b-button(@click="test_one"    ) 右上
                b-button(@click="test_color"  ) 配色
                b-button(@click="test_stand"  ) 持駒
                b-button(@click="test_label"  ) 名前
                b-button(@click="test_api_clear") 消去(API)
                b-button(@click="test_api_json")  JSON(API)
      .columns
        .column.is-6
          ShogiPlayer(
            ref="sp_object"
            :sp_turn="0"
            :sp_body="sp_body"
            sp_mode="play"
            sp_debug
            sp_controller
            sp_layer
            sp_board_variant="wood_normal"
            :sp_slider="true"
            :sp_think_mark_list="sp_think_mark_list"
            @ev_action_markable_pointerdown="ev_action_markable_pointerdown"
            sp_human_side="none"
          )
        .column
          pre
            p コンポーネント引数(内部への一方通行)
            | sp_think_mark_list = {{sp_think_mark_list}}
        .column
          pre(v-if="$refs.sp_object")
            p 内部 (直接触るのもあり)
            | mut_think_mark_list = {{$refs.sp_object.mut_think_mark_list}}
            |
            | mut_think_mark_list.marks_hash = {{$refs.sp_object.mut_think_mark_list.marks_hash}}
</template>

<script>
import assert from "minimalistic-assert"

import { Mark } from "@/components/think_mark/mark.js"
import { MarkList } from "@/components/think_mark/mark_list.js"

import { think_mark_methods } from "@/components/think_mark/think_mark_methods.js"

export default {
  data() {
    return {
      current_users: [
        { name: "A", },
        { name: "B", },
        { name: "C", },
        { name: "D", },
        { name: "E", },
        { name: "F", },
        { name: "G", },
        { name: "H", },
      ],

      user_index: 0,
      sp_think_mark_list: [],

      sp_body: `
後手の持駒：玉9金9銀9桂9香9飛9角9歩9
  ９ ８ ７ ６ ５ ４ ３ ２ １
+---------------------------+
|v香v桂v銀v金v玉v金v銀v桂v香|一
| ・v飛 ・ ・ ・ ・ ・v角 ・|二
|v歩v歩v歩v歩v歩v歩v歩v歩v歩|三
| ・ ・ ・ ・ ・ ・ ・ ・ ・|四
| ・ ・ ・ ・ ・ ・ ・ ・ ・|五
| ・ ・ ・ ・ ・ ・ ・ ・ ・|六
| と と と と と 歩 歩 歩 歩|七
| ・ 角 ・ ・ ・ ・ ・ 飛 ・|八
| 香 桂 銀 金 玉 金 銀 桂 香|九
+---------------------------+
先手の持駒：玉9金9銀9桂9香9飛9角9歩9
手数＝0 まで
先手番
手数----指手---------消費時間--
`,
    }
  },
  mounted() {
    this.test_all()
  },

  methods: {
    ...think_mark_methods,

    //////////////////////////////////////////////////////////////////////////////// ユーザー側の定義

    ev_action_markable_pointerdown(params, event) {
      const mark_attrs = this.mark_attrs_from(params.mark_pos_key)
      this.$refs.sp_object.mut_think_mark_list.toggle(mark_attrs)
    },

    mark_attrs_from(mark_pos_key) {
      return {
        mark_pos_key:   mark_pos_key,
        mark_user_name: this.current_user_name,
        mark_color_index: this.user_index,
      }
    },

    test_api_clear() {
      this.$refs.sp_object.mut_think_mark_list.clear()
    },

    test_clear() {
      this.sp_think_mark_list = []
    },

    test_api_json() {
      console.table(this.$refs.sp_object.mut_think_mark_list.as_json)
    },

    //////////////////////////////////////////////////////////////////////////////// ShogiPlayer 内部に置いてもよさそうなコード

    // ss_mark_create(attrs) {
    //   const item = {...attrs}
    //   assert(item.mark_pos_key)
    //   item.mark_user_name ??= `${this.sp_think_mark_list.length}`
    //   item.mark_color_index ??= this.sp_think_mark_list.length
    //   item.mark_color_index = item.mark_color_index % this.SS_MARK_COLOR_COUNT // 一周して色数を越えないようにする
    //   return item
    // },

    test_all() {
      this.test_one()
      this.test_color()
      this.test_stand()
      this.test_label()
    },

    test_one() {
      this.sp_think_mark_list.push({mark_pos_key: "1_1", mark_user_name: "なまえ", mark_color_index:  0, })
    },

    test_color() {
      this.sp_think_mark_list.push({mark_pos_key: "9_5", mark_user_name: "0",  mark_color_index:  0, })
      this.sp_think_mark_list.push({mark_pos_key: "8_5", mark_user_name: "1",  mark_color_index:  1, })
      this.sp_think_mark_list.push({mark_pos_key: "7_5", mark_user_name: "2",  mark_color_index:  2, })
      this.sp_think_mark_list.push({mark_pos_key: "6_5", mark_user_name: "3",  mark_color_index:  3, })
      this.sp_think_mark_list.push({mark_pos_key: "5_5", mark_user_name: "4",  mark_color_index:  4, })
      this.sp_think_mark_list.push({mark_pos_key: "4_5", mark_user_name: "5",  mark_color_index:  5, })
      this.sp_think_mark_list.push({mark_pos_key: "3_5", mark_user_name: "6",  mark_color_index:  6, })
      this.sp_think_mark_list.push({mark_pos_key: "2_5", mark_user_name: "7",  mark_color_index:  7, })
      this.sp_think_mark_list.push({mark_pos_key: "1_5", mark_user_name: "8",  mark_color_index:  8, })
      this.sp_think_mark_list.push({mark_pos_key: "9_6", mark_user_name: "9",  mark_color_index:  9, })
      this.sp_think_mark_list.push({mark_pos_key: "8_6", mark_user_name: "10", mark_color_index: 10, })
      this.sp_think_mark_list.push({mark_pos_key: "7_6", mark_user_name: "11", mark_color_index: 11, })
    },

    test_stand() {
      this.sp_think_mark_list.push({mark_pos_key: "black_R", mark_user_name: "A", mark_color_index: 0, })
      this.sp_think_mark_list.push({mark_pos_key: "black_R", mark_user_name: "B", mark_color_index: 1, })
      this.sp_think_mark_list.push({mark_pos_key: "white_R", mark_user_name: "C", mark_color_index: 2, })
      this.sp_think_mark_list.push({mark_pos_key: "white_R", mark_user_name: "D", mark_color_index: 3, })
    },

    test_label() {
      //
      this.sp_think_mark_list.push({mark_pos_key: "9_3", mark_user_name: "あいうえお", mark_color_index: 0, })
      this.sp_think_mark_list.push({mark_pos_key: "8_3", mark_user_name: "あいうえお", mark_color_index: 1, })
      this.sp_think_mark_list.push({mark_pos_key: "7_3", mark_user_name: "あいうえお", mark_color_index: 2, })
      this.sp_think_mark_list.push({mark_pos_key: "6_3", mark_user_name: "あいうえお", mark_color_index: 3, })
      this.sp_think_mark_list.push({mark_pos_key: "5_3", mark_user_name: "あいうえお", mark_color_index: 4, })
      this.sp_think_mark_list.push({mark_pos_key: "4_3", mark_user_name: "あいうえお", mark_color_index: 5, })
      this.sp_think_mark_list.push({mark_pos_key: "3_3", mark_user_name: "あいうえお", mark_color_index: 6, })
      this.sp_think_mark_list.push({mark_pos_key: "2_3", mark_user_name: "あいうえお", mark_color_index: 7, })
      //                                      _
      this.sp_think_mark_list.push({mark_pos_key: "9_3", mark_user_name: "abcABC12345", mark_color_index: 7, })
      this.sp_think_mark_list.push({mark_pos_key: "8_3", mark_user_name: "abcABC12345", mark_color_index: 6, })
      this.sp_think_mark_list.push({mark_pos_key: "7_3", mark_user_name: "abcABC12345", mark_color_index: 5, })
      this.sp_think_mark_list.push({mark_pos_key: "6_3", mark_user_name: "abcABC12345", mark_color_index: 4, })
      this.sp_think_mark_list.push({mark_pos_key: "5_3", mark_user_name: "abcABC12345", mark_color_index: 3, })
      this.sp_think_mark_list.push({mark_pos_key: "4_3", mark_user_name: "abcABC12345", mark_color_index: 2, })
      this.sp_think_mark_list.push({mark_pos_key: "3_3", mark_user_name: "abcABC12345", mark_color_index: 1, })
      this.sp_think_mark_list.push({mark_pos_key: "2_3", mark_user_name: "abcABC12345", mark_color_index: 0, })
    },
  },
  computed: {
    current_user_name() { return this.current_users[this.user_index].name },
  },
}
</script>

<style lang="sass">
.test-test_think_mark
  __css_keep__: 0
</style>
