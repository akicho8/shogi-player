import { ApplicationMemoryRecord } from "../../models/application_memory_record.js"

export class OriginMarkVariantInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "omv_invisible",    name: "非表示",   },
      { key: "omv_square_color", name: "四角(色)", },
      { key: "omv_square_gray",  name: "四角(灰)", },
      { key: "omv_aim",          name: "照準(灰)", },
      { key: "omv_fire",         name: "炎",       },
    ]
  }
}
