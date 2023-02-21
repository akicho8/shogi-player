import { EditToolInfo } from "./models/edit_tool_info.js"
import { Board } from "./models/board.js"

export const mod_edit_tool = {
  data() {
    return {
      edit_tool_key: null, // 常に選択してないことにしたくて v-model にして設定して edit_tool_key 変更のタイミングで null に再設定したけど選択してないことにはできなかったのでこれ意味ない
    }
  },

  methods: {
    edit_tool_click_handle(edit_tool_info) {
      edit_tool_info.func(this)
    },

    shuffle_dialog_open_handle() {
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
      if (!this.xcontainer.shuffle_apply(size)) {
        this.$buefy.toast.open({
          message: `${size} x ${size} が盤上の駒の数より少ないため何もしませんでした`,
          position: "is-bottom",
          queue: false,
          duration: 1000 * 2.0,
          type: "is-warning",
        })
      }
    },
  },

  computed: {
    EditToolInfo() { return EditToolInfo },
  },
}
