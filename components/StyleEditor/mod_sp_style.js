import { GX } from "../models/gx.js"

export const mod_sp_style = {
  computed: {
    sp_css_human() { return this.CssHelper.pretty(this.sp_css_raw)    },
    sp_css_embed() { return this.CssHelper.normalize(this.sp_css_raw) },

    sp_css_raw() {
      let out = []
      out.push(".ShogiPlayer {")
      this.VariableInfo.values.forEach(e => {
        if (e.context_type === "sp_css") {
          let original_value = this[e.key]
          let str = e.as_string_of(original_value)
          if (!this.css_params_show_all_sp) {
            if (str === e.default_value_as_str) {
              str = null
            }
          }
          if (str !== null) {
            const indent = "  "
            const syntax = `--${e.key}: ${str}`
            const comment = `/* ${e.name} */`
            const line = `${indent}${syntax}; ${comment}`
            out.push(line)
          }
        }
      })
      out.push("}")
      return out.join("\n")
    },
  },
}
