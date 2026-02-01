import Vue from "vue"
import _ from "lodash"
import { Place } from "../place.js"
import { GX } from "../gx"

export class BoardMethods {
  get dimension() { return Board.dimension }

  soldier_at(xy) {
    const place = Place.fetch(xy)
    return this.board.lookup(place)
  }

  soldier_css_class_list(xy) {
    const soldier = this.soldier_at(xy)
    if (soldier) {
      return soldier.css_class_list
    }
    return []
  }

  // 未使用
  // cell_piece_class(xy) {
  //   const soldier = this.soldier_at(xy)
  //   let list = []
  //   if (soldier) {
  //     list.push(`location_${soldier.location.key}`)
  //   }
  //   return list
  // }

  // 未使用
  // cell_view(xy) {
  //   const place = Place.fetch(xy)
  //   const soldier = this.board.lookup(place)
  //   let str = ""
  //   if (soldier) {
  //     str = soldier.name
  //   }
  //   return str
  // }
}
