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
      { key: 'g', },
      { key: 'h', },
      { key: 'i', },
      { key: 'j', },
      { key: 'k', },
      { key: 'l', },
      { key: 'm', },
      { key: 'n', },
      { key: 'o', },
      { key: 'p', },
      { key: 'q', },
      { key: 'r', },
      { key: 's', },
      { key: 't', },
      { key: 'u', },
      { key: 'v', },
      { key: 'w', },
      { key: 'x', },
      { key: 'y', },
      { key: 'z', },
      /* eslint-enable */
    ]
  }
}

if (process.argv[1] === __filename) {
  console.log(BgVariantInfo.fetch("a").key)
  console.log(BgVariantInfo.fetch("a").name)
}
