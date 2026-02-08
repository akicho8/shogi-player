import { ApplicationMemoryRecord } from "../models/application_memory_record.js"

export class SePieceVisibilityInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "visible", name: "表示", radio_button_name: "する",   },
      { key: "hidden",  name: "隠す", radio_button_name: "しない", },
    ]
  }
}
