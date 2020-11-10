import MemoryRecord from "js-memory-record"

export default class BgVariantInfo extends MemoryRecord {
  static get define() {
    return [
      
      { key: 'a', },
      { key: 'b', },
      { key: 'c', },
      { key: 'd', },
      { key: 'e', },
      { key: 'f', },
      
    ]
  }
}

if (process.argv[1] === __filename) {
  console.log(BgVariantInfo.fetch("a").key)
  console.log(BgVariantInfo.fetch("a").name)
}
