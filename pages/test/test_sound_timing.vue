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
            sp_mode="play"
            sp_debug
            :sp_controller="true"
            :sp_slider="true"
            @ev_play_mode_piece_put="     user_event_check('ev_play_mode_piece_put')"
            @ev_action_viewpoint_flip="user_event_check('ev_action_viewpoint_flip')"
            @ev_action_turn_change="   user_event_check('ev_action_turn_change')"
            @ev_action_piece_lift="    user_event_check('ev_action_piece_lift')"
            @ev_action_piece_cancel="  user_event_check('ev_action_piece_cancel')"
          )
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
