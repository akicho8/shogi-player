import MemoryRecord from "js-memory-record"

export class BgVariantInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "none",   name: "none",        },
      { key: "normal", name: "普通の木目",  },
      { key: "bright", name: "明るい木目",  },
    ]
  }
}

if (process.argv[1] === __filename) {
  console.log(BgVariantInfo.fetch("normal").key)
  console.log(BgVariantInfo.fetch("normal").name)
}
