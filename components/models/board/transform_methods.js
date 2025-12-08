import _ from "lodash"
import { Place } from "../place.js"
import { Soldier } from "../soldier.js"

export class TransformMethods {
  // 360度回転相当の新しいインスタンスを返す
  get half_spin() {
    const new_board = this.constructor.create()
    _.forEach(this._surface, (soldier, _place) => {
      const new_soldier = soldier.clone_with({location: soldier.location.flip, place: soldier.place.half_spin})
      new_board.soldier_drop$(new_soldier)
    })
    return new_board
  }

  // 左右反転した新しいインスタンスを返す
  get flop() {
    const new_board = this.constructor.create()
    _.forEach(this._surface, (soldier, _place) => {
      const new_soldier = soldier.clone_with({place: soldier.place.flop})
      new_board.soldier_drop$(new_soldier)
    })
    return new_board
  }

  // 上下左右ローテイトした新しいインスタンスを返す
  slide_xy(x, y) {
    const new_board = this.constructor.create()
    _.forEach(this._surface, (soldier, _place) => {
      const new_soldier = soldier.clone_with({place: soldier.place.to_rotate_place(x, y)})
      new_board.soldier_drop$(new_soldier)
    })
    return new_board
  }

  shuffle_apply(size) {
    // const new_board = this.constructor.create()
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
    //       new_board.soldier_drop$(new_soldier)
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

    const new_board = this.constructor.create()
    let i = 0
    _.forEach(this._surface, (soldier, place) => {
      const new_soldier = new Soldier(Object.assign({}, soldier.attributes, {
        location: soldier.location,
        place: shuffled_places[i],
      }))
      new_board.soldier_drop$(new_soldier)
      i += 1
    })
    return new_board
  }

  // 単純に右上を原点として size x size のセルの Place オブジェクトの配列を返す
  all_places(size) {
    const bx = this.dimension - size
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
}
