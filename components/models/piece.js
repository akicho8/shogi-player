import { ApplicationMemoryRecord } from "./application_memory_record.js"
import { PieceVector } from "./piece_vector.js"
import { PieceYomiage } from "./piece_yomiage.js"

export class Piece extends ApplicationMemoryRecord {
  static get define() {
    return [
      // 順序について
      // http://yaneuraou.yaneu.com/2016/07/15/sfen%E6%96%87%E5%AD%97%E5%88%97%E3%81%AF%E6%9C%AC%E6%9D%A5%E3%81%AF%E4%B8%80%E6%84%8F%E3%81%AB%E5%AE%9A%E3%81%BE%E3%82%8B%E4%BB%B6/
      // https://web.archive.org/web/20080131070731/http://www.glaurungchess.com/shogi/usi.html
      { key: "K", name: "玉", alias_name: "王", promoted_name: null, promoted_alias_name: null, },
      { key: "R", name: "飛", alias_name: null, promoted_name: "龍", promoted_alias_name: "竜", },
      { key: "B", name: "角", alias_name: null, promoted_name: "馬", promoted_alias_name: null, },
      { key: "G", name: "金", alias_name: null, promoted_name: null, promoted_alias_name: null, },
      { key: "S", name: "銀", alias_name: null, promoted_name: "全", promoted_alias_name: null, },
      { key: "N", name: "桂", alias_name: null, promoted_name: "圭", promoted_alias_name: null, },
      { key: "L", name: "香", alias_name: null, promoted_name: "杏", promoted_alias_name: null, },
      { key: "P", name: "歩", alias_name: null, promoted_name: "と", promoted_alias_name: null, },
    ]
  }

  static lookup(key) {
    if (typeof key === "string") {
      key = key.toUpperCase()
    }
    return super.lookup(key)
  }

  // "歩" などで引く
  static lookup_by_name(key) {
    if (this._lookup_by_name == null) {
      this._lookup_by_name = this.memory_record_create_index_by(["name", "alias_name"])
    }
    return this._lookup_by_name[key]
  }

  // "と" などで引く
  static lookup_by_promoted_name(key) {
    if (this._lookup_by_promoted_name == null) {
      this._lookup_by_promoted_name = this.memory_record_create_index_by(["promoted_name", "promoted_alias_name"])
    }
    return this._lookup_by_promoted_name[key]
  }

  get css_class_list() {
    return ["piece_name", `piece_${this.key}`]
  }

  get promotable_p() {
    return !!this.promoted_name
  }

  get piece_vector() {
    return PieceVector.fetch(this.key)
  }

  once_vectors(promoted) {
    return this.piece_vector.once_vectors(promoted)
  }

  repeat_vectors(promoted) {
    return this.piece_vector.repeat_vectors(promoted)
  }

  get piece_yomiage() {
    return PieceYomiage.fetch(this.key)
  }
}

if (typeof process !== "undefined" && process.argv[1] === __filename) {
  console.log(Piece.fetch("K"))
  console.log(Piece.fetch("K"))
  console.log(Piece.lookup(""))
  console.log(Piece.values)
  console.log(Piece.values_map.get("K"))
  console.log(Piece.fetch("K").key)
}
