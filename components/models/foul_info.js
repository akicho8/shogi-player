import MemoryRecord from "js-memory-record"

export class FoulInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "foul_two_pawn",     name: "二歩",     },
      { key: "foul_death_king",   name: "王手放置", },
      { key: "foul_piece_warp",   name: "駒ワープ", },
      { key: "foul_dead_soldier", name: "死に駒",   },
    ]
  }
}

if (process.argv[1] === __filename) {
  console.log(FoulInfo.fetch("foul_two_pawn").attributes)
}
