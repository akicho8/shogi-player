import { ApplicationMemoryRecord } from "../../models/application_memory_record.js"

export class ThinkMarkVariantInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "circle_color", name: "丸(カラフル)", },
      { key: "circle_gray",  name: "丸(灰色)",     },
      { key: "invisible",    name: "非表示",       },
    ]
  }

  get css_class() {
    return ["is_think_mark_variant", this.key].join("_")
  }
}
