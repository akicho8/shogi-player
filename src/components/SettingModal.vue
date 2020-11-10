<template lang="pug">
//- style="width: auto"
.modal-card.has-text-left(style="width:auto")
  header.modal-card-head
    p.modal-card-title 設定
    button.delete(aria-label="close" @click.stop.prevent="$parent.close()")

  section.modal-card-body
    b-field(label="モード")
    b-field
      template(v-for="e in RunModeInfo.values")
        b-radio-button(v-model="current_run_mode" :native-value="e.key") {{e.name}}

    b-field(grouped)
      b-field(label="反転")
        b-switch(v-model="flip")
      b-field(label="縦並び")
        b-switch(v-model="vlayout")
      b-field(label="デバッグモード")
        b-switch(v-model="current_debug_mode")

    template(v-if="false")
      b-dropdown(v-model="$store.state.current_bg_variant")
        button.button(slot="trigger")
          span
            | {{BgVariantInfo.fetch($store.state.current_bg_variant).name}}
          b-icon(icon="menu-down")
        template(v-for="e in BgVariantInfo.values")
          b-dropdown-item(:value="e.key") {{e.name}}

    b-field(label="テーマ")
    b-field
      template(v-for="e in ThemeInfo.values")
        b-radio-button(v-model="$store.state.current_theme" :native-value="e.key") {{e.name}}

    template(v-if="$store.state.current_theme === 'real'")
      .box
        b-field(label="背景の種類")
        b-field
          template(v-for="e in BgVariantInfo.values")
            b-radio-button(v-model="$store.state.current_bg_variant" :native-value="e.key" size="is-small") {{e.name}}

        b-field(label="駒の種類")
        b-field
          template(v-for="e in PieceVariantInfo.values")
            b-radio-button(v-model="$store.state.current_piece_variant" :native-value="e.key") {{e.name}}

    b-field(label="サイズ")
    b-field
      template(v-for="e in SizeInfo.values")
        b-radio-button(v-model="$store.state.current_size" :native-value="e.key" size="is-small") {{e.name}}

    template(v-if="sp_data.mediator")
      b-field(label="再生モードの現局面(Readonly)")
        b-input(:value="sp_data.mediator.to_position_sfen" type="input" size="is-small" readonly)

    b-field(label="編集モードの現局面(Readonly) ※BUG:駒を反転したときに反映されない場合がある")
      b-input(:value="edit_mode_snapshot_sfen2" type="input" size="is-small" readonly)

    b-field(label="再生モードの棋譜(編集可)")
      b-input(v-model="kifu_source2" type="textarea" size="is-small")

    b-field(label="操作モードの棋譜(Readonly)")
      b-input.is-small(:value="play_mode_full_moves_sfen" type="textarea" size="is-small" readonly)

  footer.modal-card-foot
    button.button.is-primary(@click.stop.prevent="$parent.close()") 閉じる
</template>

<script>
// ここではあえていろんな方法を試している
//
// run_mode: コンポーネントへの数珠繋ぎ方式
// flip:     Vuex で管理している変数をコンポーネント側でラップする方式
//

// import Vue from "vue"
import RunModeInfo from "../run_mode_info"
import ThemeInfo from "../theme_info"
import SizeInfo from "../size_info"
import BgVariantInfo from "../bg_variant_info"
import PieceVariantInfo from "../piece_variant_info"

import { support_child } from "./support_child.js"

// ↓このように定義した場合はアプリ側で再定義しないといけなくなる
// Object.defineProperty(Vue.prototype, 'RunModeInfo', {value: RunModeInfo})
// Object.defineProperty(Vue.prototype, 'ThemeInfo', {value: ThemeInfo})
// Object.defineProperty(Vue.prototype, 'SizeInfo', {value: SizeInfo})
// Object.defineProperty(Vue.prototype, 'BgVariantInfo', {value: BgVariantInfo})

export default {
  mixins: [support_child],

  props: {
    run_mode: { required: true },
    kifu_source: { required: false },
    play_mode_full_moves_sfen: { required: true }, // TODO: 親をそのまま参照したいんだけど $data を渡しても play_mode_full_moves_sfen は computed だから参照できない
    edit_mode_snapshot_sfen2: { required: true },  // TODO: 親を受けとりたい
    sp_data: { required: true },                // TODO: $data ではなく親を受けとりたい
  },

  data() {
    return {
      RunModeInfo,
      ThemeInfo,
      SizeInfo,
      BgVariantInfo,
      PieceVariantInfo,

      current_run_mode: this.run_mode,
      kifu_source2: this.kifu_source,
    }
  },

  watch: {
    current_run_mode(value) {
      this.$emit("update:run_mode", value)
    },
    kifu_source2(value) {
      this.$emit("update:kifu_body", value)
    },
  },

  methods: {
  },

  computed: {
    // http://chibinowa.net/note/vuejs/vue-11.html
    flip: {
      get() { return this.$store.state.current_flip },
      set(v) { this.$store.state.current_flip = v },
    },
    vlayout: {
      get() { return this.$store.state.current_vlayout },
      set(v) { this.$store.state.current_vlayout = v },
    },
    // ...mapState([
    //   "current_debug_mode",      // これだと get() しか作られない
    // ]),
    current_debug_mode: {
      get() { return this.$store.state.current_debug_mode },
      set(v) {
        this.$store.commit("current_debug_mode_set", v) // どんだけ冗長なことやらすんだ。面倒くさいぞこれ
        // というか別に直接更新してもよい
        // this.$store.state.current_debug_mode = v
      },
    },
  },
}
</script>
