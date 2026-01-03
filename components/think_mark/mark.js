// ・値オブジェクト
// ・利用者が自分で定義したスタイルを使えるように mark_color_index を SS_MARK_COLOR_COUNT で丸めてはいけない

import { Beetleshine as GX } from "beetleshine"

export class Mark {
  static create(attributes) {
    if (attributes instanceof this) {
      return attributes
    }
    return new this(attributes)
  }

  constructor(attributes) {
    GX.assert_not_null(attributes)
    GX.assert_not_null(attributes["mark_pos_key"])
    GX.assert_kind_of_string(attributes["mark_pos_key"])

    this.mark_pos_key = attributes["mark_pos_key"]
    this.mark_user_name = attributes["mark_user_name"] ?? ""
    this.mark_color_index = attributes["mark_color_index"] ?? 0

    Object.freeze(this)
  }

  get css_circle_class() {
    return ["think_mark_circle_color", this.mark_color_index].join("")
  }

  get css_label_class() {
    return ["think_mark_user_name_color", this.mark_color_index].join("")
  }

  get attributes() {
    return {
      mark_pos_key:     this.mark_pos_key,
      mark_user_name:   this.mark_user_name,
      mark_color_index: this.mark_color_index,
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
    return this.mark_user_name === other.mark_user_name && this.mark_pos_key === other.mark_pos_key
  }
}
