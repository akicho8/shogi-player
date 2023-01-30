<template lang="pug">
.MainDocDemo.section
  .container
    #examples.title.is-3 デモ
    hr

    .title.is-4.mt-6 1. 再生モード (view_mode)
    hr
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
    .columns.mt-6
      MainDocViewDesc

    .title.is-4.mt-6 2. 操作モード (play_mode)
    hr
    .columns
      MainDocPlayDemo1
      MainDocPlayDemo2
    .columns
      MainDocPlayDemo3
      MainDocPlayDemo4
      MainDocPlayDemo5
    MainDocPlayDemo6
    .columns.is-centered
      MainDocPlayDesc

    .title.is-4.mt-6 3. 編集モード
    hr
    .columns
      MainDocEditDemo1
      MainDocEditDemo2
    .columns.mt-6
      MainDocEditDesc1

    #style.title.is-3.mt-6 スタイル
    hr
    MainDocPaperStyle
    MainDocStyleDemo
</template>

<script>
export default {
  name: "MainDocDemo",
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocDemo
</style>
