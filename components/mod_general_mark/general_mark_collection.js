// ・Mutable

import { GX } from "../models/gx"
import { GeneralMarkItem } from "./general_mark_item.js"

export class GeneralMarkCollection {
  static empty() {
    return this.create()
  }

  static create(items = []) {
    return new this(items)
  }

  static from_serial(str = null) {
    const av = GX.str_split(str ?? "", /,/)
    const items = GX.ary_each_slice_to_a(av, GeneralMarkItem.ATTRIBUTE_COUNT).map(([
      gm_pos_key,
      gm_user_name,
      gm_color_index,
    ]) => {
      return { gm_pos_key, gm_user_name, gm_color_index }
    })
    return this.create(items)
  }

  static command_create(method, params) {
    GX.assert_kind_of_string(method)
    GX.assert_kind_of_hash(params)

    return { method, params }
  }

  ////////////////////////////////////////////////////////////////////////////////

  constructor(items = []) {
    this.reset$(items)
  }

  reset$(items = []) {
    this._items = items.map(e => GeneralMarkItem.create(e))
  }

  clear$() {
    if (this.exist_p) {
      this.reset$([])
      return true
    }
  }

  // なければ追加する
  push$(item) {
    item = GeneralMarkItem.create(item)
    if (!this.any_p(item)) {
      this._items.push(item)
      return true
    }
  }

  // あれば削除する
  remove$(item) {
    item = GeneralMarkItem.create(item)
    if (this.any_p(item)) {
      this._items = this._items.filter(e => !e.content_equal_p(item))
      return true
    }
  }

  // あれば削除してなければ追加する
  toggle$(item) {
    if (this.any_p(item)) {
      return this.remove$(item)
    } else {
      return this.push$(item)
    }
  }

  // すでにあるか？
  any_p(item) {
    item = GeneralMarkItem.create(item)
    return this._items.some(e => e.content_equal_p(item))
  }

  // 含むか？
  include_p(item) {
    return this.any_p(item)
  }

  // 含まないか？
  exclude_p(item) {
    return !this.include_p(item)
  }

  // 位置をキーにしたハッシュを返す
  get hash_table() {
    let a = {}
    this._items.forEach(e => {
      if (!a[e.gm_pos_key]) {
        a[e.gm_pos_key] = []
      }
      a[e.gm_pos_key].push(e)
    })
    return a
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

  get to_serial() {
    return this._items.map(e => e.to_serial).join(",")
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

  //////////////////////////////////////////////////////////////////////////////// Command Pattern

  // toggle コマンド生成
  command_for_toggle(item) {
    return this.constructor.command_create(this.include_p(item) ? "remove" : "push", item)
  }

  // command_for_toggle で生成した内容を反映する
  command_execute$(command) {
    GX.assert_kind_of_string(command.method)
    GX.assert_kind_of_hash(command.params)

    if (command.method === "push") {
      return this.push$(command.params)
    } else if (command.method === "remove") {
      return this.remove$(command.params)
    } else {
      throw new Error("must not happen")
    }
  }

  //////////////////////////////////////////////////////////////////////////////// グループ関連

  // gm_user_name のアイテムたちを返す
  find_all_by_gm_user_name(gm_user_name) {
    return this._items.filter(e => e.gm_user_name === gm_user_name)
  }

  // gm_user_name のアイテムたちが1つでも存在する？
  gm_user_name_exist_p(gm_user_name) {
    return this._items.some(e => e.gm_user_name === gm_user_name)
  }

  // 同じグループの印を削除する
  gm_user_name_reject$(gm_user_name) {
    this._items = this._items.filter(e => e.gm_user_name !== gm_user_name)
  }
}
