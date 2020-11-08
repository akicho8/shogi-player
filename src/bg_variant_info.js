import MemoryRecord from "js-memory-record"

export default class BgVariantInfo extends MemoryRecord {
  static get define() {
    return [
      /* eslint-disable */
      { key: 'a', },
      { key: 'b', },
      { key: 'c', },
      { key: 'd', },
      { key: 'e', },
      { key: 'f', },
      /* eslint-enable */
    ]
  }
}

if (process.argv[1] === __filename) {
  console.log(BgVariantInfo.fetch("a").key)
  console.log(BgVariantInfo.fetch("a").name)
}
