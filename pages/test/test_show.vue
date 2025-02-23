<template lang="pug">
.test-test_show
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold Show
  .section
    .container.is-fluid
      .columns
        .column
          ShogiPlayer(
            sp_mode="play"
            sp_debug
            sp_controller
            sp_slider
            sp_layer
          )
</template>

<script>
export default {
}
</script>

<style lang="sass">
.test-test_show
  __css_keep__: 0
</style>
