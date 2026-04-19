import JSON5 from "json5"

const PRESET_SELECT_THEN_APPLY = true // プリセットを選択したら自動的に適用するか？

export const mod_think_mark = {
  created() {
    // モードが切り替えられた(セットされた)ことで印が消さるため1フレーム後に実行する
    // いまのところ思考印は勝手に消さないのでこれは不要だが一応入れておく
    this.after_restore_hook.push(e => {
      this.$nextTick(() => this.think_mark_apply_handle())
    })
  },

  methods: {
    // 所有者の印だけ一括消去する
    think_mark_reject_handle() {
      this.$refs.sp_object.mut_think_mark_collection.gm_user_name_reject$(this.think_mark_user_name)
    },

    // 全消し
    think_mark_clear_handle() {
      this.$refs.sp_object.mut_think_mark_collection.clear$()
    },

    // プリセット反映
    think_mark_preset_apply_handle(think_mark_preset_info) {
      this.think_mark_collection_json_text = think_mark_preset_info.body.trim()
      if (PRESET_SELECT_THEN_APPLY) {
        this.think_mark_apply_handle()
      }
    },

    // 入力 JSON をネイティブ型に変換して適用する
    think_mark_apply_handle() {
      try {
        this.sp_think_mark_collection = JSON5.parse(this.think_mark_collection_json_text)
      } catch (e) {
        console.error(e)
      }
    },

    // セルをクリックしたとき
    ev_think_mark_click(think_mark_pos_key, event) {
      if (event.button === 0) {
        return
      }
      if (this.sp_mode === "view" || this.sp_mode === "edit") {
        return
      }
      this.event_puts(`思考印: ${think_mark_pos_key}`)
      const think_mark_attrs = this.think_mark_item_attributes(think_mark_pos_key)
      this.$refs.sp_object.mut_think_mark_collection.toggle$(think_mark_attrs)
    },

    // private

    think_mark_item_attributes(think_mark_pos_key) {
      return {
        gm_pos_key: think_mark_pos_key,
        gm_user_name: this.think_mark_user_name,
        gm_color_index: this.think_mark_color_index,
      }
    },
  },
}
