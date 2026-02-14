export class CssHelper {
  // 人間向けの見やすい形に変換する
  static pretty(body) {
    const replacement = "..."
    let s = body
    // s = s.replace(/\s*(\.Workspace|:root)\b.*/, "")
    // s = s.replace(/\s*[{}]\s*/, "")
    s = s.replace(/base64,[A-Za-z0-9+/=]+/, `base64,${replacement}`)
    return s.trim()
  }

  // style に埋めて問題ない形に変換する
  // 以前は "//" コメントを取っていたが、もとから /* */ スタイルで書けばいいのでここでは何もしていない
  static normalize(body) {
    return body
  }
}
