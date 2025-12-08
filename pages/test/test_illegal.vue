<template lang="pug">
.test-test_illegal
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold 反則判定
  .section
    .container.is-fluid
      .columns
        .column.is-3
          ShogiPlayer(
            :sp_turn="0"
            :sp_body="sp_body"
            sp_mode="play"
            sp_debug
            sp_controller
            sp_slider
            :sp_checkmate_feature="sp_checkmate_feature"
            :sp_illegal_validate="sp_illegal_validate"
            :sp_illegal_cancel="sp_illegal_cancel"
            @ev_illegal_illegal_accident="value => illegal_accident = value"
            @ev_play_mode_move="value => play_mode_move = value"
          )
          template(v-if="illegal_accident && illegal_accident.sfen")
            | 反則局面
            ShogiPlayer(
              :sp_turn="illegal_accident.turn"
              :sp_body="illegal_accident.sfen"
            )
        .column.is-2
          b-field(custom-class="is-small" label="反則判定" message="OFFなら気持ち程度処理も軽くなる")
            b-radio-button(size="is-small" v-model="sp_illegal_validate" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="sp_illegal_validate" :native-value="true") ON
          b-field(custom-class="is-small" label="反則ブロック" message="ONは初心者向けで判定にひっかかったら操作を無効にする")
            b-radio-button(size="is-small" v-model="sp_illegal_cancel" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="sp_illegal_cancel" :native-value="true") ON
          b-field(custom-class="is-small" label="詰み判定" message="詰み判定するか？")
            b-radio-button(size="is-small" v-model="sp_checkmate_feature" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="sp_checkmate_feature" :native-value="true") ON
        .column
          | 反則ブロック情報
          pre
            | {{illegal_accident}}
        .column
          | 指し手
          pre
            | {{play_mode_move}}
        .column
          | 人間向け表記
          pre(v-if="illegal_accident && illegal_accident.last_move_info")
            | to_kif: {{illegal_accident.last_move_info.to_kif}}
            | to_kif_without_from: {{illegal_accident.last_move_info.to_kif_without_from}}
            | to_kif_without_from_and_location: {{illegal_accident.last_move_info.to_kif_without_from_and_location}}
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

const sp_body_default = `
後手の持駒：歩
  ９ ８ ７ ６ ５ ４ ３ ２ １
+---------------------------+
| ・ ・ ・ ・ ・ ・ ・v歩v玉|
| ・ ・ ・ ・ ・ ・ ・ ・ ・|
| ・ ・ ・ ・ ・ ・ ・ ・ 玉|
| ・ ・ ・ ・ ・ ・ ・ ・ ・|
| ・ ・ ・ ・ ・ ・ ・ ・ ・|
| ・ ・ ・ ・ ・ ・ ・ ・ ・|
| ・ ・ ・ ・ ・ ・ ・ ・ ・|
| ・ ・ ・ ・ ・ ・ ・ ・ ・|
| ・ ・ ・ ・ ・ ・ ・ ・ ・|
+---------------------------+
先手の持駒：歩
手数＝0 まで

先手番
手数----指手---------消費時間--
`

export default {
  data() {
    return {
      sp_checkmate_feature: true,
      sp_illegal_validate: true,
      sp_illegal_cancel: true,
      illegal_accident: null,
      play_mode_move: null,
      sp_body: this.$route.query.sp_body ?? sp_body_default,
    }
  },
}
</script>

<style lang="sass">
.test-test_illegal
  __css_keep__: 0
  pre
    white-space: pre-wrap
    word-break: break-all
</style>
