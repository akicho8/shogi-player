import assert from "minimalistic-assert"

export class Mark {
  static create(attributes) {
    if (attributes instanceof this) {
      return attributes
    }
    return new this(attributes)
  }

  constructor(attributes) {
    assert(attributes, "attributes")
    assert(attributes.mark_pos_key, "attributes.mark_pos_key")
    assert(typeof attributes.mark_pos_key === "string", 'typeof attributes.mark_pos_key === "string"')

    // this.attributes = {...attributes}
    this._mark_pos_key = attributes.mark_pos_key
    this._mark_user_name = attributes.mark_user_name ?? ""
    this._mark_color_index = attributes.mark_color_index ?? 0
  }

  get mark_pos_key() {
    return this._mark_pos_key
  }

  get mark_user_name() {
    return this._mark_user_name
  }

  get mark_color_index() {
    // if (false) {
    //   // 利用者が自分で定義したスタイルを使えるように SS_MARK_COLOR_COUNT で丸めてはいけない
    //   this._mark_color_index % this.constructor.SS_MARK_COLOR_COUNT
    // } else {
    return this._mark_color_index
    // }
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

if (typeof process !== "undefined" && process.argv[1] === __filename) {
}
