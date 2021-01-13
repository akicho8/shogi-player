<template lang="pug">
.MainDocStyleDemo.section
  .title.is-4.mt-6 スタイルカスタマイズ例
  hr
  .columns
    .column
      img(src="/style_editor_images/1.png")
    .column
      img(src="/style_editor_images/2.png")
  .columns
    .column
      img(src="/style_editor_images/3.png")
    .column
      img(src="/style_editor_images/4.png")
</template>

<script>
export default {
  name: "MainDocStyleDemo",
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocStyleDemo
</style>
