<template lang="pug">
.test-test_origin_mark
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold OriginMark
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
                b-button(@click="test_clear_current_user_only") {{current_user_name}}のみ削除(API)
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
            :sp_origin_mark_list="sp_origin_mark_list"
            @ev_action_origin_mark_jump_invoke="ev_action_origin_mark_jump_invoke"
            @ev_action_origin_mark_jump_cancel="ev_action_origin_mark_jump_cancel"
            @ev_play_mode_move="ev_play_mode_move"
            sp_human_side="both"
          )
        .column
          pre
            p コンポーネント引数(内部への一方通行)
            | sp_origin_mark_list = {{sp_origin_mark_list}}
        .column
          pre(v-if="$refs.sp_object")
            p 内部 (直接触るのもあり)
            | mut_origin_mark_list = {{$refs.sp_object.mut_origin_mark_list}}
            |
            | mut_origin_mark_list.hash_table = {{$refs.sp_object.mut_origin_mark_list.hash_table}}
</template>

<script>
import assert from "minimalistic-assert"

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
      sp_origin_mark_list: [],

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
    this.$forceUpdate() // pre(v-if="$refs.sp_object") を反応させるため
    // this.test_all()
  },

  methods: {
    //////////////////////////////////////////////////////////////////////////////// ユーザー側の定義

    ev_play_mode_move(params) {
      if (params.general_mark_pos_key) {
        this.$buefy.toast.open({message: `移動したので移動元(${params.general_mark_pos_key})を静かに消す`, queue: false})
        const attributes = this.create_attributes(params.general_mark_pos_key)
        this.$refs.sp_object.mut_origin_mark_list.remove(attributes)
      }
    },

    ev_action_origin_mark_jump_invoke(general_mark_pos_key, ev) {
      this.$buefy.toast.open({message: `持ち上げたので音を出して移動元(${general_mark_pos_key})に印を付ける`, queue: false})
      const attributes = this.create_attributes(general_mark_pos_key)
      this.$refs.sp_object.mut_origin_mark_list.push(attributes)
    },

    ev_action_origin_mark_jump_cancel(general_mark_pos_key, ev) {
      this.$buefy.toast.open({message: `意図して元に戻したので音を出して移動元(${general_mark_pos_key})の印を消す`, queue: false})
      const attributes = this.create_attributes(general_mark_pos_key)
      this.$refs.sp_object.mut_origin_mark_list.remove(attributes)
    },

    create_attributes(general_mark_pos_key) {
      return {
        general_mark_pos_key: general_mark_pos_key,
        general_mark_group_name: this.current_user_name,
        general_mark_color_index: this.user_index,
      }
    },

    test_api_clear() {
      this.$refs.sp_object.mut_origin_mark_list.clear()
    },

    test_clear() {
      this.sp_origin_mark_list = []
    },

    test_clear_current_user_only() {
      this.$refs.sp_object.mut_origin_mark_list.group_reject$(this.current_user_name)
    },

    test_api_json() {
      console.table(this.$refs.sp_object.mut_origin_mark_list.as_json)
    },

    //////////////////////////////////////////////////////////////////////////////// ShogiPlayer 内部に置いてもよさそうなコード

    // ss_mark_create(attrs) {
    //   const item = {...attrs}
    //   assert(item.general_mark_pos_key)
    //   item.general_mark_group_name ??= `${this.sp_origin_mark_list.length}`
    //   item.general_mark_color_index ??= this.sp_origin_mark_list.length
    //   item.general_mark_color_index = item.general_mark_color_index % this.SS_MARK_COLOR_COUNT // 一周して色数を越えないようにする
    //   return item
    // },

    test_all() {
      this.test_one()
      this.test_color()
      this.test_stand()
      this.test_label()
    },

    test_one() {
      this.sp_origin_mark_list.push({general_mark_pos_key: "1_1", general_mark_group_name: "なまえ", general_mark_color_index:  0, })
    },

    test_color() {
      this.sp_origin_mark_list.push({general_mark_pos_key: "9_5", general_mark_group_name: "0",  general_mark_color_index:  0, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "8_5", general_mark_group_name: "1",  general_mark_color_index:  1, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "7_5", general_mark_group_name: "2",  general_mark_color_index:  2, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "6_5", general_mark_group_name: "3",  general_mark_color_index:  3, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "5_5", general_mark_group_name: "4",  general_mark_color_index:  4, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "4_5", general_mark_group_name: "5",  general_mark_color_index:  5, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "3_5", general_mark_group_name: "6",  general_mark_color_index:  6, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "2_5", general_mark_group_name: "7",  general_mark_color_index:  7, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "1_5", general_mark_group_name: "8",  general_mark_color_index:  8, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "9_6", general_mark_group_name: "9",  general_mark_color_index:  9, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "8_6", general_mark_group_name: "10", general_mark_color_index: 10, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "7_6", general_mark_group_name: "11", general_mark_color_index: 11, })
    },

    test_stand() {
      this.sp_origin_mark_list.push({general_mark_pos_key: "black_R", general_mark_group_name: "A", general_mark_color_index: 0, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "black_R", general_mark_group_name: "B", general_mark_color_index: 1, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "white_R", general_mark_group_name: "C", general_mark_color_index: 2, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "white_R", general_mark_group_name: "D", general_mark_color_index: 3, })
    },

    test_label() {
      //
      this.sp_origin_mark_list.push({general_mark_pos_key: "9_3", general_mark_group_name: "あいうえお", general_mark_color_index: 0, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "8_3", general_mark_group_name: "あいうえお", general_mark_color_index: 1, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "7_3", general_mark_group_name: "あいうえお", general_mark_color_index: 2, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "6_3", general_mark_group_name: "あいうえお", general_mark_color_index: 3, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "5_3", general_mark_group_name: "あいうえお", general_mark_color_index: 4, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "4_3", general_mark_group_name: "あいうえお", general_mark_color_index: 5, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "3_3", general_mark_group_name: "あいうえお", general_mark_color_index: 6, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "2_3", general_mark_group_name: "あいうえお", general_mark_color_index: 7, })
      //                                      _
      this.sp_origin_mark_list.push({general_mark_pos_key: "9_3", general_mark_group_name: "abcABC12345", general_mark_color_index: 7, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "8_3", general_mark_group_name: "abcABC12345", general_mark_color_index: 6, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "7_3", general_mark_group_name: "abcABC12345", general_mark_color_index: 5, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "6_3", general_mark_group_name: "abcABC12345", general_mark_color_index: 4, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "5_3", general_mark_group_name: "abcABC12345", general_mark_color_index: 3, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "4_3", general_mark_group_name: "abcABC12345", general_mark_color_index: 2, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "3_3", general_mark_group_name: "abcABC12345", general_mark_color_index: 1, })
      this.sp_origin_mark_list.push({general_mark_pos_key: "2_3", general_mark_group_name: "abcABC12345", general_mark_color_index: 0, })
    },
  },
  computed: {
    current_user_name() { return this.current_users[this.user_index].name },
  },
}
</script>

<style lang="sass">
.test-test_origin_mark
  __css_keep__: 0
</style>
