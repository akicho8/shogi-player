// 盤とセルの大きさ監視する

import { ResizeTargetInfo } from "./models/resize_target_info.js"
import _ from "lodash"

const REQUEST_ANIMATION_FRAME_WRAP = true       // requestAnimationFrame でラップするか？
const DEBOUNCE_WRAP                = false      // debounce で処理を保留するか？
const DEBOUNCE_MS                  = 1000 / 20  // debounce で処理を保留する時間(ms)

export const mod_resize_observer = {
  data() {
    return {
      sp_board_w: 1,
      sp_board_h: 1,

      sp_cell_w: 1,
      sp_cell_h: 1,
    }
  },
  mounted() {
    this.ro_start()
  },
  beforeDestroy() {
    this.ro_stop()
  },
  methods: {
    // 監視開始
    // https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
    // https://stackoverflow.com/a/58701523/9944769
    ro_start() {
      this.log(`ResizeObserver: requestAnimationFrame ${REQUEST_ANIMATION_FRAME_WRAP ? 'ON' : 'OFF'}`)
      this.log(`ResizeObserver: debounce(callback, ${DEBOUNCE_MS}) ${DEBOUNCE_WRAP ? 'ON' : 'OFF'}`)

      this.ro_stop()

      const callback = (entries, observer) => {
        if (REQUEST_ANIMATION_FRAME_WRAP) {
          this.$animation_frame_id = requestAnimationFrame(() => this.ro_entries_each_call(entries))
          this.log(`ResizeObserver: requestAnimationFrameの戻値=${this.$animation_frame_id}`)
        } else {
          this.ro_entries_each_call(entries)
        }
      }

      let ro_callback = null
      if (DEBOUNCE_WRAP) {
        ro_callback = _.debounce(callback, DEBOUNCE_MS)
      } else {
        ro_callback = callback
      }

      this.$ro = new ResizeObserver(ro_callback)
      ResizeTargetInfo.values.forEach(e => this.ro_observe(e))
    },

    ro_entries_each_call(entries) {
      this.log(`ResizeObserver: ro_entries_each_call entries.length=${entries.length}`)
      entries.forEach(entry => {
        // 同じIDのものが連続してentriesに入ってくるのも考慮して途中ではあえてbreakしていない
        ResizeTargetInfo.values.forEach(e => this.ro_read(e, entry))
      })
    },

    // 監視対象を登録する
    ro_observe(info) {
      const el = this.$el.querySelector(info.selector)
      if (el == null) {
        alert(`querySelector("${info.selector}") is blank`)
      }
      this.$ro.observe(el)
    },
    // 監視停止
    ro_stop() {
      if (this.$ro) {
        this.$ro.disconnect()
        this.$ro = null

        if (this.$animation_frame_id != null) {
          cancelAnimationFrame(this.$animation_frame_id)
          this.$animation_frame_id = null
        }
      }
    },
    // リサイズの情報を読み取る
    ro_read(e, entry) {
      if (entry.target.dataset["resize_observer_id"] === e.key) {
        const w = entry.contentRect.width
        const h = entry.contentRect.height
        if (w > 0 && h > 0) {
          const bw = this[e.attr_w]
          const bh = this[e.attr_h]
          const dw = Math.abs(bw - w)
          const dh = Math.abs(bh - h)
          const update = dw > e.threshold || dh > e.threshold
          if (update) {
            this[e.attr_w] = w
            this[e.attr_h] = h
          }
          if (this.debug_or_development_p) {
            this.log(`ResizeObserver[${e.key}] ${bw}x${bh} -> ${w}x${h} ${update ? '(update)' : '(skip)'}`)
          }
        }
      }
    },

  },
  computed: {
    // CSS変数化
    ro_css_variables_hash() {
      return {
        "--sp_board_w": `${this.sp_board_w}px`,
        "--sp_board_h": `${this.sp_board_h}px`,

        "--sp_cell_w": `${this.sp_cell_w}px`,
        "--sp_cell_h": `${this.sp_cell_h}px`,
      }
    },
  },
}
