// ・値オブジェクト
// ・利用者が自分で定義したスタイルを使えるように general_mark_color_index を SP_GENERAL_MARK_PALETTE_COUNT で丸めてはいけない

import { GX } from "../models/gx"

export class GeneralMarkItem {
  static ATTRIBUTE_COUNT = 3

  static create(attributes) {
    if (attributes instanceof this) {
      return attributes
    }
    return new this(attributes)
  }

  constructor(attributes) {
    GX.assert_not_null(attributes)
    GX.assert_kind_of_hash(attributes)
    GX.assert_kind_of_string(attributes["general_mark_pos_key"])
    GX.assert_present(attributes["general_mark_pos_key"])

    this.general_mark_pos_key = attributes["general_mark_pos_key"]
    this.general_mark_group_name = attributes["general_mark_group_name"] ?? ""
    this.general_mark_color_index = attributes["general_mark_color_index"] ?? 0

    Object.freeze(this)
  }

  get css_class() {
    return ["general_mark_color_index", this.general_mark_color_index].join("")
  }

  get attributes() {
    return {
      general_mark_pos_key:     this.general_mark_pos_key,
      general_mark_group_name:   this.general_mark_group_name,
      general_mark_color_index: this.general_mark_color_index,
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

  content_equal_p(other) {
    return this.general_mark_group_name === other.general_mark_group_name && this.general_mark_pos_key === other.general_mark_pos_key
  }

  get to_serial() {
    return [
      this.general_mark_pos_key,
      this.general_mark_group_name,
      this.general_mark_color_index,
    ].join(",")
  }
}
