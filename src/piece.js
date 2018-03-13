import { MemoryRecord } from "./memory_record"

class Piece extends MemoryRecord {
  static get define() {
    return [
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

  static kif_lookup(key) {
    return this.values.find((e) => [e.name, e.alias_name].includes(key))
  }

  static kif_promoted_lookup(key) {
    return this.values.find((e) => [e.promoted_name, e.promoted_alias_name].includes(key))
  }

  get promoted_name() {
    return this.attributes.promoted_name
  }

  get css_class_list() {
    return ["piece_name", `piece_${this.key}`]
  }

  get promotable_p() {
    return !!this.promoted_name
  }
}

export { Piece }

if (process.argv[1] === __filename) {
  console.log(Piece.fetch("K"))
  console.log(Piece.fetch("K"))
  console.log(Piece.lookup(""))
  console.log(Piece.values)
  console.log(Piece.values_map.get("K"))
  console.log(Piece.fetch("K").key)
}
