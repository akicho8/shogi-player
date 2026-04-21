import { ApplicationMemoryRecord } from "../../models/application_memory_record.js"

export class ThinkMarkVariantInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "circle",    name: "丸",   },
      { key: "invisible", name: "透明", },
    ]
  }

  get css_class() {
    return ["is_think_mark_variant", this.key].join("_")
  }
}
