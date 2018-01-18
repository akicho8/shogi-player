import XRegExp from "xregexp"

import { ParserBase } from "./parser_base"
import { Piece } from "./piece"
import { Point } from "./point"
import { Location } from "./location"
import { SfenParser } from "./sfen_parser"

class KifParser extends ParserBase {
  get field() {
    const sfen_parser = new SfenParser()
    sfen_parser.kifu_body = "position startpos" // TODO: sfen形式の値のテーブルを持って駒落ちに対応する
    sfen_parser.parse()
    return sfen_parser.field
  }

  get location_base() {
    let key = null
    const value = this.header["手合割"] || "平手"
    if (value === "平手") {
      key = "black"
    } else {
      key = "white"
    }
    return Location.fetch(key)
  }

  get move_infos() {
    const regexp = XRegExp(`
        ^\\s*(?<number>\\d+)\\s+
        (?<to>[１-９1-9一二三四五六七八九]{2})?
        (?<same>同)?
        (?<piece>成[銀桂香]|[王玉金銀全桂圭香杏角馬飛龍竜歩と])
        (?<suffix>[左右直]?[寄引上]?)
        (?<motion>不?成|打|合|生)?
        (\\((?<origin_point>\\d{2})\\))? # KIFフォーマットの移動元用
      `, 'xm')

    const list = []
    XRegExp.forEach(this.kifu_body, regexp, (md, i) => {
      const attrs = {}
      attrs["location"] = this.location_by_offset(i)
      if (md["origin_point"]) {
        attrs["origin_point"] = Point.fetch(md["origin_point"])
      }
      if (md["to"]) {
        attrs["point"] = Point.fetch(md["to"])
      }
      if (md["motion"] === "成") {
        attrs["promoted_trigger"] = true
      }
      if (md["motion"] === "打") {
        attrs["stroke_piece"] = Piece.kif_lookup(md["piece"])
      }

      list.push(attrs)
    })
    return list
  }
}

export { KifParser }

if (process.argv[1] === __filename) {
  const kif_parser = new KifParser()
  kif_parser.kifu_body = `
# ----  Kifu for Windows V6.26 棋譜ファイル  ----
key：value
手数----指手---------消費時間--
*コメント0
   1 ７六歩(77)   ( 0:00/00:00:00)
   2 投了         ( 0:00/00:00:00)
変化：1手
   1 ２六歩(25)   ( 0:00/00:00:00)
`
  kif_parser.parse()
  console.log(kif_parser.field)
  console.log(kif_parser.location_base)
  console.log(kif_parser.hold_pieces)
  console.log(kif_parser.move_infos)
}
