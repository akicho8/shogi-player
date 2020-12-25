<template lang="pug">
.MainDocModalSample.section
  a(name="modal_in_style")
  .container
    .title.is-3 モーダル内表示の例
    hr
    .columns
      .column
        .buttons
          a.button.is-primary(@click="modal_p = true") 開く

        b-modal(:active.sync="modal_p" has-modal-card)
          .modal-card.is-shogi-player-modal-card
            header.modal-card-head
              p.modal-card-title.is-size-5
                | モーダル内表示例
              button(class="delete" aria-label="close" @click="modal_p = false")

            section.modal-card-body
              shogi-player(
                :run_mode="'view_mode'"
                :debug_mode_p="false"
                :start_turn="0"
                :kifu_body="'position sfen 4R1gnk/6+Bsl/5+P1pp/9/9/9/9/9/9 b rb3g3s3n2l15p 1 moves 3b2a 3a2a 5a2a+ 1a2a G*3b 2a1a 3b2b 1a2b N*3d 2b1a S*2b'"
                :key_event_capture="true"
                sp_slider="is_slider_on"
                :controller_show="true"
                :sound_effect="true"
              )

              .box.is-size-6
                | 1手目と5手詰が重要

            footer.modal-card-foot
              //- b-tooltip(label="この局面から自分で操作")
              //-   b-switch(v-model="sp_run_mode" true-value="play_mode" false-value="view_mode") 継盤
              a.button(@click="modal_p = false") 閉じる
              a.button(@click.prevent.stop="") ボタン2
              a.button(@click.prevent.stop="") ボタン3
</template>

<script>
export default {
  name: "MainDocModalSample",
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocModalSample
</style>
