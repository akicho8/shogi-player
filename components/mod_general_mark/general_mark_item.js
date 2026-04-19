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
    GX.assert_kind_of_string(attributes["gm_pos_key"])
    GX.assert_present(attributes["gm_pos_key"])

    this.gm_pos_key = attributes["gm_pos_key"]
    this.gm_user_name = attributes["gm_user_name"] ?? ""
    this.gm_color_index = attributes["gm_color_index"] ?? 0

    Object.freeze(this)
  }

  get css_class() {
    return ["general_mark_color_index", this.gm_color_index].join("")
  }

  get attributes() {
    return {
      gm_pos_key:     this.gm_pos_key,
      gm_user_name:   this.gm_user_name,
      gm_color_index: this.gm_color_index,
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
    return this.gm_user_name === other.gm_user_name && this.gm_pos_key === other.gm_pos_key
  }

  get to_serial() {
    return [
      this.gm_pos_key,
      this.gm_user_name,
      this.gm_color_index,
    ].join(",")
  }
}
