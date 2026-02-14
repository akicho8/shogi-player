import { GX } from "../models/gx.js"

export const mod_sp_css = {
  computed: {
    sp_css_human() { return this.CssHelper.pretty(this.sp_css_raw)  },
    sp_css_embed() { return this.CssHelper.normalize(this.sp_css_raw) },

    sp_css_raw() {
      let out = []
      out.push(".ShogiPlayer {\n")
      this.VariableInfo.values.forEach(e => {
        if (e.context_type === "sp_css") {
          let original_value = this[e.key]
          let str = e.as_string_of(original_value)
          if (!this.css_params_show_all) {
            if (str === e.default_value_as_str) {
              str = null
            }
          }
          if (str !== null) {
            const indent = "  "
            const syntax = `--${e.key}: ${str}`
            const comment = `/* ${e.name} */`
            const line = `${indent}${syntax}; ${comment}\n`
            out.push(line)
          }
        }
      })
      out.push("}\n")
      return out.join("")
    },
  },
}
