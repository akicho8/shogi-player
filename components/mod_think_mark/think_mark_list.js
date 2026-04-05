// ・Mutable

import { GX } from "../models/gx"
import { ThinkMark } from "./think_mark_item.js"

export class ThinkMarkList {
  static create(marks = []) {
    return new this(marks)
  }

  ////////////////////////////////////////////////////////////////////////////////

  constructor(marks = []) {
    this.reset(marks)
  }

  reset(ary = []) {
    this._items = ary.map(attrs => ThinkMark.create(attrs))
  }

  clear() {
    this.reset([])
  }

  // あれば削除してなければ追加する
  toggle(think_mark_item) {
    if (this.any_p(think_mark_item)) {
      this.remove(think_mark_item)
    } else {
      this.push(think_mark_item)
    }
  }

  // なければ追加する
  push(think_mark_item) {
    think_mark_item = ThinkMark.create(think_mark_item)
    if (!this.any_p(think_mark_item)) {
      this._items.push(think_mark_item)
    }
  }

  // あれば削除する
  remove(think_mark_item) {
    think_mark_item = ThinkMark.create(think_mark_item)
    if (this.any_p(think_mark_item)) {
      this._items = this._items.filter(e => !e.equal_p(think_mark_item))
    }
  }

  // すでにあるか？
  any_p(think_mark_item) {
    think_mark_item = ThinkMark.create(think_mark_item)
    return this._items.some(e => e.equal_p(think_mark_item))
  }

  // 含むか？
  include_p(think_mark_item) {
    return this.any_p(think_mark_item)
  }

  // 含まないか？
  exclude_p(think_mark_item) {
    return !this.include_p(think_mark_item)
  }

  // 位置をキーにしたハッシュを返す
  get marks_hash() {
    return this._items.reduce((a, e) => {
      GX.assert(e.think_mark_pos_key)
      if (!a[e.think_mark_pos_key]) {
        a[e.think_mark_pos_key] = []
      }
      a[e.think_mark_pos_key].push(e)
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

  //////////////////////////////////////////////////////////////////////////////// toggle 処理のコマンド化

  // toggle コマンド生成
  toggle_command_create(think_mark_item) {
    return {
      method: this.include_p(think_mark_item) ? "remove" : "push",
      params: think_mark_item,
    }
  }

  // toggle_command_create で生成した内容を反映する
  toggle_command_apply(command) {
    if (command.method === "push") {
      this.push(command.params)
    } else if (command.method === "remove") {
      this.remove(command.params)
    } else {
      throw new Error("must not happen")
    }
  }

  //////////////////////////////////////////////////////////////////////////////// グループ関連

  // think_mark_user_name のアイテムたちを返す
  items_by_group(think_mark_user_name) {
    return this._items.filter(e => e.think_mark_user_name === think_mark_user_name)
  }

  // think_mark_user_name のアイテムたちが1つでも存在する？
  group_exist_p(think_mark_user_name) {
    return this._items.some(e => e.think_mark_user_name === think_mark_user_name)
  }

  // 同じグループの印を削除する
  group_reject$(think_mark_user_name) {
    this._items = this._items.filter(e => e.think_mark_user_name !== think_mark_user_name)
  }
}

if (typeof process !== "undefined" && process.argv[1] === __filename) {
}
