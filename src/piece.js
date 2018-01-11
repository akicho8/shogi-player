// -*- compile-command: "babel-node piece.js" -*-

class Piece {
  static memory_records() {
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

  static lookup (key) {
    key = key.toUpperCase()
    const element = this.all().find((e) => e.key === key)
    return element
  }

  static fetch (key) {
    const element = this.lookup(key)
    if (!element) {
      throw `Key not found: ${key}`
    }
    return element
  }

  static all() {
    this.instances = this.instances || this.memory_records().map((e) => new Piece(e))
    return this.instances
  }

  constructor (attributes) {
    this.attributes = attributes
  }

  get key () {
    return this.attributes.key
  }

  get name () {
    return this.attributes.name
  }

  get promoted_name () {
    return this.attributes.promoted_name
  }
}

export { Piece }

if (process.argv[1] === __filename) {
  console.log(Piece.fetch("K"))
  console.log(Piece.fetch("K"))
  console.log(Piece.lookup(""))

  let v = Piece.fetch("K")
  v.promoted = true
  console.log(v)
}
