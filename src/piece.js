// -*- compile-command: "babel-node piece.js" -*-

class Piece {
  static lookup (v) {
    v = v.toUpperCase()
    return this.table().find((e) => e.key === v)
  }

  static fetch (v) {
    const element = this.lookup(v)
    if (!element) {
      throw `${v} not found`
    }
    return element
  }

  static table() {
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

  constructor (attributes) {
    this.attributes = attributes
  }
}

export { Piece }

if (process.argv[1] == __filename) {
  console.log(Piece.fetch("K"))
}
