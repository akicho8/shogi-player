import _ from "lodash"
import { GX } from "../models/gx.js"

export const mod_event = {
  methods: {
    ev_play_mode_move(e) {
      // 挙動
      console.log(e.last_move_info.type)

      // 反則
      e.illegal_hv_list.forEach(e => {
        this.$buefy.toast.open({message: `反則: ${e.illegal_info.name}`, queue: false})
      })

      // 局面ハッシュ
      if (e.snapshot_hash) {
        this.$buefy.toast.open({message: `局面ハッシュ: ${e.snapshot_hash}`, queue: false})
      }

      // 指し手
      this.$buefy.toast.open({message: `${e.last_move_info.to_kif}`, queue: false})

      // 王手
      if (e.op_king_check) {
        this.$buefy.toast.open({message: "王手", queue: false})
      }

      // 詰み
      if (e.checkmate_stat) {
        if (e.checkmate_stat.yes_or_no === "yes") {
          console.log(e.checkmate_stat.elapsed_ms)
          this.$buefy.toast.open({message: "詰み", queue: false})
        }
      }
    },

    ev_illegal_illegal_accident(illegal_hv) {
      this.$buefy.toast.open({message: `反則ブロック: ${illegal_hv.illegal_info.name}`, queue: false})
    },
  },
}
