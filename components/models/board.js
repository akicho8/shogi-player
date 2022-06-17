import _ from 'lodash'
import Vue from 'vue'
import { Soldier } from "./soldier"
import { Place } from "./place.js"

export class Board {
  static get dimension() {
    return 9
  }

  static get danger_zone_size() {
    return 3
  }

  static vector_flip(x, y) {
    return [
      this.dimension - x - 1,
      this.dimension - y - 1,
    ]
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

  //////////////////////////////////////////////////////////////////////////////// 二歩判定用

  // x 列に location の piece があるか？
  piece_exist_by_x(x, location, piece) {
    let found = false
    for (let y = 0; y < Board.dimension; y++) {
      const place = Place.fetch([x, y])
      const soldier = this.lookup(place)
      if (soldier) {
        if (soldier.location.key === location.key) {
          if (soldier.piece.key === piece.key) {
            found = true
            break
          }
        }
      }
    }
    return found
  }

  //////////////////////////////////////////////////////////////////////////////// Utilities

  get shallow_clone() {
    const obj = new Board()
    obj._surface = {...this._surface}
    return obj
  }

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

  // 前後反転
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
  get flop() {
    const new_board = new Board()
    _.forEach(this._surface, (soldier, place) => {
      const new_soldier = new Soldier(Object.assign({}, soldier.attributes, {
        location: soldier.location,
        place: soldier.place.flop,
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

  shuffle_apply(size) {
    // const new_board = new Board()
    // _.forEach(this._surface, (soldier, place) => {
    //   while (true) {
    //     const nx = _.random(0, size - 1)
    //     const ny = _.random(0, size - 1)
    //     const new_place = Place.fetch([nx, ny])
    //     if (new_board.lookup(new_place)) {
    //       const new_soldier = new Soldier(Object.assign({}, soldier.attributes, {
    //         location: soldier.location,
    //         place: new_place,
    //       }))
    //       new_board.place_on(new_soldier)
    //       break
    //     }
    //   }
    // })
    // return new_board

    if ((size * size) < this.soldiers.length) {
      // alert(`再配置するスペースより駒の数の方が多いため処理できません`)
      return
    }

    const places = this.all_places(size)
    const shuffled_places = _.shuffle(places)
    // console.log(places)
    // if (places.length < this.soldiers.length) {
    //   alert("空がありません")
    //   return
    // }

    const new_board = new Board()
    let i = 0
    _.forEach(this._surface, (soldier, place) => {
      const new_soldier = new Soldier(Object.assign({}, soldier.attributes, {
        location: soldier.location,
        place: shuffled_places[i],
      }))
      new_board.place_on(new_soldier)
      i += 1
    })
    return new_board
  }

  // 単純に右上を原点として size x size のセルの Place オブジェクトの配列を返す
  all_places(size) {
    const bx = Board.dimension - size
    const by = 0

    const places = []
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const place = Place.fetch([bx + x, by + y])
        // if (!this.lookup(place)) {
        places.push(place)
        // }
      }
    }
    return places
  }

  //////////////////////////////////////////////////////////////////////////////// serialize

  get to_sfen() {
    const rows = []
    _.times(Board.dimension, (y) => {
      let str = ""
      let space = 0
      _.times(Board.dimension, (x) => {
        const place = Place.fetch([x, y])
        const soldier = this.lookup(place)
        if (_.isNil(soldier)) {
          space++
        } else {
          if (space >= 1) {
            str += space
            space = 0
          }
          if (soldier.promoted) {
            str += "+"
          }
          let key = soldier.piece.key
          if (soldier.location.key === "white") {
            key = key.toLowerCase()
          }
          str += key
        }
      })
      if (space >= 1) {
        str += space
      }
      rows.push(str)
    })
    return rows.join("/")
  }

}

if (process.argv[1] === __filename) {
  console.log(Board.dimension)
}
