// ここで board に依存しているのは lookup だけなので別のクラスとしてもいいかもしれない
// そのとき board をわたさなければ ghost_move にするのはどうだろう？

import _ from "lodash"
import { Place } from "../place.js"

export class LeaveKingAloneMethods {
  // |----------------------------------+-------------------------------+-------------------------------------------------------------|
  // | Method                           | 意味                          | 備考                                                        |
  // |----------------------------------+-------------------------------+-------------------------------------------------------------|
  // | king_dead_p(location)            | 自玉が取られるか？ (何もせず) | location は自分側。「相手の手番」とするため判定はシンプル。 |
  // | soldier_move_then_king_death_p   | 自玉が取られるか？ (指した後) |                                                             |
  // | soldier_drop_then_king_death_p | 自玉が取られるか？ (打った後) |                                                             |
  // | soldier_drop_then_checkmate_p       |                               | 複雑                                                        |
  // |----------------------------------+-------------------------------+-------------------------------------------------------------|

  // 自玉が取られるか？ (何もせず)
  king_dead_p(location) {
    const king = this.king_find_by_location(location)
    if (king) {
      return this.dead_p(king)
    }
  }

  // new_soldier が取られるか？
  dead_p(new_soldier) {
    const op_soldiers = this.soldiers_by_location(new_soldier.location.flip)
    return op_soldiers.some(e => this.reach_p(e, new_soldier.place)) // すべて動かして soldier の位置に行けるか？
  }

  // // soldier が取られないか？
  // alive_p(soldier) {
  //   return !this.dead_p(soldier)
  // }

  // ショートカット (テスト不要)
  // 自玉が取られるか？ (指した後)
  soldier_move_then_king_death_p(old_soldier, new_soldier) {
    return this.soldier_move(old_soldier, new_soldier).king_dead_p(new_soldier.location)
  }
  // 自玉が取られるか？ (打った後)
  soldier_drop_then_king_death_p(new_soldier) {
    return this.soldier_drop(new_soldier).king_dead_p(new_soldier.location)
  }

  // 敵玉が詰んでいる？ (指した後)
  // options には {hold_pieces: 相手の持駒} を渡す
  soldier_move_then_checkmate_p(old_soldier, new_soldier, options = {}) {
    return this.soldier_move(old_soldier, new_soldier).checkmate_stat(new_soldier.location.flip, options)
  }
  // 敵玉が詰んでいる？ (打った後)
  // options には {hold_pieces: 相手の持駒} を渡す
  soldier_drop_then_checkmate_p(new_soldier, options = {}) {
    return this.soldier_drop(new_soldier).checkmate_stat(new_soldier.location.flip, options)
  }

  //////////////////////////////////////////////////////////////////////////////// 効き判定

  // FIXME: ↓ これ Board 関係ない。soldier に移動する。→ やっぱここでいい

  // soldier を goal に移動できるか？(合法手のみ)
  reach_p(soldier, goal, options = {}) {
    return this.reach_count(soldier, goal, options) > 0
  }

  reach_count(soldier, goal, options = {}) {
    const count = this.once_reach_count(soldier, goal)
    if (count > 0) {
      return count
    }
    return this.repeat_reach_count(soldier, goal, options)
  }

  // soldier を goal に移動できるか？(合法手のみ・いっぽだけ)
  once_reach_count(soldier, goal) {
    const vectors = soldier.once_vectors
    if (vectors) {
      if (vectors.some(vec => {
        if (vec) {                // piece_vector.js で null のデータがあるため必要
          return this.__once_reach_vec(soldier, goal, vec)
        }
      })) {
        return 1
      }
    }
    return 0
  }

  // soldier は vec の方に動くとき goal に移動できるか？
  __once_reach_vec(soldier, goal, vec) {
    const vx = vec[0]
    const vy = vec[1] * soldier.location.value_sign
    const x = soldier.place.x + vx
    const y = soldier.place.y + vy
    return x === goal.x && y === goal.y
  }

  // soldier を goal に移動できるか？(連続で動いたとき)
  // ghost_move: true // 障害物を素通り
  repeat_reach_count(soldier, goal, options = {}) {
    let step_count = 0
    const vectors = soldier.repeat_vectors
    if (vectors) {
      for (const vec of vectors) {
        if (vec) {
          const count = this.__repeat_reach_vec(soldier, goal, vec, options)
          if (count > 0) {
            step_count = count
            break
          }
        }
      }
    }
    return step_count
  }

  // vector の方向に進んでいくと他の駒に衝突せずに goal まで一直線に進めるか？
  // 言い替えると vector の方向の goal が見えるか？
  // board.lookup を使う
  __repeat_reach_vec(soldier, goal, vector, options = {}) {
    const ox = soldier.place.x
    const oy = soldier.place.y

    const vx = vector[0]
    const vy = vector[1] * soldier.location.value_sign

    let x = ox + vx
    let y = oy + vy
    let count = 1

    let step_count = 0
    while (true) {
      if (Place.xy_invalid_p(x, y)) { // 外に出てしまった
        break
      }
      if (x === goal.x && y === goal.y) { // 目的地に着いた
        step_count = count
        break
      }
      if (options.ghost_move) {
        // 障害物を無視する
      } else {
        // 他の駒に衝突したら停止 (自分か相手かは問わない)
        const place = Place.fetch([x, y])
        const other = this.lookup(place)
        if (other) {
          break
        }
      }
      x += vx
      y += vy
      count += 1
    }
    return step_count
  }
}
