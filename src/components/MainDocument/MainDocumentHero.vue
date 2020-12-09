<template lang="pug">
.hero.is-primary.is-medium.MainDocumentHero
  .hero-head
    nav.navbar
      .container
        .navbar-brand
          span.navbar-burger.burger(data-target="navbarMenuHeroA")
            span
            span
            span

        #navbarMenuHeroA.navbar-menu
          .navbar-end
            a.navbar-item(href="https://github.com/akicho8/shogi-player")
              span.icon
                i.fab.fa-github
              span
               | Github

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
          li: a(href="#usage") 使い方
          li: a(href="#options") オプション
          li: a(href="#api") API
          li: router-link(:to="{name: 'StyleEditor'}") スタイルエディタ
</template>

<script>
export default {
  name: "MainDocumentHero",
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocumentHero
</style>
