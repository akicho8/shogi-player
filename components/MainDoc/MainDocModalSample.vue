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
                sp_run_mode="view_mode"
                sp_debug_mode="is_debug_mode_off"
                :sp_turn="0"
                :sp_body="kifu_book_info.sp_body"
                :sp_key_event_capture_enabled="true"
                sp_slider="is_slider_on"
                sp_controller="is_controller_on"
                :sp_sound_enabled="true"
              )

            footer.modal-card-foot
              //- b-tooltip(label="この局面から自分で操作")
              //-   b-switch(v-model="sp_run_mode" true-value="play_mode" false-value="view_mode") 継盤
              a.button(@click="modal_p = false") 閉じる
              a.button(@click.prevent.stop="") ボタン2
              a.button(@click.prevent.stop="") ボタン3
</template>

<script>
import { KifuBookInfo } from "../models/kifu_book_info.js"

export default {
  name: "MainDocModalSample",
  data() {
    return {
      kifu_book_info: KifuBookInfo.fetch("KIF_16020"),
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocModalSample
</style>
