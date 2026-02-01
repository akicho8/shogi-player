import { PresetInfo } from "./preset_info.js"
import { SfenInfo } from "./sfen_info.js"
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

    // テストを書きやすくするため
    {
      if (value == null) {
        v = attributes["preset_key"]
        if (v) {
          value = SfenParser.parse(PresetInfo.fetch(v).sfen)
        }
      }
      if (value == null) {
        v = attributes["sfen_key"]
        if (v) {
          value = SfenParser.parse(SfenInfo.fetch(v).sfen)
        }
      }
    }

    // sfen 文字列での指定
    if (value == null) {
      v = attributes["sfen"]
      if (v) {
        value = SfenParser.parse(v)
      }
    }

    // kif テキストでの指定
    if (value == null) {
      v = attributes["kif"]
      if (v) {
        value = KifParser.parse(v)
      }
    }

    // sfen 文字列または kif テキストのどちらか (自動判別)
    if (value == null) {
      v = attributes["any"]
      if (v) {
        value = AnyParser.parse(v)
      }
    }

    // 直接 data_source を指定した場合
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
