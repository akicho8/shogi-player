import MemoryRecord from "js-memory-record"

export default class PieceVariantInfo extends MemoryRecord {
  static get define() {
    return [
      
      { key: 'a', name: "デフォルト",      },
      { key: 'b', name: "将棋図案駒(新)",  },
      { key: 'c', name: "将棋図案駒(旧)",  },
      
    ]
  }
}

if (process.argv[1] === __filename) {
  console.log(PieceVariantInfo.fetch("a").key)
  console.log(PieceVariantInfo.fetch("a").name)
}
