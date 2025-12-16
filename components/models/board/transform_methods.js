import _ from "lodash"
import { Place } from "../place.js"
import { Soldier } from "../soldier.js"

export class TransformMethods {
  get half_spin() { return this.__transform_call(e => e.clone_with({ place: e.place.half_spin, location: e.location.flip })) } // 180度反転
  get flip()      { return this.__transform_call(e => e.clone_with({ place: e.place.flip                                 })) } // 上下反転
  get flop()      { return this.__transform_call(e => e.clone_with({ place: e.place.flop                                 })) } // 左右反転
  rotate_xy(x, y) { return this.__transform_call(e => e.clone_with({ place: e.place.rotate_xy(x, y)                      })) } // x, y ずらす

  // size * size の範囲で配置をランダムにする
  square_shuffle(size) {
    if ((size * size) < this.soldiers_count) {
      // 再配置するスペースより駒の数の方が多いため処理できない
      return
    }

    const target_area_places = this.__target_area_places(size)
    const shuffled_places = _.shuffle(target_area_places)

    let i = 0
    return this.__transform_call(e => {
      const new_place = shuffled_places[i]
      i += 1
      return e.clone_with({place: new_place})
    })
  }

  // 単純に右上を原点として size x size のセルの Place オブジェクトの配列を返す
  __target_area_places(size) {
    const bx = this.dimension - size
    const by = 0
    const places = []
    _(size).times(y => {
      _(size).times(x => {
        places.push(Place.fetch([bx + x, by + y]))
      })
    })
    return places
  }

  __transform_call(block) {
    const new_soldiers = this.soldiers.map(e => block(e))
    return this.constructor.create_from_soldiers(new_soldiers)
  }
}
