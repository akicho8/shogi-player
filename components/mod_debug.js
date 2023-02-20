export const mod_debug = {
  props: {
    // デバッグモード
    sp_debug: {
      type: Boolean,
      default: false,
    },
    // イベントログ
    sp_event_log: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      new_debug: this.sp_debug,
      new_event_log: this.sp_event_log,
    }
  },
  watch: {
    sp_debug(v)  { this.new_debug = v               }, // 外 -> 内
    new_debug(v) { this.event_call("update:sp_debug", v) }, // 内 -> 外

    sp_event_log(v)  { this.new_event_log = v                 }, // 外 -> 内
    new_event_log(v) { this.event_call("update:sp_event_log", v)   }, // 内 -> 外
  },
  methods: {
    log(...v) {
      if (this.debug_or_development_p) {
        console.log(...v)
      }
    },
    event_call(name, ...args) {
      if (this.new_event_log || process.env.NODE_ENV === "development") {
        this.event_log_print(name, args)
      }
      this.$emit(name, ...args)
    },
    event_log_print(method, args) {
      const group_key = `[SP] ${method}`
      console.group(group_key)
      console.log(...args)
      console.groupEnd(group_key)
    },
  },
  computed: {
    debug_p() { return this.new_debug },
    debug_or_development_p() { return this.debug_p || process.env.NODE_ENV === "development" },
  },
}
