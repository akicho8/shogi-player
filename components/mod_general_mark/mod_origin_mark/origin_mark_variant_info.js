import { ApplicationMemoryRecord } from "../../models/application_memory_record.js"

export class OriginMarkVariantInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "square",    name: "四角", },
      { key: "invisible", name: "透明", },
    ]
  }

  get css_class() {
    return ["is_origin_mark_variant", this.key].join("_")
  }
}
