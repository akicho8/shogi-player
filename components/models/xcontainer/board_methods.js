import _ from "lodash"
import { GX } from "../gx"

export class BoardMethods {
  soldier_css_class_list(place) {
    const soldier = this.board.lookup(place)
    if (soldier) {
      return soldier.css_class_list
    }
  }
}
