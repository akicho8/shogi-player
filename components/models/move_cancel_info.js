import MemoryRecord from "js-memory-record"

export class MoveCancelInfo extends MemoryRecord {
  static get define() {
    return [
      // 一般的なのはこれ
      // ウォーズやぴよ将棋はこれ
      // 動けないところをタップすると離す
      // ちなみに駒台や駒箱はセルの概念が微妙なため、持ってさらに持つといったん離すで固定している
      { key: "is_move_cancel_standard",   name: "無効な場所をタップで駒を離す", smooth_cancel: true, },

      // ShogiPlayer はもともとこれにしていた
      // 持ち替えるなら現実のようにいったん持っている駒を元の位置に戻して欲しかった
      // しかし意に反して一部の人から元の位置に戻さず他の駒を持とうとして「駒が持てない」という人が出てきた
      { key: "is_move_cancel_reality",   name: "移動元をタップしたときに駒を離す", smooth_cancel: false, },

      // 動けないところに置いたら離してさらに駒を持つ
      // つまり持ち替える
      // これは離すのが難しいことがあるためあまりオススメしない
      // とはいえスマホであれば駒が浮遊しないためそれほど違和感ははない
      // lishogi はこれになっている
      { key: "is_move_cancel_rehold", name: "移動元をタップしたときに駒を離して持つ", smooth_cancel: true, },
    ]
  }
}
