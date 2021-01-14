<template lang="pug">
.hero.is-primary.is-medium.MainDocHero
  .hero-head
    b-navbar(:mobile-burger="false" wrapper-class="container")
      template(slot="end")
        b-navbar-item(href="https://github.com/akicho8/shogi-player")
          b-icon(icon="github")
          .ml-2 GitHub

  .hero-body
    .container.has-text-centered
      h1.title
        | shogi-player

  .hero-foot
    nav.tabs
      .container
        ul
          li: a(href="#summary") 概要
          li: a(href="#examples") デモ
          li: nuxt-link(:to="{name: 'usage'}") 組み込み方法
          li: nuxt-link(:to="{name: 'props'}") コンポーネント引数一覧
          li: nuxt-link(:to="{name: 'options'}") 引数とイベントチェック
          li: nuxt-link(:to="{name: 'api'}") API
          li: nuxt-link(:to="{name: 'css-customize'}") CSS変数一覧
          li: nuxt-link(:to="{name: 'editor'}") スタイルエディタ
          li: nuxt-link(:to="{name: 'credit'}") クレジット
</template>

<script>
export default {
  name: "MainDocHero",
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocHero
  .hero-foot
    li
      background-color: change_color($black, $alpha: 0.1)
    li:not(:first-child)
      margin-left: 0.25rem
</style>
