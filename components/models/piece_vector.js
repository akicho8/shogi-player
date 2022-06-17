// force_promote_length: 死に駒になる前方にある壁との隙間の数(この値以下で死に駒になる)

import MemoryRecord from "js-memory-record"

export class PieceVector extends MemoryRecord {
  static get define() {
    return [
      { key: "K", basic_once_vectors: "pattern_king",   basic_repeat_vectors: null,           promoted_once_vectors: null,           promoted_repeat_vectors: null,           force_promote_length: null, },
      { key: "R", basic_once_vectors: null,             basic_repeat_vectors: "pattern_plus", promoted_once_vectors: "pattern_x",    promoted_repeat_vectors: "pattern_plus", force_promote_length: null, },
      { key: "B", basic_once_vectors: null,             basic_repeat_vectors: "pattern_x",    promoted_once_vectors: "pattern_plus", promoted_repeat_vectors: "pattern_x",    force_promote_length: null, },
      { key: "G", basic_once_vectors: "pattern_gold",   basic_repeat_vectors: null,           promoted_once_vectors: null,           promoted_repeat_vectors: null,           force_promote_length: null, },
      { key: "S", basic_once_vectors: "pattern_silver", basic_repeat_vectors: null,           promoted_once_vectors: "pattern_gold", promoted_repeat_vectors: null,           force_promote_length: null, },
      { key: "N", basic_once_vectors: "pattern_knight", basic_repeat_vectors: null,           promoted_once_vectors: "pattern_gold", promoted_repeat_vectors: null,           force_promote_length: 1,    },
      { key: "L", basic_once_vectors: null,             basic_repeat_vectors: "pattern_pawn", promoted_once_vectors: "pattern_gold", promoted_repeat_vectors: null,           force_promote_length: 0,    },
      { key: "P", basic_once_vectors: "pattern_pawn",   basic_repeat_vectors: null,           promoted_once_vectors: "pattern_gold", promoted_repeat_vectors: null,           force_promote_length: 0,    },
    ]
  }

  once_vectors(promoted) {
    let method = null
    if (promoted) {
      method = this.promoted_once_vectors
    } else {
      method = this.basic_once_vectors
    }
    return this.constructor[method]
  }

  repeat_vectors(promoted) {
    let method = null
    if (promoted) {
      method = this.promoted_repeat_vectors
    } else {
      method = this.basic_repeat_vectors
    }
    return this.constructor[method]
  }

  static get pattern_plus() {
    return [
      null,    [0,-1],   null,
      [-1, 0],         [1, 0],
      null,    [0, 1],   null,
    ]
  }

  static get pattern_x() {
    return [
      [-1, -1], null, [1, -1],
          null, null,    null,
      [-1,  1], null, [1,  1],
    ]
  }

  static get pattern_silver() {
    return [
      [-1, -1], [0, -1], [1, -1],
      null,        null,    null,
      [-1,  1],    null, [1,  1],
    ]
  }

  static get pattern_gold() {
    return [
      [-1, -1], [0, -1], [1, -1],
      [-1,  0],          [1,  0],
          null, [0,  1],    null,
    ]
  }

  static get pattern_king() {
    return [
      [-1, -1], [0, -1], [1, -1],
      [-1,  0],    null, [1,  0],
      [-1,  1], [0,  1], [1,  1],
    ]
  }

  static get pattern_knight() {
    return [[-1, -2], [1, -2]]
  }

  static get pattern_pawn() {
    return [[0, -1]]
  }
}

if (process.argv[1] === __filename) {
  // console.log(Piece.fetch("K"))
  // console.log(Piece.fetch("K"))
  // console.log(Piece.lookup(""))
  // console.log(Piece.values)
  // console.log(Piece.values_map.get("K"))
  // console.log(Piece.fetch("K").key)
}
