<template lang="pug">
.test-test_illegal
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold 反則判定
  .section
    .container
      .columns
        .column.is-3
          ShogiPlayer(
            :sp_turn="0"
            :sp_body="sp_body"
            sp_mode="play"
            sp_debug
            sp_controller
            :sp_slider="false"
            :sp_illegal_validate="sp_illegal_validate"
            :sp_illegal_cancel="sp_illegal_cancel"
            @ev_illegal_illegal_accident="value => illegal_accident = value"
          )
        .column
          b-field(custom-class="is-small" label="反則判定" message="OFFなら気持ち程度処理も軽くなる")
            b-radio-button(size="is-small" v-model="sp_illegal_validate" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="sp_illegal_validate" :native-value="true") ON
          b-field(custom-class="is-small" label="操作無効" message="ONは初心者向けで判定にひっかかったら操作を無効にする")
            b-radio-button(size="is-small" v-model="sp_illegal_cancel" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="sp_illegal_cancel" :native-value="true") ON
        .column
          pre
            | {{illegal_accident}}
</template>

<script>
export default {
  data() {
    return {
      sp_illegal_validate: true,
      sp_illegal_cancel: false,
      illegal_accident: null,
      sp_body: `
後手の持駒：歩
  ９ ８ ７ ６ ５ ４ ３ ２ １
+---------------------------+
| ・ ・ ・ ・v飛 ・ ・ ・ ・|
| ・ ・ ・ ・ ・ ・ ・ ・ ・|
| ・ ・ ・ ・ ・ ・ ・ ・ ・|
| ・ ・ ・ ・ ・ ・ ・ ・ ・|
| ・ ・ ・ ・ ・ ・ ・ ・ ・|
| ・ ・ ・ ・ ・ ・ ・ ・ ・|
| ・ ・ ・ ・ ・ 歩 ・ ・ ・|
| ・ ・ ・ ・ 角 ・ ・ ・ ・|
| ・ ・ ・ ・ 玉 ・ ・ ・ 歩|
+---------------------------+
先手の持駒：歩
手数＝0 まで

先手番
手数----指手---------消費時間--
`,
    }
  },
}
</script>

<style lang="sass">
.test-test_illegal
  __css_keep__: 0
</style>
