<template lang="pug">
.test-test_illegal
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold 反則検知
  .section
    .container.is-fluid
      .columns.is-multiline
        .column.is-3
          ShogiPlayer(
            :sp_turn="0"
            :sp_body="sp_body"
            sp_mode="play"
            sp_debug
            sp_controller
            sp_slider
            :sp_request_checkmate_stat="sp_request_checkmate_stat"
            :sp_request_position_hash="sp_request_position_hash"
            :sp_request_op_king_check="sp_request_op_king_check"
            :sp_illegal_validate="sp_illegal_validate"
            :sp_illegal_cancel="sp_illegal_cancel"
            @ev_illegal_illegal_accident="value => illegal_accident = value"
            @ev_play_mode_move="ev_play_mode_move"
          )
          template(v-if="illegal_accident && illegal_accident.sfen")
            | 反則局面
            ShogiPlayer(
              :sp_turn="illegal_accident.turn"
              :sp_body="illegal_accident.sfen"
            )
        .column.is-2
          b-field(custom-class="is-small" label="反則検知" message="OFFなら気持ち程度処理も軽くなる")
            b-radio-button(size="is-small" v-model="sp_illegal_validate" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="sp_illegal_validate" :native-value="true") ON
          b-field(custom-class="is-small" label="反則ブロック" message="ONは初心者向けで判定にひっかかったら操作を無効にする")
            b-radio-button(size="is-small" v-model="sp_illegal_cancel" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="sp_illegal_cancel" :native-value="true") ON
          b-field(custom-class="is-small" label="詰み判定" message="詰み判定するか？")
            b-radio-button(size="is-small" v-model="sp_request_checkmate_stat" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="sp_request_checkmate_stat" :native-value="true") ON
          b-field(custom-class="is-small" label="千日手判定" message="千日手判定用に現局面用のSFENを送るか？")
            b-radio-button(size="is-small" v-model="sp_request_position_hash" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="sp_request_position_hash" :native-value="true") ON
          b-field(custom-class="is-small" label="王手したか判定" message="動かした側が王手したかの結果を送るか？")
            b-radio-button(size="is-small" v-model="sp_request_op_king_check" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="sp_request_op_king_check" :native-value="true") ON
        .column.is-2
          | 反則ブロック情報
          pre
            | {{illegal_accident}}
        .column.is-2
          | 指し手
          pre
            | {{play_mode_move}}
        .column.is-2
          | 人間向け表記
          pre(v-if="illegal_accident && illegal_accident.last_move_info")
            | to_kif: {{illegal_accident.last_move_info.to_kif}}
            | to_kif_without_from: {{illegal_accident.last_move_info.to_kif_without_from}}
            | to_kif_without_from_and_location: {{illegal_accident.last_move_info.to_kif_without_from_and_location}}
        .column.is-4
          | 千日手判定用
          pre {{pcounts_hash}}
</template>

<script>
// const sp_body_default = `
// 後手の持駒：歩
//   ９ ８ ７ ６ ５ ４ ３ ２ １
// +---------------------------+
// | ・ ・ ・v飛 ・ ・ ・ ・ ・|
// | ・ ・ ・ ・ ・ ・ ・ ・ ・|
// | ・ ・ ・ ・ ・ ・ ・ ・ ・|
// | ・ ・ ・ ・ ・ ・ ・ ・ ・|
// | ・ ・ ・ ・ ・ ・ ・ ・ ・|
// | ・ ・ ・ ・ ・ ・ ・ ・ ・|
// | ・ ・ ・ ・ 歩 ・ ・ ・ ・|
// | ・ ・ ・ 角 ・ ・ ・ ・ ・|
// |v飛 ・ ・ 玉 ・ ・ ・ ・ 歩|
// +---------------------------+
// 先手の持駒：歩
// 手数＝0 まで
//
// 先手番
// 手数----指手---------消費時間--
// `

// const sp_body_default = `
// 後手の持駒：歩
//   ９ ８ ７ ６ ５ ４ ３ ２ １
// +---------------------------+
// | ・ ・ ・ ・ ・ ・ ・v歩v玉|
// | ・ ・ ・ ・ ・ ・ ・ ・ ・|
// | ・ ・ ・ ・ ・ ・ ・ ・ 玉|
// | ・ ・ ・ ・ ・ ・ ・ ・ ・|
// | ・ ・ ・ ・ ・ ・ ・ ・ ・|
// | ・ ・ ・ ・ ・ ・ ・ ・ ・|
// | ・ ・ ・ ・ ・ ・ ・ ・ ・|
// | ・ ・ ・ ・ ・ ・ ・ ・ ・|
// | ・ ・ ・ ・ ・ ・ ・ ・ ・|
// +---------------------------+
// 先手の持駒：歩
// 手数＝0 まで
//
// 先手番
// 手数----指手---------消費時間--
// `

const sp_body_default = `
後手の持駒：歩
  ９ ８ ７ ６ ５ ４ ３ ２ １
+---------------------------+
| ・ ・ ・ ・ ・ ・ ・ ・v玉|
|v飛 ・ ・ ・ ・ 歩 玉 ・ ・|
| ・ ・ ・ ・ ・ ・ ・ ・ ・|
| 飛 飛 飛 飛 飛 飛 飛 飛 ・|
| 飛 飛 飛 飛 飛 飛 飛 飛 ・|
| 飛 飛 飛 飛 飛 飛 飛 飛 ・|
| 飛 飛 飛 飛 飛 飛 飛 飛 ・|
| 飛 飛 飛 飛 飛 飛 飛 飛 ・|
| 飛 飛 飛 飛 飛 飛 飛 飛 ・|
+---------------------------+
先手の持駒：歩金
手数＝0 まで

先手番
手数----指手---------消費時間--
`

export default {
  data() {
    return {
      sp_request_checkmate_stat: true,
      sp_request_position_hash: true,
      sp_request_op_king_check: true,
      sp_illegal_validate: true,
      sp_illegal_cancel: true,
      illegal_accident: null,
      play_mode_move: null,
      sp_body: this.$route.query.sp_body ?? sp_body_default,
      pcounts_hash: {},
    }
  },
  methods: {
    ev_play_mode_move(e) {
      this.play_mode_move = e
      const key = [e.op_king_check, e.position_hash].join(",")
      const new_count = (this.pcounts_hash[key] ?? 0) + 1
      this.pcounts_hash[key] = new_count
      if (new_count >= 4) {
        if (e.op_king_check) {
          alert("連続王手の千日手")
        } else {
          alert("千日手")
        }
      }
    },
  },

}
</script>

<style lang="sass">
.test-test_illegal
  __css_keep__: 0
  pre
    // white-space: pre-wrap
    // word-break: break-all
    overflow: scroll
</style>

