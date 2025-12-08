//==============================================================================
// CheckmateMethods
//
// 将棋の「詰み判定」機能をまとめた mixin クラス。
// Board や Position に対して mixin して使用する想定。
//
// 前提として、以下のメソッドを Board 側が実装していること：
//
//   king_dead_p(location)                … location 側の王が現状で取られる状態か？
//   king_find_by_location(loc)   … loc 側の王（Soldier）を返す
//   soldiers_by_location(location)       … loc 側の全駒を返す
//   lookup(place)                        … place にある駒（ない場合 null）
//   reach_p(soldier, place)              … soldier が place に利いているか？
//   soldier_move_then_king_death_p(a, b) … a を消して b を配置した後に王が死ぬか？
//   legal_drop_p(piece, place, loc)      … 持駒 piece を place に打てるか？
//   soldier_drop_then_king_death_p(s)    … 打った後に王が死ぬか？
//   Place.xy_invalid_p(x,y)              … 盤外チェック
//   Place.fetch([x,y])                   … Place オブジェクト取得
//
//==============================================================================

import { Place } from "../place.js"
import { Piece } from "../piece.js"
import { Soldier } from "../soldier.js"
import _ from "lodash"

export class CheckmateMethods {

  //--------------------------------------------------------------------------
  // checkmate_stat(location)
  //
  // location 側が詰んでいるか？
  //
  // 将棋の詰みとは：
  //   (1) 現在 王手がかかっており
  //   (2) どの合法手でも王手を解除できない
  // のとき「詰み」と判定する。
  //--------------------------------------------------------------------------

  checkmate_stat(location, options = {}) {
    options = {
      hold_pieces: {},
      ...options,
    }

    //-------------------------------------------------------------------- (1)
    // 現在、王手がかかっていなければ詰みではない。
    if (!this.king_dead_p(location)) {
      return false
    }

    //-------------------------------------------------------------------- (王探索)
    const king = this.king_find_by_location(location)
    if (!king) {
      // 王がいない局面は通常の将棋では存在しないが、念のため false
      return false
    }

    //-------------------------------------------------------------------- (2A)
    // 王自身が逃げることができるか？ できないなら詰みではない
    if (this.can_escape_p(king)) {
      return false
    }

    //-------------------------------------------------------------------- (利き駒調査)
    const { friends, attackers } = this.friends_and_attackers_by(king)
    if (attackers.length === 0) {
      // 通常ありえないが、念のため詰みではない扱い
      return false
    }

    //-------------------------------------------------------------------- (二重王手)
    if (attackers.length >= 2) {
      // 二重王手は王が動く以外の回避不可 → (2A) で逃げ不可と判定済み
      return true
    }

    //-------------------------------------------------------------------- (敵は1枚だけ)
    const attacker = attackers[0]

    //-------------------------------------------------------------------- (2B)
    // 味方駒で王手駒を取れるか？
    if (this.kill_by_friend_p(friends, king, attacker)) {
      return false
    }

    // 遮断を考慮するために玉と王手駒の間のセルたちを調べる
    const block_places = king.place.line_between_to(attacker.place)

    // 味方駒で遮断できるか？
    if (this.interpose_by_friend_p(block_places, friends)) {
      return false
    }

    //-------------------------------------------------------------------- (2C)
    // location 側の持駒で合駒できるか？
    if (this.interpose_by_hold_pieces_p(block_places, options.hold_pieces, king.location)) {
      return false
    }

    //-------------------------------------------------------------------- (結論)
    // 王自身も逃げられず、味方も助けられず、合駒もできない → 詰み
    return true
  }

  //==============================================================================
  // (A) 王が逃げられるか
  //==============================================================================

  // 玉に依存させないようにしている
  // しかし promoted を考慮していないので実質玉専用になっている
  can_escape_p(soldier) {
    const around = soldier.once_vectors || []

    for (const vec of around) {
      if (!vec) {
        continue
      }

      const vx = vec[0]
      const vy = vec[1] * soldier.location.value_sign   // 先後の向きを反映
      const x  = soldier.place.x + vx
      const y  = soldier.place.y + vy

      if (Place.xy_invalid_p(x, y)) {
        continue
      }

      const new_place = Place.fetch([x, y])
      const other_soldier = this.lookup(new_place)

      // 味方駒の上には移動できない
      if (other_soldier && other_soldier.location.key === soldier.location.key) {
        continue
      }

      // 逃げた後に王が死ななければ逃走可能
      const new_soldier = soldier.clone_with({place: new_place})
      if (!this.soldier_move_then_king_death_p(soldier, new_soldier)) { // FIXME: king を再検索するので遅い → new_soldier をつかえば探さなくてよくなる
        return true
      }
    }

    return false
  }

