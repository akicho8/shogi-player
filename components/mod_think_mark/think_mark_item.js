// ・値オブジェクト
// ・利用者が自分で定義したスタイルを使えるように think_mark_color_index を SS_MARK_COLOR_COUNT で丸めてはいけない

import { GX } from "../models/gx"

export class ThinkMark {
  static create(attributes) {
    if (attributes instanceof this) {
      return attributes
    }
    return new this(attributes)
  }

  constructor(attributes) {
    GX.assert_not_null(attributes)
    GX.assert_not_null(attributes["think_mark_pos_key"])
    GX.assert_kind_of_string(attributes["think_mark_pos_key"])

    this.think_mark_pos_key = attributes["think_mark_pos_key"]
    this.think_mark_user_name = attributes["think_mark_user_name"] ?? ""
    this.think_mark_color_index = attributes["think_mark_color_index"] ?? 0

    Object.freeze(this)
  }

  get css_effect_class() {
    return ["think_mark_effect_color", this.think_mark_color_index].join("")
  }

  get css_label_class() {
    return ["think_mark_user_name_color", this.think_mark_color_index].join("")
  }

  get attributes() {
    return {
      think_mark_pos_key:     this.think_mark_pos_key,
      think_mark_user_name:   this.think_mark_user_name,
      think_mark_color_index: this.think_mark_color_index,
    }
  }

  get to_h() {
    return this.attributes
  }

  get as_json() {
    return this.attributes
  }

  toJSON() {
    return this.attributes
  }

  equal_p(other) {
    return this.think_mark_user_name === other.think_mark_user_name && this.think_mark_pos_key === other.think_mark_pos_key
  }
}
