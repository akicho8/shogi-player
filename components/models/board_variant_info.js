import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class BoardVariantInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "none",   name: "none",        },
      { key: "wood_normal", name: "普通の木目",  },
      { key: "wood_bright", name: "明るい木目",  },
    ]
  }
}

if (typeof process !== "undefined" && process.argv[1] === __filename) {
  console.log(BoardVariantInfo.fetch("wood_normal").key)
  console.log(BoardVariantInfo.fetch("wood_normal").name)
}
