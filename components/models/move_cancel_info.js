import MemoryRecord from "js-memory-record"

export class MoveCancelInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "is_move_cancel_easy",   name: "無効な場所をタップしたとき駒を離す(ウォーズやぴよ将棋の仕様)",     },
      { key: "is_move_cancel_hard",   name: "移動元をタップしたときに駒を離す",       },
      { key: "is_move_cancel_rehold", name: "移動元をタップしたときに駒を離して持つ", }, // 駒の持ち替えは駒を離せなくなるため非推奨
    ]
  }
}
