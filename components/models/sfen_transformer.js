import { SfenParser } from "./sfen_parser.js"

export class SfenTransformer {
  static flop(sfen) {
    const e = SfenParser.parse(sfen)
    e.attributes["board"] = e.board.flop.to_sfen
    e.attributes["moves"] = e.move_infos.map(e => e.to_flop_sfen).join(" ")
    return e.to_sfen
  }
}
