import MemoryRecord from "js-memory-record"

export default class ThemeInfo extends MemoryRecord {
  static get define() {
    return [
      
      { key: "none",   name: "なし",   },
      { key: "simple", name: "紙面風", },
      { key: "real",   name: "画像駒", },
      
    ]
  }
}

if (process.argv[1] === __filename) {
  console.log(ThemeInfo.fetch("real").key)
  console.log(ThemeInfo.fetch("real").name)
}
