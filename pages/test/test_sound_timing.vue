<template lang="pug">
.test-test_sound_timing
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold 音タイミング
  .section
    .container
      .columns
        .column.is-3
          ShogiPlayer(
            :sp_turn="0"
            :sp_body="sp_body"
            sp_run_mode="play_mode"
            sp_debug_mode="is_debug_mode_on"
            sp_controller="is_controller_on"
            sp_slider="is_slider_on"
            @sound_play="sound_play"
          )
        .column
          pre
            | {{foul_accident}}
</template>

<script>
export default {
  data() {
    return {
      sp_body: "",
    }
  },
  methods: {
    sound_play(key) {
      this.$buefy.toast.open({message: key, queue: false})
    },
  },

}
</script>

<style lang="sass">
.test-test_sound_timing
</style>
