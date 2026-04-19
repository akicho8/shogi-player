import { ApplicationMemoryRecord } from "../../models/application_memory_record.js"

export class OriginMarkVariantInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "square_color", name: "四角(カラフル)", },
      { key: "square_gray",  name: "四角(灰色)",     },
      { key: "invisible",    name: "非表示",         },
    ]
  }

  get css_class() {
    return ["is_origin_mark_variant", this.key].join("_")
  }
}
