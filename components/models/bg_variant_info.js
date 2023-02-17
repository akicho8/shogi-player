import MemoryRecord from "js-memory-record"

export class BgVariantInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "none", name: "none", },
      { key: "a",    name: "木1",  },
      { key: "b",    name: "木2",  },
    ]
  }
}

if (process.argv[1] === __filename) {
  console.log(BgVariantInfo.fetch("a").key)
  console.log(BgVariantInfo.fetch("a").name)
}