  //==============================================================================
  // (B) 味方駒で救えるか？
  //
  //   (B1) 王手駒を「取る」
  //   (B2) 遠距離駒なら「遮断」する
  //==============================================================================

  // protect_by_friend_p(friends, king, attacker) {
  //   return this.kill_by_friend_p(friends, king, attacker) || this.interpose_by_friend_p(friends, king, attacker)
  // }

  //   (B1) 王手駒を「取る」
  kill_by_friend_p(friends, king, attacker) {
    for (const friend of friends) {
      //--- (B1) 取れる？
      if (this.reach_p(friend, attacker.place)) {                           // 仲間は王手している駒の位置にいける
        const new_soldier = friend.clone_with({place: attacker.place})
        if (!this.soldier_move_then_king_death_p(friend, new_soldier)) {    // かつ移動しても玉が死なない
          return true                                                       // のであれば味方駒で救える
        }
      }
    }
    return false
  }
  //   (B2) 遠距離駒なら「遮断」する
  interpose_by_friend_p(block_places, friends) {
    // 王と敵の間の遮断可能マス
    // const block_places = king.place.line_between_to(attacker.place) // ループ内で呼んでいるので遅い
    for (const friend of friends) {
      //--- (B2) 遮断できる？
      if (friend.repeat_vectors) { // FIXME: repeat_vectors の中身を取得する必要はない → has_repeat_vector_p でよい
        for (const place of block_places) {
          if (this.reach_p(friend, place)) {
            const new_soldier = friend.clone_with({place: place})
            if (!this.soldier_move_then_king_death_p(friend, new_soldier)) {
              return true
            }
          }
        }
      }
    }
    return false
  }

  //==============================================================================
  // (C) location 側の持駒で「合駒」できるか？
  //==============================================================================

  interpose_by_hold_pieces_p(block_places, hold_pieces, location) {
    if (block_places.length === 0) {
      return false
    }

    // hold_pieces は count >= 1 だけのキーの配列にする
    // hold_pieces = _.pickBy(hold_pieces, count => count >= 1) // reject { |_, count| count.zero? }

    for (const [piece_key, count] of Object.entries(hold_pieces)) {
      if (count >= 1) {         // hold_pieces に 0 は含めないのであればこの条件は不要
        for (const place of block_places) {
          const soldier = Soldier.create({place: place, piece: Piece.fetch(piece_key), location: location})
          if (this.legal_drop_p(soldier)) {
            if (!this.soldier_drop_then_king_death_p(soldier)) { // 死なない
              return true           // できる
            }
          } else {
            // TODO: block_places が縦ラインだと知っている場合、二歩なら即 break できるが、早すぎる最適化かもしれない
          }
        }
      }
    }

    return false
  }

  // 合法手か？
  // 盤面ルール（構文的・局所的な合法性）のみを考慮する
  legal_drop_p(soldier) {
    // 二歩ならダメ
    if (soldier.piece.key === "P") {
      if (this.double_pawn_violation_p(soldier)) {
        return false
      }
    }

    // 死に駒ならダメ
    if (soldier.dead_place_p) {
      return false
    }

    // 指してよい
    return true
  }

  // soldier を視点とした味方と玉を殺しにきている駒軍を返す
  // soldier は玉だが、玉に依存する必要はない
  friends_and_attackers_by(soldier) {
    //-------------------------------------------------------------------- (利き駒調査)
    const enemies = this.soldiers_by_location(soldier.location.flip)     // 敵軍
    const friends_and_self = this.soldiers_by_location(soldier.location) // 味方

    // 現在 soldier に効いている
    const attackers = enemies.filter(e => this.reach_p(e, soldier.place))

    // 仲間から自分を除外する
    const friends = friends_and_self.filter(e => e.place.key !== soldier.place.key)

    return { friends, attackers }
  }
}
