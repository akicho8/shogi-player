import JSON5 from "json5"

const PRESET_SELECT_THEN_APPLY = true // プリセットを選択したら自動的に適用するか？

export const mod_origin_mark = {
  created() {
    this.after_restore_hook.push(e => {
      this.$nextTick(() => this.origin_mark_apply_handle()) // モードが切り替えられた(セットされた)ことで印が消さるため1フレーム後に実行する
    })
  },

  mounted() {
    if (false) {
      this.origin_mark_collection_json_text = `[
  { gm_pos_key: "7_6", gm_user_name: "alice", gm_color_index: 0 },
]`
    }
  },
  methods: {
    // プリセット反映
    origin_mark_preset_apply_handle(origin_mark_preset_info) {
      this.origin_mark_collection_json_text = origin_mark_preset_info.body.trim()
      if (PRESET_SELECT_THEN_APPLY) {
        this.origin_mark_apply_handle()
      }
    },

    // 入力 JSON をネイティブ型に変換して適用する
    origin_mark_apply_handle() {
      try {
        this.sp_origin_mark_collection = JSON5.parse(this.origin_mark_collection_json_text)
      } catch (e) {
        console.error(e)
      }
    },

    ev_action_origin_mark_jump_invoke(origin_mark_pos_key, ev) {
      this.event_puts(`持ち上げ: ${origin_mark_pos_key}`)
      const attributes = this.origin_mark_item_attributes(origin_mark_pos_key)
      this.$refs.sp_object.mut_origin_mark_collection.push$(attributes)
    },

    ev_action_origin_mark_jump_cancel(origin_mark_pos_key, ev) {
      this.event_puts(`持ち下げ: ${origin_mark_pos_key}`)
      const attributes = this.origin_mark_item_attributes(origin_mark_pos_key)
      this.$refs.sp_object.mut_origin_mark_collection.remove$(attributes)
    },

    origin_mark_item_attributes(origin_mark_pos_key) {
      return {
        gm_pos_key: origin_mark_pos_key,
        gm_user_name: this.se_current_user_name,
        gm_color_index: this.se_current_color_index,
      }
    },
  },
}
