<template lang="pug">
.MainDocCredit
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold クレジット (利用素材)

  .section
    .container
      .content
        //- h5 背景
        //- ul
        //-   MainDocExternalLink(href="https://www.beiz.jp/") BEIZ Graphics
        //-   MainDocExternalLink(href="http://free-paper-texture.com/") Paper-co
        h5 駒
        ul
          //- MainDocExternalLink(href="http://mucho.girly.jp/bona/") 将棋アプリ用クリエイティブコモンズ画像
          li: MainDocExternalLink(href="https://nureyon.com/") ぬれよん
          li
            MainDocExternalLink(href="https://www.google.co.jp/search?q=Portella+lishogi") Portella
            MainDocExternalLink.mx-2(href="https://creativecommons.org/licenses/by-nc-sa/4.0/") (CC BY-NC-SA 4.0)
          li: MainDocExternalLink(href="https://twitter.com/Shogi_Zuan") 将棋図案駒 (404)
          li: MainDocExternalLink(href="https://glyphwiki.org/") グリフウィキ
          li: MainDocExternalLink(href="https://studio.beatnix.co.jp/kids-it/kids-programming/scratch/scratch-material/hiragana-katakana-minchyo/") コドモとアプリ
          //- MainDocExternalLink(href="https://www.photolibrary.jp/") 写真素材 - フォトライブラリー photolibrary

        h5 効果音
        ul
          li: MainDocExternalLink(href="https://assetstore.unity.com/packages/audio/sound-fx/universal-sound-fx-17256") UNIVERSAL SOUND FX
</template>

<script>
export default {
  name: "MainDocCredit",
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocCredit
  h5:not(:first-child)
    margin-top: 2.5rem
</style>
