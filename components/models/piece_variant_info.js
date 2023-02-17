import MemoryRecord from "js-memory-record"

export class PieceVariantInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "none", name: "none",                        },
      { key: "a",    name: "ぬれよん(svg)",               },
      { key: "b",    name: "紙面風(svg)",                 },
      { key: "c",    name: "図案駒(png)",                 },
      { key: "d",    name: "Portella(png)",               },
    ]
  }
}

if (process.argv[1] === __filename) {
  console.log(PieceVariantInfo.fetch("a").key)
  console.log(PieceVariantInfo.fetch("a").name)
}
