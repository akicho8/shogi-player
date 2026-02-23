export const mod_component_params = {
  computed: {
    // class 属性に設定する変数たち
    // sidebar_p であれば "sidebar_p-true" また "sidebar_p-false" にしてクラスにする
    // こうしておけば sidebar_p で単語検索が効く
    se_component_class() {
      let av = []
      this.VariableInfo.values.forEach(e => {
        if (e.context_type === "se_class") {
          const value = this[e.key]
          if (value != null) {
            const key = [e.key, "-", value].join("")
            av.push(key)
          }
        }
      })
      return av
    },

    // style 属性に設定するCSS変数たち
    // ここが StyleEditor なので「デフォルト値ならスキップ」の処理はしてはいけない
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
      av.push(".StyleEditor {")
      this.VariableInfo.values.forEach(e => {
        if (e.context_type === "se_css") {
          let str = e.as_string_of(this[e.key])
          if (!this.css_params_show_all_se) {
            if (str === e.default_value_as_str) {
              str = null
            }
          }
          if (str !== null) {
            const indent = ""
            const syntax = `--${e.key}: ${str}`
            const comment = `/* ${e.name} */`
            const line = `${indent}${syntax}; ${comment}`
            av.push(line)
          }
        }
      })
      av.push("}")
      const text = av.join("\n")
      return this.CssHelper.pretty(text)
    },
  },
}
