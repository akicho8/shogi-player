import { MemoryRecord } from "./memory_record"

class VariationInfo extends MemoryRecord {
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

  get name() {
    return this.attributes.key
  }
}

export { VariationInfo }

if (process.argv[1] === __filename) {
  console.log(VariationInfo.fetch("a").key)
  console.log(VariationInfo.fetch("a").name)
}
