// ・Mutable

import { GX } from "../models/gx"
import { Mark } from "./mark.js"

export class MarkList {
  static create(marks = []) {
    return new this(marks)
  }

  ////////////////////////////////////////////////////////////////////////////////

  constructor(marks = []) {
    this.reset(marks)
  }

  reset(ary = []) {
    this._items = ary.map(attrs => Mark.create(attrs))
  }

  clear() {
    this.reset([])
  }

  // あれば削除してなければ追加する
  toggle(mark) {
    if (this.any_p(mark)) {
      this.remove(mark)
    } else {
      this.push(mark)
    }
  }

  // なければ追加する
  push(mark) {
    mark = Mark.create(mark)
    if (!this.any_p(mark)) {
      this._items.push(mark)
    }
  }

  // あれば削除する
  remove(mark) {
    mark = Mark.create(mark)
    if (this.any_p(mark)) {
      this._items = this._items.filter(e => !e.equal_p(mark))
    }
  }

  // すでにあるか？
  any_p(mark) {
    mark = Mark.create(mark)
    return this._items.some(e => e.equal_p(mark))
  }

  // 含むか？
  include_p(mark) {
    return this.any_p(mark)
  }

  // 含まないか？
  exclude_p(mark) {
    return !this.include_p(mark)
  }

  // 位置をキーにしたハッシュを返す
  get marks_hash() {
    return this._items.reduce((a, e) => {
      GX.assert(e.mark_pos_key)
      if (!a[e.mark_pos_key]) {
        a[e.mark_pos_key] = []
      }
      a[e.mark_pos_key].push(e)
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

  //////////////////////////////////////////////////////////////////////////////// toggle 処理のコマンド化

  // toggle コマンド生成
  toggle_command_create(mark) {
    return {
      method: this.include_p(mark) ? "remove" : "push",
      params: mark,
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

  ////////////////////////////////////////////////////////////////////////////////
}

if (typeof process !== "undefined" && process.argv[1] === __filename) {
}
