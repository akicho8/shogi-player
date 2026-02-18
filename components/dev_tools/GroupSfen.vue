<template lang="pug">
.DevToolsGroup
  //- b-dropdown(v-model="TheSP.new_sp_board_variant")
  //-   button.button(slot="trigger")
  //-     span
  //-       | {{BoardVariantInfo.fetch(TheSP.new_sp_board_variant).name}}
  //-     b-icon(icon="menu-down")
  //-   template(v-for="e in TheSP.BoardVariantInfo.values")
  //-     b-dropdown-item(:value="e.key") {{e.name}}

  //- b-field(custom-class="is-small" label="背景の種類")
  //- b-field
  //-   template(v-for="e in TheSP.BoardVariantInfo.values")
  //-     b-radio-button(size="is-small" v-model="TheSP.new_sp_board_variant" :native-value="e.key" size="is-small") {{e.name}}
  //-
  //- b-field(custom-class="is-small" label="駒の種類")
  //- b-field
  //-   template(v-for="e in TheSP.PieceVariantInfo.values")
  //-     b-radio-button(size="is-small" v-model="TheSP.new_sp_piece_variant" :native-value="e.key") {{e.name}}

  template(v-if="TheSP.xcontainer")
    b-field(custom-class="is-small" label="再生モードの現在のSFEN(Readonly)")
      b-input(:value="TheSP.xcontainer.to_short_sfen" type="input" size="is-small" readonly)

  b-field(custom-class="is-small" label="編集モードの現SFEN(Readonly) ※BUG:駒を反転したときに反映されない場合がある")
    b-input(:value="TheSP.edit_mode_short_sfen2" type="input" size="is-small" readonly)

  b-field(custom-class="is-small" label="再生モードの棋譜(Readonly)")
    b-input(:value="TheSP.kifu_source" type="textarea" size="is-small" readonly)

  b-field(custom-class="is-small" label="操作モードの棋譜(Readonly)")
    b-input.is-small(:value="TheSP.play_mode_full_moves_sfen" type="textarea" size="is-small" readonly)
</template>

<script>
import { support } from "../support.js"

export default {
  mixins: [support],
}
</script>
