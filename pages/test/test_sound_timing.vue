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
            @user_piece_put="     user_event_check('user_piece_put')"
            @user_viewpoint_flip="user_event_check('user_viewpoint_flip')"
            @user_turn_change="   user_event_check('user_turn_change')"
            @user_piece_lift="    user_event_check('user_piece_lift')"
            @user_piece_cancel="  user_event_check('user_piece_cancel')"
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
    user_event_check(key) {
      this.$buefy.toast.open({message: key, queue: false})

      // https://zenn.dev/terrierscript/articles/2022-07-15-audio-context-sound-effect
      const audioCtx = new window.AudioContext()
      const oscillator = audioCtx.createOscillator()
      oscillator.type = "sine"
      oscillator.frequency.setValueAtTime(432, audioCtx.currentTime)
      oscillator.connect(audioCtx.destination)
      oscillator.start(audioCtx.currentTime)
      oscillator.stop(audioCtx.currentTime + 0.05)
    },
  },

}
</script>

<style lang="sass">
.test-test_sound_timing
</style>
