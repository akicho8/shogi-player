// -*- coding: utf-8; compile-command: "../node_modules/.bin/babel-node piece.js" -*-
// -*- coding: utf-8; compile-command: "node piece.js" -*-

class Piece {
  // static name = "1"

  static foo () {
    return 1
  }

  static lookup (v) {
    return this.table().find((e) => e.sfen_char == v.toUpperCase())
  }

  static fetch (v) {
    const element = this.lookup(v)
    if (!element) {
      throw(`${v} not found`)
    }
    return element
  }

  static table() {
    return [
      {key: "king",   name: "玉", basic_alias: "王",  promoted_name: null, promoted_alias: null,   csa_basic_name: "OU", csa_promoted_name: null, sfen_char: "K", promotable: false, },
      {key: "rook",   name: "飛", basic_alias: null,  promoted_name: "龍", promoted_alias: "竜",   csa_basic_name: "HI", csa_promoted_name: "RY", sfen_char: "R", promotable: true,  },
      {key: "bishop", name: "角", basic_alias: null,  promoted_name: "馬", promoted_alias: null,   csa_basic_name: "KA", csa_promoted_name: "UM", sfen_char: "B", promotable: true,  },
      {key: "gold",   name: "金", basic_alias: null,  promoted_name: null, promoted_alias: null,   csa_basic_name: "KI", csa_promoted_name: null, sfen_char: "G", promotable: false, },
      {key: "silver", name: "銀", basic_alias: null,  promoted_name: "全", promoted_alias: "成銀", csa_basic_name: "GI", csa_promoted_name: "NG", sfen_char: "S", promotable: true,  },
      {key: "knight", name: "桂", basic_alias: null,  promoted_name: "圭", promoted_alias: "成桂", csa_basic_name: "KE", csa_promoted_name: "NK", sfen_char: "N", promotable: true,  },
      {key: "lance",  name: "香", basic_alias: null,  promoted_name: "杏", promoted_alias: "成香", csa_basic_name: "KY", csa_promoted_name: "NY", sfen_char: "L", promotable: true,  },
      {key: "pawn",   name: "歩", basic_alias: null,  promoted_name: "と", promoted_alias: null,   csa_basic_name: "FU", csa_promoted_name: "TO", sfen_char: "P", promotable: true,  },
    ]
  }

  constructor (attributes) {
    this.attributes = attributes
  }
}

// if (process.argv[1] == require.main.filename) {
//   console.log(Piece.lookup("K"))
//   console.log(Piece.lookup("K2"))
//   console.log(Piece.fetch("K"))
// }

export { Piece }
