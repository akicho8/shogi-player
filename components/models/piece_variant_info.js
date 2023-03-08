import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class PieceVariantInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "none",     name: "none",     format: "",    },
      { key: "nureyon",  name: "ぬれよん", format: "SVG", },
      { key: "paper",    name: "紙面風",   format: "SVG", },
      { key: "zuan",     name: "図案駒",   format: "PNG", },
      { key: "portella", name: "Portella", format: "PNG", },
    ]
  }
}

if (typeof process !== "undefined" && process.argv[1] === __filename) {
  console.log(PieceVariantInfo.fetch("a").key)
  console.log(PieceVariantInfo.fetch("a").name)
}
