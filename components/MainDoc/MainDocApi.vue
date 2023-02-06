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
          ShogiPlayer(
            ref="api_sp"
            :sp_hidden_if_piece_stand_blank="true"
            sp_debug_mode="is_debug_mode_off"
          )
      .columns
        .column
          .buttons.is-centered
            b-button(label="api_random_puton" @click="run_api_random_puton")
            b-button(label="api_retract_a_move" @click="run_api_retract_a_move")
      .columns
        .column
          MainDocMd(:body="api_md")
</template>

<script>
import api_md from "./api.md"

export default {
  name: "MainDocApi",
  data() {
    return {
      api_md,

    }
  },

  methods: {
    run_api_random_puton()   { this.$refs.api_sp.api_random_puton()   },
    run_api_retract_a_move() { this.$refs.api_sp.api_retract_a_move() },

  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocApi
</style>
