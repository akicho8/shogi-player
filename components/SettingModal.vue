<template lang="pug">
.modal-card.has-text-left(style="width:auto")
  header.modal-card-head
    p.modal-card-title 設定
    button.delete(aria-label="close" @click.stop.prevent="$parent.close()")

  section.modal-card-body
    b-field(label="モード")
    b-field
      template(v-for="e in RunModeInfo.values")
        b-radio-button(v-model="TheSp.new_run_mode" :native-value="e.key") {{e.name}}

    b-field(grouped)
      b-field(label="視点")
        b-radio-button(v-model="TheSp.new_viewpoint" native-value="black") ☗
        b-radio-button(v-model="TheSp.new_viewpoint" native-value="white") ☖

      b-field(label="デバッグモード")
        b-radio-button(v-model="TheSp.new_debug" :native-value="false") OFF
        b-radio-button(v-model="TheSp.new_debug" :native-value="true") ON

      b-field(label="イベントログ")
        b-radio-button(v-model="TheSp.new_event_log" :native-value="false") OFF
        b-radio-button(v-model="TheSp.new_event_log" :native-value="true")  ON

    template(v-if="false")
      b-dropdown(v-model="TheSp.new_sp_bg_variant")
        button.button(slot="trigger")
          span
            | {{BgVariantInfo.fetch(TheSp.new_sp_bg_variant).name}}
          b-icon(icon="menu-down")
        template(v-for="e in BgVariantInfo.values")
          b-dropdown-item(:value="e.key") {{e.name}}

    //- b-field(label="背景の種類")
    //- b-field
    //-   template(v-for="e in BgVariantInfo.values")
    //-     b-radio-button(v-model="TheSp.new_sp_bg_variant" :native-value="e.key" size="is-small") {{e.name}}
    //-
    //- b-field(label="駒の種類")
    //- b-field
    //-   template(v-for="e in PieceVariantInfo.values")
    //-     b-radio-button(v-model="TheSp.new_sp_piece_variant" :native-value="e.key") {{e.name}}

    template(v-if="TheSp.xcontainer")
      b-field(label="再生モードの現局面(Readonly)")
        b-input(:value="TheSp.xcontainer.to_short_sfen" type="input" size="is-small" readonly)

    b-field(label="編集モードの現局面(Readonly) ※BUG:駒を反転したときに反映されない場合がある")
      b-input(:value="TheSp.edit_mode_short_sfen2" type="input" size="is-small" readonly)

    b-field(label="再生モードの棋譜(Readonly)")
      b-input(:value="TheSp.kifu_source" type="textarea" size="is-small" readonly)

    b-field(label="操作モードの棋譜(Readonly)")
      b-input.is-small(:value="TheSp.play_mode_full_moves_sfen" type="textarea" size="is-small" readonly)

  footer.modal-card-foot
    button.button.is-primary(@click.stop.prevent="$parent.close()") 閉じる
</template>

<script>
import { RunModeInfo } from "./models/run_mode_info.js"
import { BgVariantInfo } from "./models/bg_variant_info.js"
import { PieceVariantInfo } from "./models/piece_variant_info.js"

import { support } from "./support.js"

export default {
  name: "SettingModal",
  mixins: [support],
  computed: {
    RunModeInfo()   { return RunModeInfo   },
    BgVariantInfo() { return BgVariantInfo },
    PieceVariantInfo() { return PieceVariantInfo },
  },
}
</script>
