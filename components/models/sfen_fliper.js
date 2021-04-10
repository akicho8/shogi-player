import { SfenParser } from "./sfen_parser.js"
import { Mediator   } from "./mediator.js"

export class SfenFliper {
  static sfen_flip_h_from_sfen(sfen) {
    const source = SfenParser.parse(sfen)

    // 方法1. Mediator を仲介する方法
    // 一応動くけど Mediator まで出動する必要はない
    // もっと下位層のライブラリで行うべき
    if (false) {
      const mediator = new Mediator()
      mediator.data_source = source
      mediator.current_turn = 0
      mediator.run()
      mediator.board = mediator.board.flip_h

      const parts = []
      parts.push(mediator.to_position_sfen)

      const v = source.move_infos
      if (v.length >= 1) {
        parts.push("moves")
        parts.push(v.map(e => this.move_hash_flip_h_as_sfen(e)).join(" "))
      }

      return parts.join(" ")
    }

    // 方法2. SFENパーサーで読み取ってそのままSFEN出力する間で属性を変更する方法
    if (true) {
      source.attributes["board"] = source.board.flip_h.to_sfen
      source.attributes["moves"] = source.move_infos.map(e => this.move_hash_flip_h_as_sfen(e)).join(" ")
      return source.to_sfen
    }
  }

  // 複数の指し手の左右反転
  static moves_str_flip_h_from_moves_str(moves_str) {
    const v = SfenParser.move_hash_list_from_moves_str(moves_str)
    return v.map(e => this.move_hash_flip_h_as_sfen(e)).join(" ")
  }

  // 指し手1つの左右反転
  static move_str_flip_h_from_move_str(move_str) {
    const v = SfenParser.move_hash_from_move_str(move_str)
    if (v) {
      return this.move_hash_flip_h_as_sfen(v)
    }
  }

  // FIXME: move_hash はクラスにする
  //
  // 指し手をパースしたものを左右反転してSFENで返す
  //
  //  const move_attrs = SfenParser.move_hash_from_move_str("S*2d")
  //  SfenFliper.move_hash_flip_h_as_sfen(move_attrs) # => "S*8d"
  //
  //  反転とSFEN変換の2つのことをやっていて若干気持ちわるい
  //
  static move_hash_flip_h_as_sfen(move_hash) {
    const list = []
    if (move_hash["drop_piece"]) {
      list.push(move_hash["drop_piece"].key)
      list.push("*")
    } else {
      list.push(move_hash["origin_place"].flip_h.to_sfen)
    }
    list.push(move_hash["place"].flip_h.to_sfen)
    if (move_hash["promoted_trigger"]) {
      list.push("+")
    }
    return list.join("")
  }
}
