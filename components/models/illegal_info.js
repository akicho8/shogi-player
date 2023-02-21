import MemoryRecord from "js-memory-record"

export class IllegalInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "illegal_two_pawn",     name: "二歩",     },
      { key: "illegal_death_king",   name: "王手放置", },
      { key: "illegal_piece_warp",   name: "駒ワープ", },
      { key: "illegal_dead_soldier", name: "死に駒",   },
    ]
  }
}

if (process.argv[1] === __filename) {
  console.log(IllegalInfo.fetch("illegal_two_pawn").attributes)
}
