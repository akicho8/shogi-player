import { AnyFuncInfo } from "./models/any_func_info.js"
import { Board } from "./models/board.js"

export const any_func_module = {
  data() {
    return {
      any_func_key: null, // 常に選択してないことにしたくて v-model にして設定して any_func_key 変更のタイミングで null に再設定したけど選択してないことにはできなかったのでこれ意味ない
    }
  },

  methods: {
    any_func_click_handle(any_func_info) {
      any_func_info.func(this)
    },

    shuffle_dialog_open() {
      this.shuffle_mode_p = false // 数字が入力できないため OFF にする

      this.$buefy.dialog.prompt({
        message: "寸法の一辺のサイズを指定してください",
        confirmText: "実行",
        cancelText: "キャンセル",
        inputAttrs: { type: "number", value: 4, min: 1, max: Board.dimension, },
        trapFocus: true,
        onConfirm: e => this.shuffle_run(e),
      })
    },

    shuffle_run(size) {
      size = parseInt(size)
      if (!this.mediator.shuffle_apply(size)) {
        this.$buefy.toast.open({message: `${size} x ${size} が盤上の駒の数より少ないため何もしませんでした`, position: "is-bottom", queue: false, duration: 1000 * 2.0, type: "is-warning"})
      }
    },
  },

  computed: {
    AnyFuncInfo() { return AnyFuncInfo },
  },
}
