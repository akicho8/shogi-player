const EVENT_LOGS_MAX = 200

import _ from "lodash"

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
    // レイヤー確認
    sp_layer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mut_debug:     this.sp_debug,
      mut_event_log: this.sp_event_log,
      mut_layer:     this.sp_layer,
      //
      event_logs: [],
    }
  },
  watch: {
    sp_debug(v)     { this.mut_debug = v     },
    sp_event_log(v) { this.mut_event_log = v },
    sp_layer(v)     { this.mut_layer = v     },
  },
  methods: {
    log(...v) {
      if (this.debug_or_development_p) {
        console.log(...v)
      }
    },
    event_call(key, ...args) {
      if (this.mut_event_log || process.env.NODE_ENV === "development") {
        this.event_log_print(key, args)
        this.event_logs = _.take([{key: key, time: Date.now(), args: args}, ...this.event_logs], EVENT_LOGS_MAX)
      }
      this.$emit(key, ...args)
    },
    event_log_print(method, args) {
      const group_key = `[SP] ${method}`
      console.group(group_key)
      console.log(...args)
      console.groupEnd(group_key)
    },
  },
  computed: {
    debug_p() { return this.mut_debug },
    debug_or_development_p() { return this.debug_p || process.env.NODE_ENV === "development" },
  },
}
