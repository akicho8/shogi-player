<template lang="pug">
//- style="width: auto"
.modal-card.has-text-left
  header.modal-card-head
    p.modal-card-title 設定
  section.modal-card-body
    b-field(label="モード")
      .block
        b-radio(v-model="current_mode" native-value="view_mode") 再生
        b-radio(v-model="current_mode" native-value="play_mode") 操作
        b-radio(v-model="current_mode" native-value="edit_mode") 編集
    b-field(label="反転")
      b-switch(v-model="flip")
    b-field(label="デバッグモード")
      b-switch(v-model="inside_debug_mode")
    b-field(label="テーマ")
      .block
        b-radio(v-model="$store.state.current_theme" native-value="none") なし
        b-radio(v-model="$store.state.current_theme" native-value="simple") 紙面風
        b-radio(v-model="$store.state.current_theme" native-value="real") リアル
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

// import { mapState } from 'vuex'

export default {
  props: {
    run_mode: {required: true},
    kifu_source: {required: false},
  },
  data() {
    return {
      current_mode: this.run_mode,
      kifu_source2: this.kifu_source,
    }
  },
  watch: {
    current_mode(value) {
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
      get() { return this.$store.state.flip },
      set(v) { this.$store.state.flip = v },
    },
    // ...mapState([
    //   "inside_debug_mode",      // これだと get() しか作られない
    // ]),
    inside_debug_mode: {
      get() { return this.$store.state.inside_debug_mode },
      set(v) {
        this.$store.commit("inside_debug_mode_set", v) // どんだけ冗長なことやらすんだ。面倒くさいぞこれ
        // というか別に直接更新してもよい
        // this.$store.state.inside_debug_mode = v
      },
    },
  },
}
</script>
