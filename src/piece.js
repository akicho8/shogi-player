// -*- compile-command: "babel-node piece.js" -*-

import { MemoryRecord } from "./memory_record"

class Piece extends MemoryRecord {
  static get define() {
    return [
      { key: "K", name: "玉", promoted_name: null, },
      { key: "R", name: "飛", promoted_name: "龍", },
      { key: "B", name: "角", promoted_name: "馬", },
      { key: "G", name: "金", promoted_name: null, },
      { key: "S", name: "銀", promoted_name: "全", },
      { key: "N", name: "桂", promoted_name: "圭", },
      { key: "L", name: "香", promoted_name: "杏", },
      { key: "P", name: "歩", promoted_name: "と", },
    ]
  }

  static lookup(key) {
    return super.lookup(key.toUpperCase())
  }

  get promoted_name() {
    return this.attributes.promoted_name
  }
}

export { Piece }

if (process.argv[1] === __filename) {
  // console.log(Piece.fetch("K"))
  // console.log(Piece.fetch("K"))
  // console.log(Piece.lookup(""))
  console.log(Piece.values)
  console.log(Piece.values_map.get("K"))
}
