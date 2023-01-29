// 常時盤上の升の大きさを持つ

const TARGET_SELECTOR = ".BoardField .PieceTap" // 左上のセル
const THRESHOLD       = 1.5                     // 指定ピクセル以上変化したら更新する(画面震え対策)

export const cell_size_module = {
  data() {
    return {
      sp_base_w: 1,
      sp_base_h: 1,
    }
  },
  mounted() {
    this.ro_start()
  },
  beforeDestroy() {
    this.ro_stop()
  },
  methods: {
    ro_start() {
      this.ro_stop()
      this.$ro = new ResizeObserver((entries, observer) => {
        entries.forEach(entry => {
          if (this.debug_p) {
            console.log(`ResizeObserver: [${entry.contentRect.width}, ${entry.contentRect.height}]`)
          }
          const w = entry.contentRect.width
          const h = entry.contentRect.height
          if (w > 0 && h > 0) {
            const dw = Math.abs(this.sp_base_w - w)
            const dh = Math.abs(this.sp_base_h - h)
            if (dw >= THRESHOLD || dh >= THRESHOLD) {
              this.sp_base_w = w
              this.sp_base_h = h
            }
          }
        })
      })
      const target_el = this.$el.querySelector(TARGET_SELECTOR)
      if (target_el == null) {
        console.error(`querySelector("${TARGET_SELECTOR}") が存在しない`)
        return
      }
      this.$ro.observe(target_el)
    },
    ro_stop() {
      if (this.$ro) {
        this.$ro.disconnect()
        this.$ro = null
      }
    },
  },
  computed: {
    css_variables_sp_base_wh() {
      return {
        "--sp_base_w": `${this.sp_base_w}px`,
        "--sp_base_h": `${this.sp_base_h}px`,
      }
    },
  },
}
