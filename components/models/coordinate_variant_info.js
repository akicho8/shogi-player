import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class CoordinateVariantInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "number",   name: "数", css_value: "decimal",     },
      { key: "kanji",    name: "漢", css_value: "cjk-decimal", },
      { key: "alphabet", name: "英", css_value: "lower-alpha", },
    ]
  }
}
