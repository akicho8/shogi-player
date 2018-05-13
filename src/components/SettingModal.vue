<template lang="pug">
//- style="width: auto"
.modal-card.has-text-left
  header.modal-card-head
    p.modal-card-title 設定

  section.modal-card-body
    b-field(label="モード")
      .block
        template(v-for="e in RunModeInfo.values")
          b-radio(v-model="current_run_mode" :native-value="e.key") {{e.name}}

    b-field(label="反転")
      b-switch(v-model="flip")

    b-field(label="デバッグモード")
      b-switch(v-model="current_debug_mode")

    b-field(label="テーマ")
      .block
        template(v-for="e in ThemeInfo.values")
          b-radio(v-model="$store.state.current_theme" :native-value="e.key") {{e.name}}

    template(v-if="$store.state.current_theme === 'real'")
      b-field(label="バリエーション")
        .block
          template(v-for="e in VariationInfo.values")
            b-radio(v-model="$store.state.current_variation" :native-value="e.key") {{e.name}}

    b-field(label="サイズ")
      .block
        template(v-for="e in SizeInfo.values")
          b-radio(v-model="$store.state.current_size" :native-value="e.key") {{e.name}}

    b-field(label="棋譜")
      b-input(v-model="kifu_source2" type="textarea")

  footer.modal-card-foot
    button.button.is-primary(@click="$parent.close()") 閉じる
</template>

<script>
// ここではあえていろんな方法を試している
//
// run_mode: コンポーネントへの数珠繋ぎ方式
// flip:     Vuex で管理している変数をコンポーネント側でラップする方式
//

import Vue from "vue"
import { RunModeInfo } from "../run_mode_info"
import { ThemeInfo } from "../theme_info"
import { SizeInfo } from "../size_info"
import { VariationInfo } from "../variation_info"

Object.defineProperty(Vue.prototype, 'RunModeInfo', {value: RunModeInfo})
Object.defineProperty(Vue.prototype, 'ThemeInfo', {value: ThemeInfo})
Object.defineProperty(Vue.prototype, 'SizeInfo', {value: SizeInfo})
Object.defineProperty(Vue.prototype, 'VariationInfo', {value: VariationInfo})

export default {
  props: {
    run_mode: {required: true},
    kifu_source: {required: false},
  },
  data() {
    return {
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
