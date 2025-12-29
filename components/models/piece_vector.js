// force_promote_length: 死に駒になる前方にある壁との隙間の数(この値以下で死に駒になる)

import { ApplicationMemoryRecord } from "./application_memory_record.js"
import _ from "lodash"

function vector_table_define(hv) {
  const acc = {}
  _.each(hv, (av, key) => {
    acc[key] = Object.freeze(av.map(e => Object.freeze(e)))
  })
  return Object.freeze(acc)
}

export class PieceVector extends ApplicationMemoryRecord {
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

  static VectorTable = vector_table_define({
    pattern_plus: [[0, -1], [-1, 0], [1, 0], [0, 1]],
    pattern_x: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
    pattern_silver: [[-1, -1], [0, -1], [1, -1], [-1, 1], [1, 1]],
    pattern_gold: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [0, 1]],
    pattern_king: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]],
    pattern_knight: [[-1, -2], [1, -2]],
    pattern_pawn: [[0, -1]],
  })

  once_vectors(promoted) {
    let method = null
    if (promoted) {
      method = this.promoted_once_vectors
    } else {
      method = this.basic_once_vectors
    }
    if (method) {
      return this.constructor.VectorTable[method]
    }
  }

  repeat_vectors(promoted) {
    let method = null
    if (promoted) {
      method = this.promoted_repeat_vectors
    } else {
      method = this.basic_repeat_vectors
    }
    if (method) {
      return this.constructor.VectorTable[method]
    }
  }
}
