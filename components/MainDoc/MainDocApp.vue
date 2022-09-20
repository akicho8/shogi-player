<template lang="pug">
.MainDocApp
  .section
    .container
      .columns
        MainDocViewDemo1
</template>

<script>
export default {
  name: "MainDocApp",
}
</script>

<style lang="sass">
@use "./support.sass"
.MainDocApp
  +mobile
    font-size: 15px
</style>
