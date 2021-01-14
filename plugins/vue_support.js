// 汎用コード

import Autolinker from "autolinker"

export default {
  methods: {
    // ../../../node_modules/autolinker/README.md
    auto_link(str, options = {}) {
      return Autolinker.link(str, {newWindow: true, truncate: 30, mention: "twitter", ...options})
    },

    debug_alert(message) {
      if (this.development_p) {
        if (message != null) {
          this.$buefy.toast.open({message: message.toString(), position: "is-bottom", type: "is-danger", duration: 1000 * 1.0, queue: false})
        }
      }
    },

    clog(...args) {
      if (this.development_p) {
        console.log(...args)
      }
    },

    __assert__(value, message = null) {
      if (!value) {
        console.error(value)
        alert(message || "ぶっこわれました")
        debugger
      }
    },

    __assert_equal__(expected, actual, message = null) {
      if (actual !== expected) {
        console.error(`<${expected}> expected but was <${actual}>`)
        alert(message || "ぶっこわれました")
        debugger
      }
    },
  },
}
