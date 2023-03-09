import chroma from "chroma-js"

export const mod_helper = {
  methods: {
    // 人間向けの見やすい形に変換する
    css_to_human(css_body) {
      let s = css_body
      s = s.replace(/url\(.*\)/g, "url(...)")
      s = s.replace(/\s*.Workspace.*\n/, "")
      s = s.replace(/\s}\s*\n/, "")
      s = s.replace(/;/g, "")
      s = s.replace(/^ +/mg, "")
      s = s.replace(/:\s*/g, ": ")
      return s.trim()
    },

    // style に埋めて問題ない形に変換する
    // 以前は "//" コメントを取っていたが、もとから /* */ スタイルで書けばいいのでここでは何もしていない
    css_normalize(css_body) {
      let s = css_body
      return s
    },

    hsla_format(v) {
      return chroma(v).css("hsla")
    },
  },
}
