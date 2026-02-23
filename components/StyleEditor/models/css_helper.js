export class CssHelper {
  // 人間向けの見やすい形に変換する
  static pretty(body) {
    const replacement = "..."
    let s = body
    s = s.replace(/base64,[A-Za-z0-9+/=]+/, `base64,${replacement}`)
    return s.trim()
  }

  // style に埋めて問題ない形に変換する
  // 以前は "//" コメントを取っていたが、もとから /* */ スタイルで書けばいいのでここでは何もしていない
  static normalize(body) {
    return body.trim()
  }

  static svg_to_user_css(body) {
    let s = body
    s = s.trim()
    // s = s.replace(/\//g, "%2f")    // hsl(a b c / d) のスラッシュをエスケープする
    s = s.replace(/\#/g, "%23")    // #rgb の # をエスケープする
    s = s.replace(/\n/g, " \\\n")  // 改行をスラッシュで維持する
    const content = `data:image/svg+xml;utf8,\\\n${s}\\\n`
    const syntax  = `--sp_board_image: url('${content}');`
    return `.ShogiPlayer {\n ${syntax}\n}`
  }
}
