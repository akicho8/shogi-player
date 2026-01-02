import { KifParser } from "./kif_parser.js"
import { SfenParser } from "./sfen_parser.js"

export class AnyParser {
  static parse(str) {
    if (/position|sfen|moves/.test(str)) {
      return SfenParser.parse(str)
    } else {
      return KifParser.parse(str)
    }
  }
}
