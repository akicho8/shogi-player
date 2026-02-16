export const mod_se_style = {
  computed: {
    // style 属性に設定するCSS変数たち
    se_component_style() {
      let av = []
      this.VariableInfo.values.forEach(e => {
        if (e.context_type === "se_css") {
          const str = e.as_string_of(this[e.key])
          if (str !== null) {
            const syntax = `--${e.key}: ${str};`
            av.push(syntax)
          }
        }
      })
      return av.join("")
    },

    // 確認用
    se_component_style_human() {
      let av = []
      av.push(".StyleEditor {\n")
      this.VariableInfo.values.forEach(e => {
        if (e.context_type === "se_css") {
          let str = e.as_string_of(this[e.key])
          if (!this.css_params_show_all_se) {
            if (str === e.default_value_as_str) {
              str = null
            }
          }
          if (str !== null) {
            const indent = "  "
            const syntax = `--${e.key}: ${str}`
            const comment = `/* ${e.name} */`
            const line = `${indent}${syntax}; ${comment}\n`
            av.push(line)
          }
        }
      })
      av.push("}\n")
      const text = av.join("")
      return this.CssHelper.pretty(text)
    },
  },
}
