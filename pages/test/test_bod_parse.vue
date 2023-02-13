<template lang="pug">
.test-test_bod_parse
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold BOD読み込み
  .section
    .container
      ShogiPlayer(
        :sp_turn="0"
        :sp_body="sp_body"
        sp_mode="view"
        sp_debug_mode="is_debug_mode_on"
        sp_controller="is_controller_on"
        sp_slider="is_slider_on"
      )
</template>

<script>
export default {
  data() {
    return {
      sp_body: `
上手の持駒：歩
  ９ ８ ７ ６ ５ ４ ３ ２ １
+---------------------------+
|v香v桂 ・v金 ・v金 ・v桂v香|一
| ・v玉v銀 ・ ・v飛 ・ ・ ・|二
| ・v歩v歩v歩v歩 ・v角v歩v歩|三
| ・ ・ ・ ・v銀v歩v歩 ・ ・|四
| ・ ・ ・ ・ ・ ・ ・ ・ ・|五
| ・ ・ 歩 ・ 銀 歩 ・ 歩 ・|六
| ・ 歩 ・ 歩 歩 ・ 歩 ・ ・|七
| ・ 角 玉 ・ 金 飛 ・ ・ ・|八
| 香 桂 銀 金 ・ ・ ・ 桂 香|九
+---------------------------+
下手の持駒：歩二
手数＝0 まで

上手番
手数----指手---------消費時間--
   1 52飛(42)
`,
    }
  },
}
</script>

<style lang="sass">
//- @import "./support.sass"
.test-test_bod_parse
  .ShogiPlayer
    width: 25%
</style>
