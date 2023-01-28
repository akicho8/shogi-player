<template lang="pug">
.MainDocResponsive
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold レスポンシブ
  .section.pt-5
    .container
      b-message.mt-0(type="is-info")
        p Bulma CSS の仕組みで画面幅に応じて横に並ぶ個数と隙間を調整できる
        p ShogiPlayer は何もしていない

      .is-size-7 タグの例
      pre
        | .columns.is-multiline.is-variable.is-0-mobile.is-4-tablet.is-5-desktop.is-6-widescreen.is-7-fullhd
        |   .column.is-6-tablet.is-4-desktop.is-3-widescreen.is-2-fullhd
        |     ShogiPlayer

      .columns.mt-2.is-multiline.is-variable.is-0-mobile.is-4-tablet.is-5-desktop.is-6-widescreen.is-7-fullhd
        template(v-for="i in 18")
          MainDocResponsiveOne
</template>

<style lang="sass">
@import "../support.sass"
.MainDocResponsive
</style>
