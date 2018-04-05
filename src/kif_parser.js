import XRegExp from "xregexp"
import assert from "minimalistic-assert"

import { ParserBase } from "./parser_base"
import { Piece } from "./piece"
import { Place } from "./place"
import { Location } from "./location"
import { SfenParser } from "./sfen_parser"

class KifParser extends ParserBase {
  get board() {
    const sfen_parser = new SfenParser()
    sfen_parser.kifu_body = "position startpos" // TODO: sfen形式の値のテーブルを持って駒落ちに対応する
    sfen_parser.parse()
    return sfen_parser.board
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

  parse() {
    this.move_infos = []
    this.comments_pack = {}
    let before_point = null

    this.kifu_body.split(/\n/).forEach((line) => {
      const md = XRegExp.exec(line, this.__kif_format_move_regexp)
      if (md) {
        const attrs = {}
        attrs["location"] = this.location_by_offset(Number(md["number"]) - 1)
        if (md["origin_place"]) {
          attrs["origin_place"] = Place.fetch(md["origin_place"])
        }
        assert(md["to"] || md["same"])
        if (md["to"]) {
          attrs["place"] = Place.fetch(md["to"])
          before_point = attrs["place"]
        } else {
          assert(md["same"])
          assert(before_point)
          attrs["place"] = before_point
        }
        if (md["motion"] === "成") {
          attrs["promoted_trigger"] = true
        }
        if (md["motion"] === "打") {
          attrs["drop_piece"] = Piece.kif_lookup(md["piece"])
        }
        this.move_infos.push(attrs)
      } else {
        const md = XRegExp.exec(line, XRegExp("^\\*(?<comment>.*)"))
        if (md) {
          const index = this.move_infos.length
          this.comments_pack[index] = this.comments_pack[index] || []
          this.comments_pack[index].push(md["comment"])
        }
      }
    })
  }

  set move_infos(v) {
    this._move_infos = v
  }

  get move_infos() {
    return this._move_infos || []
  }

  set comments_pack(v) {
    this._comments_pack = v
  }

  get comments_pack() {
    return this._comments_pack || []
  }

  get __kif_format_move_regexp() {
    return XRegExp(`
        ^\\s*(?<number>\\d+)\\s+
        (?<to>[１-９1-9一二三四五六七八九]{2})?
        (?<same>同)?\\s*
        (?<piece>成[銀桂香]|[王玉金銀全桂圭香杏角馬飛龍竜歩と])
        (?<suffix>[左右直]?[寄引上]?)
        (?<motion>不?成|打|合|生)?
        (\\((?<origin_place>\\d{2})\\))? # KIFフォーマットの移動元用
      `, 'xm')
  }
}

export { KifParser }

if (process.argv[1] === __filename) {
  const kif_parser = new KifParser()
//   kif_parser.kifu_body = `
// # ----  Kifu for Windows V6.26 棋譜ファイル  ----
// key：value
// 手数----指手---------消費時間--
// *コメント0a
// *コメント0b
//    1 ７六歩(77)   ( 0:00/00:00:00)
// *コメント1a
// *コメント1b
//    2 ３四歩(33)   ( 0:00/00:00:00)
//    3 投了         ( 0:00/00:00:00)
// `

  kif_parser.kifu_body = `
   1 ２六歩(27)   ( 0:16/00:00:16)
   2 ３四歩(33)   ( 0:22/00:00:22)
   3 ７六歩(77)   ( 0:06/00:00:22)
   4 ８四歩(83)   ( 0:13/00:00:35)
   5 ２五歩(26)   ( 0:09/00:00:31)
   6 ８五歩(84)   ( 0:16/00:00:51)
   7 ７八金(69)   ( 0:04/00:00:35)
   8 ３二金(41)   ( 0:09/00:01:00)
   9 ２四歩(25)   ( 0:04/00:00:39)
  10 同 歩(23)    ( 0:10/00:01:10)
`
  kif_parser.parse()
  // console.log(kif_parser.board)
  // console.log(kif_parser.location_base)
  // console.log(kif_parser.hold_pieces)
  console.log(kif_parser.move_infos)
  console.log(kif_parser.comments_pack)
  console.log(kif_parser.init_sfen === undefined)
}
