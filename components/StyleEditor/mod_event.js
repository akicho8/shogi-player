import _ from "lodash"
import { GX } from "../models/gx.js"

export const mod_event = {
  methods: {
    event_puts(str) {
      if (!this.event_show_p) {
        return
      }
      this.$buefy.toast.open({message: str, queue: false})
    },

    ev_play_mode_move(e) {
      // 挙動
      this.event_puts(`挙動: ${e.last_move_info.type}`)

      // 反則
      e.illegal_hv_list.forEach(e => {
        this.event_puts(`反則: ${e.illegal_info.name}`)
      })

      // 局面ハッシュ
      if (e.position_hash) {
        this.event_puts(`局面ハッシュ: ${e.position_hash}`)
      }

      // 指し手
      this.event_puts(`${e.last_move_info.to_kif}`)

      // 王手
      if (e.op_king_check) {
        this.event_puts(`王手`)
      }

      // 詰み
      if (e.checkmate_stat) {
        if (e.checkmate_stat.yes_or_no === "yes") {
          this.event_puts(`詰み (${e.checkmate_stat.elapsed_ms} ms)`)
        }
      }

      // 移動元
      if (e.general_mark_pos_key) {
        this.event_puts(`移動元: ${e.general_mark_pos_key}`)
      }
    },

    ev_illegal_illegal_accident(illegal_hv) {
      this.event_puts(`反則ブロック: ${illegal_hv.illegal_info.name}`)
    },
  },
}
