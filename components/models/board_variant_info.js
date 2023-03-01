import MemoryRecord from "js-memory-record"

export class BoardVariantInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "none",   name: "none",        },
      { key: "wood_normal", name: "普通の木目",  },
      { key: "wood_bright", name: "明るい木目",  },
    ]
  }
}

if (process.argv[1] === __filename) {
  console.log(BoardVariantInfo.fetch("wood_normal").key)
  console.log(BoardVariantInfo.fetch("wood_normal").name)
}
