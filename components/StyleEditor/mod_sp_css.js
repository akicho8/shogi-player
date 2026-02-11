import { SeVariableInfo } from "./se_variable_info.js"
import { GX } from "../models/gx.js"

export const mod_sp_css = {
  computed: {
    sp_css_human() { return SeVariableInfo.css_to_human(this.sp_css_raw)  },
    sp_css_embed() { return SeVariableInfo.css_normalize(this.sp_css_raw) },

    sp_css_raw() {
      let out = []
      this.SeVariableInfo.values.forEach(e => {
        if (e.context_type === "sp_css") {
          let original_value = this[e.key]
          let str = e.as_string_of(original_value)

          if (this.css_params_show_all) {
          } else {
            if (str === e.default_value_as_str) {
              str = null
            }
          }

          if (str !== null) {
            const syntax = `--${e.key}: ${str};`
            const comment = `/* ${e.name} */`
            const line = `${syntax} ${comment}\n`
            out.push(line)
          }
        }
      })
      if (GX.blank_p(out)) {
        return ""
      }
      out = out.join("")
      return `.Workspace {\n${out}}\n`
    },
  },
}
