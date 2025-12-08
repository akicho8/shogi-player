import _ from "lodash"

// import { MoveInfo } from "./models/move_info.js"
// import { Place } from "./models/place.js"
// import { Board } from "./models/board.js"
// import { Soldier } from "./models/soldier.js"
// import { Location } from "./models/location.js"
// import { LiftCancelActionInfo } from "./models/lift_cancel_action_info.js"
// import { ClickResponseTimingInfo } from "./models/click_response_timing_info.js"

export const mod_checkmate = {
  props: {
    sp_checkmate_feature: { type: Boolean, default: false, },      // play で詰み判定するか？
  },

  data() {
    return {
      checkmate_stat: {
        elapsed_ms: null, // かかった時間
        yes_or_no: null,    // 詰みか？
      },
    }
  },

  methods: {
    checkmate_init() {
      this.checkmate_stat = {
        elapsed_ms: null,
        yes_or_no: null,
      }
    },
    checkmate_block(fn) {
      if (this.sp_checkmate_feature) {
        if (this.play_p) {
          const start = performance.now()
          if (fn()) {
            this.checkmate_stat.yes_or_no = "yes"
          }
          const end = performance.now()
          this.checkmate_stat.elapsed_ms = end - start
          if (this.debug_or_development_p) {
            console.debug(this.checkmate_stat.elapsed_ms)
          }
        }
      }
    },
  },
}
