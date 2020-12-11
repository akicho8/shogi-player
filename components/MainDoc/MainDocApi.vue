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
            :summary_show="false"
            :hidden_if_piece_stand_blank="true"
            :board_cell_pointerdown_user_handle="board_cell_pointerdown_user_handle"
            :board_cell_left_click_user_handle="board_cell_left_click_user_handle"
            :overlay_navi="false"
            :debug_mode_p="false"
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
    board_cell_left_click_user_handle(place, event) {
      this.$buefy.toast.open({message: `${place.kanji_human}のセルをクリック`, queue: false})
      return true
    },
    board_cell_pointerdown_user_handle(place, event) {
      this.$buefy.toast.open({message: `${place.kanji_human}のセルをクリック(押した瞬間)`, queue: false})
      return true
    },

    run_api_random_puton()   { this.$refs.api_sp.api_random_puton()   },
    run_api_retract_a_move() { this.$refs.api_sp.api_retract_a_move() },

  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocApi
</style>
