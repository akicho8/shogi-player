import { GX } from "../models/gx.js"

export const mod_autorun = {
  mounted() {
    this.autorun({key: "initial_action"})
  },

  methods: {
    autorun(options = {}) {
      options = {
        key: "autorun",
        next_tick: false,
        sleep: null,
        ...options,
      }

      const callback = () => {
        const str = this.$route.query[options.key]
        if (str) {
          str.split(/[,\s]+/).forEach(e => {
            const func = this[e]
            GX.assert(func, `存在しないメソッドです : ${e}`)
            func()
          })
        }
      }

      if (options.next_tick) {
        this.$nextTick(callback)
      } else if (options.sleep) {
        setTimeout(callback, options.sleep * 1000)
      } else {
        callback()
      }
    },
  },
}
