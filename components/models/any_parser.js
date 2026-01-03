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

  static from_attributes(attributes) {
    let value = null
    let v = null
    if (value == null) {
      v = attributes["sfen"]
      if (v) {
        value = SfenParser.parse(v)
      }
    }
    if (value == null) {
      v = attributes["kif"]
      if (v) {
        value = KifParser.parse(v)
      }
    }
    if (value == null) {
      v = attributes["any"]
      if (v) {
        value = AnyParser.parse(v)
      }
    }
    if (value == null) {
      v = attributes["data_source"]
      if (v) {
        value = v
      }
    }
    value ??= SfenParser.default_create()
    Object.freeze(value)
    return value
  }
}

