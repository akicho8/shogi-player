// ../../../bioshogi/lib/bioshogi/kanji_number.rb

import XRegExp from "xregexp"

// クラスして使ってない
export class KanjiNumber {
  // 100までで良いなら2にしとくと気持ち程度速くなる
  // 2なら百まで
  // 3なら千まで
  // 6なら兆まで
  static get unit_size() { return 6 }

  // 万(4)を超えたら「万」ではなく「一万」とする
  static get one_number_insert_level() { return 4 }

  static get KANJI_TABLE() { return "〇一二三四五六七八九" }
  static get UNIT_TABLE() { return "十百千万憶兆" }
  static get NUMBER_TABLE() { return "0123456789" }

  // static TRANSRATE_TABLE = {
  //   '〇': '0',
  //   '一': '1',
  //   '二': '2',
  //   '三': '3',
  //   '四': '4',
  //   '五': '5',
  //   '六': '6',
  //   '七': '7',
  //   '八': '8',
  //   '九': '9'
  // }
  static get TRANSRATE_TABLE() { return [...this.KANJI_TABLE].reduce((a, e, i) => ({...a, [e]: this.NUMBER_TABLE.charAt(i)}), {}) }

  // KanjiNumber.kanji_to_number_string("")         // => ""
  // KanjiNumber.kanji_to_number_string("歩")       // => "歩"
  // KanjiNumber.kanji_to_number_string("歩〇")     // => "歩0"
  // KanjiNumber.kanji_to_number_string("歩九")     // => "歩9"
  // KanjiNumber.kanji_to_number_string("歩十")     // => "歩10"
  // KanjiNumber.kanji_to_number_string("歩十〇")   // => "歩10"
  // KanjiNumber.kanji_to_number_string("歩十一")   // => "歩11"
  // KanjiNumber.kanji_to_number_string("歩十九")   // => "歩19"
  // KanjiNumber.kanji_to_number_string("歩二十")   // => "歩20"
  // KanjiNumber.kanji_to_number_string("歩二十〇") // => "歩20"
  // KanjiNumber.kanji_to_number_string("歩二十一") // => "歩21"
  //
  // https://qiita.com/alfa/items/24611f664949709f530d
  // http://d.hatena.ne.jp/rubikitch/20081201/1228142072
  static kanji_to_number_string(s) {
    // XRegExp.install('astral namespacing');
    // s = str.tr(this.KANJI_TABLE, "0-9")
    s = s.replace(new RegExp(`[${this.KANJI_TABLE}]`, "g"), e => this.TRANSRATE_TABLE[e])
    // https://xregexp.com/

    for (let i = 0; i < this.unit_size; i++) {
      const regex2 = XRegExp(`(?<number>\\d+)?(?<unit>[${this.UNIT_TABLE.charAt(i)}])(?<rest>\\d+)?`, "g")
      s = XRegExp.replace(s, regex2, e => {
        const v = Number(e.number ?? 1) * Math.pow(10, i + 1)
        return v + Number(e.rest ?? 0)
      })
    }
    return s
  }

  // KanjiNumber.number_to_kanji(0)                => "〇"
  // KanjiNumber.number_to_kanji(1)                => "一"
  // KanjiNumber.number_to_kanji(10)               => "十"
  // KanjiNumber.number_to_kanji(12)               => "十二"
  // KanjiNumber.number_to_kanji(2)                => "二"
  // KanjiNumber.number_to_kanji(23)               => "二十三"
  static number_to_kanji(v) {
    const out = []

    for (let x = this.unit_size; x >= 1; x--) {
      const s = this.UNIT_TABLE.charAt(x - 1)
      const d = Math.pow(10, x)
      const q = Math.trunc(v / d)
      const r = Math.trunc(v % d)
      if (q === 1) {
        if (x >= this.one_number_insert_level) {
          out.push(this.KANJI_TABLE.charAt(q) + s)
        } else {
          out.push(s)
        }
      } else if (q >= 2) {
        out.push(this.KANJI_TABLE.charAt(q) + s)
      }
      v = r
    }

    if (v === 0 && out.length === 0) {
      out.push(this.KANJI_TABLE.charAt(v))   // ここをはずせば 0 のとき表示しない。「零」などに変更も可
    } else if (v >= 1) {
      out.push(this.KANJI_TABLE.charAt(v))
    }

    return out.join("")
  }

  // 未使用

  static get regexp() {
    return XRegExp(`[${this.KANJI_TABLE}${this.UNIT_TABLE}]+`)
  }

  static extract(s) {
    const list = []
    XRegExp.forEach(s, this.regexp, e => {
      list.push(e[0])
    })
    return list
  }
}
