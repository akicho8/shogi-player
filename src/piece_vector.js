import MemoryRecord from "js-memory-record"
// import Piece from "./piece"
// import Location from "./location"

export default class PieceVector extends MemoryRecord {
  static get define() {
    return [
      { key: "K", basic_once_vectors: "pattern_king",       basic_repeat_vectors: null,           promoted_once_vectors: null,           promoted_repeat_vectors: null,           },
      { key: "R", basic_once_vectors: null,                 basic_repeat_vectors: "pattern_plus", promoted_once_vectors: "pattern_x",    promoted_repeat_vectors: "pattern_plus", },
      { key: "B", basic_once_vectors: null,                 basic_repeat_vectors: "pattern_x",    promoted_once_vectors: "pattern_plus", promoted_repeat_vectors: "pattern_x",    },
      { key: "G", basic_once_vectors: "pattern_gold",       basic_repeat_vectors: null,           promoted_once_vectors: null,           promoted_repeat_vectors: null,           },
      { key: "S", basic_once_vectors: "pattern_silver",     basic_repeat_vectors: null,           promoted_once_vectors: "pattern_gold", promoted_repeat_vectors: null,           },
      { key: "N", basic_once_vectors: "pattern_knight",     basic_repeat_vectors: null,           promoted_once_vectors: "pattern_gold", promoted_repeat_vectors: null,           },
      { key: "L", basic_once_vectors: null,                 basic_repeat_vectors: "pattern_pawn", promoted_once_vectors: "pattern_gold", promoted_repeat_vectors: null,           },
      { key: "P", basic_once_vectors: "pattern_pawn",       basic_repeat_vectors: null,           promoted_once_vectors: "pattern_gold", promoted_repeat_vectors: null,           },
    ]
  }

  // get brave_p() {
  //   return this.promoted_repeat_vectors
  // }
  //
  // // get all_vectors(promoted:, location:) {
  // //   @all_vectors ||= {}
  // //   @all_vectors[[promoted, location.key]] ||= -> {
  // //     vectors = __select_vectors(promoted)
  // //     normalized_vectors(location, vectors)
  // //   }.call
  // // }
  //
  // // private
  //
  // __select_vectors(promoted) {
  //   // raise MustNotHappen if !piece.promotable? && promoted
  //
  //   if (promoted) {
  //     return this.promoted_vectors
  //   } else {
  //     return this.basic_vectors
  //   }
  // }
  //
  // get piece() {
  //   Piece.fetch(this.key)
  // }
  //
  // normalized_vectors(location, vectors) {
  //   if (location.key === "white") {
  //     vectors = vectors.map(e => e.flip_sign)
  //   }
  //   return vectors
  // }
  //
  // get basic_vectors() {
  //   if (this._basic_vectors) { return this._basic_vectors }
  //   this._basic_vectors = this.build_vectors(this.basic_once_vectors, this.basic_repeat_vectors)
  //   return this._basic_vectors
  // }
  //
  // get promoted_vectors() {
  //   if (this._promoted_vectors) { return this._promoted_vectors }
  //   this._promoted_vectors = this.build_vectors(this.promoted_once_vectors, this.promoted_repeat_vectors)
  //   return this._promoted_vectors
  // }

  // get build_vectors(ov, rv) {
  //   let v = ov.compact + rv.compact
  //   if (v.size != v.uniq.size) {
  //     raise MustNotHappen
  //   }
  //
  //   [
  //       *ov.compact.collect { |v| OnceVector[*v]   },
  //       *rv.compact.collect { |v| RepeatVector[*v] },
  //   ].to_set
  // }

  // get basic_once_vectors()
  //   return __vectors_at(super)
  // }

  // get basic_repeat_vectors() {
  //   return __vectors_at(super)
  // }

  // get promoted_once_vectors() {
  // return __vectors_at(super)
  // }

  // get promoted_repeat_vectors() {
  //   return __vectors_at(super)
  // }

  // get __vectors_at(value)
  //   if value
  //     if value.kind_of?(Symbol)
  //       send(value)
  //     else
  //       value
  //     }
  //   else
  //     []
  //   }
  // }

  static get pattern_plus() {
    return [
      null,    [0,-1],   null,
      [-1, 0],       [1, 0],
      null,    [0, 1],   null,
    ]
  }

  static get pattern_x() {
    return [
      [-1, -1], null, [1, -1],
      null,      null,     null,
      [-1,  1], null, [1,  1],
    ]
  }

  static get pattern_silver() {
    return [
      [-1, -1], [0, -1], [1, -1],
      null,          null,     null,
      [-1,  1],     null, [1,  1],
    ]
  }

  static get pattern_gold() {
    return [
      [-1, -1], [0, -1], [1, -1],
      [-1,  0],          [1,  0],
      null,      [0,  1],     null,
    ]
  }

  static get pattern_king() {
    return [
      [-1, -1], [0, -1], [1, -1],
      [-1,  0],     null, [1,  0],
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
