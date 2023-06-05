<template lang="pug">
.MainDocApi
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold API
  .section
    .container
      .columns
        .column
          .buttons.is-centered.are-small
            b-button(label="api_random_puton"   @click="() => $refs.api_sp.api_random_puton()")
            b-button(label="api_retract_a_move" @click="() => $refs.api_sp.api_retract_a_move()")
            b-button(label="api_board_shuffle"  @click="() => $refs.api_sp.api_board_shuffle()")
      .columns
        .column
          ShogiPlayer(ref="api_sp")
</template>

<script>
export default {
  name: "MainDocApi",
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocApi
  __css_keep__: 0
</style>
