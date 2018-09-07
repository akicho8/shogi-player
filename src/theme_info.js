import MemoryRecord from "js-memory-record"

export default class ThemeInfo extends MemoryRecord {
  static get define() {
    return [
      /* eslint-disable */
      { key: "none",   name: "なし",   },
      { key: "simple", name: "紙面風", },
      { key: "real",   name: "リアル", },
      /* eslint-enable */
    ]
  }
}

if (process.argv[1] === __filename) {
  console.log(ThemeInfo.fetch("real").key)
  console.log(ThemeInfo.fetch("real").name)
}
