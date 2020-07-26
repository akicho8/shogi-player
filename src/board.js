import _ from 'lodash'
import Vue from 'vue'
import Soldier from "./soldier"
import Place from "./place.js"

export default class Board {
  static get dimension() {
    return 9
  }

  static get danger_zone_size() {
    return 3
  }

  constructor() {
    this._surface = {}
  }

  place_on(soldier) {
    this.delete_at(soldier.place) // リアクティブにするため「削除」→「追加」とする
    Vue.set(this._surface, soldier.place.key, soldier)
  }

  lookup(place) {
    return this._surface[place.key]
  }

  delete_at(place) {
    Vue.delete(this._surface, place.key)
  }

  clear() {
    this._surface = {}
  }

  //////////////////////////////////////////////////////////////////////////////// Utilities

  get soldiers() {
    return Object.values(this._surface)
  }

  // soldier を piece にしてその個数をハッシュにして返す
  get piece_counts_hash() {
    const counts = {}
    _.forEach(this.soldiers, e => {
      counts[e.piece.key] = (counts[e.piece.key] || 0) + 1
    })
    return counts
  }

  get flip_all() {
    const new_board = new Board()
    _.forEach(this._surface, (soldier, place) => {
      const new_soldier = new Soldier(Object.assign({}, soldier.attributes, {
        location: soldier.location.flip,
        place: soldier.place.flip_all,
      }))
      new_board.place_on(new_soldier)
    })
    return new_board
  }

  // 左右反転
  get flip_h() {
    const new_board = new Board()
    _.forEach(this._surface, (soldier, place) => {
      const new_soldier = new Soldier(Object.assign({}, soldier.attributes, {
        location: soldier.location,
        place: soldier.place.flip_h,
      }))
      new_board.place_on(new_soldier)
    })
    return new_board
  }

  // 上下左右ローテイト
  slide_xy(x, y) {
    const new_board = new Board()
    _.forEach(this._surface, (soldier, place) => {
      const new_soldier = new Soldier(Object.assign({}, soldier.attributes, {
        location: soldier.location,
        place: soldier.place.rotate_add(x, y),
      }))
      new_board.place_on(new_soldier)
    })
    return new_board
  }
}

if (process.argv[1] === __filename) {
  console.log(Board.dimension)
}
