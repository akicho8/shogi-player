// 盤とセルの大きさ監視する

import { ResizeTargetInfo } from "./models/resize_target_info.js"
import _ from "lodash"

const REQUEST_ANIMATION_FRAME_WRAP = true          // requestAnimationFrame でラップするか？
const DEBOUNCE_WRAP                = false         // debounce で処理を保留するか？
const DEBOUNCE_MS                  = 17 * 1        // debounce で処理を保留する時間(ms)
const CAST_INTEGER                 = true          // 小数だとぷるぷるするので整数にする？

export const mod_resize_observer = {
  props: {
    // ドキュメント非公開
    sp_resize_observer_feature: {
      type: Boolean,
      default: true,
    },
    sp_resize_observer_threshold: {
      type: Number,
      default: 2,
      validator(value) { return Number.isInteger(value) },
    },
  },

  data() {
    return {
      sp_board_entire_current_w: 1,
      sp_board_entire_current_h: 1,

      sp_board_cell_current_w: 1,
      sp_board_cell_current_h: 1,
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
        this.$pending_entries = entries
        if (REQUEST_ANIMATION_FRAME_WRAP) {
          this.ro_animation_frame_cancel()
          this.$animation_frame_id = requestAnimationFrame(() => {
            this.$animation_frame_id = null
            this.ro_entries_each_call(this.$pending_entries)
          })
          this.log(`ResizeObserver: requestAnimationFrameの戻値=${this.$animation_frame_id}`)
        } else {
          this.ro_entries_each_call(this.$pending_entries)
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

    ro_animation_frame_cancel() {
      if (this.$animation_frame_id != null) {
        cancelAnimationFrame(this.$animation_frame_id)
        this.$animation_frame_id = null
      }
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
        this.ro_animation_frame_cancel()
      }
    },
    // リサイズの情報を読み取る
    ro_read(e, entry) {
      if (!this.sp_resize_observer_feature) {
        return
      }
      if (entry.target.dataset["resize_observer_id"] === e.key) {
        let w = entry.contentRect.width
        let h = entry.contentRect.height
        if (CAST_INTEGER) {
          w = Math.floor(w)
          h = Math.floor(h)
        }
        if (w > 0 && h > 0) {
          const bw = this[e.attr_w]
          const bh = this[e.attr_h]
          const dw = Math.abs(bw - w)
          const dh = Math.abs(bh - h)
          const update = dw >= this.sp_resize_observer_threshold || dh >= this.sp_resize_observer_threshold
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
        "--sp_board_entire_current_w": `${this.sp_board_entire_current_w}px`,
        "--sp_board_entire_current_h": `${this.sp_board_entire_current_h}px`,
        "--sp_board_cell_current_w": `${this.sp_board_cell_current_w}px`,
        "--sp_board_cell_current_h": `${this.sp_board_cell_current_h}px`,
      }
    },
  },
}
