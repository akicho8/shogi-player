import XRegExp from "xregexp"
import assert from "minimalistic-assert"

import { ParserBase } from "./parser_base.js"
import { Board      } from "./board.js"
import { Piece } from "./piece.js"
import { Place } from "./place.js"
import { Location } from "./location.js"
import { SfenParser } from "./sfen_parser.js"
import { PresetInfo } from "./preset_info.js"
import { Soldier    } from "./soldier.js"
import { KanjiNumber    } from "./kanji_number.js"

////////////////////////////////////////////////////////////////////////////////

const REGEXP = {
  header: "(?<key>.*)：\s*(?<value>.*)",                         // key：val
  board:  "\\|(?<board>.*)\\|",                                  // | 香 桂 銀 金 玉 金 銀 桂 香|九
  direct_location: "(?<direct_location>^[上下先後]手番)",        // 上手番
  latest_triangle: "^手数＝.*(?<latest_triangle>[▲△])",               // 手数＝24 △５四歩 まで (TODO: 最終手を活用する)
  comment: "^\\*(?<comment>.*)",                                 // *コメント
  hand: `^\\s*(?<number>\\d+)\\s+                                # 1    ; 手数
         (?<to>[１-９1-9一二三四五六七八九]+)?                   # 76   ; 移動先
         (?<same>同)?\\s*                                        # 同   ; 座標を書いてくれ
         (?<piece>成[銀桂香]|[王玉金銀全桂圭香杏角馬飛龍竜歩と]) # 歩   ; 駒
         (?<suffix>[左右直]?[寄引上]?)                           # 上   ; KI2っぽい表記は読み捨てる
         (?<motion>不?成|打|合|生)?                              # 打   ; 成や打
         (\\((?<origin_place>\\d+)\\))?                          # (77) ; 移動元`,
}

// XRegExp.union はバグっていて ?<key> を外される
const MERGED_REGEXP = XRegExp(Object.values(REGEXP).join("|"), "x")

////////////////////////////////////////////////////////////////////////////////

export class KifParser extends ParserBase {
  reset() {
    super.reset()
    this.move_infos = []
    this.comments_pack = {}
    this.board_lines = []                            // 盤面が1行ごと入る(内部用)
    this.direct_location = null                      // 手番の指定があればそのキー
    this.hold_pieces = this.hold_pieces_empty_hash() // 持駒個数
  }

  get board() {
    if (this.board_lines.length >= 1) {
      return this.board_setup_from_board_lines()
    } else {
      // FIXME: KIFがSFENに依存してんのおかしいだろ
      const sfen_parser = new SfenParser()
      sfen_parser.raw_body = this.preset_info.sfen
      sfen_parser.parse()
      return sfen_parser.board
    }
  }

  get preset_key() {
    const v = this.header["手合割"]
    if (v === "その他") {
      return null
    } else {
      return v || "平手"
    }
  }

  get preset_info() {
    return PresetInfo.lookup(this.preset_key)
  }

  // 特別なメソッド
  get base_location() {
    if (this.direct_location) {
      // 「上手番」
      return this.direct_location
    } else if (this.preset_key) {
      // 「手合割：角落ち」
      return Location.fetch(this.preset_info.first_location_key)
    } else {
      // 「手合割：その他」
      return Location.fetch("black")
    }
  }

  parse() {
    let before_place = null

    // 巨大な正規表現でまるごと切り分ける
    this.raw_body.split(/\n/).forEach(line => {
      const m = XRegExp.exec(line, MERGED_REGEXP)
      if (m) {
        if (m.key) {
          // ヘッダー部分
          const value = m.value.trim()
          this.header[m.key] = value
          if (m.key.match(/手の持駒/)) {
            if (value === "なし") {
            } else {
              let s = KanjiNumber.kanji_to_number_string(value)
              s = s.replace(/\s+/g, "")
              XRegExp.forEach(s, XRegExp("(?<piece_char>\\D)(?<count>\\d*)"), (m2, x) => {
                const piece = Piece.lookup_by_name(m2.piece_char)
                let count = Number(m2.count || 1)
                const location_key = m.key.match(/[上後]/) ? "white" : "black"
                count += this.hold_pieces[location_key][piece.key] || 0
                this.hold_pieces[location_key][piece.key] = count
              })
            }
          }
        } else if (m["comment"]) {
          // コメント部分
          const i = this.move_infos.length
          this.comments_pack[i] = this.comments_pack[i] || []
          this.comments_pack[i].push(m["comment"])
        } else if (m["board"]) {
          // 盤
          this.board_lines.push(m["board"])
        } else if (m["direct_location"]) {
          // BODにある "○手番"
          this.direct_location = Location.fetch(m["direct_location"].match(/[上後]/) ? "white" : "black")
        } else if (m["latest_triangle"]) {
          // BODにある "手数＝24 △５四歩 まで"
          this.direct_location = Location.fetch(m["latest_triangle"] === "▲" ? "white" : "black")
        } else if (m["number"]) {
          // 棋譜部分
          const attrs = {}
          attrs["location"] = this.location_by_offset(Number(m["number"]) - 1)
          if (m["origin_place"]) {
            attrs["origin_place"] = Place.fetch(m["origin_place"])
          }
          assert(m["to"] || m["same"])
          if (m["to"]) {
            attrs["place"] = Place.fetch(m["to"])
            before_place = attrs["place"]
          } else {
            assert(m["same"])
            assert(before_place)
            attrs["place"] = before_place
          }
          if (m["motion"] === "成") {
            attrs["promoted_trigger"] = true
          }
          if (m["motion"] === "打") {
            attrs["drop_piece"] = Piece.lookup_by_name(m["piece"])
          }
          this.move_infos.push(attrs)
        } else {
          // # で始まる行
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

  // private

  board_setup_from_board_lines() {
    assert(this.board_lines.length >= 1)
    const board = new Board()
    this.board_lines.forEach((e, y) => {
      XRegExp.forEach(e, XRegExp("(?<arrow>.)(?<piece>\\S)"), (m, x) => {
        if (m.piece === "・") {
        } else {
          const location_key = m.arrow === "v" ? "white" : "black"
          let piece = Piece.lookup_by_name(m.piece)
          let promoted = false
          if (!piece) {
            piece = Piece.lookup_by_promoted_name(m.piece)
            assert(piece)
            promoted = true
          }
          const soldier = new Soldier({
            place: new Place([x, y]),
            piece: piece,
            promoted: promoted,
            location: Location.fetch(location_key),
          })
          board.place_on(soldier)
        }
      })
    })
    return board
  }
}

if (process.argv[1] === __filename) {
  const instance = new KifParser()
  //   instance.raw_body = `
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

  instance.raw_body = `
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
  instance.parse()
  // console.log(instance.board)
  // console.log(instance.base_location)
  // console.log(instance.hold_pieces)
  console.log(instance.move_infos)
  console.log(instance.comments_pack)
  console.log(instance.init_sfen === undefined)
}
