// ・Mutable

import { GX } from "../models/gx"
import { GeneralMarkItem } from "./general_mark_item.js"

export class GeneralMarkList {
  static create(general_mark_items = []) {
    return new this(general_mark_items)
  }

  static from_serial(str = null) {
    const av = GX.str_split(str ?? "", /,/)
    const general_mark_items = GX.ary_each_slice_to_a(av, GeneralMarkItem.ATTRIBUTE_COUNT).map(([
      general_mark_pos_key,
      general_mark_group_name,
      general_mark_color_index,
    ]) => {
      return {
        general_mark_pos_key: general_mark_pos_key,
        general_mark_group_name: general_mark_group_name,
        general_mark_color_index: general_mark_color_index,
      }
    })
    return this.create(general_mark_items)
  }

  ////////////////////////////////////////////////////////////////////////////////

  constructor(general_mark_items = []) {
    this.reset(general_mark_items)
  }

  reset(general_mark_items = []) {
    this._items = general_mark_items.map(e => GeneralMarkItem.create(e))
  }

  clear() {
    if (this.exist_p) {
      this.reset([])
      return true
    }
  }

  // なければ追加する
  push(general_mark_item) {
    general_mark_item = GeneralMarkItem.create(general_mark_item)
    if (!this.any_p(general_mark_item)) {
      this._items.push(general_mark_item)
      return true
    }
  }

  // あれば削除する
  remove(general_mark_item) {
    general_mark_item = GeneralMarkItem.create(general_mark_item)
    if (this.any_p(general_mark_item)) {
      this._items = this._items.filter(e => !e.equal_p(general_mark_item))
      return true
    }
  }

  // あれば削除してなければ追加する
  toggle(general_mark_item) {
    if (this.any_p(general_mark_item)) {
      return this.remove(general_mark_item)
    } else {
      return this.push(general_mark_item)
    }
  }

  // すでにあるか？
  any_p(general_mark_item) {
    general_mark_item = GeneralMarkItem.create(general_mark_item)
    return this._items.some(e => e.equal_p(general_mark_item))
  }

  // 含むか？
  include_p(general_mark_item) {
    return this.any_p(general_mark_item)
  }

  // 含まないか？
  exclude_p(general_mark_item) {
    return !this.include_p(general_mark_item)
  }

  // 位置をキーにしたハッシュを返す
  get hash_table() {
    return this._items.reduce((a, e) => {
      GX.assert(e.general_mark_pos_key)
      if (!a[e.general_mark_pos_key]) {
        a[e.general_mark_pos_key] = []
      }
      a[e.general_mark_pos_key].push(e)
      return a
    }, {})
  }

  get as_json() {
    return this.to_a.map(e => e.as_json)
  }

  toJSON() {
    return this.as_json
  }

  get to_a() {
    return this._items
  }

  get size() {
    return this._items.length
  }

  get empty_p() {
    return this.size === 0
  }

  get exist_p() {
    return this.size > 0
  }

  get many_p() {
    return this.size > 1
  }

  //////////////////////////////////////////////////////////////////////////////// toggle 処理のコマンド化

  // toggle コマンド生成
  toggle_command_create(general_mark_item) {
    return {
      method: this.include_p(general_mark_item) ? "remove" : "push",
      params: general_mark_item,
    }
  }

  // toggle_command_create で生成した内容を反映する
  command_execute(command) {
    GX.assert_kind_of_string(command.method)
    GX.assert_kind_of_hash(command.params)

    if (command.method === "push") {
      return this.push(command.params)
    } else if (command.method === "remove") {
      return this.remove(command.params)
    } else {
      throw new Error("must not happen")
    }
  }

  //////////////////////////////////////////////////////////////////////////////// グループ関連

  // general_mark_group_name のアイテムたちを返す
  items_by_group(general_mark_group_name) {
    return this._items.filter(e => e.general_mark_group_name === general_mark_group_name)
  }

  // general_mark_group_name のアイテムたちが1つでも存在する？
  group_exist_p(general_mark_group_name) {
    return this._items.some(e => e.general_mark_group_name === general_mark_group_name)
  }

  // 同じグループの印を削除する
  group_reject$(general_mark_group_name) {
    this._items = this._items.filter(e => e.general_mark_group_name !== general_mark_group_name)
  }

  //////////////////////////////////////////////////////////////////////////////// シリアライズ

  get to_serial() {
    return this._items.map(e => e.to_serial).join(",")
  }
}
