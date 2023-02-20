// 盤とセルの大きさ監視する

import { ResizeTargetInfo } from "./models/resize_target_info.js"

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
    ro_start() {
      this.ro_stop()
      this.$ro = new ResizeObserver((entries, observer) => {
        entries.forEach(entry => {
          // 同じIDのものが連続してentriesに入ってくるのも考慮して途中ではあえてbreakしていない
          ResizeTargetInfo.values.forEach(e => this.ro_read(e, entry))
        })
      })
      ResizeTargetInfo.values.forEach(e => this.ro_observe(e))
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
      }
    },
    // リサイズの情報を読み取る
    ro_read(e, entry) {
      if (entry.target.dataset["resize_observer_id"] === e.key) {
        const w = entry.contentRect.width
        const h = entry.contentRect.height
        if (w > 0 && h > 0) {
          const dw = Math.abs(this[e.attr_w] - w)
          const dh = Math.abs(this[e.attr_h] - h)
          const update = dw > e.threshold || dh > e.threshold
          if (update) {
            this[e.attr_w] = w
            this[e.attr_h] = h
          }
          if (this.debug_or_development_p) {
            this.log(`ResizeObserver[${e.key}] ${w} ${h} ${update ? 'update' : 'skip'}`)
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
