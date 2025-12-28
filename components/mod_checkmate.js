import _ from "lodash"
import { Beetleshine as GX } from "beetleshine"

// import { MoveInfo } from "./models/move_info.js"
// import { Place } from "./models/place.js"
// import { Board } from "./models/board.js"
// import { Soldier } from "./models/soldier.js"
// import { Location } from "./models/location.js"
// import { LiftCancelActionInfo } from "./models/lift_cancel_action_info.js"
// import { ClickResponseTimingInfo } from "./models/click_response_timing_info.js"

export const mod_checkmate = {
  props: {
    sp_request_checkmate_stat: { type: Boolean, default: false, },      // play で詰み判定するか？
  },

  data() {
    return {
      checkmate_stat: null,
    }
  },

  methods: {
    checkmate_init() {
      this.checkmate_stat = null
    },
    checkmate_block(fn) {
      if (this.sp_request_checkmate_stat) {
        if (this.play_p) {
          let value = null
          const ms = GX.benchmark_ms(() => { value = fn() })
          if (this.debug_or_development_p) {
            console.debug(`詰み判定処理時間: ${ms} ms`)
          }
          const yes_or_no = value ? "yes" : "no"
          this.checkmate_stat = {
            yes_or_no: yes_or_no, // 詰みか？
            elapsed_ms: ms,       // かかった時間
          }
        }
      }
    },
  },
}
