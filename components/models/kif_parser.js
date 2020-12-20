import XRegExp from "xregexp"
import assert from "minimalistic-assert"

import ParserBase from "./parser_base.js"
import Piece from "./piece.js"
import Place from "./place.js"
import Location from "./location.js"
import SfenParser from "./sfen_parser.js"
import PresetInfo from "./preset_info.js"

const REGEXP_HEADER = "(?<key>.*)：(?<value>.*)"
const REGEXP_COMMENT = "^\\*(?<comment>.*)"
const REGEXP_HAND = `^\\s*(?<number>\\d+)\\s+                                # 1    ; 手数
                     (?<to>[１-９1-9一二三四五六七八九]{2})?                 # 76   ; 移動先
                     (?<same>同)?\\s*                                        # 同   ; 座標を書いてくれ
                     (?<piece>成[銀桂香]|[王玉金銀全桂圭香杏角馬飛龍竜歩と]) # 歩   ; 駒
                     (?<suffix>[左右直]?[寄引上]?)                           # 上   ; KI2っぽい表記
                     (?<motion>不?成|打|合|生)?                              # 打   ; 成や打
                     (\\((?<origin_place>\\d{2})\\))?                        # (77) ; 移動元`

const REGEXP_ALL = XRegExp([REGEXP_HEADER, REGEXP_COMMENT, REGEXP_HAND].join("|"), "x")

export default class KifParser extends ParserBase {
  get board() {
    const sfen_parser = new SfenParser()
    sfen_parser.kifu_body = this.preset_info.sfen
    sfen_parser.parse()
    return sfen_parser.board
  }

  get preset_key() {
    return this.header["手合割"] || "平手"
  }

  get preset_info() {
    return PresetInfo.fetch(this.preset_key)
  }

  // 特別なメソッド
  get location_base() {
    return Location.fetch(this.preset_info.first_location_key)
  }

  parse() {
    this.move_infos = []
    this.comments_pack = {}

    let before_place = null

    this.kifu_body.split(/\n/).forEach(line => {
      const md = XRegExp.exec(line, REGEXP_ALL)
      if (md) {
        if (md["key"]) {
          this.header[md["key"]] = md["value"]
        } else if (md["comment"]) {
          const i = this.move_infos.length
          this.comments_pack[i] = this.comments_pack[i] || []
          this.comments_pack[i].push(md["comment"])
        } else if (md["number"]) {
          const attrs = {}
          attrs["location"] = this.location_by_offset(Number(md["number"]) - 1)
          if (md["origin_place"]) {
            attrs["origin_place"] = Place.fetch(md["origin_place"])
          }
          assert(md["to"] || md["same"])
          if (md["to"]) {
            attrs["place"] = Place.fetch(md["to"])
            before_place = attrs["place"]
          } else {
            assert(md["same"])
            assert(before_place)
            attrs["place"] = before_place
          }
          if (md["motion"] === "成") {
            attrs["promoted_trigger"] = true
          }
          if (md["motion"] === "打") {
            attrs["drop_piece"] = Piece.kif_lookup(md["piece"])
          }
          this.move_infos.push(attrs)
        }
      }
    })
  }

  set move_infos(v) {
    this._move_infos = v
  }

  get move_infos() {
    return this._move_infos
  }

  set comments_pack(v) {
    this._comments_pack = v
  }

  get comments_pack() {
    return this._comments_pack
  }
}

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
