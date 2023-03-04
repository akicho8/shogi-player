<template lang="pug">
.MainDocIndex(:class="{'STAGE-development': development_p}")
  MainDocMainNavbar
    template(slot="brand")
      b-navbar-item(tag="nuxt-link" :to="{name: 'index'}")
        b
          | ShogiPlayer Demo
    template(slot="start")
      b-navbar-item(tag="a" href="https://shogi-player.netlify.app/" target="_blank") Document
      b-navbar-item(tag="nuxt-link" :to="{name: 'style-editor'}") スタイルエディタ
    template(slot="end")
      b-navbar-item(tag="a" href="https://github.com/akicho8/shogi-player" target="_blank") GitHub
      b-navbar-dropdown(label="実験" hoverable v-if="development_p")
        b-navbar-item(tag="nuxt-link" :to="{name: 'test-sp_device'}") sp_device テスト
        b-navbar-item(tag="nuxt-link" :to="{name: 'test-test_bod_parse'}") BOD読み込み
        b-navbar-item(tag="nuxt-link" :to="{name: 'test-test_illegal'}") 反則判定
        b-navbar-item(tag="nuxt-link" :to="{name: 'test-test_sound_timing'}") 音タイミング
  .MainDocDemo.section.is-paddingless.is-marginless
    .container.is-fluid
      .title.is-4.mt-6 1. 再生モード (view)
      .columns.is-centered
        MainDocViewDemo1.is-10-tablet.is-8-desktop.is-6-widescreen
      .columns.mt-6
        MainDocViewDemo2
        MainDocViewDemo3
      .columns.mt-6
        MainDocViewDemo4
        MainDocViewDemo5
      .columns.mt-6
        MainDocViewDemo6
      .columns.mt-6.is-centered
        MainDocViewDemo8.is-11-tablet.is-10-desktop.is-9-widescreen

      .title.is-4.mt-6 2. 操作モード (play)
      .columns
        MainDocPlayDemo1
        MainDocPlayDemo2
      .columns
        MainDocPlayDemo3
        MainDocPlayDemo4
        MainDocPlayDemo5
      MainDocPlayDemo6

      .title.is-4.mt-6 3. 編集モード
      .columns
        MainDocEditDemo1
        MainDocEditDemo2
</template>

<script>
export default {
  name: "MainDocIndex",
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocIndex
  +mobile
    font-size: 15px

  .content
    word-break: break-all

  .section
    padding: 0

  .is_piece_variant_portella
    --sp_board_piece_size: 1.0

.MainDocIndex
  &.STAGE-development
    .container, .section, .columns, .columns
      border: 1px dashed change_color($primary, $alpha: 0.5)
</style>
