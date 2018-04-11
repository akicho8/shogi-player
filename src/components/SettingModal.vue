<template>
  <div class="modal-card has-text-left"><!-- style="width: auto" -->
    <header class="modal-card-head">
      <p class="modal-card-title">設定</p>
    </header>
    <section class="modal-card-body">
      <b-field label="モード">
        <div class="block">
          <b-radio v-model="current_mode" native-value="view_mode">再生</b-radio>
          <b-radio v-model="current_mode" native-value="play_mode">操作</b-radio>
          <b-radio v-model="current_mode" native-value="edit_mode">編集</b-radio>
        </div>
      </b-field>
      <b-field label="反転">
        <b-switch v-model="flip" />
      </b-field>
      <b-field label="デバッグモード">
        <b-switch v-model="inside_debug_mode" />
      </b-field>
      <b-field label="棋譜">
        <b-input v-model="kifu_source2" type="textarea" />
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-primary" @click="$parent.close()">閉じる</button>
    </footer>
  </div>
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
        this.$store.commit("inside_debug_mode_set", v)
        // 別に直接更新してもよい
        // this.$store.state.inside_debug_mode = v
      },
    },
  },
}
</script>
