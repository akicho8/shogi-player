import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class PieceVariantInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "invisible", name: "透明",     format: "",    },
      { key: "nureyon",   name: "ぬれよん", format: "SVG", },
      { key: "paper",     name: "紙面風",   format: "SVG", },
      { key: "zuan",      name: "図案駒",   format: "PNG", },
      { key: "portella",  name: "Portella", format: "PNG", },
    ]
  }
}
