<template lang="pug">
.modal-card.has-text-left(style="width:auto")
  header.modal-card-head
    p.modal-card-title 設定
    button.delete(aria-label="close" @click.stop.prevent="$parent.close()")

  section.modal-card-body
    b-field(label="モード")
    b-field
      template(v-for="e in RunModeInfo.values")
        b-radio-button(v-model="base.new_run_mode" :native-value="e.key") {{e.name}}

    b-field(grouped)
      b-field(label="反転")
        b-switch(v-model="base.new_flip")
      b-field(label="デバッグモード")
        b-switch(v-model="base.new_debug_mode_p")

    template(v-if="false")
      b-dropdown(v-model="base.new_bg_variant")
        button.button(slot="trigger")
          span
            | {{BgVariantInfo.fetch(base.new_bg_variant).name}}
          b-icon(icon="menu-down")
        template(v-for="e in BgVariantInfo.values")
          b-dropdown-item(:value="e.key") {{e.name}}

    //- b-field(label="テーマ")
    //- b-field
    //-   template(v-for="e in ThemeInfo.values")
    //-     b-radio-button(v-model="base.new_theme" :native-value="e.key") {{e.name}}

    b-field(label="背景の種類")
    b-field
      template(v-for="e in BgVariantInfo.values")
        b-radio-button(v-model="base.new_bg_variant" :native-value="e.key" size="is-small") {{e.name}}

    b-field(label="駒の種類")
    b-field
      template(v-for="e in PiVariantInfo.values")
        b-radio-button(v-model="base.new_pi_variant" :native-value="e.key") {{e.name}}

    b-field(label="サイズ")
    b-field
      template(v-for="e in SizeInfo.values")
        b-radio-button(v-model="base.new_size" :native-value="e.key" size="is-small") {{e.name}}

    template(v-if="base.mediator")
      b-field(label="再生モードの現局面(Readonly)")
        b-input(:value="base.mediator.to_position_sfen" type="input" size="is-small" readonly)

    b-field(label="編集モードの現局面(Readonly) ※BUG:駒を反転したときに反映されない場合がある")
      b-input(:value="base.edit_mode_snapshot_sfen2" type="input" size="is-small" readonly)

    b-field(label="再生モードの棋譜(Readonly)")
      b-input(:value="base.kifu_source" type="textarea" size="is-small" readonly)

    b-field(label="操作モードの棋譜(Readonly)")
      b-input.is-small(:value="base.play_mode_full_moves_sfen" type="textarea" size="is-small" readonly)

  footer.modal-card-foot
    button.button.is-primary(@click.stop.prevent="$parent.close()") 閉じる
</template>

<script>
import RunModeInfo      from "../models/run_mode_info"
import ThemeInfo        from "../models/theme_info"
import SizeInfo         from "../models/size_info"
import BgVariantInfo    from "../models/bg_variant_info"
import PiVariantInfo from "../models/pi_variant_info"

import { support } from "./support.js"

export default {
  name: "SettingModal",
  mixins: [support],
  computed: {
    RunModeInfo()   { return RunModeInfo   },
    ThemeInfo()     { return ThemeInfo     },
    SizeInfo()      { return SizeInfo      },
    BgVariantInfo() { return BgVariantInfo },
    PiVariantInfo() { return PiVariantInfo },
  },
}
</script>
