<template lang="pug">
.test-test_foul
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
            :sp_foul_validate="sp_foul_validate"
            :sp_foul_cancel="sp_foul_cancel"
            @ev_foul_foul_accident="value => foul_accident = value"
          )
        .column
          b-field(custom-class="is-small" label="反則判定" message="OFFなら気持ち程度処理も軽くなる")
            b-radio-button(size="is-small" v-model="sp_foul_validate" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="sp_foul_validate" :native-value="true") ON
          b-field(custom-class="is-small" label="操作無効" message="ONは初心者向けで判定にひっかかったら操作を無効にする")
            b-radio-button(size="is-small" v-model="sp_foul_cancel" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="sp_foul_cancel" :native-value="true") ON
        .column
          pre
            | {{foul_accident}}
</template>

<script>
export default {
  data() {
    return {
      sp_foul_validate: true,
      sp_foul_cancel: false,
      foul_accident: null,
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
.test-test_foul
</style>
